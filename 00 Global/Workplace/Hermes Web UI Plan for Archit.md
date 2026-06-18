# Hermes / Reach Digital Web UI Plan for Archit

## Goal

We want a browser-based UI for the Reach Digital Hermes workflow so team members can use the system online without needing to install the Hermes desktop app or keep Obsidian open beside it.

Current local workflow:

```txt
Hermes Agent app/window + Obsidian as the markdown file viewer
```

Desired workflow:

```txt
Browser UI with chat, brand/batch navigation, and markdown output/viewing in one workspace
```

The important thing is not just “chat in a browser.” The UI needs to support the way our creative workflow actually cascades:

```txt
Ads Analysis → Working Document → Scripts/Briefs → Batch Critique → Test Log → Next Batch
```

---

## Short Recommendation

Build a custom **Reach Workspace UI** on top of Hermes, rather than relying on a generic chat UI.

The best product shape is:

```txt
Left panel: Brand / batch / file tree
Center panel: Hermes chat + agent run stream
Right panel: Markdown preview/editor for the selected or latest-touched file
```

This gives us what Obsidian currently gives us locally, but inside the same browser workspace as Hermes.

---

## What Exists in Hermes Already

### 1. Hermes Desktop already has the local version of this idea

Hermes Desktop has:

- chat
- file browser
- right-hand preview rail
- ability to render files, web pages, and tool outputs side-by-side

So the “Hermes + Obsidian” workflow already maps to something Hermes understands conceptually.

However, Hermes Desktop is still a local app. Since we want people to work online without installing the app, Desktop is useful as a **reference**, not the final solution.

---

### 2. Hermes Web Dashboard supports plugins

Hermes Dashboard can be extended with plugins. A plugin can add:

- custom dashboard tabs
- custom UI pages
- shell/sidebar/header/footer widgets
- backend API routes through FastAPI

A Hermes Dashboard plugin looks like this:

```txt
~/.hermes/plugins/reach-workspace/
├── plugin.yaml                         optional CLI/gateway plugin manifest
└── dashboard/
    ├── manifest.json                   required
    ├── dist/
    │   ├── index.js                    required JS bundle
    │   └── style.css                   optional CSS
    └── plugin_api.py                   optional FastAPI backend routes
```

Backend routes would mount under:

```txt
/api/plugins/reach-workspace/*
```

So we could build a Hermes-native `Reach Workspace` tab inside `hermes dashboard`.

---

### 3. Hermes API Server can power a standalone web app

Hermes also exposes an API server that can be used by a custom frontend.

Relevant capabilities:

- OpenAI-compatible chat endpoint
- Runs API for starting/stopping agent runs
- SSE/event stream for tool progress
- sessions API
- jobs/cron API
- model/tool capabilities

For a serious hosted product, we probably want to use the Runs API instead of only generic chat completions, because the UI should show:

- run status
- streaming response
- tool calls
- approvals
- stop/interruption controls
- which files were read/written/touched

---

### 4. Community Hermes WebUI exists, but should be treated as reference

There is a community Hermes WebUI that appears to already have:

- three-panel layout
- sessions/navigation
- center chat
- right-side workspace file browser
- markdown preview
- code/text/image preview

This is close to what we want structurally.

However, we should treat it as reference/inspiration unless we verify:

- security model
- file write safety
- Hermes API compatibility
- profile/workdir handling
- how easy it is to customize around brands/batches
- whether it can support our creative workflow natively

---

## Why Open WebUI Is Not the Best Fit

Open WebUI can connect to Hermes through the Hermes API Server, but it is a generic chat frontend.

It does not naturally understand our operating system:

```txt
Brand → Context → Ads Analysis → Working Document → Scripts/Briefs → Critique → Test Log
```

Open WebUI is good for:

```txt
Generic hosted Hermes chat
```

Reach needs:

```txt
Workflow-aware creative production UI
```

So Open WebUI may be useful for a quick proof-of-concept, but it should not be the main product direction.

---

## Recommended Product Shape

```txt
┌─────────────────────────────────────────────────────────────────────┐
│ Brand / Batch selector                                               │
├──────────────────┬───────────────────────────────┬──────────────────┤
│ File Tree         │ Hermes Chat / Agent Run        │ Markdown Viewer  │
│                  │                               │                  │
│ IM8              │ “Write T004 scripts…”          │ T004 Working     │
│  00 Context      │                               │ Document.md      │
│  00 Research     │ Tool progress                  │                  │
│  02 Ads Analysis │ Subagent cards                 │ Rendered MD      │
│  T004 Working    │ Final response                 │ Source/Preview   │
│  T004 Scripts    │                               │ Diff/History     │
│  T004 Critique   │                               │                  │
└──────────────────┴───────────────────────────────┴──────────────────┘
```

