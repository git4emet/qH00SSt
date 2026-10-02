import { fftRadix2 } from "./fft.ts";

export type ScfResult = {
  /** |S_x^α(f)|, row = alpha bin, col = f bin. */
  mag: Float64Array;
  alphaBins: number;
  fBins: number;
  alphaAxis: Float64Array;
  fAxis: Float64Array;
  /** Ordinary PSD P(f) = E[|X(f)|²]. */
  psd: Float64Array;
  K: number;
  fs: number;
  nfft: number;
};

/**
 * Time-smoothed cyclic periodogram.
 * S_x^α(f) = (1/K) Σ_k X_k(f + α/2) · X_k*(f − α/2)
 */
export function averagedScf(
  x: Float64Array,
  fs: number,
  nfft: number,
  windowLen: number,
  hop: number,
): ScfResult {
  const n = x.length;
  const w = hann(windowLen);
  const nBlocks = Math.max(1, Math.floor((n - windowLen) / hop) + 1);
  const magAcc = new Float64Array(nfft * nfft);
  const sRe = new Float64Array(nfft * nfft);
  const sIm = new Float64Array(nfft * nfft);
  const psd = new Float64Array(nfft);
  const Xre = new Float64Array(nfft);
  const Xim = new Float64Array(nfft);
  const df = fs / nfft;

  let used = 0;
  for (let b = 0; b < nBlocks; b++) {
    const i0 = b * hop;
    if (i0 + windowLen > n) break;
    Xre.fill(0);
    Xim.fill(0);
    for (let i = 0; i < windowLen; i++) {
      Xre[i] = x[i0 + i]! * w[i]!;
    }
    fftRadix2(Xre, Xim, false);

    for (let f = 0; f < nfft; f++) {
      psd[f]! += Xre[f]! * Xre[f]! + Xim[f]! * Xim[f]!;
    }

    for (let aIdx = 0; aIdx < nfft; aIdx++) {
      const aHz = (aIdx - nfft / 2) * df;
      const half = Math.round(aHz / (2 * df));
      const row = aIdx * nfft;
      for (let f = 0; f < nfft; f++) {
        const ip = mod(f + half, nfft); // X(f + α/2)
        const im = mod(f - half, nfft); // X(f − α/2)
        // Xp * conj(Xm)
        const re = Xre[ip]! * Xre[im]! + Xim[ip]! * Xim[im]!;
        const imc = Xim[ip]! * Xre[im]! - Xre[ip]! * Xim[im]!;
        sRe[row + f]! += re;
        sIm[row + f]! += imc;
      }
    }
    used++;
  }

  const K = Math.max(1, used);
  for (let i = 0; i < sRe.length; i++) {
    const re = sRe[i]! / K;
    const im = sIm[i]! / K;
    magAcc[i] = Math.hypot(re, im);
  }
  for (let f = 0; f < nfft; f++) psd[f]! /= K;

  const alphaAxis = new Float64Array(nfft);
  const fAxis = new Float64Array(nfft);
  for (let i = 0; i < nfft; i++) {
    alphaAxis[i] = (i - nfft / 2) * df;
    fAxis[i] = (i < nfft / 2 ? i : i - nfft) * df;
  }

  return {
    mag: magAcc,
    alphaBins: nfft,
    fBins: nfft,
    alphaAxis,
    fAxis,
    psd,
    K,
    fs,
    nfft,
  };
}

/** Spectral coherence γ̂(f, α) ∈ [0, 1]. */
export function coherenceAt(scf: ScfResult, aIdx: number, fIdx: number): number {
  const aHz = scf.alphaAxis[aIdx]!;
  const df = scf.fs / scf.nfft;
  const half = Math.round(aHz / (2 * df));
  const mag = scf.mag[aIdx * scf.fBins + fIdx]!;
  const pHi = scf.psd[mod(fIdx + half, scf.nfft)]!;
  const pLo = scf.psd[mod(fIdx - half, scf.nfft)]!;
  const denom = Math.sqrt(Math.max(0, pHi * pLo));
  if (denom <= 0) return 0;
  return Math.min(1, mag / denom);
}

export function alphaProfile(scf: ScfResult): Float64Array {
  const { mag, alphaBins, fBins } = scf;
  const prof = new Float64Array(alphaBins);
  for (let a = 0; a < alphaBins; a++) {
    let s = 0;
    const row = a * fBins;
    for (let f = 0; f < fBins; f++) {
      const m = mag[row + f]!;
      s += m * m;
    }
    prof[a] = s / fBins;
  }
  return prof;
}

export function cafProfile(
  x: Float64Array,
  fs: number,
  opts?: { aMin?: number; aMax?: number; da?: number; maxLag?: number },
): { profile: Float64Array; alphaAxis: Float64Array } {
  const aMin = opts?.aMin ?? 0.02 * fs;
  const aMax = opts?.aMax ?? 0.24 * fs;
  const da = opts?.da ?? fs / 400;
  const maxLag = opts?.maxLag ?? 36;
  const nA = Math.max(1, Math.round((aMax - aMin) / da) + 1);
  const alphaAxis = new Float64Array(nA);
  const profile = new Float64Array(nA);
  for (let k = 0; k < nA; k++) alphaAxis[k] = aMin + k * da;

  const n = x.length;
  const prod = new Float64Array(n);
  for (let lag = 1; lag <= maxLag; lag++) {
    const last = n - lag;
    if (last < 16) break;
    for (let i = 0; i < last; i++) prod[i] = x[i]! * x[i + lag]!;
    for (let k = 0; k < nA; k++) {
      const w = (2 * Math.PI * alphaAxis[k]!) / fs;
      const cw = Math.cos(w);
      const sw = Math.sin(w);
      let zr = 1;
      let zi = 0;
      let re = 0;
      let im = 0;
      for (let i = 0; i < last; i++) {
        const v = prod[i]!;
        re += v * zr;
        im += v * zi;
        const nr = zr * cw - zi * sw;
        zi = zr * sw + zi * cw;
        zr = nr;
      }
      const mag = Math.hypot(re, im) / last;
      if (mag > profile[k]!) profile[k] = mag;
    }
  }
  return { profile, alphaAxis };
}

function hann(n: number): Float64Array {
  const w = new Float64Array(n);
  for (let i = 0; i < n; i++) w[i] = 0.5 * (1 - Math.cos((2 * Math.PI * i) / (n - 1)));
  return w;
}

function mod(i: number, n: number): number {
  return ((i % n) + n) % n;
}
