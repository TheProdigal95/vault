# Creative Structure — Briefs & Scripts

Canonical format for static image ad briefs and video scripts, across every brand. Three sections per creative: Notes (direction), Brief (deliverable), Media Buying (platform copy).

Established during Elevate T001 (designer feedback from Diksha), unified with video scripts during Elevate T002. Applies to all brands, all future batches.

---

## Three-Section Model

| Section | Contains | Audience |
|---|---|---|
| **Notes** | References, visual/image direction, designer/editor notes | Designer or editor — how to execute |
| **Brief** | Headlines, design elements, script tables, disclaimer | Designer or editor — what to produce |
| **Media Buying** | Primary text, other in-platform components | Media buyer — platform ad copy |

---

## Section Order

### Header
- `## Ad #N — [Concept Name] ([Format])` (statics) or `## Script #N — [Concept] — [Structure] — [Format]` (video)
- Metadata block: bold field labels and values (Persona, Structure, Platform for statics; Persona, Structure, Duration, Caption style, Close type, VO voice for video)
- Slug — raw line, no `**Slug:**` label. Sits immediately AFTER the metadata block, before Notes.
  - Format: `Reach Digital_[Brand]_[Concept Type]_[Name]_[##]_[T###]`
  - **Why slug goes after metadata:** ClickUp task description = everything from the slug line through the Close section. Metadata is strategist context only and must sit above the slug so it is excluded from ClickUp.

**Concept Type** is a high-level category describing what the ad *is*. Always include it in the slug for both statics and videos across all brands. Common concept types:

| Concept Type | When to use |
|---|---|
| Testimonial | First-person story, UGC, review quotes, comment screenshots, pull-quotes |
| Education | Mechanism explainers, timelines, survey walkthroughs, biomechanics |
| Side by Side | Ranked comparisons, competitor tables, before/after |
| Product Showcase | Feature pills, persona-label + checklist, search bar UI |
| Humor | Meme energy, reaction formats, comedic hook |
| Barriers to Entry | Reverse psychology, "don't buy unless," qualifier framing |
| Listicle | Numbered elimination, ranked lists |
| Problem and Solution | Pain → fix arc without personal narrative |
| Promotion | Sale/discount-led, urgency, seasonal offer |
| Celebrity | Authority figure or public figure endorsement |
| Unboxing | First-impression reveal, package opening |
| Emotional | Story-driven, identity/aspiration-led, no mechanism focus |
| Urgency | Scarcity, limited-time, countdown |
| Seasonal | Holiday, event, or time-of-year hook |

This list is not exhaustive — add new types when a concept doesn't fit existing ones. One concept type per slug.

### Notes

