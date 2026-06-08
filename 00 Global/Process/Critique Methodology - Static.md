---
cssclasses:
  - table-wide
  - wide
---
# Critique Methodology — Static

How every static ad batch (image ads, native screenshot ads, brief docs, long-form primary text) gets critiqued, from writer sub-agent self-audit during draft through the main session's final critique that the strategist reviews. Built from recurring patterns across IM8, Lifeforce, and Elevate brief work.

**Companion docs:** [[Creative Image Ad Criteria]] · [[Native Screenshot Ad Criteria]] · [[Long-Form Primary Text Criteria]] · [[Headline & Text Hook Criteria]] · [[Universal Copy Rules]] · [[Brief Structure]] · [[Critique Methodology - Video]]

---

## Invocation

The main session runs the batch flow defined in [[Batch Template]]. When briefs are due:

1. **Tier 0 — Plan Critique** — the main session critiques the Batch Plan before any writer sub-agent is dispatched. This is a blocking gate (see the Tier 0 section below). A flawed plan means every downstream brief inherits the flaw, so catch it here.
2. **Draft in parallel (Tier 1)** — after Tier 0 passes, the main session dispatches ~5 `brief-writer` sub-agents in parallel, each handling 2-3 Batch Plan rows grouped by format or topic. Each sub-agent writes each brief, runs Hook Quality Bar + 4-Question Gate, spawns scoring-evaluator sub-agent for copy iteration (7 dimensions, 90+ threshold, cap 5 iterations), runs structural pass/fail checks, cross-checks within its group, and returns an evidence report covering all briefs in the group.
3. **Tier 2 orchestration** — the main session dispatches the `critique-orchestrator` sub-agent with the path to the Briefs file, Working Document, Top Spenders, and `writer_agent=brief-writer`. For static batches, the orchestrator runs 3 cross-brief checks (product spec consistency, fabricated stats, compounding rule scan) and dispatches fix passes as needed. Most within-brief checks are now handled by the brief-writer's scoring loop.
4. **Tier 3 critique** — once the orchestrator returns ✅ clean (or ⚠️ flags surfaced), the main session reads the cleaned Briefs file and writes `T[###] Batch Critique.md` using the Output Format below. Any promotion to global criteria is made as a concrete edit to the target criteria doc in the same turn, not left as a TODO.

The strategist sees only the Batch Critique. The orchestrator's report stays in the main session's context.

---

## Four-Tier QA (Mandatory, Blocking at Every Tier)

The strategist should never see a brief that hasn't passed every tier. Each tier blocks — fix in pass, do not surface broken work for the next tier.

### Tier 0 — Plan Critique (main session, before writer dispatch)

Before any `brief-writer` sub-agent runs, the main session critiques the Batch Plan against top-spender data. See the Tier 0 checklist below. Output a Plan Critique table; if any ❌ blocker surfaces, fix the Batch Plan and re-run Tier 0 before dispatching writers. A flawed plan makes every downstream brief inherit the flaw.

### Tier 1 — Writer Sub-Agent (`brief-writer`, during draft)

The `brief-writer` sub-agent (defined at `.claude/agents/brief-writer.md`) produces 2-3 briefs per invocation (grouped by format or topic) and runs the full scoring + structural pipeline before returning. Per brief:
1. **Hook Quality Bar** — 5-test gate. Dead hook → rethink before scoring.
2. **4-Question Gate** — fast-fail. Q1 failure blocks all downstream checks.
3. **Scoring loop** — spawns `scoring-evaluator` sub-agent (`.claude/agents/scoring/scoring-evaluator.md`). 7 dimensions scored 0-100. Copy iterates until all 90+. Cap at 5 iterations. Copy Editor has veto power.
4. **4-Question Gate** — post-scoring sanity check.
5. **Structural pass/fail checks** — Brief Structure section order, References format, Mandatory Disclaimer placement, Diagram Example spec, per-format checklist, per-platform overlay.
6. **Within-group cross-check** — headline uniqueness, product spec consistency, VoC language diversity across briefs in the group.

The 7 scored dimensions (replacing equivalent pass/fail checks): Persona Fit, Awareness Stage Alignment, Messaging Angle Coherence, Three Selves, Brand Compliance, Format Compliance, Copy Editor. Rubric files at `00 Global/Statics Generator/Scoring Agents/`.

**Evidence-based return.** The writer returns a structured evidence report covering all briefs in the group — scoring history per dimension per iteration, plus structural results. Example: `Iteration 1: Persona 78 | Awareness 91 | Angle 85 → Iteration 2: Persona 91 | Awareness 91 | Angle 92 → Final: ALL ≥90 ✅`. See `.claude/agents/brief-writer.md` for the required evidence-report format.

The sub-agent does not return until every brief passes all scored dimensions at 90+ and every structural check has its evidence line.

