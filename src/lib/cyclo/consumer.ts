import type { TofarEvent } from "./tofar.ts";

export type ChainHead = {
  lane: string;
  alpha_selected: number | null;
  alpha_candidates: number[];
  prior_trace_id: string | null;
  prior_event_hash: string | null;
  updated_at: string | null;
  consumed_trace_id: string | null;
};

export const EMPTY_HEAD: ChainHead = {
  lane: "rf.discovery.cyclic",
  alpha_selected: null,
  alpha_candidates: [],
  prior_trace_id: null,
  prior_event_hash: null,
  updated_at: null,
  consumed_trace_id: null,
};

/**
 * Reads the latest main-lane event with a next_time_hint and updates the chain head.
 * This is the reader that closes the loop — a hint field on a write is not enough.
 */
export function consumeNextTimeHint(events: TofarEvent[], head: ChainHead): ChainHead {
  const hinted = [...events].reverse().find((e) => {
    const md = e.metadata as { next_time_hint?: { alpha_selected?: number } | null };
    return Boolean(md.next_time_hint?.alpha_selected != null);
  });
  if (!hinted) return head;
  if (hinted.trace_id === head.consumed_trace_id) return head;
  const md = hinted.metadata as {
    next_time_hint: { alpha_selected: number; action: string };
  };
  const alpha = md.next_time_hint.alpha_selected;
  return {
    lane: hinted.lane,
    alpha_selected: alpha,
    alpha_candidates: [alpha, ...head.alpha_candidates.filter((a) => a !== alpha)].slice(0, 8),
    prior_trace_id: hinted.trace_id,
    prior_event_hash: hinted.cred_tofar_hash,
    updated_at: new Date().toISOString(),
    consumed_trace_id: hinted.trace_id,
  };
}
