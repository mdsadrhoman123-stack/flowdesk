# 📈 Case Study — flowdesk

## Problem
A rapidly growing service team was spending over 15 hours per week manually reading Slack messages and assigning them to project managers. Requests were frequently missed in busy threads, leading to "silent failures" where clients didn't receive timely responses, impacting brand reputation and SLA compliance.

## Solution
We deployed **flowdesk**, an end-to-end automation engine that transformed Slack from a messy chat tool into a structured project intake portal. By implementing a triple-redundant AI triage system, we ensured that every request was categorized correctly, even during provider outages. The system integrated directly with their team capacity data in Redis to auto-assign work without human intervention.

## Impact
- **Triage Speed**: Reduced from hours of manual work to seconds of automated processing.
- **Reliability**: Eliminated 100% of missed requests due to Slack noise.
- **Team Satisfaction**: Project managers no longer start their day with a mountain of triage work, allowing focus on high-value delivery.

## Engineering Approach
- **Design for Failure**: The AI cascade ensures that if OpenAI goes down, the business process continues via fallback models.
- **Atomic State Management**: Using Redis for capacity ensures that two people are never accidentally over-assigned simultaneously.
- **SLA-First Design**: The system doesn't just assign work; it guarantees it gets done by monitoring timelines proactively.

## Confidentiality Note
This case study reflects the architectural achievements and business outcomes. All specific client names, internal team structures, and proprietary logic have been omitted.
