import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { deriveAlphaCandidates, selectAlphaSet } from "./alpha-derive.ts";
import { consumeNextTimeHint, EMPTY_HEAD } from "./consumer.ts";
import { FEATURES, P_FA, TRUST_FLOOR } from "./constants.ts";
import {
  bonferroniThreshold,
  chi2Df2Threshold,
  decideGlrt,
  decisionIsH1,
  glrtStatistic,
} from "./glrt.ts";
import { hashFrame } from "./hashes.ts";
import { runScan } from "./pipeline.ts";
import { synthBpsk } from "./signal.ts";
import { appendTofar, buildTofarEvent, type Ledger } from "./tofar.ts";

describe("GLRT threshold", () => {
  it("matches χ²₂ inverse for canonical P_FA values", () => {
    assert.ok(Math.abs(chi2Df2Threshold(0.05) - 5.9914645471) < 1e-6);
    assert.ok(Math.abs(chi2Df2Threshold(0.01) - 9.21034037198) < 1e-6);
    assert.ok(Math.abs(chi2Df2Threshold(0.001) - 13.81551055796) < 1e-6);
  });

  it("Bonferroni uses M actually tested, not a mesh-harmonic constant", () => {
    const m = 8;
    const t = bonferroniThreshold(0.001, m);
    assert.ok(Math.abs(t - chi2Df2Threshold(0.001 / 8)) < 1e-12);
    assert.ok(t > chi2Df2Threshold(0.001));
  });

  it("sample pfa=0.001 is not the P_FA=0.01 threshold 9.21", () => {
    assert.ok(Math.abs(chi2Df2Threshold(P_FA) - 9.21) > 1);
  });
});

describe("selectAlphaSet", () => {
  it("does not multiply alpha by a weight", () => {
    const cands = [
      {
        alpha: 0.05,
        alphaHz: 0.05,
        tier: "observed" as const,
        origin: "fundamental",
        peakStrength: 1,
        snrDb: 10,
        gamma: 0.8,
        aIdx: 1,
      },
      {
        alpha: 0.07,
        alphaHz: 0.07,
        tier: "proposed" as const,
        origin: "conjugate",
        peakStrength: 0,
        snrDb: null,
        gamma: 0,
        aIdx: -1,
      },
    ];
    const strict = selectAlphaSet(cands, "strict");
    const tolerant = selectAlphaSet(cands, "tolerant");
    assert.equal(strict.length, 1);
    assert.equal(strict[0]!.alpha, 0.05);
    assert.equal(tolerant.length, 2);
    assert.equal(tolerant[1]!.alpha, 0.07);
  });
});

describe("TOFAR emitter v2", () => {
  it("routes freeze to training-wheels and allow to provenance", () => {
    const frame = new Float64Array([1, 2, 3, 4]);
    const inputHash = hashFrame(frame);
    assert.match(inputHash, /^sha256:[0-9a-f]{64}$/);
    assert.equal(inputHash.includes("framehash"), false);

    const glrt = {
      H0: "stationary noise, central chi-squared df=2",
      H1: "cyclostationary at alpha, noncentral chi-squared lambda=SNR*N",
      testStatistic: 20,
      threshold: chi2Df2Threshold(0.001),
      pfa: 0.001,
      pValue: Math.exp(-20 / 2),
      decision: "H1" as const,
      K: 16,
      M: 3,
    };
    const cands = [
      {
        alpha: 0.05,
        alphaHz: 0.05,
        tier: "observed" as const,
        origin: "fundamental",
        peakStrength: 1,
        snrDb: 12,
        gamma: 0.9,
        aIdx: 1,
      },
    ];

    let ledger: Ledger = { provenance: [], trainingwheels: [] };

    const freeze = buildTofarEvent({
      address: "p:2:3:5:7:11:13",
      feature: FEATURES.strict,
      glrt,
      alphaSelected: 0.05,
      alphaCandidates: cands,
      inputHash,
      priorTraceId: null,
      priorEventHash: null,
      gamma: 0.5,
    });
    assert.equal(freeze.gateDecision, "freeze");
    assert.ok(freeze.event.certainty < TRUST_FLOOR);
    ledger = appendTofar(ledger, freeze.event);
    assert.equal(ledger.trainingwheels.length, 1);
    assert.equal(ledger.provenance.length, 0);

    const allow = buildTofarEvent({
      address: "p:2:3:5:7:11:13",
      feature: FEATURES.strict,
      glrt,
      alphaSelected: 0.05,
      alphaCandidates: cands,
      inputHash,
      priorTraceId: freeze.event.trace_id,
      priorEventHash: freeze.event.cred_tofar_hash,
      gamma: 0.92,
    });
    assert.equal(allow.gateDecision, "allow");
    ledger = appendTofar(ledger, allow.event);
    assert.equal(ledger.provenance.length, 1);
    assert.equal(allow.event.params.N_alpha, 3);
    assert.ok(decisionIsH1(allow.event.params.decision as string));
  });

  it("consumer closes the loop from next_time_hint", () => {
    const frame = new Float64Array([9, 8, 7]);
    const built = buildTofarEvent({
      address: "p:2:3:5:7:11:13",
      feature: FEATURES.strict,
      glrt: {
        H0: "H0",
        H1: "H1",
        testStatistic: 40,
        threshold: 13.82,
        pfa: 0.001,
        pValue: 1e-8,
        decision: "H1",
        K: 20,
        M: 2,
      },
      alphaSelected: 0.05,
      alphaCandidates: [
        {
          alpha: 0.05,
          alphaHz: 0.05,
          tier: "observed",
          origin: "fundamental",
          peakStrength: 1,
          snrDb: 10,
          gamma: 0.95,
          aIdx: 1,
        },
      ],
      inputHash: hashFrame(frame),
      priorTraceId: null,
      priorEventHash: null,
      gamma: 0.95,
    });
    const head = consumeNextTimeHint([built.event], EMPTY_HEAD);
    assert.equal(head.alpha_selected, 0.05);
    assert.equal(head.consumed_trace_id, built.event.trace_id);
  });
});

