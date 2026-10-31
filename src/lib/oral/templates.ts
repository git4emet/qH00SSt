import { CONNECT, DESKS, type ConnectService } from "./catalog.ts";

export type Role = "field" | "accountant" | "coordinator";
export type Guard = "allow" | "ask" | "block";

export type Member = {
  name: string;
  system: string;
  role: Role;
  templateId: string;
  using: string[];
  declared: string[];
  guard: Guard;
};

export const EMPTY_MEMBER: Member = {
  name: "",
  system: "",
  role: "coordinator",
  templateId: "dashboard",
  using: [],
  declared: [],
  guard: "ask",
};

export type Slot = { id: string; name: string; why: string };

/** Outside services this bench does not call. A local slot can stand in. */
export const MISSING: Slot[] = [
  {
    id: "gsoc-ticket",
    name: "GSOC ticket service",
    why: "The handbook is noted here. No ticket client is connected.",
  },
  {
    id: "aet-lims",
    name: "AET laboratory system",
    why: "The desks are named. No laboratory login is connected.",
  },
  {
    id: "field-board",
    name: "Field board",
    why: "This page can draw marks. No board is attached.",
  },
  {
    id: "ledger",
    name: "Project ledger",
    why: "No books are connected.",
  },
];

export const TEMPLATES = [
  {
    id: "dashboard",
    name: "Dashboard",
    file: "2019.png",
    grows: "One member, a glyph, the trust setting, and the desks that are named.",
  },
  {
    id: "paths",
    name: "Two paths",
    file: "2018.png",
    grows: "This browser on one side. The drawn math on the other. The board is not attached.",
  },
  {
    id: "panels",
    name: "Two panels",
    file: "2017.png",
    grows: "What this member already uses, and what is still missing.",
  },
  {
    id: "inverse",
    name: "Inverse",
    file: "2023.png",
    grows: "Relations already named. Rooms in the picture with no name stay unnamed.",
  },
  {
    id: "origami",
    name: "Origami",
    file: "2024.jpg",
    grows: "The lanes that exist, and a local allow, ask, or block this member sets.",
  },
  {
    id: "gates",
    name: "Seven gates",
    file: "2028.jpg",
    grows: "Seven desks around the system this member is joining.",
  },
  {
    id: "boot",
    name: "Boot",
    file: "2027.jpg",
    grows: "Four steps on this page. Ready means a name is set. It is not a machine boot.",
  },
  {
    id: "roles",
    name: "Roles",
    file: "2029.jpg",
    grows: "Field, accountant, or coordinator. The books stay closed until a ledger exists.",
  },
] as const;

export const RELATIONS = [
  { from: "Engineer", to: "Business office", standing: "Named in the mail. The locate owner is still open." },
  { from: "Petrography", to: "Ground", standing: "Petrography does not break ground." },
  { from: "Planning ticket", to: "Excavation", standing: "A planning ticket is not permission." },
] as const;

export const GATES = [
  "Construction",
  "Geotechnical",
  "Pavements",
  "Building",
  "Nondestructive",
  "Environmental",
  "Petrography",
] as const;

export const LANES_PRESENT = ["Oral", "Loop", "Grow", "Work", "Cyclic", "Skill", "Atlas"] as const;

const ROLE_DESKS: Record<Role, readonly string[]> = {
  field: ["GSOC", "Field"],
  coordinator: ["Petrography", "Geotechnical", "Construction"],
  accountant: [],
};

export function templateById(id: string) {
  return TEMPLATES.find((item) => item.id === id) ?? TEMPLATES[0];
}

/** Same seed, same path. A glyph for the member, not a measurement. */
export function glyphPath(seed: string): string {
  let n = 1;
  const source = seed.trim() || "member";
  for (const char of source) n = (n * 33 + char.charCodeAt(0)) % 997;
  const R = 42;
  const r = 11 + (n % 6);
  const d = 18 + (n % 8);
  const k = (R - r) / r;
  let path = "";
  for (let step = 0; step <= 180; step++) {
    const t = (step / 180) * Math.PI * 6;
    const x = (R - r) * Math.cos(t) + d * Math.cos(k * t);
    const y = (R - r) * Math.sin(t) - d * Math.sin(k * t);
    path += `${step === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`;
  }
  return path;
}

export function desksFor(role: Role): string[] {
  return ROLE_DESKS[role].filter((desk) => (DESKS as readonly string[]).includes(desk));
}

export function knownApis(ids: string[]): ConnectService[] {
  return CONNECT.filter((service) => ids.includes(service.id));
}

export function slotsFor(declared: string[]) {
  return {
    needed: MISSING.filter((slot) => declared.includes(slot.id)),
    absent: MISSING.filter((slot) => !declared.includes(slot.id)),
  };
}

export function localSlot(member: Member, slotId: string) {
  const slot = MISSING.find((item) => item.id === slotId);
  return {
    standing: "local" as const,
    outside: false,
    member: member.name.trim() || "unnamed",
    system: member.system.trim() || "unnamed",
    slot: slot?.name ?? slotId,
    note: "This origin only. The outside service is not connected.",
  };
}

export function bootSteps(member: Member) {
  const picture = templateById(member.templateId);
  return [
    { id: "picture", label: `Picture loaded: ${picture.name}`, done: true },
    {
      id: "scan",
      label: member.using.length ? `${member.using.length} existing APIs marked` : "No existing API marked yet",
      done: member.using.length > 0,
    },
    { id: "init", label: `Template: ${picture.name}`, done: true },
    {
      id: "ready",
      label: member.name.trim() ? `${member.name.trim()} on this origin` : "Waiting for a name",
      done: member.name.trim().length > 0,
    },
  ];
}

export function restoreMember(raw: unknown): Member {
  if (!raw || typeof raw !== "object") return { ...EMPTY_MEMBER };
  const record = raw as Partial<Member>;
  const templateId = TEMPLATES.some((item) => item.id === record.templateId)
    ? String(record.templateId)
    : EMPTY_MEMBER.templateId;
  const role =
    record.role === "field" || record.role === "accountant" || record.role === "coordinator"
      ? record.role
      : EMPTY_MEMBER.role;
  const guard =
    record.guard === "allow" || record.guard === "ask" || record.guard === "block"
      ? record.guard
      : EMPTY_MEMBER.guard;
  const using = Array.isArray(record.using)
    ? record.using.filter((id) => typeof id === "string" && CONNECT.some((service) => service.id === id))
    : [];
  const declared = Array.isArray(record.declared)
    ? record.declared.filter((id) => typeof id === "string" && MISSING.some((slot) => slot.id === id))
    : [];
  return {
    name: typeof record.name === "string" ? record.name.slice(0, 80) : "",
    system: typeof record.system === "string" ? record.system.slice(0, 80) : "",
    role,
    templateId,
    using,
    declared,
    guard,
  };
}
