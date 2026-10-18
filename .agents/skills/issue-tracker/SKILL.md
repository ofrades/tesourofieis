---
name: issue-tracker
description: Claim work from the tesourofieis issue tracker in the Obsidian vault before editing files, and hand finished work back through it. Required for every non-trivial change.
---

# The issue tracker

Work is tracked as issues in the Obsidian vault at
`~/Work/ofrades/notes/tesourofieis/issues/` — one markdown file per issue, named
`<NNN>-<slug>.md`, with `status:`, `priority:`, `depends_on:`, `blocked:` and
`block_reason:` in the frontmatter. The repository has no board of its own, and
GitHub Issues is enabled but is not the tracker. Other agents may be working at
the same time, and the tracker is how we stay out of each other's way.

Read [docs/agents/issue-tracker.md](../../../docs/agents/issue-tracker.md) for the
full conventions; the vault's `tesourofieis/tesourofieis.md` is the human guide.

## The loop

1. Claim work before editing anything: set `status: in-progress`, `claimed_by:`
   and `started:` in the issue's frontmatter and save, then re-read the issue.
   The claim is a cooperative lock across the sessions sharing the vault — write
   it before the edit, not after.
2. Work one issue at a time, and only what the issue describes.
3. Blocked, or the issue is wrong? Set `blocked: true` with a `block_reason`,
   append a dated note under `## Comments` saying what would unblock it, and
   release the claim.
4. Finished? Append a short handover note — what changed, how to check it, which
   checks ran — then set `status: review` and drop the claim. Moving to review
   hands your claim over: from that moment the issue is not yours.

## Review — the handoff between agents

Your issue is not finished when you say so; it is finished when a *different*
agent has reviewed it. When choosing work, prefer reviewing first: read the
issues already at `status: review`. A satisfied reviewer sets `status: done`,
fills `completed:`, and moves the file to `issues/archive/`. An unsatisfied
reviewer sets `status: in-progress` and appends what failed. `done` is the
reviewer's word, never the worker's.

## Rules

- Never touch an issue another session has claimed.
- Never move your own issue past `review`.
- Non-trivial work always goes through an issue. If none fits, create one from
  `Templates/Issue.md` with the next free number, and claim it.
- Keep WIP small: at most two issues `in-progress` and two in `review`.
- Editing vault files directly is normal here — there is no CLI and no git hook.
  The claim discipline is what keeps concurrent sessions from colliding.
