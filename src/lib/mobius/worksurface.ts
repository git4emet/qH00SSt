import { sha256 } from "@noble/hashes/sha2.js";

export const WORKSURFACE_SCHEMA = "mobiius.worksurface.v1";
export const WORKSURFACE_KEY = "mobiius-shared-worksurface-v1";

export const LOOPS = ["WELCOME", "BUILD", "REPAIR", "RETURN"] as const;
export type Loop = (typeof LOOPS)[number];

export const MALL_POSITIONS = [
  "Current point",
  "Correlate space",
  "Available points",
  "Available avenues",
  "Selection",
  "Transition",
  "New point + script",
  "Continue",
] as const;

export type SourceCard = {
  id: string;
  title: string;
  source: string;
  sha256: string;
};

export type Evidence = {
  id: string;
  source_id: string;
  note: string;
  reference: string;
};

export type WorkReceipt = {
  id: string;
  type: string;
  at: string;
  point: string;
  script?: string;
  card?: string;
  action: "allow" | "ask" | "block";
  evidence: "keep" | "defer" | "promote" | "revoke";
  extra?: Record<string, string>;
  revoked?: boolean;
};

export type WorkState = {
  schema: typeof WORKSURFACE_SCHEMA;
  cards: SourceCard[];
  evidence: Evidence[];
  receipts: WorkReceipt[];
  point: string;
  loop: Loop;
  stage: number;
  selected: string | null;
};

export type WorkClock = {
  now: () => string;
  id: () => string;
};

export const browserClock: WorkClock = {
  now: () => new Date().toISOString(),
  id: () => crypto.randomUUID(),
};

export function emptyWork(): WorkState {
  return {
    schema: WORKSURFACE_SCHEMA,
    cards: [],
    evidence: [],
    receipts: [],
    point: "p:welcome",
    loop: "WELCOME",
    stage: 0,
    selected: null,
  };
}

export function digestUtf8(text: string): string {
  const bytes = sha256(new TextEncoder().encode(text));
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

function receipt(
  state: WorkState,
  clock: WorkClock,
  type: string,
  fields: Partial<WorkReceipt>,
): WorkReceipt {
  return {
    id: clock.id(),
    type,
    at: clock.now(),
    point: state.point,
    action: "allow",
    evidence: "keep",
    ...fields,
  };
}

export function createCard(
  state: WorkState,
  title: string,
  source: string,
  clock: WorkClock = browserClock,
): WorkState {
  const t = title.trim();
  if (!t || !source) return state;
  const card: SourceCard = {
    id: clock.id(),
    title: t,
    source,
    sha256: digestUtf8(source),
  };
  const next = { ...state, cards: [card, ...state.cards] };
  return {
    ...next,
    receipts: [
      receipt(next, clock, "source.created", { card: card.id, extra: { sha256: card.sha256 } }),
      ...state.receipts,
    ],
  };
}

export function attachEvidence(
  state: WorkState,
  sourceId: string,
  note: string,
  reference: string,
  clock: WorkClock = browserClock,
): WorkState {
  const n = note.trim();
  if (!n || !state.cards.some((c) => c.id === sourceId)) return state;
  const ev: Evidence = { id: clock.id(), source_id: sourceId, note: n, reference: reference.trim() };
  return {
    ...state,
    evidence: [ev, ...state.evidence],
    receipts: [
      receipt(state, clock, "evidence.attached", { card: sourceId, extra: { evidence: ev.id } }),
      ...state.receipts,
    ],
  };
}

export function setLoop(state: WorkState, loop: Loop, clock: WorkClock = browserClock): WorkState {
  const next = { ...state, loop, point: `p:${loop.toLowerCase()}` };
  return {
    ...next,
    receipts: [receipt(next, clock, "coordinate.updated", { extra: { loop } }), ...state.receipts],
  };
}

export function selectCard(
  state: WorkState,
  cardId: string,
  clock: WorkClock = browserClock,
): WorkState {
  if (!state.cards.some((c) => c.id === cardId)) return state;
  const next = { ...state, selected: cardId, stage: 0 };
  return {
    ...next,
    receipts: [receipt(next, clock, "avenue.selected", { card: cardId }), ...state.receipts],
  };
}

export function recordMall(state: WorkState, clock: WorkClock = browserClock): WorkState {
  if (!state.selected) return state;
  const label = MALL_POSITIONS[state.stage];
  const last = state.stage === 7;
  const nextStage = last ? 0 : state.stage + 1;
  const point = last ? `p:return:${clock.id()}` : state.point;
  const type = last ? "script.recorded" : "transition.instantiated";
  const next = { ...state, stage: nextStage, point };
  return {
    ...next,
    receipts: [
      receipt(next, clock, type, { card: state.selected, script: label }),
      ...state.receipts,
    ],
  };
}

export function revokeReceipt(
  state: WorkState,
  receiptId: string,
  clock: WorkClock = browserClock,
): WorkState {
  const receipts = state.receipts.map((r) =>
    r.id === receiptId ? { ...r, revoked: true, evidence: "revoke" as const } : r,
  );
  return {
    ...state,
    receipts: [receipt(state, clock, "receipt.revoked", { extra: { target: receiptId } }), ...receipts],
  };
}

export function appendCommand(
  state: WorkState,
  payload: { capabilityId: string; verb: string; contextId: string; action: WorkReceipt["action"] },
  clock: WorkClock = browserClock,
): WorkState {
  if (payload.action === "block") return state;
  return {
    ...state,
    receipts: [
      receipt(state, clock, "hud.command", {
        action: payload.action,
        extra: {
          capabilityId: payload.capabilityId,
          verb: payload.verb,
          contextId: payload.contextId,
        },
      }),
      ...state.receipts,
    ],
  };
}

export function recordLaunch(
  state: WorkState,
  service: { id: string; href: string; fillsQuery: boolean },
  clock: WorkClock = browserClock,
): WorkState {
  return {
    ...state,
    receipts: [
      receipt(state, clock, "launch.opened", {
        action: "ask",
        extra: {
          service: service.id,
          href: service.href,
          fillsQuery: String(service.fillsQuery),
        },
      }),
      ...state.receipts,
    ],
  };
}

export function restoreWork(raw: unknown): WorkState {
  if (!raw || typeof raw !== "object") return emptyWork();
  const o = raw as Partial<WorkState>;
  if (o.schema !== WORKSURFACE_SCHEMA) return emptyWork();
  if (!Array.isArray(o.cards) || !Array.isArray(o.evidence) || !Array.isArray(o.receipts)) {
    return emptyWork();
  }
  const stage = typeof o.stage === "number" && o.stage >= 0 && o.stage <= 7 ? o.stage : 0;
  const loop = LOOPS.includes(o.loop as Loop) ? (o.loop as Loop) : "WELCOME";
  return {
    schema: WORKSURFACE_SCHEMA,
    cards: o.cards,
    evidence: o.evidence,
    receipts: o.receipts,
    point: typeof o.point === "string" ? o.point : "p:welcome",
    loop,
    stage,
    selected: typeof o.selected === "string" || o.selected === null ? o.selected : null,
  };
}
