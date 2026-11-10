# Triage labels

The skills speak in five canonical triage roles. This repository tracks work in
BB Tasks, so each role is a **label** on a task, and the workflow state is the
task's BB status.

| Skill role        | BB label          | BB status  | Meaning                                           |
| ----------------- | ----------------- | ---------- | ------------------------------------------------- |
| `needs-triage`    | `needs-triage`    | `backlog`  | Maintainer needs to evaluate this task            |
| `needs-info`      | `needs-info`      | `backlog`  | Waiting on the reporter for more information      |
| `ready-for-agent` | `ready-for-agent` | `todo`     | Fully specified, ready for an AFK agent           |
| `ready-for-human` | `ready-for-human` | `todo`     | Requires human implementation or a human decision |
| `wontfix`         | `wontfix`         | `canceled` | Will not be actioned                              |

The two **category** roles are labels as well:

| Category role | BB label      | Meaning                    |
| ------------- | ------------- | -------------------------- |
| `bug`         | `bug`         | Something is broken        |
| `enhancement` | `enhancement` | New feature or improvement |

Two work states are not triage roles. `backlog` holds accepted work that is not
scheduled, so it does not return through triage. `canceled` is dated evidence of
superseded or cancelled work.

A `blocked` label plus the reason in the task description marks a gate outside
the board: a human decision, a device, a dataset, external sign-off. A task
dependency is different: list the blocking task keys under `## Dependencies` in
the description and start only when they are `done` or `canceled`.

When a skill mentions a role (e.g. "apply the AFK-ready triage label"), set the
corresponding label and status on the task.

The operating conventions are in [issue-tracker.md](issue-tracker.md).
