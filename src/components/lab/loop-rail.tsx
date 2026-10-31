import { useEffect, useState } from "react";
import { recentLoops, subscribeLoop, affineTransit, type LoopEvent } from "@/lib/oral/loopback";

const CELLS = 144;

export function LoopRail() {
  const [events, setEvents] = useState<LoopEvent[]>(() => recentLoops());

  useEffect(() => subscribeLoop(() => setEvents(recentLoops())), []);

  const step = events.length;
  const point = affineTransit(step);
  const latest = events[0];

  return (
    <div className="flex flex-col gap-4">
      <p className="max-w-xl text-sm leading-relaxed text-muted">
        This page is the loop. It runs in the browser and hears a change when the notes, the checks, or the
        skill phase move. It does not wait on a clock, and it does not leave this origin.
      </p>

      <section className="rounded-[var(--radius-md)] border border-border bg-surface p-4">
        <h2 className="text-base font-medium text-fg">offline-canvas</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Twelve by twelve marks on this page. They shift when the bench shifts. This is not a field board.
        </p>
        <div
          className="mt-3 grid grid-cols-12 gap-px"
          role="img"
          aria-label={`${step} state changes recorded on a twelve by twelve grid`}
        >
          {Array.from({ length: CELLS }, (_, i) => (
            <span
              key={i}
              className={`block h-2 w-full rounded-[2px] ${(i + step) % 5 === 0 ? "bg-accent" : (i + step) % 5 === 1 ? "bg-ok" : "bg-subtle/50"}`}
            />
          ))}
        </div>
      </section>

      <section className="rounded-[var(--radius-md)] border border-border bg-surface p-4">
        <h2 className="text-base font-medium text-fg">phenoplane-affine-transit</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          A point starts at (1, 0). Each change rotates it and steps it sideways. A local map. Not a proof.
        </p>
        <p className="mt-3 font-mono text-sm text-fg">
          step {step} → ({point.x}, {point.y})
        </p>
      </section>

      <section className="rounded-[var(--radius-md)] border border-border bg-surface p-4">
        <h2 className="text-base font-medium text-fg">skill-creator</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          A state change is not a new skill. Draft, test, review, and improve still live on the Skill lane.
        </p>
        <p className="mt-3 text-sm text-fg">{latest ? `${latest.kind}: ${latest.detail}` : "No change yet."}</p>
      </section>

      <ul className="flex flex-col gap-2">
        {events.map((event) => (
          <li key={event.id} className="rounded-[var(--radius-sm)] border border-border px-3 py-2 text-sm text-fg">
            <span className="text-muted">{event.at.slice(11, 19)} · {event.kind}. </span>
            {event.detail}
          </li>
        ))}
      </ul>
    </div>
  );
}
