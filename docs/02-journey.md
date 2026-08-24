# 02 · The client journey

What this looks like from the outside, for **Enterprise service team**.

---

### 01 — A request arrives

A teammate or client writes in Slack. Nothing new to learn, no form, no portal.

### 02 — It gets read properly

Intent and urgency are extracted from the message as written, including in other languages.

### 03 — It goes to the right person

Not the nearest person. The one whose live workload has room for it.

### 04 — The clock starts itself

An SLA timer attaches at intake, not when someone remembers to start tracking.

### 05 — It escalates early

At a set threshold the lead is told while there is still time to act.

### 06 — The decision is on record

Assignment, escalation and priority changes are logged with the reasoning behind them.

---

## The one decision that shaped everything else

Every incoming message passes through a triage step that classifies intent and urgency, then a Redis-backed workload engine scores live capacity per teammate and either assigns the work or escalates it — before a human has to look at it.

---

[← 01 · The problem](01-problem.md) · [03 · Architecture →](03-architecture.md)
