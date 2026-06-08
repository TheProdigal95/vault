# Motion Creative Plugin — Evaluation

**Source:** `Motion-Creative/motion-creative-plugin` (GitHub, downloaded 2026-04-21 into `skills/`, `_meta/`, `README.md`).
**Scope:** Evaluation only. No vault criteria or process docs touched this pass.

---

## TL;DR

17 skill folders total. Two (`customize`, `update`) are plugin infrastructure, leaving **15 executable skills**. 13 have a **hard Motion MCP dependency** — confirmed in `_meta/mcp.json` (single `projects.motionapp.com/mcp` endpoint, no fallbacks). The remaining two — `creative-strategist` (pure methodology hub) and `audience-research` (reviews mode only) — work without Motion data. Installing the plugin is dead for us.

But the methodology bundled across five skills' reference files is genuinely portable, doesn't require Motion data, and clears the Faster/Better/New rubric. Six frameworks are worth extracting.

**Ranked port list:**

1. **Hook Tactics Library + 5-Test Quality Bar** (`skills/write-hooks/references/hook-tactics.md` + `hook-eval-judge.md`) — Better. Augment `Headline & Text Hook Criteria.md` with distinction tables, net-new tactics, quality bar, and anti-pattern list.
2. **4-Question Evaluation Framework + Insight Quality Standard** (`skills/creative-strategist/references/evaluation-framework.md` + `insight-quality.md`) — Better. Add fast-fail triage gate + insight quality tests to both Critique Methodology docs.
3. **5-Bucket VoC Review Mining** (`skills/audience-research/SKILL.md` Phase 2b) — Better. Tighten `Brand Research.md` Phase 2 with strict bucket separation + Standout Language bucket. Going-forward only.
4. **Concept Quality Bar + Differentiation Rules** (`skills/creative-strategist/references/concept-standards.md`) — Better. Add concept validation gate to `Batch Template.md`.
5. **Creative Strategy Matrix** (`skills/concept-engine/references/creative-strategy-engine.md`) — New methodology. Replaces the unused TEEP stages and Emotional Zones with the matrix's awareness stages. Three Selves stays as the active targeting axis. New `Creative Strategy Matrix.md`.
6. **Creative Diversity Audit** (`skills/find-iterations/references/creative-diversity.md`) — New methodology. New `Creative Diversity Audit.md`. Depends on #5 for shared vocabulary (awareness stages, matrix cell definitions).

Everything else is either Motion-dep at the input layer (performance-analysis, weekly-performance, morning-briefing, find-iterations-as-command, analyze-ad, competitor-watch, industry-trends), duplicated by existing vault processes, or trivial (customize/update). UGC-scripts deferred — real gap but not this pass.

---

## Per-skill verdicts

