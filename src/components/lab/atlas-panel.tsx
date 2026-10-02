import { Badge } from "@/components/ui/badge";
import { CATCHUP, FIVE_BUDGET } from "@/lib/mobius/catchup";
import { GHERBI, gherbiCorrection } from "@/lib/mobius/gherbi";
import type { EvidenceStub } from "@/lib/mobius/skill";

const STUB_TONE: Record<EvidenceStub, "muted" | "ok" | "warn" | "accent" | "danger"> = {
  implemented: "ok",
  tested: "ok",
  "source-backed": "accent",
  "research-supported": "accent",
  "project-convention": "muted",
  hypothesis: "warn",
  unresolved: "danger",
};

function Dots({ n }: { n: number }) {
  return (
    <span className="inline-flex gap-0.5" aria-hidden>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={`size-1.5 rounded-full ${i < n ? "bg-fg" : "bg-border"}`}
        />
      ))}
    </span>
  );
}

export function AtlasPanel() {
  const corr = gherbiCorrection();
  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-[var(--radius-xl)] border border-border bg-surface p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-sm font-medium text-fg">Gherbi 2026 · E8 → 3D</h2>
          <Badge tone="accent">source-backed</Badge>
        </div>
        <p className="mt-2 text-sm text-muted">
          {GHERBI.e8.vertices} vertices, {GHERBI.e8.edges.toLocaleString()} edges, {GHERBI.catalogN}{" "}
          sites, {GHERBI.seedsTested} seeds. Same Bonferroni as the cyclic gate: M is seeds here,
          alphas there.
        </p>
        <dl className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
          <Stat k="M seeds" v={String(corr.m)} />
          <Stat k="Family-wise" v={String(corr.family)} />
          <Stat k="Per-test α" v={corr.perTest.toExponential(2)} />
          <Stat k="Uncorrected E[FA]" v={corr.uncorrectedFalseAlarms.toFixed(1)} />
        </dl>
        <p className="mt-3 text-xs text-subtle">
          Uncorrected p=0.002 over 270 seeds inflates to {corr.pAdjExample.toFixed(2)}. The paper
          claims four confirmed seeds after correction, and transfer to a second catalog fails.
          Catalog-specific, not a law.
        </p>
        <ul className="mt-4 flex flex-col gap-2">
          {GHERBI.confirmed.map((s) => (
            <li
              key={s.seed}
              className="flex flex-col gap-1 rounded-[var(--radius-sm)] border border-border px-3 py-2 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-mono text-sm text-fg">
                  Seed {s.seed} · {s.orientation}
                </p>
                <p className="text-xs text-subtle">{s.detail}</p>
              </div>
              <Badge>{s.signature}</Badge>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-[var(--radius-xl)] border border-border bg-surface p-4 sm:p-5">
        <h2 className="mb-3 text-sm font-medium text-fg">Five-budget assignment</h2>
        <p className="mb-4 text-sm text-muted">
          No single cold interface wins. Same rule as lanes: put each tool where its budget is
          cheapest.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[28rem] text-left text-xs">
            <thead className="text-subtle">
              <tr>
                <th className="pb-2 font-medium">Interface</th>
                <th className="pb-2 font-medium">Heat</th>
                <th className="pb-2 font-medium">Loss</th>
                <th className="pb-2 font-medium">Noise</th>
                <th className="pb-2 font-medium">Space</th>
                <th className="pb-2 font-medium">Cal</th>
              </tr>
            </thead>
            <tbody>
              {FIVE_BUDGET.map((row) => (
                <tr key={row.name} className="border-t border-border">
                  <td className="py-2 text-fg">{row.name}</td>
                  <td>
                    <Dots n={row.heat} />
                  </td>
                  <td>
                    <Dots n={row.loss} />
                  </td>
                  <td>
                    <Dots n={row.noise} />
                  </td>
                  <td>
                    <Dots n={row.space} />
                  </td>
                  <td>
                    <Dots n={row.cal} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2">
        {CATCHUP.map((c) => (
          <article
            key={c.title}
            className="rounded-[var(--radius-xl)] border border-border bg-surface p-4"
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm font-medium text-fg">{c.title}</h3>
              <Badge tone={STUB_TONE[c.stub]}>{c.stub}</Badge>
            </div>
            <p className="mt-2 text-sm text-muted">{c.body}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="text-xs text-subtle">{k}</dt>
      <dd className="font-mono text-sm tabular-nums text-fg">{v}</dd>
    </div>
  );
}
