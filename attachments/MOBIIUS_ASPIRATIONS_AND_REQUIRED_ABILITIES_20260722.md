# Möbii³us aspirations and required abilities

Status: source-backed analysis plus tested implementation slice  
Date: 2026-07-22  
Scope: supplied 100-asset manifest, top-16 contact sheet, Dollhouse and Orbitron sources, Skill Creation Workflow, CQDNS pack, and `map-uzfl-workflows`

## Outcome

The project is aspiring to be a shared-agency operating system in which any person, sensor, artifact, model, or tool can contribute one bounded event at a time without losing identity, source, consent, evidence state, or a path back.

Its distinctive contribution is not one exotic mathematical claim. It is the composition of:

```text
friendly possibility space
+ deterministic point/state addressing
+ many interleaved streams
+ explicit human selection
+ evidence-aware Guardian routing
+ receipts and repair
= accountable shared agency
```

The 100-asset manifest supports this reading: 98 still/vector graphics and two motion sources resolve to 64 distinct groups and 36 duplicates. The repetition is largely projection reuse, not 100 independent subsystems.

## The aspirations

| Aspiration | Practical meaning | Success evidence |
| --- | --- | --- |
| Everyone gets a door | A large-button, voice-capable, low-assumption entry surface that does not require the creator's whole vocabulary. | A new visitor completes one useful loop without coaching. |
| One identity, many duties | The same source or person can appear in different rooms, roles, colors, scenes, or renderings without duplication. | Every projection resolves to one stable source ID. |
| Massive concurrency, atomic accountability | Many streams may run concurrently, but every accepted change is one addressed transition. | Each event has point, time, route, state, evidence, and return fields. |
| Shared agency, not an autonomous oracle | The digitizer/system proposes and renders; the human selects, corrects, signs, or refuses. | No unsigned interpretation becomes executable. |
| Functions grouped by use | Occurrence and utilization heat maps reveal which functions operate together, independent of historical naming baggage. | Measured event counts can reorganize views without rewriting source identity. |
| Play and rigor coexist | Dollhouse, PartyChain, character, Academy, and shirt/save-state interfaces remain fun while receipts remain exact. | A playful action produces an inspectable receipt. |
| Repair without blame | Wrong or incomplete work becomes a repair route rather than a person-level failure. | Contradictions and failed tests remain visible and actionable. |
| Scientific and mathematical interoperability | External bases, transforms, event maps, and laboratory loops can be used as bounded adapters. | Every adapter names its source, assumptions, units, and tested scope. |

## The two invariant bodies and five useful systems

Only two bodies should hold authority:

1. **Dollhouse / state-space** - what an addressed point may do.
2. **Orbitron / event-trace** - what an addressed point did.

Three views derive from them:

3. Visual organ or replaceable skin.
4. Utilization/occurrence heat map.
5. Receipt/return view.

This gives the practical "five systems out of two" without creating five competing truths. The Mall preserves identity across roles; Orbitron preserves lineage across moments.

## The sixteen visual organs

| Layer | Organs | Required ability |
| --- | --- | --- |
| Orientation | Dollhouse Mall, Orbitron, HUD Weights, Lattice | Enter, address, measure, and feed back. |
| Operation | Shared Agency, System Lifecycle, Inverse Recursion, Spiral Gear | Coordinate runtime, lifecycle, relations, and hardware. |
| Presentation | Party Vacuum, PartyChain, Style Guide, Studio Room | Sort, interact, tokenize, and stage scenes. |
| Human growth | Academy, Poof, Triadic Fusion, Orbitron 8 | Learn, embody character, animate, and interact. |

These are organs or projections over shared records. They are not sixteen independent runtimes and do not independently establish scientific claims.

## The signed 24-state grammar

The supplied rule is deterministic and internally consistent:

- 24 unique non-empty 8-bit masks: eight single directions, eight adjacent pairs, and eight adjacent triples.
- Six color families with four tone slots each.
- 24 evenly spaced byte representatives from 0 through 255.
- Sixteen components times 24 states equals 384 recipes.

