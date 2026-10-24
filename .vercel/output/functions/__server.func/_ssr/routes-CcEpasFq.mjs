import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Radio, c as FileUp, d as Activity, i as Shield, l as Download, n as Square, o as Mail, r as SquareCheck, s as GitCommitHorizontal, u as ClipboardCopy } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { n as blake2s, t as sha256 } from "../_libs/noble__hashes.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CcEpasFq.js
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
	},
	{
		title: "Worksurface v14 loop",
		stub: "implemented",
		body: "SORT → RESEARCH → MALL (8 positions) → RECEIPT. SHA-256 of source text. Revoke and export. No ranking, no remote connector."
	},
	{
		title: "Buttonscape",
		stub: "implemented",
		body: "A button is a projection of a capability. allow / ask / block. Labels change with context. Adapters consume commands; buttons never call Gmail, MCP, or a model."
	},
	{
		title: "User-voice corpus",
		stub: "unresolved",
		body: "Unreviewed voice records. Not promoted to training, not auto-approved, not copied into this app."
	},
	{
		title: "Kuntman 4D / SL(4,C) spinors",
		stub: "research-supported",
		body: "Dirac as vector-sum of 4-component Weyl spinors; sixteen SL(4,C) pairs. Paper, not a runtime. No adapter until units and a test exist."
	},
	{
		title: "Project graph v1.1",
		stub: "source-backed",
		body: "791 nodes / 1,540 edges on the full graph; architecture 131 / 318. Counts from the box inventory, not a live editor."
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
var DESKS = [
	"Petrography",
	"Geotechnical",
	"Pavements",
	"Construction",
	"Environmental",
	"Building",
	"Nondestructive",
	"GSOC",
	"Field"
];
/** Hand-noted from this paste. Not a generated code reading. */
var FIELD_NOTES = [
	{
		id: "seed-heart",
		name: "The note has to travel with the build",
		trigger: "Passing the code forward made the next system ask again what the work was for. The written piece was moving without the oral piece.",
		next: "Keep the name, what set it off, and the action it was supposed to start. Leave the code in the original file.",
		desk: "Field",
		source: "This conversation",
		standing: "asserted",
		codeSetAside: 0
	},
	{
		id: "seed-storefront",
		name: "A shop in the mall, not a new mall",
		trigger: "The correction was that the core is already standing. New work is a tenant: an adapter on a tool already in use, not another foundation.",
		next: "Pick one existing workflow. Put a small on-screen buffer in front of it. Pass a clean verb in, and a receipt of what was asked back out.",
		desk: "Field",
		source: "This conversation",
		standing: "asserted",
		codeSetAside: 0
	},
	{
		id: "seed-lens",
		name: "The view is not the name of the thing",
		trigger: "A reduced picture (a face, a dashboard, a compressed page) was being treated as the identity of the source.",
		next: "Keep the source as the name. Call the picture a view, and say what the view left out.",
		desk: "Field",
		source: "This conversation",
		standing: "asserted",
		codeSetAside: 0
	},
	{
		id: "seed-three",
		name: "Skill, need, and the resource that joins them",
		trigger: "Isolated facts were not yet a job a person could finish or hand to someone else.",
		next: "Name the skill, the need, and the resource that connects them. The next person should be able to pick up that connection without the raw dump.",
		desk: "Field",
		source: "This conversation",
		standing: "asserted",
		codeSetAside: 0
	},
	{
		id: "seed-event",
		name: "Wake on the event, not the clock",
		trigger: "The mesh was moving because a timer expired, so the record said when, not why.",
		next: "Name the event that should move the work. Record what it was before and what it is after. The clock is not the reason.",
		desk: "Field",
		source: "This conversation",
		standing: "asserted",
		codeSetAside: 0
	},
	{
		id: "seed-label",
		name: "A label stays a label until it is checked",
		trigger: "An automated classification was sliding into the record as if it were the thing that happened.",
		next: "Mark each link observed, derived, asserted, or source-backed. Do not promote the classifier’s word into a fact.",
		desk: "Field",
		source: "This conversation",
		standing: "asserted",
		codeSetAside: 0
	},
	{
		id: "seed-register",
		name: "Say what it adds, then the next wire",
		trigger: "Audit language was framing finished pieces as things to catch out.",
		next: "Write what the piece contributes, and the one wiring step that lets it carry more.",
		desk: "Field",
		source: "This conversation",
		standing: "asserted",
		codeSetAside: 0
	},
	{
		id: "seed-complaint",
		name: "Judgment is not the repair",
		trigger: "Seeing an unhandled fault and only passing the judgment along.",
		next: "Do the local action that changes the state, and leave a receipt of that action.",
		desk: "Field",
		source: "This conversation",
		standing: "asserted",
		codeSetAside: 0
	},
	{
		id: "seed-petro",
		name: "Petrography does not break ground",
		trigger: "A petrography desk was asked to carry Gopher State One Call duties. Looking at a specimen is not excavation.",
		next: "Tie the specimen to the dig, core, or boring that produced it. If that collection used machine-powered equipment, the locate belongs to that field work, not to the thin section.",
		desk: "Petrography",
		source: "AET public services list petrography/chemistry. MN Statutes ch. 216D covers excavation.",
		standing: "source-backed",
		codeSetAside: 0
	},
	{
		id: "seed-operator",
		name: "Each facility answers for itself",
		trigger: "A locate ticket notifies more than one underground operator. One mark on the ground is easy to misread as the whole site.",
		next: "Read each operator’s own response before anyone treats the area as ready. A clear from one operator is not a clear for the property.",
		desk: "GSOC",
		source: "GSOC ticketing page: positive response is per facility operator.",
		standing: "source-backed",
		codeSetAside: 0
	},
	{
		id: "seed-wait",
		name: "The wait starts the next day",
		trigger: "A same-day reading of “48 hours” was going to put a crew on a site early.",
		next: "The 48 hours exclude the day the ticket is filed, weekends, and holidays, and the wait starts at 12:01 a.m. the day after GSOC confirms the ticket. Read the start time printed on the ticket.",
		desk: "GSOC",
		source: "GSOC state-laws page and 2026 handbook summary.",
		standing: "source-backed",
		codeSetAside: 0
	},
	{
		id: "seed-depth",
		name: "Depth stays unknown until a record gives it",
		trigger: "A map of the work area was being read as if it also stated how deep a facility is.",
		next: "Keep horizontal area, depth, and time as three different facts. Unknown depth stays unknown. A planning ticket is design information, not permission to dig.",
		desk: "GSOC",
		source: "GSOC: a ticket does not establish facility depth. Planning tickets do not authorize excavation.",
		standing: "source-backed",
		codeSetAside: 0
	},
	{
		id: "seed-handoff",
		name: "Four steps, and the locate is still unnamed",
		trigger: "The October 15 note replaced an open question with a path: engineers request the drill, the business office assigns the lot, E&D Logs receives the job, and the Drilling Coordinator directs the rig.",
		next: "The proposal, for Mr. Silver to confirm and not yet a rule, is that E&D Logs writes the ticket number and each operator’s response on the lot before that release. One gate. No new department.",
		desk: "GSOC",
		source: "Email “Works With Others??? Please try.”, 15 Oct 2026, from the EXET address.",
		standing: "asserted",
		codeSetAside: 0
	},
	{
		id: "seed-walkie",
		name: "Ask whether the rig moves before a ticket exists",
		trigger: "The same note could not tell whether walkie direction ever happens before a locate ticket exists.",
		next: "Ask that before filling it in. If it happens, it is the first risk. Do not invent the answer.",
		desk: "Geotechnical",
		source: "Email “Works With Others??? Please try.”, 15 Oct 2026.",
		standing: "asserted",
		codeSetAside: 0
	},
	{
		id: "seed-keep-tools",
		name: "Keep the desks they already work on",
		trigger: "A new screen was about to stand in for Spectra QEST and Construction Hive. Those are the systems the lab and the field already use.",
		next: "Leave them in place. A coordination view can sit beside them only after access is actually granted. No connection has been made.",
		desk: "Field",
		source: "AET publicly names Spectra QEST and Construction Hive. The October 15 note says no private connection exists.",
		standing: "source-backed",
		codeSetAside: 0
	},
	{
		id: "seed-catalogue",
		name: "A public list is not the inventory",
		trigger: "Counts of methods and chains were being read as if they certified every instrument on the floor.",
		next: "Call a chain proposed. Call a named tool published. Leave serial number, calibration, and location unknown until a record gives them.",
		desk: "Field",
		source: "October 15 research note. Not an AET operations manual.",
		standing: "asserted",
		codeSetAside: 0
	},
	{
		id: "seed-t277",
		name: "T 277 is not the petrographic exam",
		trigger: "A public pairing treated AASHTO T 277 as if it were ASTM C856.",
		next: "T 277 is the electrical indication of chloride penetration. C856 is the petrographic examination of hardened concrete. Do not copy the pairing into a procedure.",
		desk: "Petrography",
		source: "AASHTO T 277 / ASTM C1202 versus ASTM C856. Flagged in the October 15 note.",
		standing: "source-backed",
		codeSetAside: 0
	},
	{
		id: "seed-lamps",
		name: "Two lamps, one specimen",
		trigger: "Plane-polarized and crossed-polarized light were being treated as one look.",
		next: "Record them as two observations. Each lamp shows a different property of the same piece.",
		desk: "Petrography",
		source: "October 15 parable, tied to ordinary polarized-light practice. Not an AET method.",
		standing: "asserted",
		codeSetAside: 0
	},
	{
		id: "seed-crack",
		name: "Seeing the crack is not naming the cause",
		trigger: "A crack in the section was about to be written up as the mechanism.",
		next: "Describe the crack. Leave the cause open until a second observation supports it.",
		desk: "Petrography",
		source: "October 15 parable. Proposed distinction, not a signed report.",
		standing: "asserted",
		codeSetAside: 0
	},
	{
		id: "seed-voids",
		name: "Seeing the voids is not the count",
		trigger: "Air voids noticed in the microscope were being treated as the air-void measurement.",
		next: "A look is not ASTM C457. The quantitative count is its own procedure.",
		desk: "Petrography",
		source: "ASTM C457 is the quantitative air-void method. October 15 parable.",
		standing: "source-backed",
		codeSetAside: 0
	},
	{
		id: "seed-epr",
		name: "Each operator answers electronically, then the ground still counts",
		trigger: "A ticket status was being treated as clearance for the whole site.",
		next: "From 1 Aug 2026 each facility operator owes an electronic positive response through GSOC before the locate period ends. Read that status against the marks. One operator is not the others.",
		desk: "GSOC",
		source: "GSOC notice: mandatory electronic positive response starts 1 Aug 2026.",
		standing: "source-backed",
		codeSetAside: 0
	},
	{
		id: "seed-phone-trust",
		name: "The phone does not inherit the laptop’s trust",
		trigger: "A local certificate on the workstation was expected to make the phone accept the same origin. Loopback was treated as one machine.",
		next: "Installing a local authority on the laptop does not trust the phone. 127.0.0.1 is whichever device is asking. A shared try needs a reachable name and trust on the phone itself.",
		desk: "Field",
		source: "Cross-device note pasted with the October 15 mail. Not a completed setup.",
		standing: "asserted",
		codeSetAside: 0
	},
	{
		id: "seed-atlas",
		name: "Do not draw a point that was not named",
		trigger: "An atlas was described as 25 places — seven loops, seven paths, seven gates, four transforms — plus a generator that would later add 42 ports. The names were not in the file.",
		next: "A point enters when it has an id, a descriptor, two analogies, and a short evaluation. Until then it is not on the map.",
		desk: "Field",
		source: "Atlas note attached 17 Oct 2026. The point list itself was absent.",
		standing: "asserted",
		codeSetAside: 0
	}
];
var DESK_TODOS = [
	{
		id: "p-receive",
		desk: "Petrography",
		text: "Receive the specimen with the project, who collected it, and where",
		detail: "The lab note starts at the handoff, not at the microscope."
	},
	{
		id: "p-ticket",
		desk: "Petrography",
		text: "Write down the locate ticket of the dig or core that produced it",
		detail: "If machine-powered equipment made the hole and there is no ticket, send it back to the field lead. The lab does not invent a clearance."
	},
	{
		id: "p-ask",
		desk: "Petrography",
		text: "Name the exam that was asked for, and do not invent a result",
		detail: "Aggregate petrography, hardened concrete, or another named exam. The result waits on the work."
	},
	{
		id: "p-depth",
		desk: "Petrography",
		text: "Leave utility depth unknown unless a verified record states it",
		detail: "An as-built or an exposed facility can supply depth. A ticket and a paint mark do not."
	},
	{
		id: "p-report",
		desk: "Petrography",
		text: "Point the report back at the field record",
		detail: "Request, ticket, each operator response, sample, exam, report. One chain."
	},
	{
		id: "g-class",
		desk: "Geotechnical",
		text: "Say whether this assignment disturbs ground",
		detail: "Boring, test pit, and well are disturbance. A desk review of existing borings is not."
	},
	{
		id: "g-white",
		desk: "Geotechnical",
		text: "White-line the excavation area before the locate",
		detail: "Physical marks, or electronic marks that carry the same information. Electronic white lining is allowed from 1 Jan 2026 when it is equivalent."
	},
	{
		id: "g-file",
		desk: "Geotechnical",
		text: "File the locate, then use the start time on the ticket",
		detail: "At least 48 hours, not counting the filing day, weekends, or holidays. The clock starts at 12:01 a.m. the next day after GSOC confirms it."
	},
	{
		id: "g-mile",
		desk: "Geotechnical",
		text: "If the excavation is about a mile or more, use a meet ticket",
		detail: "Adjacent sections that add up to a mile count. This is a coordination flag, not a filed ticket."
	},
	{
		id: "v-split",
		desk: "Pavements",
		text: "Separate a scan from a core",
		detail: "GPR or a falling-weight pass is not the same act as cutting a core. Only the act that disturbs ground goes through the locate."
	},
	{
		id: "c-who",
		desk: "Construction",
		text: "Name who is responsible for the excavation notice",
		detail: "Observation and testing are not the notice. The person who excavates still owns it."
	},
	{
		id: "e-split",
		desk: "Environmental",
		text: "Separate a paper review from a boring or a well",
		detail: "A file review does not need a locate. Drilling and remedial excavation do, under the same field rules."
	},
	{
		id: "b-near",
		desk: "Building",
		text: "If the work opens ground near a foundation, treat it as excavation",
		detail: "A visual or forensic walk is not a locate. Intrusive work beside buried lines is."
	},
	{
		id: "n-split",
		desk: "Nondestructive",
		text: "Keep the scan on the non-intrusive side of the line",
		detail: "If the scan leads to a verification hole, that hole is a new field step with its own notice."
	},
	{
		id: "s-each",
		desk: "GSOC",
		text: "Check every operator listed on the ticket",
		detail: "Statuses to record as they come back: not yet responded, marked, clear, delayed, in progress, no access. One status does not cover the others."
	},
	{
		id: "s-hand",
		desk: "GSOC",
		text: "Near a mark, the close work is hand digging",
		detail: "GSOC describes a tolerance zone of 24 inches either side of an unexposed facility. This desk records that the crew was told. It does not clear them."
	},
	{
		id: "s-plan",
		desk: "GSOC",
		text: "Do not dig on a planning ticket",
		detail: "A planning ticket asks what is in the area during design. It is not permission to excavate."
	},
	{
		id: "s-release",
		desk: "GSOC",
		text: "Proposed: E&D Logs records the ticket and each response before release",
		detail: "Not adopted. The four-step path still has no named owner for the locate. This is the checkpoint offered for Mr. Silver to confirm. It does not add a department."
	},
	{
		id: "g-before",
		desk: "Geotechnical",
		text: "Ask whether a rig is directed before a ticket exists",
		detail: "Unanswered in the October 15 note. Do not fill the blank. If the answer is yes, that is the first risk."
	}
];
var CONNECT = [
	{
		id: "chatgpt",
		name: "ChatGPT",
		delivery: "email",
		openUrl: "https://chatgpt.com/",
		how: "Settings, then Data controls, then Export data. OpenAI emails a link. It can take a while, and the link expires about a day after it arrives. Download the zip and drop it here. This bench does not sign in for you."
	},
	{
		id: "claude",
		name: "Claude",
		delivery: "email",
		openUrl: "https://claude.ai/settings/privacy",
		how: "Settings, then Privacy, then Export data. The mail often comes quickly. The link expires about 24 hours later. Drop conversations.json or the zip. Public share links from this paste opened onto a login wall, so they were not read."
	},
	{
		id: "grok",
		name: "Grok",
		delivery: "email",
		openUrl: "https://grok.com/",
		how: "On grok.com open Settings, then Data controls, and request the download. History that lives on X can be a separate X export. Drop the zip, or the file named prod-grok-backend.json if that is what arrives."
	},
	{
		id: "deepseek",
		name: "DeepSeek",
		delivery: "email",
		openUrl: "https://chat.deepseek.com/",
		how: "No one-click full export was confirmed in account settings. A share link is direct if you already have the file. A full archive is a request to the account’s privacy path, then a wait. Drop whatever file comes back."
	},
	{
		id: "gemini",
		name: "Gemini",
		delivery: "email",
		openUrl: "https://takeout.google.com/",
		how: "Google Takeout prepares the file and emails when it is ready. Drop that download here. Takeout is the wait. The chat itself is not a bulk download."
	},
	{
		id: "notebook",
		name: "NotebookLM",
		delivery: "direct",
		openUrl: "https://notebooklm.google.com/",
		how: "Direct. Download the notes file from this bench, open NotebookLM, and add that file as a source. There is no inbox to wait on."
	}
];
var HEALTH = /\b(systolic|diastolic|blood pressure|chest pain|call 911|suicid|self-harm|mental-state inference)\b/i;
var seq = 0;
function nid(prefix) {
	seq += 1;
	return `${prefix}-${seq.toString(36)}`;
}
function isCodeLine(line) {
	const t = line.trim();
	if (!t) return false;
	if (t.length > 240 && (t.match(/[{};]/g) || []).length > 6) return true;
	if (/^(import |export |from |#include |#!\/|package |@app\.|curl |docker |npm |git |chmod |mkdir |python3? |uvicorn )/.test(t)) return true;
	if (/^(def |class |function |async function |const |let |var |public |private |elif )/.test(t)) return /[{}=();]/.test(t) && !/\b(the|a|an|this|that|and)\b/i.test(t);
	if (/^return\b/.test(t)) return /[;{}()]/.test(t) && !/\b(the|and|with|this|that)\b/i.test(t);
	if (/^\s*(#|\/\/|\/\*|\*)/.test(t) && /[{}();=]/.test(t)) return true;
	if (/^<\/?[a-zA-Z!][^>]*>?\s*$/.test(t)) return true;
	if ((t.match(/[{}();=<>[\]]/g) || []).length >= 4 && t.length < 220 && !/[.!?]\s+[A-Z]/.test(t) && !/\b(the|and|with|this)\b/i.test(t)) return true;
	return false;
}
function decodeEntities(line) {
	const table = {
		nbsp: " ",
		quot: "\"",
		apos: "'",
		lt: "<",
		gt: ">",
		amp: String.fromCharCode(38)
	};
	let s = line;
	for (let i = 0; i < 2; i++) s = s.replace(/* @__PURE__ */ new RegExp("&(#39|[a-z]+);", "gi"), (all, body) => {
		const key = body.toLowerCase();
		if (key === "#39") return "'";
		return Object.prototype.hasOwnProperty.call(table, key) ? table[key] : all;
	});
	return s;
}
function stripCode(raw) {
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
	const kept = [];
	for (const rawLine of s.split("\n")) {
		let line = rawLine;
		if (HEALTH.test(line)) {
			skippedHealth = true;
			const keptSentences = line.split(/(?<=[.!?])\s+/).filter((part) => part.trim() && !HEALTH.test(part));
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
	return {
		prose: kept.join("\n").replace(/\n{3,}/g, "\n\n").trim(),
		blocks,
		skippedHealth
	};
}
function sentencesOf(chunk) {
	const flat = chunk.replace(/^#{1,3}\s+/gm, "").replace(/\s+/g, " ").trim();
	if (!flat) return [];
	return flat.split(/(?<=[.!?])\s+(?=[A-Z0-9“"])/).map((s) => s.trim()).filter((s) => s.length > 24 && !HEALTH.test(s) && !/^https?:\/\//.test(s));
}
function clip(text, max) {
	const clean = text.replace(/`/g, "").replace(/\s+/g, " ").trim();
	if (clean.length <= max) return clean;
	const cut = clean.slice(0, max);
	const sp = cut.lastIndexOf(" ");
	return `${(sp > 40 ? cut.slice(0, sp) : cut).trim()}…`;
}
function deskFor(text) {
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
function titleFrom(chunk, sentences) {
	const heading = chunk.match(/^#{1,3}\s+(.+)$/m)?.[1];
	if (heading && heading.length > 8 && heading.length < 90 && !isCodeLine(heading)) return clip(heading.replace(/[*_]/g, ""), 72);
	return clip(sentences[0] ?? "Untitled note", 72);
}
function pick(sentences, re, fallback, preferLast = false) {
	const hits = sentences.filter((s) => re.test(s));
	return clip((preferLast ? hits[hits.length - 1] : hits[0]) ?? fallback, 280);
}
function noteFromChunk(chunk, source, codeSetAside) {
	const sentences = sentencesOf(chunk);
	if (sentences.length === 0) return null;
	const body = sentences.join(" ");
	if (body.length < 80) return null;
	const trigger = pick(sentences, /\b(because|when|after|asked|trigger|correction|instead of|the problem|showing|so that)\b/i, sentences[0]);
	const actions = sentences.filter((s) => /^(next|then|keep|do not|don't|record|submit|leave|name|tie|file|return)\b/i.test(s));
	const next = actions.length > 0 ? clip(actions.join(" "), 280) : pick(sentences, /\b(next|then|should|need to|supposed to|record|submit|wait for|do not|don't|tie |keep |classify|file the|leave a|name the)\b/i, sentences[sentences.length - 1], true);
	if (next === trigger && sentences.length < 2) return null;
	return {
		id: nid("n"),
		name: titleFrom(chunk, sentences),
		trigger,
		next,
		desk: deskFor(`${titleFrom(chunk, sentences)} ${body}`),
		source,
		standing: "derived",
		codeSetAside
	};
}
function notesFromProse(prose, source, codeSetAside = 0) {
	if (!prose.trim()) return [];
	const parts = prose.split(/\n(?=#{1,3}\s)/);
	const chunks = [];
	for (const part of parts) {
		const paras = part.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
		let buf = "";
		for (const p of paras) if ((buf + "\n" + p).length > 680 && buf) {
			chunks.push(buf);
			buf = p;
		} else buf = buf ? `${buf}\n${p}` : p;
		if (buf) chunks.push(buf);
	}
	const notes = [];
	const seen = /* @__PURE__ */ new Set();
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
function pushString(value, acc, depth) {
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
	const o = value;
	if (typeof o.text === "string") acc.push(o.text);
	else if (typeof o.content === "string") acc.push(o.content);
	for (const [k, v] of Object.entries(o)) {
		if (k === "id" || k === "author" || k === "role" || k === "metadata" || k === "citations") continue;
		if ((k === "text" || k === "content") && typeof v === "string") continue;
		pushString(v, acc, depth + 1);
	}
}
function notesFromText(raw, source) {
	const trimmed = raw.trim();
	if (!trimmed) return {
		notes: [],
		filesRead: 1,
		codeSetAside: 0,
		skippedHealth: false
	};
	if (trimmed.startsWith("{") || trimmed.startsWith("[")) try {
		const parsed = JSON.parse(trimmed);
		const turns = [];
		pushString(parsed, turns, 0);
		const stripped = stripCode(turns.join("\n\n"));
		return {
			notes: notesFromProse(stripped.prose, source, stripped.blocks),
			filesRead: 1,
			codeSetAside: stripped.blocks,
			skippedHealth: stripped.skippedHealth
		};
	} catch {}
	const stripped = stripCode(trimmed);
	return {
		notes: notesFromProse(stripped.prose, source, stripped.blocks),
		filesRead: 1,
		codeSetAside: stripped.blocks,
		skippedHealth: stripped.skippedHealth
	};
}
function looksZip(buf) {
	if (buf.byteLength < 4) return false;
	return new DataView(buf).getUint32(0, true) === 67324752;
}
async function textsFromZip(buf) {
	if (!looksZip(buf)) return [];
	const bytes = new Uint8Array(buf);
	const view = new DataView(buf);
	let eocd = -1;
	const min = Math.max(0, bytes.length - 22 - 65536);
	for (let i = bytes.length - 22; i >= min; i--) if (view.getUint32(i, true) === 101010256) {
		eocd = i;
		break;
	}
	if (eocd < 0) return [];
	const count = view.getUint16(eocd + 10, true);
	let ptr = view.getUint32(eocd + 16, true);
	const out = [];
	for (let n = 0; n < count && n < 30; n++) {
		if (ptr + 46 > bytes.length || view.getUint32(ptr, true) !== 33639248) break;
		const method = view.getUint16(ptr + 10, true);
		const compSize = view.getUint32(ptr + 20, true);
		const nameLen = view.getUint16(ptr + 28, true);
		const extraLen = view.getUint16(ptr + 30, true);
		const commentLen = view.getUint16(ptr + 32, true);
		const localOff = view.getUint32(ptr + 42, true);
		const name = new TextDecoder().decode(bytes.subarray(ptr + 46, ptr + 46 + nameLen));
		ptr += 46 + nameLen + extraLen + commentLen;
		if (!/\.(json|jsonl|txt|md|html|htm)$/i.test(name) || name.endsWith("/")) continue;
		if (compSize > 6e6 || localOff + 30 > bytes.length) continue;
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
		out.push({
			name: name.split("/").pop() || name,
			text: text.slice(0, 4e5)
		});
	}
	return out;
}
async function ingestBuffer(name, buf) {
	if (looksZip(buf) || /\.zip$/i.test(name)) {
		const files = await textsFromZip(buf);
		const pieces = files.map((f) => notesFromText(f.text, f.name));
		return {
			notes: dedupeNotes(pieces.flatMap((p) => p.notes)).slice(0, 24),
			filesRead: files.length,
			codeSetAside: pieces.reduce((n, p) => n + p.codeSetAside, 0),
			skippedHealth: pieces.some((p) => p.skippedHealth)
		};
	}
	return notesFromText(new TextDecoder().decode(buf.slice(0, 5e5)), name || "paste");
}
function dedupeNotes(notes) {
	const seen = /* @__PURE__ */ new Set();
	const out = [];
	for (const note of notes) {
		const key = `${note.name.toLowerCase().slice(0, 48)}|${note.next.toLowerCase().slice(0, 48)}`;
		if (seen.has(key)) continue;
		seen.add(key);
		out.push(note);
	}
	return out;
}
function notesToMarkdown(notes) {
	const lines = [
		"# Oral notes",
		"",
		"Names, what set them off, and what they were supposed to do. Code is not in this file.",
		""
	];
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
var KEY = "oral-bench-v1";
function load() {
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return {
			notes: FIELD_NOTES,
			done: [],
			waits: []
		};
		const parsed = JSON.parse(raw);
		return {
			notes: dedupeNotes([...parsed.notes ?? [], ...FIELD_NOTES.filter((s) => !(parsed.notes ?? []).some((n) => n.id === s.id))]),
			done: parsed.done ?? [],
			waits: parsed.waits ?? []
		};
	} catch {
		return {
			notes: FIELD_NOTES,
			done: [],
			waits: []
		};
	}
}
function download(filename, text) {
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
var VIEWS = [
	{
		id: "notes",
		label: "Notes"
	},
	{
		id: "ingest",
		label: "Ingest"
	},
	{
		id: "desks",
		label: "AET"
	},
	{
		id: "connect",
		label: "Connect"
	}
];
function OralBench() {
	const [view, setView] = (0, import_react.useState)("notes");
	const [notes, setNotes] = (0, import_react.useState)(FIELD_NOTES);
	const [done, setDone] = (0, import_react.useState)([]);
	const [waits, setWaits] = (0, import_react.useState)([]);
	const [ready, setReady] = (0, import_react.useState)(false);
	const [desk, setDesk] = (0, import_react.useState)("Petrography");
	const [filter, setFilter] = (0, import_react.useState)("All");
	const [paste, setPaste] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("");
	const [answering, setAnswering] = (0, import_react.useState)("");
	const fileRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const saved = load();
		setNotes(saved.notes);
		setDone(saved.done);
		setWaits(saved.waits);
		setReady(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!ready) return;
		localStorage.setItem(KEY, JSON.stringify({
			notes,
			done,
			waits
		}));
	}, [
		notes,
		done,
		waits,
		ready
	]);
	const shown = (0, import_react.useMemo)(() => filter === "All" ? notes : notes.filter((n) => n.desk === filter), [notes, filter]);
	const todos = DESK_TODOS.filter((t) => t.desk === desk);
	function addNotes(incoming, message) {
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
		addNotes(result.notes, `${n} ${n === 1 ? "note" : "notes"}. ${c} ${c === 1 ? "code block" : "code blocks"} set aside and not stored.${health}`);
		setPaste("");
	}
	async function onFile(file) {
		const buf = await file.arrayBuffer();
		const result = await ingestBuffer(file.name, buf);
		if (answering) setWaits((prev) => prev.map((w) => w.id === answering ? {
			...w,
			state: "landed"
		} : w));
		if (result.filesRead === 0 && /\.zip$/i.test(file.name)) {
			setStatus("That zip had no text, json, or html this bench could read. Unzip it and drop the conversation file.");
			return;
		}
		if (result.notes.length === 0) {
			setStatus(`Read ${file.name}. ${result.codeSetAside} code blocks set aside. No context note came out of what remained.`);
			return;
		}
		const health = result.skippedHealth ? " A health line was left out." : "";
		const n = result.notes.length;
		const c = result.codeSetAside;
		addNotes(result.notes, `${file.name}: ${n} ${n === 1 ? "note" : "notes"} from ${result.filesRead} file${result.filesRead === 1 ? "" : "s"}. ${c} ${c === 1 ? "code block" : "code blocks"} set aside.${health}`);
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
	function openService(service) {
		window.open(service.openUrl, "_blank", "noopener,noreferrer");
		setStatus(service.delivery === "email" ? `${service.name} is open. If the export arrives by mail, come back and mark the wait, then drop the file.` : `${service.name} is open. Download the notes here first, then add that file over there.`);
	}
	function markWait(id) {
		setWaits((prev) => {
			const rest = prev.filter((w) => w.id !== id);
			return [{
				id,
				since: (/* @__PURE__ */ new Date()).toISOString(),
				state: "waiting"
			}, ...rest];
		});
		setStatus("Waiting on that email. This bench will not poll an inbox.");
	}
	function fileFor(id) {
		setAnswering(id);
		setView("ingest");
		fileRef.current?.click();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: fileRef,
				type: "file",
				accept: ".txt,.md,.json,.jsonl,.html,.htm,.zip,text/plain,application/json,application/zip",
				className: "sr-only",
				onChange: (e) => {
					const file = e.target.files?.[0];
					e.target.value = "";
					if (file) onFile(file);
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-xl text-sm leading-relaxed text-muted",
				children: "If this situation, then that action. The note is that binding: what set it off, what it was supposed to start, and which desk it belongs to. Code stays in the file you already have. This page does not sign in anywhere, and it does not keep what it strips."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-2 overflow-x-auto pb-1",
				children: VIEWS.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					size: "sm",
					variant: view === v.id ? "default" : "outline",
					onClick: () => setView(v.id),
					children: v.label
				}, v.id))
			}),
			status ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-relaxed text-fg",
				children: status
			}) : null,
			view === "notes" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							onClick: saveNotes,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
								className: "size-4",
								"aria-hidden": true
							}), "Download notes"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							variant: "outline",
							onClick: () => void copyNotes(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardCopy, {
								className: "size-4",
								"aria-hidden": true
							}), "Copy"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-2 overflow-x-auto pb-1",
						children: ["All", ...DESKS.filter((d) => notes.some((n) => n.desk === d))].map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "sm",
							variant: filter === d ? "default" : "outline",
							onClick: () => setFilter(d),
							children: d
						}, d))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "flex flex-col gap-3",
						children: shown.map((note) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-[var(--radius-md)] border border-border bg-surface p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-baseline justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display text-xl leading-snug text-fg",
										children: note.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs tracking-wide text-muted uppercase",
										children: note.desk
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-3 text-sm leading-relaxed text-fg",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted",
										children: "Set off by. "
									}), note.trigger]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 text-sm leading-relaxed text-fg",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted",
										children: "Supposed to do. "
									}), note.next]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-3 text-xs text-subtle",
									children: [
										note.standing,
										" · ",
										note.source,
										note.codeSetAside > 0 ? ` · ${note.codeSetAside} code blocks set aside` : ""
									]
								})
							]
						}, note.id))
					})
				]
			}) : null,
			view === "ingest" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-relaxed text-muted",
						children: "Paste a mixed thread, or drop a chat export. Fenced code, HTML, and program lines are counted and discarded. What remains is split into context notes. A zip is read in this browser for text, json, and html inside it."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: paste,
						onChange: (e) => setPaste(e.target.value),
						rows: 8,
						placeholder: "Paste the thread. Code in the paste is set aside.",
						className: "w-full resize-y rounded-[var(--radius-md)] border border-border bg-bg p-3 text-sm leading-relaxed text-fg placeholder:text-subtle"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							onClick: onPasteRead,
							disabled: !paste.trim(),
							children: "Read the paste"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							variant: "outline",
							onClick: () => fileRef.current?.click(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileUp, {
								className: "size-4",
								"aria-hidden": true
							}), answering ? `Drop the ${answering} file` : "Drop a file"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs leading-relaxed text-subtle",
						children: "ChatGPT and Claude exports usually arrive as a zip after an email. Grok’s download may be a zip or prod-grok-backend.json. DeepSeek often has no bulk button, so a share file or a mailed archive is the input. This page never stores the stripped code."
					})
				]
			}) : null,
			view === "desks" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rounded-[var(--radius-md)] border border-border bg-surface p-4 text-sm leading-relaxed text-fg",
						children: "Coordination notes for desks named on teamaet.com. Not an AET procedure and not legal advice. The person who excavates still owns the notice. A planning ticket is not permission to dig. Spectra QEST and Construction Hive stay where they are. Nothing here is connected to them."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rounded-[var(--radius-md)] border border-border bg-bg p-4 text-sm leading-relaxed text-fg",
						children: "Path named on 15 Oct, still a proposal: engineers request the drill, the business office assigns the lot, E&D Logs receives the job, the Drilling Coordinator directs the rig. The locate has no named owner on that path. The offered gate is that E&D Logs writes the ticket number and each operator’s response on the lot before release. Whether a rig moves before a ticket exists is still an open question."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-2 overflow-x-auto pb-1",
						children: DESKS.filter((d) => d !== "Field").map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "sm",
							variant: desk === d ? "default" : "outline",
							onClick: () => setDesk(d),
							children: d
						}, d))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "flex flex-col gap-2",
						children: todos.map((todo) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TodoRow, {
							todo,
							done: done.includes(todo.id),
							onToggle: () => setDone((prev) => prev.includes(todo.id) ? prev.filter((id) => id !== todo.id) : [...prev, todo.id])
						}, todo.id))
					}),
					todos.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "No list on this desk."
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs leading-relaxed text-subtle",
						children: [
							done.length,
							" of ",
							DESK_TODOS.length,
							" steps checked, across every desk. Checked state stays on this phone."
						]
					})
				]
			}) : null,
			view === "connect" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm leading-relaxed text-muted",
					children: "Direct means you download the notes and carry the file yourself. Email means the service mails a link later. This bench opens the service and then waits until you drop the file. It cannot see your inbox."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "flex flex-col gap-3",
					children: CONNECT.map((service) => {
						const wait = waits.find((w) => w.id === service.id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-[var(--radius-md)] border border-border bg-surface p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-baseline justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-base font-medium text-fg",
										children: service.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs tracking-wide text-muted uppercase",
										children: service.delivery === "email" ? "Email, then a file" : "Direct file"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm leading-relaxed text-muted",
									children: service.how
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 flex flex-wrap gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											type: "button",
											onClick: () => openService(service),
											children: ["Open ", service.name]
										}),
										service.delivery === "email" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											type: "button",
											variant: "outline",
											onClick: () => markWait(service.id),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {
												className: "size-4",
												"aria-hidden": true
											}), "I asked for the email"]
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											type: "button",
											variant: "outline",
											onClick: saveNotes,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
												className: "size-4",
												"aria-hidden": true
											}), "Download notes"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											type: "button",
											variant: "outline",
											onClick: () => void copyNotes(),
											children: "Copy notes, then paste there"
										})
									]
								}),
								wait ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 flex flex-wrap items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-warn",
										children: [
											wait.state === "waiting" ? "Waiting on the email." : "File landed.",
											" ",
											wait.since.slice(0, 16).replace("T", " ")
										]
									}), wait.state === "waiting" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										size: "sm",
										variant: "outline",
										onClick: () => fileFor(service.id),
										children: "The email landed"
									}) : null]
								}) : null
							]
						}, service.id);
					})
				})]
			}) : null
		]
	});
}
function TodoRow({ todo, done, onToggle }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: onToggle,
		className: "flex w-full gap-3 rounded-[var(--radius-md)] border border-border bg-surface p-4 text-left",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(done ? SquareCheck : Square, {
			className: done ? "mt-0.5 size-5 shrink-0 text-ok" : "mt-0.5 size-5 shrink-0 text-muted",
			"aria-hidden": true
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: done ? "text-sm text-muted line-through" : "text-sm text-fg",
			children: todo.text
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mt-1 block text-xs leading-relaxed text-subtle",
			children: todo.detail
		})] })]
	}) });
}
var WORKSURFACE_SCHEMA = "mobiius.worksurface.v1";
var WORKSURFACE_KEY = "mobiius-shared-worksurface-v1";
var LOOPS = [
	"WELCOME",
	"BUILD",
	"REPAIR",
	"RETURN"
];
var MALL_POSITIONS = [
	"Current point",
	"Correlate space",
	"Available points",
	"Available avenues",
	"Selection",
	"Transition",
	"New point + script",
	"Continue"
];
var browserClock = {
	now: () => (/* @__PURE__ */ new Date()).toISOString(),
	id: () => crypto.randomUUID()
};
function emptyWork() {
	return {
		schema: WORKSURFACE_SCHEMA,
		cards: [],
		evidence: [],
		receipts: [],
		point: "p:welcome",
		loop: "WELCOME",
		stage: 0,
		selected: null
	};
}
function digestUtf8(text) {
	const bytes = sha256(new TextEncoder().encode(text));
	return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}
function receipt(state, clock, type, fields) {
	return {
		id: clock.id(),
		type,
		at: clock.now(),
		point: state.point,
		action: "allow",
		evidence: "keep",
		...fields
	};
}
function createCard(state, title, source, clock = browserClock) {
	const t = title.trim();
	if (!t || !source) return state;
	const card = {
		id: clock.id(),
		title: t,
		source,
		sha256: digestUtf8(source)
	};
	const next = {
		...state,
		cards: [card, ...state.cards]
	};
	return {
		...next,
		receipts: [receipt(next, clock, "source.created", {
			card: card.id,
			extra: { sha256: card.sha256 }
		}), ...state.receipts]
	};
}
function attachEvidence(state, sourceId, note, reference, clock = browserClock) {
	const n = note.trim();
	if (!n || !state.cards.some((c) => c.id === sourceId)) return state;
	const ev = {
		id: clock.id(),
		source_id: sourceId,
		note: n,
		reference: reference.trim()
	};
	return {
		...state,
		evidence: [ev, ...state.evidence],
		receipts: [receipt(state, clock, "evidence.attached", {
			card: sourceId,
			extra: { evidence: ev.id }
		}), ...state.receipts]
	};
}
function setLoop(state, loop, clock = browserClock) {
	const next = {
		...state,
		loop,
		point: `p:${loop.toLowerCase()}`
	};
	return {
		...next,
		receipts: [receipt(next, clock, "coordinate.updated", { extra: { loop } }), ...state.receipts]
	};
}
function selectCard(state, cardId, clock = browserClock) {
	if (!state.cards.some((c) => c.id === cardId)) return state;
	const next = {
		...state,
		selected: cardId,
		stage: 0
	};
	return {
		...next,
		receipts: [receipt(next, clock, "avenue.selected", { card: cardId }), ...state.receipts]
	};
}
function recordMall(state, clock = browserClock) {
	if (!state.selected) return state;
	const label = MALL_POSITIONS[state.stage];
	const last = state.stage === 7;
	const nextStage = last ? 0 : state.stage + 1;
	const point = last ? `p:return:${clock.id()}` : state.point;
	const type = last ? "script.recorded" : "transition.instantiated";
	const next = {
		...state,
		stage: nextStage,
		point
	};
	return {
		...next,
		receipts: [receipt(next, clock, type, {
			card: state.selected,
			script: label
		}), ...state.receipts]
	};
}
function revokeReceipt(state, receiptId, clock = browserClock) {
	const receipts = state.receipts.map((r) => r.id === receiptId ? {
		...r,
		revoked: true,
		evidence: "revoke"
	} : r);
	return {
		...state,
		receipts: [receipt(state, clock, "receipt.revoked", { extra: { target: receiptId } }), ...receipts]
	};
}
function appendCommand(state, payload, clock = browserClock) {
	if (payload.action === "block") return state;
	return {
		...state,
		receipts: [receipt(state, clock, "hud.command", {
			action: payload.action,
			extra: {
				capabilityId: payload.capabilityId,
				verb: payload.verb,
				contextId: payload.contextId
			}
		}), ...state.receipts]
	};
}
function recordLaunch(state, service, clock = browserClock) {
	return {
		...state,
		receipts: [receipt(state, clock, "launch.opened", {
			action: "ask",
			extra: {
				service: service.id,
				href: service.href,
				fillsQuery: String(service.fillsQuery)
			}
		}), ...state.receipts]
	};
}
function restoreWork(raw) {
	if (!raw || typeof raw !== "object") return emptyWork();
	const o = raw;
	if (o.schema !== "mobiius.worksurface.v1") return emptyWork();
	if (!Array.isArray(o.cards) || !Array.isArray(o.evidence) || !Array.isArray(o.receipts)) return emptyWork();
	const stage = typeof o.stage === "number" && o.stage >= 0 && o.stage <= 7 ? o.stage : 0;
	const loop = LOOPS.includes(o.loop) ? o.loop : "WELCOME";
	return {
		schema: WORKSURFACE_SCHEMA,
		cards: o.cards,
		evidence: o.evidence,
		receipts: o.receipts,
		point: typeof o.point === "string" ? o.point : "p:welcome",
		loop,
		stage,
		selected: typeof o.selected === "string" || o.selected === null ? o.selected : null
	};
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
		"Never conflate a custom tesseract module with Tesseract OCR",
		"Buttons never call connectors; they emit a command envelope",
		"One source-backed proof loop before another architecture rewrite",
		"Kuntman 4D / SL(4,C) remain papers until an adapter names units and a test"
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
		},
		{
			id: "mall-8",
			ok: MALL_POSITIONS.length === 8,
			detail: `Mall records ${MALL_POSITIONS.length} positions; the eighth is script.recorded`
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
var CONTEXTS = [
	{
		id: "cyclic",
		label: "Cyclic Lab"
	},
	{
		id: "partychain",
		label: "PartyChain"
	},
	{
		id: "origami",
		label: "Origami OS"
	},
	{
		id: "catlabs",
		label: "CatLabs"
	},
	{
		id: "fieldstream",
		label: "FieldStream"
	},
	{
		id: "makerjournal",
		label: "Maker’s Journal"
	},
	{
		id: "voicebridge",
		label: "Voice Bridge"
	},
	{
		id: "sharedproject",
		label: "Shared Project"
	}
];
var CAPABILITIES = [
	{
		id: "source.create",
		policy: "allow",
		labels: {
			cyclic: {
				forward: "Card",
				inverse: "Hold"
			},
			partychain: {
				forward: "Invite",
				inverse: "Recall"
			},
			origami: {
				forward: "Fold",
				inverse: "Unfold"
			},
			catlabs: {
				forward: "Capture",
				inverse: "Cut"
			},
			fieldstream: {
				forward: "Sample",
				inverse: "Hold"
			},
			makerjournal: {
				forward: "Note",
				inverse: "Shelf"
			},
			voicebridge: {
				forward: "Listen",
				inverse: "Mute"
			},
			sharedproject: {
				forward: "File",
				inverse: "Park"
			}
		}
	},
	{
		id: "evidence.attach",
		policy: "allow",
		labels: {
			cyclic: {
				forward: "Cite",
				inverse: "Park"
			},
			partychain: {
				forward: "Witness",
				inverse: "Hold"
			},
			origami: {
				forward: "Pin",
				inverse: "Unpin"
			},
			catlabs: {
				forward: "Mark",
				inverse: "Clear"
			},
			fieldstream: {
				forward: "Log",
				inverse: "Hold"
			},
			makerjournal: {
				forward: "Source",
				inverse: "Draft"
			},
			voicebridge: {
				forward: "Tag",
				inverse: "Untag"
			},
			sharedproject: {
				forward: "Attach",
				inverse: "Detach"
			}
		}
	},
	{
		id: "mall.record",
		policy: "allow",
		labels: {
			cyclic: {
				forward: "Record",
				inverse: "Reset"
			},
			partychain: {
				forward: "Step",
				inverse: "Rewind"
			},
			origami: {
				forward: "Crease",
				inverse: "Flatten"
			},
			catlabs: {
				forward: "Take",
				inverse: "Redo"
			},
			fieldstream: {
				forward: "Advance",
				inverse: "Hold"
			},
			makerjournal: {
				forward: "Stamp",
				inverse: "Scratch"
			},
			voicebridge: {
				forward: "Mark",
				inverse: "Skip"
			},
			sharedproject: {
				forward: "Move",
				inverse: "Stay"
			}
		}
	},
	{
		id: "share.dispatch",
		policy: "ask",
		labels: {
			cyclic: {
				forward: "Export",
				inverse: "Revoke"
			},
			partychain: {
				forward: "Share",
				inverse: "Revoke"
			},
			origami: {
				forward: "Send",
				inverse: "Recall"
			},
			catlabs: {
				forward: "Go Live",
				inverse: "End Live"
			},
			fieldstream: {
				forward: "Submit",
				inverse: "Recall"
			},
			makerjournal: {
				forward: "Publish",
				inverse: "Unpublish"
			},
			voicebridge: {
				forward: "Hand Off",
				inverse: "Hold"
			},
			sharedproject: {
				forward: "Share",
				inverse: "Revoke"
			}
		}
	},
	{
		id: "launch.open",
		policy: "ask",
		labels: {
			cyclic: {
				forward: "Open",
				inverse: "Stay"
			},
			partychain: {
				forward: "Launch",
				inverse: "Stay"
			},
			origami: {
				forward: "Route",
				inverse: "Stay"
			},
			catlabs: {
				forward: "Cue",
				inverse: "Stay"
			},
			fieldstream: {
				forward: "Dispatch",
				inverse: "Stay"
			},
			makerjournal: {
				forward: "Look Up",
				inverse: "Stay"
			},
			voicebridge: {
				forward: "Call",
				inverse: "Stay"
			},
			sharedproject: {
				forward: "Open",
				inverse: "Stay"
			}
		}
	}
];
function visibleButtons(context, shareActive) {
	return CAPABILITIES.filter((c) => c.policy !== "block").map((c) => {
		const inverse = Boolean(shareActive && c.id === "share.dispatch");
		const pair = c.labels[context];
		return {
			capabilityId: c.id,
			verb: inverse ? pair.inverse : pair.forward,
			inverse,
			policy: c.policy
		};
	});
}
var LAUNCH_SERVICES = [
	{
		id: "google",
		label: "Google",
		fillsQuery: true,
		href: (q) => `https://www.google.com/search?q=${encodeURIComponent(q)}`
	},
	{
		id: "deepseek",
		label: "DeepSeek",
		fillsQuery: false,
		href: () => "https://chat.deepseek.com/"
	},
	{
		id: "chatgpt",
		label: "ChatGPT",
		fillsQuery: true,
		href: (q) => `https://chatgpt.com/?q=${encodeURIComponent(q)}`
	},
	{
		id: "grok",
		label: "Grok",
		fillsQuery: false,
		href: () => "https://grok.com/"
	},
	{
		id: "copilot",
		label: "Copilot",
		fillsQuery: false,
		href: () => "https://github.com/copilot"
	},
	{
		id: "github",
		label: "GitHub",
		fillsQuery: true,
		href: (q) => `https://github.com/search?q=${encodeURIComponent(q)}`
	},
	{
		id: "gemini",
		label: "Gemini",
		fillsQuery: false,
		href: () => "https://gemini.google.com/app"
	}
];
function contextKey(context, evidence, risk) {
	return `hudctx://surface=${context}/scene=work/role=operator/phase=act/evidence=${evidence}/risk=${risk}`;
}
function loadWork() {
	try {
		const raw = localStorage.getItem(WORKSURFACE_KEY);
		return raw ? restoreWork(JSON.parse(raw)) : emptyWork();
	} catch {
		return emptyWork();
	}
}
function WorkSurface() {
	const [state, setState] = (0, import_react.useState)(emptyWork);
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	const [title, setTitle] = (0, import_react.useState)("");
	const [source, setSource] = (0, import_react.useState)("");
	const [note, setNote] = (0, import_react.useState)("");
	const [reference, setReference] = (0, import_react.useState)("");
	const [context, setContext] = (0, import_react.useState)("cyclic");
	const [query, setQuery] = (0, import_react.useState)("");
	const [pendingAsk, setPendingAsk] = (0, import_react.useState)(null);
	const [copied, setCopied] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setState(loadWork());
		setHydrated(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!hydrated) return;
		try {
			localStorage.setItem(WORKSURFACE_KEY, JSON.stringify(state));
		} catch {}
	}, [state, hydrated]);
	const buttons = (0, import_react.useMemo)(() => visibleButtons(context, state.receipts.some((r) => r.type === "hud.command" && r.extra?.capabilityId === "share.dispatch" && !r.revoked)), [context, state.receipts]);
	function commit(next) {
		setState(next);
	}
	function onCapability(capabilityId) {
		const cap = CAPABILITIES.find((c) => c.id === capabilityId);
		if (!cap) return;
		const vis = buttons.find((b) => b.capabilityId === capabilityId);
		if (!vis) return;
		if (cap.policy === "ask" && pendingAsk !== capabilityId) {
			setPendingAsk(capabilityId);
			return;
		}
		setPendingAsk(null);
		let next = appendCommand(state, {
			capabilityId,
			verb: vis.verb,
			contextId: context,
			action: cap.policy
		}, browserClock);
		if (capabilityId === "source.create") next = createCard(next, title, source);
		if (capabilityId === "evidence.attach" && state.selected) next = attachEvidence(next, state.selected, note, reference);
		if (capabilityId === "mall.record") next = recordMall(next);
		if (capabilityId === "share.dispatch") exportState(next);
		commit(next);
	}
	function launch(id) {
		const svc = LAUNCH_SERVICES.find((s) => s.id === id);
		if (!svc) return;
		const q = query.trim() || title.trim() || "Möbiius Cyclic Lab";
		const href = svc.href(q);
		commit(recordLaunch(state, {
			id: svc.id,
			href,
			fillsQuery: svc.fillsQuery
		}));
		if (!svc.fillsQuery) navigator.clipboard?.writeText(q).then(() => {
			setCopied(true);
			window.setTimeout(() => setCopied(false), 1600);
		});
		window.open(href, "_blank", "noopener,noreferrer");
	}
	const selected = state.cards.find((c) => c.id === state.selected);
	const evidenceFor = state.evidence.filter((e) => e.source_id === state.selected);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "One proof loop. Buttons project a capability. They do not call Gmail, MCP, or a model. Services open in a new tab on your click."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-[var(--radius-xl)] border border-border bg-surface p-4 sm:p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-medium text-fg",
							children: "Buttonscape"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: contextKey(context, "observed", "low") })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-3 block text-xs text-subtle",
						children: ["Context", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							className: "mt-1 h-11 w-full rounded-[var(--radius-sm)] border border-border bg-bg px-3 text-sm text-fg",
							value: context,
							onChange: (e) => setContext(e.target.value),
							children: CONTEXTS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: c.id,
								children: c.label
							}, c.id))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5",
						children: buttons.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: pendingAsk === b.capabilityId ? "default" : "outline",
							onClick: () => onCapability(b.capabilityId),
							children: pendingAsk === b.capabilityId ? `Confirm ${b.verb}` : b.verb
						}, b.capabilityId))
					}),
					pendingAsk ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-xs text-warn",
						children: "Ask gate. Tap again to confirm. No silent send."
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: LOOPS.map((loop) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					size: "sm",
					variant: state.loop === loop ? "default" : "outline",
					onClick: () => commit(setLoop(state, loop)),
					children: loop
				}, loop))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-[var(--radius-xl)] border border-border bg-surface p-4 sm:p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-medium text-fg",
							children: "SORT / SourceCard"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "mt-3 block text-xs text-subtle",
							children: ["Title", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "mt-1 h-11 w-full rounded-[var(--radius-sm)] border border-border bg-bg px-3 text-sm text-fg",
								value: title,
								onChange: (e) => setTitle(e.target.value),
								placeholder: "First field note"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "mt-3 block text-xs text-subtle",
							children: ["Source text", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								className: "mt-1 min-h-28 w-full rounded-[var(--radius-sm)] border border-border bg-bg px-3 py-2 text-sm text-fg",
								value: source,
								onChange: (e) => setSource(e.target.value),
								placeholder: "We need a printable packet for this job."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "mt-3",
							type: "button",
							disabled: !title.trim() || !source || !hydrated,
							onClick: () => {
								commit(createCard(state, title, source));
								setTitle("");
								setSource("");
							},
							children: "Create SourceCard"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-[var(--radius-xl)] border border-border bg-surface p-4 sm:p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-medium text-fg",
							children: "RESEARCH / Evidence"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "mt-3 block text-xs text-subtle",
							children: ["Card", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								className: "mt-1 h-11 w-full rounded-[var(--radius-sm)] border border-border bg-bg px-3 text-sm text-fg",
								value: state.selected ?? "",
								onChange: (e) => commit(selectCard(state, e.target.value)),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Select a card"
								}), state.cards.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: c.id,
									children: c.title
								}, c.id))]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "mt-3 block text-xs text-subtle",
							children: ["Note", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "mt-1 h-11 w-full rounded-[var(--radius-sm)] border border-border bg-bg px-3 text-sm text-fg",
								value: note,
								onChange: (e) => setNote(e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "mt-3 block text-xs text-subtle",
							children: ["Reference (stored as text)", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "mt-1 h-11 w-full rounded-[var(--radius-sm)] border border-border bg-bg px-3 text-sm text-fg",
								value: reference,
								onChange: (e) => setReference(e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "mt-3",
							type: "button",
							disabled: !state.selected || !note.trim(),
							onClick: () => {
								if (!state.selected) return;
								commit(attachEvidence(state, state.selected, note, reference));
								setNote("");
								setReference("");
							},
							children: "Attach evidence"
						}),
						selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 font-mono text-[11px] break-all text-subtle",
							children: ["sha256 ", selected.sha256]
						}) : null,
						evidenceFor.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm text-muted",
							children: [e.note, e.reference ? ` · ${e.reference}` : ""]
						}, e.id))
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-[var(--radius-xl)] border border-border bg-surface p-4 sm:p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-medium text-fg",
							children: "MALL / Transform"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: selected ? `stage ${state.stage + 1}/8` : "select a card" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 grid grid-cols-2 gap-1 sm:grid-cols-4 lg:grid-cols-8",
						children: MALL_POSITIONS.map((label, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `rounded-[var(--radius-sm)] border px-2 py-3 text-center text-[11px] ${i === state.stage && selected ? "border-accent text-fg" : i < state.stage && selected ? "border-border text-muted" : "border-border text-subtle"}`,
							children: label
						}, label))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "mt-4",
						type: "button",
						disabled: !state.selected,
						onClick: () => commit(recordMall(state)),
						children: ["Record ", selected ? MALL_POSITIONS[state.stage] : "…"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-[var(--radius-xl)] border border-border bg-surface p-4 sm:p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-medium text-fg",
						children: "Launch"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "Query is filled where the service accepts it. Others open the app; the text is copied for paste."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "mt-3 h-11 w-full rounded-[var(--radius-sm)] border border-border bg-bg px-3 text-sm text-fg",
						value: query,
						onChange: (e) => setQuery(e.target.value),
						placeholder: "Intention to carry into a service"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7",
						children: LAUNCH_SERVICES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							onClick: () => launch(s.id),
							children: s.label
						}, s.id))
					}),
					copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-ok",
						children: "Query copied. Paste in the opened tab."
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-[var(--radius-xl)] border border-border bg-surface p-4 sm:p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-medium text-fg",
						children: "RECEIPT / Return"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "sm",
							variant: "outline",
							onClick: () => exportState(state),
							children: "Export"
						})
					})]
				}), state.receipts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted",
					children: "No receipts. Create a card to start the first trip."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 flex max-h-80 flex-col gap-2 overflow-auto",
					children: state.receipts.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-start justify-between gap-3 rounded-[var(--radius-sm)] border border-border px-3 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: `text-sm ${r.revoked ? "text-subtle line-through" : "text-fg"}`,
							children: r.type
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-mono text-[11px] text-subtle",
							children: [
								r.script ?? r.extra?.verb ?? r.point,
								" · ",
								r.action,
								"/",
								r.evidence
							]
						})] }), !r.revoked && r.type !== "receipt.revoked" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "sm",
							variant: "ghost",
							onClick: () => commit(revokeReceipt(state, r.id)),
							children: "Revoke"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "danger",
							children: "revoked"
						})]
					}, r.id))
				})]
			})
		]
	});
}
function exportState(state) {
	const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
	const a = document.createElement("a");
	a.href = URL.createObjectURL(blob);
	a.download = "mobiius-worksurface.json";
	a.click();
	URL.revokeObjectURL(a.href);
}
var LANES = [
	{
		id: "oral",
		label: "Oral"
	},
	{
		id: "work",
		label: "Work"
	},
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
	const [lane, setLane] = (0, import_react.useState)("oral");
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
						children: "Oral bench"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-xl text-sm leading-relaxed text-muted text-pretty",
						children: "Context notes for the work already named. The code is not the note."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-2 overflow-x-auto pb-1",
					children: LANES.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "sm",
						variant: lane === l.id ? "default" : "outline",
						onClick: () => setLane(l.id),
						children: l.label
					}, l.id))
				})]
			}),
			lane === "oral" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OralBench, {}) : null,
			lane === "work" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkSurface, {}) : null,
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
