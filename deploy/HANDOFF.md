# Reach Digital \xe2\x80\x94 Deploy Handoff (5 manual steps)

This is the checklist YOU (the deployer) run to actually push the buttons. Everything in `deploy/` is prepared; these are the actions only you can take (GitHub auth, VPS rental, the first SSH).

The 3 repos are already committed locally:
- `~/Documents/reach-digital-hermes/` \xe2\x80\x94 2 commits, clean
- `~/printing-press/` \xe2\x80\x94 1 commit (201 source files, 41k LOC)
- `~/hermes-profile/` \xe2\x80\x94 1 commit (28 files: 9 skills + config + manifest)

## Estimated total time

~90 min if you have a clean Mac handy. Most of it is waiting on VPS provisioning + `npm install`.

---

## Step 1 \xe2\x80\x94 GitHub auth + create 3 private repos (10 min)

```bash
# 1a. Authenticate the GitHub CLI
gh auth login
# Pick: GitHub.com \xe2\x86\x92 HTTPS \xe2\x86\x92 Yes (authenticate git with your GitHub credentials)
# A browser window opens. Approve.

# 1b. Create the 3 private repos
gh repo create reach-digital/vault --private --description "Reach Digital creative strategy vault" --source ~/Documents/reach-digital-hermes --remote origin --push
gh repo create reach-digital/hermes-profile --private --description "Reach Digital Hermes profile distribution" --source ~/hermes-profile --remote origin --push
gh repo create reach-digital/printing-press --private --description "Reach Digital printing-press Go CLI libraries" --source ~/printing-press --remote origin --push
```

**Verify:**
- Open https://github.com/reach-digital in your browser
- You should see 3 repos, all private, all with the expected files

**If a push fails with "repository not empty" or similar**, you have a non-empty remote. Either:
- Delete the remote and recreate: `gh repo delete reach-digital/<name> --confirm`
- Or: `git -C ~/.../<repo> remote add origin git@github.com:reach-digital/<name>.git && git -C ~/.../<repo> push -u origin main --force`

---

## Step 2 \xe2\x80\x94 Rent the VPS (10 min)

Pick one:

