import { MESH_OVERLAY, TRUST_FLOOR } from "../cyclo/constants.ts";
import { bonferroniP, bonferroniThreshold } from "../cyclo/glrt.ts";
import { MALL_POSITIONS } from "./worksurface.ts";

export const TOFAR = ["Trust", "Open", "Fair", "Accountable", "Reusable"] as const;

export const CYCLE = ["READ", "FACET", "BOUND", "BUILD", "VERIFY", "RECEIPT", "RETURN"] as const;

export const MOBIUS_LOOP = [
  "Sense",
  "Parse",
  "Route",
  "Execute",
  "Witness",
  "Reflect",
  "Receive",
  "Return",
] as const;

export const SKILL_CREATOR = ["draft", "test", "review", "improve"] as const;

export type SkillPhase = (typeof SKILL_CREATOR)[number];

export type EvidenceStub =
  | "implemented"
  | "tested"
  | "source-backed"
  | "research-supported"
  | "project-convention"
  | "hypothesis"
  | "unresolved";

export type SkillCheck = {
  id: string;
  ok: boolean;
  detail: string;
};

export const MOBIUS_SKILL = {
  name: "mobius",
  version: "0.3-draft",
  trustFloor: TRUST_FLOOR,
  tofar: TOFAR,
  cycle: CYCLE,
  loop: MOBIUS_LOOP,
  creator: SKILL_CREATOR,
  splits: [
    "8009/8011 are carrier band edges, never an alpha generator",
    "Certainty weights never multiply the alpha coordinate",
    "N_α = M actually scanned this frame",
    "Gate freeze writes training-wheels; allow writes provenance",
    "Publish failure ≠ build failure",
    `C60×3+1() = ${MESH_OVERLAY.static.count} static; 192 = local dynamics (overlay, not Amaral 2023)`,
    "Amaral 2023: 600-cell / 120-cell / E8 240 roots — no 192, no 256/255, no C60",
    "Gherbi 2026: 4 of 270 seeds, catalog-specific, not a universal law",
    "Assistant text is never auto-approved for training",
    "Never conflate a custom tesseract module with Tesseract OCR",
    "Buttons never call connectors; they emit a command envelope",
    "One source-backed proof loop before another architecture rewrite",
    "Kuntman 4D / SL(4,C) remain papers until an adapter names units and a test",
  ],
} as const;

export function runSkillChecks(): SkillCheck[] {
  const gherbiM = 270;
  const family = 0.05;
  return [
    {
      id: "tofar-5",
      ok: TOFAR.length === 5,
      detail: `TOFAR has ${TOFAR.length} terms`,
    },
    {
      id: "cycle-7",
      ok: CYCLE.length === 7,
      detail: `operating cycle has ${CYCLE.length} steps`,
    },
    {
      id: "creator-4",
      ok: SKILL_CREATOR.length === 4,
      detail: "draft → test → review → improve",
    },
    {
      id: "trust-floor",
      ok: TRUST_FLOOR === 0.743,
      detail: `trust floor ${TRUST_FLOOR}`,
    },
    {
      id: "static-181",
      ok: MESH_OVERLAY.static.count === 181,
      detail: `C60×3+1() = ${MESH_OVERLAY.static.count}`,
    },
    {
      id: "local-192",
      ok: MESH_OVERLAY.local_dynamics.count === 192,
      detail: "192 local dynamics",
    },
    {
      id: "e8-240",
      ok: MESH_OVERLAY.paper_4d.e8_roots === 240,
      detail: "E8 roots = 240 (paper, not overlay)",
    },
    {
      id: "bonferroni-gherbi",
      ok: Math.abs(bonferroniP(0.05, gherbiM) - 1) < 1e-12,
      detail: `uncorrected p=0.05 over ${gherbiM} seeds saturates family-wise risk`,
    },
    {
      id: "bonferroni-per-test",
      ok: Math.abs(family / gherbiM - 0.05 / 270) < 1e-18,
      detail: `per-test α = 0.05/270 = ${(family / gherbiM).toExponential(2)}`,
    },
    {
      id: "glrt-same-math",
      ok: Math.abs(bonferroniThreshold(0.001, 20) - -2 * Math.log(0.001 / 20)) < 1e-12,
      detail: "cyclic GLRT and Gherbi share Bonferroni, different statistic",
    },
    {
      id: "mall-8",
      ok: MALL_POSITIONS.length === 8,
      detail: `Mall records ${MALL_POSITIONS.length} positions; the eighth is script.recorded`,
    },
  ];
}

export function skillPass(checks = runSkillChecks()): boolean {
  return checks.every((c) => c.ok);
}
