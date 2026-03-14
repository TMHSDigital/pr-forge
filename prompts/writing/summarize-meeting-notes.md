---
title: "Summarize Meeting Notes"
description: "Converts raw meeting notes into a structured summary with decisions, action items, and owners"
category: "writing"
tags: ["meetings", "summary", "productivity", "action-items"]
model_target: "any"
author: "TMHSDigital"
version: "1.0"
---

## Prompt

Summarize the following meeting notes into a structured report with these sections:

1. **Meeting Overview** — date, attendees, and purpose (1-2 sentences)
2. **Key Decisions** — bulleted list of decisions made
3. **Action Items** — table with columns: Task | Owner | Due Date
4. **Open Questions** — unresolved items that need follow-up
5. **Next Meeting** — date and agenda if mentioned

If any information is missing (e.g., no due dates mentioned), mark it as TBD. Do not invent details.

Meeting notes:
{{notes}}

## Usage

Paste raw meeting notes — transcripts, bullet dumps, or stream-of-consciousness notes — into `{{notes}}`. Works with messy, unformatted input.

Best for:
- Standup and sprint retro notes
- Client or stakeholder meetings
- Any meeting where you need a shareable summary

## Example Output

**Meeting Overview:** Product sync on March 14, 2026. Attendees: Alex, Jordan, Sam. Purpose: review Q2 roadmap priorities.

**Key Decisions:**
- Authentication redesign moved to Q3
- Mobile push notifications prioritized for April release

**Action Items:**

| Task | Owner | Due Date |
|---|---|---|
| Draft push notification spec | Jordan | March 21 |
| Update roadmap doc | Sam | March 18 |

**Open Questions:**
- Budget approval for contractor still pending

**Next Meeting:** March 21, 2026 — sprint planning

## Notes

- Add "Send this as a Slack message" or "Format this as an email" to change the output format
- For long transcripts, prepend: "Focus only on decisions and action items, skip small talk"
