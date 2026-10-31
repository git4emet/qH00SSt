import { useEffect, useMemo, useRef, useState } from "react";
import { ClipboardCopy, Download, FileUp, Mail, Square, SquareCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONNECT, DESK_TODOS, DESKS, FIELD_NOTES, type ConnectService, type DeskTodo } from "@/lib/oral/catalog";
import {
  dedupeNotes,
  ingestBuffer,
  notesFromText,
  notesToMarkdown,
  type OralNote,
} from "@/lib/oral/extract";
import { postLoop } from "@/lib/oral/loopback";

type View = "notes" | "ingest" | "desks" | "connect";
type Wait = { id: string; since: string; state: "waiting" | "landed" };

const KEY = "oral-bench-v1";

type Saved = {
  notes: OralNote[];
  done: string[];
  waits: Wait[];
};

function load(): Saved {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { notes: FIELD_NOTES, done: [], waits: [] };
    const parsed = JSON.parse(raw) as Saved;
    const notes = dedupeNotes([...(parsed.notes ?? []), ...FIELD_NOTES.filter((s) => !(parsed.notes ?? []).some((n) => n.id === s.id))]);
    return { notes, done: parsed.done ?? [], waits: parsed.waits ?? [] };
  } catch {
    return { notes: FIELD_NOTES, done: [], waits: [] };
  }
}

