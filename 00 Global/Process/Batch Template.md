# Starting a New Batch

When the user says "start a new batch for [Brand]," "let's do T002 for IM8," or anything about beginning a new batch of ads/scripts, create three files in the brand's folder:

## 1. `T[###] Working Document.md`

The command center for the batch. Create with these sections:

```markdown
---
cssclasses:
  - table-wide
  - wide
---
# T[###] — [Brand] [Platform] [Batch Type]

---

## Raw Notes — Batch Strategy

> Drop your strategic thoughts, directions, and decisions for this specific batch here AFTER reviewing the Top Spenders Analysis. What should we do or avoid based on the data?

<!-- The strategist drops notes and Motion brand name(s) into the Top Spenders Analysis file: `02 Ads Analysis/YYYY-MM-DD Top Spenders Analysis - T[###].md`.
     Claude runs motion-pp-cli pull (metrics + media download) + angles + formats automatically, then Gemini for 4-column tables and strategic breakdown. -->

---

## Batch Setup

**Product:** [product name]
**Product page:** [URL — source of truth for specs]
**Platform:** [Meta / AppLovin / etc.]
**Personas:** [list]
**Concepts per persona:** [number]

---

## Persona Allocation

> Declare the split before the Batch Plan. Justification is grounded in Persona Performance (test log) + Persona Summary gap analysis. This is the "why this split" record.

| Persona | Allocation % | Concepts | Justification |
|---|---|---|---|

---

## Batch Plan

| # | Persona | Concept | Structure | Key Mechanism | Caption Style | Persuasion Techniques | Visuals | Notes |
|---|---|---|---|---|---|---|---|---|

---

## Concept Validation

> Runs after the Batch Plan is drafted, before script/brief assignments begin. Each concept passes the 7 tests individually; the differentiation rule is a batch-level cross-check.

### 7-Test Quality Bar (per concept)

1. **Pain point specificity** — built around a specific human tension, not a product feature. Complete: "This concept exists because [specific person] is struggling with [specific experience]." If the pain could apply to any brand in the category, not specific enough.
2. **Strategic coherence** — audience, message, structure, and hook work together. No component feels bolted on or generic.
3. **Differentiation** — couldn't be used by a competitor without modification. Specific to this brand's positioning, product, or audience.
4. **Format ambition** — visual format chosen intentionally, not by default. The format meaningfully contributes to attention or persuasion.
5. **Persuasive sharpness** — the hook's execution creates felt tension (how it presents the pain, not what the pain is). Names a problem, challenges a belief, or makes the viewer feel personally implicated.
6. **Testable hypothesis** — "Why it can work" is grounded in behavioral or pattern insights. Specific enough to succeed or fail clearly.
7. **Producible** — a creative team can execute without major clarification.

### Differentiation Rule (batch-level cross-check)

Each concept must shift at least 2 of these 4 axes from every other concept in the batch:

- Intended audience (persona)
- Messaging angle
- Visual format / structure
- Hook tactic

Three concepts that are the same format with different hooks fail this check. Each concept is a distinct creative bet. See [[Creative Diversity Audit]] for portfolio-level balance checks across prior batches.

**Format Multiplication exemption:** Variants produced by Format Multiplication (same concept rebriefed across format templates — same persona, same angle, same awareness stage, different visual format) are exempt from the differentiation rule. They shift only 1 of 4 axes by design. Format Multiplication is a production efficiency tool (extend a winning concept across formats), not a creative diversity tool (generate distinct creative bets). Multiplied variants are still subject to the Creative Diversity Audit's Format Spread dimension — if 80% of the static portfolio is headline ads, multiplication should prioritize non-headline formats.

### Conflict Resolution

When inputs conflict (data patterns suggest vulnerability, brand tone suggests authority):

- Persuasive sharpness > brand softness
- Pattern-backed > untested brand preference
- Specificity > generality
- If unresolvable, favor what triggers a reaction

---

## Script Criteria

> **Baseline:** All rules in `00 Global/Criteria/` apply automatically. Read Universal Copy Rules + the format-specific doc(s) for this batch before writing.
>
> **This section is for brand-specific overrides only:** guardrails, approved claims, science rules, brand tone, ingredient counts, pricing, and anything that differs from the global criteria.

[Brand-specific rules here. Carry forward from previous batch's Working Document if one exists.]

---

## Process Log

[Before/after examples from iteration. Starts fresh each batch — do NOT carry forward from the previous Working Document.]

---

## Context Files for Agents

[List of files agents need to read when writing scripts]
```

**If a previous batch exists** (e.g., starting T002 after T001), carry forward the brand-specific Script Criteria and Context Files sections from the previous Working Document. Append new rules from the latest top spenders — don't rewrite, reorder, or reword existing entries. **The Process Log is the exception: it starts empty each batch — do NOT carry it forward from the previous Working Document, since each batch's learnings are self-contained.** The global Criteria docs are always the baseline — brand Working Documents only contain overrides.

**Dead-angle tracking (carry-forward).** Starting from T002, the Working Document must include a **Dead Angles** section listing angles, formats, or persona combinations that have been tested with meaningful spend and produced zero or near-zero purchases. Include the spend denominator so future batches know the evidence strength (e.g., "Kids/Longevity — $4,697 spend, 0 purchases across 2 creatives"). Dead angles are exclusions — concepts targeting dead angles fail Concept Validation test #6 (testable hypothesis) unless the batch plan explicitly justifies why the re-test is warranted.

## 2. `T[###] Scripts.md`

Where all scripts live. Create with:

```markdown
---
cssclasses:
  - table-wide
  - wide
---
# T[###] — Scripts

Working document: [[T[###] Working Document]]

<!-- Scripts will be added here as they're written. -->
```

## 3. `T[###] Batch Critique.md`

The critique document — written by the main session after all scripts/briefs pass orchestrator QA. This is what the strategist reads.

**Methodology to follow:** [[Critique Methodology - Video]] for video script batches, [[Critique Methodology - Static]] for image ad / brief batches. The methodology defines the 3-tier QA workflow (writer sub-agent → orchestrator → main session), severity tiers, per-structure/format checklists, per-platform overlays, cross-batch checks, and the compounding rule for promoting recurring patterns to global criteria.

Create the file with:

```markdown
---
cssclasses:
  - table-wide
  - wide
---
# T[###] Batch Critique

> Methodology: [[Critique Methodology - Video]] (or [[Critique Methodology - Static]] for image/brief batches)

---

## Tier 0 — Plan Critique

<!-- Filled BEFORE writer dispatch. Verdict must be ✅ Pass (or ⚠️ Flag with mitigation noted) before Tier 1 starts. If ❌ Blocked, fix the Batch Plan and re-run Tier 0 before proceeding. -->

---

## Critique — Issue Tables

<!-- Group findings by category (Caption-VO, Pacing, Mechanism, Bridges, References, Compliance, etc.), NOT by script/brief number. Use this table format: -->

| Severity | Finding | Affected | Linked Rule | Status |
|---|---|---|---|---|

<!-- Severity: ❌ Blocking · ⚠️ Flag · ✅ Pass · 🟦 Intentional exception -->

---

## Cross-Batch Patterns

<!-- What recurred across this batch? Candidates for promotion to global criteria. -->

---

## Promote to Global Criteria

<!-- Patterns that hit the 3+ items / 2+ batches threshold. Each entry cites the CONCRETE EDIT already made this turn — target file + line + exact rule added. Not a proposal, not a TODO. The criteria doc must be updated before the Batch Critique is handed off. Format: `Added to [[Criteria Doc]]:NNN — "[exact rule text]" — recurred in [N] items this batch / [N] batches consecutively`. -->
```

## Test Log — Persona Performance Section

Below the main test log table (which stays unchanged), add a **Persona Performance** section with two parts.

**Cumulative View** — one table, updated each batch, showing all-time persona performance. This is what the strategist scans when planning the next Persona Allocation.

```markdown
## Persona Performance

| Persona | Batches | Total Ads | Total Spend | Avg CPP | Best Ad | Trend | Confidence |
|---|---|---|---|---|---|---|---|
```

**Per-Batch Detail** — one sub-table per batch, written when performance data comes back. Maps ads to personas using the Batch Plan's Persona column.

```markdown
### T[###] ([Date])
| Persona | Ads | Spend | CPP | Notes |
|---|---|---|---|---|
```

**Confidence thresholds:**
- High confidence: ≥5 ads and ≥$3,000 spend in the relevant read window.
- Medium confidence: 3–4 ads or $1,000–$2,999 spend.
- Low confidence: <3 ads or <$1,000 spend.

Do not mark a persona as `Improving`, `Declining`, or `Dead` from low-confidence data. Use `New`, `Directional`, or `Low spend` until the threshold is met. For mature brands, include a recent-window read (`Last 60 days CPP`) when old batch data could obscure current performance.

Personas stay out of ad slugs. The Batch Plan is the mapping layer. Mapping ad → persona when results come back is ~5 minutes of manual work per batch.

## The flow

0. **Recent VoC Addendum (on request, before the Top Spenders Analysis).** Only when the strategist asks for recent VoC enrichment, scan recent reviews (last 30–60 days) for notable new VoC — pain language, trigger moments, or transformations not already captured in Persona Context. If any stand out, add them to a `## Recent VoC Addendum` table in the Working Document, or to `00 Research/Recent VoC - [Brand].md` if the signal should persist across batches:

   ```markdown
   | Persona | Quote | Source / review_id / date | Why notable | Use in this batch? | Refresh trigger? |
   |---|---|---|---|---|---|
   ```

   Do **not** append directly to generated Persona Context. This is not a full pipeline re-run — no dictionary revision, no re-classification, no frequency table update. If a pattern recurs, mark it as a `--refresh=reviews` trigger so it can enter canonical Persona Context through the pipeline.

1. **Strategist says "run ads analysis for [Brand]"** — optionally with raw notes on what they see working, what to pay attention to, or general strategic direction. Claude creates the analysis file at `02 Ads Analysis/YYYY-MM-DD Top Spenders Analysis - T[###].md` and gets going immediately.
2. **Claude runs the Motion data pull** — in parallel: `motion-pp-cli pull --brand [brand] --top 20 --download --output-dir "[Brand]/02 Ads Analysis/media"` (metrics + media + Motion share links), `motion-pp-cli angles --brand [brand]` (angle spend breakdown), `motion-pp-cli formats --brand [brand]` (format trends). For non-Motion URLs (YouTube, TikTok, competitive refs), use `/grab`. Then runs **Gemini analysis** on downloaded video ads — both 4-column transcription tables AND edit-style breakdowns (edit pace, b-roll types, color treatment, caption style, transition types). Gemini visual analysis is essential for understanding *how* top spenders are constructed visually, not just what they say.

   **Optional: Competitive ad scan** (run only when the strategist asks). For the top 2–3 Positioning Competitors / Customer-Validated Competitors:
   - WebSearch `"[competitor] Facebook page"` to get their page URL.
   - Browse their Ad Library via agent-browser (navigate to `facebook.com/ads/library/?view_all_page_id=[ID]`).
   - Also run a keyword search on the Ad Library for the brand's primary pain terms (e.g., "menopause supplement") to see the full market landscape.
   - Classify dominant claim types across competitor ads: claim-led / mechanism-led / identity-led.
   - Note new angles, formats, or personas being targeted since last scan.
   - Output a short `## Competitive Landscape Scan — [Date]` section in the Top Spenders Analysis or Working Document Raw Notes.
   - Browser review + WebSearch are the workflow.

3. **Top Spenders Analysis** gets completed using the template at `00 Global/Process/Top Spenders Analysis Template.md`. Three mandatory lenses: **SPEND** (what the platform is scaling), **CONVERSIONS** (what actually converts), **RETENTION** (what holds attention). Per-ad creative anatomy breakdowns for annotated ads. Pattern extraction. Decision framework with replicate/kill/test recommendations. **Strategist notes from step 1 are incorporated** — if the strategist flagged specific ads, patterns, or directions, those observations are threaded into the analysis and decision framework.
4. **Strategist reviews analysis + drops batch strategy notes** in the Working Document's "Raw Notes — Batch Strategy" section. These notes may refine the analysis conclusions or add strategic direction the data alone doesn't show.
5. **Persona Allocation + Batch Plan** are built using: Persona Performance (test log), Persona Summary gap analysis, top spenders patterns, angle spend data (which angles have budget), format trend data (which structures are scaling), strategist raw notes from step 1, and strategy notes from step 4. Declare the Persona Allocation table first, then map concepts so the concept count per persona roughly matches the allocation. Every concept in the plan should trace to either a data signal or a strategist directive — nothing generated from first principles alone.
6. **Concept Validation** fires automatically via a sub-agent immediately after the Batch Plan is written — do not wait for the strategist to ask for it. Each concept runs against the 7-test quality bar, then the differentiation rule as a batch-level cross-check. Concepts that fail get revised before Tier 0. The sub-agent returns validation results to the main session; if any concept fails, fix the plan before proceeding.
7. **Tier 0 — Plan Critique** runs against the Batch Plan. **Blocking gate.** The plan must pass every check in [[Critique Methodology - Video]] § Tier 0 (or [[Critique Methodology - Static]] § Tier 0) before any writer sub-agent is dispatched. If ❌ blockers surface, fix the plan and re-run Tier 0. A flawed plan makes every downstream script/brief inherit the flaw.
8. **Model script** is written and iterated with the creative director.
9. **Tier 1 — Writer dispatch.** Scripts are produced in parallel through the `script-writer` skill (3 scripts each, grouped by structure or persona). Briefs are produced in parallel through the `brief-writer` skill backed by the master `script-writer` copywriting contract (2-3 briefs each, grouped by format or topic). Script-writers run a 19-point concrete checklist (binary pass/fail with evidence) + viewer read (3 read-throughs per script, one per hook, answering 4 narrative-logic questions). Brief-writers apply the `scoring-evaluator` 7-dimension loop inline or via a depth-1 main-session task; nested delegation is not assumed. For a 15-script batch: 5 script-writer agents in parallel. Each writer returns a **structured evidence report** with checklist/scoring results + viewer read results + within-group cross-check per [[Critique Methodology - Video]] / [[Critique Methodology - Static]]. Reports missing evidence are non-compliant — the orchestrator rejects and re-dispatches or runs the missing deterministic checks before patching.
10. **Tier 2 — Orchestrator QA**: For video batches: runs full category sweeps (including references verification — see below), item-level re-verify on failures, fix-passes back to script-writer. For static batches: orchestrator runs 3 cross-brief checks (product spec consistency, fabricated stats, compounding rule scan) + references verification. Writers re-emit the full evidence report after any fix-pass.
11. **Tier 3 — Main session writes the Batch Critique**: runs `motion-pp-cli highlights --brand [brand]` automatically and surfaces the results in the critique's carry-forward section (what Motion's AI flags to scale vs fix). Then runs the final pass, surfaces patterns, and drafts any criteria/process promotion for patterns hitting the 3+ items / 2+ batches threshold. Criteria edits require explicit strategist approval before patching global criteria files. The `Promote to Global Criteria` section cites the proposed target file + rule text or the approved edit made. This is the document the strategist reads.
12. **Media files deleted** after analysis is saved — links serve as permanent reference.

## Hard rules for the batch flow

**Top Spenders Analysis scope:**
- Only write per-ad strategic breakdowns for ads the strategist explicitly commented on in their raw notes. Unannotated ads do not get breakdowns.
- The spend summary table can include every ad in the report for context — depth is limited to the annotated ones.
- Never fabricate analysis for ads you couldn't download or verify. Flag gaps transparently.

**Motion data pull:**
- Always run `pull`, `angles`, and `formats` in parallel at step 2 — never skip them to save time. They're what makes the Batch Plan data-informed rather than a guess.
- `pull` rank order is the authoritative spend order. No CSV needed.
- For creative-doc References, use **Motion share links** as the canonical reference format. The CLI constructs these from the creative asset ID. CDN/Azure Blob media URLs are for download/analysis only — never use them as reference links in scripts or briefs (they may expire). `platformPermanentLink` (Facebook Ad Library, TikTok, etc.) is acceptable as a secondary reference when the Motion share link is unavailable.
- Never use local file paths (`/Users/...`) or vault-relative paths as references. If a reference has no external URL, surface to strategist.
- `highlights` runs automatically at step 11 — never ask the strategist whether to run it.

**References verification (Tier 2 — blocking):**
References in scripts and briefs exist for one purpose: showing editors the visual execution to replicate. Every reference must pass three checks before the batch ships:
1. **Valid** — the URL loads. Motion share links, platform permanent links, and Notion links are acceptable. CDN/Azure Blob URLs, local file paths, and dead links fail.
2. **Correct** — the URL points to what the reference claims. A reference labeled "Ad #11 — Shame to Pride Selfie Walk" must actually be that ad when you open the link, not a different creative or a login wall.
3. **Relevant** — the reference is visually relevant to the specific concept being briefed. A top spender from the analysis that has nothing in common with this script's visual direction is not a useful reference — it wastes the editor's time. Each reference sub-bullet must describe a specific visual takeaway the editor should pull from it (color grade, edit pace, b-roll type, caption style, framing, etc.).

If any reference fails, fix or remove it before the batch leaves Tier 2.

**Working Document brevity:**
- Bullets in the Working Document are short one-liners, not mini-essays. Bold the concept name, then the takeaway in plain language.
- Don't repeat strategic analysis from the Top Spenders doc — that lives there. The Working Document holds actionable takeaways and the batch plan.
- No ROAS breakdowns, no "this is adaptable because..." paragraphs, no quoting the Top Spenders analysis back at the strategist.

**Brand Script Criteria additions:**
- Before adding a rule to the brand's `Script Criteria` section, grep `00 Global/Criteria/` first. If the rule already exists globally (em-dashes, "VO must sound spoken," banned constructions, etc.), don't restate — the "Baseline: all rules in 00 Global/Criteria apply automatically" pointer handles it.
- Brand-specific Script Criteria only holds overrides: compliance, brand tone, approved claims, pricing, imagery, sourcing, ingredient counts. Anything format-level belongs in the global criteria doc.
- Process Log entries with batch-specific before/after examples are fine to keep locally, but the "Rule" line should point back to the global doc rather than re-mandate.

---

## Natural language triggers

- "start a new batch for [Brand]" / "let's do T002"
- "set up the batch docs" / "create the working document"
- "new batch" / "next batch"
