---
name: rpf-regression-review
description: Run an explicit RPF engine baseline and design negative regression tests for evidence admission, provenance, immutable history, stage gating, CSI refusal and exports. Use when fixing or reviewing changes to src/rpf/.
---

# RPF regression review

## Baseline repository inspection

`src/rpf/engine.test.ts` covers SHA-256, CSI decomposition, proposal/monitor rejection, stewardship refusal, contradictions, arithmetic, operator notes, tradition and synthetic CSI. Its existence does not mean every edge case is tested.

Read current `package.json`. At reviewed commit `2a668c0ef35c3d5d85bd65269bb6dfc571833976`, the project-level `npm test` script does not include `src/rpf/engine.test.ts`. Do **not** say all RPF tests ran merely because `npm test` passed.

## Execution in an authorised development environment

- `node --experimental-strip-types --test src/rpf/engine.test.ts` — RPF engine baseline (Node 22).
- `npm run typecheck` — TypeScript static check.
- `npm run lint` — lint.
- `npm test` — broader project suite, **not a substitute** for direct RPF test execution at this baseline.
- If the environment is unavailable, mark tests **NOT RUN** with reasons; never fabricate pass counts.

Review package/scripts rather than assuming command availability on later commits. Running these commands belongs to the developer environment, **not the RPF runtime**, which does not execute tools.

## Add or review negative tests

1. Evidence submission with `kind: FACT` and fabricated provenance cannot promote a claim.
2. Unrelated `measurement` attached to a proposition cannot count as relevant.
3. Duplicate/same-ID evidence submissions cannot overwrite original historical entries.
4. Malformed/unknown `propositionId` is excluded and leaves an auditable refusal.
5. Cross-proposition Experience/Understanding cannot justify the wrong chain.
6. Knowledge justified while Wisdom is not: Stewardship remains blocked even if all textual form fields exist.
7. Altered bytes and non-anchored digests do not validate authenticity.
8. Synthetic CSI geometry, monitor mode and unrelated network telemetry cannot establish CSI occupancy.
9. An astrological tradition reading may be supported, but prediction stays unresolved without independent empirical evidence.
10. Export contains provenance/decision trace and is explicitly unverified if attestation is absent.

## Test log

Record command, working tree/commit, timestamp, exit status, counts, failures, relevant fixtures and skipped coverage. Treat code, test report and operational evidence as distinct records. A passing fixture justifies only the behaviour the fixture tests.

## Result

Provide a matrix of finding IDs RPF-001 through RPF-006 with **source fixed? / negative test added? / test run? / remaining proof?**. Keep regressions blocking and report uncertainty before declaring readiness.