| Skill | Motion MCP dep | Notion-export substitute? | Vault overlap | Rubric hit | Verdict | Reason |
|---|---|---|---|---|---|---|
| analyze-ad | Hard | Partial — Notion has creative-level spend/CTR/CPA, not `thumbstop_ratio`/`hold_rate`/transcripts | Partial — we run top-spender breakdowns in `02 Ads Analysis/` | Better (eval framework only) | Extract frameworks only | The 4-Q evaluation + metric→question correlations are the only portable pieces; command itself needs Motion's per-creative retention curves |
| audience-research | Hard for definition/competitive modes; **None for reviews mode** | Reviews mode: N/A (user pastes reviews); definition mode: Yes via Notion demo export | Partial — we already do tension mapping (Three Selves) and review mining in Phase 2 | Better | Extract 5-bucket review framework only | Tension mapping is redundant with TEEP/Three Selves; competitive mode is thinner than our Phase 2.5. Reviews mode is clean and useful |
| build-brief | Hard | No — their template assumes live workspace brand + performance refs | Match — `Brief Structure.md` + 3× format criteria are deeper | None | Skip | We already match or exceed |
| competitor-watch | Hard | No — baseline/delta model assumes Motion's Inspo creative corpus | Match — our `/ad-library` + Phase 2.5 covers this | None | Skip | Weekly delta cadence is interesting but requires infra we don't have |
| concept-engine | Hard | Partial — concept matrix can seed from Notion top-spender export | Partial — we have batch planning but no systematic pain×persona×stage matrix | New methodology | Extract Creative Strategy Engine framework | See port #5 |
| create-concepts | Hard | Partial — same as concept-engine | Partial | None (covered by #5) | Skip as command | Quick-mode wrapper over concept-engine; no additional methodology |
| creative-strategist | **None** (pure methodology) | N/A | Partial — insight-quality bar and concept-standards are sharper than anything we have written down | Better | Extract insight-quality + evaluation-framework + concept-standards | Methodology hub; references are the payload. Three distinct frameworks extracted as ports #2 and #4 |
| customize | Hard | N/A | N/A | None | Skip | Config scaffolding for the plugin |
| find-iterations | Hard | Partial — iteration scoring needs per-creative spend trajectory; Notion has this | Partial — we test variants but don't generate iteration families systematically | New methodology (diversity audit) | Extract diversity-audit framework | See port #6. The iteration-card format itself is thin without live data |
| industry-trends | Hard | No — assumes Motion Inspo library | Match — `/ad-library` covers this | None | Skip | |
| morning-briefing | Hard | Partial — day-over-day delta possible from Notion daily export | Novel cadence, but we don't run daily ops | None (for our workflow) | Skip | Daily standup tool; wrong cadence for batch-based work |
| performance-analysis | Hard | Partial — Notion exports cover KPIs; no demographic breakdown or glossary taxonomy per creative | Partial — we do this manually in top-spender analysis | Faster (maybe) | Skip for now | Worth revisiting if we ever build a Notion-export-driven performance pipeline — not this pass |
| qa-feedback | Hard | N/A — the framework is the value | Match — Critique Methodology Static/Video are deeper | Better (eval framework) | Extract eval framework | See port #2 |
| ugc-scripts | Hard (for data grounding) | Partial | Partial — UGC is a modality we use but have no dedicated criteria | Possibly New | Defer | UGC-specific framework is a real gap; revisit if current scripts under-deliver on UGC. Not priority now |
| update | N/A | N/A | N/A | None | Skip | Plugin-internal |
| weekly-performance | Hard | Partial | None | None | Skip | Deck-builder; doesn't fit our workflow |
| write-hooks | Hard (for grounding only) | Yes — tactics library doesn't need Motion | Partial — we have 18 core types; they have 33 tactics with distinction tables | Better | Extract hook-tactics + hook quality bar | See port #1 |

**Totals:** 6 frameworks to port (from 5 skills), 1 deferred (ugc-scripts), 11 skipped (2 as redundant commands after extraction).

---

## Frameworks worth porting

### 1. Hook Tactics Library + 5-Test Quality Bar

- **Source:** `skills/write-hooks/references/hook-tactics.md` + `hook-eval-judge.md` (+ `hook-voice-patterns.md` as supporting read)
- **What it encodes:** Two distinct capabilities that land as separate sections in the same doc:
  - *Tactics Library:* 33 tactics grouped by 6 categories (Identity/Audience, Credibility/Proof, Belief/Positioning, Emotion/Desire, Educational/Informational, Action/Conversion) with a fixed schema per tactic: Frame / Triggers / Example. Includes 11 distinction pairs (Contrast vs Contrarian, Confession vs Storytelling, Authority vs Social Proof, Relatability vs Demographic Callout, Exclusivity vs FOMO, Urgency vs FOMO, Directive vs CTA First, Offer Only vs Price Anchor, Question vs Curiosity, Bold Claim vs Shocking Statement, Explainer vs How To) — the kind of thing that prevents two tactics from collapsing into the same hook in practice. Also includes deployment-by-awareness-stage table and quick selection guide.
  - *Hook Quality Bar:* 5-Test gate (cognitive friction, strong trigger, complete thought, authentic voice, personal stakes), a 12-item "What ALWAYS Fails" list of specific anti-patterns, calibrated PASS/FAIL examples, and format constraints (hooks average 75 characters, never exceed 100).
- **Rubric:** **Better.** Our `Headline & Text Hook Criteria.md` has 18 core types with registers/frameworks — broader surface, but less discipline around look-alike tactics and no formal quality gate. The distinction tables prevent structural duplication at write-time (we currently catch it in critique). The quality bar catches dead hooks before they enter a draft.
- **Merge approach:** Keep tactics as a **parallel layer** alongside our 18 core types with a mapping table. Our 18 types carry TEEP tags, register tags, and vault-specific structure the Motion tactics lack. Merging would be lossy in both directions (their schema: Frame/Triggers/Example vs our schema: Type/Register/Best For). The distinction tables and quality bar are the value, not restructuring our types. Cross-walk the 33 tactics against our 18 types to identify ~6–8 net-new tactics.
- **Internal inconsistency to resolve during port:** `hook-eval-judge.md` covers only 25 of the 33 tactics — missing Reasons Why, Statistic, Belief, How To, Listicle, Question, Call To Action First, Offer Only. Reconcile the 8 missing entries during the cross-walk (add them to the eval-judge's tactic×trigger table or document why they're excluded).
- **Motion dep substitution:** N/A — both files are pure methodology, no data needed.
- **Target path:** Three new sections in `00 Global/Criteria/Headline & Text Hook Criteria.md`: "Tactics Layer" (33 tactics with mapping table to our 18 types), "Distinction Tables" (11 pairs), "Hook Quality Bar" (5 tests + anti-patterns + character limits).
- **Overlaps/replaces/augments:** Augments `Headline & Text Hook Criteria.md`.
- **Effort:** Medium. Cross-walk 33 tactics against 18 types, absorb distinction tables, add quality bar, resolve eval-judge gap.

### 2. 4-Question Evaluation Framework + Insight Quality Standard

- **Source:** `skills/creative-strategist/references/evaluation-framework.md` + `insight-quality.md`
- **What it encodes:** Two complementary frameworks:
  - *4-Question Gate:* Four ranked questions every creative must pass (Make sense fast? → Feel like it's for them? → Believe it? → Take action?), a metric→failing-question diagnostic table (low hook rate → Q1; high hook/low hold → Q1 transition; high CTR/low CVR → Q4), and the Ready/Iterate/Rethink verdict structure. Failing Q1 makes everything below it moot.
  - *Insight Quality Standard:* Defines what a real insight is (the "why" behind performance, not metric recaps or observation lists). Four tests: remove-the-metrics (would the reasoning hold up?), brand specificity (could this apply to any brand?), hindsight (obvious after you say it, not before), action (does it change what you'd do next?). Strong vs weak examples.
- **Rubric:** **Better.** Our Critique Methodology docs are deeper on format-specific findings but lack two things: a ranked-question gate at the top for fast-fail triage, and a quality bar for the findings themselves. Adding "does it fail Q1?" as the first pass speeds triage. Adding the insight tests stops critique findings from degenerating into restated metrics.
- **Workflow integration:**
  - 4-Question gate goes at the **top** of both Critique Methodology docs as a fast-fail triage pass. Writer self-audit and orchestrator both run the 4 questions first, then descend into format-specific checks only if all 4 pass.
  - Insight Quality Standard goes into both Critique Methodology docs as a quality bar for findings themselves — any finding that fails the remove-the-metrics test gets rewritten before it enters the Batch Critique.
  - Metric→question table activates when we have performance data; dormant otherwise.
- **Motion dep substitution:** N/A — pure methodology. Metric correlations only activate when we have the metrics; when we don't, it's a reasoning framework.
- **Target path:** Add to both `00 Global/Process/Critique Methodology - Static.md` and `- Video.md` as two new sections: "Four-Question Gate" at the top of the checklist, "Insight Quality Bar" in the findings-quality section.
- **Overlaps/replaces/augments:** Augments both Critique Methodology docs.
- **Effort:** Small.

### 3. 5-Bucket VoC Review Mining

- **Source:** `skills/audience-research/SKILL.md` Phase 2b (lines ~122–195)
- **What it encodes:** Organizes review extraction into five strict buckets — Pain Points / Trigger Moments / Objections / Transformations / Standout Language — run separately per product, with guardrails on signal vs. noise, and explicit downstream handoff (which bucket feeds which hook tactic: Pain → Creative Strategy Engine pain anchor, Triggers → hook material, Objections → Risk Reversal/Contrarian hooks, Transformations → aspirational/social proof hooks, Standout Language → verbatim ad copy).
- **Rubric:** **Better.** Clarification on what's net-new vs reorganization: our Phase 2 already extracts Objections and Transformations — they just aren't in strict buckets. The primary value is (a) forcing strict separation between Pain Points and Trigger Moments, which conflate in practice ("she was tired of X" lumps the pain and the moment), and (b) adding Standout Language as a dedicated net-new bucket for verbatim phrases worth stealing. Trigger Moments is the most under-mined bucket we have right now.
- **Workflow integration:** Review Analysis doc in `00 Research/` — reformatted section headings to the 5 buckets. Every quote still traces to a `review_id` per Brand Research §10.2. Going-forward only — existing brands get the new structure when refreshed via `--refresh=reviews`, no retroactive reformatting.
- **Motion dep substitution:** N/A — reviews are user-supplied in this skill too. Clean port.
- **Target path:** Update `00 Global/Process/Brand Research.md` Phase 2 section to specify the 5-bucket structure for Review Analysis output.
- **Overlaps/replaces/augments:** Augments `Brand Research.md` Phase 2.
- **Effort:** Small.

### 4. Concept Quality Bar + Differentiation Rules

- **Source:** `skills/creative-strategist/references/concept-standards.md`
- **What it encodes:** Three portable pieces:
  - *7-Test Quality Bar:* Pain point specificity ("this concept exists because [specific person] is struggling with [specific experience]"), strategic coherence, differentiation (couldn't be used by a competitor without modification), format ambition (format chosen intentionally, not by default), persuasive sharpness, testable hypothesis ("why it can work" is grounded in behavioral/pattern insights), producible.
  - *Differentiation Rules:* When generating multiple concepts, shift at least 2 of 4 axes (audience, messaging angle, visual format, hook tactic). Prevents batches where 4 scripts are the same angle with different hooks.
  - *Conflict Resolution Hierarchy:* Persuasive sharpness > brand softness. Pattern-backed > untested brand preference. Specificity > generality. "If unresolvable, favor what triggers a reaction."
- **Rubric:** **Better.** We do all three implicitly in batch planning but don't formalize them. The differentiation rule is the quickest win — it's a one-line batch-level check that catches the most common batch-planning failure (angle concentration).
- **Workflow integration:** Add to `Batch Template.md` as a "Concept Validation" section. Runs after the batch map is drafted but before script/brief assignments begin. Each concept passes the 7 tests individually; the differentiation rule is a batch-level cross-check.
- **Motion dep substitution:** N/A — pure methodology.
- **Target path:** New section in `00 Global/Process/Batch Template.md`.
- **Overlaps/replaces/augments:** Augments `Batch Template.md`.
- **Does not depend on Port #5** — the quality bar is concept-level, not matrix-level. Works with or without the Creative Strategy Matrix.
- **Effort:** Small.

### 5. Creative Strategy Matrix — pain × persona × awareness × mechanic

- **Source:** `skills/concept-engine/references/creative-strategy-engine.md`
- **What it encodes:** A hierarchical strategic framework — Pain/Desire (primary anchor) → Persona → Messaging Angle → 5 Awareness Stages → Creative Mechanic → Hook → Tactic → Visual Format. Explicitly positions itself as **structure, not execution**: it's the matrix for organizing where creative bets live, not the content of the bets.
- **Rubric:** **New methodology.**
- **Decision: Replace TEEP and Emotional Zones; keep Three Selves.** Vault audit confirms TEEP and Emotional Zones are documented in process/criteria files but appear in zero actual batch outputs (no scripts, briefs, or working documents tag by TEEP stage or Emotional Zone). Three Selves is the only framework actively used — Elevate T001 categorizes concepts by Actual/Ideal/Ought Self, IM8 T002 labels hook variations by self-type. The integration:
  - Motion's 5 awareness stages **replace TEEP**. Since TEEP isn't implemented, there's nothing operational to migrate — just update process/criteria docs that reference TEEP to use the 5 awareness stages instead.
  - Three Selves (Actual/Ideal/Ought) **stays** as an orthogonal targeting axis. It's a per-concept decision applied within each matrix cell, not an axis of the matrix itself. Already working, doesn't need to change.
  - Emotional Zones **retires**. Not used in any real output. Any useful emotional-state thinking lives informally in concept descriptions without needing a named framework.
  - Motion's "Creative Mechanic" layer → maps to our existing structure vocabulary (Explainer, UGC, Testimonial, etc.) but we don't formalize it in one place. During port, treat this as the matrix's execution layer and reference our structure vocabulary rather than inventing a new taxonomy.
- **Workflow integration:** Batch planning. The matrix becomes the pre-batch map — "T003 needs to cover these 6 cells; T001+T002 together covered 4 of them; here are the 2 gaps." Directly enables the Diversity Audit (#6). Doesn't touch script/brief writing — stops at strategic anchor level.
- **Motion dep substitution:** Yes, fully. The engine is a framework; the Motion version happens to seed cells from live performance data, but the framework itself runs on any input (Notion export, our `Persona Summary`, `02 Ads Analysis/` top-spenders).
- **Target path:** New `00 Global/Process/Creative Strategy Matrix.md`. Cross-referenced from `Batch Template.md`, `Brand Research.md` §7 (persona synthesis), and the Diversity Audit doc.
- **Cleanup during port:** Update references to "TEEP" in `CLAUDE.md`, `Headline & Text Hook Criteria.md`, `Brand Research.md`, `System Overview.md`, and the brand-researcher agent to use the matrix's awareness-stage vocabulary. Remove Emotional Zones references from criteria docs.
- **Overlaps/replaces/augments:** Replaces TEEP and Emotional Zones (both unused). Keeps Three Selves (active). Adds Pain × Persona × Awareness Stage matrix as new strategic scaffolding.
- **Effort:** Medium. Simpler than the original "augment" plan — no lossy three-framework mapping needed. Write the matrix doc, update TEEP/Zones references across ~8 files, done.

### 6. Creative Diversity Audit (5-dim + Exploitation/Exploration)

- **Source:** `skills/find-iterations/references/creative-diversity.md`
- **What it encodes:** A portfolio-level audit across five dimensions (Coverage, Concentration, Format Spread, Hook Diversity, Stage Balance) with explicit concentration-signal and gap-signal lists per dimension. Plus the exploitation vs exploration framing with warning signs on both sides ("all new creative is a variation of the same concept" = too much exploitation; "no pattern has emerged across tests" = too much exploration).
- **Rubric:** **New methodology.** We have no written-down diversity audit today. Batch planning makes implicit diversity calls ("this batch leans problem-aware, T003 needs more solution-aware") but there's no checklist. This makes the implicit explicit.
- **Dependency on Port #5:** The audit references "cells of the matrix" and "pain/desire × persona cell" throughout. It's designed to audit a matrix structured the way Port #5 structures it. Port #5 first, then #6 uses its vocabulary directly.
- **Sequencing:** Port #5 and #6 ship together in Phase C. The matrix defines the cells; the audit checks portfolio balance across them.
- **Workflow integration:** Batch planning step (Working Document, before script assignments) and between-batch retros ("what does T001 winners tell us about concentration risk going into T002?"). Directly informed by Port #4's Differentiation Rules — the diversity audit is the batch-level view, differentiation rules are the concept-level view.
- **Motion dep substitution:** Yes, fully — the audit is dimension checklists, not data pulls. Can run against any classified ad set (Notion export, our own `02 Ads Analysis/` top-spender breakdowns, or prior-batch scripts).
- **Target path:** New `00 Global/Process/Creative Diversity Audit.md`. Referenced from `Batch Template.md`.
- **Overlaps/replaces/augments:** Augments `Batch Template.md`.
- **Effort:** Small. Ships with #5, which provides the vocabulary.

---

## Skip list

- **build-brief** — Our `Brief Structure.md` + 3× format criteria are deeper. No added methodology.
- **competitor-watch** — Weekly delta cadence requires Motion Inspo baseline infra we don't have; `/ad-library` + Phase 2.5 cover the need.
- **create-concepts** — Thin wrapper over concept-engine; same methodology we extract in #5.
- **customize** — Config scaffolding for the plugin.
- **industry-trends** — Duplicates `/ad-library` with no added depth.
- **morning-briefing** — Daily cadence; wrong rhythm for batch-based work.
- **performance-analysis** — Data-dependent; Notion export could substitute someday, but not a current gap worth porting now.
- **update** — Plugin-internal.
- **weekly-performance** — Slide-deck builder; doesn't fit our workflow.
- **analyze-ad** — Command is Motion-dep; methodology piece is already captured in port #2.
- **qa-feedback** — Command is Motion-dep and thinner than our Critique Methodology; methodology piece captured in port #2.
- **ugc-scripts (deferred, not skipped)** — UGC-specific framework is a real gap in the vault (UGC is a modality we use with no dedicated criteria). Not porting this pass because (a) the skill's value is tied to data-grounded hook examples we can't reproduce and (b) current UGC work hasn't underperformed enough to justify the effort. The "would a real person say this out loud?" test and the scripted-hook-plus-talking-points structure are the two portable pieces if we revisit. When we do, decide whether UGC gets its own criteria doc or extends Video Script Criteria.

---

## Decisions (resolved)

1. **Creative Strategy Matrix: replace TEEP and Emotional Zones, keep Three Selves.** TEEP and Emotional Zones are documented but unused in any real output — zero scripts, briefs, or working documents reference them. Three Selves is the only framework actively driving concept-level decisions (Elevate T001, IM8 T002). The matrix's 5 awareness stages replace TEEP; Three Selves stays as the orthogonal targeting axis; Emotional Zones retires. References to TEEP/Zones across ~8 vault files get updated during the port.

2. **Hook tactics: parallel layer with mapping table.** Our 18 core types keep their register tags. The 33 tactics exist as a "Tactics" layer with a cross-reference table to our types. Distinction tables and quality bar land as standalone sections. This is longer than absorbing the tactics but preserves both systems' strengths.

3. **UGC criteria: deferred.** Revisit when UGC work underperforms or when we decide to formalize UGC as a format. Not this pass.

4. **5-bucket review mining: going-forward only.** Existing brands get the new structure when refreshed via `--refresh=reviews`. No retroactive reformatting — mixed formats in the vault until brands cycle through their next refresh.

5. **4-Question gate: top of checklist.** Fast-fail on Q1 is the whole point — a Q1 failure (viewer doesn't understand what this is) makes every downstream check moot. Writer self-audit and orchestrator both run the 4 questions first, then descend into format-specific checks only if all 4 pass.

6. **Concept quality bar: add to Batch Template.** Concept Validation section runs after the batch map is drafted, before script/brief assignments. The differentiation rule ("shift ≥2 of 4 axes") is a batch-level cross-check. Independent of the Creative Strategy Matrix — works now.

---

## Port sequencing

Based on effort, dependencies, and impact:

| Phase | Port | Effort | Depends on | Target doc |
|---|---|---|---|---|
| A (immediate) | #2 — 4-Question Gate + Insight Quality | Small | None | Both Critique Methodology docs |
| A (immediate) | #3 — 5-Bucket VoC Mining | Small | None | Brand Research.md |
| A (immediate) | #4 — Concept Quality Bar + Differentiation | Small | None | Batch Template.md |
| B (next) | #1 — Hook Tactics + Quality Bar | Medium | None | Headline & Text Hook Criteria.md |
| C (after B) | #5 — Creative Strategy Matrix | Medium | None (but enables #6) | New doc + ~8 files updated |
| C (after #5) | #6 — Creative Diversity Audit | Small | #5 (soft) | New doc |

Phase A items are independent, small, and can be done in parallel. Port #1 takes medium effort and is best done as a focused pass. Ports #5 and #6 ship together — #5 defines the matrix vocabulary and cleans up TEEP/Zones references, #6 uses that vocabulary for the audit.

---

## Verification notes

- 34 files total: 30 under `skills/` across 17 folders, 2 under `_meta/`, `README.md` + `Evaluation.md` at root ✓
- `_meta/mcp.json` confirms single `projects.motionapp.com/mcp` endpoint, no fallbacks ✓
- All reference files read in full during audit: hook-tactics (33 tactics verified), hook-eval-judge (25 of 33 covered — 8 missing identified), creative-strategy-engine, evaluation-framework, insight-quality, concept-standards, creative-diversity, performance-metrics ✓
- Internal inconsistency flagged: hook-eval-judge omits 8 tactics present in hook-tactics (Reasons Why, Statistic, Belief, How To, Listicle, Question, Call To Action First, Offer Only) — to resolve during Port #1 ✓
- No files outside `00 Global/Workplace/Motion Plugin Review/` modified this pass ✓

---

## Build Log (completed 2026-04-24)

All 6 ports executed. Summary of what changed and where.

### Phase A — Ports #2, #3, #4

**Port #2 — 4-Question Gate + Insight Quality Bar**
- `00 Global/Process/Critique Methodology - Static.md` — added Four-Question Gate section (after Severity Tiers), wired as first Tier 1 pass and first Tier 2 Step A sweep, added Insight Quality Bar section (before Output Format) with 4 tests and static-brief-specific calibration examples
- `00 Global/Process/Critique Methodology - Video.md` — identical structural additions with video-specific calibration examples

**Port #3 — 5-Bucket VoC Review Mining**
- `00 Global/Process/Brand Research.md` — replaced §10.5 sections 6–9 (Sentiment Themes, Common Objections, Key VoC Quotes, Emotional Drivers) with 5-bucket extraction (Pain Points, Trigger Moments, Objections, Transformations, Standout Language) + downstream handoff mapping + guardrails. Renumbered §10–14 → §11–15.

**Port #4 — Concept Quality Bar + Differentiation Rules**
- `00 Global/Process/Batch Template.md` — added Concept Validation section (between Batch Plan and Script Criteria) with 7-test quality bar, differentiation rule (shift ≥2 of 4 axes), conflict resolution hierarchy. Added step 6 in the flow, renumbered 7–11 → 8–12.

### Phase B — Port #1

**Port #1 — Hook Tactics Library + 5-Test Quality Bar**
- `00 Global/Criteria/Headline & Text Hook Criteria.md` — three new sections inserted between Content-Based Hook Categories and Layering Frameworks:
  - **Tactics Layer:** 33 tactics in 6 category tables (Identity & Audience, Credibility & Proof, Belief & Positioning, Emotion & Desire, Educational & Informational, Action & Conversion) with Tactic/Frame/Triggers/Example columns; Deployment by Awareness Stage table; Quick Selection Guide; Cross-Walk table (33 rows → nearest of 18 core types with relationship labels)
  - **Distinction Tables:** 11 look-alike pairs with differentiation criteria
  - **Hook Quality Bar:** 5-Test Gate, 12-item anti-pattern list, format constraints (75 char avg / 100 max), 6 PASS + 6 FAIL calibrated examples
- Resolved eval-judge gap: all 33 tactics' triggers included in per-category tables (the 8 missing from eval-judge were already documented in hook-tactics.md)

### Phase C — Ports #5, #6

**Port #5 — Creative Strategy Matrix (replaces TEEP + Emotional Zones)**
- **Created:** `00 Global/Process/Creative Strategy Matrix.md` — Core Hierarchy, Steps 1–6 (Anchor → Personas → Angles → Awareness Stages → Mechanics → Formats), Three Selves integration, batch planning integration
- `00 Global/Criteria/Headline & Text Hook Criteria.md` — rewrote Layering Frameworks section (TEEP/Emotional Zones → Awareness Stages + Three Selves), updated Quality Checks "Zone check" → "Stage check"
- `00 Global/Process/Brand Research.md` — line 1085: "TEEP / Three Selves / Emotional Zones" → "Creative Strategy Matrix or Three Selves"
- `00 Global/Process/System Overview.md` — updated statics-briefer description, replaced Strategic Frameworks section (TEEP 4 stages → 5 Awareness Stages, removed Emotional Zones, kept Three Selves verbatim)
- `CLAUDE.md` — line 68: updated framework reference
- `GEMINI.md` — line 63: same
- `.claude/agents/brand-researcher.md` — line 670: "TEEP / Three Selves / Emotional Zones" → "Creative Strategy Matrix or Three Selves"

**Port #6 — Creative Diversity Audit**
- **Created:** `00 Global/Process/Creative Diversity Audit.md` — 5-dimension audit (Coverage, Concentration, Format Spread, Hook Diversity, Stage Balance), Exploitation vs Exploration framework, What to Build Next prioritization, batch planning integration
- `00 Global/Process/Batch Template.md` — added cross-reference: "See [[Creative Diversity Audit]]" in Differentiation Rule section
- `00 Global/Process/System Overview.md` — added cross-reference to Creative Diversity Audit in Strategic Frameworks

### TEEP / Emotional Zones cleanup

Grep-verified: no remaining TEEP or Emotional Zones references in process/criteria docs except the historical note in Creative Strategy Matrix.md ("Replaces TEEP stages and Emotional Zones. Retains Three Selves.")

### Files touched (summary)

| Action | File |
|---|---|
| Modified | `00 Global/Process/Critique Methodology - Static.md` |
| Modified | `00 Global/Process/Critique Methodology - Video.md` |
| Modified | `00 Global/Process/Brand Research.md` |
| Modified | `00 Global/Process/Batch Template.md` |
| Modified | `00 Global/Process/System Overview.md` |
| Modified | `00 Global/Criteria/Headline & Text Hook Criteria.md` |
| Modified | `CLAUDE.md` |
| Modified | `GEMINI.md` |
| Modified | `.claude/agents/brand-researcher.md` |
| Created | `00 Global/Process/Creative Strategy Matrix.md` |
| Created | `00 Global/Process/Creative Diversity Audit.md` |
