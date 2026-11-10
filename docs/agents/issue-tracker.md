# Issue tracker: BB Tasks

Issues for this repository live in BB Tasks under the **TES** project. BB Tasks
is the single source of truth for open work: status, priority, labels, comments,
attachments and attached threads.

- List the board: `bb tasks list --project TES`
- Read a task: `bb tasks show TES-3 --json`
- Task keys (`TES-3`) are permanent handles; cite them in repository documents.

GitHub Issues is enabled on this repository but is **not** the tracker. Do not
open issues there; if one arrives from outside, create a BB task and close the
GitHub issue with a pointer to this file.

## Removed vault tracker

The Obsidian vault tracker at `~/Work/ofrades/notes/tesourofieis/issues/` was removed
on 2026-11-10. Its open issues were imported into BB Tasks (TES). The markdown files are preserved in the notes git
history. The vault's `tesourofieis/tesourofieis.md` is now only a BB Tasks pointer.
Imported tasks keep a `**Legacy issue:** #N` footer and a
`<!-- vault-issue: tesourofieis/N -->` marker so old issue numbers stay
resolvable.

## Commands

| Operation          | Command                                                                                                                                   |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Create             | `bb tasks create --project TES --title "..." --description-file /tmp/task.md --priority <urgent\|high\|medium\|low\|none> --label <name>` |
| Claim              | `bb tasks update TES-3 --status in_progress` and `bb tasks attach TES-3`                                                                  |
| Comment            | `bb tasks comment TES-3 --body "..."`                                                                                                     |
| Hand off to review | comment the handover, then `bb tasks update TES-3 --status in_review` and `bb tasks detach TES-3`                                         |
| Close              | `bb tasks update TES-3 --status done` (or `canceled`)                                                                                     |
| Parent / subtask   | `bb tasks update TES-3 --parent TES-2`                                                                                                    |
| Attach evidence    | `bb tasks attachment add TES-3 --file <path>`                                                                                             |

## Status vocabulary

| BB status     | Meaning                                              |
| ------------- | ---------------------------------------------------- |
| `backlog`     | Accepted or untriaged; not scheduled                 |
| `todo`        | Ready to start, by an agent or a human               |
| `in_progress` | Claimed and actively being worked                    |
| `in_review`   | Implementation complete, awaiting independent review |
| `done`        | Reviewed and accepted, or the outcome delivered      |
| `canceled`    | Wontfix or archived                                  |

The five triage roles are **labels**, not statuses: `needs-triage`,
`needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. Category is a
label too: `bug`, `enhancement`. A `blocked` label plus the reason in the
description marks a gate outside the board. [triage-labels.md](triage-labels.md)
has the full mapping.

## Conventions

- **Claim before editing.** Set `in_progress`, attach the thread, and re-read the
  task before touching a file. Work one task at a time.
- **Keep WIP small:** at most two tasks `in_progress` and two `in_review` in the
  project.
- **Dependencies:** list blocking task keys in a `## Dependencies` section of the
  description (`- Depends on TES-2`). Start only when those tasks are `done` or
  `canceled`. Use `--parent` for a real subtask relationship.
- **Evidence:** a repository path (`docs/…`), never a vault link.
- **Handover:** a few lines plus commit hashes in a comment, then `in_review`.
  The worker does not accept its own work.
- **Closing:** the reviewer sets `done`; `wontfix` and `archived` become
  `canceled`.
