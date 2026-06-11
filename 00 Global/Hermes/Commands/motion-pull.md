# Motion Pull — Top Creatives from Motion API

Pull structured top-spender data directly from the Motion GraphQL API and store it in a local SQLite history for delta tracking, trend analysis, and longitudinal creative performance.

**Binary:** `$HOME/go/bin/motion-pp-cli` (always call by absolute path — do not rely on bare `motion-pp-cli` in PATH)

**Auth:** Motion uses cookie-based browser sessions. The CLI uses the Surf transport which reads the Chrome profile at `~/.reach-digital/motion-profile/` — the same profile grab.js uses. If auth fails, run a one-time Motion login via grab.js first (see `00 Global/Process/Setup.md`).

---

## When to use

Use this command whenever the user wants to pull top spenders from Motion, start an ads analysis, or build a creative breakdown — **instead of the old CSV + grab.js DOM scrape workflow**. This gives you structured JSON with metrics and CDN URLs directly.

Triggers:
- "pull the top spenders from Motion"
- "pull [Brand]'s top creatives" / "pull [Brand]'s Motion data"
- "run ads analysis for [Brand]" / "let's do the ads analysis for [Brand]"
- "what are the top creatives for [Brand]?"
- "pull the Motion report for [Brand]"
- "get the top 20 for [Brand]"
- Any request to start a new batch that implies pulling current performance data first

---

## Core commands

### Pull top creatives

```bash
# Pull metrics only (no media)
$HOME/go/bin/motion-pp-cli pull --brand "lifeforce"

# Pull + download all media via CDN URLs (default output: ./motion-downloads/)
$HOME/go/bin/motion-pp-cli pull --brand "lifeforce" --download

# Pull + download to a specific folder
$HOME/go/bin/motion-pp-cli pull --brand "lifeforce" --download --output-dir "[Brand]/00 Assets/Statics/"

# Pull top 20
$HOME/go/bin/motion-pp-cli pull --brand "lifeforce" --top 20 --download

# Pull a specific date range without changing the Motion report
$HOME/go/bin/motion-pp-cli pull --brand "lifeforce" --date-preset last_7d --top 20 --download
$HOME/go/bin/motion-pp-cli pull --brand "lifeforce" --date-preset custom --start-date 2026-05-19 --end-date 2026-05-26 --top 20 --download

# If multiple reports exist, name the one you want
$HOME/go/bin/motion-pp-cli pull --brand "lifeforce" --report-name "Top 30 Day" --download

# JSON output for downstream processing
$HOME/go/bin/motion-pp-cli pull --brand "lifeforce" --top 20 --json
```

Resolution order:
1. `Bootstrap()` → org ID
2. `QueryOrganizationWorkspaces` → fuzzy-match brand name (exact → prefix → contains)
3. `WorkspaceFoldersAndReports` → filter to TopReportV2 type → fuzzy-match report name
4. If brand or report is unambiguous (only one match), auto-selects — no flags needed
5. If multiple top reports exist and one is exactly named `Top creatives`, auto-selects `Top creatives`

Date range:
- Use `--date-preset last_7d` for L7 pulls. Use `--date-preset custom --start-date YYYY-MM-DD --end-date YYYY-MM-DD` for exact windows.
- Prefer `pull` with date flags over raw `insights`. `insights` is a low-level endpoint wrapper and requires a full request body; `pull` resolves workspace/report IDs and fills the Motion report config automatically.

Each pull is stored to a local SQLite history at `~/.local/share/motion-pp-cli/motion-pp-cli.db`.

`--download` curls each CDN URL (Azure Blob Storage) directly in Go — no grab.js, no browser. Files are named `{rank:02d}_{creative_name}.{ext}`. Pass CDN URLs to Gemini analysis after download.

The CLI constructs **Motion share links** from each creative's asset ID, organization ID, and workspace ID. These share links are the canonical reference format for scripts, briefs, and analysis docs — they are permanent, shareable, and don't require authentication. CDN/Azure Blob URLs are for download and analysis only; never use them as permanent references (they may expire).

