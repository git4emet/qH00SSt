/**
 * GLRT for a cyclostationary bin.
 * Under H0 (complex SCF, Gaussian, large N): Λ = 2 K γ̂² ~ χ²₂
 * Survival function of χ²₂ is e^{−x/2}, so λ = −2 ln(P_FA).
 * Scanning M alphas: Bonferroni λ = −2 ln(P_FA / M).
 */

export function chi2Df2Threshold(pfa: number): number {
  if (!(pfa > 0) || pfa >= 1) throw new Error("P_FA must be in (0, 1)");
  return -2 * Math.log(pfa);
}

/** M = number of alphas actually tested this frame. */
export function bonferroniThreshold(pfa: number, m: number): number {
  const M = Math.max(1, Math.floor(m));
  return chi2Df2Threshold(pfa / M);
}

export function glrtStatistic(gamma: number, K: number): number {
  const g = Math.min(1, Math.max(0, gamma));
  return 2 * K * g * g;
}

export function pValueChi2Df2(lambda: number): number {
  return Math.exp(-lambda / 2);
}

export type GlrtDecision = "H0" | "H1";

export function decideGlrt(lambda: number, threshold: number): GlrtDecision {
  return lambda > threshold ? "H1" : "H0";
}

/** Family-wise p-value cap: min(1, p · M). Gherbi uses this on 270 seeds. */
export function bonferroniP(p: number, m: number): number {
  const M = Math.max(1, Math.floor(m));
  return Math.min(1, Math.max(0, p) * M);
}

export function decisionIsH1(decision: string): boolean {
  const d = decision.trim().toUpperCase();
  return d === "H1" || d === "SIGNAL_PRESENT";
}

