import { useMemo, useState, type ReactNode } from "react";
import { Activity, GitCommitHorizontal, Radio, Shield } from "lucide-react";
import { Heatmap } from "@/components/lab/heatmap";
import { ProfileChart } from "@/components/lab/profile-chart";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CARRIER_ANCHOR,
  FEATURES,
  FEATURE_WEIGHTS,
  MESH_OVERLAY,
  N_ALPHA_DESIGN,
  P_FA,
  TRUST_FLOOR,
  type FeatureId,
} from "@/lib/cyclo/constants";
import { EMPTY_HEAD, type ChainHead } from "@/lib/cyclo/consumer";
import { chi2Df2Threshold } from "@/lib/cyclo/glrt";
import { runScan } from "@/lib/cyclo/pipeline";
import type { Ledger, TofarEvent } from "@/lib/cyclo/tofar";

const ADDRESS = "p:2:3:5:7:11:13";

export function CyclicLab({ embedded = false }: { embedded?: boolean }) {
  const [symbolRate, setSymbolRate] = useState(0.05);
  const [snrDb, setSnrDb] = useState(12);
  const [pfa, setPfa] = useState(P_FA);
  const [feature, setFeature] = useState<FeatureId>(FEATURES.strict);
  const [nSymbols, setNSymbols] = useState(256);
  const [busy, setBusy] = useState(false);
  const [ledger, setLedger] = useState<Ledger>({ provenance: [], trainingwheels: [] });
  const [head, setHead] = useState<ChainHead>(EMPTY_HEAD);
  const [last, setLast] = useState<ReturnType<typeof runScan> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [seed, setSeed] = useState(1);

  const singleThreshold = useMemo(() => chi2Df2Threshold(pfa), [pfa]);
  const featureMeta = FEATURE_WEIGHTS[feature];

  function scan() {
    setBusy(true);
    setError(null);
    window.setTimeout(() => {
      try {
        const out = runScan(
          {
            fs: 1,
            symbolRate,
            nSymbols,
            snrDb,
            seed,
            nfft: 256,
            windowLen: 128,
            hop: 64,
            pfa,
            feature,
            address: ADDRESS,
          },
          ledger,
          head,
        );
        setLast(out);
        setLedger(out.ledger);
        setHead(out.head);
        setSeed((s) => s + 1);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Scan failed");
      } finally {
        setBusy(false);
      }
    }, 20);
  }

  const decision = last?.event.params.decision as string | undefined;
  const gate = last?.event.metadata.gate_decision as string | undefined;
  const M = last?.M ?? N_ALPHA_DESIGN;
  const inner = (
    <>
      {!embedded ? (
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">RF · cyclic</p>
          <h1 className="font-display mt-1 text-3xl tracking-[-0.03em] text-fg sm:text-4xl text-balance">
            Cyclic Lab
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted text-pretty">
            Peak-pick cyclic frequencies from the signal. Twin primes 8009/8011 stay on the carrier
            band. GLRT uses N_α = M actually scanned this frame.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge>trust floor {TRUST_FLOOR}</Badge>
          <Badge tone="accent">P_FA {pfa}</Badge>
          <Badge>N_α design {N_ALPHA_DESIGN}</Badge>
        </div>
      </header>
      ) : (
        <div className="flex flex-wrap gap-2">
          <Badge>trust floor {TRUST_FLOOR}</Badge>
          <Badge tone="accent">P_FA {pfa}</Badge>
          <Badge>N_α design {N_ALPHA_DESIGN}</Badge>
        </div>
      )}

      <AtlasStrip />

      <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <div className="flex flex-col gap-4 rounded-[var(--radius-xl)] border border-border bg-surface p-4 sm:p-5">
          <Field label="Symbol rate f_sym" value={symbolRate.toFixed(3)}>
            <input
              type="range"
              min={0.03}
              max={0.12}
              step={0.005}
              value={symbolRate}
              onChange={(e) => setSymbolRate(Number(e.target.value))}
            />
          </Field>
          <Field label="SNR dB" value={String(snrDb)}>
            <input
              type="range"
              min={0}
              max={24}
              step={1}
              value={snrDb}
              onChange={(e) => setSnrDb(Number(e.target.value))}
            />
          </Field>
          <Field label="Symbols" value={String(nSymbols)}>
            <input
              type="range"
              min={128}
              max={512}
              step={64}
              value={nSymbols}
              onChange={(e) => setNSymbols(Number(e.target.value))}
            />
          </Field>
          <fieldset className="flex flex-col gap-2">
            <legend className="text-xs font-medium text-muted">P_FA</legend>
            <div className="flex flex-wrap gap-2">
              {[0.05, 0.01, 0.001].map((p) => (
                <Button
                  key={p}
                  type="button"
                  size="sm"
                  variant={pfa === p ? "default" : "outline"}
                  onClick={() => setPfa(p)}
                >
                  {p}
                </Button>
              ))}
            </div>
            <p className="text-xs text-subtle tabular-nums">
              χ²₂ λ = {singleThreshold.toFixed(2)} · Bonferroni λ = −2 ln(P_FA / M)
            </p>
          </fieldset>
          <fieldset className="flex flex-col gap-2">
            <legend className="text-xs font-medium text-muted">Feature lock</legend>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                size="sm"
                variant={feature === FEATURES.strict ? "default" : "outline"}
                onClick={() => setFeature(FEATURES.strict)}
              >
                Strict · observed+derived
              </Button>
              <Button
                type="button"
                size="sm"
                variant={feature === FEATURES.tolerant ? "default" : "outline"}
                onClick={() => setFeature(FEATURES.tolerant)}
              >
                Tolerant · includes proposed
              </Button>
            </div>
            {featureMeta.certaintyWeight < TRUST_FLOOR ? (
              <p className="text-xs text-warn">
                Weight {featureMeta.certaintyWeight} cannot clear the {TRUST_FLOOR} floor. Receipts
                route to training-wheels.
              </p>
            ) : null}
          </fieldset>
          <Button type="button" size="lg" onClick={scan} disabled={busy}>
            {busy ? "Scanning…" : "Run cyclic scan"}
          </Button>
          {error ? <p className="text-sm text-danger">{error}</p> : null}
        </div>

        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <Stat icon={Radio} label="Known α" value={last ? last.knownAlpha.toFixed(3) : "—"} />
            <Stat
              icon={Activity}
              label="Selected α"
              value={last?.selected ? last.selected.alpha.toFixed(3) : "—"}
            />
            <Stat icon={Shield} label="M / λ" value={last ? `${M} / ${last.threshold.toFixed(1)}` : "—"} />
            <Stat
              icon={GitCommitHorizontal}
              label="Gate"
              value={gate ?? "—"}
              tone={gate === "allow" ? "ok" : gate === "freeze" ? "warn" : "muted"}
            />
          </div>
          <Heatmap scf={last?.derive.scf ?? null} />
          <ProfileChart
            scf={last?.derive.scf ?? null}
            profile={last?.derive.profile ?? null}
            profileAxis={last?.derive.profileAxis ?? null}
            candidates={last?.scanned ?? []}
            knownAlpha={last?.knownAlpha ?? null}
            selected={last?.selected?.alpha ?? null}
          />
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Panel title="Candidates this frame">
          {!last ? (
            <p className="text-sm text-muted">Run a scan. Alphas come from the SCF, not 8009/8011.</p>
          ) : last.scanned.length === 0 ? (
            <p className="text-sm text-muted">No peaks above the noise-floor factor. Raise SNR or symbols.</p>
          ) : (
            <ul className="flex flex-col gap-2">
              {last.scanned.map((c) => (
                <li
                  key={`${c.alpha}-${c.origin}`}
                  className="flex items-center justify-between gap-3 rounded-[var(--radius-sm)] border border-border px-3 py-2"
                >
                  <div>
                    <p className="font-mono text-sm tabular-nums text-fg">{c.alpha.toFixed(4)}</p>
                    <p className="text-xs text-subtle">{c.origin}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      tone={c.tier === "observed" ? "ok" : c.tier === "derived" ? "accent" : "muted"}
                    >
                      {c.tier}
                    </Badge>
                    <span className="font-mono text-xs tabular-nums text-muted">
                      γ {c.gamma.toFixed(2)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <Panel title="Verdict">
          {!last ? (
            <p className="text-sm text-muted">
              Coherence floor {TRUST_FLOOR} is a filter. GLRT threshold is a different layer.
            </p>
          ) : (
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <Row k="Λ = 2Kγ²" v={Number(last.event.params.test_statistic).toFixed(2)} />
              <Row k="Threshold" v={last.threshold.toFixed(2)} />
              <Row k="Decision" v={String(decision)} />
              <Row k="p-value" v={Number(last.event.params.p_value).toExponential(2)} />
              <Row k="Certainty" v={last.event.certainty.toFixed(3)} />
              <Row k="K windows" v={String(last.event.params.K_windows)} />
              <Row k="N_α (M)" v={String(M)} />
              <Row k="Input hash" v={shortHash(String(last.event.metadata.input_hash))} />
            </dl>
          )}
        </Panel>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Panel title="Provenance lane">
          <EventList events={ledger.provenance} empty="Allow-gated receipts land here." />
        </Panel>
        <Panel title="Training-wheels lane">
          <EventList events={ledger.trainingwheels} empty="Freeze-gated receipts land here. The main ledger is not written." />
        </Panel>
      </section>

      <Panel title="Chain head (consumer)">
        <p className="mb-3 text-sm text-muted">
          Reader that acts on next_time_hint. A write with a hint field is not a closed loop.
        </p>
        <dl className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
          <Row k="α selected" v={head.alpha_selected != null ? head.alpha_selected.toFixed(4) : "—"} />
          <Row k="Consumed" v={head.consumed_trace_id ? shortHash(head.consumed_trace_id) : "—"} />
          <Row k="Prior cred" v={head.prior_event_hash ? shortHash(head.prior_event_hash) : "—"} />
          <Row k="Updated" v={head.updated_at ? head.updated_at.slice(11, 19) + "Z" : "—"} />
        </dl>
      </Panel>
    </>
  );
  if (embedded) return <div className="flex flex-col gap-6">{inner}</div>;
  return (
    <div className="mx-auto flex min-h-dvh max-w-6xl flex-col gap-6 px-4 py-6 pb-16 sm:px-6 sm:py-10">
      {inner}
    </div>
  );
}

function AtlasStrip() {
  const s = MESH_OVERLAY.static;
  const d = MESH_OVERLAY.local_dynamics;
  const r = MESH_OVERLAY.raster;
  return (
    <section className="grid gap-2 rounded-[var(--radius-xl)] border border-border bg-surface px-4 py-3 sm:grid-cols-4 sm:gap-4">
      <AtlasCell k="Static" v={`${s.name} = ${s.count}`} />
      <AtlasCell k="Local dynamics" v={`${d.count}`} />
      <AtlasCell k="Carrier band" v={`${CARRIER_ANCHOR.low_hz} / ${CARRIER_ANCHOR.high_hz}`} />
      <AtlasCell k="Raster" v={`${r.live}/${r.cells}`} />
    </section>
  );
}

function AtlasCell({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <p className="text-[11px] tracking-wide text-subtle uppercase">{k}</p>
      <p className="mt-0.5 font-mono text-sm tabular-nums text-fg">{v}</p>
    </div>
  );
}

function Field({
  label,
  value,
  children,
}: {
  label: string;
  value: string;
  children: ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="flex items-center justify-between text-xs font-medium text-muted">
        {label}
        <span className="font-mono tabular-nums text-fg">{value}</span>
      </span>
      {children}
    </label>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  tone = "muted",
}: {
  icon: typeof Radio;
  label: string;
  value: string;
  tone?: "muted" | "ok" | "warn";
}) {
  return (
    <div className="rounded-[var(--radius-lg)] border border-border bg-surface p-3">
      <div className="flex items-center gap-1.5 text-subtle">
        <Icon className="size-3.5" />
        <span className="text-[11px]">{label}</span>
      </div>
      <p
        className={`mt-1 font-mono text-sm tabular-nums ${
          tone === "ok" ? "text-ok" : tone === "warn" ? "text-warn" : "text-fg"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-[var(--radius-xl)] border border-border bg-surface p-4 sm:p-5">
      <h2 className="mb-3 text-sm font-medium tracking-tight text-fg">{title}</h2>
      {children}
    </section>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <>
      <dt className="text-subtle">{k}</dt>
      <dd className="font-mono text-xs tabular-nums text-fg break-all">{v}</dd>
    </>
  );
}

function EventList({ events, empty }: { events: TofarEvent[]; empty: string }) {
  if (!events.length) return <p className="text-sm text-muted">{empty}</p>;
  const shown = events.slice(-6).reverse();
  return (
    <ul className="flex flex-col gap-2">
      {shown.map((e) => (
        <li key={e.trace_id} className="rounded-[var(--radius-sm)] border border-border px-3 py-2">
          <p className="font-mono text-[11px] text-subtle">{shortHash(e.trace_id)}</p>
          <p className="mt-1 text-xs text-fg">
            {String(e.params.decision)} · γ-certainty {e.certainty.toFixed(3)} · α{" "}
            {Number(e.params.alpha_selected).toFixed(4)}
          </p>
        </li>
      ))}
    </ul>
  );
}

function shortHash(h: string) {
  const body = h.replace(/^(sha256:|blake2s:|evt_)/, "");
  return body.length > 16 ? `${h.slice(0, 18)}…` : h;
}
