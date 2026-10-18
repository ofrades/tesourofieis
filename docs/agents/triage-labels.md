# Triage Labels

The skills speak in terms of five canonical triage roles. In this repository
those roles are `status:` values in the vault issue frontmatter, not labels on a
server-side tracker.

| Label in mattpocock/skills | Status value in our tracker | Meaning                                  |
| -------------------------- | --------------------------- | ---------------------------------------- |
| `needs-triage`             | `needs-triage`              | Maintainer needs to evaluate this issue  |
| `needs-info`               | `needs-info`                | Waiting on reporter for more information |
| `ready-for-agent`          | `ready-for-agent`           | Fully specified, ready for an AFK agent  |
| `ready-for-human`          | `ready-for-human`           | Requires human implementation            |
| `wontfix`                  | `wontfix`                   | Will not be actioned                     |

The two **category** roles live in the `category:` field instead of `status:`:

| Category role | Field value             | Meaning                    |
| ------------- | ----------------------- | -------------------------- |
| `bug`         | `category: bug`         | Something is broken        |
| `enhancement` | `category: enhancement` | New feature or improvement |

Two additional status values exist in this repository and are **not** triage
roles. `backlog` holds work the maintainer has already accepted but not
scheduled, so it does not return through triage. `archived` is dated evidence of
superseded or cancelled work. `in-progress`, `review` and `done` are work
states, set by the agent doing the work and by its reviewer.

When a skill mentions a role (e.g. "apply the AFK-ready triage label"), set the
corresponding `status:` value on the issue.

The full vocabulary and field list live in the vault's `tesourofieis/tesourofieis.md`; the
operating conventions are in [issue-tracker.md](issue-tracker.md).
