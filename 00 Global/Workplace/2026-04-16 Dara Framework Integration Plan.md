---
cssclasses:
  - table-wide
  - wide
---
# Integrating Dara Denny's Framework Into Our Workflow

**Source:** Motion Creative Strategy Bootcamp — Week 3 (Dara Denny, Point Guard Media)
**Date drafted:** 2026-04-16
**Status:** Proposal — awaiting strategist review before execution

---

## Context

Dara's session covers the missing middle between research and creative: *how do you turn VoC insights into a real strategy?* Her answer is three-part — **persona gap analysis → brand diagnosis → evidence-ranked roadmap.** We already do most of the research upstream and most of the execution downstream. The gap in our workflow is the connective tissue.

**Headline correction from v1 of this plan:** I originally listed roadmapping as one of four new artifacts. It's not. It's the **spine** that makes every other addition actually compound. Without a roadmap, the diagnosis is a batch-scoped note, the icebox goes stale, creative pillars sit in isolation, and we stay in the same reactive batch-to-batch posture. With a roadmap, each batch becomes an execution of a planned hypothesis, and the T-batch series reads as a coherent story instead of a weekly scramble.

Dara was explicit: the difference between teams with clarity and teams continually executing on top performers is *roadmaps*. Not creativity, not process, not tooling — the willingness to write down a plan and work against it. That's where we need to invest. Everything else in this plan exists to feed the roadmap.

---

## What Dara teaches vs. what we already do

| Dara's concept | Where it lives today | Gap |
|---|---|---|
| Two-persona analysis (ad-target vs. buyer) | `Persona Context - [Brand].md` covers buyer personas from reviews. Ad-target personas are implicit in `02 Ads Analysis/`. | Never formally compared. No artifact names the gap. |
| Brand diagnosis (1–2 sentence anchor) | Scattered across Working Document "Raw Notes — Batch Strategy." | No named section. Diagnosis is implicit, not explicit. |
| Creative pillars (winning angles repeated at scale) | Top spenders analysis surfaces patterns. | Pillars aren't extracted into their own persistent artifact. |
| Evidence ranking (high/low confidence) | Done implicitly when we pick what to replicate from top spenders. | Confidence tier not named in the Batch Plan. |
| Icebox (central idea dump) | — | **Doesn't exist.** Ideas that don't make T00X get lost. |
| Quarterly roadmap (personas × seasons × launches) | — | **Doesn't exist.** We plan batch-by-batch, not across the year. |
| Re-diagnosis cadence | — | We compound batches, but don't formally re-diagnose. |

**Verdict:** The three non-negotiable adds are **the roadmap, the diagnosis, and the persona gap analysis**. The roadmap is the centerpiece. The diagnosis is how each batch connects to it. The gap analysis is the single cheapest onboarding input that makes the first roadmap meaningful. Creative pillars and the icebox are both *sections inside the roadmap*, not separate artifacts — splitting them was my original mistake and would have scattered the planning data across too many files.

---

## The Roadmap — Our Adaptation

Dara's roadmap has four parts: creators, icebox, quarterly plan, monthly execution. That structure is built for a monthly cadence, in-house or agency-embedded, with a media-buyer counterpart. Our constraints are different and the roadmap needs to reflect that:

| Dara's context | Our context | Implication for the roadmap |
|---|---|---|
| Monthly creative cycles | **T-batch cycles** (irregular — driven by brand readiness, not calendar) | Horizon is measured in batches, not months — but months still matter for seasonal anchors |
| In-house or embedded agency | **Multi-brand agency** (IM8, Elevate, more coming) | One roadmap *per brand*, same schema — strategist can context-switch without relearning |
| Team also buys media | **Creative-only deliverables** — client handles media | Roadmap tracks creative hypotheses, not ad-set structure. "Readiness" replaces "test velocity." |
| Tracks ad account directly | We have top spenders analysis + Test Log already | Roadmap references those; doesn't duplicate them |
| Ideas tend to dissolve between cycles | **3-tier QA and compounding Process Log already exist** | Icebox is the forward-looking twin of the Process Log — one captures "what we've learned," the other captures "what we still want to try" |

### Proposed structure: `[Brand]/Roadmap - [Brand].md`

One file per brand. Lives at the brand root (same level as Working Documents). Opens to a single 2-minute read that answers: *what is this brand's creative program doing over the next 3–6 batches, and why?*

