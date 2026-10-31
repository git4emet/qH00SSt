import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  bootSteps,
  desksFor,
  glyphPath,
  localSlot,
  restoreMember,
  slotsFor,
  EMPTY_MEMBER,
} from "./templates.ts";

describe("templates", () => {
  it("draws the same glyph for the same member", () => {
    assert.equal(glyphPath("Nym"), glyphPath("Nym"));
    assert.notEqual(glyphPath("Nym"), glyphPath("Dale"));
  });

  it("keeps a new member to desks and APIs that exist", () => {
    const member = restoreMember({
      name: "  Dana  ",
      system: "AET lab",
      role: "field",
      templateId: "roles",
      using: ["grok", "not-a-service"],
      declared: ["ledger", "made-up"],
      guard: "ask",
    });
    assert.deepEqual(member.using, ["grok"]);
    assert.deepEqual(member.declared, ["ledger"]);
    assert.deepEqual(desksFor("field"), ["GSOC", "Field"]);
    assert.deepEqual(desksFor("accountant"), []);
    const slots = slotsFor(member.declared);
    assert.equal(slots.needed.length, 1);
    assert.equal(slots.absent.some((slot) => slot.id === "gsoc-ticket"), true);
    const record = localSlot(member, "ledger");
    assert.equal(record.outside, false);
    assert.equal(record.standing, "local");
  });

  it("is ready only when the member has a name", () => {
    assert.equal(bootSteps(EMPTY_MEMBER).find((step) => step.id === "ready")?.done, false);
    assert.equal(bootSteps({ ...EMPTY_MEMBER, name: "Dana" }).at(-1)?.done, true);
  });
});
