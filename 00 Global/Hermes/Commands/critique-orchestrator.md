# critique-orchestrator — Hermes-native QA command

Canonical command contract for post-writer batch QA. The active runtime skill is `~/.hermes/profiles/reach-digital/skills/reach-digital/critique-orchestrator/SKILL.md`.

## When invoked

Use for:

- `critique this batch`
- `review the scripts/briefs`
- `audit T###`
- post-writer sweeps
- fix-pass routing
- writing/updating `T[###] Batch Critique.md`

## Runtime boundary

- Use the active duplicate vault: `~/Documents/reach-digital-hermes`.
- Do not read or depend on the original iCloud vault or `.claude/agents/*` during QA.
- Do not invent findings. Every finding traces to an active criteria/process/brand doc or a deterministic file check.

## Required reads

Use active duplicate-vault files only:

1. Assigned `T[###] Scripts.md` and/or `T[###] Briefs.md`.
2. `[Brand]/T[###] Working Document.md`.
3. `00 Global/Criteria/Universal Copy Rules.md`.
4. `00 Global/Criteria/Headline & Text Hook Criteria.md`.
5. `00 Global/Process/Brief Structure.md`.
6. Brand compliance/guardrails/claims doc if present.
7. For video: `Video Script Criteria.md`, `Critique Methodology - Video.md`, and `script-writer` 19-point/viewer-read/SPM evidence requirements.
8. For statics: static format criteria, `Critique Methodology - Static.md`, and `scoring-evaluator` evidence requirements.

## Inputs

- `T[###] Scripts.md` and/or `T[###] Briefs.md`.
- `[Brand]/T[###] Working Document.md`.
- Brand compliance/guardrails/claims docs if present.
- Writer evidence reports if available.

Top Spenders Analysis is not a required QA input unless the strategist asks or a Working Document asset/reference must be verified.

## Output

Findings are category-first:

`Severity | Finding | Affected | Linked Rule | Status`

Route mechanical structure fixes through Hermes patches. Route creative copy rewrites back to Gemini through `script-writer` / `brief-writer`.
