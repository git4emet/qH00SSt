# Möbii³us Graph + Drilling Dashboard Box Inventory — draft v0.1

## Source policy

- Originals were not edited.
- Large sources were not recopied.
- This packet records pointers, hashes, classifications, relations, and evidence boundaries.
- Private or credential-shaped values were not reproduced.

## Facet A — Drilling Coordinator interface specification

**Source:** `Gmail - ### _ Möbii³us Drilling Coordinator _ Assistant Dashboard – _Six Minutes Well Spent_.pdf`  
**SHA-256:** `0c436075bbe8086c87acbe71b31f98b37662a92070652ef27bb2b8fc3ae80d43`

Observed interface components:

- `ScheduleBoard`
- `SampleTracker`
- `GSOCLogger`
- `LabelMailer`
- `MiniChat`

Observed route wishlist:

```text
POST /coord/label/import-addresses
GET  /coord/label/preview/<templateId>
POST /coord/label/print
POST /coord/scan/handwritten -> /sample
POST /coord/gsoc/draft
GET  /coord/chat/threads
POST /coord/chat/send
GET  /coord/schedule/jobs
POST /coord/schedule/update
```

Evidence boundary:

```text
documented concept
≠ complete JSX application
≠ connected OCR/GSOC service
≠ tested workflow
≠ measured time or error reduction
```

The PDF is useful as an **interface and workflow specification**. It contains a partial JSX fragment, an ASCII layout, feature descriptions, backend route ideas, and next moves. The stale citation placeholder and performance claims remain review items.

## Facet B — Project graph registry

**Source:** `mobiius_project_graphs_v1_1.zip`  
**SHA-256:** `5278229da6cf2ab26d959858becdcee433bd958474528103be0a3ef6604c8f15`  
**Physical files:** 31

Graph views:

| Graph | Nodes | Edges |
|---|---:|---:|
| `00_full_project_graph` | 791 | 1540 |
| `01_source_lineage` | 572 | 590 |
| `02_system_architecture` | 131 | 318 |
| `03_domain_skill_projection` | 83 | 259 |
| `04_evidence_maturity` | 108 | 137 |
| `05_closed_proof` | 12 | 12 |
| `06_concurrent_builds` | 19 | 20 |
| `07_stage_a_duality` | 170 | 312 |

Additional counts:

- Top-level source files indexed: **46**
- Exact duplicate groups: **1**
- Package members indexed: **1910**
- Stage A pair records: **156**
- Validation checks passed: **23**
- Validation checks failed: **0**
- Quarantine/review records: **8**

## Facet C — Summary and receipt identity

The separately supplied files are exact content copies of the versions inside the ZIP:

```text
graph_summary.json
= mobiius_project_graphs_v1_1.zip!/reports/graph_summary.json

graph_build_receipt.json
= mobiius_project_graphs_v1_1.zip!/receipts/graph_build_receipt.json
```

Receipt ID:

```text
graph-build-v1.1-684fc5c10fd9
```

The receipt records:

- raw sources were not mutated;
- uncertainty was preserved;
- private values were not reproduced.

## Cross-facet placement

```text
Drilling Coordinator PDF
→ AET / FieldStream interface specification

Project graph package
→ lineage + architecture + domain/skill + evidence + proof registry

Graph summary
→ compact physical count surface

Build receipt
→ provenance and validation witness
```

## Next stable edge

Use one actual AET source-backed artifact—preferably a sample form or address file—and prove:

```text
source
→ interface control
→ Guardian decision
→ bounded local action
→ receipt
→ AET domain projection
→ correction / revoke / export
```
