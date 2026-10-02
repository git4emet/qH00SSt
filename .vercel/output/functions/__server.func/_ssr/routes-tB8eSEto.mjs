import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Activity, i as GitCommitHorizontal, n as Shield, r as Radio } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { n as blake2s, t as sha256 } from "../_libs/noble__hashes.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-tB8eSEto.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function Badge({ className, tone = "muted", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium tracking-wide", tone === "muted" && "bg-surface text-muted border border-border", tone === "ok" && "bg-ok/15 text-ok", tone === "warn" && "bg-warn/15 text-warn", tone === "danger" && "bg-danger/15 text-danger", tone === "accent" && "bg-accent/15 text-fg", className),
		...props
	});
}
var CATCHUP = [
	{
		title: "Cyclic emitter v2",
		stub: "tested",
		body: "CAF peak-pick → Bonferroni GLRT with M this frame → TOFAR receipt → consumer. Twin primes stay on the carrier band."
	},
	{
		title: "Amaral–Clawson–Irwin 2023",
		stub: "research-supported",
		body: "Quasicrystalline spin foam. 600-cell (20 tetrahedra at a vertex), dual 120-cell, E8 240 roots. Does not contain 192, 256/255, or C60."
	},
	{
		title: "C60×3+1 / 192 overlay",
		stub: "project-convention",
		body: "Declared here: C60×3+1() = 181 static, 192 local dynamics. Overlay, not a paper result."
	},
	{
		title: "Gherbi 2026 E8 sites",
		stub: "source-backed",
		body: "4 of 270 8D→3D projections, p < 0.05 after Bonferroni, catalog-specific. Transfer to a 62-site catalog fails; Seed 89 is a different resonance."
	},
	{
		title: "Five-budget cold interfaces",
		stub: "research-supported",
		body: "Laser Focus World 2026: no single cryogenic link wins. Assign metal, fiber, converters, ceramic resonators, and local cold electronics to the budget they actually help."
	},
	{
		title: "Personal model",
		stub: "hypothesis",
		body: "Open-weight base + LoRA + retrieval memory + provenance registry + approval gates. Not trained here — no GPU. Assistant text stays unreviewed."
	},
	{
		title: "Whisper++",
		stub: "unresolved",
		body: "Scaffold is current; offline enforcement and receipt fields still need the doctor patch. Hotwords optional and receipted."
	},
	{
		title: "Drilling Coordinator PDF",
		stub: "unresolved",
		body: "AET interface specification, not a running workflow. Documented concept ≠ connected OCR or GSOC."
	},
	{
		title: "Publish envelope",
		stub: "project-convention",
		body: "Publish failure ≠ build failure. Keep the hashed artifact; repair only platform handoff → edge → served hash."
	}
];
var FIVE_BUDGET = [
	{
		name: "Metal microwave cables",
		heat: 5,
		loss: 3,
		noise: 1,
		space: 5,
		cal: 5
	},
	{
		name: "Optical fiber links",
		heat: 1,
		loss: 1,
		noise: 3,
		space: 1,
		cal: 3
	},
	{
		name: "Cold light-to-microwave",
		heat: 3,
		loss: 3,
		noise: 5,
		space: 3,
		cal: 5
	},
	{
		name: "Ceramic resonant wireless",
		heat: 1,
		loss: 3,
		noise: 3,
		space: 1,
		cal: 3
	},
	{
		name: "Local cold electronics",
		heat: 5,
		loss: 1,
		noise: 3,
		space: 3,
		cal: 5
	}
];
/**
* GLRT for a cyclostationary bin.
* Under H0 (complex SCF, Gaussian, large N): Λ = 2 K γ̂² ~ χ²₂
* Survival function of χ²₂ is e^{−x/2}, so λ = −2 ln(P_FA).
* Scanning M alphas: Bonferroni λ = −2 ln(P_FA / M).
*/
function chi2Df2Threshold(pfa) {
	if (!(pfa > 0) || pfa >= 1) throw new Error("P_FA must be in (0, 1)");
	return -2 * Math.log(pfa);
}
/** M = number of alphas actually tested this frame. */
function bonferroniThreshold(pfa, m) {
	return chi2Df2Threshold(pfa / Math.max(1, Math.floor(m)));
}
function glrtStatistic(gamma, K) {
	const g = Math.min(1, Math.max(0, gamma));
	return 2 * K * g * g;
}
function pValueChi2Df2(lambda) {
	return Math.exp(-lambda / 2);
}
function decideGlrt(lambda, threshold) {
	return lambda > threshold ? "H1" : "H0";
}
/** Family-wise p-value cap: min(1, p · M). Gherbi uses this on 270 seeds. */
function bonferroniP(p, m) {
	return Math.min(1, Math.max(0, p) * Math.max(1, Math.floor(m)));
}
function decisionIsH1(decision) {
	const d = decision.trim().toUpperCase();
	return d === "H1" || d === "SIGNAL_PRESENT";
}
/** Gherbi 2026: E8→3D sacred-site tournament. Catalog-specific, not a law. */
var GHERBI = {
	title: "Statistical Alignment of E8 Lattice Projections and Global Sacred Sites",
	author: "Salah-Eddin Gherbi",
	date: "2026-04-06",
	evidence: "source-backed",
	e8: {
		vertices: 240,
		edges: 6720
	},
	catalogN: 160,
	seedsTested: 270,
	orientations: 23328,
	familyWise: .05,
	confirmed: [
		{
			seed: 3,
			orientation: "65°N, 125°E, 250°",
			signature: "Breadth",
			detail: "96.9% of sites within 11 km (0.10°)"
		},
		{
			seed: 85,
			orientation: "75°S, 75°W, 280°",
			signature: "Breadth",
			detail: "97.5% of sites within 11 km (0.10°)"
		},
		{
			seed: 48,
			orientation: "5°S, 135°E, 250°",
			signature: "Precision",
			detail: "83.1% of sites within 5.6 km (0.05°)"
		},
		{
			seed: 46,
			orientation: "55°N, 175°W, 250°",
			signature: "Ultra-precision",
			detail: "30.6% of sites within 1.1 km (0.01°)"
		}
	],
	transfer: {
		catalog62: "four 160-site seeds fail at fixed orientation",
		seed89: "fresh 62-site tournament, RMS p=0.002, d=3.87"
	},
	not: [
		"Not matrix structure (AUC ≈ 0.52)",
		"Not edge topology (< 3% difference)",
		"Not preferred bearings (χ² p = 0.794)",
		"Not a universal geometric law"
	]
};
function gherbiCorrection() {
	const m = GHERBI.seedsTested;
	const family = GHERBI.familyWise;
	return {
		m,
		family,
		perTest: family / m,
		uncorrectedFalseAlarms: m * family,
		pAdjExample: bonferroniP(.002, m),
		note: "Same Bonferroni as cyclic GLRT. M is seeds here, alphas there."
	};
}
var STUB_TONE = {
	implemented: "ok",
	tested: "ok",
	"source-backed": "accent",
	"research-supported": "accent",
	"project-convention": "muted",
	hypothesis: "warn",
	unresolved: "danger"
};
function Dots({ n }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "inline-flex gap-0.5",
		"aria-hidden": true,
		children: Array.from({ length: 5 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `size-1.5 rounded-full ${i < n ? "bg-fg" : "bg-border"}` }, i))
	});
}
function AtlasPanel() {
	const corr = gherbiCorrection();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-[var(--radius-xl)] border border-border bg-surface p-4 sm:p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-medium text-fg",
							children: "Gherbi 2026 · E8 → 3D"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "accent",
							children: "source-backed"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm text-muted",
						children: [
							GHERBI.e8.vertices,
							" vertices, ",
							GHERBI.e8.edges.toLocaleString(),
							" edges, ",
							GHERBI.catalogN,
							" ",
							"sites, ",
							GHERBI.seedsTested,
							" seeds. Same Bonferroni as the cyclic gate: M is seeds here, alphas there."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$1, {
								k: "M seeds",
								v: String(corr.m)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$1, {
								k: "Family-wise",
								v: String(corr.family)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$1, {
								k: "Per-test α",
								v: corr.perTest.toExponential(2)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$1, {
								k: "Uncorrected E[FA]",
								v: corr.uncorrectedFalseAlarms.toFixed(1)
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-xs text-subtle",
						children: [
							"Uncorrected p=0.002 over 270 seeds inflates to ",
							corr.pAdjExample.toFixed(2),
							". The paper claims four confirmed seeds after correction, and transfer to a second catalog fails. Catalog-specific, not a law."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 flex flex-col gap-2",
						children: GHERBI.confirmed.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex flex-col gap-1 rounded-[var(--radius-sm)] border border-border px-3 py-2 sm:flex-row sm:items-center sm:justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-mono text-sm text-fg",
								children: [
									"Seed ",
									s.seed,
									" · ",
									s.orientation
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-subtle",
								children: s.detail
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: s.signature })]
						}, s.seed))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-[var(--radius-xl)] border border-border bg-surface p-4 sm:p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-3 text-sm font-medium text-fg",
						children: "Five-budget assignment"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-4 text-sm text-muted",
						children: "No single cold interface wins. Same rule as lanes: put each tool where its budget is cheapest."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full min-w-[28rem] text-left text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
								className: "text-subtle",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "pb-2 font-medium",
										children: "Interface"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "pb-2 font-medium",
										children: "Heat"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "pb-2 font-medium",
										children: "Loss"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "pb-2 font-medium",
										children: "Noise"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "pb-2 font-medium",
										children: "Space"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "pb-2 font-medium",
										children: "Cal"
									})
								] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: FIVE_BUDGET.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-t border-border",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2 text-fg",
										children: row.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dots, { n: row.heat }) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dots, { n: row.loss }) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dots, { n: row.noise }) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dots, { n: row.space }) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dots, { n: row.cal }) })
								]
							}, row.name)) })]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "grid gap-3 sm:grid-cols-2",
				children: CATCHUP.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-[var(--radius-xl)] border border-border bg-surface p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-medium text-fg",
							children: c.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: STUB_TONE[c.stub],
							children: c.stub
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: c.body
					})]
				}, c.title))
			})
		]
	});
}
function Stat$1({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
		className: "text-xs text-subtle",
		children: k
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
		className: "font-mono text-sm tabular-nums text-fg",
		children: v
	})] });
}
function Heatmap({ scf }) {
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const canvas = ref.current;
		if (!canvas || !scf) return;
		const w = canvas.width;
		const h = canvas.height;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		const img = ctx.createImageData(w, h);
		const { mag, alphaBins, fBins, nfft, alphaAxis } = scf;
		let max = 1e-12;
		for (let a = 0; a < alphaBins; a++) {
			if (Math.abs(alphaAxis[a]) < .03) continue;
			const row = a * fBins;
			for (let f = 0; f < fBins; f++) {
				const v = mag[row + f];
				if (v > max) max = v;
			}
		}
		for (let y = 0; y < h; y++) {
			const aIdx = (Math.floor(y / h * alphaBins) + nfft / 2) % nfft;
			for (let x = 0; x < w; x++) {
				const fIdx = (Math.floor(x / w * fBins) + nfft / 2) % nfft;
				const v = mag[aIdx * fBins + fIdx] / max;
				const t = Math.pow(Math.min(1, v), .28);
				const p = (y * w + x) * 4;
				img.data[p] = 12 + t * 184;
				img.data[p + 1] = 14 + t * 192;
				img.data[p + 2] = 16 + t * 204;
				img.data[p + 3] = 255;
			}
		}
		ctx.putImageData(img, 0, 0);
	}, [scf]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "overflow-hidden rounded-[var(--radius-md)] border border-border bg-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
			ref,
			width: 480,
			height: 280,
			className: "block h-auto w-full",
			"aria-label": "SCF magnitude on the alpha-f plane"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex justify-between px-3 py-2 text-[11px] text-subtle",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "f →" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "α ↑  |S_x^α(f)|" })]
		})]
	});
}
function ProfileChart({ scf, profile, profileAxis, candidates, knownAlpha, selected }) {
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const canvas = ref.current;
		if (!canvas || !profile || !profileAxis || !profileAxis.length) return;
		const w = canvas.width;
		const h = canvas.height;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		ctx.fillStyle = "#0b0c0e";
		ctx.fillRect(0, 0, w, h);
		const n = profile.length;
		let max = 1e-12;
		for (let i = 0; i < n; i++) if (profile[i] > max) max = profile[i];
		const a0 = profileAxis[0];
		const span = profileAxis[n - 1] - a0 || 1;
		const xOf = (alpha) => (alpha - a0) / span * w;
		ctx.beginPath();
		ctx.strokeStyle = "#b8c0cc";
		ctx.lineWidth = 1.5;
		for (let i = 0; i < n; i++) {
			const x = xOf(profileAxis[i]);
			const y = h - 16 - profile[i] / max * (h - 28);
			if (i === 0) ctx.moveTo(x, y);
			else ctx.lineTo(x, y);
		}
		ctx.stroke();
		const mark = (alpha, color, dash = false) => {
			const x = xOf(alpha);
			ctx.save();
			ctx.strokeStyle = color;
			ctx.lineWidth = 1;
			if (dash) ctx.setLineDash([4, 3]);
			ctx.beginPath();
			ctx.moveTo(x, 8);
			ctx.lineTo(x, h - 12);
			ctx.stroke();
			ctx.restore();
		};
		if (knownAlpha != null) mark(knownAlpha, "#6b8f71", true);
		if (selected != null) mark(selected, "#e8e6e1");
		for (const c of candidates) {
			if (c.tier === "proposed") continue;
			const x = xOf(c.alpha);
			ctx.fillStyle = c.tier === "derived" ? "#8b8d92" : "#e8e6e1";
			ctx.beginPath();
			ctx.arc(x, 12, 3, 0, Math.PI * 2);
			ctx.fill();
		}
	}, [
		scf,
		profile,
		profileAxis,
		candidates,
		knownAlpha,
		selected
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "overflow-hidden rounded-[var(--radius-md)] border border-border bg-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
			ref,
			width: 480,
			height: 160,
			className: "block h-auto w-full",
			"aria-label": "CAF alpha profile with known and selected cyclic frequencies"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-4 px-3 py-2 text-[11px] text-subtle",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "CAF max_ℓ |R^α(ℓ)|" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-ok",
					children: "dashed = known f_sym"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-fg",
					children: "solid = selected"
				})
			]
		})]
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-sm)] text-sm font-medium transition-[opacity,transform,background-color] duration-[var(--motion-quick)] ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98]", {
	variants: {
		variant: {
			default: "bg-accent text-accent-fg hover:opacity-90",
			outline: "border border-border bg-transparent text-fg hover:bg-surface",
			ghost: "text-muted hover:bg-surface hover:text-fg"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 px-3 text-xs",
			lg: "h-12 px-5"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
/** Atlas-tier constants. Twin primes are band edges, not alpha generators. */
var TRUST_FLOOR = .743;
/** Default false-alarm rate. Threshold is χ²₂ inverse: −2 ln(P_FA). */
var P_FA = .001;
var CARRIER_ANCHOR = {
	low_hz: 8009,
	high_hz: 8011,
	beat_hz: 2,
	ratio_low_over_high: 8009 / 8011,
	role: "carrier-frequency anchor and coarse band edges — NOT an alpha-set generator"
};
/**
* Overlay declared on this stack — not claimed by Amaral–Clawson–Irwin 2023.
* That paper's 4D object is the 600-cell (dual 120-cell) inside the Elser–Sloane
* quasicrystal from E8. 192, 256/255, and C60×3+1 do not appear there.
*/
var MESH_OVERLAY = {
	static: {
		name: "C60×3+1()",
		count: 181,
		role: "static"
	},
	local_dynamics: {
		name: "192",
		count: 192,
		role: "local dynamics"
	},
	paper_4d: {
		cell_600: {
			cells: 600,
			kind: "tetrahedra",
			meet_at_vertex: 20
		},
		cell_120: {
			cells: 120,
			kind: "dodecahedra",
			dual_of: "600-cell"
		},
		e8_roots: 240
	},
	raster: {
		cells: 256,
		live: 255,
		note: "8-bit raster / GF(256) live-count — not a 600-cell compression ratio"
	}
};
var FEATURES = {
	tolerant: "cyclic_credtofar_symbol_rate",
	strict: "cyclic_credtofar_()_symbol_rate"
};
/**
* Weighting is applied to certainty at decision time, never to the alpha coordinate.
* strict = observed + derived. tolerant = full set including proposed conjugates.
*/
var FEATURE_WEIGHTS = {
	[FEATURES.tolerant]: {
		source: "tolerant",
		certaintyWeight: .5,
		label: "tolerant / partial"
	},
	[FEATURES.strict]: {
		source: "strict",
		certaintyWeight: 1,
		label: "strict / preferred"
	}
};
var SCHEMAS = {
	manifest: "rf.discovery.hyper/manifest.json@1.1",
	array: "rf.discovery.hyper/rf/array.json@1.0",
	cyclo: "rf.discovery.hyper/rf/cyclo.json@1.0",
	glrt: "rf.discovery.hyper/glrt_validator.json@1.0",
	carrier: "rf.discovery.hyper/rf/carrier.json@1.0"
};
var EMPTY_HEAD = {
	lane: "rf.discovery.cyclic",
	alpha_selected: null,
	alpha_candidates: [],
	prior_trace_id: null,
	prior_event_hash: null,
	updated_at: null,
	consumed_trace_id: null
};
/**
* Reads the latest main-lane event with a next_time_hint and updates the chain head.
* This is the reader that closes the loop — a hint field on a write is not enough.
*/
function consumeNextTimeHint(events, head) {
	const hinted = [...events].reverse().find((e) => {
		const md = e.metadata;
		return Boolean(md.next_time_hint?.alpha_selected != null);
	});
	if (!hinted) return head;
	if (hinted.trace_id === head.consumed_trace_id) return head;
	const alpha = hinted.metadata.next_time_hint.alpha_selected;
	return {
		lane: hinted.lane,
		alpha_selected: alpha,
		alpha_candidates: [alpha, ...head.alpha_candidates.filter((a) => a !== alpha)].slice(0, 8),
		prior_trace_id: hinted.trace_id,
		prior_event_hash: hinted.cred_tofar_hash,
		updated_at: (/* @__PURE__ */ new Date()).toISOString(),
		consumed_trace_id: hinted.trace_id
	};
}
/** In-place radix-2 Cooley–Tukey FFT. Length must be a power of two. */
function isPow2(n) {
	return n > 0 && (n & n - 1) === 0;
}
function fftRadix2(re, im, inverse = false) {
	const n = re.length;
	if (n !== im.length || !isPow2(n)) throw new Error("FFT length must be a power of two");
	for (let i = 1, j = 0; i < n; i++) {
		let bit = n >> 1;
		for (; j & bit; bit >>= 1) j ^= bit;
		j ^= bit;
		if (i < j) {
			const tr = re[i];
			re[i] = re[j];
			re[j] = tr;
			const ti = im[i];
			im[i] = im[j];
			im[j] = ti;
		}
	}
	for (let len = 2; len <= n; len <<= 1) {
		const ang = (inverse ? 2 : -2) * Math.PI / len;
		const wlenRe = Math.cos(ang);
		const wlenIm = Math.sin(ang);
		for (let i = 0; i < n; i += len) {
			let wRe = 1;
			let wIm = 0;
			const half = len >> 1;
			for (let j = 0; j < half; j++) {
				const uRe = re[i + j];
				const uIm = im[i + j];
				const vRe = re[i + j + half] * wRe - im[i + j + half] * wIm;
				const vIm = re[i + j + half] * wRe + im[i + j + half] * wIm;
				re[i + j] = uRe + vRe;
				im[i + j] = uIm + vIm;
				re[i + j + half] = uRe - vRe;
				im[i + j + half] = uIm - vIm;
				const nwRe = wRe * wlenRe - wIm * wlenIm;
				wIm = wRe * wlenIm + wIm * wlenRe;
				wRe = nwRe;
			}
		}
	}
	if (inverse) for (let i = 0; i < n; i++) {
		re[i] /= n;
		im[i] /= n;
	}
}
/**
* Time-smoothed cyclic periodogram.
* S_x^α(f) = (1/K) Σ_k X_k(f + α/2) · X_k*(f − α/2)
*/
function averagedScf(x, fs, nfft, windowLen, hop) {
	const n = x.length;
	const w = hann(windowLen);
	const nBlocks = Math.max(1, Math.floor((n - windowLen) / hop) + 1);
	const magAcc = new Float64Array(nfft * nfft);
	const sRe = new Float64Array(nfft * nfft);
	const sIm = new Float64Array(nfft * nfft);
	const psd = new Float64Array(nfft);
	const Xre = new Float64Array(nfft);
	const Xim = new Float64Array(nfft);
	const df = fs / nfft;
	let used = 0;
	for (let b = 0; b < nBlocks; b++) {
		const i0 = b * hop;
		if (i0 + windowLen > n) break;
		Xre.fill(0);
		Xim.fill(0);
		for (let i = 0; i < windowLen; i++) Xre[i] = x[i0 + i] * w[i];
		fftRadix2(Xre, Xim, false);
		for (let f = 0; f < nfft; f++) psd[f] += Xre[f] * Xre[f] + Xim[f] * Xim[f];
		for (let aIdx = 0; aIdx < nfft; aIdx++) {
			const aHz = (aIdx - nfft / 2) * df;
			const half = Math.round(aHz / (2 * df));
			const row = aIdx * nfft;
			for (let f = 0; f < nfft; f++) {
				const ip = mod(f + half, nfft);
				const im = mod(f - half, nfft);
				const re = Xre[ip] * Xre[im] + Xim[ip] * Xim[im];
				const imc = Xim[ip] * Xre[im] - Xre[ip] * Xim[im];
				sRe[row + f] += re;
				sIm[row + f] += imc;
			}
		}
		used++;
	}
	const K = Math.max(1, used);
	for (let i = 0; i < sRe.length; i++) {
		const re = sRe[i] / K;
		const im = sIm[i] / K;
		magAcc[i] = Math.hypot(re, im);
	}
	for (let f = 0; f < nfft; f++) psd[f] /= K;
	const alphaAxis = new Float64Array(nfft);
	const fAxis = new Float64Array(nfft);
	for (let i = 0; i < nfft; i++) {
		alphaAxis[i] = (i - nfft / 2) * df;
		fAxis[i] = (i < nfft / 2 ? i : i - nfft) * df;
	}
	return {
		mag: magAcc,
		alphaBins: nfft,
		fBins: nfft,
		alphaAxis,
		fAxis,
		psd,
		K,
		fs,
		nfft
	};
}
/** Spectral coherence γ̂(f, α) ∈ [0, 1]. */
function coherenceAt(scf, aIdx, fIdx) {
	const aHz = scf.alphaAxis[aIdx];
	const df = scf.fs / scf.nfft;
	const half = Math.round(aHz / (2 * df));
	const mag = scf.mag[aIdx * scf.fBins + fIdx];
	const pHi = scf.psd[mod(fIdx + half, scf.nfft)];
	const pLo = scf.psd[mod(fIdx - half, scf.nfft)];
	const denom = Math.sqrt(Math.max(0, pHi * pLo));
	if (denom <= 0) return 0;
	return Math.min(1, mag / denom);
}
function cafProfile(x, fs, opts) {
	const aMin = opts?.aMin ?? .02 * fs;
	const aMax = opts?.aMax ?? .24 * fs;
	const da = opts?.da ?? fs / 400;
	const maxLag = opts?.maxLag ?? 36;
	const nA = Math.max(1, Math.round((aMax - aMin) / da) + 1);
	const alphaAxis = new Float64Array(nA);
	const profile = new Float64Array(nA);
	for (let k = 0; k < nA; k++) alphaAxis[k] = aMin + k * da;
	const n = x.length;
	const prod = new Float64Array(n);
	for (let lag = 1; lag <= maxLag; lag++) {
		const last = n - lag;
		if (last < 16) break;
		for (let i = 0; i < last; i++) prod[i] = x[i] * x[i + lag];
		for (let k = 0; k < nA; k++) {
			const w = 2 * Math.PI * alphaAxis[k] / fs;
			const cw = Math.cos(w);
			const sw = Math.sin(w);
			let zr = 1;
			let zi = 0;
			let re = 0;
			let im = 0;
			for (let i = 0; i < last; i++) {
				const v = prod[i];
				re += v * zr;
				im += v * zi;
				const nr = zr * cw - zi * sw;
				zi = zr * sw + zi * cw;
				zr = nr;
			}
			const mag = Math.hypot(re, im) / last;
			if (mag > profile[k]) profile[k] = mag;
		}
	}
	return {
		profile,
		alphaAxis
	};
}
function hann(n) {
	const w = new Float64Array(n);
	for (let i = 0; i < n; i++) w[i] = .5 * (1 - Math.cos(2 * Math.PI * i / (n - 1)));
	return w;
}
function mod(i, n) {
	return (i % n + n) % n;
}
function deriveAlphaCandidates(x, fs, opts) {
	const scf = averagedScf(x, fs, opts?.nfft ?? 256, opts?.windowLen ?? 128, opts?.hop ?? 64);
	const caf = cafProfile(x, fs);
	const candidates = classifyPeaks(pickCafPeaks(caf.profile, caf.alphaAxis, scf, opts?.thresholdFactor ?? 2.2, opts?.minSeparationBins ?? 2), fs);
	return {
		scf,
		profile: caf.profile,
		profileAxis: caf.alphaAxis,
		candidates
	};
}
function pickCafPeaks(profile, axis, scf, thresholdFactor, minSep) {
	const sorted = Float64Array.from(profile).sort();
	const med = sorted[Math.floor(sorted.length / 2)] || 1e-12;
	const thr = med * thresholdFactor;
	const peaks = [];
	for (let i = 1; i < profile.length - 1; i++) {
		const v = profile[i];
		if (v < thr) continue;
		if (v < profile[i - 1] || v < profile[i + 1]) continue;
		if (peaks.length && i - peaks[peaks.length - 1].aIdx < minSep) {
			if (v > peaks[peaks.length - 1].peakStrength) peaks.pop();
			else continue;
		}
		const a = axis[i];
		const aIdx = nearestAlphaBin(scf, a);
		peaks.push({
			alpha: a,
			alphaHz: a,
			tier: "observed",
			origin: "peak",
			peakStrength: v,
			snrDb: 10 * Math.log10(v / med),
			gamma: aIdx >= 0 ? maxGammaOnRow(scf, aIdx) : 0,
			aIdx
		});
	}
	return peaks;
}
function nearestAlphaBin(scf, alpha) {
	let best = 0;
	let err = Infinity;
	for (let i = 0; i < scf.alphaAxis.length; i++) {
		const d = Math.abs(scf.alphaAxis[i] - alpha);
		if (d < err) {
			err = d;
			best = i;
		}
	}
	return best;
}
function maxGammaOnRow(scf, aIdx) {
	let best = 0;
	for (let f = 0; f < scf.fBins; f++) {
		const g = coherenceAt(scf, aIdx, f);
		if (g > best) best = g;
	}
	return best;
}
/**
* Fundamental = smallest |α| within 6 dB of the strongest peak.
* Harmonics / subharmonics are derived. Conjugate mirrors are proposed.
*/
function classifyPeaks(peaks, fs) {
	if (!peaks.length) return [];
	const pos = peaks.filter((p) => p.alpha > 0);
	const pool = pos.length ? pos : peaks;
	const floor = pool.reduce((a, b) => b.peakStrength > a.peakStrength ? b : a).peakStrength / 10 ** (6 / 10);
	const fundamental = pool.filter((p) => p.peakStrength >= floor).reduce((a, b) => Math.abs(b.alpha) < Math.abs(a.alpha) ? b : a).alpha;
	const tol = Math.abs(fundamental) * .08 || .01;
	const out = peaks.map((p) => {
		const a = p.alpha;
		if (Math.abs(a - fundamental) < tol || Math.abs(a + fundamental) < tol) return {
			...p,
			tier: "observed",
			origin: "fundamental"
		};
		for (const k of [
			2,
			3,
			4
		]) if (Math.abs(Math.abs(a) - k * Math.abs(fundamental)) < tol * k) return {
			...p,
			tier: "derived",
			origin: `harmonic k=${k}`
		};
		for (const k of [2, 3]) if (Math.abs(Math.abs(a) - Math.abs(fundamental) / k) < tol) return {
			...p,
			tier: "derived",
			origin: `subharmonic 1/${k}`
		};
		return {
			...p,
			tier: "observed",
			origin: "independent"
		};
	});
	const proposed = [];
	for (const p of out) {
		const aC = 2 * fundamental - p.alpha;
		if (aC <= 0) continue;
		if (out.some((q) => Math.abs(q.alpha - aC) < tol)) continue;
		if (proposed.some((q) => Math.abs(q.alpha - aC) < tol)) continue;
		proposed.push({
			alpha: aC,
			alphaHz: aC * fs,
			tier: "proposed",
			origin: `conjugate of ${p.origin}`,
			peakStrength: 0,
			snrDb: null,
			gamma: 0,
			aIdx: -1
		});
	}
	return [...out, ...proposed];
}
function selectAlphaSet(candidates, source) {
	if (source === "strict") return candidates.filter((c) => c.tier !== "proposed");
	return candidates;
}
function jcs(obj) {
	return new TextEncoder().encode(JSON.stringify(sortKeys(obj)));
}
function sortKeys(value) {
	if (Array.isArray(value)) return value.map(sortKeys);
	if (value && typeof value === "object") {
		const rec = value;
		const out = {};
		for (const k of Object.keys(rec).sort()) out[k] = sortKeys(rec[k]);
		return out;
	}
	return value;
}
function hex(bytes) {
	return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}
function sha256Hex(data) {
	return "sha256:" + hex(sha256(data));
}
function blake2sHex(data) {
	return "blake2s:" + hex(blake2s(data));
}
function hashFrame(x) {
	return sha256Hex(new Uint8Array(x.buffer, x.byteOffset, x.byteLength));
}
/** Synthetic rectangular-pulse BPSK. Symbol rate is cycles/sample when fs = 1. */
function synthBpsk(opts) {
	const { fs, symbolRate, nSymbols, snrDb, seed = 1 } = opts;
	const sps = Math.max(2, Math.round(fs / symbolRate));
	const n = nSymbols * sps;
	const x = new Float64Array(n);
	const rng = mulberry32(seed);
	for (let s = 0; s < nSymbols; s++) {
		const bit = rng() < .5 ? -1 : 1;
		const off = s * sps;
		for (let i = 0; i < sps; i++) x[off + i] = bit;
	}
	const noisePow = 1 / 10 ** (snrDb / 10);
	const sigma = Math.sqrt(noisePow);
	for (let i = 0; i < n; i++) x[i] += sigma * gauss(rng);
	return {
		x,
		sps,
		knownAlpha: symbolRate / fs
	};
}
function mulberry32(a) {
	let t = a >>> 0;
	return () => {
		t += 1831565813;
		let r = Math.imul(t ^ t >>> 15, 1 | t);
		r ^= r + Math.imul(r ^ r >>> 7, 61 | r);
		return ((r ^ r >>> 14) >>> 0) / 4294967296;
	};
}
function gauss(rng) {
	const u = Math.max(1e-12, rng());
	const v = rng();
	return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}
function nowIso() {
	return (/* @__PURE__ */ new Date()).toISOString();
}
function rand4() {
	const a = /* @__PURE__ */ new Uint8Array(2);
	crypto.getRandomValues(a);
	return Array.from(a, (b) => b.toString(16).padStart(2, "0")).join("");
}
function buildTofarEvent(args) {
	const weights = FEATURE_WEIGHTS[args.feature];
	const rawCertainty = Math.min(1, Math.max(0, args.gamma));
	const certainty = rawCertainty * weights.certaintyWeight;
	const gateDecision = certainty >= .743 ? "allow" : "freeze";
	const lane = gateDecision === "allow" ? "rf.discovery.cyclic" : "rf.discovery.trainingwheels";
	const params = {
		alpha_set_source: "derive_alpha_candidates",
		alpha_candidates: args.alphaCandidates.map((c) => ({
			alpha: round7(c.alpha),
			tier: c.tier,
			origin: c.origin,
			gamma: round7(c.gamma)
		})),
		N_alpha: args.glrt.M,
		alpha_selected: round7(args.alphaSelected),
		alpha_feature: args.feature,
		alpha_tolerance: args.feature === FEATURES.strict ? "strict" : "tolerant",
		H0: args.glrt.H0,
		H1: args.glrt.H1,
		test_statistic: args.glrt.testStatistic,
		threshold: args.glrt.threshold,
		pfa: args.glrt.pfa,
		p_value: args.glrt.pValue,
		decision: args.glrt.decision,
		K_windows: args.glrt.K,
		scf_estimator: "time_smoothed_cyclic_periodogram",
		formula: "S_x^alpha(f) = X(f+alpha/2) X*(f-alpha/2)",
		bonferroni: true,
		carrier_anchor_role: "band edges only — not in alpha generator"
	};
	const content_hash_cred = sha256Hex(jcs({
		address: args.address,
		lane,
		event: "glrt_verdict",
		params,
		certainty
	}));
	const cred_tofar_hash = blake2sHex(jcs({
		content_hash_cred,
		prior_event_hash: args.priorEventHash ?? "",
		lane
	}));
	const ts = nowIso();
	const nextTimeHint = decisionIsH1(args.glrt.decision) && certainty >= .9 ? {
		trigger: "alpha_selected observed-or-derived AND certainty >= 0.9",
		action: "promote alpha_selected to cyclo.alpha_candidates[0] for next scan",
		alpha_selected: round7(args.alphaSelected)
	} : null;
	const metadata = {
		trust_floor: TRUST_FLOOR,
		gate_decision: gateDecision,
		gate_rule: "certainty >= trust_floor → allow (main lane); < trust_floor → freeze, write training-wheels lane",
		input_hash: args.inputHash,
		schemas: SCHEMAS,
		prior_trace_id: args.priorTraceId,
		next_time_hint: nextTimeHint,
		certainty_weight: weights.certaintyWeight,
		certainty_raw_gamma: round7(rawCertainty),
		tier: gateDecision === "allow" ? "03 · observed" : "02 · below floor"
	};
	const receipt_hash = sha256Hex(jcs({
		content_hash_cred,
		cred_tofar_hash,
		timestamp: ts,
		metadata
	}));
	return {
		event: {
			schema_version: "1.0",
			trace_id: `evt_${Date.now()}_${rand4()}_${lane}`,
			parent_trace_id: args.priorTraceId,
			address: args.address,
			lane,
			event: "glrt_verdict",
			params,
			certainty,
			content_hash_cred,
			cred_tofar_hash,
			receipt_hash,
			timestamp: ts,
			metadata
		},
		gateDecision
	};
}
function appendTofar(ledger, event) {
	if (event.lane === "rf.discovery.trainingwheels") return {
		...ledger,
		trainingwheels: [...ledger.trainingwheels, event]
	};
	return {
		...ledger,
		provenance: [...ledger.provenance, event]
	};
}
function round7(n) {
	return Math.round(n * 1e7) / 1e7;
}
/**
* One frame: synth → SCF peak-pick → Bonferroni GLRT → TOFAR receipt → consumer.
* N_α = M = |scanned| this frame. Weighting never touches the alpha coordinate.
*/
function runScan(opts, ledger, head) {
	const { x, knownAlpha } = synthBpsk({
		fs: opts.fs,
		symbolRate: opts.symbolRate,
		nSymbols: opts.nSymbols,
		snrDb: opts.snrDb,
		seed: opts.seed
	});
	const inputHash = hashFrame(x);
	const derive = deriveAlphaCandidates(x, opts.fs, {
		nfft: opts.nfft,
		windowLen: opts.windowLen,
		hop: opts.hop
	});
	const source = FEATURE_WEIGHTS[opts.feature].source;
	const scanned = selectAlphaSet(derive.candidates, source);
	const M = scanned.length;
	const selected = pickSelected(scanned, head);
	const gamma = selected?.gamma ?? 0;
	const K = derive.scf.K;
	const lambda = glrtStatistic(gamma, K);
	const threshold = bonferroniThreshold(opts.pfa, M);
	const decision = decideGlrt(lambda, threshold);
	const { event } = buildTofarEvent({
		address: opts.address,
		feature: opts.feature,
		glrt: {
			H0: "stationary noise, central chi-squared df=2",
			H1: "cyclostationary at alpha, noncentral chi-squared lambda=SNR*N",
			testStatistic: lambda,
			threshold,
			pfa: opts.pfa,
			pValue: pValueChi2Df2(lambda),
			decision,
			K,
			M
		},
		alphaSelected: selected?.alpha ?? 0,
		alphaCandidates: scanned,
		inputHash,
		priorTraceId: head.prior_trace_id,
		priorEventHash: head.prior_event_hash,
		gamma
	});
	const nextLedger = appendTofar(ledger, event);
	return {
		derive,
		scanned,
		selected,
		knownAlpha,
		M,
		threshold,
		event,
		ledger: nextLedger,
		head: consumeNextTimeHint(nextLedger.provenance, head)
	};
}
function pickSelected(scanned, head) {
	if (!scanned.length) return null;
	const pos = scanned.filter((c) => c.alpha > 0);
	const pool = pos.length ? pos : scanned;
	const fund = pool.find((c) => c.origin === "fundamental");
	if (head.alpha_selected != null) {
		const target = head.alpha_selected;
		const nearest = pool.reduce((a, b) => Math.abs(b.alpha - target) < Math.abs(a.alpha - target) ? b : a);
		const scale = Math.max(Math.abs(target), 1e-9);
		if (Math.abs(nearest.alpha - target) / scale < .15) return nearest;
	}
	if (fund) return fund;
	const rank = (t) => t === "observed" ? 2 : t === "derived" ? 1 : 0;
	return [...pool].sort((a, b) => {
		const dr = rank(b.tier) - rank(a.tier);
		if (dr) return dr;
		if (b.gamma !== a.gamma) return b.gamma - a.gamma;
		return b.peakStrength - a.peakStrength;
	})[0];
}
var ADDRESS = "p:2:3:5:7:11:13";
function CyclicLab({ embedded = false }) {
	const [symbolRate, setSymbolRate] = (0, import_react.useState)(.05);
	const [snrDb, setSnrDb] = (0, import_react.useState)(12);
	const [pfa, setPfa] = (0, import_react.useState)(P_FA);
	const [feature, setFeature] = (0, import_react.useState)(FEATURES.strict);
	const [nSymbols, setNSymbols] = (0, import_react.useState)(256);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [ledger, setLedger] = (0, import_react.useState)({
		provenance: [],
		trainingwheels: []
	});
	const [head, setHead] = (0, import_react.useState)(EMPTY_HEAD);
	const [last, setLast] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const [seed, setSeed] = (0, import_react.useState)(1);
	const singleThreshold = (0, import_react.useMemo)(() => chi2Df2Threshold(pfa), [pfa]);
	const featureMeta = FEATURE_WEIGHTS[feature];
	function scan() {
		setBusy(true);
		setError(null);
		window.setTimeout(() => {
			try {
				const out = runScan({
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
					address: ADDRESS
				}, ledger, head);
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
	const decision = last?.event.params.decision;
	const gate = last?.event.metadata.gate_decision;
	const M = last?.M ?? 8;
	const inner = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		!embedded ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-[0.18em] text-muted uppercase",
					children: "RF · cyclic"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display mt-1 text-3xl tracking-[-0.03em] text-fg sm:text-4xl text-balance",
					children: "Cyclic Lab"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-xl text-sm leading-relaxed text-muted text-pretty",
					children: "Peak-pick cyclic frequencies from the signal. Twin primes 8009/8011 stay on the carrier band. GLRT uses N_α = M actually scanned this frame."
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, { children: ["trust floor ", TRUST_FLOOR] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						tone: "accent",
						children: ["P_FA ", pfa]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, { children: ["N_α design ", 8] })
				]
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, { children: ["trust floor ", TRUST_FLOOR] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
					tone: "accent",
					children: ["P_FA ", pfa]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, { children: ["N_α design ", 8] })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AtlasStrip, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4 rounded-[var(--radius-xl)] border border-border bg-surface p-4 sm:p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Symbol rate f_sym",
						value: symbolRate.toFixed(3),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "range",
							min: .03,
							max: .12,
							step: .005,
							value: symbolRate,
							onChange: (e) => setSymbolRate(Number(e.target.value))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "SNR dB",
						value: String(snrDb),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "range",
							min: 0,
							max: 24,
							step: 1,
							value: snrDb,
							onChange: (e) => setSnrDb(Number(e.target.value))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Symbols",
						value: String(nSymbols),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "range",
							min: 128,
							max: 512,
							step: 64,
							value: nSymbols,
							onChange: (e) => setNSymbols(Number(e.target.value))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
						className: "flex flex-col gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
								className: "text-xs font-medium text-muted",
								children: "P_FA"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-2",
								children: [
									.05,
									.01,
									.001
								].map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									size: "sm",
									variant: pfa === p ? "default" : "outline",
									onClick: () => setPfa(p),
									children: p
								}, p))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-subtle tabular-nums",
								children: [
									"χ²₂ λ = ",
									singleThreshold.toFixed(2),
									" · Bonferroni λ = −2 ln(P_FA / M)"
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
						className: "flex flex-col gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
								className: "text-xs font-medium text-muted",
								children: "Feature lock"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									size: "sm",
									variant: feature === FEATURES.strict ? "default" : "outline",
									onClick: () => setFeature(FEATURES.strict),
									children: "Strict · observed+derived"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									size: "sm",
									variant: feature === FEATURES.tolerant ? "default" : "outline",
									onClick: () => setFeature(FEATURES.tolerant),
									children: "Tolerant · includes proposed"
								})]
							}),
							featureMeta.certaintyWeight < .743 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-warn",
								children: [
									"Weight ",
									featureMeta.certaintyWeight,
									" cannot clear the ",
									TRUST_FLOOR,
									" floor. Receipts route to training-wheels."
								]
							}) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "lg",
						onClick: scan,
						disabled: busy,
						children: busy ? "Scanning…" : "Run cyclic scan"
					}),
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-danger",
						children: error
					}) : null
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-2 sm:grid-cols-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								icon: Radio,
								label: "Known α",
								value: last ? last.knownAlpha.toFixed(3) : "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								icon: Activity,
								label: "Selected α",
								value: last?.selected ? last.selected.alpha.toFixed(3) : "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								icon: Shield,
								label: "M / λ",
								value: last ? `${M} / ${last.threshold.toFixed(1)}` : "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								icon: GitCommitHorizontal,
								label: "Gate",
								value: gate ?? "—",
								tone: gate === "allow" ? "ok" : gate === "freeze" ? "warn" : "muted"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heatmap, { scf: last?.derive.scf ?? null }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileChart, {
						scf: last?.derive.scf ?? null,
						profile: last?.derive.profile ?? null,
						profileAxis: last?.derive.profileAxis ?? null,
						candidates: last?.scanned ?? [],
						knownAlpha: last?.knownAlpha ?? null,
						selected: last?.selected?.alpha ?? null
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "grid gap-4 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Candidates this frame",
				children: !last ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Run a scan. Alphas come from the SCF, not 8009/8011."
				}) : last.scanned.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "No peaks above the noise-floor factor. Raise SNR or symbols."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "flex flex-col gap-2",
					children: last.scanned.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between gap-3 rounded-[var(--radius-sm)] border border-border px-3 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-sm tabular-nums text-fg",
							children: c.alpha.toFixed(4)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-subtle",
							children: c.origin
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: c.tier === "observed" ? "ok" : c.tier === "derived" ? "accent" : "muted",
								children: c.tier
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-mono text-xs tabular-nums text-muted",
								children: ["γ ", c.gamma.toFixed(2)]
							})]
						})]
					}, `${c.alpha}-${c.origin}`))
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Verdict",
				children: !last ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: [
						"Coherence floor ",
						TRUST_FLOOR,
						" is a filter. GLRT threshold is a different layer."
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "grid grid-cols-2 gap-x-4 gap-y-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							k: "Λ = 2Kγ²",
							v: Number(last.event.params.test_statistic).toFixed(2)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							k: "Threshold",
							v: last.threshold.toFixed(2)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							k: "Decision",
							v: String(decision)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							k: "p-value",
							v: Number(last.event.params.p_value).toExponential(2)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							k: "Certainty",
							v: last.event.certainty.toFixed(3)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							k: "K windows",
							v: String(last.event.params.K_windows)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							k: "N_α (M)",
							v: String(M)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							k: "Input hash",
							v: shortHash(String(last.event.metadata.input_hash))
						})
					]
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "grid gap-4 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Provenance lane",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventList, {
					events: ledger.provenance,
					empty: "Allow-gated receipts land here."
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Training-wheels lane",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventList, {
					events: ledger.trainingwheels,
					empty: "Freeze-gated receipts land here. The main ledger is not written."
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			title: "Chain head (consumer)",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 text-sm text-muted",
				children: "Reader that acts on next_time_hint. A write with a hint field is not a closed loop."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "grid grid-cols-1 gap-2 text-sm sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						k: "α selected",
						v: head.alpha_selected != null ? head.alpha_selected.toFixed(4) : "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						k: "Consumed",
						v: head.consumed_trace_id ? shortHash(head.consumed_trace_id) : "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						k: "Prior cred",
						v: head.prior_event_hash ? shortHash(head.prior_event_hash) : "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						k: "Updated",
						v: head.updated_at ? head.updated_at.slice(11, 19) + "Z" : "—"
					})
				]
			})]
		})
	] });
	if (embedded) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-col gap-6",
		children: inner
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto flex min-h-dvh max-w-6xl flex-col gap-6 px-4 py-6 pb-16 sm:px-6 sm:py-10",
		children: inner
	});
}
function AtlasStrip() {
	const s = MESH_OVERLAY.static;
	const d = MESH_OVERLAY.local_dynamics;
	const r = MESH_OVERLAY.raster;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "grid gap-2 rounded-[var(--radius-xl)] border border-border bg-surface px-4 py-3 sm:grid-cols-4 sm:gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AtlasCell, {
				k: "Static",
				v: `${s.name} = ${s.count}`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AtlasCell, {
				k: "Local dynamics",
				v: `${d.count}`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AtlasCell, {
				k: "Carrier band",
				v: `${CARRIER_ANCHOR.low_hz} / ${CARRIER_ANCHOR.high_hz}`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AtlasCell, {
				k: "Raster",
				v: `${r.live}/${r.cells}`
			})
		]
	});
}
function AtlasCell({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-[11px] tracking-wide text-subtle uppercase",
		children: k
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-0.5 font-mono text-sm tabular-nums text-fg",
		children: v
	})] });
}
function Field({ label, value, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex flex-col gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex items-center justify-between text-xs font-medium text-muted",
			children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono tabular-nums text-fg",
				children: value
			})]
		}), children]
	});
}
function Stat({ icon: Icon, label, value, tone = "muted" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-[var(--radius-lg)] border border-border bg-surface p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-1.5 text-subtle",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[11px]",
				children: label
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: `mt-1 font-mono text-sm tabular-nums ${tone === "ok" ? "text-ok" : tone === "warn" ? "text-warn" : "text-fg"}`,
			children: value
		})]
	});
}
function Panel({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-[var(--radius-xl)] border border-border bg-surface p-4 sm:p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-3 text-sm font-medium tracking-tight text-fg",
			children: title
		}), children]
	});
}
function Row({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
		className: "text-subtle",
		children: k
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
		className: "font-mono text-xs tabular-nums text-fg break-all",
		children: v
	})] });
}
function EventList({ events, empty }) {
	if (!events.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: empty
	});
	const shown = events.slice(-6).reverse();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "flex flex-col gap-2",
		children: shown.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "rounded-[var(--radius-sm)] border border-border px-3 py-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[11px] text-subtle",
				children: shortHash(e.trace_id)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-xs text-fg",
				children: [
					String(e.params.decision),
					" · γ-certainty ",
					e.certainty.toFixed(3),
					" · α",
					" ",
					Number(e.params.alpha_selected).toFixed(4)
				]
			})]
		}, e.trace_id))
	});
}
function shortHash(h) {
	return h.replace(/^(sha256:|blake2s:|evt_)/, "").length > 16 ? `${h.slice(0, 18)}…` : h;
}
var TOFAR = [
	"Trust",
	"Open",
	"Fair",
	"Accountable",
	"Reusable"
];
var CYCLE = [
	"READ",
	"FACET",
	"BOUND",
	"BUILD",
	"VERIFY",
	"RECEIPT",
	"RETURN"
];
var MOBIUS_LOOP = [
	"Sense",
	"Parse",
	"Route",
	"Execute",
	"Witness",
	"Reflect",
	"Receive",
	"Return"
];
var SKILL_CREATOR = [
	"draft",
	"test",
	"review",
	"improve"
];
var MOBIUS_SKILL = {
	name: "mobius",
	version: "0.3-draft",
	trustFloor: TRUST_FLOOR,
	tofar: TOFAR,
	cycle: CYCLE,
	loop: MOBIUS_LOOP,
	creator: SKILL_CREATOR,
	splits: [
		"8009/8011 are carrier band edges, never an alpha generator",
		"Certainty weights never multiply the alpha coordinate",
		"N_α = M actually scanned this frame",
		"Gate freeze writes training-wheels; allow writes provenance",
		"Publish failure ≠ build failure",
		`C60×3+1() = ${MESH_OVERLAY.static.count} static; 192 = local dynamics (overlay, not Amaral 2023)`,
		"Amaral 2023: 600-cell / 120-cell / E8 240 roots — no 192, no 256/255, no C60",
		"Gherbi 2026: 4 of 270 seeds, catalog-specific, not a universal law",
		"Assistant text is never auto-approved for training",
		"Never conflate a custom tesseract module with Tesseract OCR"
	]
};
function runSkillChecks() {
	const gherbiM = 270;
	const family = .05;
	return [
		{
			id: "tofar-5",
			ok: TOFAR.length === 5,
			detail: `TOFAR has ${TOFAR.length} terms`
		},
		{
			id: "cycle-7",
			ok: CYCLE.length === 7,
			detail: `operating cycle has ${CYCLE.length} steps`
		},
		{
			id: "creator-4",
			ok: SKILL_CREATOR.length === 4,
			detail: "draft → test → review → improve"
		},
		{
			id: "trust-floor",
			ok: TRUST_FLOOR === .743,
			detail: `trust floor ${TRUST_FLOOR}`
		},
		{
			id: "static-181",
			ok: MESH_OVERLAY.static.count === 181,
			detail: `C60×3+1() = ${MESH_OVERLAY.static.count}`
		},
		{
			id: "local-192",
			ok: MESH_OVERLAY.local_dynamics.count === 192,
			detail: "192 local dynamics"
		},
		{
			id: "e8-240",
			ok: MESH_OVERLAY.paper_4d.e8_roots === 240,
			detail: "E8 roots = 240 (paper, not overlay)"
		},
		{
			id: "bonferroni-gherbi",
			ok: Math.abs(bonferroniP(.05, gherbiM) - 1) < 1e-12,
			detail: `uncorrected p=0.05 over ${gherbiM} seeds saturates family-wise risk`
		},
		{
			id: "bonferroni-per-test",
			ok: Math.abs(family / gherbiM - .05 / 270) < 1e-18,
			detail: `per-test α = 0.05/270 = ${(family / gherbiM).toExponential(2)}`
		},
		{
			id: "glrt-same-math",
			ok: Math.abs(bonferroniThreshold(.001, 20) - -2 * Math.log(.001 / 20)) < 1e-12,
			detail: "cyclic GLRT and Gherbi share Bonferroni, different statistic"
		}
	];
}
function skillPass(checks = runSkillChecks()) {
	return checks.every((c) => c.ok);
}
var PHASE_COPY = {
	draft: {
		title: "Draft",
		body: "Write the splits. Do not call them canonical. Current corrections outrank prior assistant text."
	},
	test: {
		title: "Test",
		body: "Run the invariant suite in this pane. No subagents. Failures stay visible."
	},
	review: {
		title: "Review",
		body: "Separate implemented from hypothesized. Overlay counts are not paper counts."
	},
	improve: {
		title: "Improve",
		body: "Next stable edge: one artifact → one control → gate → bounded op → receipt."
	}
};
function SkillBench() {
	const [phase, setPhase] = (0, import_react.useState)("draft");
	const [ran, setRan] = (0, import_react.useState)(false);
	const checks = (0, import_react.useMemo)(() => runSkillChecks(), []);
	const passed = skillPass(checks);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "rounded-[var(--radius-xl)] border border-border bg-surface p-4 sm:p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "text-sm font-medium text-fg",
							children: [
								MOBIUS_SKILL.name,
								" · ",
								MOBIUS_SKILL.version
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "accent",
							children: "skill-creator"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, { children: ["trust ", MOBIUS_SKILL.trustFloor] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted",
					children: MOBIUS_SKILL.cycle.join(" → ")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-subtle",
					children: MOBIUS_SKILL.tofar.join(" · ")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 flex flex-wrap gap-2",
					children: MOBIUS_SKILL.creator.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "sm",
						variant: phase === p ? "default" : "outline",
						onClick: () => setPhase(p),
						children: p
					}, p))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-fg",
					children: PHASE_COPY[phase].title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: PHASE_COPY[phase].body
				}),
				phase === "test" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						onClick: () => setRan(true),
						children: "Run skill checks"
					}), ran ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-4 flex flex-col gap-2",
						children: [checks.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-start justify-between gap-3 rounded-[var(--radius-sm)] border border-border px-3 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm text-fg",
								children: c.detail
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: c.ok ? "ok" : "danger",
								children: c.ok ? "pass" : "fail"
							})]
						}, c.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "pt-1 text-sm text-muted",
							children: passed ? "All ten checks hold. Improve is allowed." : "A check failed. Stay in review."
						})]
					}) : null]
				}) : null
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "rounded-[var(--radius-xl)] border border-border bg-surface p-4 sm:p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 text-sm font-medium text-fg",
				children: "Hard splits"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "flex flex-col gap-2",
				children: MOBIUS_SKILL.splits.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "border-b border-border pb-2 text-sm text-muted last:border-0 last:pb-0",
					children: s
				}, s))
			})]
		})]
	});
}
var LANES = [
	{
		id: "cyclic",
		label: "Cyclic"
	},
	{
		id: "skill",
		label: "Skill"
	},
	{
		id: "atlas",
		label: "Atlas"
	}
];
function LabShell() {
	const [lane, setLane] = (0, import_react.useState)("cyclic");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex min-h-dvh max-w-6xl flex-col gap-6 px-4 py-6 pb-16 sm:px-6 sm:py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium tracking-[0.18em] text-muted uppercase",
						children: "Möbiius · DoinBetter"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display mt-1 text-3xl tracking-[-0.03em] text-fg sm:text-4xl text-balance",
						children: "Cyclic Lab"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-xl text-sm leading-relaxed text-muted text-pretty",
						children: "Detector, skill, and catch-up atlas. Publish failure is not a rebuild."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: LANES.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "sm",
						variant: lane === l.id ? "default" : "outline",
						onClick: () => setLane(l.id),
						children: l.label
					}, l.id))
				})]
			}),
			lane === "cyclic" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CyclicLab, { embedded: true }) : null,
			lane === "skill" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillBench, {}) : null,
			lane === "atlas" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AtlasPanel, {}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-center text-[11px] text-subtle",
				children: [
					"trust floor ",
					TRUST_FLOOR,
					" · draft"
				]
			})
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabShell, {});
}
//#endregion
export { Home as component };
