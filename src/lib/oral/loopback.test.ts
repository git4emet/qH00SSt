import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { affineTransit, postLoop, recentLoops } from "./loopback.ts";

describe("loopback", () => {
  it("moves the point when the step changes and stays a local map", () => {
    const a = affineTransit(0);
    const b = affineTransit(3);
    assert.deepEqual(a, { x: 1, y: 0 });
    assert.notDeepEqual(a, b);
    assert.equal(Number.isFinite(b.x) && Number.isFinite(b.y), true);
  });

  it("keeps a state change without a clock", () => {
    const before = recentLoops().length;
    const event = postLoop({ kind: "bench", detail: "2 notes, 1 checks, 0 waits" });
    assert.equal(recentLoops()[0]?.id, event.id);
    assert.equal(recentLoops().length, before + 1);
    const second = postLoop({ kind: "bench", detail: "3 notes, 1 checks, 0 waits" });
    assert.equal(recentLoops()[0]?.id, second.id);
    assert.equal(recentLoops().filter((item) => item.id === event.id).length, 1);
  });
});
