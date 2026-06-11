# Hermes Migration Remediation Log — 2026-06-11

Record of every change made during the post-migration audit + fix pass, for Hermes to
double-check internal consistency. Three locations were touched:

1. **VAULT** — `~/Documents/reach-digital-hermes/` (git-tracked; changes NOT committed)
2. **LIVE PROFILE** — `~/.hermes/profiles/reach-digital/` (NOT git-tracked; changes are live)
3. **DEPLOY PROFILE** — `~/hermes-profile/` (git repo; changes NOT committed)

> **Pre-existing changes that are NOT mine** (leave them alone / don't attribute to this pass):
> Vault modified: `00 Global/Process/Air API.md`, `00 Global/Process/Sheets Integration.md`,
> `00 Global/Hermes/Commands/clickup-load.md`. Vault untracked: the Elevate T006 + Lifeforce T005
> docs and `00 Global/Hermes/Commands/sheets-tracker-sync.md`. These were already in the working tree.

---

## FAST VERIFICATION (run these first)

```bash
# 1. End-to-end machine health — expect "passed: 18  failed: 0  warned: 0"
bash ~/.hermes/profiles/reach-digital/skills/reach-digital/reach-digital-ops/scripts/smoke-test.sh

# 2. Memory (Hindsight) round-trip — expect a started daemon + a recalled memory
HOME=~/.hermes/profiles/reach-digital/home PATH="$HOME/.local/bin:$PATH" \
  ~/.hermes/hermes-agent/venv/bin/hindsight-embed -p reach-digital daemon start
HOME=~/.hermes/profiles/reach-digital/home \
  ~/.hermes/hermes-agent/venv/bin/hindsight-embed -p reach-digital memory recall reach-digital "process log"

# 3. AGENTS.md under the 20k context cap — expect a number < 20000
python3 -c "print(len(open('$HOME/Documents/reach-digital-hermes/AGENTS.md').read()))"

# 4. No capital Tools/ left in commands — expect no output
grep -rl "Hermes/Tools" "$HOME/Documents/reach-digital-hermes/00 Global/Hermes/Commands/"

# 5. Tool source is now committable, secrets still ignored — expect ~92 + IGNORED
git -C "$HOME/Documents/reach-digital-hermes" ls-files --others --exclude-standard "00 Global/Hermes/tools/" | wc -l
git -C "$HOME/Documents/reach-digital-hermes" check-ignore "00 Global/Hermes/tools/gemini-api/.env" && echo IGNORED
```

---

## 1. MEMORY / HINDSIGHT  (live profile — was completely non-functional)

**Problem:** the embedded daemon crash-looped on `LLM API key is required` and launched under the
wrong profile name (`hermes` instead of `reach-digital`). Root cause: `hindsight/config.json` had no
`"profile"` key (defaults to `hermes`, which read a 3-char placeholder env). No memory bank had ever
been written.

| File | Change |
|---|---|
| `~/.hermes/profiles/reach-digital/hindsight/config.json` | Added `"profile": "reach-digital"` and `"llm_api_key": <real OpenRouter key>`. Backup at `config.json.bak-before-memory-fix`. |
| `~/.hermes/profiles/reach-digital/home/.hindsight/profiles/reach-digital.env` and `hermes.env` | Rewrote to the correct daemon format: `HINDSIGHT_API_LLM_PROVIDER=openai` (OpenRouter uses OpenAI wire format), real key, model `qwen/qwen3.5-9b`, base_url openrouter, idle 300. |

**Why `openai` not `openrouter`:** Hermes' `_build_embedded_profile_env` maps `openrouter`→`openai`
wire format for the daemon. The old env files had `openrouter` (wrong) + an empty key.
**Verify:** daemon starts clean, `bank list` shows `reach-digital`, retain→recall round-trips
(proven during the pass). DB now at `~/.hermes/profiles/reach-digital/home/.pg0/instances/hindsight-embed-reach-digital`.
**Note:** the daemon idle-times-out after 300s; Hermes auto-restarts it on next memory use because
the config is now correct.

---

## 2. TOOLS LAYER  (vault — was deploy-breaking + a data-loss trap)

**Problem:** real dir is lowercase `00 Global/Hermes/tools/`; it was **gitignored** (zero tool code
committed); every command referenced capital `Tools/` (works only on case-insensitive macOS); and
`.gitignore` + the migration commit called the only copy a "stale duplicate, safe to `rm -rf`".

| File | Change |
|---|---|
| `.gitignore` | Removed the blanket `00 Global/Hermes/tools/` ignore **and** the dangerous `rm -rf` comment. Added targeted ignores (`tools/**/data/`, `**/downloads/`, `**/renders/`). Un-ignored lockfiles (`package-lock.json` etc.). Removed dead `.claude/...` lines. Repointed the endcard-render ignore to `00 Global/Hermes/tools/...`. Result: tool **source** is now tracked (~92 files); `.env`, `node_modules/`, and the 1.2 GB `data/` stay ignored. |
| 8 command files (`ad-library, creative-image, generate-endcard, generate-static, grab, motion-pull, research-brand, transcribe`).md | `Hermes/Tools/` → `Hermes/tools/` (lowercase). `~/00 Global/...` → project-relative `00 Global/...` (the `~/00 Global` form never resolved). |
| `00 Global/Hermes/tools/grab/grab.js` | Motion Chrome-profile path moved off the dead `~/.claude/tools/grab/motion-profile` → `~/.reach-digital/motion-profile` (unix + Windows variants). Matching docs in `grab.md` / `motion-pull.md` updated. |
| `00 Global/Hermes/tools/gemini-api/gemini-api.js` | `getClient()` now falls back to `GOOGLE_API_KEY` if `GEMINI_API_KEY` is unset. |
| `00 Global/Hermes/tools/add_to_canvas.js` | **Restored** (was dropped in the migration; `creative-image.md` calls it). Copied from the original vault. |
| `00 Global/Hermes/tools/{ad-classifier,endcard-generator,gemini-api}/.env.example` | **Created** (key-name templates so a fresh clone can scaffold its `.env`). |

**Verify:** FAST checks #4 and #5 above; `git ls-files "00 Global/Hermes/tools/" | head`;
`node "00 Global/Hermes/tools/gemini-api/gemini-api.js" "Reply ok" --model gemini-3.1-flash-lite`.

---

## 3. INSTRUCTIONS & CRITERIA  (vault + both profiles)

**AGENTS.md was 30,863 chars — over Hermes' 20k context-file cap — so its middle third was being
silently truncated every session.** The agency voice belonged in SOUL.md (which was the empty default).

| File | Change |
|---|---|
| `~/Documents/reach-digital-hermes/AGENTS.md` | Restructured to **18,136 chars** (190 lines). Moved voice/principles to SOUL.md; removed the Notion section; rewrote Claude-Code "dispatch the sub-agent" language → Hermes skill/`delegate_task` reality; fixed `Tools/`→`tools/`; fixed the broken gemini-api `cp ~/00 Global/...` setup note; corrected the Process-Log line to per-batch. |
| `~/.hermes/profiles/reach-digital/SOUL.md` **and** `~/hermes-profile/SOUL.md` | Written + **synced**. Merged the creative-work voice (identity / style / avoid / defaults from the old Collaboration Principles) with the richer team-specific persona that already existed in the deploy profile (pitfalls: don't color Sheets cells, don't wrap app.air.inc, config files are write-blocked, work in `~/Documents` not iCloud). Fixed its `Tools/`→`tools/` bug and skill count (now 11). |
| `00 Global/Process/Batch Template.md` | Process Log now **starts fresh each batch** (was "compounds / running record" — the opposite of your decision). 2 edits: the template placeholder + the carry-forward paragraph (carry Script Criteria + Context Files, NOT the Process Log). |
| `00 Global/Criteria/Video Script Criteria.md` | Added **"Preserve strategist-drafted hooks"** rule (re-homed from a lost feedback memory). |
| `00 Global/Criteria/Creative Image Ad Criteria.md` | Added **"Primary text is out of scope for image-generation briefs"** rule (re-homed lost feedback memory — write primary text once, skip the scoring loop on it). |

**Re-homed memories:** the 4 original `.claude` feedback notes → Rule 1 (hooks) into Video Script
Criteria, Rule 2 (image-brief primary text) into Creative Image Ad Criteria, Rule 3 (per-batch
Process Log) into Batch Template + AGENTS.md, Rule 4 (brief-writer pipeline) folded into the
scoring-evaluator skill + AGENTS.md routing.
**Verify:** FAST check #3; `grep -n "starts empty each batch" "00 Global/Process/Batch Template.md"`;
`grep -ni "preserve strategist-drafted hooks" "00 Global/Criteria/Video Script Criteria.md"`.

---

## 4. NOTION DEPRECATION  (vault — per decision: drop it)

| File | Change |
|---|---|
| `00 Global/Process/Setup.md` | Removed the Notion MCP table row + the "add to config.yaml" block; left a "Notion is deprecated" note. |
| `00 Global/Process/System Overview.md` | Removed the Notion integration row; marked the "Creative References Database (Notion)" section deprecated. |
| `00 Global/Hermes/Scripts/setup.sh` | Phase-6 comment no longer promises Notion steps. |
| `00 Global/Process/Notion Integration.md` | Added a `⚠️ DEPRECATED (2026-06-11)` banner at the top (kept the page IDs for reference). |
| `AGENTS.md` | Notion section removed (see §3). |

Notion mentions inside the criteria docs' optional "References Database" conventions were left in place
(not wired, not auto-used). **Verify:** `grep -rn "mcp_servers" config.yaml` shows only ClickUp.

---

## 5. SKILLS  (live profile)

| Path | Change |
|---|---|
| `skills/reach-digital/scoring-evaluator/SKILL.md` | **Created.** Rebuilds the lost 7-dimension static-brief scoring engine (the rubric files survived but nothing executed them). Reads the 7 rubrics in `00 Global/Statics Generator/Scoring Agents/` + criteria, scores 0-100 with Copy-Editor veto, iterates to 90+. Notes the Hermes constraint: runs inline or as a single depth-1 delegate (nested delegation is blocked by `max_spawn_depth: 1`). |
| `skills/reach-digital/script-writer/SKILL.md` | Added a "branch by deliverable" note: static briefs run the `scoring-evaluator` skill, not the video 19-point checklist (the skill claimed to write briefs but its QA was video-only). |
| `skills/reach-digital/reach-digital-ops/scripts/smoke-test.sh` | Fixed the Gemini check path (`.claude/tools` → `00 Global/Hermes/tools`); made the Gemini call work without GNU `timeout` (macOS has none) + case-insensitive reply match; fixed the Motion check to read stderr (success message goes there). Now reports 18/0/0. |
| `skills/.archive/brand-tracker-sync/` | **Moved** here from the skills root — it collided with the canonical `sheets-tracker-sync` on triggers. Its scripts (`add_batch_to_sheet.py`, `fetch_brand_tasks.py`) are preserved in the archive. **Open decision:** `sheets-tracker-sync` does not yet reimplement the sheet-WRITE step — decide whether to port `add_batch_to_sheet.py` (with the don't-overwrite rule) or keep adding batches by hand. |
| `skills/reach-digital/*` (SKILL.md + references) | Bulk path fixes: `Hermes/Tools`→`Hermes/tools`, `~/00 Global`→`00 Global`, motion-profile path. |
| `00 Global/Hermes/Commands/generate-static.md` | Step 6 "spawn scoring-evaluator" → "invoke the `scoring-evaluator` skill (inline or single depth-1 delegate)". |
| `00 Global/Process/Setup.md` | "8 reach-digital skills" → "11" with the correct list (adds `scoring-evaluator`, `setup`, `sheets-tracker-sync`). |
| `~/.hermes/profiles/reach-digital/.env` | Added `GEMINI_API_KEY` aliased from `GOOGLE_API_KEY` (tools read `GEMINI_API_KEY`; profile only had `GOOGLE_API_KEY`). |

**Verify:** all 11 skill SKILL.md files parse with a `name:`; `scoring-evaluator` present;
`brand-tracker-sync` not in the active path. (The `.skills_prompt_snapshot.json` was cleared so Hermes
re-scans on next session.)

---

## 6. DEPLOY KIT  (vault `deploy/` + `~/hermes-profile/`) — for the future VPS, not run yet

| File | Change |
|---|---|
| `deploy/onboard-user.sh` | Removed the invalid `--yes` flag on `hermes profile create`; after `--clone`, scrub the cloned `.env` values (so the source machine's keys don't leak into teammates' profiles); fixed the SSH snippet to **flat** `terminal.ssh_host/ssh_port/ssh_user` (Hermes ignores nested `terminal.ssh.host`); fixed the undefined `$REPO_ROOT` final line. |
| `deploy/sample-config/local-hermes-config.yaml.template` | Same nested→flat SSH key fix. |
| `deploy/vps-provision.sh` | Added the media/browser stack to Phase 7: `ffmpeg`, `yt-dlp`, `agent-browser`, `claude-agent-acp`, `playwright chromium` (+ `python3-venv`), all guarded so one failure can't abort the hardened run. Noted MLX is Apple-only (VPS uses Gemini transcription). |
| `deploy/deploy-stack.sh` | `Hermes/Tools`→`Hermes/tools`; added a post-install note that Hindsight needs an OpenRouter key per profile + downloads its embedding model on first use. |
| `~/hermes-profile/config.yaml` | `memory.provider: ''` → `hindsight` (deploy now configures memory). |
| `~/hermes-profile/hindsight/config.json` | **Created** (no key — `profile`, bank, mode, model only; the per-user key comes from each `.env`). |
| `~/hermes-profile/skills/reach-digital-ops/scripts/smoke-test.sh` | Portable `REAL_USER_HOME` (`eval echo ~$(id -un)` instead of hardcoded `/Users/marce`), VPS vault fallback (`/opt/reach-digital/vault`), `$HOME` assertion uses the detected home, `.claude/tools`→`tools`. |

**Deploy items still open (deferred — not on the VPS yet):** the deploy-copy smoke-test still has the
old `timeout`/Motion-detection bugs and an older ClickUp check than the live one (sync before
provisioning); `~/hermes-profile` has no git remote (push it before the team can clone); VPS
docker-hardening (`terminal.backend: docker`, `tirith_fail_open: false`) is your call.

---

## 7. NOT DONE (by decision)

- **Animation/HyperFrames skill stack (13 skills)** — intentionally left unported.
- **Tracker auto-write** — archived `brand-tracker-sync`; awaiting your decision (see §5).
- **Security** — `SUDO_PASSWORD` left in place per your instruction; the cleartext `GOOGLE_API_KEY`
  in the profile `.env` is unchanged (rotate at your discretion).

---

## COMMIT STATUS

Nothing is committed. The vault has 27 files I modified + the newly-trackable `tools/` tree (~92 files)
+ 4 new files (`add_to_canvas.js`, 3 `.env.example`). The `~/hermes-profile` repo has 4 changes
(SOUL.md, config.yaml, smoke-test.sh, new `hindsight/`). The live profile changes are already active on
disk (not git-tracked).