**Static briefs:**
1. `### References`
2. `### Image Direction`
3. `### Designer Note` *(optional — see [Pre-Content Block Economy](#pre-content-block-economy))*

**Video scripts:**
1. `### Visual Direction`
2. `### References`
3. `### Audio` *(only when specific music/trending audio links are provided; audio is not a References category)*
4. `### Editor Notes` *(optional — see [Pre-Content Block Economy](#pre-content-block-economy))*
5. `### Footage` *(only when there are real source links or footage needs — omit entirely if empty)*

### Brief

**Static briefs:**
1. `### Headline Variations` — always first
2. `### Design Elements` — supporting copy, CTAs, payment logos
3. `### VoC Quote Block` *(only if the format uses one)*
4. `### Diagram Example` *(only for table/chart/grid formats)*
5. `### Mandatory Disclaimer` *(if brand requires — always last)*

**Video scripts:**
1. `### Hook Variations A, B, C` — 4-column tables (Time | Visual | Voiceover | On-Screen Captions)
2. `### Body` — 4-column table
3. `### Close` — 4-column table
4. `### Mandatory Disclaimer` *(video scripts: only include when brand requires visible on-ad fine print — e.g., a clinical stat needing an on-screen source. Most video scripts omit this entirely; compliance is baked into copy. Statics: include when designer needs to place fine print text on the image.)*

### Media Buying

1. `### Primary Text` — Meta / platform body text
2. Other in-platform components as needed

Between creatives: a `---` horizontal rule separator.

Video: `## Footage Requests` section at the bottom of the document, consolidated (not inline per-script), only when there are actual footage requests.

---

## References

Both formats use the same structure. References serve designers and editors — not strategists. **References are visual-only.** They show the editor *how the ad should look* — composition, color, edit pace, b-roll types, caption style, framing. They are not for copy direction, script structure, strategic positioning, persuasion technique examples, or anything the editor doesn't need to see. If a reference is about how the ad reads or what it says rather than how it looks, it belongs in the Working Document, not in the script/brief.

### Format

```markdown
### References

**Layout** (statics) / **Format** (video)
- [Ref Name](url)
  - Visual takeaway: composition, framing, element placement
  - Ignore X — replaced with Y

**Material** / **Visual Treatment** / **Top Spender** (as applicable)
- [Ref Name](url)
  - What to take visually: color grade, caption style, edit pace, b-roll approach
```

### Rules
- Category headings group references by visual role. Statics: **Layout**, **Material**, **Image**. Video: **Format**, **B-Roll**, **Visual Treatment**, **Top Spender**. Combine when one ref serves two roles.
- Parent bullets link the reference. Sub-bullets describe the **specific visual takeaway** the editor should pull from it — not what the ad says or why it works strategically.
- Sub-bullets must describe visual takeaways — never merely restate the reference name, never describe copy/VO/messaging, never include strategic reasoning.
- "Ignore" directives go on their own sub-bullet under the parent reference.
- No blank lines inside a References block before category headings (`**Format**`, `**Top Spender**`, etc.) or between a category heading and its first parent bullet.
- One layout/format reference is usually enough.
- **Each category heading appears once per References block.** All entries of the same type nest as consecutive bullets under that single heading. Never open a second `**Top Spender**` (or any other category) block in the same script or brief.
- No spend data, ROAS, conversion metrics, strategy/copy guidance, or persuasion technique notes. Those belong in the Working Document.
- Verify every Notion ref's **Type** before linking. A Script Structure ref is NOT a visual Format ref.
- **Every reference must be visually relevant to this specific concept.** A top spender from the analysis that shares nothing visually with this script's direction is not a useful reference. Each reference earns its place by providing a specific visual element the editor needs.
- **Every reference must be a browser-clickable URL** (Motion share link, Meta Ad Library, YouTube, Notion, etc.). No vault-relative paths or local file paths. If a competitor ad has no known external URL, surface to strategist before including.
- **Motion reference default:** use the **Motion share link** constructed by `motion-pp-cli` from the creative asset ID. These are permanent, shareable, and don't require authentication. CDN/Azure Blob links are for downloading or media inspection only — never use them as canonical references (they may expire). `platformPermanentLink` (Facebook Ad Library URL, etc.) is acceptable as a secondary reference when no Motion share link is available.
- **Audio links are their own section.** Specific IG/TikTok/music links go under `### Audio`, not as a category inside `### References`.

---

## Image Direction (statics)

The image the designer or AI generates — not the layout (that's References), not the on-canvas elements (that's Design Elements).

### What "Image to generate" means

The single custom creative element that goes INSIDE the layout. Not a restatement of the layout reference, not the whole composition.

Ask: *"What's being generated that isn't already covered by the Layout reference?"*

| Concept | Layout (from ref) | Image to generate |
|---|---|---|
| VoC Editorial | Magazine-style split | Mirror-selfie subject photo |
| Creative + Social VoC | Hero-image + Reddit-quote | Exploding food hero |
| Comparison Table | Two-column card with rows | *Nothing* — pure layout + typography |

If nothing custom is being generated, **omit the `Image to generate:` bullet entirely.**

### Format

```markdown
### Image Direction
- **Image to generate:** [single custom element — what goes inside the layout].
- **Tonal direction:** [emotional contrast or visual tension]. (optional)
- Compliance: [hard guardrails].
```

### Rules
- First bullet is `**Image to generate:**` when there IS a custom image. One committed visual, no A/B/C options.
- **No supporting copy, CTAs, payment logos, or on-canvas elements.** Those go in Design Elements.
- **No background color.** Designers own backgrounds. Exception: when the image IS the background (e.g., macro photography filling the canvas).
- **No restating the layout reference.**
- **No restating copy from other brief sections.**
- **No cross-reference pointers** ("see Headline Variations below").
- **No brand logo directives.** Brand design system owns logo placement.
- **Value-prop congruence.** Every ad must communicate WHAT is being sold. Credit without mechanism reads as noise.

---

## Design Elements (statics)

On-canvas elements that aren't the generated image: supporting copy, CTAs, payment/trust logos, stat pills, feature pills.

### Format

```markdown
### Design Elements
- **Supporting copy:** "Programs from $58/week. $0 down."
- **Payment logos:** Affirm, Afterpay, Klarna — pill badges near CTA.
- **CTA:** Pink button: "See if you qualify."
```

### Rules
- Each element gets its own bullet with the exact copy.
- Placement is implied by the layout reference. Only specify when it differs.
- Single source of truth for on-canvas copy — don't duplicate into Image Direction.

---

## Designer Note / Editor Notes

**Optional for both formats.** Execution details that aren't part of the visual or script itself.

**Include when:** hard match-the-reference rules, placement guardrails, keying instructions, format requirements that differ from brand default.

**Omit when:** it would only restate Image Direction / Visual Direction or say "use your judgment." Designers and editors know the defaults.

**Rules:**
- 3-5 bullets max.
- Never include mandatory disclaimer here.

---

## Mandatory Disclaimer

If the brand requires a legal disclaimer, it lives in its own `### Mandatory Disclaimer` section — always the **last item in the Brief section**.

### Format

```markdown
### Mandatory Disclaimer

Small legal type at the bottom, ~8-9pt, readable but discreet.

> "[Full disclaimer text as blockquote.]"
```

Pull text from the brand's compliance doc. Never invent disclaimer language.

---

## Diagram Example (statics, table/chart/grid formats only)

For Comparison Tables, Cycle Diagrams, feature grids. Non-table formats don't need this.

**Shows ONLY:**
1. Headline (Variation A)
2. The chart/table with column headers and rows
3. Payment logo row
4. Subheading / price line
5. CTA button

**Does NOT show:** background, emoji, icons, logo placement notes, disclaimer.

**Format:** ASCII box-drawing characters `┌ ─ ┐ │ ├ ┤ └ ┘ ┬ ┴ ┼` in a code fence. Pull all content from the brief — match exactly, never invent.

---

## Pre-Content Block Economy

The Notes section directs — it does not perform thoroughness. Tighten ruthlessly. Applies to both statics and video.

1. **Drop the block when it would only contain boilerplate.** Designer Note and Editor Notes are optional.
2. **Preserve bullet / sub-bullet hierarchy.** Sub-bullets give layered detail without wall-of-text parents.
3. **No blank line between a `### Heading` and its first bullet.** In References, also no blank line before category headings or between category headings and parent bullets.
4. **Condense language.** Cut:
    - Vague filler: "design should feel intentional" / "make it look premium"
    - `Tone:` anything — banned in both formats
    - Throat-clearing: "the goal here is to," "as VO says"
    - Sub-bullets that restate the parent reference name
    - Obvious phrases: "appears on beat with voiceover"
5. **References sub-bullets describe takeaways**, not re-name the reference.

### Strategy vs. Execution Split (video scripts)

The scripts file is an editor deliverable, not a strategy document. Everything before the Hook tables must serve execution — if an editor doesn't need it to cut the video, it doesn't belong.

**Cut from scripts file (strategy content → stays in the Working Document batch plan):**
- `### Concept` paragraphs — strategic rationale, "What's new vs." comparisons, format test reasoning
- `### Top Spender Translation` tables — source-to-adaptation mapping

**Keep in scripts file (editor needs it):**
- Header metadata (Persona, Structure, Duration, Caption style, Close type, VO voice)
- Slug line
- Visual Direction, References, Audio, Footage only when needed

**Tightening rules:**
- **Visual Direction uses sub-bullets.** Parent bullet names the category (B-roll, Color, Edit pace). Sub-bullets list specifics. No run-on sentences packing 4+ items into one line.
- **No timestamps in Visual Direction.** Script tables already have timecodes — "(0:00-0:16)" and similar are redundant.
- **No BPM.** Describe the music energy ("upbeat instrumental," "sparse piano"), not the tempo number.
- **VO voice:** One to two short sentences max. Demographics + core energy. ✅ "Female, 40-55, warm documentary narrator. Observational for historical beats, genuine admiration at founder reveal." ❌ Three sentences characterizing who the voice is and isn't.
- **Footage "Still needed":** One line per asset. No sourcing advice ("Source from Getty," "5-6 images minimum"). Editors know where to source.
- **Empty Footage sections are omitted.** Never write `### Footage` with `N/A`, `n/a`, `None`, or a parenthetical explanation that no footage is needed.
- **No parenthetical meta-notes** explaining how text cards relate to VO or how the editor should interpret the script's intent.
- **All References need browser-clickable URLs.** Every reference entry must link to an external URL the editor can open in a browser (Motion share link, Meta Ad Library, YouTube, etc.). No vault-relative paths, no local file paths. If a competitor ad exists only as a local download with no known external URL, surface it to the strategist to upload or locate the source URL before including it as a reference.
- **Motion reference default:** use Motion share links (`projects.motionapp.com/organization/.../creative/...?startDate=...&endDate=...`) constructed by `motion-pp-cli`. CDN/Azure Blob URLs are for download/analysis only — not canonical references.

---

## Commit to ONE Option

No "Option A / B / C" designer picks for the hero visual, background, or material. Pick one and write it down. Designers own styling; strategists own the visual commitment.

Variation lives in: Headline Variations (static A/B/C copy) and Hook Variations (video A/B/C).

**Creative hero pre-pass:** `/creative-image` may generate multiple internal visual concepts and rendered hero variants before the brief is finalized. That exploration resolves upstream. Only the strategist-approved hero direction reaches the designer-facing brief.

---

## Editing Existing Creatives

Only change what was named. Don't reformat adjacent creatives. Every changed line traces to the request.

If you spot another creative with the same issue, surface it separately — don't silently bundle.