For zero-based component `c` and state `s`:

```text
direction = masks[s]
colorSlot = (5s + c) mod 24
level     = (7s + 11c) mod 24
byte      = round(255 * level / 23)
```

Because 5 and 7 are coprime with 24, each component visits every color slot and level exactly once. This is a compact permutation schedule, not a 24-cubed search space.

## A-G memory and baseband contract

What is signed by the current request:

- A-G are seven ordered memory slots.
- The register can be tensored with the rest of the system.
- A shift bank decomposes or routes an event into inspectable feature bands.

What remains deliberately unsigned:

- which semantic duty belongs to each letter;
- which direction is the default shift;
- the exact DSP windows, filters, sample rates, units, and transforms;
- the claimed 42-facet, three-system, six-way overage formula;
- the specific Lie/Fano/Fourier basis and quadratic operator.

The implemented contract therefore requires exactly seven values and an explicit `A_TO_G` or `G_TO_A` direction. A practical event projection can expose seven baseband fields without claiming literal signal processing:

```text
source | component | state | direction | color | level/byte | evidence/return
```

Actual DSP requires a separate measurement contract.

## Two decisions per choice

Every choice must emit two independent decisions:

| Decision | Question |
| --- | --- |
| Action decision | Allow, ask, block, or route what operation? |
| Evidence decision | Keep candidate, correct/sign, defer/block, or promote as tested? |

Selection must never imply truth or evidence promotion. This is the clean mechanism that lets the system branch playfully and remain honest.

## Required abilities

### Source and memory

1. Preserve immutable originals and hashes.
2. Extract user requests, artifacts, aliases, and contradictions without speaker-role collapse.
3. Resolve every projection to one stable source identity.
4. Maintain A-G working memory separately from archival memory.
5. Deduplicate exact copies while preserving distinct context and lineage.
6. Resolve aliases progressively, preserving exact punctuation/case when it carries identity (`Galel`, `DJ.CHAR(k&n8wonhm)`).
7. Treat repeated pastes as one content event with multiple context receipts unless the surrounding role changes.

### Deterministic state core

8. Address one point/event at a time.
9. Generate and validate the 24 direction masks.
10. Generate the 384 visual-state recipes.
11. Shift A-G in an explicit direction and return the displaced state.
12. Schedule interleaved streams deterministically.
13. Accumulate utilization and occurrence heat maps from measured events.
14. Maintain separate action and evidence decisions.

### Relation and transform adapters

15. Build typed requirement and artifact hypergraphs.
16. Compute the unsigned normalized hypergraph Laplacian within its stated contract.
17. Apply named projection matrices, quadratic transforms, Fourier transforms, fuzzy membership, Lie/Fano operations, or E8/H4 folds only through typed adapters.
18. Preserve units, basis, dimensionality, assumptions, and invertibility/return metadata.
19. Record view identity: plan, elevation, transverse section, shadow/projection, time trace, or rendered skin.
20. Compare or align projections without asserting physical equivalence from visual similarity.

### Guardian, provenance, and repair

21. Keep source, candidate, corrected, signed, and tested states distinct.
22. Gate privacy, identity, scientific claims, publication, payment, hardware, and other side effects.
23. Emit deterministic receipts with source, route, transform, action decision, evidence decision, and return path.
24. Support correction, revocation, export, and replay.
25. Turn failures and contradictions into named repair tickets.
26. Namespace filesystem, Drive, archive, EXIF, export, and observation dates; flag anomalies without using them as chronology proof.

### Human worksurface

27. Render the same state through Dollhouse, Orbitron, heat-map, and receipt views.
28. Support large buttons, keyboard, dictation, local cache, and JSON shuttle.
29. Preserve a visible resume word/anchor for eyes-closed explanation mode and delay non-urgent interruptions.
30. Keep public skins sanitized while private overwatch retains richer evidence.
31. Offer character, scene, Academy, PartyChain, and portable save-state outputs without duplicating identity.
32. Make Guardian state visible in plain words as well as color.