### Tier 2 — Orchestrator (`critique-orchestrator`, after all sub-agents return)

The `critique-orchestrator` sub-agent (defined at `.claude/agents/critique-orchestrator.md`) runs a **category-sweep audit first, item-level re-verify second**. Category sweeps mirror the audits that historically caught real failures — they look at one dimension across the whole batch instead of walking each brief end-to-end.

**Step A — Category sweeps across the batch.**

For static batches, the orchestrator runs 3 focused cross-brief checks. Most within-brief checks (headline quality, format compliance, brand compliance, References format, Image Direction, Mandatory Disclaimer, etc.) are now handled by the brief-writer's scoring loop (7 dimensions at 90+) and structural pass/fail checks — the orchestrator does not re-run them.

**Static batch sweeps (3 checks only):**
- **Product spec phrasing consistency** — canonical pricing, quantities, and timeframes from the Working Document must be identical across all briefs. Fix directly via Edit (mechanical replacement).
- **Fabricated / unverifiable stats + URLs** — every cited study, journal, percentage, or authority must have a verifiable source. Dispatch to brief-writer with `mode=fix` if found.
- **Compounding rule scan** — any scoring dimension that required 2+ iterations across 3+ briefs → candidate for criteria promotion. Return candidates to main session (no fix, just flagging).

**For video batches:** unchanged — full category sweep set (Caption-VO, Pacing, Product bridge, CTA uniqueness, Hook framing, Visual style, Fabricated claims, Hook/body redundancy, Product spec, Per-structure checklist, Per-platform overlay, Brand compliance).

**Step B — Item-level re-verify** (only for items that failed Step A, or items whose Tier 1 evidence report was incomplete / suspicious): re-run Tier 1 checklist end-to-end. Don't re-verify items that cleared every category sweep — the evidence report stands.

Failing items route back to the `brief-writer` sub-agent via fix-pass invocation (`mode=fix`, specific findings passed in). The orchestrator has Edit tools too, but prefers to delegate — writers have required-reads context loaded. **After any fix-pass, the writer must re-emit the full evidence report for the changed item, not just confirm the named finding is resolved.** This catches silent side-effects (fixing a References section but breaking the Mandatory Disclaimer placement). Do not surface to the main session until clean.

### Tier 3 — Main Session (final critique → strategist review)

The main session writes `T[###] Batch Critique.md` for the strategist. Output uses the Output Format below. The main session's job:
- Run the full Quality Checklist one more time as the last gate
- Surface findings the orchestrator may have rationalized away
- Identify cross-batch patterns
- **Apply the Compounding Rule** — propose any pattern that hit 3+ briefs (this batch) or 2+ batches (across history) for promotion to a global criteria rule

This is what the strategist reads. It should be scannable, table-first.

---

## Severity Tiers

- ❌ **Blocking** — must fix before strategist sees it. Format violations, fabricated stats/URLs, compliance breaches, criteria-doc rule violations.
- ⚠️ **Flag** — should fix when convenient. Stylistic improvements, near-misses, optional refinements.
- ✅ **Pass** — meets criteria. No action.
- 🟦 **Intentional exception** — appears to violate a rule but is intentional.

---

## Four-Question Gate (Fast-Fail Pre-Check)

Before descending into format-specific checks, evaluate every creative against four questions in order. Ranked by importance — failing Q1 makes everything downstream moot.

### Q1. Does this make sense fast?

Within 1-3 seconds, the viewer understands what this is about. Confusion is the biggest performance killer.

*Fails when:* hook is vague or abstract, too much happening visually, message could mean multiple things, no clear signal of what's being offered.

### Q2. Will the right person feel like it's for them?

The creative makes the intended viewer feel recognized — like this was made for someone in their situation. If it could be for anyone, it's for no one.

*Fails when:* language is generic, tone doesn't match how the target audience talks, casting or setting doesn't reflect who it's trying to reach, problem named isn't one the target audience actually has.

### Q3. Will they believe it?

Claims feel credible, not just accurate. Anything that sounds like a salesperson pushing too hard triggers skepticism before the viewer processes the message.

*Fails when:* benefits stated without proof, tone is overly promotional or corporate, social proof absent or staged, promise sounds too good to be true.

### Q4. Will they take the intended action?

Enough desire built and the next step feels obvious.

*Fails when:* CTA missing, buried, or unclear; no reason to act now vs later; ad promises something different from what the landing page delivers.

### How the gate integrates with tiered QA

- **Tier 1 writers** run the 4 questions twice: as a pre-scoring fast-fail gate and as a post-scoring sanity check. Q1 failure = automatic ❌ Blocking — don't enter the scoring loop.
- **Tier 2 orchestrator** — for static batches, the 4-Question Gate now runs inside the brief-writer (pre-scoring and post-scoring), so the orchestrator does not re-run it. For video batches, the orchestrator still re-runs the gate.
- A creative that fails Q1 does not get format-specific checks — fix the clarity problem first, then re-enter the checklist.
- Q2–Q4 failures are ❌ Blocking if structural, ⚠️ Flag if refinement-level.

