---
name: Use brief-writer sub-agents properly
description: Don't write briefs in main session then score separately — dispatch brief-writer sub-agents which write + self-audit + score internally
type: feedback
---

The brief-writer sub-agent (`.claude/agents/brief-writer.md`) is designed to write briefs, self-audit, spawn the scoring-evaluator, iterate to 90+, and return clean output. Don't bypass this by writing briefs directly in the main session and then dispatching separate scoring agents — that splits the write-score-fix loop across the main session and produces the exact manual grind the sub-agent pipeline was built to avoid.

**Why:** During the Lifeforce T002 ApoB format multiplication, briefs were written in the main session, then general-purpose agents were dispatched as makeshift scoring evaluators. Every fix came back to the main session for manual editing. The user saw the main session doing all the work that the sub-agents should have handled internally.

**How to apply:** For batch brief production, dispatch brief-writer sub-agents (2-3 briefs each, parallel). They own the full write → Hook Quality Bar → 4-Question Gate → scoring loop → structural checks cycle. The main session only sees the finished output. Single-brief targeted edits can stay in the main session per CLAUDE.md routing rules.