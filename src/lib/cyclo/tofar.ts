import {
  FEATURE_WEIGHTS,
  FEATURES,
  SCHEMAS,
  TRUST_FLOOR,
  type FeatureId,
} from "./constants.ts";
import type { AlphaCandidate } from "./alpha-derive.ts";
import { blake2sHex, jcs, sha256Hex } from "./hashes.ts";
import { decisionIsH1, type GlrtDecision } from "./glrt.ts";

export type Lane = "rf.discovery.cyclic" | "rf.discovery.trainingwheels";

export type GlrtResult = {
  H0: string;
  H1: string;
  testStatistic: number;
  threshold: number;
  pfa: number;
  pValue: number;
  decision: GlrtDecision;
  K: number;
  M: number;
};

export type TofarEvent = {
  schema_version: "1.0";
  trace_id: string;
  parent_trace_id: string | null;
  address: string;
  lane: Lane;
  event: "glrt_verdict";
  params: Record<string, unknown>;
  certainty: number;
  content_hash_cred: string;
  cred_tofar_hash: string;
  receipt_hash: string;
  timestamp: string;
  metadata: Record<string, unknown>;
};

export type Ledger = {
  provenance: TofarEvent[];
  trainingwheels: TofarEvent[];
};

function nowIso(): string {
  const d = new Date();
  return d.toISOString();
}

function rand4(): string {
  const a = new Uint8Array(2);
  crypto.getRandomValues(a);
  return Array.from(a, (b) => b.toString(16).padStart(2, "0")).join("");
}

export function buildTofarEvent(args: {
  address: string;
  feature: FeatureId;
  glrt: GlrtResult;
  alphaSelected: number;
  alphaCandidates: AlphaCandidate[];
  inputHash: string;
  priorTraceId: string | null;
  priorEventHash: string | null;
  gamma: number;
}): { event: TofarEvent; gateDecision: "allow" | "freeze" } {
  const weights = FEATURE_WEIGHTS[args.feature];
  const rawCertainty = Math.min(1, Math.max(0, args.gamma));
  const certainty = rawCertainty * weights.certaintyWeight;
  const gateDecision: "allow" | "freeze" = certainty >= TRUST_FLOOR ? "allow" : "freeze";
  const lane: Lane = gateDecision === "allow" ? "rf.discovery.cyclic" : "rf.discovery.trainingwheels";

  const params = {
    alpha_set_source: "derive_alpha_candidates",
    alpha_candidates: args.alphaCandidates.map((c) => ({
      alpha: round7(c.alpha),
      tier: c.tier,
      origin: c.origin,
      gamma: round7(c.gamma),
    })),
    N_alpha: args.glrt.M,
    alpha_selected: round7(args.alphaSelected),
    alpha_feature: args.feature,
    alpha_tolerance: args.feature === FEATURES.strict ? "strict" : "tolerant",
    H0: args.glrt.H0,
    H1: args.glrt.H1,
    test_statistic: args.glrt.testStatistic,
    threshold: args.glrt.threshold,
    pfa: args.glrt.pfa,
    p_value: args.glrt.pValue,
    decision: args.glrt.decision,
    K_windows: args.glrt.K,
    scf_estimator: "time_smoothed_cyclic_periodogram",
    formula: "S_x^alpha(f) = X(f+alpha/2) X*(f-alpha/2)",
    bonferroni: true,
    carrier_anchor_role: "band edges only — not in alpha generator",
  };

  const content_hash_cred = sha256Hex(
    jcs({
      address: args.address,
      lane,
      event: "glrt_verdict",
      params,
      certainty,
    }),
  );

  const cred_tofar_hash = blake2sHex(
    jcs({
      content_hash_cred,
      prior_event_hash: args.priorEventHash ?? "",
      lane,
    }),
  );

  const ts = nowIso();
  const nextTimeHint =
    decisionIsH1(args.glrt.decision) && certainty >= 0.9
      ? {
          trigger: "alpha_selected observed-or-derived AND certainty >= 0.9",
          action: "promote alpha_selected to cyclo.alpha_candidates[0] for next scan",
          alpha_selected: round7(args.alphaSelected),
        }
      : null;

  const metadata = {
    trust_floor: TRUST_FLOOR,
    gate_decision: gateDecision,
    gate_rule:
      "certainty >= trust_floor → allow (main lane); < trust_floor → freeze, write training-wheels lane",
    input_hash: args.inputHash,
    schemas: SCHEMAS,
    prior_trace_id: args.priorTraceId,
    next_time_hint: nextTimeHint,
    certainty_weight: weights.certaintyWeight,
    certainty_raw_gamma: round7(rawCertainty),
    tier: gateDecision === "allow" ? "03 · observed" : "02 · below floor",
  };

  const receipt_hash = sha256Hex(
    jcs({
      content_hash_cred,
      cred_tofar_hash,
      timestamp: ts,
      metadata,
    }),
  );

  const event: TofarEvent = {
    schema_version: "1.0",
    trace_id: `evt_${Date.now()}_${rand4()}_${lane}`,
    parent_trace_id: args.priorTraceId,
    address: args.address,
    lane,
    event: "glrt_verdict",
    params,
    certainty,
    content_hash_cred,
    cred_tofar_hash,
    receipt_hash,
    timestamp: ts,
    metadata,
  };

  return { event, gateDecision };
}

export function appendTofar(ledger: Ledger, event: TofarEvent): Ledger {
  if (event.lane === "rf.discovery.trainingwheels") {
    return { ...ledger, trainingwheels: [...ledger.trainingwheels, event] };
  }
  return { ...ledger, provenance: [...ledger.provenance, event] };
}

function round7(n: number): number {
  return Math.round(n * 1e7) / 1e7;
}
