# Skill source inventory and extraction disposition

Read-only inspection of `Te-Wheke/rpf-webgui` at commit `2a668c0ef35c3d5d85bd65269bb6dfc571833976`.

## Existing source skills (18)

| Grok skill | Portable? | Disposition for ChatGPT |
| --- | --- | --- |
| auth | Partly | Do not port prewired Grok gate identity assumptions; consult only when a matching auth design is requested |
| building-games | Partly | Out of scope for the RPF desk; no copy |
| controls | Partly | Game/vehicle input only; no copy |
| design-ui | Yes, selectively | Adapted into `rpf-ui-audit` for RPF interfaces |
| game-animation-frames | Tool-dependent | Not copied |
| game-asset-core | Tool-dependent | Not copied |
| game-character-consistency | Tool-dependent | Not copied |
| game-tilesets | Tool-dependent | Not copied |
| game-ui-icons | Tool-dependent | Not copied |
| generate2dmap | Tool-dependent | Not copied; additional scripts/assets/permissions would require review |
| generate2dsprite | Tool-dependent | Not copied; additional scripts/assets/permissions would require review |
| imagine-grok-build | Grok-specific | Not copied; unavailable tool assumptions |
| multiplayer-p2p | Partly | Out of scope; review security before any reuse |
| neon | Grok-platform-specific | Not copied; database/auth coupling |
| og | Grok-platform-specific | Not copied; branding injector and `grok.me` requirements |
| threejs | Partly | Out of scope; no copy |
| video2dsprite | Tool-dependent | Not copied; scripts and tool assumptions |
| xai-api | xAI-specific | Not copied; never assume access to `XAI_API_KEY` or chargeable endpoints |

These are inventory decisions, **not an evaluation of correctness or licensing** for each source skill. Their original files remain unchanged under `.grok/skills/`. Nothing executes from this inventory.

## RPF implementation source map

- `src/rpf/types.ts`: 8 stages, 6 operators, 13 domains, assertion and claim states, investigation model.
- `src/rpf/domains.ts`: domain labels and prioritized operators.
- `src/rpf/engine.ts`: decomposition, evidence admission, evaluation, forward/reverse decisions, stewardship and export.
- `src/rpf/store.ts`: Zustand state and `localStorage` persistence.
- `src/rpf/sha256.ts`: SHA-256/hash helpers.
- `src/rpf/engine.test.ts`: engine regression scenarios.
- `src/rpf/seeds.ts`: CSI, arithmetic, tradition/prediction sample investigations.
- `src/components/rpf/`: desk view, inspectors, status and indicator components.
- `AGENTS.md`: Grok-specific app-builder contract; do not port as a general-purpose ChatGPT instruction.

## Baseline caveats

The following are directly inspected, still present in baseline code and **not fixed by this skill pack**:

1. `applyEvidence()` uses `filter(e => e.id !== row.id)` before re-adding a row, allowing same-ID replacement.
2. `store.ts` uses browser `localStorage`, which is not tamper-evident or immutable.
3. Evidence kind, standard and provenance are declarative inputs, not authenticated proof of origin.
4. `bearsOn()` defaults to `true` except narrow domain-specific exclusions.
5. Cross-stage record-level `dependsOn` edges are absent from the `types.ts` schema.
6. `testStewardship()` tests Knowledge but does not explicitly gate on justified Wisdom.
7. Evidence SHA-256 does not on its own authenticate collection or origin.
8. The `npm test` script does not invoke `src/rpf/engine.test.ts`.

The 4 Grok-reported RPF skills have **not** been recovered from the GitHub main tree as of this review. This pack is a transparent reconstruction and adaptation instead.