```markdown
---
cssclasses:
  - table-wide
  - wide
---
# Roadmap — [Brand]

**Last updated:** YYYY-MM-DD
**Current batch:** T00X ([status: Planning / Writing / QA / Delivered])
**Next re-diagnosis:** YYYY-MM-DD (quarterly)

---

## Brand-Level Diagnosis

One to two sentences. The anchor for the current quarter's worth of batches.
Example — IM8:
> "IM8 is over-indexed on solution-aware creative and under-tested on menopause
> despite AppLovin showing it as the strongest persona. Our role this quarter is
> to build TOF volume across menopause, GLP-1, and gut, leading with menopause
> until we've fully exploited the persona."

Replaces any batch-level diagnosis when the two conflict. Re-evaluated every quarter
or after any material performance shift.

---

## Batch Horizon (next 4–6 batches)

### T00X — Executing now
- **Batch diagnosis:** [1–2 sentences — may narrow the brand-level diagnosis]
- **Personas:** Menopause (10), GLP-1 (3), Gut (2)
- **Production:** AI-only
- **Links:** [[T00X Working Document]]

### T00X+1 — Next (planning)
- **Working theme:** [e.g., Menopause expansion — adding creator layer]
- **Personas (tentative):** …
- **Production (tentative):** …
- **Confidence drivers:** what T00X learnings will confirm or kill this

### T00X+2 — Planned
- **Working theme:** …
- **Rationale:** why this batch is next and not later

### T00X+3 and beyond — Placeholders
- 40+ creator UGC test (waiting on T00X+1 learnings)
- Reframe structure across all personas (ongoing — can slot in any batch)

---

## Persona Coverage

Running tally of scripts/briefs per persona per batch. Planned values in italics.

| Persona     | T001 | T002 | T003   | T004  | T005  | Total |
|-------------|------|------|--------|-------|-------|-------|
| Menopause   | 0    | 10   | *8*    | *4*   | —     | 22    |
| GLP-1       | —    | 3    | *4*    | *8*   | —     | 15    |
| Gut Health  | 15   | 2    | *3*    | —     | —     | 20    |
| Stress      | 5    | —    | —      | —     | ?     | 5     |

Use this to spot over- and under-exploited personas at a glance. "?" = not yet
planned but flagged for discussion.

---

## Creative Pillars (validated angles we're doubling down on)

Winning angles worth replicating at scale. One per row: angle, evidence,
variations tested, variations queued.

| Pillar | Evidence | Tested | Queued |
|---|---|---|---|
| Pain-first → ingredient-as-proof | Top spender Ad #5 (T002 analysis); 16/20 top ads use it | T002 menopause #1, #3, #7 | T003 GLP-1 variation |
| 30-day timeline framing | 0.90 ROAS vs. 90-day 0.77 | T002 menopause #2 | T003 cross-persona |
| Reframe structure (common frustration → unexpected cause → IM8 fixes) | Ad #8 consistently top | T002 #4, #8 | T003 GLP-1, T004 gut |

Pillars are persistent — they live here, not in batch-scoped top spenders
analyses. They get updated as new top spenders are analyzed.

---

## Format / Structure Experiments

Tracked by status so nothing gets lost:
- Tested & winning — reframe structure (T002 Ads #7, #8)
- Testing now — green screen narrator (T002 #4)
- Next batch — AI character long-form (T003)
- Icebox — husband-reaction compilation, hormone-cycle timeline B-roll

---

## Calendar Anchors

- **May 2026** — Mother's Day — skip (not a fit for IM8)
- **June 2026** — [product launch — confirm]
- **Q3 2026** — back-to-school window (stress persona)
- **November 2026** — gifting (bundle creative needed)

---

## Creators

### Active
- [Name] — menopause — green screen testimonials

### Want to activate
- [Name] — GLP-1 — strong organic content

### Tested, not re-booking
- [Name] — reason

---

## Icebox (unscheduled ideas)

Organized by persona. Confidence tier in brackets: **[H]** high (proven in account
or strong VoC), **[M]** medium (VoC backing, untested in account), **[L]** low
(angle from competitor or speculative).

### Menopause
- **[H]** 40+ "I thought this was normal" monologue — from review R-847
- **[M]** Morning routine before/after — pattern in 3 top spenders
- **[L]** Husband-POV compilation — no VoC backing yet

### GLP-1
- **[H]** Muscle-loss math problem — adapted from IM8 T002 Ad #4

### Cross-persona
- **[H]** Specificity-first hook structure — works any persona, needs dedicated batch

Every batch starts by reviewing the icebox before adding new ideas. Every
research cycle ends by writing un-used ideas into the icebox. No idea gets
deleted — only moved into "Tested" below.

### Tested (archive)
- [persona] — idea — batch — outcome
```

### Why this schema works for us

- **One file, one glance.** The strategist opens it and sees the full program. No tab-switching between icebox, pillars, roadmap, calendar.
- **Batch-native.** "Horizon" is counted in T00X's, not months — matches how we actually work.
- **Feeds the Working Document directly.** Each T00X Working Document pulls its diagnosis, personas, and icebox pulls straight from the roadmap.
- **Compounds correctly.** Pillars grow as top spenders get analyzed. Icebox grows as research surfaces ideas. Persona Coverage table grows mechanically.
- **Forces hard choices.** If T00X+2's "working theme" column is blank, we have a real planning gap to close, not a batch to start.

