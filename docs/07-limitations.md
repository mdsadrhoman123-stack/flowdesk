# 07 · Limitations

Written by the person who made the trade-offs.

---

- Capacity scoring counts open work, not difficulty. Two requests of the same count are not the same load, and a teammate on one hard task can read as available.

- Fails closed when Redis is unavailable, so an outage delays assignment rather than guessing wrong. Correct for this brief, but it is a trade — a durable queue in front of the capacity check would buffer instead of hold.

- Single Slack workspace. Multi-workspace would need a tenant key on every Redis and audit write, not only at intake.

- The regex tier classifies urgency, not scope. When both providers are down the request keeps moving, but a human should review it.

## On reading this section

A limitations section is not a disclaimer. It is the fastest way to tell whether a system was designed or assembled. Every one of the constraints above was a decision with a reason behind it, and each one could be lifted — at a cost that was not worth paying for the problem in this brief.

If your situation makes a different trade the right one, that is a conversation worth having.

---

[← 06 · Results](06-results.md) · [README](../README.md)
