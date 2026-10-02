import type { AlphaCandidate, DeriveResult } from "./alpha-derive.ts";
import { deriveAlphaCandidates, selectAlphaSet } from "./alpha-derive.ts";
import { FEATURE_WEIGHTS, type FeatureId } from "./constants.ts";
import { consumeNextTimeHint, type ChainHead } from "./consumer.ts";
import {
  bonferroniThreshold,
  decideGlrt,
  glrtStatistic,
  pValueChi2Df2,
} from "./glrt.ts";
import { hashFrame } from "./hashes.ts";
import { synthBpsk } from "./signal.ts";
import { appendTofar, buildTofarEvent, type Ledger, type TofarEvent } from "./tofar.ts";

export type ScanOpts = {
  fs: number;
  symbolRate: number;
  nSymbols: number;
  snrDb: number;
  seed: number;
  nfft: number;
  windowLen: number;
  hop: number;
  pfa: number;
  feature: FeatureId;
  address: string;
};

export type ScanResult = {
  derive: DeriveResult;
  scanned: AlphaCandidate[];
  selected: AlphaCandidate | null;
  knownAlpha: number;
  M: number;
  threshold: number;
  event: TofarEvent;
  ledger: Ledger;
  head: ChainHead;
};

/**
 * One frame: synth → SCF peak-pick → Bonferroni GLRT → TOFAR receipt → consumer.
 * N_α = M = |scanned| this frame. Weighting never touches the alpha coordinate.
 */
export function runScan(opts: ScanOpts, ledger: Ledger, head: ChainHead): ScanResult {
  const { x, knownAlpha } = synthBpsk({
    fs: opts.fs,
    symbolRate: opts.symbolRate,
    nSymbols: opts.nSymbols,
    snrDb: opts.snrDb,
    seed: opts.seed,
  });
  const inputHash = hashFrame(x);
  const derive = deriveAlphaCandidates(x, opts.fs, {
    nfft: opts.nfft,
    windowLen: opts.windowLen,
    hop: opts.hop,
  });
  const source = FEATURE_WEIGHTS[opts.feature].source;
  const scanned = selectAlphaSet(derive.candidates, source);
  const M = scanned.length;
  const selected = pickSelected(scanned, head);
  const gamma = selected?.gamma ?? 0;
  const K = derive.scf.K;
  const lambda = glrtStatistic(gamma, K);
  const threshold = bonferroniThreshold(opts.pfa, M);
  const decision = decideGlrt(lambda, threshold);
  const { event } = buildTofarEvent({
    address: opts.address,
    feature: opts.feature,
    glrt: {
      H0: "stationary noise, central chi-squared df=2",
      H1: "cyclostationary at alpha, noncentral chi-squared lambda=SNR*N",
      testStatistic: lambda,
      threshold,
      pfa: opts.pfa,
      pValue: pValueChi2Df2(lambda),
      decision,
      K,
      M,
    },
    alphaSelected: selected?.alpha ?? 0,
    alphaCandidates: scanned,
    inputHash,
    priorTraceId: head.prior_trace_id,
    priorEventHash: head.prior_event_hash,
    gamma,
  });
  const nextLedger = appendTofar(ledger, event);
  const nextHead = consumeNextTimeHint(nextLedger.provenance, head);
  return {
    derive,
    scanned,
    selected,
    knownAlpha,
    M,
    threshold,
    event,
    ledger: nextLedger,
    head: nextHead,
  };
}

function pickSelected(scanned: AlphaCandidate[], head: ChainHead): AlphaCandidate | null {
  if (!scanned.length) return null;
  const pos = scanned.filter((c) => c.alpha > 0);
  const pool = pos.length ? pos : scanned;
  const fund = pool.find((c) => c.origin === "fundamental");
  if (head.alpha_selected != null) {
    const target = head.alpha_selected;
    const nearest = pool.reduce((a, b) =>
      Math.abs(b.alpha - target) < Math.abs(a.alpha - target) ? b : a,
    );
    const scale = Math.max(Math.abs(target), 1e-9);
    if (Math.abs(nearest.alpha - target) / scale < 0.15) return nearest;
  }
  if (fund) return fund;
  const rank = (t: AlphaCandidate["tier"]) => (t === "observed" ? 2 : t === "derived" ? 1 : 0);
  return [...pool].sort((a, b) => {
    const dr = rank(b.tier) - rank(a.tier);
    if (dr) return dr;
    if (b.gamma !== a.gamma) return b.gamma - a.gamma;
    return b.peakStrength - a.peakStrength;
  })[0]!;
}