---

### Angles — messaging angle performance

```bash
# Which angles are dominating spend vs underperforming
$HOME/go/bin/motion-pp-cli angles --brand "lifeforce"
$HOME/go/bin/motion-pp-cli angles --brand "lifeforce" --report-name "Top 30 Day"
$HOME/go/bin/motion-pp-cli angles --brand "lifeforce" --json
```

Output: angle name, spend %, total spend, ROAS, CTR, ad count — sorted by spend share. Use **before batch planning** to pick which angles are worth briefing. Replaces manually inferring angles from reading top spenders.

---

### Formats — visual format trends

```bash
# Which formats are scaling vs declining
$HOME/go/bin/motion-pp-cli formats --brand "lifeforce"
$HOME/go/bin/motion-pp-cli formats --brand "lifeforce" --json
```

Output: format name, trend direction, spend %, total spend, ROAS, CTR — scaling formats shown first. Use **before batch planning** to decide which structures to brief.

---

### Highlights — Motion's AI signals

```bash
# What to scale, what to fix
$HOME/go/bin/motion-pp-cli highlights --brand "lifeforce"
$HOME/go/bin/motion-pp-cli highlights --brand "lifeforce" --opportunities-only
$HOME/go/bin/motion-pp-cli highlights --brand "lifeforce" --highlights-only
```

Output: HIGHLIGHTS (scale these) and OPPORTUNITIES (fix or test these) sections with signal label, creative name, and metrics. Use **at end-of-batch** when deciding what to carry forward vs kill.

---

### Delta — what changed since last pull

```bash
# What's new, dropped, or shifted since the last pull for this workspace/report
$HOME/go/bin/motion-pp-cli delta --workspace-id <id> --report-id <id>
```

Shows NEW / DROPPED / ↑ / ↓ / = status column. Requires at least two pulls in history.

---

### History — longitudinal view for one creative

```bash
# Track a creative's rank and metrics across all pulls
$HOME/go/bin/motion-pp-cli history --name "creative name fragment"
$HOME/go/bin/motion-pp-cli history --name "creative name fragment" --workspace-id <id>
```

---

### Stale — top spenders losing steam

```bash
# Creatives that were top-N three weeks ago but dropped out
$HOME/go/bin/motion-pp-cli stale
$HOME/go/bin/motion-pp-cli stale --weeks 4 --top 10
```

---

## Typical ads analysis flow

**Before batch planning (what to brief):**
1. `angles --brand [brand]` — see which angles have budget behind them
2. `formats --brand [brand]` — see which structures are scaling
3. `pull --brand [brand] --top 20 --download --output-dir "[Brand]/02 Ads Analysis/media"` — pull metrics + download media
4. Run Gemini analysis on the downloaded files

**End of batch (what to carry forward):**
1. `highlights --brand [brand]` — Motion's AI flags what to scale and what to fix
2. `delta --workspace-id <id> --report-id <id>` — what shifted since last pull
3. `stale` — creatives that were top-N weeks ago but dropped out

Use `/grab` only for YouTube, TikTok, or other non-Motion URLs.

---

## Auth troubleshooting

If you get a 401 / redirect to login:
1. The Motion Chrome profile may need a fresh login session
2. Run: `node 00 Global/Hermes/tools/grab/grab.js "https://app.motionapp.com"` (or any Motion URL) — this opens the browser, you log in once, and the session is saved to the profile
3. Retry the motion-pp-cli command

---

## Updating the binary

The source lives at:
```
~/printing-press/.runstate/runs/20260518-153345/working/motion-pp-cli/
```

To rebuild after changes:
```bash
go build -C "$HOME/printing-press/.runstate/runs/20260518-153345/working/motion-pp-cli" \
  -o "$HOME/go/bin/motion-pp-cli" ./cmd/motion-pp-cli
```