describe("alpha derivation smoke", () => {
  it("lands a peak near the known BPSK symbol rate", () => {
    const known = 0.05;
    const { x, knownAlpha } = synthBpsk({
      fs: 1,
      symbolRate: known,
      nSymbols: 400,
      snrDb: 20,
      seed: 2,
    });
    assert.equal(knownAlpha, known);
    const { candidates } = deriveAlphaCandidates(x, 1, {
      nfft: 256,
      windowLen: 128,
      hop: 64,
    });
    const observed = candidates.filter((c) => c.tier !== "proposed" && c.alpha > 0);
    assert.ok(observed.length >= 1, "expected at least one observed peak");
    const nearest = observed.reduce((a, b) =>
      Math.abs(b.alpha - known) < Math.abs(a.alpha - known) ? b : a,
    );
    assert.ok(
      Math.abs(nearest.alpha - known) < 0.008,
      `nearest observed α=${nearest.alpha} too far from ${known}`,
    );
    const fund = observed.find((c) => c.origin === "fundamental");
    assert.ok(fund, "expected a fundamental");
    assert.ok(Math.abs(fund.alpha - known) < 0.008, `fundamental ${fund.alpha} ≠ ${known}`);
  });

  it("GLRT statistic is 2 K γ²", () => {
    assert.equal(glrtStatistic(0.5, 8), 2 * 8 * 0.25);
    assert.equal(decideGlrt(20, 13.82), "H1");
    assert.equal(decideGlrt(4, 13.82), "H0");
  });
});

describe("runScan v2", () => {
  const emptyLedger: Ledger = { provenance: [], trainingwheels: [] };

  it("uses M = |scanned| and a matching Bonferroni threshold", () => {
    const out = runScan(
      {
        fs: 1,
        symbolRate: 0.05,
        nSymbols: 256,
        snrDb: 18,
        seed: 3,
        nfft: 256,
        windowLen: 128,
        hop: 64,
        pfa: 0.001,
        feature: FEATURES.strict,
        address: "p:2:3:5:7:11:13",
      },
      emptyLedger,
      EMPTY_HEAD,
    );
    assert.equal(out.M, out.scanned.length);
    assert.equal(out.event.params.N_alpha, out.M);
    const expected = chi2Df2Threshold(0.001 / Math.max(1, out.M));
    assert.ok(Math.abs(out.threshold - expected) < 1e-9);
    assert.equal(out.event.params.threshold, out.threshold);
    assert.equal(out.event.params.pfa, 0.001);
    assert.match(String(out.event.metadata.input_hash), /^sha256:[0-9a-f]{64}$/);
    const gate = out.event.metadata.gate_decision;
    if (gate === "allow") assert.equal(out.ledger.provenance.length, 1);
    else assert.equal(out.ledger.trainingwheels.length, 1);
  });

  it("tolerant lock cannot clear the floor", () => {
    const out = runScan(
      {
        fs: 1,
        symbolRate: 0.05,
        nSymbols: 192,
        snrDb: 20,
        seed: 4,
        nfft: 256,
        windowLen: 128,
        hop: 64,
        pfa: 0.001,
        feature: FEATURES.tolerant,
        address: "p:2:3:5:7:11:13",
      },
      emptyLedger,
      EMPTY_HEAD,
    );
    assert.equal(out.event.metadata.gate_decision, "freeze");
    assert.ok(out.event.certainty < TRUST_FLOOR);
    assert.equal(out.ledger.trainingwheels.length, 1);
    assert.equal(out.ledger.provenance.length, 0);
  });
});
