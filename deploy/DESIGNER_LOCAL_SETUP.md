# Reach Digital — Designer Local Setup

Use this when a designer already has the Hermes Desktop app and needs the Reach Digital vault + CLIs locally. This is the current recommended setup for one coworker helping organize/edit work: the vault is a normal GitHub repo, so everyone pulls the same files, edits locally, then pushes back.

## What this installs

- **Hermes profile**: `reach-digital` profile distribution from `TheProdigal95/hermes-profile`
- **Vault**: Obsidian vault at `~/Documents/reach-digital-hermes`
- **Node tools**: tools under `00 Global/Hermes/tools/`
- **Browser stack**: `agent-browser` plus local Camofox/Camoufox backend at `~/.hermes/profiles/reach-digital/camofox-browser` with `CAMOFOX_URL=http://localhost:9377`
- **Go CLIs**: `motion-pp-cli` and `clickup-pp-cli`, built from `TheProdigal95/printing-press`
- **Working directory**: profile `terminal.cwd` set to the vault so Hermes Desktop can read/edit the same files

Note: **Air CLI is not part of required onboarding.** If Hermes mentions `air-pp-cli` failing for `AIR_API_KEY` / `AIR_WORKSPACE_ID`, skip it for now and read [`AIR_CLI_STATUS.md`](AIR_CLI_STATUS.md).

## Before the call — Marce does this

1. Ask the designer for their GitHub username.
2. Give them push access to the vault repo:
   ```bash
   HOME=/Users/marce gh api -X PUT repos/TheProdigal95/vault/collaborators/<github_username> -f permission=push
   ```
3. Optional: if they will maintain tooling, also give push access to these. Most designers do **not** need this.
   ```bash
   HOME=/Users/marce gh api -X PUT repos/TheProdigal95/hermes-profile/collaborators/<github_username> -f permission=push
   HOME=/Users/marce gh api -X PUT repos/TheProdigal95/printing-press/collaborators/<github_username> -f permission=push
   ```
4. Have these ready to send privately if they do not have their own:
   - Gemini / Google AI Studio key: https://aistudio.google.com/apikey
   - FAL key: https://fal.ai/dashboard/keys
   - ClickUp personal API token instructions: ClickUp avatar → Settings → Apps → API → Personal API Token

## Coworker setup — run these on their Mac

Open **Terminal** and run each block in order.

### 1) Install command-line basics

```bash
xcode-select --install 2>/dev/null || true
```

If a popup appears, click **Install** and wait for it to finish.

If Homebrew is not installed:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Then install the basics:

```bash
brew install git gh node go ffmpeg yt-dlp python3
```

### 2) Log into GitHub so centralized edits can push

```bash
gh auth login
```

Pick:

1. `GitHub.com`
2. `HTTPS`
3. `Yes` to authenticate Git with GitHub credentials
4. Browser login

Verify:

```bash
gh auth status
git config --global credential.helper
```

### 3) Install/standardize Hermes CLI even if Desktop is already installed

Hermes Desktop is the chat surface. The CLI gives us profile install, config, and smoke-test commands.

```bash
curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash
export PATH="$HOME/.local/bin:$PATH"
hermes --version
```

### 4) Install the Reach Digital profile

```bash
hermes profile install github.com/TheProdigal95/hermes-profile --alias -y
```

If the profile already exists and you are refreshing it:

```bash
hermes profile install github.com/TheProdigal95/hermes-profile --alias --force -y
```

### 5) Clone the vault and CLI source

```bash
mkdir -p "$HOME/Documents"
git clone https://github.com/TheProdigal95/vault.git "$HOME/Documents/reach-digital-hermes"
git clone https://github.com/TheProdigal95/printing-press.git "$HOME/printing-press"
```

If either folder already exists, update instead:

```bash
git -C "$HOME/Documents/reach-digital-hermes" pull --ff-only
git -C "$HOME/printing-press" pull --ff-only
```

### 6) Point Hermes at the vault

```bash
hermes -p reach-digital config set terminal.cwd "$HOME/Documents/reach-digital-hermes"
```

