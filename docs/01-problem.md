# 01 · The problem

**FlowDesk** — the problem, as Enterprise service teams describe it

---

A client message lands in Slack on a Friday afternoon. It gets a thumbs-up, scrolls out of view, and comes back on Monday as a complaint.

Nobody here is careless. Intake simply lives in people's habits instead of in a system, so urgency is guessed rather than assessed, work goes to whoever is online rather than whoever has capacity, and nothing is tracked until it is already late.

The real cost is not one dropped request. It is that nobody can tell you how many were dropped.

## Why it was not solved already

Every business in this position has already tried the obvious answers: a shared inbox, a spreadsheet, a rule in an off-the-shelf tool, a reminder to be more careful. Those work until volume grows or someone is on holiday.

The gap is not effort. It is that the process lives in people's habits rather than in a system, so it degrades quietly and nobody can measure by how much.

## What the requirement actually was

Every incoming message passes through a triage step that classifies intent and urgency, then a Redis-backed workload engine scores live capacity per teammate and either assigns the work or escalates it — before a human has to look at it.

---

[← README](../README.md) · [02 · The journey →](02-journey.md)
