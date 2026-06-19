# Reach Digital — Coworker Onboarding

For the current coworker/designer rollout, use the **local setup** path:

➡️ **Read and follow:** [`DESIGNER_LOCAL_SETUP.md`](DESIGNER_LOCAL_SETUP.md)

That path gives the designer:

- the `reach-digital` Hermes profile in the Desktop app,
- the full Obsidian vault at `~/Documents/reach-digital-hermes`,
- the Node tools under `00 Global/Hermes/tools/`,
- the Go CLIs (`motion-pp-cli`, `clickup-pp-cli`) built from `~/printing-press`,
- GitHub pull/commit/push workflow for centralized vault edits.

## When to use the old VPS flow

The old VPS flow is only for a future always-on/shared server deployment. It is **not** required for one designer helping with centralized edits.

If/when we deploy a VPS later, use:

- [`README.md`](README.md) — VPS architecture overview
- [`HANDOFF.md`](HANDOFF.md) — deployer checklist
- `vps-provision.sh`, `deploy-stack.sh`, `onboard-user.sh`, `restore.sh`

## Marce's one required step before the designer starts

Give the designer push access to the vault repo:

```bash
HOME=/Users/marce gh api -X PUT repos/TheProdigal95/vault/collaborators/<github_username> -f permission=push
```

Then have them follow `DESIGNER_LOCAL_SETUP.md` in a screen share.
