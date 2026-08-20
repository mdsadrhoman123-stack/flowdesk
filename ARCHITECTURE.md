# 🏗️ Technical Architecture — flowdesk

```mermaid
flowchart TD
    classDef purple fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px;
    
    A[Slack Webhook]:::purple --> B{Triage Layer}:::purple
    
    subgraph AI_Engine [AI Triage Cascade]
    B1[GPT-4 Analysis]:::purple
    B2[Claude 3 Fallback]:::purple
    B3[Pattern Matcher]:::purple
    end
    
    B --> B1
    B1 -- Failure --> B2
    B2 -- Failure --> B3
    
    B1 --> C[Capacity Engine]:::purple
    B2 --> C
    B3 --> C
    
    C --> C1[Redis Lookup]:::purple
    C1 --> C2[Atomic Scoring]:::purple
    
    C2 --> D[Assignment Service]:::purple
    D --> D1[SLA Timer]:::purple
    D --> E[PostgreSQL]:::purple
    
    D1 --> F[Notification Service]:::purple
```

## Components
- **AI Triage Cascade**: A resilient classification layer that attempts primary analysis with GPT-4, falling back to Claude and finally Regex to ensure 100% uptime.
- **Capacity Engine**: A Redis-backed service that calculates team load in real-time to prevent over-assignment.
- **SLA Watcher**: An active monitoring node that tracks task age and triggers escalations based on predefined lead notifications.

## Data Flow
1. **Intake**: A Slack webhook triggers the workflow upon a new message in designated channels.
2. **Classification**: The request is routed through the AI cascade to determine intent and priority.
3. **Scoring**: The system queries Redis for current member availability and capacity scores.
4. **Assignment**: The task is assigned to the best-fit team member and recorded in PostgreSQL.
5. **Monitoring**: The SLA timer begins tracking, triggering alerts if milestones are missed.

## Resilience & Compliance
- **Multi-Provider Redundancy**: The system is designed to survive API outages of individual AI providers.
- **Exponential Backoff**: All external API calls implement sophisticated retry logic to handle rate limits and transient errors.
- **Audit Trail**: Every state change is recorded in an append-only PostgreSQL table for complete transparency.

## Confidentiality
Note that specific workflow JSON exports, proprietary prompt engineering, and internal database schemas are withheld to protect client IP.
