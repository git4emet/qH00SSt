//#region node_modules/@noble/hashes/utils.js
/**
* Checks if something is Uint8Array. Be careful: nodejs Buffer will return true.
* @param a - value to test
* @returns `true` when the value is a Uint8Array-compatible view.
* @example
* Check whether a value is a Uint8Array-compatible view.
* ```ts
* isBytes(new Uint8Array([1, 2, 3]));
* ```
*/
function isBytes(a) {
	return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array" && "BYTES_PER_ELEMENT" in a && a.BYTES_PER_ELEMENT === 1;
}
var atitle = (title) => title ? `"${title}" ` : "";
/**
* Asserts something is a non-negative integer.
* @param n - number to validate
* @param title - label included in thrown errors
* @returns The validated number.
* @throws On wrong argument types. {@link TypeError}
* @throws On wrong argument ranges or values. {@link RangeError}
* @example
* Validate a non-negative integer option.
* ```ts
* anumber(32, 'length');
* ```
*/
function anumber(n, title = "") {
	if (typeof n !== "number") throw new TypeError(atitle(title) + "expected number, got " + typeof n);
	if (!Number.isSafeInteger(n) || n < 0) throw new RangeError(atitle(title) + "expected integer >= 0, got " + n);
	return n;
}
/**
* Asserts something is Uint8Array.
* @param value - value to validate
* @param length - optional exact length constraint
* @param title - label included in thrown errors
* @returns The validated byte array.
* @throws On wrong argument types. {@link TypeError}
* @throws On wrong argument ranges or values. {@link RangeError}
* @example
* Validate that a value is a byte array.
* ```ts
* abytes(new Uint8Array([1, 2, 3]));
* ```
*/
function abytes(value, length, title = "") {
	if (isBytes(value) && (length === void 0 || value.length === length)) return value;
	if (length !== void 0) anumber(length, "length");
	const bytes = isBytes(value);
	const ofLen = length !== void 0 ? ` of length ${length}` : "";
	const got = bytes ? `length=${value.length}` : `type=${typeof value}`;
	const message = atitle(title) + "expected Uint8Array" + ofLen + ", got " + got;
	if (!bytes) throw new TypeError(message);
	throw new RangeError(message);
}
/**
* Copies bytes into a fresh Uint8Array.
* Buffer-style slices can alias the same backing store, so callers that need ownership should copy.
* @param bytes - source bytes to clone
* @returns Freshly allocated copy of `bytes`.
* @throws On wrong argument types. {@link TypeError}
* @example
* Clone a byte array before mutating it.
* ```ts
* const copy = copyBytes(new Uint8Array([1, 2, 3]));
* ```
*/
function copyBytes(bytes) {
	return Uint8Array.from(abytes(bytes));
}
var aobject = (value, label) => {
	if (value === null || typeof value !== "object" || Array.isArray(value)) throw new TypeError((label === "object" ? "" : `"${label}" `) + "expected object, got type=" + typeof value);
};
var aopts = (value, label) => {
	aobject(value, label);
	const proto = Object.getPrototypeOf(value);
	if (proto !== Object.prototype && proto !== null) throw new TypeError(`"${label}" expected plain object`);
	if (Object.hasOwn(value, "__proto__")) throw new TypeError(`"${label}.__proto__" is not allowed`);
};
/**
* Asserts a hash instance has not been destroyed or finished.
* @param instance - hash instance to validate
* @param checkFinished - whether to reject finalized instances
* @throws If the hash instance has already been destroyed or finalized. {@link Error}
* @example
* Validate that a hash instance is still usable.
* ```ts
* import { aexists } from '@noble/hashes/utils.js';
* import { sha256 } from '@noble/hashes/sha2.js';
* const hash = sha256.create();
* aexists(hash);
* ```
*/
function aexists(instance, checkFinished = true) {
	if (instance.destroyed) throw new Error("hash was destroyed");
	if (checkFinished && instance.finished) throw new Error("digest() was already called");
}
/**
* Asserts output is a sufficiently-sized byte array.
* @param out - destination buffer
* @param instance - hash instance providing output length
* Oversized buffers are allowed; downstream code only promises to fill the first `outputLen` bytes.
* @throws On wrong argument types. {@link TypeError}
* @throws On wrong argument ranges or values. {@link RangeError}
* @example
* Validate a caller-provided digest buffer.
* ```ts
* import { aoutput } from '@noble/hashes/utils.js';
* import { sha256 } from '@noble/hashes/sha2.js';
* const hash = sha256.create();
* aoutput(new Uint8Array(hash.outputLen), hash);
* ```
*/
function aoutput(out, instance) {
	abytes(out, void 0, "output");
	const min = instance.outputLen;
	if (!(out.length >= min)) throw new RangeError("\"output\" expected length >= " + min);
}
/**
* Casts a typed array view to Uint32Array.
* `arr.byteOffset` must already be 4-byte aligned or the platform
* Uint32Array constructor will throw.
* @param arr - source typed array
* @returns Uint32Array view over the same buffer.
* @example
* Reinterpret a byte array as 32-bit words.
* ```ts
* u32(new Uint8Array(8));
* ```
*/
function u32(arr) {
	return new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
}
/**
* Zeroizes typed arrays in place. Warning: JS provides no guarantees.
* @param arrays - arrays to overwrite with zeros
* @example
* Zeroize sensitive buffers in place.
* ```ts
* clean(new Uint8Array([1, 2, 3]));
* ```
*/
function clean(...arrays) {
	for (let i = 0; i < arrays.length; i++) arrays[i].fill(0);
}
/**
* Creates a DataView for byte-level manipulation.
* @param arr - source typed array
* @returns DataView over the same buffer region.
* @example
* Create a DataView over an existing buffer.
* ```ts
* createView(new Uint8Array(4));
* ```
*/
function createView(arr) {
	return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
}
/**
* Rotate-right operation for uint32 values.
* @param word - source word
* @param shift - shift amount in bits
* @returns Rotated word.
* @example
* Rotate a 32-bit word to the right.
* ```ts
* rotr(0x12345678, 8);
* ```
*/
function rotr(word, shift) {
	return word << 32 - shift | word >>> shift;
}
/** Whether the current platform is little-endian. */
var isLE = /* @__PURE__ */ (() => new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68)();
/**
* Byte-swap operation for uint32 values.
* @param word - source word
* @returns Word with reversed byte order.
* @example
* Reverse the byte order of a 32-bit word.
* ```ts
* byteSwap(0x11223344);
* ```
*/
function byteSwap(word) {
	return word << 24 & 4278190080 | word << 8 & 16711680 | word >>> 8 & 65280 | word >>> 24 & 255;
}
/**
* Conditionally byte-swaps one 32-bit word on big-endian platforms.
* @param n - source word
* @returns Original or byte-swapped word depending on platform endianness.
* @example
* Normalize a 32-bit word for host endianness.
* ```ts
* swap8IfBE(0x11223344);
* ```
*/
var swap8IfBE = isLE ? (n) => n : (n) => byteSwap(n) >>> 0;
/**
* Byte-swaps every word of a Uint32Array in place.
* @param arr - array to mutate
* @returns The same array after mutation; callers pass live state arrays here.
* @example
* Reverse the byte order of every word in place.
* ```ts
* byteSwap32(new Uint32Array([0x11223344]));
* ```
*/
function byteSwap32(arr) {
	for (let i = 0; i < arr.length; i++) arr[i] = byteSwap(arr[i]);
	return arr;
}
/**
* Conditionally byte-swaps a Uint32Array on big-endian platforms.
* @param u - array to normalize for host endianness
* @returns Original or byte-swapped array depending on platform endianness.
*   On big-endian runtimes this mutates `u` in place via `byteSwap32(...)`.
* @example
* Normalize a word array for host endianness.
* ```ts
* swap32IfBE(new Uint32Array([0x11223344]));
* ```
*/
var swap32IfBE = isLE ? (u) => u : byteSwap32;
/**
* Merges default options and passed options.
* @param defaults - base option object
* @param opts - user overrides
* @param title - label included in thrown override errors
* @returns Fresh merged option object with a null prototype.
* @throws On wrong argument types. {@link TypeError}
* @example
* Merge user overrides onto default options.
* ```ts
* checkOpts({ dkLen: 32 }, { asyncTick: 10 });
* ```
*/
function checkOpts(defaults, opts, title = "opts") {
	aopts(defaults, "defaults");
	if (opts !== void 0) aopts(opts, title);
	return Object.assign(Object.create(null), defaults, opts);
}
/**
* Creates a callable hash function from a stateful class constructor.
* @param hashCons - hash constructor or factory
* @param info - optional metadata such as DER OID
* @returns Frozen callable hash wrapper with `.create()`.
*   Wrapper construction eagerly calls `hashCons(undefined)` once to read
*   `outputLen` / `blockLen`, so constructor side effects happen at module
*   init time.
* @throws On wrong argument types. {@link TypeError}
* @example
* Wrap a stateful hash constructor into a callable helper.
* ```ts
* import { createHasher } from '@noble/hashes/utils.js';
* import { sha256 } from '@noble/hashes/sha2.js';
* const wrapped = createHasher(sha256.create, { oid: sha256.oid });
* wrapped(new Uint8Array([1]));
* ```
*/
function createHasher(hashCons, info = {}) {
	if (typeof hashCons !== "function") throw new TypeError("\"hashCons\" expected function, got type=" + typeof hashCons);
	info = checkOpts({}, info, "info");
	const hashC = (msg, opts) => hashCons(opts).update(msg).digest();
	const tmp = hashCons(void 0);
	hashC.outputLen = tmp.outputLen;
	hashC.blockLen = tmp.blockLen;
	hashC.canXOF = tmp.canXOF;
	hashC.create = (opts) => hashCons(opts);
	Object.assign(hashC, info);
	return Object.freeze(hashC);
}
/**
* Creates OID metadata for NIST hashes with prefix `06 09 60 86 48 01 65 03 04 02`.
* @param suffix - final OID byte for the selected hash.
*   The helper accepts any byte even though only the documented NIST hash
*   suffixes are meaningful downstream.
* @returns Object containing the DER-encoded OID.
* @example
* Build OID metadata for a NIST hash.
* ```ts
* oidNist(0x01);
* ```
*/
var oidNist = (suffix) => ({ oid: Uint8Array.from([
	6,
	9,
	96,
	134,
	72,
	1,
	101,
	3,
	4,
	2,
	suffix
]) });
//#endregion
//#region node_modules/@noble/hashes/_blake.js
/**
* Internal helpers for blake hash.
* @module
*/
/**
* Internal blake permutation table.
* Rows `0..9` serve BLAKE2s, rows `0..11` serve BLAKE2b with `10..11 = 0..1`, and Blake1 also
* reuses the later rows shown below. Blake1 expands rounds `10..15` as `SIGMA[i % 10]`, so rows
* `10..15` intentionally repeat rows `0..5` for the 14-round (256) and 16-round (512) variants.
*/
var BSIGMA = /* @__PURE__ */ Uint8Array.from([
	0,
	1,
	2,
	3,
	4,
	5,
	6,
	7,
	8,
	9,
	10,
	11,
	12,
	13,
	14,
	15,
	14,
	10,
	4,
	8,
	9,
	15,
	13,
	6,
	1,
	12,
	0,
	2,
	11,
	7,
	5,
	3,
	11,
	8,
	12,
	0,
	5,
	2,
	15,
	13,
	10,
	14,
	3,
	6,
	7,
	1,
	9,
	4,
	7,
	9,
	3,
	1,
	13,
	12,
	11,
	14,
	2,
	6,
	5,
	10,
	4,
	0,
	15,
	8,
	9,
	0,
	5,
	7,
	2,
	4,
	10,
	15,
	14,
	1,
	11,
	12,
	6,
	8,
	3,
	13,
	2,
	12,
	6,
	10,
	0,
	11,
	8,
	3,
	4,
	13,
	7,
	5,
	15,
	14,
	1,
	9,
	12,
	5,
	1,
	15,
	14,
	13,
	4,
	10,
	0,
	7,
	6,
	3,
	9,
	2,
	8,
	11,
	13,
	11,
	7,
	14,
	12,
	1,
	3,
	9,
	5,
	0,
	15,
	4,
	8,
	6,
	2,
	10,
	6,
	15,
	14,
	9,
	11,
	3,
	0,
	8,
	12,
	2,
	13,
	7,
	1,
	4,
	10,
	5,
	10,
	2,
	8,
	4,
	7,
	6,
	1,
	5,
	15,
	11,
	9,
	14,
	3,
	12,
	13,
	0,
	0,
	1,
	2,
	3,
	4,
	5,
	6,
	7,
	8,
	9,
	10,
	11,
	12,
	13,
	14,
	15,
	14,
	10,
	4,
	8,
	9,
	15,
	13,
	6,
	1,
	12,
	0,
	2,
	11,
	7,
	5,
	3,
	11,
	8,
	12,
	0,
	5,
	2,
	15,
	13,
	10,
	14,
	3,
	6,
	7,
	1,
	9,
	4,
	7,
	9,
	3,
	1,
	13,
	12,
	11,
	14,
	2,
	6,
	5,
	10,
	4,
	0,
	15,
	8,
	9,
	0,
	5,
	7,
	2,
	4,
	10,
	15,
	14,
	1,
	11,
	12,
	6,
	8,
	3,
	13,
	2,
	12,
	6,
	10,
	0,
	11,
	8,
	3,
	4,
	13,
	7,
	5,
	15,
	14,
	1,
	9
]);
function G1s(a, b, c, d, x) {
	a = a + b + x | 0;
	d = rotr(d ^ a, 16);
	c = c + d | 0;
	b = rotr(b ^ c, 12);
	return {
		a,
		b,
		c,
		d
	};
}
function G2s(a, b, c, d, x) {
	a = a + b + x | 0;
	d = rotr(d ^ a, 8);
	c = c + d | 0;
	b = rotr(b ^ c, 7);
	return {
		a,
		b,
		c,
		d
	};
}
//#endregion
//#region node_modules/@noble/hashes/_u64.js
var fromNumH = (n) => n / 2 ** 32 | 0;
var fromNumL = (n) => n >>> 0;
function setU64FromNum(view, byteOffset, n, isLE) {
	const h = fromNumH(n);
	const l = fromNumL(n);
	view.setUint32(byteOffset, isLE ? l : h, isLE);
	view.setUint32(byteOffset + 4, isLE ? h : l, isLE);
}
//#endregion
//#region node_modules/@noble/hashes/_md.js
/**
* Internal Merkle-Damgard hash utils.
* @module
*/
/**
* Shared 32-bit conditional boolean primitive reused by SHA-256, SHA-1, and MD5 `F`.
* Returns bits from `b` when `a` is set, otherwise from `c`.
* The XOR form is equivalent to MD5's `F(X,Y,Z) = XY v not(X)Z` because the masked terms never
* set the same bit.
* @param a - selector word
* @param b - word chosen when selector bit is set
* @param c - word chosen when selector bit is clear
* @returns Mixed 32-bit word.
* @example
* Combine three words with the shared 32-bit choice primitive.
* ```ts
* Chi(0xffffffff, 0x12345678, 0x87654321);
* ```
*/
function Chi(a, b, c) {
	return a & b ^ ~a & c;
}
/**
* Shared 32-bit majority primitive reused by SHA-256 and SHA-1.
* Returns bits shared by at least two inputs.
* @param a - first input word
* @param b - second input word
* @param c - third input word
* @returns Mixed 32-bit word.
* @example
* Combine three words with the shared 32-bit majority primitive.
* ```ts
* Maj(0xffffffff, 0x12345678, 0x87654321);
* ```
*/
function Maj(a, b, c) {
	return a & b ^ a & c ^ b & c;
}
/**
* Merkle-Damgard hash construction base class.
* Could be used to create MD5, RIPEMD, SHA1, SHA2.
* Accepts only byte-aligned `Uint8Array` input, even when the underlying spec describes bit
* strings with partial-byte tails.
* @param blockLen - internal block size in bytes
* @param outputLen - digest size in bytes
* @param padOffset - trailing length field size in bytes
* @param isLE - whether length and state words are encoded in little-endian
* @example
* Use a concrete subclass to get the shared Merkle-Damgard update/digest flow.
* ```ts
* import { _SHA1 } from '@noble/hashes/legacy.js';
* const hash = new _SHA1();
* hash.update(new Uint8Array([97, 98, 99]));
* hash.digest();
* ```
*/
var HashMD = class {
	blockLen;
	outputLen;
	canXOF = false;
	padOffset;
	isLE;
	buffer;
	view;
	finished = false;
	length = 0;
	pos = 0;
	destroyed = false;
	constructor(blockLen, outputLen, padOffset, isLE) {
		this.blockLen = blockLen;
		this.outputLen = outputLen;
		this.padOffset = padOffset;
		this.isLE = isLE;
		this.buffer = new Uint8Array(blockLen);
		this.view = createView(this.buffer);
	}
	update(data) {
		aexists(this);
		abytes(data);
		const { view, buffer, blockLen } = this;
		const len = data.length;
		let processed = false;
		for (let pos = 0; pos < len;) {
			const take = Math.min(blockLen - this.pos, len - pos);
			if (take === blockLen) {
				const dataView = createView(data);
				for (; blockLen <= len - pos; pos += blockLen) this.process(dataView, pos);
				processed = true;
				continue;
			}
			buffer.set(pos === 0 && take === len ? data : data.subarray(pos, pos + take), this.pos);
			this.pos += take;
			pos += take;
			if (this.pos === blockLen) {
				this.process(view, 0);
				this.pos = 0;
				processed = true;
			}
		}
		this.length += data.length;
		if (processed) this.roundClean();
		return this;
	}
	digestInto(out) {
		aexists(this);
		aoutput(out, this);
		this.finished = true;
		const { buffer, view, blockLen, isLE } = this;
		let { pos } = this;
		buffer[pos++] = 128;
		buffer.fill(0, pos);
		if (this.padOffset > blockLen - pos) {
			this.process(view, 0);
			buffer.fill(0);
		}
		setU64FromNum(view, blockLen - 8, this.length * 8, isLE);
		this.process(view, 0);
		this.roundClean();
		const oview = out === buffer ? view : createView(out);
		const len = this.outputLen;
		const outLen = len / 4;
		const state = this.get();
		if (len % 4 || outLen > state.length) throw new Error("invalid outputLen");
		for (let i = 0; i < outLen; i++) oview.setUint32(4 * i, state[i], isLE);
	}
	digest() {
		const { buffer, outputLen } = this;
		this.digestInto(buffer);
		const res = buffer.slice(0, outputLen);
		this.destroy();
		return res;
	}
	_cloneIntoMeta(to) {
		const { buffer, length, finished, destroyed, pos } = this;
		to.destroyed = destroyed;
		to.finished = finished;
		to.length = length;
		to.pos = pos;
		if (pos) to.buffer.set(buffer);
		return to;
	}
	clone() {
		return this._cloneInto();
	}
};
/**
* Initial SHA-2 state: fractional parts of square roots of first 16 primes 2..53.
* Check out `test/misc/sha2-gen-iv.js` for recomputation guide.
*/
/** Initial SHA256 state from RFC 6234 §6.1: the first 32 bits of the fractional parts of the
* square roots of the first eight prime numbers. Exported as a shared table; callers must treat
* it as read-only because constructors copy words from it by index. */
var SHA256_IV = /* @__PURE__ */ Uint32Array.from([
	1779033703,
	3144134277,
	1013904242,
	2773480762,
	1359893119,
	2600822924,
	528734635,
	1541459225
]);
//#endregion
//#region node_modules/@noble/hashes/blake2.js
/**
* blake2b (64-bit) & blake2s (8 to 32-bit) hash functions.
* b could have been faster, but there is no fast u64 in js, so s is 1.5x faster.
* @module
*/
function checkBlake2Opts(outputLen, opts = {}, keyLen, saltLen, persLen) {
	anumber(keyLen);
	if (outputLen <= 0 || outputLen > keyLen) throw new Error("\"dkLen\" must be 1.." + keyLen + ", got " + outputLen);
	const { key, salt, personalization } = opts;
	if (key !== void 0 && (key.length < 1 || key.length > keyLen)) throw new Error("\"key\" expected to be undefined or of length=1.." + keyLen);
	if (salt !== void 0) abytes(salt, saltLen, "salt");
	if (personalization !== void 0) abytes(personalization, persLen, "personalization");
}
/** Internal base class for BLAKE2. */
var _BLAKE2 = class {
	buffer;
	buffer32;
	finished = false;
	destroyed = false;
	length = 0;
	pos = 0;
	blockLen;
	outputLen;
	canXOF = false;
	constructor(blockLen, outputLen) {
		anumber(blockLen);
		anumber(outputLen);
		this.blockLen = blockLen;
		this.outputLen = outputLen;
		this.buffer = new Uint8Array(blockLen);
		this.buffer32 = u32(this.buffer);
	}
	update(data) {
		aexists(this);
		abytes(data);
		const { blockLen, buffer, buffer32 } = this;
		const len = data.length;
		const offset = data.byteOffset;
		const buf = data.buffer;
		for (let pos = 0; pos < len;) {
			if (this.pos === blockLen) {
				swap32IfBE(buffer32);
				this.compress(buffer32, 0, false);
				swap32IfBE(buffer32);
				this.pos = 0;
			}
			const take = Math.min(blockLen - this.pos, len - pos);
			const dataOffset = offset + pos;
			if (take === blockLen && !(dataOffset % 4) && pos + take < len) {
				const data32 = new Uint32Array(buf, dataOffset, Math.floor((len - pos) / 4));
				swap32IfBE(data32);
				for (let pos32 = 0; pos + blockLen < len; pos32 += buffer32.length, pos += blockLen) {
					this.length += blockLen;
					this.compress(data32, pos32, false);
				}
				swap32IfBE(data32);
				continue;
			}
			buffer.set(pos === 0 && take === len ? data : data.subarray(pos, pos + take), this.pos);
			this.pos += take;
			this.length += take;
			pos += take;
		}
		return this;
	}
	digestInto(out) {
		aexists(this);
		aoutput(out, this);
		if (out.byteOffset & 3) throw new RangeError("\"output\" expected 4-byte aligned byteOffset, got " + out.byteOffset);
		const { pos, buffer32 } = this;
		this.finished = true;
		this.buffer.fill(0, pos);
		swap32IfBE(buffer32);
		this.compress(buffer32, 0, true);
		swap32IfBE(buffer32);
		const state = this.get();
		const out32 = out === this.buffer ? buffer32 : u32(out);
		const full = Math.floor(this.outputLen / 4);
		for (let i = 0; i < full; i++) out32[i] = swap8IfBE(state[i]);
		const tail = this.outputLen % 4;
		if (!tail) return;
		const off = full * 4;
		const word = state[full];
		for (let i = 0; i < tail; i++) out[off + i] = word >>> 8 * i;
	}
	digest() {
		const { buffer, outputLen } = this;
		this.digestInto(buffer);
		const res = buffer.slice(0, outputLen);
		this.destroy();
		return res;
	}
	_cloneInto(to) {
		const { buffer, length, finished, destroyed, outputLen, pos } = this;
		to ||= new this.constructor({ dkLen: outputLen });
		to.set(...this.get());
		to.buffer.set(buffer);
		to.destroyed = destroyed;
		to.finished = finished;
		to.length = length;
		to.pos = pos;
		to.outputLen = outputLen;
		return to;
	}
	clone() {
		return this._cloneInto();
	}
};
/**
* BLAKE2-compress core method.
* Runs only the round function over a caller-supplied local vector; callers initialize `v0..v15`
* and apply the final `h[i] ^= v[i] ^ v[i + 8]` fold themselves.
* @param s - flattened sigma schedule bytes
* @param offset - starting word offset inside `msg`, not a byte offset
* @param msg - message words
* @param rounds - round count to execute
* @param v0 - state word 0
* @param v1 - state word 1
* @param v2 - state word 2
* @param v3 - state word 3
* @param v4 - state word 4
* @param v5 - state word 5
* @param v6 - state word 6
* @param v7 - state word 7
* @param v8 - state word 8
* @param v9 - state word 9
* @param v10 - state word 10
* @param v11 - state word 11
* @param v12 - state word 12
* @param v13 - state word 13
* @param v14 - state word 14
* @param v15 - state word 15
* @returns Updated compression state words.
* @example
* Run the BLAKE2 compression core on zeroed state and message words.
* ```ts
* import { _compress } from '@noble/hashes/blake2.js';
* const state = _compress(
*   new Uint8Array(16),
*   0,
*   new Uint32Array(16),
*   1,
*   0, 0, 0, 0, 0, 0, 0, 0,
*   0, 0, 0, 0, 0, 0, 0, 0
* );
* state.v0;
* ```
*/
function _compress(s, offset, msg, rounds, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9, v10, v11, v12, v13, v14, v15) {
	let j = 0;
	for (let i = 0; i < rounds; i++) {
		({a: v0, b: v4, c: v8, d: v12} = G1s(v0, v4, v8, v12, msg[offset + s[j++]]));
		({a: v0, b: v4, c: v8, d: v12} = G2s(v0, v4, v8, v12, msg[offset + s[j++]]));
		({a: v1, b: v5, c: v9, d: v13} = G1s(v1, v5, v9, v13, msg[offset + s[j++]]));
		({a: v1, b: v5, c: v9, d: v13} = G2s(v1, v5, v9, v13, msg[offset + s[j++]]));
		({a: v2, b: v6, c: v10, d: v14} = G1s(v2, v6, v10, v14, msg[offset + s[j++]]));
		({a: v2, b: v6, c: v10, d: v14} = G2s(v2, v6, v10, v14, msg[offset + s[j++]]));
		({a: v3, b: v7, c: v11, d: v15} = G1s(v3, v7, v11, v15, msg[offset + s[j++]]));
		({a: v3, b: v7, c: v11, d: v15} = G2s(v3, v7, v11, v15, msg[offset + s[j++]]));
		({a: v0, b: v5, c: v10, d: v15} = G1s(v0, v5, v10, v15, msg[offset + s[j++]]));
		({a: v0, b: v5, c: v10, d: v15} = G2s(v0, v5, v10, v15, msg[offset + s[j++]]));
		({a: v1, b: v6, c: v11, d: v12} = G1s(v1, v6, v11, v12, msg[offset + s[j++]]));
		({a: v1, b: v6, c: v11, d: v12} = G2s(v1, v6, v11, v12, msg[offset + s[j++]]));
		({a: v2, b: v7, c: v8, d: v13} = G1s(v2, v7, v8, v13, msg[offset + s[j++]]));
		({a: v2, b: v7, c: v8, d: v13} = G2s(v2, v7, v8, v13, msg[offset + s[j++]]));
		({a: v3, b: v4, c: v9, d: v14} = G1s(v3, v4, v9, v14, msg[offset + s[j++]]));
		({a: v3, b: v4, c: v9, d: v14} = G2s(v3, v4, v9, v14, msg[offset + s[j++]]));
	}
	return {
		v0,
		v1,
		v2,
		v3,
		v4,
		v5,
		v6,
		v7,
		v8,
		v9,
		v10,
		v11,
		v12,
		v13,
		v14,
		v15
	};
}
var B2S_IV = /* @__PURE__ */ SHA256_IV.slice();
/** Internal blake2s hash class. */
var _BLAKE2s = class extends _BLAKE2 {
	v0 = B2S_IV[0] | 0;
	v1 = B2S_IV[1] | 0;
	v2 = B2S_IV[2] | 0;
	v3 = B2S_IV[3] | 0;
	v4 = B2S_IV[4] | 0;
	v5 = B2S_IV[5] | 0;
	v6 = B2S_IV[6] | 0;
	v7 = B2S_IV[7] | 0;
	constructor(opts = {}) {
		opts = checkOpts({}, opts);
		const olen = opts.dkLen === void 0 ? 32 : opts.dkLen;
		super(64, olen);
		checkBlake2Opts(olen, opts, 32, 8, 8);
		let { key, personalization, salt } = opts;
		let keyLength = 0;
		if (key !== void 0) {
			abytes(key, void 0, "key");
			keyLength = key.length;
		}
		this.v0 ^= this.outputLen | keyLength << 8 | 16842752;
		if (salt !== void 0) {
			abytes(salt, void 0, "salt");
			const slt = u32(copyBytes(salt));
			this.v4 ^= swap8IfBE(slt[0]);
			this.v5 ^= swap8IfBE(slt[1]);
		}
		if (personalization !== void 0) {
			abytes(personalization, void 0, "personalization");
			const pers = u32(copyBytes(personalization));
			this.v6 ^= swap8IfBE(pers[0]);
			this.v7 ^= swap8IfBE(pers[1]);
		}
		if (key !== void 0) {
			const tmp = new Uint8Array(this.blockLen);
			tmp.set(key);
			this.update(tmp);
			clean(tmp);
		}
	}
	get() {
		const { v0, v1, v2, v3, v4, v5, v6, v7 } = this;
		return [
			v0,
			v1,
			v2,
			v3,
			v4,
			v5,
			v6,
			v7
		];
	}
	set(v0, v1, v2, v3, v4, v5, v6, v7) {
		this.v0 = v0 | 0;
		this.v1 = v1 | 0;
		this.v2 = v2 | 0;
		this.v3 = v3 | 0;
		this.v4 = v4 | 0;
		this.v5 = v5 | 0;
		this.v6 = v6 | 0;
		this.v7 = v7 | 0;
	}
	compress(msg, offset, isLast) {
		const l = fromNumL(this.length);
		const h = fromNumH(this.length);
		const { v0, v1, v2, v3, v4, v5, v6, v7, v8, v9, v10, v11, v12, v13, v14, v15 } = _compress(BSIGMA, offset, msg, 10, this.v0, this.v1, this.v2, this.v3, this.v4, this.v5, this.v6, this.v7, B2S_IV[0], B2S_IV[1], B2S_IV[2], B2S_IV[3], l ^ B2S_IV[4], h ^ B2S_IV[5], isLast ? ~B2S_IV[6] : B2S_IV[6], B2S_IV[7]);
		this.v0 ^= v0 ^ v8;
		this.v1 ^= v1 ^ v9;
		this.v2 ^= v2 ^ v10;
		this.v3 ^= v3 ^ v11;
		this.v4 ^= v4 ^ v12;
		this.v5 ^= v5 ^ v13;
		this.v6 ^= v6 ^ v14;
		this.v7 ^= v7 ^ v15;
	}
	destroy() {
		this.destroyed = true;
		clean(this.buffer32);
		this.set(0, 0, 0, 0, 0, 0, 0, 0);
	}
};
/**
* Blake2s hash function. Focuses on 8-bit to 32-bit platforms. 1.5x faster than blake2b in JS.
* @param msg - message that would be hashed
* @param opts - Optional output, MAC, salt, and personalization settings.
*   `dkLen` must be 1..32 bytes; `salt` and `personalization`, if present,
*   must be 8 bytes each. See {@link Blake2Opts}.
* @returns Digest bytes.
* @example
* Hash a message with Blake2s.
* ```ts
* blake2s(new Uint8Array([97, 98, 99]));
* ```
* @example
* Hash a message with Blake2s while selecting output, MAC, salt, and personalization settings.
* ```ts
* blake2s(new Uint8Array([97, 98, 99]), {
*   dkLen: 16,
*   key: new Uint8Array(32),
*   salt: new Uint8Array(8),
*   personalization: new Uint8Array(8),
* });
* ```
*/
var blake2s = /* @__PURE__ */ createHasher((opts) => new _BLAKE2s(opts));
//#endregion
//#region node_modules/@noble/hashes/sha2.js
/**
* SHA2 hash function. A.k.a. sha256, sha384, sha512, sha512_224, sha512_256.
* SHA256 is the fastest hash implementable in JS, even faster than Blake3.
* Check out {@link https://www.rfc-editor.org/rfc/rfc4634 | RFC 4634} and
* {@link https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf | FIPS 180-4}.
* @module
*/
/**
* SHA-224 / SHA-256 round constants from RFC 6234 §5.1: the first 32 bits
* of the cube roots of the first 64 primes (2..311).
*/
var SHA256_K = /* @__PURE__ */ Uint32Array.from([
	1116352408,
	1899447441,
	3049323471,
	3921009573,
	961987163,
	1508970993,
	2453635748,
	2870763221,
	3624381080,
	310598401,
	607225278,
	1426881987,
	1925078388,
	2162078206,
	2614888103,
	3248222580,
	3835390401,
	4022224774,
	264347078,
	604807628,
	770255983,
	1249150122,
	1555081692,
	1996064986,
	2554220882,
	2821834349,
	2952996808,
	3210313671,
	3336571891,
	3584528711,
	113926993,
	338241895,
	666307205,
	773529912,
	1294757372,
	1396182291,
	1695183700,
	1986661051,
	2177026350,
	2456956037,
	2730485921,
	2820302411,
	3259730800,
	3345764771,
	3516065817,
	3600352804,
	4094571909,
	275423344,
	430227734,
	506948616,
	659060556,
	883997877,
	958139571,
	1322822218,
	1537002063,
	1747873779,
	1955562222,
	2024104815,
	2227730452,
	2361852424,
	2428436474,
	2756734187,
	3204031479,
	3329325298
]);
/** Reusable SHA-224 / SHA-256 message schedule buffer `W_t` from RFC 6234 §6.2 step 1. */
var SHA256_W = /* @__PURE__ */ new Uint32Array(64);
/** Internal SHA-224 / SHA-256 compression engine from RFC 6234 §6.2. */
var SHA2_32B = class extends HashMD {
	A = 0;
	B = 0;
	C = 0;
	D = 0;
	E = 0;
	F = 0;
	G = 0;
	H = 0;
	constructor(outputLen, IV) {
		super(64, outputLen, 8, false);
		this.A = IV[0] | 0;
		this.B = IV[1] | 0;
		this.C = IV[2] | 0;
		this.D = IV[3] | 0;
		this.E = IV[4] | 0;
		this.F = IV[5] | 0;
		this.G = IV[6] | 0;
		this.H = IV[7] | 0;
	}
	get() {
		const { A, B, C, D, E, F, G, H } = this;
		return [
			A,
			B,
			C,
			D,
			E,
			F,
			G,
			H
		];
	}
	set(A, B, C, D, E, F, G, H) {
		this.A = A | 0;
		this.B = B | 0;
		this.C = C | 0;
		this.D = D | 0;
		this.E = E | 0;
		this.F = F | 0;
		this.G = G | 0;
		this.H = H | 0;
	}
	_cloneInto(to) {
		(to ||= new this.constructor()).set(...this.get());
		return this._cloneIntoMeta(to);
	}
	process(view, offset) {
		for (let i = 0; i < 16; i++, offset += 4) SHA256_W[i] = view.getUint32(offset, false);
		for (let i = 16; i < 64; i++) {
			const W15 = SHA256_W[i - 15];
			const W2 = SHA256_W[i - 2];
			const s0 = rotr(W15, 7) ^ rotr(W15, 18) ^ W15 >>> 3;
			const s1 = rotr(W2, 17) ^ rotr(W2, 19) ^ W2 >>> 10;
			SHA256_W[i] = s1 + SHA256_W[i - 7] + s0 + SHA256_W[i - 16] | 0;
		}
		let { A, B, C, D, E, F, G, H } = this;
		for (let i = 0; i < 64; i++) {
			const sigma1 = rotr(E, 6) ^ rotr(E, 11) ^ rotr(E, 25);
			const T1 = H + sigma1 + Chi(E, F, G) + SHA256_K[i] + SHA256_W[i] | 0;
			const T2 = (rotr(A, 2) ^ rotr(A, 13) ^ rotr(A, 22)) + Maj(A, B, C) | 0;
			H = G;
			G = F;
			F = E;
			E = D + T1 | 0;
			D = C;
			C = B;
			B = A;
			A = T1 + T2 | 0;
		}
		A = A + this.A | 0;
		B = B + this.B | 0;
		C = C + this.C | 0;
		D = D + this.D | 0;
		E = E + this.E | 0;
		F = F + this.F | 0;
		G = G + this.G | 0;
		H = H + this.H | 0;
		this.set(A, B, C, D, E, F, G, H);
	}
	roundClean() {
		clean(SHA256_W);
	}
	destroy() {
		this.destroyed = true;
		this.set(0, 0, 0, 0, 0, 0, 0, 0);
		clean(this.buffer);
	}
};
/** Internal SHA-256 hash class grounded in RFC 6234 §6.2. */
var _SHA256 = class extends SHA2_32B {
	constructor() {
		super(32, SHA256_IV);
	}
};
/**
* SHA2-256 hash function from RFC 4634. In JS it's the fastest: even faster than Blake3. Some info:
*
* - Trying 2^128 hashes would get 50% chance of collision, using birthday attack.
* - BTC network is doing 2^70 hashes/sec (2^95 hashes/year) as per 2025.
* - Each sha256 hash is executing 2^18 bit operations.
* - Good 2024 ASICs can do 200Th/sec with 3500 watts of power, corresponding to 2^36 hashes/joule.
* @param msg - message bytes to hash
* @param opts - Reserved hash options.
* @returns Digest bytes.
* @example
* Hash a message with SHA2-256.
* ```ts
* sha256(new Uint8Array([97, 98, 99]));
* ```
*/
var sha256 = /* @__PURE__ */ createHasher(() => new _SHA256(), /* @__PURE__ */ oidNist(1));
//#endregion
export { blake2s as n, sha256 as t };
