import { useEffect, useMemo, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MOBIUS_SKILL, runSkillChecks, skillPass, type SkillPhase } from "@/lib/mobius/skill";
import { postLoop } from "@/lib/oral/loopback";

const PHASE_COPY: Record<SkillPhase, { title: string; body: string }> = {
  draft: {
    title: "Draft",
    body: "Write the splits. Do not call them canonical. Current corrections outrank prior assistant text.",
  },
  test: {
    title: "Test",
    body: "Run the invariant suite in this pane. No subagents. Failures stay visible.",
  },
  review: {
    title: "Review",
    body: "Separate implemented from hypothesized. Overlay counts are not paper counts.",
  },
  improve: {
    title: "Improve",
    body: "Next stable edge: one artifact → one control → gate → bounded op → receipt.",
  },
};

export function SkillBench() {
  const [phase, setPhase] = useState<SkillPhase>("draft");
  const [ran, setRan] = useState(false);
  const checks = useMemo(() => runSkillChecks(), []);
  const passed = skillPass(checks);
  const announced = useRef(false);

  useEffect(() => {
    if (!announced.current) {
      announced.current = true;
      return;
    }
    postLoop({ kind: "phase", detail: phase });
  }, [phase]);

  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-[var(--radius-xl)] border border-border bg-surface p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-sm font-medium text-fg">
            {MOBIUS_SKILL.name} · {MOBIUS_SKILL.version}
          </h2>
          <Badge tone="accent">skill-creator</Badge>
          <Badge>trust {MOBIUS_SKILL.trustFloor}</Badge>
        </div>
        <p className="mt-3 text-sm text-muted">
          {MOBIUS_SKILL.cycle.join(" → ")}
        </p>
        <p className="mt-1 text-xs text-subtle">{MOBIUS_SKILL.tofar.join(" · ")}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {MOBIUS_SKILL.creator.map((p) => (
            <Button
              key={p}
              type="button"
              size="sm"
              variant={phase === p ? "default" : "outline"}
              onClick={() => setPhase(p)}
            >
              {p}
            </Button>
          ))}
        </div>
        <p className="mt-4 text-sm text-fg">{PHASE_COPY[phase].title}</p>
        <p className="mt-1 text-sm text-muted">{PHASE_COPY[phase].body}</p>
        {phase === "test" ? (
          <div className="mt-4">
            <Button type="button" onClick={() => setRan(true)}>
              Run skill checks
            </Button>
            {ran ? (
              <ul className="mt-4 flex flex-col gap-2">
                {checks.map((c) => (
                  <li
                    key={c.id}
                    className="flex items-start justify-between gap-3 rounded-[var(--radius-sm)] border border-border px-3 py-2"
                  >
                    <span className="text-sm text-fg">{c.detail}</span>
                    <Badge tone={c.ok ? "ok" : "danger"}>{c.ok ? "pass" : "fail"}</Badge>
                  </li>
                ))}
                <li className="pt-1 text-sm text-muted">
                  {passed ? "All ten checks hold. Improve is allowed." : "A check failed. Stay in review."}
                </li>
              </ul>
            ) : null}
          </div>
        ) : null}
      </section>

      <section className="rounded-[var(--radius-xl)] border border-border bg-surface p-4 sm:p-5">
        <h2 className="mb-3 text-sm font-medium text-fg">Hard splits</h2>
        <ol className="flex flex-col gap-2">
          {MOBIUS_SKILL.splits.map((s) => (
            <li key={s} className="border-b border-border pb-2 text-sm text-muted last:border-0 last:pb-0">
              {s}
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
