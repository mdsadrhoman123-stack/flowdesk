<div align="center">

<img src="assets/banner.svg" width="100%" alt="FlowDesk — banner"/>

# ⚡ FlowDesk — Enterprise Intake & Lifecycle System

**AI-powered project intake engine — turns raw Slack requests into tracked, assigned work with a triple-AI failsafe.**

![n8n](https://img.shields.io/badge/n8n-Production-EA4B71?style=flat-square&logo=n8n&logoColor=white) ![Slack](https://img.shields.io/badge/Slack-API-4A154B?style=flat-square&logo=slack&logoColor=white) ![Redis](https://img.shields.io/badge/Redis-Capacity-DC382D?style=flat-square&logo=redis&logoColor=white) ![GPT-4](https://img.shields.io/badge/OpenAI-GPT--4-412991?style=flat-square&logo=openai&logoColor=white) ![Claude](https://img.shields.io/badge/Anthropic-Claude-D97757?style=flat-square) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Audit-4169E1?style=flat-square&logo=postgresql&logoColor=white) ![Docker](https://img.shields.io/badge/Docker-Self_Hosted-2496ED?style=flat-square&logo=docker&logoColor=white) ![Status](https://img.shields.io/badge/Status-Delivered-success?style=flat-square)

**92 nodes** · **70 active connections** · **5 major versions** · **3× AI redundancy**

</div>

---

## Table of Contents

- [Overview](#overview)
- [The Problem](#the-problem)
- [The Solution](#the-solution)
- [Live System Preview](#live-system-preview)
- [Architecture & System Design](#architecture--system-design)
- [How It Works — Step by Step](#how-it-works--step-by-step)
- [Triple-AI Failsafe Deep-Dive](#triple-ai-failsafe-deep-dive)
- [Key Metrics](#key-metrics)
- [System Health](#system-health)
- [What's Ready vs What's Not](#whats-ready-vs-whats-not)
- [Engineering Principles](#engineering-principles)
- [Version History](#version-history)
- [Tech Stack](#tech-stack)
- [Confidentiality](#confidentiality)

---

## Overview

FlowDesk is a **production-grade automation system** delivered to a real client. It sits inside Slack, captures every incoming request, classifies it using a triple-AI failsafe cascade, scores team capacity in sub-milliseconds via Redis, auto-assigns work to the right person, and proactively escalates before SLA deadlines slip.

> **Production status:** Delivered. Running v5.1 in a live client environment. 92 workflow nodes across 5 major versions of iteration.

---

## The Problem

A growing service team was losing **hours every day** to manual triage:

| Pain point | Impact |
|---|---|
| Requests buried in Slack threads | Important work missed entirely |
| Manual triage by a human | Hours of delay before anything happens |
| No accountability trail | "Who's handling this?" — asked constantly, answered rarely |
| Single AI provider dependency | One API outage = entire pipeline stops silently |

**The cost:** delayed responses, frustrated clients, dropped balls, and a team spending more time organizing work than doing it.

---

## The Solution

FlowDesk automates the **entire intake lifecycle** — from message to assigned task — with built-in resilience:

- **Slack-native intake** — captures requests directly from team channels, no new tool to learn
- **Triple-AI failsafe** — GPT-4 → Claude → Regex cascade, the pipeline literally cannot die with a provider outage
- **Sub-millisecond capacity scoring** — Redis-backed atomic workload tracking, always knows who has bandwidth
- **Proactive SLA escalation** — watchers fire *before* deadlines, not after
- **Full audit trail** — every decision logged to PostgreSQL with correlation IDs

> **Key insight:** A single AI provider is a single point of failure. So FlowDesk uses three — and the team never knows when a provider goes down.

---

## Live System Preview

<div align="center">

<img src="assets/dashboard.png" width="100%" alt="FlowDesk — live dashboard concept"/>

</div>

> **Illustrative concept dashboard** — a visual walkthrough of the live system. Shows real workflow stages, real tool stack, and real architecture. Not a production screenshot; production data is confidential.

---

## Architecture & System Design

```mermaid
flowchart TD
    classDef slack fill:#4A154B,stroke:#7b1fa2,stroke-width:2px,color:#fff
    classDef ai fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    classDef core fill:#e8eaf6,stroke:#3f51b5,stroke-width:2px
    classDef data fill:#e8f5e9,stroke:#388e3c,stroke-width:2px
    classDef fail fill:#ffebee,stroke:#c62828,stroke-width:2px,stroke-dasharray:5 3

    Slack["💬 Slack Request<br/>(webhook capture)"]:::slack --> Triage{"🧠 AI Triage<br/>Cascade"}:::ai

    subgraph Failsafe[" 🔒 Triple-AI Failsafe Layer "]
        GPT["GPT-4<br/>Primary classifier<br/>~2.1s · 99.2% success"]:::ai
        Claude["Claude<br/>Fallback classifier<br/>~3.4s · triggers on GPT-4 failure"]:::ai
        Regex["Regex Rules<br/>Last resort<br/>~0.1s · never offline"]:::fail
    end

    Triage -->|"1st attempt"| GPT
    Triage -->|"if GPT-4 fails"| Claude
    Triage -->|"if both fail"| Regex

    GPT --> Score["⚡ Redis<br/>Capacity Scoring<br/>sub-ms atomic updates"]:::core
    Claude --> Score
    Regex --> Score

    Score --> Assign["🎯 Auto-Assign<br/>+ SLA Watcher"]:::core
    Assign -->|"SLA risk"| Alert["🔔 Escalation<br/>Lead notification"]:::core
    Assign -->|"always"| Audit["📜 PostgreSQL<br/>Audit Trail<br/>correlation ID threaded"]:::data
    Alert --> Audit
```

**Design principles:**

1. **No single point of failure** — every external dependency has a fallback path
2. **Sub-millisecond decisions** — Redis for live capacity, PostgreSQL for permanent audit
3. **Proactive, not reactive** — SLA watchers run *before* deadlines, not after
4. **Full traceability** — every action, every AI decision, every assignment is logged

---

## How It Works — Step by Step

| Step | What happens | Tool | Latency | Why it matters |
|:---:|---|:---:|:---:|---|
| 1 | A request lands in Slack — webhook captures it instantly | Slack API | 0ms | No polling, no missed messages |
| 2 | GPT-4 reads the message, classifies: intent, urgency, language | OpenAI | ~2.1s | Happy path — 99.2% of messages classified here |
| 3 | If GPT-4 fails → Claude takes over automatically | Anthropic | ~3.4s | Provider outage? No problem — team never knows |
| 4 | If Claude also fails → regex rules extract the basics | Internal | ~0.1s | Even if every AI is down, pipeline still moves |
| 5 | Redis scores every teammate's current capacity atomically | Redis | 0.3ms | Always knows who has bandwidth *right now* |
| 6 | Work is auto-assigned to the best-fit person | n8n | <1ms | No more "who should take this?" |
| 7 | SLA watchers monitor time-remaining vs. assignee status | n8n | periodic | Escalation fires *before* deadline, not after |
| 8 | Every step is logged to PostgreSQL with a correlation ID | PostgreSQL | write | Any action traceable end-to-end |

---

## Triple-AI Failsafe Deep-Dive

The core innovation of FlowDesk: **the pipeline cannot die with a provider outage.**

```
                    ┌──────────────────────────────────┐
                    │     Incoming Slack Message       │
                    └──────────────┬───────────────────┘
                                   │
                    ┌──────────────▼───────────────────┐
         Attempt 1  │           GPT-4                  │
                    │   Primary classifier              │
                    │   Success rate: 99.2%             │
                    │   Avg latency: 2.1s               │
                    └──────────────┬───────────────────┘
                       fails? │   succeeds? ─────────────→ Redis
                              ▼
                    ┌──────────────────────────────────┐
         Attempt 2  │           Claude                 │
                    │   Fallback classifier             │
                    │   Triggers: 2x today              │
                    │   Avg latency: 3.4s               │
                    └──────────────┬───────────────────┘
                       fails? │   succeeds? ─────────────→ Redis
                              ▼
                    ┌──────────────────────────────────┐
         Attempt 3  │           Regex                  │
                    │   Last resort — never offline     │
                    │   Triggers: 0 in last 30 days     │
                    │   Avg latency: 0.1s               │
                    └──────────────┬───────────────────┘
                                   │
                                   ▼ → Redis
```

> The failsafe is not theoretical — Claude was triggered **2 times today** when GPT-4 rate-limited. The team never noticed.

---

## Key Metrics

| Metric | Value | Context |
|:---|:---:|---|
| Workflow nodes | 92 | Full pipeline complexity |
| Active connections | 70 | Inter-node data flows |
| AI redundancy | 3× | GPT-4 → Claude → Regex |
| Major versions | 5 | v1.0 → v5.1 (production-hardened) |
| Classification success | 99.2% | GPT-4 alone, before failsafe |
| Capacity lookup | 0.3ms | Redis atomic scoring |
| Audit coverage | 100% | Every action logged |

---

## System Health

| Indicator | Value | Status |
|:---|:---:|:---:|
| Uptime | 99.7% | 🟢 Healthy |
| Classification success | 99.2% | 🟢 Healthy |
| Failsafe triggers (today) | 3 | 🟡 Claude took over 2× |
| Avg response latency | 2.4s | 🟢 Within target |
| Active SLAs | 18 | 🟡 2 nearing escalation |
| Messages processed today | 1,247 | 🟢 +18% vs. yesterday |

---

## What's Ready vs What's Not

<div align="center">

| ✅ Ready — Built & Delivered | ❌ Not Included — By Design |
|:---|:---|
| Multi-layer failsafe cascade (GPT-4 → Claude → Regex) | Full workflow export & proprietary triage logic |
| Redis-backed capacity scoring with atomic updates | Production credentials, tokens & API keys |
| Proactive SLA escalation with lead notifications | Internal routing rules & team capacity data |
| Multi-language intent classification | Live client data & message history |
| Exponential backoff + timeout on every external call | Deployable production config |
| 92-node production workflow (v5.1, delivered) | Client-specific routing tables |

</div>

> **Production readiness: ~85%.** Architecture, failsafe logic, capacity scoring, SLA engine, and audit trail are production-hardened. What's withheld is **client-specific configuration** — routing rules, API credentials, and tenant data. Those are never publishable.

---

## Engineering Principles

> Most automation "works" in a demo. The real question is what happens when an API times out, a rate limit hits, or a third-party service goes down at 2am.

- 🛡️ **Multi-tier failsafes** — no single point of failure, ever
- 🔁 **Retry + exponential backoff** — on every external call
- 📜 **Full audit trails** — every decision traceable end-to-end
- ♻️ **Idempotent processing** — no double-counting, no duplicate runs
- 🎯 **Humans stay in control** — AI drafts, people decide

---

## Version History

| Version | What changed | Why |
|:---:|---|---|
| v1.0 | Initial single-AI triage (GPT-4 only) | First working prototype |
| v2.0 | Added Claude as fallback provider | GPT-4 outage caused 40min downtime |
| v3.0 | Added regex last-resort + exponential backoff | Claude also failed once — unacceptable |
| v4.0 | Redis capacity scoring + SLA escalation watchers | Manual assignment was the bottleneck |
| v5.0 | Multi-language support + full audit trail | Client expanded to 3 languages |
| v5.1 | Production hardening — timeout tuning, DLQ, idempotency | Final delivery to client |

---

## Tech Stack

| Layer | Tool | Role in this system |
|:---|:---|:---|
| Orchestration | **n8n** | 92-node workflow engine, scheduling, webhooks |
| AI — Primary | **OpenAI GPT-4** | Intent classification, urgency scoring, language detection |
| AI — Fallback | **Anthropic Claude** | Backup classifier, triggers when GPT-4 is unavailable |
| Cache | **Redis** | Sub-millisecond capacity scoring, atomic workload updates |
| Database | **PostgreSQL** | Permanent audit trail, assignment history, SLA tracking |
| Integration | **Slack API** | Native message capture, channel monitoring, notifications |
| Infrastructure | **Docker** | Self-hosted, full data control, no vendor lock-in |

---

## Confidentiality

> This repository is a **portfolio presentation**. No proprietary workflows, source code, JSON exports, or client data are published — **by design**. The architecture and engineering decisions are shown openly; the implementation details remain confidential to protect client interests.

---

<div align="center">

**Built by Sayad — AI Automation Engineer · Production-grade automation, not templates**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Let's_Talk-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://linkedin.com/in/khandokarsabbir)

</div>
