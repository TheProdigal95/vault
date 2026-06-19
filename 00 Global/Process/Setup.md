# First-Time Setup (New Coworker / Designer)

**Current recommended path:** follow `deploy/DESIGNER_LOCAL_SETUP.md`. It installs the Hermes profile, clones this vault, clones `printing-press`, builds the Go CLIs, installs Node dependencies, and configures Hermes Desktop to use the vault.

**Hermes-native recovery path:** Open Hermes Agent in the vault (`hermes -p reach-digital chat`) and say **"set me up"** or **"install dependencies"**. Hermes uses the `setup` skill to walk you through provisioning conversationally — handles missing brew/npm/go, prompts for API keys, runs OAuth, verifies with the smoke test.

**One-command provisioning** (run after cloning the vault, on a new machine, or after a wipe):
```bash
bash 00\ Global/Hermes/Scripts/setup.sh
```

The script is **idempotent** (safe to re-run), **cross-platform** (macOS via Homebrew, Linux via apt/dnf), and covers 10 phases: system deps, Camofox/Camoufox local browser backend, Node tool `npm install`s, Go CLI source clone/builds, API key validation, strategist identity, MCP server check, browser profile dirs, smoke test, and profile working-directory sync.

**Verify without changing anything:**
```bash
bash 00\ Global/Hermes/Scripts/setup.sh --check
```

**Help / all flags:**
```bash
bash 00\ Global/Hermes/Scripts/setup.sh --help
```

**On a fresh machine with nothing installed:** the script detects your OS + package manager. If Homebrew is missing on macOS, it prints the install command and stops cleanly so you can paste it in another terminal. If apt/dnf is missing on Linux, it tells you. The script never silently fails.

---

## What's Already in the Hermes Profile

The reach-digital profile at `~/.hermes/profiles/reach-digital/` ships pre-configured with everything you need. This reference documents what each component is, for troubleshooting and manual override.

### Provider auth (Nous + Gemini)

| Provider | Auth | How it's used |
|---|---|---|
| **Nous Portal** (OAuth) | `auth.json` token, auto-refreshes (~15 min TTL) | Main session model, web extract, compression, title gen, classification, QA |
| **Google AI Studio** (API key) | `GOOGLE_API_KEY` in `.env` | Vision, transcription (Gemini Flash) |
| **FAL.ai** (API key) | `FAL_KEY` in `.env` | Image gen, video animation (under `00 Global/Hermes/tools/fal-ai/`) |
| **ClickUp** (personal API token) | `~/.config/clickup-pp-cli/config.toml` → `auth_header` (real user home, NOT profile-scoped `$HOME`) | Go CLI for routine loading; MCP for ad-hoc reads |
| **ClickUp MCP** (OAuth 2.1 PKCE) | `auth.json` token, set 2026-06-09 | 51 tools enabled, browser-OAuth on first use |

### 14 reach-digital skills (auto-loaded / available)

In `~/.hermes/profiles/reach-digital/skills/reach-digital/`: `batch-planner`, `brand-researcher`, `brief-writer`, `clickup-load`, `creative-feedback-handoff`, `critique-orchestrator`, `grab-media`, `motion-top-spenders`, `reach-digital-ops`, `scoring-evaluator`, `script-writer`, `setup`, `sheets-tracker-sync`, `transcribe`. Copywriting must route through the right primary skill — `script-writer` for video scripts, `brief-writer` for statics, `critique-orchestrator` for QA — not ad hoc delegate prompts.

### Tools (`00 Global/Hermes/tools/`)

| Tool | Purpose | Install state |
|---|---|---|
| `motion-pp-cli` | Go CLI — pull top creatives, angles/formats/highlights | Built by setup; source `~/printing-press/library/motion`, binary `$HOME/go/bin/motion-pp-cli` |
| `clickup-pp-cli` | Go CLI — load briefs/scripts, footage requests | Built by setup; source `~/printing-press/library/clickup`, binary `$HOME/go/bin/clickup-pp-cli` |
| `gemini-api` | Node — video analysis, strategic breakdowns | Pre-installed, needs `npm install` per dir + `.env` |
| `Camofox/Camoufox` | Local anti-bot browser backend for Hermes browser tools | Setup clones `jo-inc/camofox-browser` into the profile, installs dependencies, writes `CAMOFOX_URL=http://localhost:9377`, and creates a macOS LaunchAgent |
| `site-scraper` | Node — whole-site crawl for Brand/Product Context | Pre-installed + Playwright Chromium |
| `fal-ai` | Node — NanoBanana 2 image gen, Kling video animation | Pre-installed, needs `FAL_KEY` in `.env` |
| `ad-classifier` | Node — text-only Meta ad classification + angle dedup | Pre-installed |
| `endcard-generator` | Node — end card composition + visual comparison | Pre-installed |
| `persona-counter` / `review-sampler` | Node — persona discovery | Pre-installed |

