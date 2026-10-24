import { AtlasPanel } from "@/components/lab/atlas-panel";
import { CyclicLab } from "@/components/lab/cyclic-lab";
import { OralBench } from "@/components/lab/oral-bench";
import { SkillBench } from "@/components/lab/skill-bench";
import { WorkSurface } from "@/components/lab/work-surface";
import { Button } from "@/components/ui/button";
import { TRUST_FLOOR } from "@/lib/cyclo/constants";
import { useState } from "react";

const LANES = [
  { id: "oral", label: "Oral" },
  { id: "work", label: "Work" },
  { id: "cyclic", label: "Cyclic" },
  { id: "skill", label: "Skill" },
  { id: "atlas", label: "Atlas" },
] as const;

type Lane = (typeof LANES)[number]["id"];

export function LabShell() {
  const [lane, setLane] = useState<Lane>("oral");
  return (
    <div className="mx-auto flex min-h-dvh max-w-6xl flex-col gap-6 px-4 py-6 pb-16 sm:px-6 sm:py-10">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
            Möbiius · DoinBetter
          </p>
          <h1 className="font-display mt-1 text-3xl tracking-[-0.03em] text-fg sm:text-4xl text-balance">
            Oral bench
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted text-pretty">
            Context notes for the work already named. The code is not the note.
          </p>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {LANES.map((l) => (
            <Button
              key={l.id}
              type="button"
              size="sm"
              variant={lane === l.id ? "default" : "outline"}
              onClick={() => setLane(l.id)}
            >
              {l.label}
            </Button>
          ))}
        </div>
      </header>
      {lane === "oral" ? <OralBench /> : null}
      {lane === "work" ? <WorkSurface /> : null}
      {lane === "cyclic" ? <CyclicLab embedded /> : null}
      {lane === "skill" ? <SkillBench /> : null}
      {lane === "atlas" ? <AtlasPanel /> : null}
      <p className="text-center text-[11px] text-subtle">trust floor {TRUST_FLOOR} · draft</p>
    </div>
  );
}
