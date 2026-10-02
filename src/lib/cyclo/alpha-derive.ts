import { alphaProfile, averagedScf, cafProfile, coherenceAt, type ScfResult } from "./scf.ts";

export type AlphaTier = "observed" | "derived" | "proposed";

export type AlphaCandidate = {
  alpha: number;
  alphaHz: number;
  tier: AlphaTier;
  origin: string;
  peakStrength: number;
  snrDb: number | null;
  gamma: number;
  aIdx: number;
};

export type DeriveResult = {
  scf: ScfResult;
  profile: Float64Array;
  profileAxis: Float64Array;
  candidates: AlphaCandidate[];
};

export function deriveAlphaCandidates(
  x: Float64Array,
  fs: number,
  opts?: {
    nfft?: number;
    windowLen?: number;
    hop?: number;
    thresholdFactor?: number;
    minSeparationBins?: number;
  },
): DeriveResult {
  const nfft = opts?.nfft ?? 256;
  const windowLen = opts?.windowLen ?? 128;
  const hop = opts?.hop ?? 64;
  const scf = averagedScf(x, fs, nfft, windowLen, hop);
  const caf = cafProfile(x, fs);
  const peaks = pickCafPeaks(
    caf.profile,
    caf.alphaAxis,
    scf,
    opts?.thresholdFactor ?? 2.2,
    opts?.minSeparationBins ?? 2,
  );
  const candidates = classifyPeaks(peaks, fs);
  return { scf, profile: caf.profile, profileAxis: caf.alphaAxis, candidates };
}

function pickCafPeaks(
  profile: Float64Array,
  axis: Float64Array,
  scf: ScfResult,
  thresholdFactor: number,
  minSep: number,
): AlphaCandidate[] {
  const sorted = Float64Array.from(profile).sort();
  const med = sorted[Math.floor(sorted.length / 2)]! || 1e-12;
  const thr = med * thresholdFactor;
  const peaks: AlphaCandidate[] = [];

  for (let i = 1; i < profile.length - 1; i++) {
    const v = profile[i]!;
    if (v < thr) continue;
    if (v < profile[i - 1]! || v < profile[i + 1]!) continue;
    if (peaks.length && i - peaks[peaks.length - 1]!.aIdx < minSep) {
      if (v > peaks[peaks.length - 1]!.peakStrength) peaks.pop();
      else continue;
    }
    const a = axis[i]!;
    const aIdx = nearestAlphaBin(scf, a);
    peaks.push({
      alpha: a,
      alphaHz: a,
      tier: "observed",
      origin: "peak",
      peakStrength: v,
      snrDb: 10 * Math.log10(v / med),
      gamma: aIdx >= 0 ? maxGammaOnRow(scf, aIdx) : 0,
      aIdx,
    });
  }
  return peaks;
}

function nearestAlphaBin(scf: ScfResult, alpha: number): number {
  let best = 0;
  let err = Infinity;
  for (let i = 0; i < scf.alphaAxis.length; i++) {
    const d = Math.abs(scf.alphaAxis[i]! - alpha);
    if (d < err) {
      err = d;
      best = i;
    }
  }
  return best;
}

function maxGammaOnRow(scf: ScfResult, aIdx: number): number {
  let best = 0;
  for (let f = 0; f < scf.fBins; f++) {
    const g = coherenceAt(scf, aIdx, f);
    if (g > best) best = g;
  }
  return best;
}

/**
 * Fundamental = smallest |α| within 6 dB of the strongest peak.
 * Harmonics / subharmonics are derived. Conjugate mirrors are proposed.
 */
function classifyPeaks(peaks: AlphaCandidate[], fs: number): AlphaCandidate[] {
  if (!peaks.length) return [];
  const pos = peaks.filter((p) => p.alpha > 0);
  const pool = pos.length ? pos : peaks;
  const strongest = pool.reduce((a, b) => (b.peakStrength > a.peakStrength ? b : a));
  const floor = strongest.peakStrength / 10 ** (6 / 10);
  const near = pool.filter((p) => p.peakStrength >= floor);
  const fundamental = near.reduce((a, b) => (Math.abs(b.alpha) < Math.abs(a.alpha) ? b : a)).alpha;
  const tol = Math.abs(fundamental) * 0.08 || 0.01;

  const out: AlphaCandidate[] = peaks.map((p) => {
    const a = p.alpha;
    if (Math.abs(a - fundamental) < tol || Math.abs(a + fundamental) < tol) {
      return { ...p, tier: "observed", origin: "fundamental" };
    }
    for (const k of [2, 3, 4]) {
      if (Math.abs(Math.abs(a) - k * Math.abs(fundamental)) < tol * k) {
        return { ...p, tier: "derived", origin: `harmonic k=${k}` };
      }
    }
    for (const k of [2, 3]) {
      if (Math.abs(Math.abs(a) - Math.abs(fundamental) / k) < tol) {
        return { ...p, tier: "derived", origin: `subharmonic 1/${k}` };
      }
    }
    return { ...p, tier: "observed", origin: "independent" };
  });

  const proposed: AlphaCandidate[] = [];
  for (const p of out) {
    const aC = 2 * fundamental - p.alpha;
    if (aC <= 0) continue;
    if (out.some((q) => Math.abs(q.alpha - aC) < tol)) continue;
    if (proposed.some((q) => Math.abs(q.alpha - aC) < tol)) continue;
    proposed.push({
      alpha: aC,
      alphaHz: aC * fs,
      tier: "proposed",
      origin: `conjugate of ${p.origin}`,
      peakStrength: 0,
      snrDb: null,
      gamma: 0,
      aIdx: -1,
    });
  }
  return [...out, ...proposed];
}

export function selectAlphaSet(
  candidates: AlphaCandidate[],
  source: "strict" | "tolerant",
): AlphaCandidate[] {
  if (source === "strict") return candidates.filter((c) => c.tier !== "proposed");
  return candidates;
}

/** Kept for heatmap callers that still want the SCF-averaged |S|² strip. */
export function scfAlphaProfile(scf: ScfResult): Float64Array {
  return alphaProfile(scf);
}
