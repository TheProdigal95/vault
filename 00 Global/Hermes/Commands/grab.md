# Grab Ad Media from URLs

Download video/image media and extract metadata (ad copy, duration, uploader) from social platform URLs. Uses yt-dlp + agent-browser — no API keys required.

**Setup:** See `00 Global/Process/Setup.md`. Requires yt-dlp, ffmpeg, agent-browser, and a one-time Motion login.

## When to use

Whenever the user provides one or more URLs from ad platforms and wants to analyze, download, or discuss the creative. If the user pastes URLs with analysis intent (raw notes, "analyze these," "top spenders"), grab the media AND proceed to Gemini analysis automatically.

## Supported platforms

| Platform | Auth | Notes |
|---|---|---|
| YouTube | None | Best supported |
| TikTok | None | If it fails, update yt-dlp (`yt-dlp -U`) |
| Direct .mp4/.jpg URLs | None | Downloads via curl |
| **Motion (individual)** | One-time browser login | agent-browser opens the creative page, extracts media URL from DOM |
| **Motion (report batch)** | One-time browser login | Paste the authenticated report URL (`/top/` page) + ad names from CSV → downloads all creatives (images + videos) in one pass. Verified 12/12 on Elevate. |
| Meta Ad Library | N/A | Use `/ad-library` command instead |
| Twitter/X, Facebook, Instagram | **Not supported** | These platforms block automated browsers. Download manually and provide the file path. |

## How to run

All commands use paths relative to the project root. Claude Code runs from the vault directory.

**Single URL:**
```bash
node 00 Global/Hermes/tools/grab/grab.js "URL_HERE"
```

**Multiple URLs:**
```bash
node 00 Global/Hermes/tools/grab/grab.js "URL1" "URL2" "URL3"
```

**Motion report batch mode (Top Spenders workflow):**
```bash
# Download ALL creatives from a Motion report page
node 00 Global/Hermes/tools/grab/grab.js "MOTION_REPORT_URL"

# Download only specific ads (matched by name from CSV)
node 00 Global/Hermes/tools/grab/grab.js "MOTION_REPORT_URL" --ad-names "Ad Name 1" "Ad Name 2" "Ad Name 3"
```

## What it produces

For yt-dlp sources: `Uploader - VideoID.mp4` + `.info.json` (metadata with ad copy in `description` field) + `.jpg` thumbnail.

For Motion: `AdName.mp4` or `AdName.jpeg`, named by the ad name from the report table. Each result includes a **Preview URL** — a public CDN link (Azure Blob Storage) that anyone can open in a browser to view the media file.

For scripts, briefs, and analysis docs, use the Motion creative-page URL (`https://projects.motionapp.com/.../creative/<CreativeAsset:id>?startDate=...`) as the reference link whenever available. The CDN preview URL is for media inspection/download, not the canonical reference. The media asset ID in the CDN URL can differ from the Motion `CreativeAsset` ID; extract the creative-page ID from Motion's report/cache or the "Copy link" creative page, not from the CDN filename.

All files go to `00 Global/Hermes/tools/grab/downloads/session-<datetime>/`.

## Video analysis format (4-column table)

**Every video ad MUST produce a 4-column markdown table:**

```
| Timestamp | Visual Action | Voiceover | On-Screen Captions |
|-----------|---------------|-----------|--------------------|
| 00:00-00:03 | Description | Exact words spoken | EXACT TEXT ON SCREEN |
```

**Gemini prompt for video analysis:**
```bash
node 00 Global/Hermes/tools/gemini-api/gemini-api.js "Please watch the attached video, and convert it into a script with 4 columns. Format as a markdown table with columns: | Timestamp | Visual Action | Voiceover | On-Screen Captions |

Rules:
- Capture EVERY scene transition, shot change, and visual element
- Transcribe EVERY spoken word exactly as said
- Capture EVERY piece of on-screen text (captions, overlays, titles, lower thirds)
- Use timestamp ranges (00:00-00:03, not just 00:00)
- Each row = one distinct scene or shot (typically 1-3 seconds per row)
- Be thorough — do not summarize or skip sections" --video /path/to/video.mp4
```

**For images (static ads),** describe: visual layout, all on-screen text, style, key message, CTA.

## Top spenders workflow

1. **Motion report URL provided:** Extract ad names from the CSV table, run `node 00 Global/Hermes/tools/grab/grab.js "REPORT_URL" --ad-names "Ad 1" "Ad 2" ...`
2. **Individual URLs provided:** Run `node 00 Global/Hermes/tools/grab/grab.js "URL1" "URL2" ...`
3. **Check what actually downloaded.** Only proceed with analysis for files that exist on disk. If some ads failed to download, tell the user which ones failed — do NOT fabricate analysis for them.
4. **For each downloaded video:** Run Gemini 4-column analysis + strategic analysis (hook, structure, persuasion techniques, visual style, caption style, close, what makes it work)
5. **For each downloaded image:** Run Gemini visual description (layout, text, style, CTA)
6. **Merge** user's raw notes + Gemini output into the Top Spenders Analysis doc. Only include Gemini analysis for ads you actually downloaded and analyzed. For failed downloads, note "Download failed — not analyzed" in the doc.
7. **Delete all media after analysis is saved:** `rm -rf 00 Global/Hermes/tools/grab/downloads/session-*`

## CRITICAL: Never fabricate analysis

**If a download fails, do NOT invent or guess what the ad looks like.** Do not write visual descriptions, hook analyses, script breakdowns, or persuasion technique analyses for ads you don't have the actual media file for. The user's raw notes may describe the ad, but Gemini analysis requires the actual file. Say "Download failed — could not analyze" and move on. Making up analysis is worse than having a gap.

## Cleanup rule

**Always delete downloaded media after analysis is saved.** Videos are 50-500MB each. The original platform link is the permanent reference.

## Troubleshooting

| Error | Fix |
|---|---|
| `yt-dlp is not installed` | See `00 Global/Process/Setup.md` |
| TikTok fails | Update yt-dlp: `yt-dlp -U` |
| Motion: `MOTION_LOGIN_REQUIRED` | See `00 Global/Process/Setup.md`, Step 2 |
| Motion: `agent-browser not installed` | `npm install -g agent-browser && agent-browser install` |

## Motion setup

Motion cookies persist in a Chrome profile at `~/.reach-digital/motion-profile/` (user's home directory — not shared, per-user auth).

**When grab.js returns `MOTION_LOGIN_REQUIRED`:**
1. Tell the user: "Motion needs a one-time login. I'm opening a browser."
2. Kill stale daemons and open headed browser:
   - macOS/Linux: `pkill -f agent-browser 2>/dev/null; sleep 1; agent-browser --session motion --profile ~/.reach-digital/motion-profile --headed open https://projects.motionapp.com/login`
   - Windows: `agent-browser --session motion --profile "$env:USERPROFILE\.reach-digital\motion-profile" --headed open https://projects.motionapp.com/login`
3. **Wait for user to confirm login.** Do NOT proceed until they say so.
4. Close the browser: `agent-browser --session motion close`
5. Retry the grab command.