### Metric-to-question diagnostics (when performance data exists)

| Metric Pattern | Failing Question |
|---|---|
| Low hook rate (thumbstop) | Q1 — opening isn't stopping the scroll |
| High hook rate, low hold rate | Q1 passes but middle creates friction |
| High hook + hold, low CTR | Q2 or Q3 — viewers stay but don't act |
| High CTR, low conversion | Q4 — ad promises what the landing page doesn't deliver |
| Strong engagement, low conversion | Q3 — creative entertains but doesn't persuade |

If no performance data exists, evaluate on reasoning alone. Don't present judgment as data-backed.

---

## Tier 0 — Plan Critique (Pre-Production, blocking)

Run before any `brief-writer` sub-agent is dispatched. The Working Document's Batch Plan must pass every check below. If any ❌ blocker surfaces, fix the Batch Plan and re-run Tier 0 — do not proceed to writer dispatch with a flawed plan.

- **Format variety** — distinct formats across the batch (table/chart, before/after, single product hero, native screenshot, long-form text)
- **Headline core type coverage** — different core types from [[Headline & Text Hook Criteria]] across the batch (no batch where every brief uses Curiosity Gap)
- **Persona coverage** — each persona has 2-3 concepts minimum
- **Top-spender alignment** — each format ties to a proven top-spending ad OR is explicitly flagged "untested"
- **Visual variety** — formats don't pile up (no batch with 8 single-product hero briefs and nothing else)
- **CTA variety** — different close types

Output: a Plan Critique table at the top of the Batch Critique doc with verdict + flags.

---

## Per-Format Checklists

Pulled from real failure modes across past batches.

### Image Ad — Table / Chart / Grid Format

- **Diagram Example minimal spec:** headline + chart + logos + subheading + CTA. NOTHING ELSE. No background notes, no emoji, no logo placeholders, no disclaimer annotations.
- Headline pill scannable in <2 seconds
- CTA matches brand standard
- Mandatory Disclaimer in its own `### Mandatory Disclaimer` section
- References use category headings (`**Layout**`, `**Material**`, `**Image**`) with top-level bullets only — no nested sub-bullets

### Image Ad — Single Product Hero

- **"Image to generate" = single custom element only** OR omitted entirely if the layout is pure tables/cards. Never restate the full layout reference. Never describe the whole composition.
- **Background color NEVER specified.** Designer owns background.
- Commit to one option in Image Direction. No A/B/C.
- References split: Layout / Material / Image as separate category headings
- Mandatory Disclaimer in its own section

### Image Ad — Before / After

- Persona consent / brand compliance check before drafting
- Comparison framing: time-locked (Day 1 vs Day 30, Week 1 vs Week 12)
- Honest representation rules per brand
- "Of users" subject required on any percentage stat in supporting copy

### Native Screenshot — Tweet

- VoC language anchored to a real review or Reddit quote (cite source in References)
- Pseudonym, not real Twitter handle
- Date stamp realistic (not "12 hours ago" if posted last month)
- Reaction counts realistic (no 50k retweets)

### Native Screenshot — Reddit

- Subreddit chosen for persona match
- Top-voted comment style
- Award icons / reaction counts realistic
- Username feels organic (not "user_1234")

### Native Screenshot — FB Group

- Group name and member count plausible
- Post timestamp matches active-use pattern
- Comment thread length realistic

### Native Screenshot — IG Story

- Aspect ratio 9:16
- Caption under image, not on
- Brand-style typography (not generic IG defaults if brand has custom)

### Long-Form Primary Text

- 10-beat story template followed (per [[Long-Form Primary Text Criteria]])
- Each beat earns its place
- VoC-anchored language throughout
- No banned constructions per [[Universal Copy Rules]]

---

## Per-Platform Overlays

### Meta

- Headline ≤ 40 characters visible on feed
- Primary text first 125 characters load-bearing (everything before "See more")
- Disclaimer in its own section, never buried in body
- Static image dimensions match Meta spec

### TikTok / IG Organic Feel

- Native typography
- No hard sales language in caption
- Native screenshot format preferred over polished image ads

---

## Cross-Batch Checks (Orchestrator Tier)

Run after all briefs in the batch are written.

**For static batches (3 checks — most within-brief checks now handled by scoring loop):**

