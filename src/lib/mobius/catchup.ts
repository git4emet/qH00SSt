import type { EvidenceStub } from "./skill";

export type CatchupCard = {
  title: string;
  stub: EvidenceStub;
  body: string;
};

export const CATCHUP: CatchupCard[] = [
  {
    title: "Cyclic emitter v2",
    stub: "tested",
    body: "CAF peak-pick → Bonferroni GLRT with M this frame → TOFAR receipt → consumer. Twin primes stay on the carrier band.",
  },
  {
    title: "Amaral–Clawson–Irwin 2023",
    stub: "research-supported",
    body: "Quasicrystalline spin foam. 600-cell (20 tetrahedra at a vertex), dual 120-cell, E8 240 roots. Does not contain 192, 256/255, or C60.",
  },
  {
    title: "C60×3+1 / 192 overlay",
    stub: "project-convention",
    body: "Declared here: C60×3+1() = 181 static, 192 local dynamics. Overlay, not a paper result.",
  },
  {
    title: "Gherbi 2026 E8 sites",
    stub: "source-backed",
    body: "4 of 270 8D→3D projections, p < 0.05 after Bonferroni, catalog-specific. Transfer to a 62-site catalog fails; Seed 89 is a different resonance.",
  },
  {
    title: "Five-budget cold interfaces",
    stub: "research-supported",
    body: "Laser Focus World 2026: no single cryogenic link wins. Assign metal, fiber, converters, ceramic resonators, and local cold electronics to the budget they actually help.",
  },
  {
    title: "Personal model",
    stub: "hypothesis",
    body: "Open-weight base + LoRA + retrieval memory + provenance registry + approval gates. Not trained here — no GPU. Assistant text stays unreviewed.",
  },
  {
    title: "Whisper++",
    stub: "unresolved",
    body: "Scaffold is current; offline enforcement and receipt fields still need the doctor patch. Hotwords optional and receipted.",
  },
  {
    title: "Drilling Coordinator PDF",
    stub: "unresolved",
    body: "AET interface specification, not a running workflow. Documented concept ≠ connected OCR or GSOC.",
  },
  {
    title: "Publish envelope",
    stub: "project-convention",
    body: "Publish failure ≠ build failure. Keep the hashed artifact; repair only platform handoff → edge → served hash.",
  },
  {
    title: "Worksurface v14 loop",
    stub: "implemented",
    body: "SORT → RESEARCH → MALL (8 positions) → RECEIPT. SHA-256 of source text. Revoke and export. No ranking, no remote connector.",
  },
  {
    title: "Buttonscape",
    stub: "implemented",
    body: "A button is a projection of a capability. allow / ask / block. Labels change with context. Adapters consume commands; buttons never call Gmail, MCP, or a model.",
  },
  {
    title: "User-voice corpus",
    stub: "unresolved",
    body: "Unreviewed voice records. Not promoted to training, not auto-approved, not copied into this app.",
  },
  {
    title: "Kuntman 4D / SL(4,C) spinors",
    stub: "research-supported",
    body: "Dirac as vector-sum of 4-component Weyl spinors; sixteen SL(4,C) pairs. Paper, not a runtime. No adapter until units and a test exist.",
  },
  {
    title: "Project graph v1.1",
    stub: "source-backed",
    body: "791 nodes / 1,540 edges on the full graph; architecture 131 / 318. Counts from the box inventory, not a live editor.",
  },
];

export const FIVE_BUDGET = [
  { name: "Metal microwave cables", heat: 5, loss: 3, noise: 1, space: 5, cal: 5 },
  { name: "Optical fiber links", heat: 1, loss: 1, noise: 3, space: 1, cal: 3 },
  { name: "Cold light-to-microwave", heat: 3, loss: 3, noise: 5, space: 3, cal: 5 },
  { name: "Ceramic resonant wireless", heat: 1, loss: 3, noise: 3, space: 1, cal: 3 },
  { name: "Local cold electronics", heat: 5, loss: 1, noise: 3, space: 3, cal: 5 },
] as const;
