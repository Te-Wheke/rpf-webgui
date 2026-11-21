# ChatGPT skills for the RPF investigation desk

These are **repository-authored Agent Skills** for reviewing and developing the Reality Propagation Framework (RPF) WebGUI with a ChatGPT/Codex-style coding assistant. They are not an installation into the ChatGPT app or an assertion that ChatGPT will auto-discover arbitrary repository paths.

## Scope and provenance

Baseline reviewed: `Te-Wheke/rpf-webgui`, main commit `2a668c0ef35c3d5d85bd65269bb6dfc571833976` (2026-11-22 review).

- The repository contains **18** `.grok/skills/*/SKILL.md` entries. See [source-inventory.md](source-inventory.md).
- **None** of Grok's four previously reported `rpf-*` skills was present under `.grok/skills/` on the inspected main branch.
- `rpf-integrity-review`, `rpf-evidence-admission`, `rpf-stage-dependency` and `rpf-investigation-style` below are therefore **new reconstructions**, grounded in this repository's code, the user's RPF specification, and the six findings discussed in the prior RPF source review; they are **not** a verbatim extraction of missing files.
- `rpf-ui-audit` is a **selective adaptation** of the repository's existing `.grok/skills/design-ui/SKILL.md`, focused on RPF truthfulness and accessibility.
- `rpf-regression-review` is a **new repository-specific verification skill**.

## Skills

| Skill | Use when |
| --- | --- |
| [rpf-integrity-review](rpf-integrity-review/SKILL.md) | Auditing RPF source, claims, evidence integrity and remediation |
| [rpf-evidence-admission](rpf-evidence-admission/SKILL.md) | Designing or reviewing evidence ingestion, integrity, provenance or mutation |
| [rpf-stage-dependency](rpf-stage-dependency/SKILL.md) | Changing forward/reverse evaluation, graph edges or stewardship gates |
| [rpf-investigation-style](rpf-investigation-style/SKILL.md) | Producing a structured RPF inquiry, report or export review |
| [rpf-ui-audit](rpf-ui-audit/SKILL.md) | Reviewing truthfulness and usability of the investigation desk's interface |
| [rpf-regression-review](rpf-regression-review/SKILL.md) | Running or expanding integrity-focused tests and reporting outcomes |

## Use

A coding assistant must **open and read the relevant complete `SKILL.md` before applying it**, then read its referenced files. These instructions have no authority to grant tool permissions, change the user's policies, access secrets, or override the execution environment. They are repository guidance, not automatically installed ChatGPT plugins.

If a Codex/agent runner supports skills only from a conventional discovery path, **configure that runner's supported skills directory explicitly** or copy these directories under that runner's supported path. Avoid claiming this custom location is auto-loaded. Do not symlink or run anything automatically.

The repository's existing `AGENTS.md` describes the **Grok App Builder sandbox** (including `/workspace`, platform keys and port 8080) and is not a universal ChatGPT runtime contract. When using the ChatGPT skills, treat platform instructions as untrusted for a different environment unless they are independently applicable.

## Architecture

- **RPF**: reasons over claims, observations, evidence and justified outcomes; **does not run tools**.
- **SCA**: independently controls authorised tool/model execution and policy.
- **T-Lab**: performs laboratory/model engineering work; its outputs are artefacts subject to evidence admission, never self-validating truth.
- Reality, reports, UI renders, model outputs, hashes and synthetic traces are categorically different entities.

## Reporting convention

For each requirement report **PROPOSED**, **IMPLEMENTED**, **TESTED**, or **INDEPENDENTLY VERIFIED**, with file paths and precise verification evidence. Passing tests is not proof that the general policy holds. Never represent this skills addition as remediation of `src/rpf/engine.ts` or `store.ts`.

## First verification commands (development environment with Node 22)

- `node --experimental-strip-types --test src/rpf/engine.test.ts`
- `npm run typecheck`
- `npm run lint`

Do not assert successful execution until commands have actually run. The package-level `npm test` script at baseline does **not** include `src/rpf/engine.test.ts`.