### Runtime, connectors, and reclaimed-device mesh

33. Expose one manager with bounded specialist tools by default.
34. Use handoffs only when a specialist must own the next turn.
35. Connect account archives, web services, local sensors, exact ESP32/Puya nodes, phones, screens, wire, optics, and passive RF through explicit adapter contracts.
36. Preserve the Intel host/control-plane -> bus/library scheduler -> GPU mesh -> selected backend order.
37. Distinguish Intel media/compute, NVIDIA CUDA/media, translated, emulated, simulated, and planned execution lanes.
38. Receipt every scheduled job with host, lane/device, API, buffer format, memory owner, transfer, synchronization, output hash, and named test.
39. Continue locally when a connector is unavailable and reconcile later with receipts.
40. Keep model inference outside the deterministic addressing, validation, scheduling, and receipt core.

## What the existing bookmarks reveal

The six existing bookmark-shaped artifacts are sufficient for a clean baseline. The latest Firefox export contains 62,746 bookmark instances but only 27,205 unique exact URLs: 35,541 instances belong to repeated URL groups. Raw volume therefore measures recursive capture as much as interest.

After exact deduplication, the explicit folder grammar still resolves into a stable working topology:

| Bookmark organ | Inferred working duty |
| --- | --- |
| AI crew consoles | Compare models and develop multi-model workflows. |
| Archive/cloud/email source | Preserve and shuttle source material across constrained devices. |
| SOAP/protocol/API connectors | Bridge platforms rather than replace them. |
| UI/vision dashboards | Render complicated state into inspectable human surfaces. |
| Research/consensus/proofs | Retrieve primary sources and compare evidence. |
| DevOps/code/localhost | Implement, package, test, and deploy. |
| Hardware/IoT/mobile/edge | Recover devices and join physical systems to the workflow. |
| Routing/automation | Orchestrate work, approvals, and return paths. |
| Ethics/symbol spine | Preserve normative and meaning-making constraints. |
| Voice/audio and physics/signal | Work with DSP, measurement, audio, and signal interfaces. |
| Learning/career/community | Teach, recruit, explain, and build communities around the work. |
| Art/story/media | Give system duties memorable characters, scenes, and skins. |

The strongest inference is not that the user “reads widely.” It is that the user builds cross-domain integration systems by collecting executable examples, research witnesses, interfaces, and human contexts into one repairable navigation field.

Bookmarks remain behavioral evidence. They do not prove authorship, endorsement, credentials, implementation, or successful use. Login/account/session pages and recursive archive copies must be downweighted; representative artifacts must be inspected before a capability is promoted.

The inspected export's bookmark-added dates span June 2025 through July 15, 2026. The separately reported 1979 and future file dates are not present in this timestamp namespace and must be sought in filesystem, archive, Drive, EXIF, or application metadata rather than treated as bookmark chronology.

## Intel-hosted heterogeneous runtime contract

The signed orchestration interpretation is:

```text
Intel host/control plane
-> bus and library scheduler
-> GPU mesh abstraction
-> selected execution backend
-> buffer/result receipt
```

“CUDA works for Intel and Intel runs on CUDA” is preserved as a bidirectional service relationship: Intel-hosted control can schedule CUDA work, and a CUDA backend can accelerate an Intel-hosted duty. It is not promoted into the unrelated hardware claim that an Intel GPU natively executes NVIDIA CUDA machine code.

The recovered CUDA family names an eight-file source scaffold (`phase_shift_firmware.cuh`, five `.cu` units, Makefile/README, and a Python ingestion helper). Its source conversation reports host/header/Python checks but no CUDA toolkit in that environment. It is therefore source-inspected implementation scaffolding, not a demonstrated GPU build.

