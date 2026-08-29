# 05 · The stack

Each choice, and the reason for it.

---

| Component | Why this one |
| :--- | :--- |
| **n8n** | Self-hosted, so client conversations never leave their infrastructure |
| **Slack API** | The team was already there — a new tool would have gone unused |
| **Redis** | Capacity is read on every single request, so it has to be fast |
| **OpenAI GPT-4** | Primary classifier for intent and urgency |
| **Anthropic Claude** | Second provider, so one outage cannot take both tiers down |
| **PostgreSQL** | Append-only audit history that survives a workflow re-import |
| **Docker** | Same stack on every client instance |

## The decisions behind that table

### Why capacity lives in Redis and not in the audit database

**What it does.** Capacity is read on every single request, so it sits in Redis where a read costs almost nothing. PostgreSQL holds the audit history, which is written once and read rarely — a completely different access pattern.

**What was turned down.** One store for both. Fewer moving parts and one less thing to keep alive, but then every capacity read competes with append-only audit writes on the same box, and the read is the one in the hot path.

**What that costs.** Two stores to operate. When Redis is unavailable the system fails closed — assignment is held rather than guessed at, so an outage delays work instead of misrouting it. That is the right way round, and it is still a delay.

### Why there are two AI providers with a deterministic tier underneath

**What it does.** One provider classifies intent and urgency, a second provider sits behind it on the same contract, and a regex tier sits under both.

**What was turned down.** A single provider with a retry. Retrying is the obvious answer and it does not help at all in the case that matters: when the provider itself is the thing that is down, every retry fails the same way.

**What that costs.** Three paths that have to agree on the same output shape. The bottom tier reads urgency but not scope, so when both providers are unreachable the request keeps moving and a human should review it afterwards.

### Why intake is Slack and not a form

**What it does.** Requests are taken where the team already talks, with nothing new to learn.

**What was turned down.** A ticket portal or an intake form. Cleaner, more structured data at the point of entry — and adoption is the entire problem being solved here. A tool nobody opens collects nothing, however good its schema is.

**What that costs.** One workspace per deployment. Multi-workspace is not a setting: it needs a tenant key on every capacity and audit write, not only at intake.

## The rule that applies to all of them

**Nothing that only one person can operate.** A system that depends on the engineer who built it is a liability for the client, however well it runs on the day it is handed over. Every choice above had to survive that test before the technical merits mattered at all.

---

[← 04 · Failure handling](04-failure-handling.md) · [06 · Results →](06-results.md)
