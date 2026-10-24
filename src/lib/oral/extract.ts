export type NoteStanding = "source-backed" | "derived" | "asserted";

export type OralNote = {
  id: string;
  name: string;
  trigger: string;
  next: string;
  desk: string;
  source: string;
  standing: NoteStanding;
  codeSetAside: number;
};

export type IngestResult = {
  notes: OralNote[];
  filesRead: number;
  codeSetAside: number;
  skippedHealth: boolean;
};

const HEALTH =
  /\b(systolic|diastolic|blood pressure|chest pain|call 911|suicid|self-harm|mental-state inference)\b/i;

let seq = 0;
function nid(prefix: string): string {
  seq += 1;
  return `${prefix}-${seq.toString(36)}`;
}

export function resetNoteIds(): void {
  seq = 0;
}

function isCodeLine(line: string): boolean {
  const t = line.trim();
  if (!t) return false;
  if (t.length > 240 && (t.match(/[{};]/g) || []).length > 6) return true;
  if (
    /^(import |export |from |#include |#!\/|package |@app\.|curl |docker |npm |git |chmod |mkdir |python3? |uvicorn )/.test(
      t,
    )
  ) {
    return true;
  }
  if (/^(def |class |function |async function |const |let |var |public |private |elif )/.test(t)) {
    return /[{}=();]/.test(t) && !/\b(the|a|an|this|that|and)\b/i.test(t);
  }
  if (/^return\b/.test(t)) return /[;{}()]/.test(t) && !/\b(the|and|with|this|that)\b/i.test(t);
  if (/^\s*(#|\/\/|\/\*|\*)/.test(t) && /[{}();=]/.test(t)) return true;
  if (/^<\/?[a-zA-Z!][^>]*>?\s*$/.test(t)) return true;
  const symbols = (t.match(/[{}();=<>[\]]/g) || []).length;
  if (symbols >= 4 && t.length < 220 && !/[.!?]\s+[A-Z]/.test(t) && !/\b(the|and|with|this)\b/i.test(t)) {
    return true;
  }
  return false;
}

function decodeEntities(line: string): string {
  const amp = String.fromCharCode(38);
  const table: Record<string, string> = {
    nbsp: " ",
    quot: '"',
    apos: "'",
    lt: "<",
    gt: ">",
    amp,
  };
  let s = line;
  for (let i = 0; i < 2; i++) {
    s = s.replace(new RegExp(amp + "(#39|[a-z]+);", "gi"), (all, body: string) => {
      const key = body.toLowerCase();
      if (key === "#39") return "'";
      return Object.prototype.hasOwnProperty.call(table, key) ? table[key]! : all;
    });
  }
  return s;
}

export function stripCode(raw: string): { prose: string; blocks: number; skippedHealth: boolean } {
  let blocks = 0;
  let skippedHealth = false;
  let s = raw.replace(/```[\s\S]*?```/g, () => {
    blocks += 1;
    return "\n";
  });
  s = s.replace(/<script[\s\S]*?<\/script>/gi, () => {
    blocks += 1;
    return "\n";
  });
  s = s.replace(/<style[\s\S]*?<\/style>/gi, () => {
    blocks += 1;
    return "\n";
  });
  const kept: string[] = [];
  for (const rawLine of s.split("\n")) {
    let line = rawLine;
    if (HEALTH.test(line)) {
      skippedHealth = true;
      const keptSentences = line
        .split(/(?<=[.!?])\s+/)
        .filter((part) => part.trim() && !HEALTH.test(part));
      if (keptSentences.length === 0) continue;
      line = keptSentences.join(" ");
    }
    if (isCodeLine(line)) {
      blocks += 1;
      continue;
    }
    const plain = decodeEntities(line.replace(/<[^>]+>/g, " "));
    kept.push(plain);
  }
  return { prose: kept.join("\n").replace(/\n{3,}/g, "\n\n").trim(), blocks, skippedHealth };
}

function sentencesOf(chunk: string): string[] {
  const flat = chunk.replace(/^#{1,3}\s+/gm, "").replace(/\s+/g, " ").trim();
  if (!flat) return [];
  return flat
    .split(/(?<=[.!?])\s+(?=[A-Z0-9“"])/)
    .map((s) => s.trim())
    .filter((s) => s.length > 24 && !HEALTH.test(s) && !/^https?:\/\//.test(s));
}

function clip(text: string, max: number): string {
  const clean = text.replace(/`/g, "").replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const sp = cut.lastIndexOf(" ");
  return `${(sp > 40 ? cut.slice(0, sp) : cut).trim()}…`;
}

function deskFor(text: string): string {
  const t = text.toLowerCase();
  if (/petrograph|thin section|thin-section|chemistry lab/.test(t)) return "Petrography";
  if (/gsoc|gopher state|811|white-?lin|locate ticket|positive response/.test(t)) return "GSOC";
  if (/pavement|asphalt|coring/.test(t)) return "Pavements";
  if (/geotech|boring|test pit|soil/.test(t)) return "Geotechnical";
  if (/environmental|remediat|hazardous|asbestos/.test(t)) return "Environmental";
  if (/nondestructive|\bndt\b|gpr\b/.test(t)) return "Nondestructive";
  if (/building performance|forensic|envelope/.test(t)) return "Building";
  if (/construction material|compaction|proctor/.test(t)) return "Construction";
  return "Field";
}

function titleFrom(chunk: string, sentences: string[]): string {
  const heading = chunk.match(/^#{1,3}\s+(.+)$/m)?.[1];
  if (heading && heading.length > 8 && heading.length < 90 && !isCodeLine(heading)) {
    return clip(heading.replace(/[*_]/g, ""), 72);
  }
  return clip(sentences[0] ?? "Untitled note", 72);
}

function pick(sentences: string[], re: RegExp, fallback: string, preferLast = false): string {
  const hits = sentences.filter((s) => re.test(s));
  const hit = preferLast ? hits[hits.length - 1] : hits[0];
  return clip(hit ?? fallback, 280);
}

function noteFromChunk(chunk: string, source: string, codeSetAside: number): OralNote | null {
  const sentences = sentencesOf(chunk);
  if (sentences.length === 0) return null;
  const body = sentences.join(" ");
  if (body.length < 80) return null;
  const trigger = pick(
    sentences,
    /\b(because|when|after|asked|trigger|correction|instead of|the problem|showing|so that)\b/i,
    sentences[0]!,
  );
  const actions = sentences.filter((s) =>
    /^(next|then|keep|do not|don't|record|submit|leave|name|tie|file|return)\b/i.test(s),
  );
  const next =
    actions.length > 0
      ? clip(actions.join(" "), 280)
      : pick(
          sentences,
          /\b(next|then|should|need to|supposed to|record|submit|wait for|do not|don't|tie |keep |classify|file the|leave a|name the)\b/i,
          sentences[sentences.length - 1]!,
          true,
        );
  if (next === trigger && sentences.length < 2) return null;
  return {
    id: nid("n"),
    name: titleFrom(chunk, sentences),
    trigger,
    next,
    desk: deskFor(`${titleFrom(chunk, sentences)} ${body}`),
    source,
    standing: "derived",
    codeSetAside,
  };
}

export function notesFromProse(prose: string, source: string, codeSetAside = 0): OralNote[] {
  if (!prose.trim()) return [];
  const parts = prose.split(/\n(?=#{1,3}\s)/);
  const chunks: string[] = [];
  for (const part of parts) {
    const paras = part
      .split(/\n{2,}/)
      .map((p) => p.trim())
      .filter(Boolean);
    let buf = "";
    for (const p of paras) {
      if ((buf + "\n" + p).length > 680 && buf) {
        chunks.push(buf);
        buf = p;
      } else buf = buf ? `${buf}\n${p}` : p;
    }
    if (buf) chunks.push(buf);
  }
  const notes: OralNote[] = [];
  const seen = new Set<string>();
  for (const chunk of chunks) {
    const note = noteFromChunk(chunk, source, codeSetAside);
    if (!note) continue;
    const key = note.name.toLowerCase().slice(0, 48);
    if (seen.has(key)) continue;
    seen.add(key);
    notes.push(note);
    if (notes.length >= 24) break;
  }
  return notes;
}

function pushString(value: unknown, acc: string[], depth: number): void {
  if (depth > 7 || acc.length > 240) return;
  if (typeof value === "string") {
    if (value.length > 40 && /[A-Za-z]/.test(value)) acc.push(value);
    return;
  }
  if (Array.isArray(value)) {
    if (value.every((v) => typeof v === "string")) {
      const joined = value.join("\n");
      if (joined.length > 40) acc.push(joined);
      return;
    }
    for (const item of value) pushString(item, acc, depth + 1);
    return;
  }
  if (!value || typeof value !== "object") return;
  const o = value as Record<string, unknown>;
  if (typeof o.text === "string") acc.push(o.text);
  else if (typeof o.content === "string") acc.push(o.content);
  for (const [k, v] of Object.entries(o)) {
    if (k === "id" || k === "author" || k === "role" || k === "metadata" || k === "citations") continue;
    if ((k === "text" || k === "content") && typeof v === "string") continue;
    pushString(v, acc, depth + 1);
  }
}

export function notesFromText(raw: string, source: string): IngestResult {
  const trimmed = raw.trim();
  if (!trimmed) return { notes: [], filesRead: 1, codeSetAside: 0, skippedHealth: false };
  if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
    try {
      const parsed: unknown = JSON.parse(trimmed);
      const turns: string[] = [];
      pushString(parsed, turns, 0);
      const joined = turns.join("\n\n");
      const stripped = stripCode(joined);
      return {
        notes: notesFromProse(stripped.prose, source, stripped.blocks),
        filesRead: 1,
        codeSetAside: stripped.blocks,
        skippedHealth: stripped.skippedHealth,
      };
    } catch {
      /* fall through to prose */
    }
  }
  const stripped = stripCode(trimmed);
  return {
    notes: notesFromProse(stripped.prose, source, stripped.blocks),
    filesRead: 1,
    codeSetAside: stripped.blocks,
    skippedHealth: stripped.skippedHealth,
  };
}

function looksZip(buf: ArrayBuffer): boolean {
  if (buf.byteLength < 4) return false;
  const v = new DataView(buf);
  return v.getUint32(0, true) === 0x04034b50;
}

export async function textsFromZip(buf: ArrayBuffer): Promise<{ name: string; text: string }[]> {
  if (!looksZip(buf)) return [];
  const bytes = new Uint8Array(buf);
  const view = new DataView(buf);
  let eocd = -1;
  const min = Math.max(0, bytes.length - 22 - 65536);
  for (let i = bytes.length - 22; i >= min; i--) {
    if (view.getUint32(i, true) === 0x06054b50) {
      eocd = i;
      break;
    }
  }
  if (eocd < 0) return [];
  const count = view.getUint16(eocd + 10, true);
  let ptr = view.getUint32(eocd + 16, true);
  const out: { name: string; text: string }[] = [];
  for (let n = 0; n < count && n < 30; n++) {
    if (ptr + 46 > bytes.length || view.getUint32(ptr, true) !== 0x02014b50) break;
    const method = view.getUint16(ptr + 10, true);
    const compSize = view.getUint32(ptr + 20, true);
    const nameLen = view.getUint16(ptr + 28, true);
    const extraLen = view.getUint16(ptr + 30, true);
    const commentLen = view.getUint16(ptr + 32, true);
    const localOff = view.getUint32(ptr + 42, true);
    const name = new TextDecoder().decode(bytes.subarray(ptr + 46, ptr + 46 + nameLen));
    ptr += 46 + nameLen + extraLen + commentLen;
    if (!/\.(json|jsonl|txt|md|html|htm)$/i.test(name) || name.endsWith("/")) continue;
    if (compSize > 6_000_000 || localOff + 30 > bytes.length) continue;
    const localNameLen = view.getUint16(localOff + 26, true);
    const localExtraLen = view.getUint16(localOff + 28, true);
    const dataStart = localOff + 30 + localNameLen + localExtraLen;
    const comp = bytes.subarray(dataStart, dataStart + compSize);
    let text = "";
    if (method === 0) text = new TextDecoder().decode(comp);
    else if (method === 8 && typeof DecompressionStream !== "undefined") {
      const stream = new Blob([comp.slice()]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
      text = await new Response(stream).text();
    } else continue;
    out.push({ name: name.split("/").pop() || name, text: text.slice(0, 400_000) });
  }
  return out;
}

export async function ingestBuffer(name: string, buf: ArrayBuffer): Promise<IngestResult> {
  if (looksZip(buf) || /\.zip$/i.test(name)) {
    const files = await textsFromZip(buf);
    const pieces = files.map((f) => notesFromText(f.text, f.name));
    const notes = dedupeNotes(pieces.flatMap((p) => p.notes)).slice(0, 24);
    return {
      notes,
      filesRead: files.length,
      codeSetAside: pieces.reduce((n, p) => n + p.codeSetAside, 0),
      skippedHealth: pieces.some((p) => p.skippedHealth),
    };
  }
  const text = new TextDecoder().decode(buf.slice(0, 500_000));
  return notesFromText(text, name || "paste");
}

export function dedupeNotes(notes: OralNote[]): OralNote[] {
  const seen = new Set<string>();
  const out: OralNote[] = [];
  for (const note of notes) {
    const key = `${note.name.toLowerCase().slice(0, 48)}|${note.next.toLowerCase().slice(0, 48)}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(note);
  }
  return out;
}

export function notesToMarkdown(notes: OralNote[]): string {
  const lines = ["# Oral notes", "", "Names, what set them off, and what they were supposed to do. Code is not in this file.", ""];
  for (const note of notes) {
    lines.push(`## ${note.name}`, "");
    lines.push(`Desk: ${note.desk}`);
    lines.push(`Standing: ${note.standing}`);
    lines.push(`Source: ${note.source}`);
    lines.push("");
    lines.push(`Set off by: ${note.trigger}`);
    lines.push("");
    lines.push(`Supposed to do: ${note.next}`);
    lines.push("");
  }
  return lines.join("\n");
}
