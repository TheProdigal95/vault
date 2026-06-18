---
cssclasses:
  - table-wide
  - wide
---
# T001 Batch Critique - Oral Only

## Status

Draft QA complete after first full writing pass.

## Batch Count

- 7 static briefs: #01-#07.
- 8 video scripts: #08-#15.
- 15 total concepts.

## QA Pass Results

| Check | Result | Notes |
|---|---|---|
| Static/script separation | ✅ Pass | `T001 Briefs.md` contains 7 static briefs only. `T001 Scripts.md` contains 8 video scripts only. |
| Native screenshot word count | ✅ Pass | X/Twitter copy now follows the approved Native Post Hook Map instead of expanded/drifted tweet rewrites. |
| Static copy alignment | ✅ Pass | Static copy variations were restored to the approved Working Document hooks/anatomy; section labels now use `Copy Variations`, not `Headline Variations`. |
| Tweet close action-orientation + offer tests | ✅ Pass | #01, #02, #03, and #06 X/Twitter closes were revised through Gemini 3.1 Pro via Nous. Final pass keeps direct conversion closes while testing the approved acquisition offer in at least one variation per X concept: “Try 2 months of Oral Only, get 1 free,” “Third month is free on Oral Only,” and free NAD+ with subscription/TRT sub language. Removed clunky price-mechanics phrasing. Soft consideration language and spike/flatline claims remain removed. |
| Native references | ✅ Pass | X/Twitter statics use the provided Tweet Screenshot Static Notion reference with typeface note. Reddit static uses the provided Reddit dark-mode Notion reference. |
| Embedded-image differentiation | ✅ Pass | #02 remains X/Twitter with embedded needle-drawer image. #06 remains X/Twitter with embedded mechanism image. |
| Dr. J source links | ✅ Pass | Every Dr. J script includes editor-facing YouTube source links. |
| Dr. J timestamps | ✅ Pass | Every Dr. J script includes exact timestamp ranges and verbatim transcript excerpts in Footage. |
| Dr. J VO authorship | ✅ Pass | Voiceover cells use `[DR. J]` source excerpts or `[No spoken VO]` only. No invented AI narrator lines. |
| Script validator | ✅ Pass | `copywriting_validator.py "Oral Only/T001 Scripts.md"` returned PASS after timestamp pacing fixes and the hook-caption pass. |
| Hook-caption expectation gap | ✅ Pass | Revised #08-#15 hook On-Screen Captions only. Final pass was re-dispatched through `delegate_task` and verified in `agent.log` as `model=google/gemini-3.1-pro-preview provider=nous`. VO, visuals, timestamps, and source excerpts were left untouched. |
| C&D/risky terms scan | ✅ Pass | No banned live-claim phrasing found in final creative copy: no side-effect superiority, suppression/fertility, hematocrit/estrogen, works-forever, mood/energy crash, natural-rhythm/circadian mimicry, or superiority-vs-injections claims. |
| Table formatting | ✅ Pass | No double-pipe table rows. |
| Group file cleanup | ✅ Pass | No `T001*Group*.md` files exist in the Oral Only folder. |

## Remaining Review Notes

- #10, #12, and #14 still use Dr. Jaquish’s 60-day / SHBG thesis. This is intentional and source-led, but it should remain framed as Dr. J teaching, not as an Oral Only guarantee.
- #13 uses Dr. J’s cited 7.5 mg / 2300 ng/dL discussion. The script frames this as source-data explanation, not a promised viewer outcome.
- Final production should pull the exact YouTube timestamp ranges listed in each script and cut out any surrounding source-video language that touches restricted claims.