---

## Supporting artifacts (feed the roadmap)

### A. Per-brand — created once, updated on cadence

**1. `[Brand]/00 Context/Persona Gap Analysis - [Brand].md`**
Compares who the brand's ads currently target vs. who is actually buying. One Claude session reads the ad library + reviews CSV and surfaces the opportunity gap. This is the input that writes the first brand-level diagnosis on the roadmap. Re-run quarterly or when the ad account direction shifts materially.

**2. The Roadmap itself** — `[Brand]/Roadmap - [Brand].md` (schema above).

### B. Changes to the per-batch Working Document

Small changes — the heavy lifting happens in the Roadmap now, so the Working Document just needs to connect to it.

**1. `## Diagnosis` (new — placed above `## Batch Setup`)**
1–2 sentence anchor **scoped to this batch**. Format:
> *"[One sentence on what the data shows about the brand/account's current state.] [One sentence on what this batch is designed to do about it.]"*

Example — IM8 T002:
> *"AppLovin top spenders are menopause-heavy but we've only run a few menopause scripts. This batch concentrates 10 of 15 scripts on menopause to fully exploit the persona before expanding."*

The batch diagnosis must ladder up to the brand-level diagnosis on the roadmap. If they conflict, the roadmap wins — or you update the roadmap on purpose.

**2. `## Roadmap Pulls` (new — placed below `## Batch Plan`)**
Explicit call-out of:
- Which icebox ideas this batch executes (linked by persona + tier)
- Which format/structure experiments are advancing (from Roadmap → Format Experiments)
- Which pillars this batch reinforces (from Roadmap → Creative Pillars)
- Which ideas surfaced during planning that go *back* into the icebox

Closes the loop between the batch and the roadmap.

**3. Confidence tier column in the Batch Plan table**
New column: `Confidence` with values `High` / `Med` / `Low`. Inherits from the icebox tier when pulled from there; strategist assigns if net-new.

### C. New process docs in `00 Global/Process/`

**1. `Persona Gap Analysis.md`**
The two-prompt procedure (ad library analysis + review CSV analysis), the comparison output format, when to run/re-run, and how to pull findings into the brand-level diagnosis on the roadmap.

**2. `Roadmap.md`**
Schema for `[Brand]/Roadmap - [Brand].md` (spec above), rules for what goes in each section, confidence tiering, update cadence (per batch + quarterly re-diagnosis), and the workflow that connects it to Working Documents and top spenders analyses.

### D. CLAUDE.md updates

Two new trigger blocks (detail lives in the process docs — keep CLAUDE.md tight):

- **"Roadmap"** — triggers on "update the roadmap," "what's in the icebox," "what are we testing next," "which personas are under-tested," "add to icebox," "what are our pillars," or starting/planning any batch.
- **"Persona Gap Analysis"** — triggers on "gap analysis," "who are our ads targeting," "real personas vs. ad personas," or onboarding a new brand.

**Diagnosis** doesn't need its own trigger — it's a mandatory section of the Working Document, covered by the existing "Starting a New Batch" trigger.

---

## Execution phases

