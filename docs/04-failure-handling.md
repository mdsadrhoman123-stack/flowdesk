# 04 · Failure handling

The part of the system that took the longest to build and gets written about the least.

---

| What goes wrong | How it is detected | What the system does | Who finds out |
| :--- | :--- | :--- | :--- |
| **Primary model down or rate-limited** | Node error output | Claude takes over, then a regex tier | Alert names which tier served it |
| **Both providers unreachable** | Second failure in the chain | Regex classifies, flagged low-confidence | Lead alerted, request still moves |
| **Every teammate at capacity** | Redis capacity score | Queue and escalate to lead | Alert, not a silent queue |
| **Owner never acknowledges** | Acknowledgement timeout | Re-escalate rather than wait | Alert names both owners |
| **SLA nearing breach** | Timer threshold | Escalate while time remains | Alert states time left |
| **Slack API rejects a send** | Node error output | Retry with backoff, then queue | Alert with request context |
| **Redis unavailable** | Connection error | Fail closed — hold rather than guess capacity | Immediate alert |
| **Anything unanticipated** | Global error trigger | Halt that execution, keep state | Alert with execution ID |

## The three rules behind that table

**1 — Fail closed, not open.** When the system cannot establish that an action is safe, it holds. A held item is a visible problem. An item processed on a guess is an invisible one.

**2 — Nothing disappears.** Anything that cannot be completed is recorded where a human can find it later, not dropped from the run.

**3 — Silence is a fault.** An empty result where results were expected is treated as a possible failure of the source, not as an absence of work. This is the check most automations skip.

---

[← 03 · Architecture](03-architecture.md) · [05 · The stack →](05-stack.md)