function download(filename: string, text: string) {
  const blob = new Blob([text], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

const VIEWS: { id: View; label: string }[] = [
  { id: "notes", label: "Notes" },
  { id: "ingest", label: "Ingest" },
  { id: "desks", label: "AET" },
  { id: "connect", label: "Connect" },
];

export function OralBench() {
  const [view, setView] = useState<View>("notes");
  const [notes, setNotes] = useState<OralNote[]>(FIELD_NOTES);
  const [done, setDone] = useState<string[]>([]);
  const [waits, setWaits] = useState<Wait[]>([]);
  const [ready, setReady] = useState(false);
  const [desk, setDesk] = useState<string>("Petrography");
  const [filter, setFilter] = useState<string>("All");
  const [paste, setPaste] = useState("");
  const [status, setStatus] = useState("");
  const [answering, setAnswering] = useState<string>("");
  const fileRef = useRef<HTMLInputElement>(null);
  const announced = useRef(false);

  useEffect(() => {
    const saved = load();
    setNotes(saved.notes);
    setDone(saved.done);
    setWaits(saved.waits);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(KEY, JSON.stringify({ notes, done, waits }));
    if (!announced.current) {
      announced.current = true;
      return;
    }
    postLoop({
      kind: "bench",
      detail: `${notes.length} notes, ${done.length} checks, ${waits.length} waits`,
    });
  }, [notes, done, waits, ready]);

  const shown = useMemo(
    () => (filter === "All" ? notes : notes.filter((n) => n.desk === filter)),
    [notes, filter],
  );
  const todos = DESK_TODOS.filter((t) => t.desk === desk);

  function addNotes(incoming: OralNote[], message: string) {
    setNotes((prev) => dedupeNotes([...incoming, ...prev]).slice(0, 80));
    setStatus(message);
    setView("notes");
    setFilter("All");
  }

  function onPasteRead() {
    const result = notesFromText(paste, "paste");
    if (result.notes.length === 0) {
      setStatus("Nothing in that paste resolved into a note. The code, if any, was set aside and not kept.");
      return;
    }
    const health = result.skippedHealth ? " A health line was left out." : "";
    const n = result.notes.length;
    const c = result.codeSetAside;
    addNotes(
      result.notes,
      `${n} ${n === 1 ? "note" : "notes"}. ${c} ${c === 1 ? "code block" : "code blocks"} set aside and not stored.${health}`,
    );
    setPaste("");
  }

  async function onFile(file: File) {
    const buf = await file.arrayBuffer();
    const result = await ingestBuffer(file.name, buf);
    if (answering) {
      setWaits((prev) => prev.map((w) => (w.id === answering ? { ...w, state: "landed" } : w)));
    }
    if (result.filesRead === 0 && /\.zip$/i.test(file.name)) {
      setStatus("That zip had no text, json, or html this bench could read. Unzip it and drop the conversation file.");
      return;
    }
    if (result.notes.length === 0) {
      setStatus(
        `Read ${file.name}. ${result.codeSetAside} code blocks set aside. No context note came out of what remained.`,
      );
      return;
    }
    const health = result.skippedHealth ? " A health line was left out." : "";
    const n = result.notes.length;
    const c = result.codeSetAside;
    addNotes(
      result.notes,
      `${file.name}: ${n} ${n === 1 ? "note" : "notes"} from ${result.filesRead} file${result.filesRead === 1 ? "" : "s"}. ${c} ${c === 1 ? "code block" : "code blocks"} set aside.${health}`,
    );
    setAnswering("");
  }

  async function copyNotes() {
    const text = notesToMarkdown(shown);
    try {
      await navigator.clipboard.writeText(text);
      setStatus("Notes copied. Paste them into the chat you just opened. The file is still the safer copy.");
    } catch {
      setStatus("Clipboard was blocked. Use Download notes instead.");
    }
  }

  function saveNotes() {
    download("oral-notes.md", notesToMarkdown(notes));
    setStatus("Notes file downloaded. It has no code in it.");
  }

  function openService(service: ConnectService) {
    window.open(service.openUrl, "_blank", "noopener,noreferrer");
    setStatus(
      service.delivery === "email"
        ? `${service.name} is open. If the export arrives by mail, come back and mark the wait, then drop the file.`
        : `${service.name} is open. Download the notes here first, then add that file over there.`,
    );
  }

  function markWait(id: string) {
    setWaits((prev) => {
      const rest = prev.filter((w) => w.id !== id);
      return [{ id, since: new Date().toISOString(), state: "waiting" }, ...rest];
    });
    setStatus("Waiting on that email. This bench will not poll an inbox.");
  }

  function fileFor(id: string) {
    setAnswering(id);
    setView("ingest");
    fileRef.current?.click();
  }

  return (
    <div className="flex flex-col gap-4">
      <input
        ref={fileRef}
        type="file"
        accept=".txt,.md,.json,.jsonl,.html,.htm,.zip,text/plain,application/json,application/zip"
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0];
          e.target.value = "";
          if (file) void onFile(file);
        }}
      />
      <p className="max-w-xl text-sm leading-relaxed text-muted">
        If this situation, then that action. The note is that binding: what set it off, what it was supposed to
        start, and which desk it belongs to. Code stays in the file you already have. This page does not sign in
        anywhere, and it does not keep what it strips.
      </p>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {VIEWS.map((v) => (
          <Button key={v.id} type="button" size="sm" variant={view === v.id ? "default" : "outline"} onClick={() => setView(v.id)}>
            {v.label}
          </Button>
        ))}
      </div>

      {status ? <p className="text-sm leading-relaxed text-fg">{status}</p> : null}

      {view === "notes" ? (
        <section className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={saveNotes}>
              <Download className="size-4" aria-hidden />
              Download notes
            </Button>
            <Button type="button" variant="outline" onClick={() => void copyNotes()}>
              <ClipboardCopy className="size-4" aria-hidden />
              Copy
            </Button>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {["All", ...DESKS.filter((d) => notes.some((n) => n.desk === d))].map((d) => (
              <Button key={d} type="button" size="sm" variant={filter === d ? "default" : "outline"} onClick={() => setFilter(d)}>
                {d}
              </Button>
            ))}
          </div>
          <ul className="flex flex-col gap-3">
            {shown.map((note) => (
              <li key={note.id} className="rounded-[var(--radius-md)] border border-border bg-surface p-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-xl leading-snug text-fg">{note.name}</h3>
                  <span className="text-xs tracking-wide text-muted uppercase">{note.desk}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-fg">
                  <span className="text-muted">Set off by. </span>
                  {note.trigger}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-fg">
                  <span className="text-muted">Supposed to do. </span>
                  {note.next}
                </p>
                <p className="mt-3 text-xs text-subtle">
                  {note.standing} · {note.source}
                  {note.codeSetAside > 0 ? ` · ${note.codeSetAside} code blocks set aside` : ""}
                </p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {view === "ingest" ? (
        <section className="flex flex-col gap-3">
          <p className="text-sm leading-relaxed text-muted">
            Paste a mixed thread, or drop a chat export. Fenced code, HTML, and program lines are counted and
            discarded. What remains is split into context notes. A zip is read in this browser for text, json, and
            html inside it.
          </p>
          <textarea
            value={paste}
            onChange={(e) => setPaste(e.target.value)}
            rows={8}
            placeholder="Paste the thread. Code in the paste is set aside."
            className="w-full resize-y rounded-[var(--radius-md)] border border-border bg-bg p-3 text-sm leading-relaxed text-fg placeholder:text-subtle"
          />
          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={onPasteRead} disabled={!paste.trim()}>
              Read the paste
            </Button>
            <Button type="button" variant="outline" onClick={() => fileRef.current?.click()}>
              <FileUp className="size-4" aria-hidden />
              {answering ? `Drop the ${answering} file` : "Drop a file"}
            </Button>
          </div>
          <p className="text-xs leading-relaxed text-subtle">
            ChatGPT and Claude exports usually arrive as a zip after an email. Grok’s download may be a zip or
            prod-grok-backend.json. DeepSeek often has no bulk button, so a share file or a mailed archive is the
            input. This page never stores the stripped code.
          </p>
        </section>
      ) : null}

      {view === "desks" ? (
        <section className="flex flex-col gap-3">
          <p className="rounded-[var(--radius-md)] border border-border bg-surface p-4 text-sm leading-relaxed text-fg">
            Coordination notes for desks named on teamaet.com. Not an AET procedure and not legal advice. The
            person who excavates still owns the notice. A planning ticket is not permission to dig. Spectra QEST
            and Construction Hive stay where they are. Nothing here is connected to them.
          </p>
          <p className="rounded-[var(--radius-md)] border border-border bg-bg p-4 text-sm leading-relaxed text-fg">
            Path named on 15 Oct, still a proposal: engineers request the drill, the business office assigns the
            lot, E&D Logs receives the job, the Drilling Coordinator directs the rig. The locate has no named
            owner on that path. The offered gate is that E&D Logs writes the ticket number and each operator’s
            response on the lot before release. Whether a rig moves before a ticket exists is still an open question.
          </p>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {DESKS.filter((d) => d !== "Field").map((d) => (
              <Button key={d} type="button" size="sm" variant={desk === d ? "default" : "outline"} onClick={() => setDesk(d)}>
                {d}
              </Button>
            ))}
          </div>
          <ul className="flex flex-col gap-2">
            {todos.map((todo) => (
              <TodoRow
                key={todo.id}
                todo={todo}
                done={done.includes(todo.id)}
                onToggle={() =>
                  setDone((prev) => (prev.includes(todo.id) ? prev.filter((id) => id !== todo.id) : [...prev, todo.id]))
                }
              />
            ))}
          </ul>
          {todos.length === 0 ? <p className="text-sm text-muted">No list on this desk.</p> : null}
          <p className="text-xs leading-relaxed text-subtle">
            {done.length} of {DESK_TODOS.length} steps checked, across every desk. Checked state stays on this phone.
          </p>
        </section>
      ) : null}

      {view === "connect" ? (
        <section className="flex flex-col gap-3">
          <p className="text-sm leading-relaxed text-muted">
            Direct means you download the notes and carry the file yourself. Email means the service mails a link
            later. This bench opens the service and then waits until you drop the file. It cannot see your inbox.
          </p>
          <ul className="flex flex-col gap-3">
            {CONNECT.map((service) => {
              const wait = waits.find((w) => w.id === service.id);
              return (
                <li key={service.id} className="rounded-[var(--radius-md)] border border-border bg-surface p-4">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-base font-medium text-fg">{service.name}</h3>
                    <span className="text-xs tracking-wide text-muted uppercase">
                      {service.delivery === "email" ? "Email, then a file" : "Direct file"}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{service.how}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button type="button" onClick={() => openService(service)}>
                      Open {service.name}
                    </Button>
                    {service.delivery === "email" ? (
                      <Button type="button" variant="outline" onClick={() => markWait(service.id)}>
                        <Mail className="size-4" aria-hidden />
                        I asked for the email
                      </Button>
                    ) : (
                      <Button type="button" variant="outline" onClick={saveNotes}>
                        <Download className="size-4" aria-hidden />
                        Download notes
                      </Button>
                    )}
                    <Button type="button" variant="outline" onClick={() => void copyNotes()}>
                      Copy notes, then paste there
                    </Button>
                  </div>
                  {wait ? (
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <p className="text-xs text-warn">
                        {wait.state === "waiting" ? "Waiting on the email." : "File landed."}{" "}
                        {wait.since.slice(0, 16).replace("T", " ")}
                      </p>
                      {wait.state === "waiting" ? (
                        <Button type="button" size="sm" variant="outline" onClick={() => fileFor(service.id)}>
                          The email landed
                        </Button>
                      ) : null}
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}
    </div>
  );
}

function TodoRow({ todo, done, onToggle }: { todo: DeskTodo; done: boolean; onToggle: () => void }) {
  const Icon = done ? SquareCheck : Square;
  return (
    <li>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full gap-3 rounded-[var(--radius-md)] border border-border bg-surface p-4 text-left"
      >
        <Icon className={done ? "mt-0.5 size-5 shrink-0 text-ok" : "mt-0.5 size-5 shrink-0 text-muted"} aria-hidden />
        <span>
          <span className={done ? "text-sm text-muted line-through" : "text-sm text-fg"}>{todo.text}</span>
          <span className="mt-1 block text-xs leading-relaxed text-subtle">{todo.detail}</span>
        </span>
      </button>
    </li>
  );
}
