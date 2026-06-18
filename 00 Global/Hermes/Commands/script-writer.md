# script-writer — Hermes-native video script + copywriting-contract command

Canonical command contract for video script writing and shared Gemini copywriting dispatch. The active runtime skill is `~/.hermes/profiles/reach-digital/skills/reach-digital/script-writer/SKILL.md`. For static briefs, use `brief-writer` as the primary command; it applies this shared contract.

## When invoked

Use for any task that writes, edits, formats, reviews, or dispatches:

- `T[###] Scripts.md`
- video scripts
- hooks, VO, captions, body copy, close copy
- script fix passes and script QA

## Runtime boundary

- Use the active duplicate vault: `~/Documents/reach-digital-hermes`.
- Do not read or depend on the original iCloud vault or `.claude/agents/*` during writing.
- Gemini writes creative copy. Hermes engineers the prompt, structures the output, patches files, and validates.

## Required dispatch context

Every writer dispatch must explicitly include:

1. Assigned rows from `[Brand]/T[###] Working Document.md`.
2. `00 Global/Criteria/Universal Copy Rules.md`.
3. `00 Global/Criteria/Video Script Criteria.md`.
4. `00 Global/Criteria/Headline & Text Hook Criteria.md`.
5. `00 Global/Process/Brief Structure.md`.
6. `00 Global/Process/Critique Methodology - Video.md`.
7. Brand compliance/guardrails/claims doc if present.
8. Persona/review/VoC context needed by the assigned rows.
9. Exact prior-batch template excerpt from latest approved same-brand `T### Scripts.md`.
10. Brand-specific overrides.

Top Spenders Analysis is not a writer-stage required read. Use the Working Document’s distilled strategy and only verify specific assets/references named there.

## Automatic continuation

After writer dispatch/consolidation, do not stop and wait for the strategist. The main session must:

1. Run `scripts/copywriting_validator.py` for SPM/table/brand hard-rule checks where applicable.
2. Load/run `critique-orchestrator` for post-writer category sweeps.
3. Route creative rewrites back through Gemini and patch mechanical fixes directly.
4. Re-run the failed sweep until no blocking issues remain.

## Required evidence

- 19-point checklist with quoted evidence.
- Viewer read for each hook path through body/close.
- Per-line syllable/timestamp audit using 250 SPM from `Universal Copy Rules.md`; never WPM.
- Within-group cross-check.
- Brand compliance check.

If evidence is missing, the draft is incomplete even if the copy looks finished.
