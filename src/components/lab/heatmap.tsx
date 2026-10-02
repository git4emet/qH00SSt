import { useEffect, useRef } from "react";
import type { ScfResult } from "@/lib/cyclo/scf";

export function Heatmap({ scf }: { scf: ScfResult | null }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || !scf) return;
    const w = canvas.width;
    const h = canvas.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = ctx.createImageData(w, h);
    const { mag, alphaBins, fBins, nfft, alphaAxis } = scf;
    let max = 1e-12;
    for (let a = 0; a < alphaBins; a++) {
      if (Math.abs(alphaAxis[a]!) < 0.03) continue;
      const row = a * fBins;
      for (let f = 0; f < fBins; f++) {
        const v = mag[row + f]!;
        if (v > max) max = v;
      }
    }

    for (let y = 0; y < h; y++) {
      const aShifted = Math.floor((y / h) * alphaBins);
      const aIdx = (aShifted + nfft / 2) % nfft;
      for (let x = 0; x < w; x++) {
        const fShifted = Math.floor((x / w) * fBins);
        const fIdx = (fShifted + nfft / 2) % nfft;
        const v = mag[aIdx * fBins + fIdx]! / max;
        const t = Math.pow(Math.min(1, v), 0.28);

        const p = (y * w + x) * 4;
        img.data[p] = 12 + t * 184;
        img.data[p + 1] = 14 + t * 192;
        img.data[p + 2] = 16 + t * 204;
        img.data[p + 3] = 255;
      }
    }
    ctx.putImageData(img, 0, 0);
  }, [scf]);

  return (
    <div className="overflow-hidden rounded-[var(--radius-md)] border border-border bg-bg">
      <canvas
        ref={ref}
        width={480}
        height={280}
        className="block h-auto w-full"
        aria-label="SCF magnitude on the alpha-f plane"
      />
      <div className="flex justify-between px-3 py-2 text-[11px] text-subtle">
        <span>f →</span>
        <span>α ↑  |S_x^α(f)|</span>
      </div>
    </div>
  );
}
