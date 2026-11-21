# RPF integrity acceptance matrix (normative proposed controls)

These are **development acceptance criteria**, not claims that current code meets them.

| ID | Required proof | Example negative test |
| --- | --- | --- |
| RPF-001 | Immutable records, correction events, verifiable chain and persistence | Replace an existing evidence ID; earlier event must remain retrievable |
| RPF-002 | Submitter's claim distinguished from admission decision and authenticated origin | User supplies FACT + invented provenance; claim must not advance |
| RPF-003 | Explicit evidence-proposition relevance with recorded reason | Valid measurement for wrong proposition; evidence excluded |
| RPF-004 | Each stage record references justified predecessor record IDs | Experience unrelated to an observed event; chain remains open |
| RPF-005 | Stewardship requires every mandatory stage including Wisdom | Knowledge justified, Wisdom unresolved, all form fields filled; reject |
| RPF-006 | Hashes verified against independent trusted commitment; provenance not implied by digest | Tamper digest or offer self-generated digest as authenticity; reject |

## Evidence admission design proposal

Separate **admission status** (`ASSERTED`, `ADMITTED`, `REJECTED`, `CORRECTED`) from:
- **assertion kind** (`FACT`, `INFERENCE`, `ASSUMPTION`, `PROPOSAL`, `UNKNOWN`);
- **claim state** (`PROPOSED`, `REASONED`, `SUPPORTED`, `DEMONSTRATED`, `UNRESOLVED`);
- **stage status** (`defined`, `justified`, `unresolved`).

These are proposed schema improvements, not fields verified in the baseline `types.ts`.

## Export verifier requirements

A machine-readable investigation artefact should include schema version, rule version, commit/build provenance, proposition/evidence IDs, stage edges and reasons, conflicts, admission status, refused items, corrections, original asset hashes, export checksum, and clear verification outcome. Do not describe an unverified export as portable attestation.

## RPF invariant

**No transition should occur unless justified by the dependencies beneath it.** A skill's instructions cannot substitute for deterministic code-level enforcement and negative tests.
