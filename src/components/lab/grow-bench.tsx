import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { CONNECT } from "@/lib/oral/catalog";
import { postLoop } from "@/lib/oral/loopback";
import { TRUST_FLOOR } from "@/lib/cyclo/constants";
import {
  EMPTY_MEMBER,
  GATES,
  LANES_PRESENT,
  RELATIONS,
  TEMPLATES,
  bootSteps,
  desksFor,
  glyphPath,
  knownApis,
  localSlot,
  restoreMember,
  slotsFor,
  templateById,
  type Guard,
  type Member,
  type Role,
} from "@/lib/oral/templates";

const KEY = "grow-member-v1";

const ROLES: { id: Role; label: string }[] = [
  { id: "field", label: "Field" },
  { id: "accountant", label: "Accountant" },
  { id: "coordinator", label: "Coordinator" },
];

const GUARDS: { id: Guard; label: string }[] = [
  { id: "allow", label: "Allow" },
  { id: "ask", label: "Ask" },
  { id: "block", label: "Block" },
];

function loadMember(): Member {
  try {
    return restoreMember(JSON.parse(localStorage.getItem(KEY) || "null"));
  } catch {
    return { ...EMPTY_MEMBER };
  }
}

export function GrowBench() {
  const [member, setMember] = useState<Member>(EMPTY_MEMBER);
  const [ready, setReady] = useState(false);
  const [openSlot, setOpenSlot] = useState("");
  const announced = useRef(false);

  useEffect(() => {
    setMember(loadMember());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(KEY, JSON.stringify(member));
    if (!announced.current) {
      announced.current = true;
      return;
    }
    const picture = templateById(member.templateId);
    postLoop({
      kind: "member",
      detail: `${member.name.trim() || "unnamed"} · ${picture.name} · ${member.using.length} existing · ${member.declared.length} needed`,
    });
  }, [member, ready]);

  const picture = templateById(member.templateId);
  const using = knownApis(member.using);
  const slots = slotsFor(member.declared);
  const desks = desksFor(member.role);

  function patch(next: Partial<Member>) {
    setMember((prev) => ({ ...prev, ...next }));
  }

  function toggle(list: "using" | "declared", id: string) {
    setMember((prev) => {
      const current = prev[list];
      return { ...prev, [list]: current.includes(id) ? current.filter((item) => item !== id) : [...current, id] };
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="max-w-xl text-sm leading-relaxed text-muted">
        The pictures are the templates. A new member is configured from one of them. APIs that already have a
        path can be marked. APIs that do not get a local slot on this origin, and that slot does not call out.
      </p>

      <section className="grid gap-3 rounded-[var(--radius-md)] border border-border bg-surface p-4 sm:grid-cols-2">
        <label className="block text-xs text-subtle">
          Member
          <input
            className="mt-1 h-11 w-full rounded-[var(--radius-sm)] border border-border bg-bg px-3 text-sm text-fg"
            value={member.name}
            placeholder="Name"
            onChange={(event) => patch({ name: event.target.value })}
          />
        </label>
        <label className="block text-xs text-subtle">
          System they are joining
          <input
            className="mt-1 h-11 w-full rounded-[var(--radius-sm)] border border-border bg-bg px-3 text-sm text-fg"
            value={member.system}
            placeholder="Which system"
            onChange={(event) => patch({ system: event.target.value })}
          />
        </label>
        <div className="flex flex-wrap gap-2 sm:col-span-2">
          {ROLES.map((role) => (
            <Button
              key={role.id}
              type="button"
              size="sm"
              variant={member.role === role.id ? "default" : "outline"}
              onClick={() => patch({ role: role.id })}
            >
              {role.label}
            </Button>
          ))}
        </div>
      </section>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {TEMPLATES.map((item) => (
          <Button
            key={item.id}
            type="button"
            size="sm"
            variant={member.templateId === item.id ? "default" : "outline"}
            onClick={() => patch({ templateId: item.id })}
          >
            {item.name}
          </Button>
        ))}
      </div>

      <figure className="overflow-hidden rounded-[var(--radius-md)] border border-border bg-bg">
        <img
          src={`/templates/${picture.file}`}
          alt={`${picture.name} template`}
          className="max-h-64 w-full object-contain object-left"
        />
        <figcaption className="border-t border-border px-4 py-3 text-sm text-muted">{picture.grows}</figcaption>
      </figure>

      {picture.id === "dashboard" ? <Dashboard member={member} desks={desks} /> : null}
      {picture.id === "paths" ? <Paths member={member} /> : null}
      {picture.id === "panels" ? <Panels using={using.map((item) => item.name)} needed={slots.needed.map((item) => item.name)} /> : null}
      {picture.id === "inverse" ? <Inverse /> : null}
      {picture.id === "origami" ? (
        <Origami guard={member.guard} onGuard={(guard) => patch({ guard })} />
      ) : null}
      {picture.id === "gates" ? <Gates system={member.system} /> : null}
      {picture.id === "boot" ? <Boot member={member} /> : null}
      {picture.id === "roles" ? <Roles role={member.role} onRole={(role) => patch({ role })} /> : null}

      <section className="rounded-[var(--radius-md)] border border-border bg-surface p-4">
        <h2 className="text-base font-medium text-fg">APIs that exist</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          These paths already open. This bench does not sign in.{" "}
          {member.guard === "block" ? "This member set block, so the links stay shut." : "Mark the ones this member uses."}
        </p>
        <ul className="mt-3 flex flex-col gap-2">
          {CONNECT.map((service) => {
            const on = member.using.includes(service.id);
            return (
              <li key={service.id} className="rounded-[var(--radius-sm)] border border-border px-3 py-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-sm text-fg">{service.name}</span>
                  <Button type="button" size="sm" variant={on ? "default" : "outline"} onClick={() => toggle("using", service.id)}>
                    {on ? "Uses this" : "Not marked"}
                  </Button>
                </div>
                {on ? (
                  <p className="mt-2 text-sm text-muted">
                    {service.delivery === "email" ? "The file comes by email. Wait for it." : "Direct. No inbox."}{" "}
                    {member.guard === "block" ? null : (
                      <a className="text-accent underline-offset-2 hover:underline" href={service.openUrl} target="_blank" rel="noreferrer">
                        Open {service.name}
                      </a>
                    )}
                  </p>
                ) : null}
              </li>
            );
          })}
        </ul>
      </section>

      <section className="rounded-[var(--radius-md)] border border-border bg-surface p-4">
        <h2 className="text-base font-medium text-fg">APIs that do not exist yet</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Mark what this member needs. The local slot is a record on this page. It is not the outside service.
        </p>
        <ul className="mt-3 flex flex-col gap-2">
          {MISSING.map((slot) => {
            const needed = member.declared.includes(slot.id);
            const record = localSlot(member, slot.id);
            return (
              <li key={slot.id} className="rounded-[var(--radius-sm)] border border-border px-3 py-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-sm text-fg">{slot.name}</span>
                  <Button type="button" size="sm" variant={needed ? "default" : "outline"} onClick={() => toggle("declared", slot.id)}>
                    {needed ? "Needed" : "Not needed"}
                  </Button>
                </div>
                <p className="mt-2 text-sm text-muted">{slot.why}</p>
                {needed ? (
                  <div className="mt-2">
                    <Button type="button" size="sm" variant="outline" onClick={() => setOpenSlot(openSlot === slot.id ? "" : slot.id)}>
                      {openSlot === slot.id ? "Close local slot" : "Open local slot"}
                    </Button>
                    {openSlot === slot.id ? (
                      <pre className="mt-2 overflow-x-auto rounded-[var(--radius-sm)] bg-bg p-3 text-xs text-fg">
                        {JSON.stringify(record, null, 2)}
                      </pre>
                    ) : null}
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

function Dashboard({ member, desks }: { member: Member; desks: string[] }) {
  return (
    <section className="grid gap-4 rounded-[var(--radius-md)] border border-border bg-surface p-4 lg:grid-cols-[minmax(0,1fr)_180px]">
      <div>
        <p className="text-xs tracking-[0.16em] text-subtle uppercase">Configured</p>
        <h2 className="mt-1 text-2xl text-fg">{member.name.trim() || "Unnamed"}</h2>
        <p className="mt-1 text-sm text-muted">{member.system.trim() || "No system named yet."}</p>
        <p className="mt-3 text-sm text-fg">
          {desks.length ? desks.join(" · ") : "No desk. The ledger is not connected."}
        </p>
        <dl className="mt-4 grid grid-cols-2 gap-3">
          <div>
            <dt className="text-xs text-subtle">Trust setting</dt>
            <dd className="text-sm text-fg">{TRUST_FLOOR}</dd>
          </div>
          <div>
            <dt className="text-xs text-subtle">Coherence</dt>
            <dd className="text-sm text-muted">Not measured</dd>
          </div>
        </dl>
      </div>
      <svg viewBox="-70 -70 140 140" className="mx-auto h-40 w-40 text-accent" role="img" aria-label="Glyph for this member">
        <path d={glyphPath(member.name || member.system)} fill="none" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    </section>
  );
}

function Paths({ member }: { member: Member }) {
  return (
    <section className="grid gap-3 sm:grid-cols-2">
      <div className="rounded-[var(--radius-md)] border border-border bg-surface p-4">
        <h2 className="text-base font-medium text-fg">This browser</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {member.name.trim() || "The member"} is on this origin. The loop hears changes here. No field board is attached.
        </p>
      </div>
      <div className="rounded-[var(--radius-md)] border border-border bg-surface p-4">
        <h2 className="text-base font-medium text-fg">Drawn path</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Toroid, lens, ring, quadrature, hologram, Laplacian, synthetic division, trig, color table. Labels from the picture. Not running.
        </p>
      </div>
    </section>
  );
}

function Panels({ using, needed }: { using: string[]; needed: string[] }) {
  return (
    <section className="grid gap-3 sm:grid-cols-2">
      <div className="rounded-[var(--radius-md)] border border-border bg-surface p-4">
        <h2 className="text-base font-medium text-fg">Already in use</h2>
        <p className="mt-2 text-sm text-muted">{using.length ? using.join(", ") : "None marked."}</p>
      </div>
      <div className="rounded-[var(--radius-md)] border border-border bg-surface p-4">
        <h2 className="text-base font-medium text-fg">Still missing</h2>
        <p className="mt-2 text-sm text-muted">{needed.length ? needed.join(", ") : "None marked as needed."}</p>
      </div>
    </section>
  );
}

function Inverse() {
  return (
    <section className="rounded-[var(--radius-md)] border border-border bg-surface p-4">
      <h2 className="text-base font-medium text-fg">Named relations</h2>
      <ul className="mt-3 flex flex-col gap-2">
        {RELATIONS.map((edge) => (
          <li key={edge.from} className="text-sm text-fg">
            {edge.from} → {edge.to}
            <span className="mt-1 block text-muted">{edge.standing}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-sm text-muted">The picture has more rooms. They are not named for this member yet.</p>
    </section>
  );
}

function Origami({ guard, onGuard }: { guard: Guard; onGuard: (guard: Guard) => void }) {
  return (
    <section className="rounded-[var(--radius-md)] border border-border bg-surface p-4">
      <h2 className="text-base font-medium text-fg">Lanes present</h2>
      <p className="mt-2 text-sm text-fg">{LANES_PRESENT.join(" · ")}</p>
      <p className="mt-4 text-sm text-muted">This member sets whether an existing API may be opened. It is a switch, not a verdict.</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {GUARDS.map((item) => (
          <Button key={item.id} type="button" size="sm" variant={guard === item.id ? "default" : "outline"} onClick={() => onGuard(item.id)}>
            {item.label}
          </Button>
        ))}
      </div>
    </section>
  );
}

function Gates({ system }: { system: string }) {
  return (
    <section className="rounded-[var(--radius-md)] border border-border bg-surface p-4">
      <h2 className="text-center text-base font-medium text-fg">{system.trim() || "Unnamed system"}</h2>
      <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {GATES.map((gate) => (
          <li key={gate} className="rounded-[var(--radius-sm)] border border-border px-3 py-2 text-sm text-fg">
            {gate}
          </li>
        ))}
      </ul>
      <p className="mt-3 text-sm text-muted">Meta, Invra, and Hyper are names on the picture. They are not separate systems yet.</p>
    </section>
  );
}

function Boot({ member }: { member: Member }) {
  const steps = bootSteps(member);
  return (
    <ol className="grid gap-2 sm:grid-cols-2">
      {steps.map((step, index) => (
        <li key={step.id} className="rounded-[var(--radius-md)] border border-border bg-surface p-4">
          <p className="text-xs text-subtle">0{index + 1}</p>
          <p className="mt-1 text-sm text-fg">{step.label}</p>
          <p className="mt-1 text-xs text-muted">{step.done ? "Set" : "Waiting"}</p>
        </li>
      ))}
    </ol>
  );
}

function Roles({ role, onRole }: { role: Role; onRole: (role: Role) => void }) {
  const copy: Record<Role, string> = {
    field: "Locate notes and the wait. A planning ticket is not permission. No ticket service is connected.",
    accountant: "No ledger is connected. Hours and cost are not kept here.",
    coordinator: "Desk handoff: engineer, business office, logs, drilling. The locate owner is still open.",
  };
  return (
    <div className="grid gap-2">
      {ROLES.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onRole(item.id)}
          className={`rounded-[var(--radius-md)] border p-4 text-left ${role === item.id ? "border-accent bg-surface" : "border-border bg-surface"}`}
        >
          <span className="text-sm font-medium text-fg">{item.label}</span>
          <span className="mt-1 block text-sm text-muted">{copy[item.id]}</span>
        </button>
      ))}
    </div>
  );
}