The reclaimed Puya/phone/vape/passive-RF mesh is presently simulated or planned. The user's approximately twenty-unit bench population and reported dual-Puya prevalence are high-value sample evidence, not a universal disposable-vape bill of materials. Each unit needs an ID, package markings, board relationship, traced interfaces, measurements, power boundary, and named tests before firmware or actuation.

## Visual recovery and projection families

The recovery bank now includes `Galel` (a labeled South-American-totem-like heptadic schematic), quantum butterfly, conversation sausage grinder, literal Party Vacuum, floor-scrubber Party Vacuum, Fizzy Kitty, Draco/Drago, and `DJ.CHAR(k&n8wonhm)`. These names are recognition keys, not proof that a generic file is the intended image.

Recovery order:

```text
exact byte hash
-> perceptual image match
-> OCR/title match
-> dimensions and MIME
-> source-path/context lineage
-> namespaced timestamps
-> human recognition receipt
```

The vacuum and floor-scrubber faces must retain a `view_kind` field. A 2D transverse shadow of a 3D schematic is neither an independent machine nor an exact duplicate of its plan/elevation view.

## Concurrent build lanes

These lanes can proceed at the same time because they share one event schema and do not edit the same authority:

| Lane | Owns | First proof |
| --- | --- | --- |
| State kernel | A-G, masks, recipes, decision pairs, scheduling | Generate and validate one 384-recipe bank. |
| Source/Guardian | identity, signatures, evidence, receipts, repair | Promote one source-backed artifact and revoke it cleanly. |
| Human worksurface | Mall, Orbitron, heat map, receipt views | One visitor completes Welcome -> Build -> Repair -> Return. |
| Signal/hardware | encoder, DSP, ESP32, screen/wire/optic adapters | One real pulse becomes one addressed, receipted event. |
| Party/learning | character, scene, Academy, PartyChain, shirt/save-state | One identity changes duties and returns without duplication. |

Shared contract:

```text
source_id
event_id
component_id
state_id
direction_mask
color_slot
level
byte
memory_slot
action_decision
evidence_decision
guardian_state
transform_ref
receipt_id
return_ref
```

## What is implemented now

The installed `map-uzfl-workflows` ability now contains:

- the A-G register and explicit bidirectional shift;
- the exact 24-mask registry;
- six four-tone color families and exact byte levels;
- the sixteen visual organs;
- the 384-recipe generator and coverage validator;
- independent action/evidence decision pairs;
- requirements `UZFL-R15` through `UZFL-R40`, including visual recovery, maker sorting, Puya sampling, heterogeneous runtime lanes, bookmark inference, and physical-state gates;
- mathematical/scientific boundary rules;
- offline tests.

Verification scope:

- personal skill structure: valid;
- seven-stream registry: valid, all 40 requirement owners present;
- TypeScript typecheck: pass;
- offline tests: 16 passing;
- smoke compilation: pass, awaiting signature as expected.

## Stable next proof

Use one actual artifact and one actual visitor:

```text
source-backed artifact
-> choose Dollhouse room and visual organ
-> select one of 24 states
-> write one A-G memory slot
-> emit action + evidence decisions
-> render Mall and Orbitron views
-> Guardian evaluates
-> receipt appears
-> visitor corrects, revokes, or returns
```

That closed loop demonstrates the aspiration without requiring the unassigned Lie/Fano/Fourier or 42-facet formulas to be guessed.

## Evidence boundary

- The asset counts and group counts come from the supplied manifest.
- The 24-state arithmetic is verified by deterministic tests.
- The A-G shift and recipe bank are implemented software behavior.
- The relationship among Dollhouse, Orbitron, heat maps, and receipts is an engineering interpretation supported by the supplied visuals and prior project text.
- No claim is made that collider events, cloud chambers, E8/H4, Lie algebra, Fano planes, or Fourier space are physically identical. They remain independent adapter candidates until a precise, testable mapping is supplied.
