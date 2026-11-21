---
name: rpf-ui-audit
description: Review the RPF WebGUI's investigation, evidence, graph and phase-light interface for truthful state representation, traceability, accessibility and operator usability. Use for UI redesigns, design tokens and verification of status views.
---

# RPF UI audit — adapted from Grok design-ui

**Provenance:** Selective, task-specific adaptation of `.grok/skills/design-ui/SKILL.md`. Its transferable guidance on tokens, hierarchy, contrast, mobile layouts, motion and states is retained in concept; Grok preview assumptions and platform-specific mandates are intentionally not imported.

## Non-negotiable representation rule

A phase light is an **indicator of the open claim's recorded phase**, not a CSI, human-presence, or truth sensor. A diagram, report, animation and model representation must never claim a stronger status than the underlying records justify.

## Read before changing

Inspect `src/components/rpf/app.tsx`, `home.tsx`, `inspectors.tsx`, `status-view.tsx`, `orb.tsx`, `ui.tsx`, `src/styles.css`, `src/rpf/types.ts`, and `src/rpf/engine.ts` as appropriate.

## Interface requirements

1. Show the exact **claim state**, stage statuses, proposition-specific records, and reasons; explain the earliest unsupported dependency.
2. Provide an evidence view with immutable ID, statement, source, relevant proposition, kind, standard, admission status if implemented, and audit history. Never imply historical immutability if storage remains mutable.
3. Separate the three seeded cases and render unresolved prediction independently from supported interpretation.
4. Make refusal visible when synthetic CSI is offered. Label simulated or illustrative traces; do not depict them as actual measurements.
5. Keep deterministic audit trail and investigation exports discoverable. If no independent verification is implemented, label export **generated**, not **certified**.
6. Ensure accessible state text independent of color/animation; screen-reader labels, keyboard access, focus indicators, error and empty states, and reduced-motion behavior.
7. Use shared CSS/Tailwind design tokens; clear hierarchy, readable density, consistent spacing, responsive layout, foreground/background contrast, and meaningful interaction feedback.
8. Prefer verifiable status labels over visually impressive pseudo-telemetry. A progress indicator must reflect actual known steps, not arbitrary completion.

## Review queries

- Can a screenshot make a PROPOSED CSI claim look DEMONSTRATED?
- Does a displayed SHA-256 icon imply evidence authenticity?
- Can a user mistake the phase light for a sensor?
- Is a missing or rejected source unambiguously communicated?
- Can keyboard and mobile users inspect the earliest gap without hover?
- Does the UI show the exact same data as the exported artefact?

## Verification

Inspect relevant source and manually test or document why browser interaction is unavailable. Use 3 baseline cases and negative evidence submissions. Report implemented state, attempted verification, observed result, missing proof. Do not claim successful browser QA from static inspection.