This is the key Desktop step: the agent's file/terminal tools should start in the shared vault, not in a random home folder.

### 7) Provision browser stack + Node tools + Go CLIs

```bash
cd "$HOME/Documents/reach-digital-hermes"
bash "00 Global/Hermes/Scripts/setup.sh"
```

The script installs Camofox/Camoufox for Hermes browser tools, installs Node dependencies, builds `motion-pp-cli` and `clickup-pp-cli` into `~/go/bin`, sets `CAMOFOX_URL=http://localhost:9377` in the profile `.env`, and runs a smoke test.

After this step, fully quit/reopen Hermes Desktop so it picks up `CAMOFOX_URL`.

If Hermes cannot find the CLIs after this, add Go bin to shell PATH:

```bash
echo 'export PATH="$HOME/go/bin:$HOME/.local/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

### 8) Add auth/secrets

Run these in Terminal:

```bash
hermes auth add nous
```

Then edit the profile `.env`:

```bash
open -e "$HOME/.hermes/profiles/reach-digital/.env"
```

Add or fill in:

```bash
GOOGLE_API_KEY=...
FAL_KEY=...
```

ClickUp CLI auth:

```bash
clickup-pp-cli auth setup --launch
clickup-pp-cli auth set-token <PASTE_CLICKUP_PERSONAL_API_TOKEN>
clickup-pp-cli team --json --compact
```

Motion login is browser-cookie based. Only do this if they need Motion pulls:

```bash
cd "$HOME/Documents/reach-digital-hermes"
agent-browser --session motion --profile "00 Global/Hermes/tools/grab/motion-profile" --headed open https://projects.motionapp.com/login
motion-pp-cli doctor
```

### 9) Verify

```bash
bash "$HOME/.hermes/profiles/reach-digital/skills/reach-digital/reach-digital-ops/scripts/smoke-test.sh"
```

A few warnings are okay if they do not have FAL or Motion yet. For designer work, these must be green:

- `clickup-pp-cli on PATH`
- `motion-pp-cli on PATH` if they pull Motion
- `node`, `go`, `python3` on PATH
- vault path resolves to `~/Documents/reach-digital-hermes`

## Daily workflow for centralized edits

Use this before editing:

```bash
cd "$HOME/Documents/reach-digital-hermes"
git pull --ff-only
```

After editing files in Obsidian or Hermes Desktop:

```bash
cd "$HOME/Documents/reach-digital-hermes"
git status --short
git add <files-you-changed>
git commit -m "designer: update <brand/task>"
git push
```

If they prefer a GUI, use **GitHub Desktop** pointed at `~/Documents/reach-digital-hermes` for Pull / Commit / Push. Keep the terminal for the CLIs.

## What to tell Hermes Desktop after setup

Open Hermes Desktop, select/use the `reach-digital` profile, then try:

> List the active brands in the vault.

Then:

> Show me the current Comfort Ortho Wear T005 files and what still needs organizing.

For ClickUp-oriented design organization:

> Use the ClickUp CLI to show my latest Reach Digital tasks and group them by brand/status.

## Common fixes

| Symptom | Fix |
|---|---|
| `hermes: command not found` | `export PATH="$HOME/.local/bin:$PATH"`, then reopen Terminal. |
| `clickup-pp-cli: command not found` | Re-run setup script; then add `export PATH="$HOME/go/bin:$PATH"` to `~/.zshrc`. |
| `fatal: Authentication failed` on push | Re-run `gh auth login`, choose HTTPS + authenticate Git. |
| `Permission denied` on push | Marce needs to add them as a collaborator on `TheProdigal95/vault`. |
| Hermes edits the wrong folder | Re-run `hermes -p reach-digital config set terminal.cwd "$HOME/Documents/reach-digital-hermes"` and restart Desktop. |
| Browser/Camofox not working | Re-run `bash "00 Global/Hermes/Scripts/setup.sh"`, then fully quit/reopen Hermes Desktop. Check `curl http://localhost:9377/health`. |
| Motion auth fails | Re-run the `agent-browser --session motion ...` login and then `motion-pp-cli doctor`. |
