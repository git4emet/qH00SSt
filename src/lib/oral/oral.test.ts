import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { DESK_TODOS, FIELD_NOTES } from "./catalog.ts";
import {
  ingestBuffer,
  notesFromText,
  notesToMarkdown,
  resetNoteIds,
  stripCode,
  textsFromZip,
} from "./extract.ts";

describe("oral notes", () => {
  it("drops fenced code and keeps the surrounding instruction", () => {
    resetNoteIds();
    const raw = [
      "The field note is the point of this pass.",
      "```python",
      "def shift_where(self):",
      "    return self.state_idx",
      "```",
      "When the code is what gets forwarded, the next person has to ask what it was for.",
      "Next, keep the name and the action, and leave the code in the original file.",
    ].join("\n");
    const result = notesFromText(raw, "paste");
    assert.ok(result.codeSetAside >= 1);
    const blob = result.notes.map((n) => `${n.name} ${n.trigger} ${n.next}`).join("\n");
    assert.equal(blob.includes("def shift_where"), false);
    assert.match(blob, /leave the code/i);
  });

  it("keeps an instruction that happens to start with return", () => {
    resetNoteIds();
    const raw =
      "When the report is finished, the desk still has to close the chain. Next, return the report to the field lead and name the ticket on it. Do not treat the microscope as the notice.";
    const result = notesFromText(raw, "paste");
    assert.ok(result.notes.length >= 1);
    assert.match(result.notes.map((n) => n.next).join(" "), /return the report/i);
  });

  it("does not keep a health-coaching line", () => {
    const { prose, skippedHealth } = stripCode(
      "File the locate before the crew arrives. If systolic is over 180 call 911. Then read each operator response.",
    );
    assert.equal(skippedHealth, true);
    assert.equal(/systolic|911/.test(prose), false);
    assert.match(prose, /File the locate/);
  });

  it("reads a ChatGPT-shaped export as turns, not as syntax", () => {
    resetNoteIds();
    const json = JSON.stringify([
      {
        title: "Locate handoff",
        mapping: {
          a: {
            message: {
              author: { role: "user" },
              content: {
                parts: [
                  "The core came back and the next desk asked what the specimen was for. Because the thin section is not the dig, the locate stays with the boring. Next, write the ticket id on the lab receipt and do not treat the microscope as clearance.",
                ],
              },
            },
          },
        },
      },
    ]);
    const result = notesFromText(json, "conversations.json");
    assert.ok(result.notes.length >= 1);
    assert.match(result.notes.map((n) => n.next).join(" "), /ticket/i);
    assert.equal(notesToMarkdown(result.notes).includes("```"), false);
  });

  it("reads a stored zip of a text note", async () => {
    const payload = new TextEncoder().encode(
      "Petrography desk.\n\nWhen a core is cut with a machine, that act is the excavation.\n\nNext, tie the specimen to that locate ticket and do not open a new notice for the thin section.",
    );
    const name = new TextEncoder().encode("note.txt");
    const local = new Uint8Array(30 + name.length + payload.length);
    const view = new DataView(local.buffer);
    view.setUint32(0, 0x04034b50, true);
    view.setUint16(8, 0, true);
    view.setUint32(18, payload.length, true);
    view.setUint32(22, payload.length, true);
    view.setUint16(26, name.length, true);
    local.set(name, 30);
    local.set(payload, 30 + name.length);
    const central = new Uint8Array(46 + name.length);
    const cv = new DataView(central.buffer);
    cv.setUint32(0, 0x02014b50, true);
    cv.setUint16(10, 0, true);
    cv.setUint32(20, payload.length, true);
    cv.setUint32(24, payload.length, true);
    cv.setUint16(28, name.length, true);
    cv.setUint32(42, 0, true);
    central.set(name, 46);
    const eocd = new Uint8Array(22);
    const ev = new DataView(eocd.buffer);
    ev.setUint32(0, 0x06054b50, true);
    ev.setUint16(8, 1, true);
    ev.setUint16(10, 1, true);
    ev.setUint32(12, central.length, true);
    ev.setUint32(16, local.length, true);
    const zip = new Uint8Array(local.length + central.length + eocd.length);
    zip.set(local, 0);
    zip.set(central, local.length);
    zip.set(eocd, local.length + central.length);
    const files = await textsFromZip(zip.buffer);
    assert.equal(files.length, 1);
    assert.match(files[0]!.text, /thin section/);
    const ingested = await ingestBuffer("notes.zip", zip.buffer);
    assert.ok(ingested.notes.length >= 1);
    assert.equal(ingested.notes.some((n) => n.desk === "Petrography" || n.desk === "GSOC"), true);
  });

  it("keeps field notes free of code and desks covered", () => {
    const blob = FIELD_NOTES.map((n) => `${n.name} ${n.trigger} ${n.next}`).join("\n");
    assert.equal(/```|def |function\(/.test(blob), false);
    assert.ok(FIELD_NOTES.some((n) => n.desk === "Petrography"));
    assert.ok(DESK_TODOS.filter((t) => t.desk === "Petrography").length >= 4);
    assert.ok(DESK_TODOS.some((t) => /planning ticket/i.test(t.text)));
    assert.ok(FIELD_NOTES.some((n) => n.id === "seed-handoff"));
    assert.equal(FIELD_NOTES.some((n) => /hotline|suicid/i.test(`${n.name} ${n.trigger} ${n.next}`)), false);
  });
});
