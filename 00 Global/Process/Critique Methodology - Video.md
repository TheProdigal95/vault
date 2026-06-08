---
cssclasses:
  - table-wide
  - wide
---
# Critique Methodology — Video

How every video batch gets critiqued, from writer sub-agent self-audit during draft through the main session's final critique that the strategist reviews. Built from recurring patterns across IM8, FitSleeps, Lifeforce, and Elevate batches.

**Companion docs:** [[Video Script Criteria]] · [[Headline & Text Hook Criteria]] · [[Universal Copy Rules]] · [[Critique Methodology - Static]]

---

## Invocation

The main session runs the batch flow defined in [[Batch Template]]. When scripts are due:

1. **Tier 0 — Plan Critique** — the main session critiques the Batch Plan before any writer sub-agent is dispatched. This is a blocking gate (see the Tier 0 section below). A flawed plan means every downstream script inherits the flaw, so catch it here.
2. **Draft in parallel (Tier 1)** — after Tier 0 passes, the main session dispatches `script-writer` sub-agents in parallel (3 scripts per sub-agent, grouped by structure or persona). Each writer reads required docs, produces its 3 scripts, runs a 19-point checklist + viewer read on each, returns a structured evidence report covering all 3.
3. **Tier 2 orchestration** — the main session dispatches the `critique-orchestrator` sub-agent with the path to the Scripts file, Working Document, Top Spenders, and `writer_agent=script-writer`. The orchestrator runs category sweeps across the batch first, then item-level re-verify only for items that failed a sweep, and loops fix passes back through `script-writer` until the batch is clean.
4. **Tier 3 critique** — once the orchestrator returns ✅ clean (or ⚠️ flags surfaced), the main session reads the cleaned Scripts file and writes `T[###] Batch Critique.md` using the Output Format below. Any promotion to global criteria is made as a concrete edit to the target criteria doc in the same turn, not left as a TODO.

The strategist sees only the Batch Critique. The orchestrator's report stays in the main session's context.

---

## Four-Tier QA (Mandatory, Blocking at Every Tier)

The strategist should never see a script that hasn't passed every tier. Each tier blocks — fix in pass, do not surface broken work for the next tier.

### Tier 0 — Plan Critique (main session, before writer dispatch)

Before any `script-writer` sub-agent runs, the main session critiques the Batch Plan against top-spender data. See the Tier 0 checklist below. Output a Plan Critique table; if any ❌ blocker surfaces, fix the Batch Plan and re-run Tier 0 before dispatching writers. Most commonly-promoted cause of cascading batch failures is a flawed plan; this gate is cheap insurance.

### Tier 1 — Writer Sub-Agent (`script-writer`, during draft)

The `script-writer` sub-agent (defined at `.claude/agents/script-writer.md`) produces 3 scripts per invocation and self-audits each before returning. Two-step self-QA per script:

1. **19-point checklist** — concrete binary checks covering product naming, timeline logic, hook differentiation, caption-VO independence, pacing (spm), banned constructions, hook-body redundancy, visual direction quality, reference validity/relevance, bridge/CTA uniqueness, product spec accuracy, and per-structure/per-platform compliance. Each check requires evidence (quoted text, grep results, syllable counts).
2. **Viewer read** — read the full script 3 times (once per hook variation through body and close) as a cold viewer. Answer: does every beat follow logically? Would I know what I'm buying? Any confusion points? Does the hook's promise get delivered?

After all 3 scripts pass, a within-group cross-check (hook construction uniqueness, caption-VO diversity, product spec consistency, bridge/CTA diversity, failed alternative diversity).

**Evidence-based return.** The writer does not return "✅ all passed." It returns a structured evidence report — one line per checklist item with concrete evidence, viewer read answers per hook variation, issues found and fixed, and within-group cross-check results. See `.claude/agents/script-writer.md` for the required format.

### Tier 2 — Orchestrator (`critique-orchestrator`, after all sub-agents return)

The `critique-orchestrator` sub-agent (defined at `.claude/agents/critique-orchestrator.md`) runs a **category-sweep audit first, item-level re-verify second**. The category-sweep order mirrors what historically caught real failures (the IM8 T002 Round 3 caption audit is the canonical example — it caught 16/45 because it looked at one dimension across the whole batch, not script-by-script).

