import { blake2s } from "@noble/hashes/blake2.js";
import { sha256 } from "@noble/hashes/sha2.js";

export function jcs(obj: unknown): Uint8Array {
  return new TextEncoder().encode(JSON.stringify(sortKeys(obj)));
}

function sortKeys(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortKeys);
  if (value && typeof value === "object") {
    const rec = value as Record<string, unknown>;
    const out: Record<string, unknown> = {};
    for (const k of Object.keys(rec).sort()) out[k] = sortKeys(rec[k]);
    return out;
  }
  return value;
}

function hex(bytes: Uint8Array): string {
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

export function sha256Hex(data: Uint8Array): string {
  return "sha256:" + hex(sha256(data));
}

export function blake2sHex(data: Uint8Array): string {
  return "blake2s:" + hex(blake2s(data));
}

export function hashFrame(x: Float64Array): string {
  return sha256Hex(new Uint8Array(x.buffer, x.byteOffset, x.byteLength));
}
