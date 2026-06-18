# Reach Digital — Team Deployment

This directory has the scripts and docs for deploying the Reach Digital Hermes stack to the team. The model: **one VPS hosts everything, each team member installs the Hermes app on their Mac and SSHes into the VPS for the heavy lifting**.

## What's in this directory

| File | What it does |
|---|---|
| `vps-provision.sh` | Hardens a fresh Ubuntu VPS, installs Docker, Node, Go, fail2ban, UFW, unattended-upgrades. Run once. |
| `deploy-stack.sh` | Clones the 3 repos, builds the Go CLIs, installs Node deps, installs the Hermes profile. Run once after `vps-provision.sh`. |
| `onboard-user.sh` | Adds a new team member (creates their Hermes profile, registers their SSH key, generates their local-app config snippet). Run once per person. |
| `restore.sh` | Re-provisions a VPS that was restored from a Hetzner/DO snapshot. Run if the VPS dies. |
| `README.md` | This file. |
| `ONBOARDING.md` | 1-page doc the team reads. |
| `HANDOFF.md` | The 5-step checklist YOU (the deployer) run. |

## The 5-layer deployment model

This is the full picture. The deploy scripts in this directory implement it.

| Layer | What | Where it lives | Mechanism |
|---|---|---|---|
| 1. **Hermes Agent** | The chat framework | Each team member's Mac | One-liner: `curl -fsSL https://hermes-agent.nousresearch.com/install.sh \| bash` |
| 2. **Reach Digital profile** | 9 skills + MCP + config | The VPS, in `~/.hermes/profiles/reach-digital/` | `hermes profile install <repo>` from the hermes-profile repo |
| 3. **The Obsidian vault** | Brand docs, T-batch files, Node tools | The VPS, at `~/Documents/reach-digital-hermes/` | `git clone` from the vault repo |
| 4. **printing-press** | The Go CLIs (`motion-pp-cli`, `clickup-pp-cli`) | The VPS, at `~/printing-press/` | `git clone` + `go build` |
| 5. **Per-user secrets** | API keys, OAuth tokens, strategist identity | The VPS, in `~/.hermes/profiles/<username>/.env` | The user pastes their own keys on first login |

**Layer 1 lives on each team member's Mac.** **Layers 2-5 live on the VPS.** The team member's Hermes app SSHes into the VPS for layers 2-5. They never see Homebrew, Go, Node, or the printing-press source. They just chat.

## Why this model

- **Foolproof for the team.** The team installs ONE app. They paste ONE config. They're running.
- **Centralized maintenance.** Push a skill update to git, run `hermes profile update` on the VPS, everyone's got it.
- **Centralized billing.** One API key (or Nous Portal subscription) covers the team. No per-user overhead.
- **Always-on cron.** Morning digests, brand-tracker-sync, etc. run on the VPS even when everyone's at lunch.
- **Secure.** Brand data, OAuth tokens, API keys all live on one hardened box with SSH key-only auth. Not scattered across 6 laptops.

## Cost

| Item | Cost |
|---|---|
| VPS (Hetzner CPX21, 8GB RAM) | ~$24/mo |
| Domain (optional) | ~$12/yr |
| API costs (Nous Portal or OpenRouter, with 98-100% cache hit) | ~$20-50/mo for 6 active users |
| VPS snapshot backup | ~$5/mo |
| **Total** | **~$50-80/mo for the whole team** |

Compare to per-user local installs: 6 × 20 min of setup time + 6 × $5-20/mo in per-user API costs + 6 separate machines to maintain. The VPS is cheaper and dramatically easier.

## Required repos (push these to private GitHub)

| Repo | What's in it | When it changes |
|---|---|---|
| `TheProdigal95/vault` (this repo) | Brand docs, T-batch files, Node tools source, deploy/ scripts, AGENTS.md | Daily (new T-batch, new context doc) |
| `TheProdigal95/hermes-profile` | The 9 skills, MCP wiring, Hermes config, SOUL.md | Monthly (new skill, new model) |
| `TheProdigal95/printing-press` | The Go CLI source (motion-pp-cli, clickup-pp-cli) + local patches | Rarely (when an upstream API changes) |

## Deployment flow (you, the deployer)

1. **Run HANDOFF.md** to create the 3 private GitHub repos and push the prepared commits.
2. **Rent the VPS** (Hetzner or DigitalOcean, 8GB Ubuntu 22.04).
3. **SSH in as root** and run `bash /opt/TheProdigal95/vault/deploy/vps-provision.sh` to harden it.
4. **Clone the 3 repos to `/opt/reach-digital/`** (as the deploy user, not root).
5. **Run `bash /opt/TheProdigal95/vault/deploy/deploy-stack.sh`** to build the stack.
6. **For each team member: `bash deploy/onboard-user.sh <username> --ssh-key-path <path>`** to create their profile and generate their config snippet.
7. **Send each team member their config snippet + ONBOARDING.md.** They install the Hermes app, paste the config, and they're running.

## Updating the stack after initial deploy

```bash
# Update the profile (skills, MCP, config)
hermes profile update reach-digital

# Update the vault (brand docs, T-batch files, Node tool source)
cd /opt/TheProdigal95/vault && git pull

# Update printing-press (rebuild the Go CLIs)
cd /opt/reach-press/printing-press && git pull
# Then re-run deploy-stack.sh (it rebuilds the Go CLIs idempotently)
```

## Backup and restore

- **Daily snapshot of the VPS** ($5/mo on Hetzner, free on DigitalOcean) \xe2\x80\x94 captures the full state.
- **If the VPS dies:** spin up a new one, restore the snapshot, then run `bash /opt/TheProdigal95/vault/deploy/restore.sh` to re-apply hardening and verify.

## Known limits and workarounds

- **Multi-user permission tiers (Owner/Admin/User/Guest) are still in development** (upstream [issue #527](https://github.com/NousResearch/hermes-agent/issues/527)). Today, every user on the VPS has full access to their own profile. Fine for a small trusted team.
- **The team shares VPS compute.** If two people run heavy batch jobs at once, they slow each other down. 8GB RAM handles 6 users doing normal work; scale the VPS up for more.
- **No offline mode.** The team needs internet to reach the VPS. For field work, you'd need a local fallback.
- **The local Hermes app's exact behavior with the SSH backend** is the one piece I'd test on a fresh Mac before announcing to the team. The CLI version is rock-solid; the Desktop app should be the same code path.

## What to read next

- **`HANDOFF.md`** \xe2\x80\x94 the step-by-step you (the deployer) run to actually push the buttons.
- **`ONBOARDING.md`** \xe2\x80\x94 the 1-page doc the team reads.