---

## Core Objects the UI Should Understand

### Brand

A brand is the top-level workspace.

Example:

```txt
IM8/
Lifeforce/
Stepful/
Stellar Sleep/
Comfort Ortho Wear/
Elevate/
Oral Only/
```

Each brand contains context, research, ads analysis, batches, and test logs.

---

### Brand Context

```txt
[Brand]/00 Context/
```

This is the brand knowledge base.

It can include:

- brand context
- product context
- persona context
- compliance / claims / guardrails
- offer guidance
- native close guidance
- approved phrasing
- source verification docs

The UI should surface this as the brand’s knowledge base, not just a folder of markdown files.

---

### Research

```txt
[Brand]/00 Research/
```

This can include:

- review mining
- Reddit mining
- VoC quotes
- transcripts
- customer objections
- competitor research
- raw source material

This supports the Context docs and future batch strategy.

---

### Ads Analysis

```txt
[Brand]/02 Ads Analysis/
```

This is where top spender and creative analysis lives.

Example:

```txt
2026-04-29 Ads Analysis - T003.md
2026-06-01 Top Spenders Analysis - T004.md
```

This file analyzes what is actually spending or converting in the ad account.

It usually includes:

- spend/conversion patterns
- top creative breakdowns
- hook patterns
- format patterns
- editing/caption/visual patterns
- what to replicate
- what to avoid
- what to test next

This is the first major input into a batch.

---

### Working Document

```txt
[Brand]/T001 Working Document.md
```

The Working Document is the command center for a batch.

It takes input from:

```txt
Brand Context
Product Context
Persona Context
Compliance
Ads Analysis
Strategist Notes
Previous Test Log
```

And turns it into a production plan.

Typical sections:

```txt
# T001 — [Brand] [Platform] [Batch Type]

## Raw Notes — Batch Strategy

## Batch Setup
Product:
Product page:
Platform:
Personas:
Concepts per persona:

## Persona Allocation

## Batch Plan

## Concept Validation

## Script Criteria / Brief Criteria

## Process Log

## Context Files for Agents
```

The Working Document is where analysis becomes execution.

```txt
Ads Analysis = what is working
Working Document = what we are going to make because of it
```

---

### Scripts File

```txt
[Brand]/T001 Scripts.md
```

For video batches, this is where final scripts live.

It references the Working Document and every script should trace back to a row or concept in the Batch Plan.

---

### Briefs File

```txt
[Brand]/T001 Briefs.md
```

For static/image ad batches, this is where creative briefs live.

Same relationship:

```txt
Working Document → Briefs
```

Each brief should trace back to a Batch Plan row and include enough direction for design/editing.

---

### Batch Critique

```txt
[Brand]/T001 Batch Critique.md
```

This is the QA layer after scripts or briefs are drafted.

It checks output against:

- Working Document
- Brand Context
- Compliance docs
- Global Criteria
- format-specific criteria
- references/source validity

It catches issues like:

- weak hooks
- off-brand claims
- missing proof
- repetitive concepts
- bad pacing
- unsupported references
- compliance risks
- design/format problems

---

### Test Log

```txt
[Brand]/00 Test Log - [Brand].md
```

The Test Log is cumulative performance memory.

It tracks:

- batch results
- persona performance
- winners/losers
- dead angles
- what to scale
- what not to repeat

This feeds the next Working Document.

---

## Core Workflow Cascade

The UI should preserve this relationship:

```txt
1. Brand Context is established
   ↓
2. Research / VoC supports the context
   ↓
3. Ads Analysis reviews what is currently spending/winning
   ↓
4. Working Document turns insights into a batch plan
   ↓
5. Scripts.md or Briefs.md are produced from that plan
   ↓
6. Batch Critique QA's the work
   ↓
7. Test Log records performance
   ↓
8. Next batch uses all of the above
```

The most important product requirement is:

```txt
The UI should make this cascade visible and navigable.
```

---

## Implementation Options

## Option 1 — Hermes Dashboard Plugin

Best for a fast Hermes-native prototype.

Build:

```txt
~/.hermes/plugins/reach-workspace/dashboard/
```

