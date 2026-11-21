---
name: rpf-evidence-admission
description: Design or inspect RPF evidence admission, record integrity, provenance, relevance, synthetic-trace handling and immutable correction history. Use for ingestion changes, evidence forms, exports, hash handling, and authenticity verification.
---

# RPF evidence admission

## Distinctions

**Reality ≠ record ≠ representation ≠ inference.** A sensor report, a UI indicator, a language model response, a hash, and a purported FACT are not mutually interchangeable.

Keep four categories separate:

- **Submission claim:** submitter's unverified statement and declared assertion kind.
- **Admission decision:** `ASSERTED` / `ADMITTED` / `REJECTED` / `CORRECTED` (**proposed future schema**).
- **Claim state:** `PROPOSED` / `REASONED` / `SUPPORTED` / `DEMONSTRATED` / `UNRESOLVED` (existing engine).
- **Dependency-stage status:** `defined` / `justified` / `unresolved` (existing engine).

Do not label the new admission statuses as already implemented.

## Admission flow (fail closed)

1. Capture original material, source, collection method, time/context, author, and the exact claimed observation. No sensitive data beyond authorised scope.
2. Calculate a digest over **actual canonical bytes**, record algorithm, and verify it against a separately trusted digest/anchor where available. No conclusion of authenticity from a digest alone.
3. Validate source identity and provenance under an explicit domain-appropriate standard. Mark unverified rather than inferring authenticity.
4. Bind the evidence to an existing `propositionId`; reject unknown IDs and preserve submission as a non-admitted event if audit retention is required.
5. Explain **how** the evidence bears on that particular proposition. No permissive default relevance, and no relevance inference from shared keywords alone.
6. Evaluate independence, limitations, counter-evidence, method validity, and domain standards. Distinguish observed facts from interpretation.
7. Record a deterministic admission decision (admitter, rule version, reasons, evidence IDs); maintain immutable history and append explicit correction events instead of replacing originals.
8. Only admitted, relevant evidence may be used in state promotion. Contradictions remain visible and can block promotion.

## Special handling

- CSI: monitor mode, synthetic geometry, amplitude demonstration, or terminal visualization does not prove valid CSI acquisition or any person's occupancy/location. Require provenance-linked real captures, decoding validation and controls for each independent proposition.
- Mathematical proof: a formal derivation can establish a mathematical proposition without instrumented observation; it cannot certify a separate physical claim.
- Traditional interpretation and predictive claims: contextual/traditional authority can support interpretation within its domain, not empirical prediction.
- Operator notes are questions/answers, not automatically independent evidence.

## Implementation review

Inspect `src/rpf/engine.ts` (`applyEvidence`, `bearsOn`, `recordedObservation`), `types.ts`, `sha256.ts`, `store.ts`, and `engine.test.ts`. The baseline recomputes IDs from text/provenance and replaces matching rows; replace that behavior with stable append-only event IDs and correction links.

## Mandatory adversarial cases

Forged `FACT`; irrelevant but valid observation; missing source; tampered bytes; self-authenticated hash; duplicate ID; contradictory measurement; synthetic sample accidentally admitted; cross-proposition evidence; unverified third-party lab output. For each: expected rejection or bounded status, observable log event, and no unjustified claim promotion.

Do not run tools from RPF. External verification, if authorised, is performed by separate controller/developer tooling; RPF consumes documented results only.