**Step A — Category sweeps across the batch** (run these as focused, single-dimension passes):
- Four-Question Gate triage: re-run the 4 questions on each script. Any Q1 failure pulls the script for fix-pass before format-specific sweeps.
- Caption-vs-VO audit across every A/B/C hook in the batch (all 45 hooks for a 15-script batch)
- Pacing sweep: syllable count per body line, every script; flag the longest body row per script explicitly — writer evidence report must name syllable count + duration + spm for that row; >300 spm = rewrite, 280-300 spm = ⚠️
- Product bridge uniqueness across scripts (grep for duplicate phrasings)
- CTA / close phrasing uniqueness (max 2× same structure across 15 scripts)
- Failed alternatives distribution (flag if same named alternative appears in 3+ scripts mechanically)
- Hook framing duplication (no two scripts share Curiosity Gap angle, Reframe payoff, or Provocation)
- Visual style distribution within each script (A/B/C three different styles — mandatory)
- Fabricated / unverifiable stats + URLs across the batch
- Redundancy audit per script — four forms: (a) hook↔body content overlap across the whole hook vs whole body, not just last→first line; (b) within-body pattern repetition across list beats (numbered reasons, milestones, stack items) — flag if the same sentence scaffold repeats 3+ times; (c) within-script phrase echo — same mechanism/bridge/benefit phrase appearing more than once across hook+body+close; (d) hook previewing body beats sequentially — if the hook names the body's specific beats in order, the body loses its reveal; flag and rewrite
- Product spec phrasing consistency (price, ingredient count, timeframe)
- Per-structure checklist compliance: group scripts by assigned structure, run each structure's checklist as one sweep
- Per-platform overlay (AppLovin hard 60s cap, Meta 45-60s, TikTok native feel)
- Brand compliance doc claims
- Visual-direction audit across batch: specificity (flag any Visual Direction block under 5 lines or any Visual cell under ~10 words of direction); modality variety (flag any script with <2 modalities OR >4 modalities — too flat or too frantic); anchor (flag Visual Direction choices lacking References entries); b-roll beat coverage (flag any 10+ second beat without 3-5 distinct shots named, per [[Video Script Criteria]] b-roll beat coverage rule); cross-script repeat-shot grep (flag if 3+ scripts open with the same shot type). See [[Video Script Criteria]] Visual & B-Roll Criteria.
- Reference link validity audit across batch: verify every reference URL is a Motion share link, platform permanent link, or other non-expiring URL. Flag CDN/Azure Blob URLs used as references (acceptable for download, not as permanent references). Flag any local file paths (`/Users/...`) or vault-relative paths. Flag any reference that requires authentication to view (auth-walled Motion project URLs).
- Visual Direction-to-analysis traceability: verify that Visual Direction patterns (edit pace, color treatment, b-roll types, caption style) trace back to specific observations in the Top Spenders Analysis. Flag any script whose Visual Direction introduces visual approaches not grounded in top spender patterns or explicit strategic direction from the Working Document.

**Step B — Item-level re-verify** (only for items that failed Step A, or items whose Tier 1 evidence report was incomplete / suspicious): re-run Tier 1 checklist end-to-end. Don't re-verify items that cleared every category sweep — the evidence report stands.

Failing items route back to the `script-writer` sub-agent via fix-pass invocation (`mode=fix`, specific findings passed in). The orchestrator has Edit tools too, but prefers to delegate — writers have required-reads context loaded. **After any fix-pass, the writer must re-emit the full evidence report for the changed item, not just confirm the named finding is resolved.** This catches silent side-effects (fixing a hook but breaking body pacing). Do not surface to the main session until clean.

### Tier 3 — Main Session (final critique → strategist review)

The main session writes `T[###] Batch Critique.md` for the strategist. Output uses the Output Format below. The main session's job:
- Run the full Quality Checklist one more time as the last gate
- Surface findings the orchestrator may have rationalized away
- Identify cross-batch patterns
- **Apply the Compounding Rule** — propose any pattern that hit 3+ scripts (this batch) or 2+ batches (across history) for promotion to a global criteria rule

This is what the strategist reads. It should be scannable, table-first.

---

## Severity Tiers

