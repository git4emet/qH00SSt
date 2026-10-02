/** Atlas-tier constants. Twin primes are band edges, not alpha generators. */

export const TRUST_FLOOR = 0.743;

/** Default false-alarm rate. Threshold is χ²₂ inverse: −2 ln(P_FA). */
export const P_FA = 0.001;

/** Design-typical N_α after peak-pick on a BPSK-like frame (observed + low harmonics). */
export const N_ALPHA_DESIGN = 8;

export const CARRIER_ANCHOR = {
  low_hz: 8009,
  high_hz: 8011,
  beat_hz: 2,
  ratio_low_over_high: 8009 / 8011,
  role: "carrier-frequency anchor and coarse band edges — NOT an alpha-set generator",
} as const;

/**
 * Overlay declared on this stack — not claimed by Amaral–Clawson–Irwin 2023.
 * That paper's 4D object is the 600-cell (dual 120-cell) inside the Elser–Sloane
 * quasicrystal from E8. 192, 256/255, and C60×3+1 do not appear there.
 */
export const MESH_OVERLAY = {
  static: {
    name: "C60×3+1()",
    count: 60 * 3 + 1,
    role: "static",
  },
  local_dynamics: {
    name: "192",
    count: 192,
    role: "local dynamics",
  },
  paper_4d: {
    cell_600: { cells: 600, kind: "tetrahedra", meet_at_vertex: 20 },
    cell_120: { cells: 120, kind: "dodecahedra", dual_of: "600-cell" },
    e8_roots: 240,
  },
  raster: {
    cells: 256,
    live: 255,
    note: "8-bit raster / GF(256) live-count — not a 600-cell compression ratio",
  },
} as const;

export const FEATURES = {
  tolerant: "cyclic_credtofar_symbol_rate",
  strict: "cyclic_credtofar_()_symbol_rate",
} as const;

export type FeatureId = (typeof FEATURES)[keyof typeof FEATURES];

/**
 * Weighting is applied to certainty at decision time, never to the alpha coordinate.
 * strict = observed + derived. tolerant = full set including proposed conjugates.
 */
export const FEATURE_WEIGHTS: Record<
  FeatureId,
  { source: "strict" | "tolerant"; certaintyWeight: number; label: string }
> = {
  [FEATURES.tolerant]: { source: "tolerant", certaintyWeight: 0.5, label: "tolerant / partial" },
  [FEATURES.strict]: { source: "strict", certaintyWeight: 1.0, label: "strict / preferred" },
};

export const SCHEMAS = {
  manifest: "rf.discovery.hyper/manifest.json@1.1",
  array: "rf.discovery.hyper/rf/array.json@1.0",
  cyclo: "rf.discovery.hyper/rf/cyclo.json@1.0",
  glrt: "rf.discovery.hyper/glrt_validator.json@1.0",
  carrier: "rf.discovery.hyper/rf/carrier.json@1.0",
} as const;
