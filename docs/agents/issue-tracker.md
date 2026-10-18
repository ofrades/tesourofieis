# Issue tracker: Obsidian vault (markdown files)

Issues for this repository live as markdown files in the Obsidian vault at
`~/Work/ofrades/notes`, under `tesourofieis/`. There is no server-side tracker: the files
are the store, and Obsidian is the human's UI over them.

GitHub Issues is enabled on this repository but is **not** the tracker: the
owner moved tracking to the vault on 2026-10-19 so every project's board lives
in one place. Do not open GitHub issues; if one arrives from outside, copy it
here and close the GitHub one with a pointer to this file.

The vault is a **separate Git repository** (`git@github.com:ofrades/notes.git`),
so issue history is not part of this checkout's history. If the vault path does
not exist on the machine you are working on, stop and ask the owner where it is
rather than creating a second tracker.

## Conventions

- One issue per file: `tesourofieis/issues/<NNN>-<slug>.md`, numbered from `001`.
  Numbers are permanent handles, never reused: repository documents cite
  "issue #12" and stay resolvable. `id:` in the frontmatter repeats the number.
- Closed issues move to `tesourofieis/issues/archive/<NNN>-<slug>.md` — `done`,
  `wontfix` and `archived`. Open work stays in `tesourofieis/issues/`.
- The frontmatter fields and the full status vocabulary are documented in the
  vault's `tesourofieis/tesourofieis.md`. [triage-labels.md](triage-labels.md) maps the triage
  roles onto the `status:` values.
- History appends at the bottom under a `## Comments` heading, newest last,
  dated `[[YYYY-MM-DD]]`. Never rewrite earlier notes.
- Evidence in a body is a repository path (`docs/…`), never a vault link: the
  vault cannot resolve paths inside this checkout, and this checkout cannot
  resolve vault links.
- Dependencies and gates are two different fields: `depends_on: [NN, …]` for
  ticket dependencies, `blocked: true` plus `block_reason` for a gate outside
  the tracker (a human decision, a device, a dataset, external sign-off).

## Operations

- **Create**: write `tesourofieis/issues/<NNN>-<slug>.md` from `Templates/Issue.md`,
  taking the next free number — the highest `id:` across `issues/` **and**
  `issues/archive/`, plus one. Then confirm it appears in the `Open` view of
  `tesourofieis/tesourofieis.base`.
- **Read**: read the file. `id:`, `status:`, `priority:`, `tags:`,
  `depends_on:`, `blocked:` and `block_reason:` are in the frontmatter; the
  description is above `## Comments`, the history below it.
- **List**: there is no query CLI. Filter with the vault's Bases views
  (`tesourofieis/tesourofieis.base`), or search the files directly for frontmatter values. For
  agents, reading `tesourofieis/issues/*.md` and filtering on `status:` is usually
  enough.
- **Claim**: set `status: in-progress`, `claimed_by:` and `started:`, and save —
  **before** editing anything. This is a cooperative lock across processes that
  share the vault, not a transactional one: write the claim first, and re-read
  the issue before acting if another session may be running.
- **Comment**: append a dated note under `## Comments`.
- **Block / unblock**: set or clear `blocked:` and `block_reason:`, with a note
  saying what would unblock it.
- **Hand off to review**: append the handover note, set `status: review`, drop
  the claim. The worker does not accept its own work.
- **Close**: `status: done` plus `completed:`, then move the file into
  `issues/archive/`. Closing on `wontfix` or `archived` does the same.

## Wayfinding operations

Used by `/wayfinder`. The map is itself an issue.

- **Map**: an issue with `type: map` in its frontmatter, holding Notes /
  Decisions-so-far / Fog in the body, and a task list of its children.
- **Child ticket**: an issue with `parent: <map id>`. Where the skill expects
  sub-issues, the child's `parent:` field and the map's task list are the
  linkage.
- **Blocking**: `depends_on: [<blocker id>, …]`. A ticket is unblocked when every
  listed issue is `done`, `archived` or `wontfix`.
- **Frontier**: the open issues in `tesourofieis/issues/` whose `depends_on` are all
  closed, that are not `blocked`, and that have no `claimed_by`. Lowest `id:`
  wins.
- **Claim**: as in **Claim** above; the session's first write.
- **Resolve**: append the answer under `## Comments`, set `status: done` and
  `completed:`, move the file to `issues/archive/`, then add the context pointer
  to the map's Decisions-so-far.

## When a skill says "publish to the issue tracker"

Create a vault issue, as in **Create** above.

## When a skill says "fetch the relevant ticket"

Read the file for that issue number under `tesourofieis/issues/` or
`tesourofieis/issues/archive/`. The owner normally passes the number or the path
directly. Specs published by `/to-spec` live in `tesourofieis/specs/<NNN>-<slug>.md`
and are read the same way.
