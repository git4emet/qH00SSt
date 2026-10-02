/** Synthetic rectangular-pulse BPSK. Symbol rate is cycles/sample when fs = 1. */

export function synthBpsk(opts: {
  fs: number;
  symbolRate: number;
  nSymbols: number;
  snrDb: number;
  seed?: number;
}): { x: Float64Array; sps: number; knownAlpha: number } {
  const { fs, symbolRate, nSymbols, snrDb, seed = 1 } = opts;
  const sps = Math.max(2, Math.round(fs / symbolRate));
  const n = nSymbols * sps;
  const x = new Float64Array(n);
  const rng = mulberry32(seed);
  for (let s = 0; s < nSymbols; s++) {
    const bit = rng() < 0.5 ? -1 : 1;
    const off = s * sps;
    for (let i = 0; i < sps; i++) x[off + i] = bit;
  }
  const signalPow = 1;
  const noisePow = signalPow / 10 ** (snrDb / 10);
  const sigma = Math.sqrt(noisePow);
  for (let i = 0; i < n; i++) x[i]! += sigma * gauss(rng);
  return { x, sps, knownAlpha: symbolRate / fs };
}

function mulberry32(a: number): () => number {
  let t = a >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function gauss(rng: () => number): number {
  const u = Math.max(1e-12, rng());
  const v = rng();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}