The plugin would create a custom `Reach Workspace` tab in Hermes Dashboard.

Potential backend routes:

```txt
GET  /api/plugins/reach-workspace/brands
GET  /api/plugins/reach-workspace/batches?brand=IM8
GET  /api/plugins/reach-workspace/files?brand=IM8
GET  /api/plugins/reach-workspace/file?path=IM8/T004 Working Document.md
POST /api/plugins/reach-workspace/file
POST /api/plugins/reach-workspace/patch
```

Potential frontend features:

- brand selector
- batch selector
- file tree
- markdown preview
- source/preview toggle
- selected file state
- open latest touched file
- simple chat/run panel

Pros:

- Hermes-native
- low setup overhead
- uses existing dashboard plugin system
- can add backend FastAPI routes
- good for internal prototype

Cons:

- Dashboard Chat tab embeds the TUI, so replacing/controlling the existing chat layout may be awkward
- For a polished production app, the dashboard plugin system may become limiting
- Need to be careful with file access/security

---

## Option 2 — Standalone Reach Web App + Hermes API Server

Best for the real hosted product.

Architecture:

```txt
Reach Web App frontend
   ↓
Reach backend for vault/file operations
   ↓
Hermes API Server for agent runs
```

Use Hermes for:

```txt
POST /v1/runs
GET  /v1/runs/{run_id}/events
POST /v1/runs/{run_id}/stop
POST /v1/runs/{run_id}/approval
```

Use a Reach-specific backend for:

```txt
GET  /brands
GET  /brands/:brand/files
GET  /files?path=...
POST /files
PATCH /files
GET  /batches?brand=...
GET  /latest-output?session=...
```

Pros:

- best UX control
- can be hosted properly
- can make Reach concepts first-class
- can support permissions, users, teams, and deployment
- can make file preview/editing excellent
- can show agent runs and file outputs together

Cons:

- more engineering work
- requires security design around file reads/writes
- needs careful session/profile handling

---

## Option 3 — Open WebUI Connected to Hermes

Best only for generic chat proof-of-concept.

Pros:

- fast to stand up
- already supports users/accounts/chat
- can connect to Hermes API Server

Cons:

- generic chat UI
- not workflow-aware
- does not understand brands/batches
- markdown/file workflow is not the center of the product
- likely to feel like a chat wrapper rather than a creative production system

Recommendation: do not make this the main Reach UI.

---

## Option 4 — Community Hermes WebUI as Reference

There is a community Hermes WebUI with a three-panel layout and workspace file preview.

Use it as reference for:

- three-panel layout
- file browser behavior
- markdown preview
- right-side workspace panel
- chat/file interaction patterns

But verify before adopting:

- security
- code quality
- licensing
- session handling
- API compatibility
- customization flexibility

---

## Recommended Path

### Phase 1 — Prototype

Build a Hermes Dashboard plugin called:

```txt
reach-workspace
```

MVP:

- brand selector
- batch selector
- markdown file tree
- read-only markdown preview
- center chat/run area
- ability to open Working Document, Scripts, Briefs, Ads Analysis, and Critique

Success criteria:

```txt
A strategist can run Hermes and view/edit the relevant markdown file without opening Obsidian.
```

---

### Phase 2 — Workflow-Aware UI

Add Reach-specific intelligence:

- show cascade links:

```txt
Ads Analysis → Working Document → Scripts/Briefs → Critique → Test Log
```

- surface batch status
- show active files for current run
- auto-open latest touched output file
- show references/source docs next to output
- add source/preview/diff tabs
- add simple file edit/patch controls

---

### Phase 3 — Hosted Product

If the prototype works, move to a standalone web app backed by Hermes API Server and a Reach-specific file/workflow backend.

This becomes the actual product that team members use online.

---

## Final Recommendation

Do not build only a “side pane.” Build a **workflow-aware workspace**.

The correct mental model is:

```txt
Browser-based Obsidian + Hermes Chat + Reach production workflow
```

Not:

```txt
Generic chat app with a file preview bolted on
```

The UI should make these relationships first-class:

```txt
Brand → Batch → Ads Analysis → Working Document → Scripts/Briefs → Critique → Test Log
```

And the default working screen should be:

```txt
Left: brand/batch/file navigation
Center: Hermes run/chat
Right: markdown output/viewer/editor
```

That is the closest browser-native replacement for the current local setup of Hermes + Obsidian, while also setting us up to turn the whole Reach creative system into a real web product.