- **Product spec phrasing consistency.** "$64" vs "$72" vs "$150," "100 nights" vs "100 days" — canonical phrasing from the Working Document must be identical across all briefs. Orchestrator fixes directly via Edit.
- **Fabricated stats/URLs.** Every cited study, journal, percentage, or authority must have a verifiable source. Dispatch to brief-writer with `mode=fix`.
- **Compounding rule scan.** Any scoring dimension that required 2+ iterations across 3+ briefs → candidate for criteria promotion. Return candidates to main session.

**For video batches (full sweep set — unchanged):**

- Headline framings unique across scripts
- Caption-VO audit across every hook
- Pacing sweep (syllable count, spm)
- Product bridge uniqueness
- CTA / close uniqueness
- Failed alternatives distribution
- Visual style distribution
- Fabricated / unverifiable claims
- Hook/body redundancy
- Product spec phrasing
- Per-structure checklist
- Per-platform overlay
- Brand compliance

---

## Compounding Rule (How the System Improves Over Time)

If a critique finding shows up in **3+ briefs in a single batch** OR **2+ consecutive batches**, it graduates from a per-batch fix to a permanent rule. **Promotion is an edit, not a TODO.** The main session makes the criteria-doc edit in the same turn as writing the Batch Critique:

1. Edit the relevant criteria doc ([[Creative Image Ad Criteria]] / [[Native Screenshot Ad Criteria]] / [[Long-Form Primary Text Criteria]] / [[Brief Structure]]) to add the rule
2. Add the check to the Quality Checklist in that criteria doc
3. In the Batch Critique's `Promote to Global Criteria` section, cite the specific file + line number of the edit (e.g., `Added to Creative Image Ad Criteria.md:58 — "Image Direction's first bullet must be Image to generate:"`)
4. Note the promotion in the batch's Process Log with a one-liner: `Promoted to global: [rule] — recurred in [N] briefs/batches`
5. Future batches catch it at Tier 1 instead of Tier 3

A Batch Critique whose `Promote to Global Criteria` section references rules but doesn't cite concrete edits is incomplete — the compounding rule only works if the edits actually land.

This is what stops the same audit from being needed again next batch.

---

## Insight Quality Bar

Every finding in the Batch Critique must pass as an insight — the "why" behind the issue, not a metric recap, observation list, or description of what the creative looks like. Findings that fail the first test get rewritten before entering the Batch Critique.

**Four tests:**

1. **Remove-the-metrics test:** Remove the metrics. Does the reasoning still hold up? If not, it's not an insight yet.
2. **Brand specificity test:** Could this finding apply to almost any brand? A strong finding feels specific to this brand's situation.
3. **Hindsight test:** Obvious in hindsight, not before. If it was already obvious, it's not adding signal.
4. **Action test:** Does the finding change what you'd do next? If not, it's an observation, not an insight.

**Calibration:**

| Weak (observation) | Strong (insight) |
|---|---|
| "Image ads with product heroes perform better." | "Briefs where the product is the only custom element outperform composed layouts because the designer controls composition — constraining it in the brief produces stiff results. The single-element rule works because it gives the designer the product and gets out of the way." |
| "Three briefs have headline issues." | "Briefs 4, 7, 11 all use Curiosity Gap openers but the payoff lives in body text the viewer won't read on a static ad. On image-forward formats, the headline must close the loop — Curiosity Gap works only when the image carries the answer." |
| "References format is inconsistent." | "Nested sub-bullets in References crept into 5 briefs because writers are restating what the link shows instead of letting the designer click through. The sub-bullets are editorial interpretation, not reference — cut them and the designer gets cleaner direction." |

---

## Output Format — `T[###] Batch Critique.md`

The main session's critique doc uses this structure. Compact, table-first, scannable.

### Plan Critique (Pre-Designing)

- One-line verdict
- Format-vs-data table (format | source ad | performance | data says)
- Headline core type distribution table
- Flags table (issue | resolution status)

### Brief Critique — Issue Tables

Group by category, NOT by brief number. Categories typically:
- Headline / pill issues
- Image Direction (background color, multi-option, missing single element)
- References format
- Mandatory Disclaimer placement
- Diagram Example spec violations
- Brand compliance
- Format-specific (per-format checklist)

For each finding, use this table:

| Severity | Finding | Affected Briefs | Linked Rule | Status |
|---|---|---|---|---|

For headline rewrite picks specifically (when relevant), use the "Heavy/Moderate Overlap" table format with a `Picked` column.

### Cross-Batch Patterns

What recurred across this batch? Candidates for promotion to global criteria.

### Promote to Global Criteria

Patterns that hit the 3+ briefs / 2+ batches threshold. Each entry cites the **concrete edit already made this turn**: target file + line number + exact rule added. Not a proposal, not a TODO — the criteria doc must already be updated before the Batch Critique is handed off. Format: `Added to [[Creative Image Ad Criteria]]:NNN — "[exact rule text]" — recurred in [N] briefs this batch / [N] batches consecutively`.
