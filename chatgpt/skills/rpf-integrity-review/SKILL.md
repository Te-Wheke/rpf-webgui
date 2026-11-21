---
name: rpf-integrity-review
description: Audit the RPF WebGUI source and investigate six source-level evidence and dependency integrity gaps (RPF-001 through RPF-006). Use for source reviews, security reviews, evidence-led remediation planning, and comparisons of revised implementations with the baseline.
---

# RPF integrity review

## Boundary

RPF evaluates whether conclusions and stewardship are justified. It does **not** execute tools, orchestrate SCA or T-Lab, or turn reports, renderings, model statements or sensor capability reports into reality.

This skill guides a *developer/reviewer*. It is not a runtime RPF skill that can issue tool calls. Apply the repository's normal permission and review controls.

## Inputs and checks

1. Identify repository, branch, commit SHA, inspected file paths, and review date; distinguish the actual current state from historical findings.
2. Read `src/rpf/types.ts`, `domains.ts`, `engine.ts`, `store.ts`, `sha256.ts`, `seeds.ts`, and `engine.test.ts` in full as needed.
3. Characterise each claim; split independent propositions and associate each item of evidence with its intended proposition.
4. Trace the fixed chain **Reality → Observation → Experience → Understanding → Language → Knowledge → Wisdom → Stewardship** in both directions.
5. Check the six audit findings below **against the current implementation**, not only the earlier report.
6. Establish what is present, tested, falsifiable, missing, contradictory or externally unverified.
7. Return a bounded remediation and verification plan, without claiming certification.

## Core findings to inspect

- **RPF-001 — append-only history:** Same-ID evidence replacement in `applyEvidence()`; mutable client-side `localStorage`. Verify immutable IDs, explicit correction events, and tamper-evident persisted event history.
- **RPF-002 — claimed classification:** `FACT`, standard and provenance arrive as assertions. Verify independent admission steps and authentic source binding.
- **RPF-003 — relevance:** `bearsOn()` historically defaults to `true`. Verify proposition-specific, fail-closed relevance decisions.
- **RPF-004 — record dependencies:** Experience and interpretation need concrete links to supporting observations, not just a timestamp and filled fields.
- **RPF-005 — stewardship gate:** `testStewardship()` historically checks Knowledge but not a separately justified Wisdom stage. Verify whole-chain prerequisites.
- **RPF-006 — hash limits:** SHA-256 detects content changes relative to a trusted digest, but cannot authenticate acquisition. Inspect trusted digest anchoring, source identity, signature verification and provenance.

Refer to [integrity-acceptance.md](references/integrity-acceptance.md).

## Required assessment format

Use eight sections: (1) Executive assessment; (2) Source and method boundaries; (3) Case-level interpretation; (4) Findings by identifier and severity; (5) RPF/SCA/T-Lab boundaries; (6) Work package; (7) Verification criteria; (8) Disposition.

For each finding record: claim, supporting file/line or test, assumption, counterexample, present result, remaining unknown, confidence, next proof. Avoid assigning confidence from a single passing test.

Use states **IMPLEMENTED / TESTED / VERIFIED / OPEN / NOT INSPECTED** with explicit definitions. Do not promote PROPOSED → VERIFIED solely on operator notes, self-labelled evidence, or interface presentation.

## Cases for sanity checking

- CSI occupancy: monitor mode is not CSI measurement and cannot support movement/person/behind-wall conclusions; synthetic CSI is refused as real-world evidence.
- Integer arithmetic: formal proof can establish a bounded arithmetic proposition, not automatically stewardship.
- Tradition and prediction: support for an interpretation does not validate predictive accuracy.

## Completion gate

A review is complete only when every finding is mapped to actual source, negative tests exist or are specified, export provenance is considered, and all open uncertainty is visible. Do not silently change SCA execution policy or T-Lab provenance.
