import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CAPABILITIES,
  CONTEXTS,
  LAUNCH_SERVICES,
  contextKey,
  visibleButtons,
  type ContextId,
} from "@/lib/mobius/buttonscape";
import {
  LOOPS,
  MALL_POSITIONS,
  WORKSURFACE_KEY,
  appendCommand,
  attachEvidence,
  browserClock,
  createCard,
  emptyWork,
  recordLaunch,
  recordMall,
  restoreWork,
  revokeReceipt,
  selectCard,
  setLoop,
  type WorkState,
} from "@/lib/mobius/worksurface";

function loadWork(): WorkState {
  try {
    const raw = localStorage.getItem(WORKSURFACE_KEY);
    return raw ? restoreWork(JSON.parse(raw) as unknown) : emptyWork();
  } catch {
    return emptyWork();
  }
}

export function WorkSurface() {
  const [state, setState] = useState<WorkState>(emptyWork);
  const [hydrated, setHydrated] = useState(false);
  const [title, setTitle] = useState("");
  const [source, setSource] = useState("");
  const [note, setNote] = useState("");
  const [reference, setReference] = useState("");
  const [context, setContext] = useState<ContextId>("cyclic");
  const [query, setQuery] = useState("");
  const [pendingAsk, setPendingAsk] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setState(loadWork());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(WORKSURFACE_KEY, JSON.stringify(state));
    } catch {
      /* storage full — in-memory session still works */
    }
  }, [state, hydrated]);

  const buttons = useMemo(
    () => visibleButtons(context, state.receipts.some((r) => r.type === "hud.command" && r.extra?.capabilityId === "share.dispatch" && !r.revoked)),
    [context, state.receipts],
  );

  function commit(next: WorkState) {
    setState(next);
  }

  function onCapability(capabilityId: string) {
    const cap = CAPABILITIES.find((c) => c.id === capabilityId);
    if (!cap) return;
    const vis = buttons.find((b) => b.capabilityId === capabilityId);
    if (!vis) return;
    if (cap.policy === "ask" && pendingAsk !== capabilityId) {
      setPendingAsk(capabilityId);
      return;
    }
    setPendingAsk(null);
    let next = appendCommand(
      state,
      { capabilityId, verb: vis.verb, contextId: context, action: cap.policy },
      browserClock,
    );
    if (capabilityId === "source.create") next = createCard(next, title, source);
    if (capabilityId === "evidence.attach" && state.selected) {
      next = attachEvidence(next, state.selected, note, reference);
    }
    if (capabilityId === "mall.record") next = recordMall(next);
    if (capabilityId === "share.dispatch") exportState(next);
    commit(next);
  }

  function launch(id: string) {
    const svc = LAUNCH_SERVICES.find((s) => s.id === id);
    if (!svc) return;
    const q = query.trim() || title.trim() || "Möbiius Cyclic Lab";
    const href = svc.href(q);
    const next = recordLaunch(state, { id: svc.id, href, fillsQuery: svc.fillsQuery });
    commit(next);
    if (!svc.fillsQuery) {
      void navigator.clipboard?.writeText(q).then(() => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1600);
      });
    }
    window.open(href, "_blank", "noopener,noreferrer");
  }

  const selected = state.cards.find((c) => c.id === state.selected);
  const evidenceFor = state.evidence.filter((e) => e.source_id === state.selected);

  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm text-muted">
        One proof loop. Buttons project a capability. They do not call Gmail, MCP, or a model.
        Services open in a new tab on your click.
      </p>

      <section className="rounded-[var(--radius-xl)] border border-border bg-surface p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-sm font-medium text-fg">Buttonscape</h2>
          <Badge>{contextKey(context, "observed", "low")}</Badge>
        </div>
        <label className="mt-3 block text-xs text-subtle">
          Context
          <select
            className="mt-1 h-11 w-full rounded-[var(--radius-sm)] border border-border bg-bg px-3 text-sm text-fg"
            value={context}
            onChange={(e) => setContext(e.target.value as ContextId)}
          >
            {CONTEXTS.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </label>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
          {buttons.map((b) => (
            <Button
              key={b.capabilityId}
              type="button"
              variant={pendingAsk === b.capabilityId ? "default" : "outline"}
              onClick={() => onCapability(b.capabilityId)}
            >
              {pendingAsk === b.capabilityId ? `Confirm ${b.verb}` : b.verb}
            </Button>
          ))}
        </div>
        {pendingAsk ? (
          <p className="mt-3 text-xs text-warn">Ask gate. Tap again to confirm. No silent send.</p>
        ) : null}
      </section>

      <div className="flex flex-wrap gap-2">
        {LOOPS.map((loop) => (
          <Button
            key={loop}
            type="button"
            size="sm"
            variant={state.loop === loop ? "default" : "outline"}
            onClick={() => commit(setLoop(state, loop))}
          >
            {loop}
          </Button>
        ))}
      </div>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-[var(--radius-xl)] border border-border bg-surface p-4 sm:p-5">
          <h2 className="text-sm font-medium text-fg">SORT / SourceCard</h2>
          <label className="mt-3 block text-xs text-subtle">
            Title
            <input
              className="mt-1 h-11 w-full rounded-[var(--radius-sm)] border border-border bg-bg px-3 text-sm text-fg"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="First field note"
            />
          </label>
          <label className="mt-3 block text-xs text-subtle">
            Source text
            <textarea
              className="mt-1 min-h-28 w-full rounded-[var(--radius-sm)] border border-border bg-bg px-3 py-2 text-sm text-fg"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="We need a printable packet for this job."
            />
          </label>
          <Button
            className="mt-3"
            type="button"
            disabled={!title.trim() || !source || !hydrated}
            onClick={() => {
              commit(createCard(state, title, source));
              setTitle("");
              setSource("");
            }}
          >
            Create SourceCard
          </Button>
        </div>

        <div className="rounded-[var(--radius-xl)] border border-border bg-surface p-4 sm:p-5">
          <h2 className="text-sm font-medium text-fg">RESEARCH / Evidence</h2>
          <label className="mt-3 block text-xs text-subtle">
            Card
            <select
              className="mt-1 h-11 w-full rounded-[var(--radius-sm)] border border-border bg-bg px-3 text-sm text-fg"
              value={state.selected ?? ""}
              onChange={(e) => commit(selectCard(state, e.target.value))}
            >
              <option value="">Select a card</option>
              {state.cards.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </label>
          <label className="mt-3 block text-xs text-subtle">
            Note
            <input
              className="mt-1 h-11 w-full rounded-[var(--radius-sm)] border border-border bg-bg px-3 text-sm text-fg"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </label>
          <label className="mt-3 block text-xs text-subtle">
            Reference (stored as text)
            <input
              className="mt-1 h-11 w-full rounded-[var(--radius-sm)] border border-border bg-bg px-3 text-sm text-fg"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
            />
          </label>
          <Button
            className="mt-3"
            type="button"
            disabled={!state.selected || !note.trim()}
            onClick={() => {
              if (!state.selected) return;
              commit(attachEvidence(state, state.selected, note, reference));
              setNote("");
              setReference("");
            }}
          >
            Attach evidence
          </Button>
          {selected ? (
            <p className="mt-3 font-mono text-[11px] break-all text-subtle">sha256 {selected.sha256}</p>
          ) : null}
          {evidenceFor.map((e) => (
            <p key={e.id} className="mt-2 text-sm text-muted">
              {e.note}
              {e.reference ? ` · ${e.reference}` : ""}
            </p>
          ))}
        </div>
      </section>

      <section className="rounded-[var(--radius-xl)] border border-border bg-surface p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-sm font-medium text-fg">MALL / Transform</h2>
          <Badge>{selected ? `stage ${state.stage + 1}/8` : "select a card"}</Badge>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-1 sm:grid-cols-4 lg:grid-cols-8">
          {MALL_POSITIONS.map((label, i) => (
            <div
              key={label}
              className={`rounded-[var(--radius-sm)] border px-2 py-3 text-center text-[11px] ${
                i === state.stage && selected
                  ? "border-accent text-fg"
                  : i < state.stage && selected
                    ? "border-border text-muted"
                    : "border-border text-subtle"
              }`}
            >
              {label}
            </div>
          ))}
        </div>
        <Button className="mt-4" type="button" disabled={!state.selected} onClick={() => commit(recordMall(state))}>
          Record {selected ? MALL_POSITIONS[state.stage] : "…"}
        </Button>
      </section>

      <section className="rounded-[var(--radius-xl)] border border-border bg-surface p-4 sm:p-5">
        <h2 className="text-sm font-medium text-fg">Launch</h2>
        <p className="mt-2 text-sm text-muted">
          Query is filled where the service accepts it. Others open the app; the text is copied for paste.
        </p>
        <input
          className="mt-3 h-11 w-full rounded-[var(--radius-sm)] border border-border bg-bg px-3 text-sm text-fg"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Intention to carry into a service"
        />
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
          {LAUNCH_SERVICES.map((s) => (
            <Button key={s.id} type="button" variant="outline" onClick={() => launch(s.id)}>
              {s.label}
            </Button>
          ))}
        </div>
        {copied ? <p className="mt-2 text-xs text-ok">Query copied. Paste in the opened tab.</p> : null}
      </section>

      <section className="rounded-[var(--radius-xl)] border border-border bg-surface p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-sm font-medium text-fg">RECEIPT / Return</h2>
          <div className="flex gap-2">
            <Button type="button" size="sm" variant="outline" onClick={() => exportState(state)}>
              Export
            </Button>
          </div>
        </div>
        {state.receipts.length === 0 ? (
          <p className="mt-3 text-sm text-muted">No receipts. Create a card to start the first trip.</p>
        ) : (
          <ul className="mt-3 flex max-h-80 flex-col gap-2 overflow-auto">
            {state.receipts.map((r) => (
              <li
                key={r.id}
                className="flex items-start justify-between gap-3 rounded-[var(--radius-sm)] border border-border px-3 py-2"
              >
                <div>
                  <p className={`text-sm ${r.revoked ? "text-subtle line-through" : "text-fg"}`}>{r.type}</p>
                  <p className="font-mono text-[11px] text-subtle">
                    {r.script ?? r.extra?.verb ?? r.point} · {r.action}/{r.evidence}
                  </p>
                </div>
                {!r.revoked && r.type !== "receipt.revoked" ? (
                  <Button type="button" size="sm" variant="ghost" onClick={() => commit(revokeReceipt(state, r.id))}>
                    Revoke
                  </Button>
                ) : (
                  <Badge tone="danger">revoked</Badge>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function exportState(state: WorkState) {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "mobiius-worksurface.json";
  a.click();
  URL.revokeObjectURL(a.href);
}
