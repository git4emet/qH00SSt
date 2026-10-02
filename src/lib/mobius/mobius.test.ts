import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { GHERBI, gherbiCorrection } from "./gherbi.ts";
import { MOBIUS_SKILL, runSkillChecks, skillPass } from "./skill.ts";
import { CATCHUP } from "./catchup.ts";
import { MESH_OVERLAY, TRUST_FLOOR } from "../cyclo/constants.ts";
import { bonferroniP } from "../cyclo/glrt.ts";
import { visibleButtons, LAUNCH_SERVICES } from "./buttonscape.ts";
import {
  attachEvidence,
  createCard,
  digestUtf8,
  emptyWork,
  recordMall,
  restoreWork,
  revokeReceipt,
  selectCard,
  type WorkClock,
} from "./worksurface.ts";

const clock: WorkClock = {
  now: () => "2026-10-02T00:00:00.000Z",
  id: (() => {
    let n = 0;
    return () => `id-${++n}`;
  })(),
};

describe("Möbiius skill", () => {
  it("passes the creator check suite", () => {
    const checks = runSkillChecks();
    assert.equal(checks.length, 11);
    assert.equal(skillPass(checks), true);
  });

  it("does not claim overlay counts are in Amaral 2023", () => {
    assert.equal(MESH_OVERLAY.static.count, 181);
    assert.equal(MESH_OVERLAY.local_dynamics.count, 192);
    assert.equal(MESH_OVERLAY.paper_4d.e8_roots, 240);
    assert.notEqual(MESH_OVERLAY.static.count, MESH_OVERLAY.paper_4d.cell_600.cells);
  });

  it("keeps the trust floor at 0.743", () => {
    assert.equal(MOBIUS_SKILL.trustFloor, TRUST_FLOOR);
    assert.equal(TRUST_FLOOR, 0.743);
  });
});

describe("Gherbi Bonferroni lane", () => {
  it("corrects 270 seeds the same way cyclic corrects M alphas", () => {
    const c = gherbiCorrection();
    assert.equal(c.m, 270);
    assert.equal(GHERBI.confirmed.length, 4);
    assert.ok(c.uncorrectedFalseAlarms > 10);
    assert.ok(c.perTest < 0.001);
    assert.equal(bonferroniP(0.002, 270), 0.54);
  });

  it("records transfer failure instead of a universal law", () => {
    assert.match(GHERBI.transfer.catalog62, /fail/);
    assert.ok(GHERBI.not.some((n) => n.toLowerCase().includes("universal")));
  });
});

describe("catch-up corpus", () => {
  it("never promotes assistant training or private contact", () => {
    const blob = JSON.stringify(CATCHUP);
    assert.equal(blob.includes("@gmail.com"), false);
    assert.ok(CATCHUP.some((c) => c.stub === "hypothesis" && c.title === "Personal model"));
    assert.ok(CATCHUP.some((c) => c.title === "Publish envelope"));
    assert.ok(CATCHUP.some((c) => c.title === "User-voice corpus" && c.stub === "unresolved"));
  });
});

describe("worksurface proof loop", () => {
  it("hashes source UTF-8 and keeps title out of the digest", () => {
    const s = createCard(emptyWork(), "First field note", "We need a printable packet for this job.", clock);
    assert.equal(s.cards[0].sha256, digestUtf8("We need a printable packet for this job."));
    assert.notEqual(s.cards[0].sha256, digestUtf8("First field note"));
    assert.equal(s.cards[0].sha256.length, 64);
  });

  it("records eight mall positions and names the last script.recorded", () => {
    let s = createCard(emptyWork(), "Note", "body", clock);
    s = selectCard(s, s.cards[0].id, clock);
    s = attachEvidence(s, s.cards[0].id, "The original request asks for a printable packet", "", clock);
    for (let i = 0; i < 8; i++) s = recordMall(s, clock);
    const types = s.receipts.filter((r) => r.type === "transition.instantiated" || r.type === "script.recorded");
    assert.equal(types.filter((r) => r.type === "transition.instantiated").length, 7);
    assert.equal(types.filter((r) => r.type === "script.recorded").length, 1);
    assert.equal(s.stage, 0);
  });

  it("revokes without deleting the source card", () => {
    let s = createCard(emptyWork(), "Note", "body", clock);
    const rid = s.receipts[0].id;
    s = revokeReceipt(s, rid, clock);
    assert.equal(s.cards.length, 1);
    assert.equal(s.receipts.some((r) => r.revoked), true);
  });

  it("rejects a foreign schema on restore", () => {
    const s = restoreWork({ schema: "other", cards: [], evidence: [], receipts: [] });
    assert.equal(s.schema, "mobiius.worksurface.v1");
    assert.equal(s.cards.length, 0);
  });
});

describe("buttonscape", () => {
  it("never renders a blocked capability and keeps share on ask", () => {
    const vis = visibleButtons("cyclic", false);
    assert.equal(vis.some((b) => b.policy === "block"), false);
    assert.equal(vis.find((b) => b.capabilityId === "share.dispatch")?.policy, "ask");
    assert.equal(vis.find((b) => b.capabilityId === "share.dispatch")?.verb, "Export");
    const party = visibleButtons("partychain", true);
    assert.equal(party.find((b) => b.capabilityId === "share.dispatch")?.verb, "Revoke");
  });

  it("only builds http(s) launch URLs and does not invent DeepSeek query injection", () => {
    for (const s of LAUNCH_SERVICES) {
      const href = s.href("hello world");
      assert.match(href, /^https:\/\//);
      assert.equal(href.includes("gmail"), false);
    }
    assert.equal(LAUNCH_SERVICES.find((s) => s.id === "deepseek")?.fillsQuery, false);
    assert.equal(LAUNCH_SERVICES.find((s) => s.id === "grok")?.fillsQuery, false);
  });
});
