export type LoopEvent = {
  id: string;
  kind: string;
  detail: string;
  at: string;
};

const NAME = "oral-loop-v1";
const log: LoopEvent[] = [];
const listeners = new Set<(event: LoopEvent) => void>();

export function recentLoops(): LoopEvent[] {
  return log.slice();
}

function remember(event: LoopEvent): void {
  if (log.some((item) => item.id === event.id)) return;
  log.unshift(event);
  if (log.length > 24) log.pop();
  for (const hear of listeners) hear(event);
}

export function postLoop(input: { kind: string; detail: string }): LoopEvent {
  const event: LoopEvent = {
    id: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `loop-${log.length}`,
    kind: input.kind,
    detail: input.detail,
    at: new Date().toISOString(),
  };
  remember(event);
  try {
    if (typeof BroadcastChannel === "undefined") return event;
    const channel = new BroadcastChannel(NAME);
    channel.postMessage(event);
    channel.close();
  } catch {
    /* this browser has no broadcast channel */
  }
  return event;
}

export function subscribeLoop(hear: (event: LoopEvent) => void): () => void {
  listeners.add(hear);
  let channel: BroadcastChannel | null = null;
  try {
    if (typeof BroadcastChannel !== "undefined") {
      channel = new BroadcastChannel(NAME);
      channel.onmessage = (message: MessageEvent<LoopEvent>) => remember(message.data);
    }
  } catch {
    channel = null;
  }
  return () => {
    listeners.delete(hear);
    channel?.close();
  };
}

/** A point on the plane, rotated and shifted by how many changes have happened. A local map, not a proof. */
export function affineTransit(step: number): { x: number; y: number } {
  const turn = step * 0.2;
  const a = Math.cos(turn);
  const b = Math.sin(turn);
  return {
    x: Math.round((a + step * 0.1) * 100) / 100,
    y: Math.round(b * 100) / 100,
  };
}