For each Node tool: `cd 00\ Global/Hermes/tools/<name> && npm install`. Setup also installs the Camofox browser backend from `https://github.com/jo-inc/camofox-browser.git` into `~/.hermes/profiles/reach-digital/camofox-browser` and sets `CAMOFOX_URL=http://localhost:9377` in the profile `.env`; restart Hermes Desktop after that env change. For Go CLIs: setup clones `https://github.com/TheProdigal95/printing-press.git` to `~/printing-press` if missing, then builds `~/printing-press/library/motion/cmd/motion-pp-cli` and `~/printing-press/library/clickup/cmd/clickup-pp-cli` into `$HOME/go/bin/`.

### Strategist identity

`00 Global/Hermes/strategist.json` stores your name and ClickUp user ID. Format: `{ "name": "Your Name", "clickup_id": "12345678" }`. Used by:
- `clickup-pp-cli` for task assignment (CLI walks up looking for `00 Global/Hermes/`)
- Hermes for session detection (the profile auto-detects the strategist)

### Obsidian (`.obsidian/` is gitignored, configured per-strategist)

- **Theme:** Minimal
- **Plugins (4):** obsidian-minimal-settings, obsidian-style-settings, obsidian42-brat, agent-client
- **agent-client:** Hermes Agent chat UI inside Obsidian, uses `claude-agent-acp` as the ACP adapter
- **CSS snippets (2):** `hide-terminal-ai-buttons`, `terminal-ai-darker-bg`
- **Appearance:** Dark mode + Minimal theme + both snippets

### MCP servers

Configured in `~/.hermes/profiles/reach-digital/config.yaml` under `mcp_servers:`:

| Server | URL | Status |
|---|---|---|
| ClickUp | `https://mcp.clickup.com/mcp` | **Configured** (OAuth 2.1 PKCE, 51/51 tools enabled) |
| Google Drive | `npx @piotr-agier/google-drive-mcp` | Add manually (OAuth required) |

> Notion is **deprecated** — no longer wired into Hermes. Don't add the MCP server.

**Google Drive** — create OAuth credentials at Google Cloud Console, save to `~/.config/google-drive-mcp/gcp-oauth.keys.json`, then add the `google_drive:` block to `config.yaml` (template in the config docs).

All OAuth-based servers prompt for browser login on first use in Hermes.

### Interactive logins (one-time, via agent-browser)

| Service | Profile path | When needed |
|---|---|---|
| **Motion** | `00 Global/Hermes/tools/grab/motion-profile` | Required for `/motion-pull` |
| **Trustpilot** | `00 Global/Hermes/tools/review-sampler/profiles/trustpilot` | Optional — unlimited review pagination |
| **Amazon** | `00 Global/Hermes/tools/review-sampler/profiles/amazon` | Required for Amazon review scraping |

Example: `agent-browser --session motion --profile 00\ Global/Hermes/tools/grab/motion-profile --headed open https://projects.motionapp.com/login`. If a session expires, the relevant tool returns an auth-required error — just rerun the login.

### Optional: Pinokio MLX (local transcription, macOS only)

Free, offline speech-to-text via MLX Whisper. Without it, `/transcribe` uses the Gemini API (works fine, uses credits). Download Pinokio, search "MLX Video Transcription", install. Done.

---

## Troubleshooting

**`command not found` for a tool:** Run the smoke test to see which CLI/binary is missing. Install via brew (most are on `/opt/homebrew/bin/`) or `go install` for Go CLIs.

**Hermes can't find a CLI on PATH:** Check `~/.hermes/profiles/reach-digital/home/.bashrc` — `$HOME`-relative PATH entries expand wrong inside the profile-scoped shell. Hardcode the absolute path.

**ClickUp tool IDs stale:** Update `team_to_clickup.json` at the vault root and rebuild `~/printing-press/library/clickup/`.

**Smoke test reports failures:** Run `bash ~/.hermes/profiles/reach-digital/skills/reach-digital/reach-digital-ops/scripts/smoke-test.sh` and inspect which check failed.

**Motion login expired:** Re-run the Motion login (see above). Cookies refresh automatically.

**Plugin not showing in Obsidian:** Restart Obsidian (Cmd+Q → reopen). Check that `community-plugins.json` lists the plugin ID.

**Agent Client shows "authentication required":** Re-link via `hermes auth refresh` in the terminal, then restart Obsidian.

**Go CLI missing and no printing-press directory:** Re-run `bash 00\ Global/Hermes/Scripts/setup.sh`. It clones `TheProdigal95/printing-press` and builds both CLIs into `$HOME/go/bin/`. If the binary exists but Hermes cannot find it, add `export PATH="$HOME/go/bin:$HOME/.local/bin:$PATH"` to `~/.zshrc` and restart Hermes Desktop.

**Google Drive MCP OAuth fails:** Make sure `~/.config/google-drive-mcp/gcp-oauth.keys.json` exists with valid credentials. Run `npx @piotr-agier/google-drive-mcp auth` to re-authenticate.