- ❌ **Blocking** — must fix before strategist sees it. Format violations, fabricated stats/URLs, compliance breaches, criteria-doc rule violations.
- ⚠️ **Flag** — should fix when convenient. Stylistic improvements, near-misses, optional refinements.
- ✅ **Pass** — meets criteria. No action.
- 🟦 **Intentional exception** — appears to violate a rule but is intentional (e.g., offer text hook captions are intentionally divergent).

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

- **Tier 1 writers** run the 4 questions as their first self-audit pass. Q1 failure = automatic ❌ Blocking.
- **Tier 2 orchestrator** re-runs the gate as the first category sweep.
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

Run before any `script-writer` sub-agent is dispatched. The Working Document's Batch Plan must pass every check below. If any ❌ blocker surfaces, fix the Batch Plan and re-run Tier 0 — do not proceed to writer dispatch with a flawed plan.

- **Structure variety** — minimum 4 distinct structures across a 15-script batch
- **Persuasion tactic coverage** — Curiosity / How To / Confession / Contrarian / Reframe / Provocation distributed across hooks (no single tactic > 30%)
- **Persona coverage** — each persona has 2-3 concepts minimum
- **Top-spender alignment** — each structure ties to a proven top-spending ad OR is explicitly flagged "untested" in the plan
- **Visual variety** — Hook C uses a different visual style from A/B (mandatory per [[Video Script Criteria]])
- **Close type distribution** — no single close type dominates; check against the close-type table
- **Concentration risk** — no single hook tactic / structure / visual treatment is overweighted

Output: a Plan Critique table at the top of the Batch Critique doc with verdict + flags.

---

## Per-Structure Checklists

Pulled from real failure modes across past batches. Each structure has its own pattern of how it goes wrong.

### Progression Timeline (e.g., 30-day before/after)

- Milestone cards 1-2s each, not 3+ (slower than top spenders)
- Each milestone names ingredient + benefit + timeframe
- Caption shows what's being claimed in real time, not a label like `**Milestone card:**`
- Days, not weeks past month 1
- 3-4 milestones max — more = pacing collapse
- Honest start phrasing ("first sip" for energy, "first night" for sleep, "Day 14" for gut)
- Cut rate / modality mix: 1 shot per milestone (2-3s); mix lifestyle + product per milestone; ingredient overlay on the milestone card

### Narrative Testimonial

- **Proof closer required** — historically lowest-ROAS format (~0.69 vs 0.90+ for educational), needs the proof to convert
- Real first-person details: name, age, micro-moments (not generic "she felt better")
- Max 2 transformation claims per 8-second section
- Skepticism / risk beat early (otherwise reads as endorsement, not a story)
- Authority figure named in caption AND VO if cited
- Cut rate / modality mix: 3-4s shots; slow intimate lifestyle; no CGI; product shots woven through, not hero

### AI Animated Character (green screen / talking head)

