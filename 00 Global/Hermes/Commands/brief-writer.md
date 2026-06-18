# brief-writer — Hermes-native static brief command

Canonical command contract for static image ad briefs. The active runtime skill is `~/.hermes/profiles/reach-digital/skills/reach-digital/brief-writer/SKILL.md`, backed by `script-writer` for Gemini dispatch and `scoring-evaluator` for rubric QA.

## When invoked

Use for any task that writes, edits, formats, reviews, or dispatches:

- `T[###] Briefs.md` / `T[###] Creatives.md`
- static image ad briefs
- headline variations, design elements, image direction, references, primary text when brand allows it
- static fix passes and static QA

## Runtime boundary

- Use the active duplicate vault: `~/Documents/reach-digital-hermes`.
- Do not read or depend on the original iCloud vault or `.claude/agents/*` during writing.
- Gemini writes creative copy. Hermes structures, validates, and patches.

## Required dispatch context

Every writer dispatch must explicitly include:

1. Assigned rows from `[Brand]/T[###] Working Document.md`.
2. `00 Global/Criteria/Universal Copy Rules.md`.
3. Static format criteria (`Creative Image Ad Criteria.md`, `Native Screenshot Ad Criteria.md`, or `Long-Form Primary Text Criteria.md`).
4. `00 Global/Criteria/Headline & Text Hook Criteria.md`.
5. `00 Global/Process/Brief Structure.md`.
6. `00 Global/Process/Critique Methodology - Static.md`.
7. `scoring-evaluator` rubric requirements.
8. Brand compliance/guardrails/claims doc if present.
9. Persona/review/VoC context needed by the assigned rows.
10. Exact prior-batch template excerpt from latest approved same-brand `T### Briefs.md`.
11. Brand-specific overrides.

Top Spenders Analysis is not a writer-stage required read. Use the Working Document’s distilled strategy.

## Automatic continuation

After writer dispatch/consolidation, do not stop and wait for the strategist. The main session must:

1. Run/apply `scoring-evaluator` for every static brief.
2. Patch accepted Gemini output into `T[###] Briefs.md`.
3. Load/run `critique-orchestrator` for cross-brief sweeps.
4. Route creative rewrites back through Gemini and patch mechanical fixes directly.
5. Re-run the failed sweep until no blocking issues remain.

## Required evidence

- 7 scoring dimensions with iteration notes and Copy Editor veto check.
- Structural validation: section order, References, Image Direction vs Design Elements, disclaimer placement, brand overrides.
- Brand compliance check.

If evidence is missing, the draft is incomplete even if the brief looks finished.