- **Hetzner Cloud** (https://console.hetzner.cloud) \xe2\x80\x94 recommended, $24/mo for CPX21 (8GB RAM, 4 vCPU, 160GB SSD, Ubuntu 22.04). Ashburn, VA or Falkenstein, Germany.
- **DigitalOcean** (https://cloud.digitalocean.com) \xe2\x80\x92 $24/mo for 8GB/4vCPU/160GB. NYC, SF, Amsterdam, etc.
- **Vultr**, **Linode**, or **AWS Lightsail** all work too. **Any 8GB Ubuntu 22.04 box is fine.**

When creating the VPS:
- **OS:** Ubuntu 22.04 LTS (NOT 24.04 \xe2\x80\x94 the docs are tested on 22.04)
- **Size:** 8GB RAM minimum, 4 vCPU, 160GB SSD
- **Region:** closest to your team (Paraguay = east coast US, so Ashburn VA or NYC)
- **SSH key:** upload your public key during creation (`cat ~/.ssh/id_ed25519.pub` to see it)
- **Hostname:** `hermes.reachdigital.com` (or whatever you want; just remember it)

**Note the VPS IP** \xe2\x80\x94 you'll need it everywhere below.

---

## Step 3 \xe2\x80\x94 Harden the VPS (10 min)

SSH in as root:

```bash
ssh root@<vps-ip>
```

Install the deploy scripts (we'll do this from scratch on the VPS \xe2\x80\x94 you'll do a fresh clone after the bootstrap):

```bash
# First, install git and curl (should already be there, but just in case)
apt update && apt install -y git curl

# Clone the vault temporarily so we can run vps-provision.sh
mkdir -p /opt/reach-digital
cd /opt/reach-digital
git clone https://github.com/reach-digital/vault.git
# ^ This will fail if the repo is private. If it does:
#   - Either: temporarily make the vault public, clone, then make it private again
#   - Or:    SSH in with the key that has access (the same one you used to create the VPS)
#            git clone git@github.com:reach-digital/vault.git

# Run the provisioner
bash vault/deploy/vps-provision.sh hermes
```

The provisioner will:
- Create a `hermes` user with sudo
- Disable root SSH login + password auth
- Install UFW (firewall: only ports 22 + 443)
- Install fail2ban
- Install unattended-upgrades
- Install Docker
- Install Node 20 LTS + Go 1.21+
- Install jq, git, htop, tmux, build-essential, python3-pip

**IMPORTANT:** When the script finishes, **log out as root and log back in as `hermes`**. The deploy user only works via SSH key, and root login is now off.

```bash
exit   # log out from root
ssh hermes@<vps-ip>
```

---

## Step 4 \xe2\x80\x94 Clone the 3 repos + deploy the stack (15 min)

As the `hermes` user on the VPS:

```bash
# Make /opt/reach-digital owned by hermes
sudo chown -R hermes:hermes /opt/reach-digital

# Clone the 3 repos
cd /opt/reach-digital
git clone git@github.com:reach-digital/vault.git
git clone git@github.com:reach-digital/printing-press.git
git clone git@github.com:reach-digital/hermes-profile.git

# (you'll be prompted for your GitHub SSH key password if you set one)
# If you get "permission denied", your SSH key on the VPS isn't authorized for the
# reach-digital org. Go to https://github.com/settings/keys and add the public key
# from /home/hermes/.ssh/id_ed25519.pub (or whichever key you used to push the repos).

# Run the stack deployer
bash vault/deploy/deploy-stack.sh
```

This will:
- Install Hermes Agent CLI (if not already)
- Build `motion-pp-cli` and `clickup-pp-cli` from printing-press
- `npm install` for each of the 9 Node tools in the vault
- Install the `reach-digital` Hermes profile from the hermes-profile distribution
- Run the smoke test

**Expected output: green checks everywhere, ending in a `Smoke test passed`.** If anything is red, address it before continuing.

---

## Step 5 \xe2\x80\x94 Onboard yourself first, then the team (30 min for 6 people)

**Onboard yourself first** to make sure the flow works:

```bash
# From the VPS, as the hermes user
bash /opt/reach-digital/vault/deploy/onboard-user.sh marcela

# (Use your actual first name or slack handle)
```

The script will:
- Create a `marcela` profile in `~/.hermes/profiles/`
- Print a config snippet for the local Hermes app

**Save the config snippet** \xe2\x80\x94 you'll paste it into your local Hermes app.

**Test end-to-end:**
1. Install the Hermes app on your Mac from https://hermes-agent.nousresearch.com/desktop
2. Open the app, go to Settings \xe2\x86\x92 Config \xe2\x86\x92 Import
3. Paste the config snippet
4. Try a real command in the chat, e.g. "list the brands in the vault"
5. If it works \xe2\x80\x94 you're deployed!

**For each team member (repeat this for every person):**

```bash
# 1. Get their SSH public key (they run this on their Mac)
#    ssh-keygen -t ed25519
#    cat ~/.ssh/id_ed25519.pub

# 2. Add them to the VPS
bash /opt/reach-digital/vault/deploy/onboard-user.sh <their-name> --ssh-key-path /tmp/their-key.pub

# 3. Send them the printed config snippet + ONBOARDING.md
#    ONBOARDING.md is at /opt/reach-digital/vault/deploy/ONBOARDING.md
```

**Each team member then**:
- Installs the Hermes app (one .dmg)
- Pastes the config snippet you sent
- Sends you their SSH public key (one command)
- You onboard them (one command)
- Done

---

## After step 5

**Set up the daily snapshot:**
- Hetzner: Console \xe2\x86\x92 Volumes \xe2\x86\x92 Snapshots \xe2\x86\x92 enable daily (~$5/mo)
- DigitalOcean: Droplet \xe2\x86\x92 Backups \xe2\x86\x92 enable ($0 \xe2\x80\x94 included in the droplet price)

**Set up the team-shared API keys:**
- Log into the VPS as `hermes`
- `hermes auth` \xe2\x86\x92 follow the prompts to set up Nous Portal (or OpenRouter, or whichever provider you want as the default)
- For each team member, copy their `.env` template from the `marcela` profile and let them fill in their own keys

**Communicate to the team:**
- Send the Slack channel a link to `ONBOARDING.md`
- Schedule a 30-min walkthrough this week
- Be on Slack for the inevitable "step 3 isn't working" questions

---

## If something goes wrong

| Symptom | Likely cause | Fix |
|---|---|---|
| `hermes` command not found on the VPS | Step 3 didn't install it | `curl -fsSL https://hermes-agent.nousresearch.com/install.sh \| bash`, then re-run step 4 |
| `git clone` fails with "permission denied" on the VPS | The deploy user's SSH key isn't authorized for the reach-digital org | Add `/home/hermes/.ssh/id_ed25519.pub` to https://github.com/settings/keys |
| Profile install fails on step 4 | Hermes version < 0.12.0 | `hermes update`, then re-run step 4 |
| Smoke test reports `GOOGLE_API_KEY set: NO` | `.env` is empty | `hermes auth` as the hermes user, set up Nous Portal or paste the key directly |
| Team member gets "command not found" in the Hermes app | Their local config's `host:` is wrong | Re-issue the config snippet with the correct VPS hostname |
| VPS dies | Hardware failure, host issue, etc. | Restore from snapshot, then `bash /opt/reach-digital/vault/deploy/restore.sh` |

---

## You're done when

- [x] 3 private GitHub repos exist under `reach-digital/` (vault, hermes-profile, printing-press)
- [x] VPS is hardened (root login off, password auth off, UFW + fail2ban on)
- [x] `bash deploy-stack.sh` runs end-to-end with all green checks
- [x] You can chat with Hermes from your local app and the agent runs on the VPS
- [x] Each team member has a profile, an SSH key, and a working Hermes app
- [x] Daily snapshot is enabled
- [x] ONBOARDING.md is in the team Slack channel
