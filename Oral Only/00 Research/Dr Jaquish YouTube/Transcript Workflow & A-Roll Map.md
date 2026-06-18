# Dr Jaquish YouTube — Transcript Workflow & Initial A-Roll Map

> Channel: https://www.youtube.com/@jaquishbiomedical  
> Built 2026-06-16. Transcript-only path uses public YouTube captions via `yt-dlp`; no YouTube Premium/browser login required for caption extraction where captions are public/available.

---

## Transcript Extraction Method

Working method:

```bash
# 1) Index channel videos
mkdir -p "Oral Only/00 Research/Dr Jaquish YouTube"
yt-dlp --flat-playlist \
  --print '%(id)s\t%(title)s\t%(duration_string)s\t%(upload_date>%Y-%m-%d)s\t%(webpage_url)s' \
  'https://www.youtube.com/@jaquishbiomedical/videos' \
  > 'Oral Only/00 Research/Dr Jaquish YouTube/channel_video_index.tsv'

# 2) Download caption files only — no video/audio media
mkdir -p 'Oral Only/00 Research/Dr Jaquish YouTube/raw-vtt'
yt-dlp --ignore-errors --skip-download --write-auto-subs --write-subs \
  --sub-langs 'en.*' --sub-format 'vtt' \
  -o 'Oral Only/00 Research/Dr Jaquish YouTube/raw-vtt/%(id)s.%(ext)s' \
  -a 'Oral Only/00 Research/Dr Jaquish YouTube/trt_relevant_urls.txt'

# 3) Convert VTT captions into timestamped markdown
python3 'Oral Only/00 Research/Dr Jaquish YouTube/convert_vtt_to_md.py'
```

Artifacts created:

- `channel_video_index.tsv` — 168 indexed videos from the channel.
- `all_channel_urls.txt` — all 168 video URLs from the channel index.
- `trt_relevant_urls.txt` — original 13-video keyword subset kept for reference only; full corpus now supersedes it.
- `raw-vtt/` — downloaded caption files for 167 videos with available public YouTube captions.
- `transcripts/` — readable timestamped markdown transcripts for **all 168 indexed videos**.
- `transcript_index.md` — Obsidian index linking all source videos to transcript files.
- `full_caption_pull.log` — yt-dlp log from the full-channel caption pull.

One video (`SutpE1IZFZk` / `X3: Be Right Back`) had no YouTube captions, so it was downloaded once, transcribed with Gemini fallback, saved as `transcripts/SutpE1IZFZk_X3_Be_Right_Back.md`, and the downloaded media was deleted after transcript creation.

## Current Transcript Set

The full channel corpus is now available. See `transcript_index.md` for all 168 video links/transcript files. The originally filtered relevant set includes:

- `Fast Acting Testosterone Explained: How Nandrogen Works vs Traditional TRT`
- `The "Perfect" TRT Protocol: No Needles, No Side Effects`
- `The TRT Failure: Why Injections Stop Working After 60 Days`
- `The Problem With Testosterone Replacement Therapy (TRT)`
- `Dr. Explains The New Way to Use Testosterone`
- `How to Restore Natural Testosterone After TRT`
- `Why Traditional Steroid Cycles Fail and Fast-Acting TRT Works`
- `Why Steroid Cycles Fail and Fast-Acting Testosterone Works Better`
- `Is testosterone replacement therapy (TRT) the same as taking steroids?`
- peptide/hormone context videos.

## Early Language / Stakes Patterns

These are Dr Jaquish's native language patterns from the transcripts. Use as research input, not automatically approved ad copy.

- **"Standard TRT is wrong"** — challenger framing against common TRT administration.
- **"I'm going to back it up"** — stakes/credibility move after making a big claim.
- **"The body catches up" / SHBG explanation** — mechanism for why he says regular TRT stops feeling effective.
- **"High in the morning, then drops"** — core rhythm / fast-acting testosterone frame.
- **"No needles" / daily oral routine** — strongest simple consumer hook, but avoid broad no-side-effect promises.
- **"This is based on [paper/graph]"** — visual A-roll often includes him pointing at phone/screen/graph, useful for expert explainer edits.
- **"I was part of the creation of that product"** — founder authority / behind-the-product stake.

## Initial A-Roll Candidate Map

Use these clips as candidate source moments for editor pulls. Several statements are compliance-sensitive; use the clip as source language/stakes and route final claims through `C&D Claims Risk Summary - Oral Only.md` before scripting.

| Video | Candidate timestamp | Why it matters | Compliance note |
|---|---:|---|---|
| `Fast Acting Testosterone Explained: How Nandrogen Works vs Traditional TRT` | 00:30-00:48 | Sets up the promise and says he will back it up. Strong expert hook setup. | Avoid repeating "less side effects" unless approved. |
| `Fast Acting Testosterone Explained...` | 00:55-01:12 | He introduces a comparison graphic and research-backed setup. Good visual A-roll/B-roll for mechanism ads. | Verify referenced study relevance before using as substantiation. |
| `The Problem With Testosterone Replacement Therapy (TRT)` | 00:32-00:38 | Direct challenger framing: standard TRT / administration is wrong. Strong stakes. | Use as Dr's POV, not as an unsupported absolute superiority claim. |
| `The Problem With Testosterone Replacement Therapy (TRT)` | 04:07-04:48 | Explains side effects/SHBG as the problem with high testosterone at night and TRT plateau. | High-risk claims; use for internal language mining, not direct ad copy without approval. |
| `The Problem With Testosterone Replacement Therapy (TRT)` | 08:59-09:09 | Names Nandrogen and OralOnly, explains fast-acting testosterone. | Brand/product source moment. Verify product terminology. |
| `The Problem With Testosterone Replacement Therapy (TRT)` | 10:47-11:12 | Says he was part of creating Nandrogen and frames desired high-then-drop profile. | High compliance sensitivity around objectives/outcomes. |
| `The TRT Failure: Why Injections Stop Working After 60 Days` | full transcript available | Likely strongest native language for injection-switcher pain and 60-day plateau stakes. | "Stops working after 60 days" appears in C&D risk bucket; use cautiously. |
| `The "Perfect" TRT Protocol: No Needles, No Side Effects` | full transcript available | Strongest title-level hook for no-needle angle. | Do not use "no side effects" as ad claim. |

## Next Research Pass

- Use `transcript_index.md` to search exact phrases before writing scripts.
- For clips selected for production, download the actual video with `yt-dlp` and run Gemini visual/audio transcription if we need visual action + on-screen caption detail.
- For ad scripting, pull Dr Jaquish's framing and stakes directly while applying the active C&D claim guardrails from `C&D Claims Risk Summary - Oral Only.md`. Keep the competitive edge through approved/core talking points, not through disputed or invented symptom/outcome claims.
