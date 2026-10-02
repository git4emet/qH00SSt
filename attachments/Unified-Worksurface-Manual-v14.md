# Maker Systems Sorting Bench
## User manual and engineering cliff notes

**The Lab & the Shelter · Möbii³us / DoinBetter**  
**Release:** Site version 14, October 2, 2026  
**Source commit:** `0a0d09103712f416a5536607a1aa44898618847e`  
**Open:** https://maker-systems-sorting-bench.daviddaniel-exet.chatgpt.site/

This manual describes the controls and implementation in version 14. The Site combines a browser-local working surface with a published catalog, source index, architecture registry, research folds, visual atlas, and build composer.

## Contents

1. [First complete trip](#1-first-complete-trip)
2. [Find your way around](#2-find-your-way-around)
3. [The shared work surface](#3-the-shared-work-surface)
4. [The catalog and build composer](#4-the-catalog-and-build-composer)
5. [Source, research, architecture, and atlas](#5-source-research-architecture-and-atlas)
6. [What survives closing the page](#6-what-survives-closing-the-page)
7. [Engineering cliff notes](#7-engineering-cliff-notes)
8. [Build and publication](#8-build-and-publication)
9. [Troubleshooting](#9-troubleshooting)
10. [Terms and implementation boundaries](#10-terms-and-implementation-boundaries)
11. [One-page operator reference](#11-one-page-operator-reference)

## 1. First complete trip

Use this small example to learn the entire shared loop.

1. Open the Site. The **work** tab opens first.
2. Select **SORT / SOURCECARD**. Enter the title `First field note` and source text `We need a printable packet for this job.` Click **Create SourceCard**.
3. Select **RESEARCH / EVIDENCE**. Choose `First field note`, enter an evidence note such as `The original request asks for a printable packet`, and optionally enter a reference. Click **Attach evidence**.
4. Select **MALL / TRANSFORM**. Choose that SourceCard in **Available SourceCards**.
5. Click the **Record …** button eight times. Its label follows the current position: Current point, Correlate space, Available points, Available avenues, Selection, Transition, New point + script, Continue.
6. Select **RECEIPT / RETURN**. Expand a receipt to see the recorded event. Click **Export shared state + receipts** to download `mobiius-worksurface.json`.

The same card and evidence appear in Sorting, Research, and Mall because those views read the same state. The original source text remains unchanged. The eight clicks record a traversal; they do not generate a printable packet or call an external service.

For a fresh session, this example creates **11 receipts**: one card creation, one evidence attachment, one selection, and eight recorded positions. Clicking lifecycle buttons adds further receipts.

## 2. Find your way around

The top navigation switches views within the main page. These are tabs, not separate page URLs. Refreshing opens **work** again; other tabs are not encoded in the address bar.

| Tab shown | What you can do |
|---|---|
| **work** | Create SourceCards, attach evidence, record local traversals, export shared state |
| **bench** | Search and filter curated maker systems; inspect details; add systems to a build tray |
| **site stack** | Inspect the retained Site faces and their installed summaries; use the older local Mall demonstration |
| **Sep 4 fold** | Read the September intake, concepts, findings, concurrent build contracts, carriers, and external source anchors |
| **coordinate space** | Select a published avenue, instantiate a local traversal record, download its receipt |
| **source intake** | Inspect the compiled archive intake and Carrier → Actual → Facet → Build relationships |
| **build** | Inspect selected systems, missing dependencies, shared foundations, and copy a build recipe |
| **14 days** | Read the July 18–31, 2026 plan, toggle local task checkmarks, copy a day card |
| **architecture** | Search graph nodes by text, kind, and recorded status; inspect concurrent lanes |
| **atlas** | Read the Dollhouse, Orbitron, save-state, and visual source projections |
| **sources** | Search the public derived source index and expand individual source records |
| **about** | Read the Site's explanatory and provenance material |

The **14 days** view is a dated plan from the retained material. It does not become a new October schedule automatically. When today's date is outside the plan, its copy helper uses the next available planned day or the final card if all dates are past.

### Entrances and original faces

The work surface links the eight entrances: `doinbetter.com`, `doinbetter.org`, `heymico.com`, `heymico.org`, `timmyu.in`, `tailly.cc`, `winxm.art`, and `ahig.xyz`. The GitHub link opens `https://github.com/git4emet`.

These controls open external addresses. They do not configure DNS, publish to those domains, push to GitHub, or synchronize their data.

**INIT / ROUTE** contains two kinds of control for each organ: **Open shared organ** changes the local view; **Original source face** opens the retained Site. The four source faces are One42/142o Init 0, Maker Systems Sorting Bench, Möbii³us Source Research, and Text Goes Boom Mall. The older **site stack** also retains the Andromeda Function Stack Atlas as a fifth face.

## 3. The shared work surface

The visible body is:

**INIT / ROUTE → SORT / SOURCECARD → RESEARCH / EVIDENCE → MALL / TRANSFORM → RECEIPT / RETURN**

You can open any organ directly. Their display sequence does not rank them. No recommendation or scoring operation selects a traversal.

### WELCOME, BUILD, REPAIR, RETURN

These four buttons set a lifecycle coordinate and emit `coordinate.updated`. For example, **REPAIR** changes the point to `p:repair`. They do not erase cards, clear evidence, reset the Mall stage, or execute a repair job. Clicking an already active lifecycle button also records an event.

### SORT / SOURCECARD

Both title and source text are required. **Create SourceCard** assigns a UUID and computes SHA-256 over the exact source text encoded as UTF-8. The title is trimmed; the source text is retained as entered. Whitespace changes in the source therefore change its digest.

A SourceCard contains:

```json
{
  "id": "a UUID",
  "title": "First field note",
  "source": "We need a printable packet for this job.",
  "sha256": "64 hexadecimal characters"
}
```

The digest identifies the text. It is not a signature, evidence of authorship, a trust score, or proof that the statement is true. Version 14 does not deduplicate new cards by digest: entering identical text twice creates two card identities.

The current control accepts text. File hashing is available in the older site-stack Mall; that control does not create a shared SourceCard.

### RESEARCH / EVIDENCE

Choose an existing SourceCard, enter a required note, optionally enter a reference, then click **Attach evidence**. Attachments are separate objects linked through `source_id`. They appear below their source card wherever the shared cards are displayed.

References are stored and displayed as text. The Site does not retrieve, crawl, validate, or automatically turn them into evidence. An evidence note can record an observation, a contradiction, an unresolved relation, or a source location. Attaching it does not rewrite the source.

There is no edit/delete control for cards or attachments in this release. Add a separately identified correction or observation when the original needs context.

### MALL / TRANSFORM

Choose a SourceCard before recording positions. Selecting a card emits `avenue.selected` and resets the stage to zero. Choosing another card restarts the eight-position display while preserving earlier receipts.

| Position | Label | What the button records |
|---|---|---|
| 0 | Current point | The first position and selected source identity |
| 1 | Correlate space | The second position |
| 2 | Available points | The third position |
| 3 | Available avenues | The fourth position |
| 4 | Selection | The fifth position |
| 5 | Transition | The sixth position |
| 6 | New point + script | The seventh position |
| 7 | Continue | A `script.recorded` event and a new return point |

The first seven clicks emit `transition.instantiated`, advance the stage, and retain the current point. The eighth emits `script.recorded`, sets `p:return:<event UUID>`, and wraps the stage to zero. The selected card remains selected.

Each receipt's `script` is the label of the position being recorded. Version 14 does not assemble a single executable eight-step script, derive new coordinates from the pasted text, or call the named tools. This is the local traversal recorder for that architecture.

### RECEIPT / RETURN

Receipts appear in insertion order. Click a receipt summary to inspect JSON. **Export shared state + receipts** downloads the entire state: cards, evidence, receipts, current point, lifecycle label, stage, and selected card identity.

There is no import button yet. Keep the exported JSON as a portable record; the Site does not automatically reload a downloaded export. The JSON preserves data for a later restore tool or direct engineering inspection.

### The older Mall in site stack

The **site stack → Mall** demonstration is a separate implementation. It lets you choose a product and transform, hash a local file, and advance an eight-position loop. At completion it downloads a separate traversal receipt and increments a saved counter.

Its local file bytes are hashed in the browser, not uploaded by that control. Its initial source marker is a placeholder, not a measured SHA-256. Its repeated short hash in the event ID is not a cryptographic event signature. The saved value is a count; the downloaded receipt contains the fuller record.

Those older receipts and selected files are not added to the new work surface. Use **work** for the shared SourceCard/evidence/receipt trip.

## 4. The catalog and build composer

### Bench

Search system names, aliases, inputs, outputs, domains, and tags. Use the organ rack and evidence-state, facet, and phase filters to narrow the catalog. **Reset** or **Clear filters** removes the filters. Card/list buttons change presentation.

Open a card to inspect its input, operation, output, evidence, adjacent proof point, dependencies, domains, aliases, and source anchors. **Find source records** opens Sources with an alias/name query. A zero result may mean the derived index uses another alias; it does not establish absence from every original file.

**Add to build** and **Remove from build** modify the selection tray. They do not compile or run that system. The tray persists while the parent page remains mounted, including tab changes, but is not saved across a page reload.

### Build

The composer groups the selected systems by their recorded lifecycle phase. **Missing foundations** lists declared dependency IDs absent from the selection, along with consumers. **Add** includes a known missing system. **Reusable foundations** shows dependencies named by multiple selected systems.

**Dependencies closed** means the selected IDs contain all declared dependencies. It does not mean runtime integration is complete or that the declarations cover every dependency.

**Copy build recipe** places JSON on the clipboard, including selected systems, inputs, operations, outputs, dependencies, missing dependencies, and evidence boundary. Paste it into a file, issue, notebook, or another conversation to carry the selected assembly forward. **Clear tray** clears only the in-memory selection.

The catalog includes historical organ names and phases such as Conscience and guard. Those are retained catalog descriptors. They are not an intermediate evaluation operation in the new coordinate traversal recorder.

## 5. Source, research, architecture, and atlas

### Sep 4 fold

Switch its subviews to inspect findings, concepts, builds, carriers, and evidence anchors. Search concepts and expand one to see aliases, absorbed terms, and boundaries. Concurrent build cards expose entry/exit contracts and adjoining points. Carrier filters distinguish published summaries from aggregate-only and restricted summaries.

External links are source anchors. Their presence does not establish that project-specific hardware, mathematics, or integrations have been tested.

### Coordinate space

This view loads a published point and its available avenues. Select an avenue to reveal its transform. **Instantiate selected transition** creates a local receipt containing from, via, to, transform, script, and timestamp. **Download receipt** saves it.

Instantiation records the selected relation; it does not run an external transform. This component does not persist its receipt in localStorage or append it to the work surface's receipt stream. Download it before navigating away or reloading. The connected-source map is a published discovery receipt, not a live mailbox/file-service connector.

### Source intake

Inspect archive carriers, detected formats, source families, inspection states, counts, and lineage. Filters work on the compiled public registry. This view does not upload or excavate a new archive when opened.

### Sources

Search the derived source index and filter by source kind or structural signal. Expand records to inspect retained metadata such as headings, filenames, API paths, and system associations. The index contains public derivatives, not every raw conversation body. Mention counts measure recorded occurrences, not model agreement, importance, or confidence.

### Architecture

Filter nodes by text, kind, and recorded status. Read IDs, labels, descriptions, and authority fields. The interface exposes the graph registry and concurrent lane summaries; it is not a graph-editing or service-orchestration console.

### Atlas

Read the supplied Dollhouse, Orbitron, Origami, and other visual projections alongside their captions and source boundaries. An image can depict a module, route, or physical proposal without establishing a deployed implementation. The visual atlas and the browser state are distinct representations.

### Corpus counts

Counts belong to named tranches and layers. For example, September has 11 top-level carriers and 13 Actuals, while October has 23 supplied carriers and its own document reconciliation. Those are not interchangeable totals. The present derived source index has 1,077 records; the architecture registry describes 131 nodes and 318 relationships. Historical face summaries can retain counts from their earlier source snapshots.

## 6. What survives closing the page

| Data | Storage | Survives refresh? | Shared with new work receipts? |
|---|---|---|---|
| Shared cards, evidence, receipts, point, loop, stage, selected card | `mobiius-shared-worksurface-v1` in localStorage | Yes, when browser storage is available | Yes |
| Older site-stack Mall count | `maker-system-site-stack-receipts-v2` | Yes | No |
| Older Mall current file/product/transform/loop | React component memory | No; also resets on unmount | No |
| Coordinate-space selection and receipt | Component memory | No | No |
| Bench build tray and filters | Parent component memory | No | No |
| 14-day task checkmarks | `maker-sorter-day-checks-v1` | Yes | No |
| Published catalog, JSON registries, atlas images | Deployed files | Reloaded from Site | Read-only published material |

The shared work component stays mounted while other tabs are displayed. Its views switch without creating separate state stores. Tabs on the same browser origin receive storage-change events from other tabs.

Storage is specific to browser profile, device, and origin. Another device, another browser, a private window, an original Site face, or one of the eight domains will not automatically have the same data. Clearing Site data removes the saved local session. Concurrent writes from multiple tabs can overwrite one another: this release has no transactional merge or conflict resolver.

If storage is unavailable/full, the work surface displays an error and retains the current in-memory session. Export before leaving. The shared export contains exactly the source/evidence text you entered, so handle it according to its contents. This workflow does not send that local text to AI providers or account connectors.

## 7. Engineering cliff notes

### Runtime map

```text
Published files and server-rendered page
  -> React browser interface
  -> selected view / user input
  -> local state transition
  -> browser storage + receipt
  -> optional JSON download
```

**Coordinate contract:** current point → resolve correlate space → enumerate points → present avenues → selection → instantiate transition → record point + script → continue. Scores, ranking, recommendations, approvals, and voting are absent from the shared reducer. The Mall's staged recorder is a bounded implementation of recording, not a full coordinate-discovery engine.

| File | Responsibility |
|---|---|
| `app/page.tsx` | Renders the parent `SystemSorter` |
| `components/SystemSorter.tsx` | Top-level tabs, catalog, composer, dated calendar, architecture, atlas, source index |
| `components/SharedWorksurface.tsx` | New shared views, form input, SHA-256, local persistence, storage events, export |
| `lib/worksurface.mjs` | Pure state reducer and eight position labels |
| `components/SiteStack.tsx` | Retained Site summaries and older Mall demo |
| `components/CoordinateSpace.tsx` | Published avenues and separate local traversal receipt |
| `components/ResearchFold.tsx` | September research views |
| `lib/catalog.ts` | Curated systems, organ metadata, phases, dependencies, source receipts |
| `public/data/` | Public compiled indexes, ledgers, graph and calendar data |
| `public/atlas/` | Supplied visual assets |
| `app/globals.css` | Styling, responsive layout, shared-work theme |
| `app/layout.tsx` | Metadata and root layout |

### Shared state schema

```json
{
  "schema": "mobiius.worksurface.v1",
  "cards": [],
  "evidence": [],
  "receipts": [],
  "point": "p:welcome",
  "loop": "WELCOME",
  "stage": 0,
  "selected": null
}
```

The reducer appends records with array copies. Evidence and selections must reference an existing card; a traversal requires a selection. Event IDs come from `crypto.randomUUID()`. Timestamps come from the browser's clock through `new Date().toISOString()`; they are not independently timestamped. Restore checks the schema marker, arrays, and stage range, but does not deeply validate every record.

| Event | Effect |
|---|---|
| `source.created` | Append card and creation receipt |
| `evidence.attached` | Append linked evidence and receipt |
| `coordinate.updated` | Set lifecycle point and append receipt |
| `avenue.selected` | Set source selection, reset stage, append receipt |
| `transition.instantiated` | Record position; on the last position emit `script.recorded` instead |
| `script.recorded` | Final receipt type produced by the reducer; set return point and wrap stage |

There is no SSE endpoint, server database, provider adapter invocation, background automation, or cross-domain bus in this shared implementation. SourceCards entered here also do not modify the deployed corpus index, catalog, or architecture JSON.

### Published data paths

`source-index.json` serves derived source records; `architecture.json` serves the graph; `concurrent-builds.json` serves build lanes; `concurrent-days.json` serves the dated plan. `archive-intake.json`, `deep-research-batch.json`, and `project-aggregate.json` serve their respective tranches. `coordinate-space.json` supplies the available avenues. `connected-source-map.json` supplies retained connected-source observations.

The source inputs live under `data/`. Merge scripts generate public derivatives. Preserve input lineage when changing a derivative; changing a public summary is not an edit to its original carrier.

### Extension seams

New local event types can be added to `lib/worksurface.mjs` and exposed by controls in `SharedWorksurface.tsx`. Preserve SourceCard identities and keep evidence separate. New published catalog systems belong in `lib/catalog.ts` with declared inputs, outputs, dependencies, and source anchors. New corpus derivatives belong in their source compiler inputs and merge scripts.

A future import control needs deep schema validation and an explicit merge/replacement operation. A future server store needs identity, concurrency handling, persistence, and retrieval contracts. A future RAG/SSE implementation can expose discovered points and relations; it is not already present because the interface uses those words.

Sephardic pronunciation and the Chabad Lubavitch source hierarchy, supplemented through ASKNOAH and Aish, remain content requirements for relevant future speech/traditional material. Version 14's new work surface itself has no speech engine or pronunciation control.

## 8. Build and publication

The project declares React 19.2.7, Next 16.2.10, TypeScript 5.9.3, Vite 8, Vinext, and Rolldown 1.1.5. Use the committed lockfile for the installed dependency set. The Next-style app is built and served through Vinext rather than a conventional Next production server.

From the project checkout:

```bash
npm ci --no-audit --no-fund
npm run dev
```

Before preparing a changed release:

```bash
npm run lint
npm test
npm run build
```

The build performs September and October merges, Vinext compilation, server finalization, import checks, and a local root response check. Output is in `dist/`. The two merges preserve the derived source-index append behavior tested by the project.

### The version 14 runtime repair

Version 12's deployment status reported success while the public page returned 500. Production logs revealed an unresolved `react/jsx-runtime` import. Bundling that dependency then exposed a second problem: `createRequire(import.meta.url)` expected a Node filesystem context unavailable in the hosted runtime.

`scripts/bundle-ssr-dependencies.mjs` now binds the generated React DOM require to a static import and bundles SSR dependencies with preserved entry paths and exports. `scripts/finalize-build.mjs` installs the Worker fetch wrapper and hosting metadata. `scripts/validate-packaged-imports.mjs` checks literal module imports for unresolved package names. `scripts/validate-runtime-response.mjs` invokes the built Worker and verifies the root HTML response.

The require bridge handles the observed generated `react-dom` call. It is not a general Node filesystem emulator. If Vinext changes its generated loader form or introduces another require target, inspect and adapt this bridge. The literal-import check also does not prove every dynamic import or require can resolve in production.

### Publication contract

`.openai/hosting.json` identifies the existing Site. Preserve its project ID. The Sites workflow validates/builds the checkout, commits and pushes exact source, packages output, saves a version, and deploys that saved version. Runtime write credentials remain ephemeral; do not put them in the repository or archive.

A source ZIP and a deployment archive have different contents: the ZIP is project source, while the deployment archive contains the configured runtime/static output and hosting manifest. The previously downloaded **v12 ZIP predates the runtime repair**; it is not the v14 source package.

For an unchanged valid archive, retrying publication does not require re-ingesting the sources. For a demonstrated packaging defect, rebuild the affected output from the corrected source. A reported successful deployment is a control-plane result; inspect the public HTTP response and meaningful page content when diagnosing reachability.

Version 14 was checked at the exact root URL: HTTP 200, shared worksurface text present, platform runtime-error page absent. TypeScript and all 23 existing tests passed during the repair sequence. Those checks do not substitute for exhaustive browser interaction testing.

## 9. Troubleshooting

| Symptom | What to inspect or do |
|---|---|
| Create button disabled | Wait for browser hydration/storage initialization; JavaScript must be enabled |
| Evidence cannot be attached | Create a card first, choose it, and enter a nonblank note |
| Mall Record disabled | Select a SourceCard |
| Card absent from published Sources | Local cards and the deployed source index are separate stores |
| Receipts absent from work after older Mall use | The older Mall is a separate recorder; inspect its downloaded receipt |
| Page refreshed to work | Normal: tab selection is not part of the URL or saved state |
| Build tray disappeared after refresh | Normal: the tray is in-memory; copy the recipe before leaving |
| No saved data on another device/domain | Local storage is scoped to that browser origin and profile |
| Storage-full/unavailable message | Export the live work session before closing it |
| Two tabs disagree | Reload after a saved change; concurrent writes may replace each other |
| Coordinate receipt disappears | Download it before leaving that view |
| Research/index remains loading | Check the corresponding `/data/*.json` response and network request |
| Older calendar shows a past date | It is the retained July plan, not an automatically regenerated schedule |
| Public Site returns 500 | Inspect production Worker logs, then match the error to deployed version and archive |
| Missing `react/jsx-runtime` | Inspect SSR bundling and unresolved package imports |
| `createRequire` path/undefined error | Inspect the generated loader bridge; filesystem-based loading cannot be assumed |
| Local build passes but public page fails | Compare hosted runtime logs with local checks; successful compilation alone does not establish hosted execution |

For engineering diagnosis, retain the version number, commit, timestamp, exact route, HTTP status, and relevant production error. Keep credentials and private headers out of copied logs. The repeated attachment-image error text in the chat is not itself evidence that the deployed `/atlas/` assets are missing; check the actual asset response.

## 10. Terms and implementation boundaries

| Term | Meaning here |
|---|---|
| Carrier | A supplied source occurrence with its own identity and lineage |
| Actual | A byte-distinct object in a named compiled intake |
| Facet | A separately described view or functional aspect of an object |
| SourceCard | Browser-created title, original text, identity, and text digest |
| Evidence | A separate observation/reference linked to a SourceCard |
| Point | Current contextual address |
| Avenue / relation | A connection from the present point to another available point |
| Transform | The described operation associated with a relation; its description does not execute it |
| Traversal | A selected relation recorded as an event |
| Script | Recorded description associated with the traversal; in the work Mall, the current stage label |
| Receipt | A local event record; not a digital signature or remote execution attestation |
| Source face | A retained original Site linked from the common surface |
| Concurrent build | An assembly lane/contract represented in data, not proof of an active background agent |

Historical material sometimes uses **verified** for “identified, related, and placed in the corpus graph.” Read that sense separately from runtime-tested, independently corroborated, physically built, or scientifically validated. The published UI also retains evidence-status labels such as observed, documented, prototype, tested, partial, experimental, and target.

The interface exposes points and records selected transitions. User selection determines the traversal. Source sequence, colors, counts, and grid position do not establish a preferred avenue.

## 11. One-page operator reference

**Make a local working record:** work → SORT → create card → RESEARCH → attach observation → MALL → select card → record eight positions → RECEIPT → export.

**Inspect an existing system:** bench → search/filter → open card → read input/operation/output → Find source records.

**Carry an assembly forward:** bench → Add to build → build → inspect missing/shared dependencies → Copy build recipe.

**Record a published avenue:** coordinate space → select avenue → Instantiate selected transition → Download receipt.

**Inspect the source body:** source intake for carriers; Sep 4 fold for concepts/contracts; sources for derived records; architecture for nodes; atlas for visual projections.

**Keep your work:** export shared state before clearing browser data or moving devices. Copy the build recipe before refresh. Download separate coordinate/older-Mall receipts when using those views.

**Engineering diagnosis:** preserve the passed source/package → inspect the actual public response → inspect production logs → fix the demonstrated boundary → publish the matching saved version → verify the root response and worksurface content.

---

### Implementation references

This manual is tied to the v14 commit shown above. Its operational descriptions come from `SharedWorksurface.tsx`, `worksurface.mjs`, `SystemSorter.tsx`, `SiteStack.tsx`, `CoordinateSpace.tsx`, and `ResearchFold.tsx`; its build notes come from `package.json`, the lockfile, and the scripts named in Section 8. Corpus counts describe the retained README/data summaries at that commit.
