import { useEffect, useRef } from "react";
import type { AlphaCandidate } from "@/lib/cyclo/alpha-derive";
import type { ScfResult } from "@/lib/cyclo/scf";

export function ProfileChart({
  scf,
  profile,
  profileAxis,
  candidates,
  knownAlpha,
  selected,
}: {
  scf: ScfResult | null;
  profile: Float64Array | null;
  profileAxis: Float64Array | null;
  candidates: AlphaCandidate[];
  knownAlpha: number | null;
  selected: number | null;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || !profile || !profileAxis || !profileAxis.length) return;
    const w = canvas.width;
    const h = canvas.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#0b0c0e";
    ctx.fillRect(0, 0, w, h);

    const n = profile.length;
    let max = 1e-12;
    for (let i = 0; i < n; i++) if (profile[i]! > max) max = profile[i]!;
    const a0 = profileAxis[0]!;
    const a1 = profileAxis[n - 1]!;
    const span = a1 - a0 || 1;
    const xOf = (alpha: number) => ((alpha - a0) / span) * w;

    ctx.beginPath();
    ctx.strokeStyle = "#b8c0cc";
    ctx.lineWidth = 1.5;
    for (let i = 0; i < n; i++) {
      const x = xOf(profileAxis[i]!);
      const y = h - 16 - (profile[i]! / max) * (h - 28);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    const mark = (alpha: number, color: string, dash = false) => {
      const x = xOf(alpha);
      ctx.save();
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      if (dash) ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(x, 8);
      ctx.lineTo(x, h - 12);
      ctx.stroke();
      ctx.restore();
    };
    if (knownAlpha != null) mark(knownAlpha, "#6b8f71", true);
    if (selected != null) mark(selected, "#e8e6e1");

    for (const c of candidates) {
      if (c.tier === "proposed") continue;
      const x = xOf(c.alpha);
      ctx.fillStyle = c.tier === "derived" ? "#8b8d92" : "#e8e6e1";
      ctx.beginPath();
      ctx.arc(x, 12, 3, 0, Math.PI * 2);
      ctx.fill();
    }
    void scf;
  }, [scf, profile, profileAxis, candidates, knownAlpha, selected]);

  return (
    <div className="overflow-hidden rounded-[var(--radius-md)] border border-border bg-bg">
      <canvas
        ref={ref}
        width={480}
        height={160}
        className="block h-auto w-full"
        aria-label="CAF alpha profile with known and selected cyclic frequencies"
      />
      <div className="flex gap-4 px-3 py-2 text-[11px] text-subtle">
        <span>CAF max_ℓ |R^α(ℓ)|</span>
        <span className="text-ok">dashed = known f_sym</span>
        <span className="text-fg">solid = selected</span>
      </div>
    </div>
  );
}
