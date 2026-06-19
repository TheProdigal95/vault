---
cssclasses:
  - table-wide
  - wide
---
# T005 Batch Critique — Founder Ads

Brand: Comfort Ortho Wear / ComfortWear
Batch: T005
Scripts file: [[T005 Scripts]]
Working document: [[T005 Working Document]]

---

## QA Summary

| Severity | Finding | Affected | Linked Rule | Status |
|---|---|---|---|---|
| ✅ | Canonical scripts file has all 20 planned founder ads. | Scripts 01-20 | Working Document sequence | Pass |
| ✅ | Main VO/script spine uses actual uploaded founder A-roll beat bank rather than transcript-only concepts. | Scripts 01-20 | T005 Working Document, Footage Reality Check | Pass |
| ✅ | Audience-facing copy does not name-drop Samir. Supers use `Founder of ComfortWear`. | Scripts 01-20 | T005 Batch Criteria | Pass |
| ✅ | Every script includes no-AI-footage production note. | Scripts 01-20 | T005 Batch Criteria | Pass |
| ✅ | Every script includes editor pacing note to cut silences, pauses, false starts, and dead air. | Scripts 01-20 | T005 Batch Criteria | Pass |
| ✅ | Deterministic pacing validator passes. | `T005 Scripts.md` | Universal Copy Rules, 250 SPM target | Pass |
| ✅ | Markdown table formatting is clean, with no double-pipe rows. | `T005 Scripts.md` | Obsidian formatting rules | Pass |
| ✅ | Raw Drive URLs were converted to clickable asset names, including founder clips and B-roll folders. | `T005 Scripts.md` | Editor usability | Pass |
| ✅ | `References` sections removed because there were no true reference links; source material now lives only in `Footage`. | `T005 Scripts.md` | Editor usability | Pass |
| ✅ | `Asset Pool` wording removed; B-roll is named plainly in Footage. | `T005 Scripts.md` | Editor usability | Pass |
| ✅ | `SUPER` jargon removed and replaced with plain editor instruction: `Add this small intro text at the start: Samir, founder of Comfort Ortho Wear`. | `T005 Scripts.md` | Editor usability | Pass |
| ✅ | Name lines updated to the strategist's founder-batch naming style: `Reach Digital_Comfort Ortho Wear_Founder_Healthcare Worker Heroes_01_T005`, with singular `Founder`, title-case concept phrase with spaces, and `_01_T005` suffix. | Scripts 01-20 | Naming / tracker readability | Pass |
| ✅ | Editor notes clarify that body on-screen captions are Instagram Stories-style overlays, not subtitle replacements; subtitles stay separate as smaller white text with black outline. | Scripts 01-20 | Editor usability | Pass |
| ✅ | `Pattern interrupt` shorthand removed and replaced with concrete opening-shot instructions. | `T005 Scripts.md` | Editor usability | Pass |
| ✅ | TikTok-source section label changed to `Editor must source from TikTok:`. | `T005 Scripts.md` | Editor usability | Pass |
| ✅ | Hook captions reworked to use the strategist's A/B/C mix: A short sharp one-sentence hook, B context + overlooked pain, C mission / why-we-built-it frame. | Scripts 01-20 | Hook quality | Pass |
| ✅ | No em dash characters remain in scripts. | `T005 Scripts.md` | Universal Copy Rules | Pass |
| ✅ | No local `/Users/...` paths appear in editor-facing script file. | `T005 Scripts.md` | Footage/reference rules | Pass |
| ✅ | Competitor brand names are not unmasked in on-screen copy. | `T005 Scripts.md` | ComfortWear Compliance & Guardrails | Pass |

---

## Validation Evidence

- Ran deterministic script validator:
  - `python3 /Users/marce/.hermes/profiles/reach-digital/skills/reach-digital/script-writer/scripts/copywriting_validator.py --brand "Comfort Ortho Wear" "Comfort Ortho Wear/T005 Scripts.md"`
  - Result: `PASS Comfort Ortho Wear/T005 Scripts.md`
- Custom structural audit confirmed:
  - 20 `## Script` sections present.
  - 0 em dash characters.
  - 0 `Samir` mentions.
  - 0 double-pipe table rows.
  - 0 local paths.
  - Every script has Visual Direction, References, Editor Notes, Footage, Hook A/B/C, Body, and Close.

---

## Notes For Strategist Review

- The full-body Gemini drafts created before the mid-turn routing correction were discarded. The canonical file now follows the corrected route: Hermes composed the source-beat VO/script spine, and Gemini only supplied first-frame on-screen hook captions, which were safety-filtered before insertion.
- Stale group script files were deleted after consolidation.
- `T005 Hook Captions - Gemini Clean.md` remains as the hook-caption source file.