- AppLovin: 30-60s cap → 2-3 symptoms max (5+ symptom versions historically run long)
- Character compositing over B-roll, NOT full-frame for >5s stretches
- Alternate full-frame and corner-box every 5-8s
- Authority figure named (creator references, doesn't claim to be one)
- Body B-roll = labels, nutrient tables, product, certifications
- Cut rate / modality mix: alternate full-frame (5-8s) / corner-box over B-roll (5-8s); B-roll = labels, nutrient tables, product, certifications
- Each body beat of ~10s must specify ≥3 visual layers (character frame + B-roll + overlay or CGI). A body beat showing only the character with no B-roll or overlay across 10+ seconds is a Tier 1 flag.

### Whiteboard Educational

- Caption shows what's being written/drawn in real time (mute viewers must follow)
- Authority figure named — historically the format wins on credibility (highest hold + ROAS in IM8 data)
- Disqualify alternatives visually (red X) → reveal pathway (circle)
- Hook lives on the board (caption = board headline)
- Cut rate / modality mix: cut on every bullet written; caption = what's drawn in real time

### Numbered Reasons

- Each reason runs a mini-PAS (problem → product's solve) in <10s
- Product reveal can be late (each reason IS a benefit)
- Don't list the product as one of the numbered reasons — it's the solution, not part of the problem set
- Close on ease/simplicity
- **Vary sentence scaffold across reasons.** Do not run `[symptom]? [ingredient] [dose]. [claim].` four times. Mix scaffolds — one reason framed as a question, one as a direct statement, one as a contrast, one as a consequence. Writer emits an evidence line naming the scaffold used for each reason.
- Cut rate / modality mix: 7-8s per reason with 2-3 cuts inside each (symptom B-roll → ingredient overlay → product); numbered header cards as rhythm

### Mechanism Contrast / Educational Explainer

- **Comparative language only** — "harder to," "responds differently," "uses a different pathway." Never absolute claims like "can't ignore," "can't habituate," "can't block" (indefensible per neuroscience)
- Mechanism connector required ("so that," "because")
- Max one analogy per script
- 2 CGI cutaways max unless mechanism itself requires multi-step visualization
- Cut rate / modality mix: 2 CGI cutaways max, 4-6s each; mechanism overlay paired with the VO connector ("so that," "because")

### Stack Replacement / Math Hooks

- The math IS the hook — show the work, don't just assert the total
- Math segment must close in ≤14s (FitSleeps/IM8 data: 20s of math = drop-off)
- Show prices/numbers in captions, total in VO (saves time, dual-channel)
- Cut rate / modality mix: fast through the math segment (≤14s); product hero shot at the reveal

### UGC / Story-Thread Format

- Overarching narrative, NOT a quote montage
- Each clip serves the arc (dismissed → discovered → results)
- 2-3s B-roll intercuts between people
- Single creator: narrate in third person about a specific customer; OK to switch to direct address mid-script
- Cut rate / modality mix: 2-3s B-roll intercuts between people; a single creator can narrate in third person

---

## Per-Platform Overlays

### Meta

- 30-60s typical, 45-60s tolerated
- Hook 4-5s
- CGI 4-6s per cutaway, sustained
- Longer narratives work (hold rates better than AppLovin)
- Headline ≤ 40 char visible

### AppLovin

- HARD 30-60s cap (not soft target)
- Write for 45-50s baseline, NOT 55-60 then compress (compression causes 280+ spm hooks and abrupt CGI)
- Hook 6-7s OK (slower scroll than Meta)
- Build intercuts into CGI from the start, never abrupt cutaways
- Cold traffic: caption + VO must each work as standalone hooks

### TikTok

- Native UGC feel (no obvious production polish)
- Hook 2-3s
- Avoid agency-style cuts
- Captions auto-generated style preferred over designed cards

---

## Cross-Batch Checks (Orchestrator Tier)

Run after all scripts in the batch are written. These caught critical issues across past batches.

- **Product bridge phrasing unique per script.** No two scripts use "It's called [Product]" or identical bridge wording. Past failure: FitSleeps T001 had 3 scripts with identical "It's called FitSleeps" bridge.
- **CTA structure varied.** Max 2× same close phrasing across a 15-script batch. Past failure: IM8 T002 had "one scoop of IM8" in 5 closes.
- **Failed alternatives tracked.** Same failed alternative (melatonin, magnesium) in 3+ scripts dilutes the objection-handling. Acceptable if contexts differ; flag if mechanical repetition.
- **Hook framings don't duplicate.** No two scripts open with the same Curiosity Gap, same Reframe payoff, or same Provocation.
- **Caption-VO audit across batch.** Run the [[Headline & Text Hook Criteria]] check on every hook (45 hooks for a 15-script batch). Same-angle violations are blocking.
- **Visual style distribution.** All 3 hook variations within a script use 3 different visual styles (mandatory).
- **Pacing audit.** Count syllables per line for every body line — no estimating. Target 250 spm; 280 spm OK for hooks only; >300 spm = rewrite.
- **Brand-specific compliance.** If the brand has a Compliance / Guardrails / Claims doc in `00 Context/`, every script verified against it before output.
- **Inconsistent product spec phrasing.** "100 nights" vs "100 days," "$64" vs "$72" vs "$150" — lock the canonical phrasing in the Working Document; flag any drift.
- **Fabricated stats/URLs.** Every cited study, journal, percentage, or authority must have a verifiable URL in References. Never fabricate. Surface to strategist if source can't be located.
- **Study source-claim substantiation.** For every cited URL, verify the linked page contains the specific stat claimed (the number, percentage, or range stated in VO) — not just that the page covers the general topic. A URL on-topic but lacking the specific figure is a fabricated-stat risk. Surface to strategist before shipping.
- **Redundancy audit (four forms).** (a) Hook↔body content overlap: no claim, symptom framing, ingredient+dose, mechanism phrase, or payoff line from the hook restated anywhere in the body — check the whole hook against the whole body, not just last→first line. (b) Within-body pattern repetition: if the body is a list, at least 2 distinct sentence scaffolds across beats — flag `[symptom]? [ingredient] [dose]. [claim].` × 4 and similar mechanical parallelism. (c) Within-script phrase echo: grep the VO column for repeated noun phrases — same mechanism / bridge / benefit phrase max once across hook+body+close combined. (d) Hook previewing body beats sequentially: if the hook names the body's specific beats in order, the body loses its reveal — flag and rewrite the hook.

---

## Compounding Rule (How the System Improves Over Time)

If a critique finding shows up in **3+ scripts in a single batch** OR **2+ consecutive batches**, it graduates from a per-batch fix to a permanent rule. **Promotion is an edit, not a TODO.** The main session makes the criteria-doc edit in the same turn as writing the Batch Critique:

1. Edit [[Video Script Criteria]] (or the relevant criteria doc) to add the rule
2. Add the check to the Quality Checklist in that criteria doc
3. In the Batch Critique's `Promote to Global Criteria` section, cite the specific file + line number of the edit (e.g., `Added to Video Script Criteria.md:248 — "No formatting labels in caption cells"`)
4. Note the promotion in the batch's Process Log with a one-liner: `Promoted to global: [rule] — recurred in [N] scripts/batches`
5. Future batches catch it at Tier 1 instead of Tier 3

A Batch Critique whose `Promote to Global Criteria` section references rules but doesn't cite concrete edits is incomplete — the compounding rule only works if the edits actually land.

This is what stops the same Round 3 audit from being needed again. The IM8 T002 caption-vs-VO audit is the canonical example: it became a Video Script Criteria rule, so T003's writer sub-agents catch it at draft time.

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
| "UGC hooks have a higher thumbstop rate." | "Hooks naming a specific moment the viewer has lived through stop scrolling because specificity triggers recognition. The three winning UGC hooks led with '3pm coffee crash,' 'opening the cabinet and counting pills,' and 'that mirror moment before a date.'" |
| "Three scripts have pacing issues." | "Scripts 4, 7, 11 exceed 300 spm because each fits a 3-step mechanism into one beat. Splitting across beats (one step per beat, each under 8s) preserves the explanation without breaking pacing." |
| "Competitor X runs a lot of testimonial ads." | "Competitor X bets on micro-influencer social proof from people who look like the target customer — suggesting they're bridging a trust gap because their product is new enough that category credibility matters more than feature differentiation." |

---

## Output Format — `T[###] Batch Critique.md`

The main session's critique doc uses this structure. Compact, table-first, scannable.

### Plan Critique (Pre-Scripting)

- One-line verdict
- Structures vs. data table (structure | source ad | hook score | hold | ROAS | data says)
- Hook tactics vs. data table (tactic | avg hook score | best ROAS | in this batch?)
- Flags table (issue | resolution status)

### Script Critique — Issue Tables

Group by category, NOT by script number. Categories typically:
- Caption-VO
- Pacing / line density
- Mechanism / claims defensibility
- Product bridges / CTA repetition
- References / Study URLs
- Brand compliance
- Format-specific (per-structure)

For each finding, use this table:

| Severity | Finding | Affected Scripts | Linked Rule | Status |
|---|---|---|---|---|

For caption rewrite picks specifically (when relevant), use the "Heavy/Moderate Overlap" table format from IM8 T002 with a `Picked` column.

### Cross-Batch Patterns

What recurred across this batch? Candidates for promotion to global criteria.

### Promote to Global Criteria

Patterns that hit the 3+ scripts / 2+ batches threshold. Each entry cites the **concrete edit already made this turn**: target file + line number + exact rule added. Not a proposal, not a TODO — the criteria doc must already be updated before the Batch Critique is handed off. Format: `Added to [[Video Script Criteria]]:NNN — "[exact rule text]" — recurred in [N] scripts this batch / [N] batches consecutively`.
