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

## What was deliberately not used

- **A hosted automation SaaS.** Client data would transit a third party, and the failure handling would be limited to what that vendor exposes.
- **A bespoke application where automation was enough.** The cheapest system to maintain is the one with the least custom code in it.
- **Anything that could not be redeployed by someone else.** A system only one person can operate is a liability for the client.

---

[← 04 · Failure handling](04-failure-handling.md) · [06 · Results →](06-results.md)