### Phase 1 — Foundation (process docs + template updates)
1. Write `00 Global/Process/Persona Gap Analysis.md` (includes Dara's two Claude prompts + our output format).
2. Write `00 Global/Process/Roadmap.md` (schema + rules + update cadence).
3. Update `00 Global/Process/Batch Template.md`: new `## Diagnosis` section, new `## Roadmap Pulls` section, Confidence column in the Batch Plan table.
4. Update `CLAUDE.md` with the two new trigger blocks.

No brand-level artifacts yet. Pure process scaffolding. ~1 working session.

### Phase 2 — Pilot on IM8 (deepest data, currently in T002 so T003 gets the benefit)
1. Generate `Persona Gap Analysis - IM8.md` from existing `Ad Library Breakdown - IM8.md` + `Review Analysis - IM8.md`.
2. Draft `Roadmap - IM8.md`:
   - Brand-level diagnosis (from gap analysis + T002 learnings)
   - Batch Horizon: T002 (executing), T003 (next), T004, T005 placeholders
   - Persona Coverage table: fill T001 + T002 from actuals; T003+ tentative
   - Creative Pillars: seed from T002 top spenders analysis (Ads Analysis - T002)
   - Format Experiments: seed from T002 Working Document "Learnings from Top Spenders"
   - Calendar Anchors: Q2–Q4 2026
   - Creators: pull from ClickUp footage history
   - Icebox: seed with ideas from T001 + T002 Working Documents that never shipped
3. Retroactively add `## Diagnosis` + `## Roadmap Pulls` to `IM8/T002 Working Document.md` (validates the template on live content).
4. Use the roadmap to plan T003 from scratch — this is the real test.

Pilot validates the whole system before we touch Elevate. ~1–2 working sessions.

### Phase 3 — Rollout to Elevate
1. `Persona Gap Analysis - Elevate.md` + `Roadmap - Elevate.md` from same inputs.
2. Apply diagnosis + roadmap pulls to Elevate's next batch (T002 when it kicks off).

### Phase 4 — Normalize
1. Two brands through the system → lock the Batch Template changes as default.
2. Update `[Brand]/00 Test Log.md` to reference roadmap entries, so performance per batch maps back to the hypothesis it was testing.
3. Document learnings in `00 Global/Process/System Overview.md`. Retire this planning doc to `00 Global/Workplace/` archive.

### Phase 5 — Consider a global layer (only if warranted)
After 2–3 months of running per-brand roadmaps, evaluate whether a `00 Global/Cross-Brand Patterns.md` is worth creating — a place to note structural learnings that transfer between brands (e.g., reframe structure, 30-day timeline). Likely yes, but don't build it until the per-brand version is proven.

---

## Design principles (what we will NOT do)

- **No file sprawl.** Roadmap is *one* file per brand. Icebox, pillars, calendar, creators all live inside it. Never split planning data across files that need to be cross-referenced mentally.
- **No process for process's sake.** If a section doesn't change a decision, it doesn't ship. The Persona Coverage table earns its place only if it catches us over-exploiting a persona. The Icebox earns its place only if ideas from T002 actually get pulled into T003.
- **No replacement of existing files.** Working Documents, Persona Context, Top Spenders Analyses, Test Log — all stay. The Roadmap is additive connective tissue.
- **Voice-note friendly.** Strategist drops raw thoughts (e.g., "I'm thinking T004 should lean into GLP-1 more"); Claude updates the relevant roadmap cells. Never force structured input.
- **Compounding.** The Roadmap must get *better* over time, not stale. Each batch ends with a 5-minute roadmap update — that's the forcing function. Quarterly re-diagnosis is the bigger one.
- **Cheap to kill.** If after 2 batches the roadmap is being ignored or feels like overhead, we kill it — no sunk-cost attachment. Measurable success: T003 pulls at least 3 ideas from the T002-vintage icebox, and the brand-level diagnosis stays coherent across T002 → T003 → T004.

---

## Open questions for strategist review

1. **Diagnosis placement in Working Document.** Above or below `## Raw Notes — Batch Strategy`? (My instinct: above — it's the anchor, raw notes are the supporting evidence.)
2. **Roadmap location.** Brand root (`IM8/Roadmap - IM8.md`) feels right — it's active planning, not context. Agree?
3. **Roadmap update ownership and cadence.** My proposal: strategist updates on two triggers — (a) at the start of every batch (fill in the executing-batch row, review icebox, pull any items into the batch), (b) at quarterly re-diagnosis (redo brand-level diagnosis, re-score pillars, clear tested icebox items to archive). Claude proactively flags drift — e.g., "a persona tagged for Q2 hasn't appeared in any batch yet."
4. **Creative Pillars — inside the Roadmap or separate?** My revised take: inside the Roadmap as one section. Rationale: pillars are planning data (what to double down on next batch), not reference material.
5. **Confidence tier rubric.** Proposal:
   - **High** = proven in-account (this brand's top spender) OR pulled from strong VoC pattern across 3+ reviews
   - **Medium** = VoC backing but not yet tested in-account, OR tested in one batch without clear signal
   - **Low** = competitor-only, speculative, or single-source anecdote
6. **Re-diagnosis cadence.** Dara says quarterly. My proposal: calendar-quarter + triggered (any material performance shift or new persona data forces re-diagnosis immediately).
7. **Cross-brand layer — now or later?** Proposal: later (Phase 5). Prove per-brand first.

---

## What I need from you to execute

- **Sign-off on the Roadmap as the spine** (one file per brand, with the schema above, folding in icebox + pillars + calendar + creators + horizon).
- **Sign-off on the two inputs** (Persona Gap Analysis + Roadmap itself).
- **Sign-off on the three Working Document changes** (Diagnosis section + Roadmap Pulls section + Confidence column).
- **Answer the 7 open questions above** (or tell me to decide and move).
- **Confirm IM8 as pilot brand** (most data, currently in T002, T003 will be the first batch planned from a roadmap).

Once signed off, Phase 1 is one working session and Phase 2 is one or two more. IM8 could be running the full framework before T003 kicks off.
