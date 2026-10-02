import { bonferroniP } from "../cyclo/glrt.ts";

/** Gherbi 2026: E8→3D sacred-site tournament. Catalog-specific, not a law. */
export const GHERBI = {
  title: "Statistical Alignment of E8 Lattice Projections and Global Sacred Sites",
  author: "Salah-Eddin Gherbi",
  date: "2026-04-06",
  evidence: "source-backed" as const,
  e8: { vertices: 240, edges: 6720 },
  catalogN: 160,
  seedsTested: 270,
  orientations: 23328,
  familyWise: 0.05,
  confirmed: [
    {
      seed: 3,
      orientation: "65°N, 125°E, 250°",
      signature: "Breadth",
      detail: "96.9% of sites within 11 km (0.10°)",
    },
    {
      seed: 85,
      orientation: "75°S, 75°W, 280°",
      signature: "Breadth",
      detail: "97.5% of sites within 11 km (0.10°)",
    },
    {
      seed: 48,
      orientation: "5°S, 135°E, 250°",
      signature: "Precision",
      detail: "83.1% of sites within 5.6 km (0.05°)",
    },
    {
      seed: 46,
      orientation: "55°N, 175°W, 250°",
      signature: "Ultra-precision",
      detail: "30.6% of sites within 1.1 km (0.01°)",
    },
  ],
  transfer: {
    catalog62: "four 160-site seeds fail at fixed orientation",
    seed89: "fresh 62-site tournament, RMS p=0.002, d=3.87",
  },
  not: [
    "Not matrix structure (AUC ≈ 0.52)",
    "Not edge topology (< 3% difference)",
    "Not preferred bearings (χ² p = 0.794)",
    "Not a universal geometric law",
  ],
} as const;

export function gherbiCorrection() {
  const m = GHERBI.seedsTested;
  const family = GHERBI.familyWise;
  return {
    m,
    family,
    perTest: family / m,
    uncorrectedFalseAlarms: m * family,
    pAdjExample: bonferroniP(0.002, m),
    note: "Same Bonferroni as cyclic GLRT. M is seeds here, alphas there.",
  };
}
