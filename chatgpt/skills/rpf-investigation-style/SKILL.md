---
name: rpf-investigation-style
description: Conduct and document evidence-bounded inquiries using the RPF eight-stage chain, six recursive operators, domain standards and proposition-level uncertainty. Use for claim analysis, reports, independent reviews, reverse audits and investigation artefacts.
---

# RPF investigation style

## Frame the inquiry

Characterise the exact claim, domain, scope, timeframe and claimant; split compound statements into independently falsifiable propositions. Distinguish **observation**, **experience**, **understanding**, **language**, and their limitations.

Ask each operator where relevant: **WHAT, HOW, WHY, WHO, WHERE, WHEN**. Apply recursively, but do not manufacture an answer merely to complete the six fields. Use `src/rpf/domains.ts` as the repository's domain standard reference; the prioritised operators are not evidence shortcuts.

## Seven-step method

1. **Claim:** restate without strengthening; identify domain, boundary and proposition IDs.
2. **Dependencies:** list what each proposition depends upon; keep the 8-stage chain intact.
3. **Evidence:** inventory originals, timestamps, provenance, hash checks and admission status; identify self-asserted FACT labels.
4. **Forward pass:** progress only through justified transitions; report unresolved stages.
5. **Reverse pass:** begin with proposed conclusion/action; trace backwards to earliest gap and competing explanations.
6. **Determination:** distinguish `PROPOSED`, `REASONED`, `SUPPORTED`, `DEMONSTRATED`, `UNRESOLVED` with the domain and limits. Treat confidence separately from decision justification.
7. **Stewardship:** choose act / monitor / investigate further / preserve uncertainty / no action, but never assert permission or execute tools. Explain proof needed before any stronger choice.

## Mandatory investigation record

Document: claim, proposition IDs, domain and scope, six-operator answers/unknowns, source record IDs, provenance, admission and relevance, findings, assumptions, competing explanations, contradictions, unknowns, dependencies, forward trace, reverse trace, conclusion, next proof, and permitted or refused stewardship. Mark inferred statements clearly.

## Example boundaries

| Case | Supported limited statement | Unsupported leap |
| --- | --- | --- |
| CSI occupancy | Monitor mode was reported enabled | A person was detected behind a wall using CSI |
| Integer arithmetic | Bounded formal arithmetic can be demonstrated | That fact independently authorises real-world action |
| Tradition and prediction | A reading is internally supported by a tradition | A predicted event will occur |

Use these as baseline illustrations, **not verified evidence about present-day hardware**.

## Preferred review queries

- Which exact evidence ID establishes each proposition, and under which domain standard?
- Is the record original, authenticated and unchanged relative to a trusted reference?
- What observation does this experience directly depend on?
- Is a FACT classification only self-asserted?
- Could unrelated evidence pass the relevance gate?
- Can Wisdom be bypassed by filling stewardship text fields?
- What is the earliest unsupported dependency in reverse?
- Would the conclusion change if the strongest evidence were excluded?

## Output discipline

Give separately: Observations; Inferences; Counterevidence; Unknowns; Decision; Stewardship. Do not report model-generated reasoning or a visual render as measured reality. Clearly distinguish current code capabilities from proposed controls.

The eight-section source-analysis format from `rpf-integrity-review` applies when the requested deliverable is specifically a source integrity report.
