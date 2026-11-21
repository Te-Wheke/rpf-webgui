---
name: rpf-stage-dependency
description: Audit or implement RPF's forward and reverse justification chain, record-to-record dependencies, earliest-gap logic and stewardship gating. Use when modifying stage evaluation, graph rendering or state transitions.
---

# RPF stage dependency review

## Fixed ordered chain

`Reality → Observation → Experience → Understanding → Language → Knowledge → Wisdom → Stewardship`

Never move Language after Knowledge to match a casual summary. The repository's implemented order is in `src/rpf/types.ts`, `STAGE_ORDER`.

## Required typed links (proposed schema)

Each supportive edge must at minimum identify `dependsOn`, `propositionId`, `stage`, `justification`, plus source record ID, decision/rule version, and scope. This is a **target design**, not existing baseline fields.

A stage cannot be justified merely because a previous stage somewhere in the investigation has data. Demand **same-proposition and compatible-event** dependency links, with sufficient proof at each transition. Keep cross-proposition synthesis explicit and independently justified.

## Forward pass

1. Identify each root and child proposition.
2. Record what Reality designates; don't confuse naming a target with observation.
3. Require admissible records to support Observation.
4. Link Experience to the actual supporting observation and contextualise time, observer, environment and limitations.
5. Link Understanding to observation/experience while separating interpretation and inference.
6. Link Language to a faithful representation of that understanding.
7. Gate Knowledge on domain-valid evidence, explicit assumptions, contradiction handling and its predecessor.
8. Gate Wisdom on limits, alternative accounts, failure conditions and justified Knowledge.
9. Gate Stewardship on **justified Wisdom and all required predecessors**, accepted responsibility and bounded action/non-action terms.

If missing, mark the first gap and refuse downstream advancement. A contradiction can exist at an observed stage without proving the claim.

## Reverse pass

From a requested decision trace backward through every supporting ID. Return the **earliest unsupported dependency**, its blocked descendant stages, and the next proof needed. If there are multiple chains, identify gaps per proposition; do not hide secondary gaps behind a single overall status.

## Invariants to test

- Knowledge justified with Wisdom unresolved must **not** authorise Stewardship.
- Satisfying textual forms is not a proof of stage adequacy.
- Supporting observation for another claim must not satisfy an Experience edge.
- Cycle, dangling `dependsOn`, cross-proposition spoof, record mutation and disagreement must fail closed.
- No operator answer alone can promote a claim.
- Synthetic CSI lab trace never constitutes physical occupancy evidence.
- A mathematical Demonstrated state does not automatically authorise action.

## Code locations and reporting

Read `src/rpf/types.ts`, `engine.ts` (`evaluate`, `testStewardship`), `engine.test.ts`, `store.ts` and graph UI components. Distinguish a **rendered chain** from enforced record-level edges. Record each affected proposition, antecedent record ID, rule justification, state before/after and negative test result.

RPF does not run tools or execute stewardship; it produces a structured decision for separate authorised systems.
