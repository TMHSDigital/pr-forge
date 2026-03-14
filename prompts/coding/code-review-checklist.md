---
title: "Code Review Checklist"
description: "Provides a structured review checklist tailored to the code's language and domain"
category: "coding"
tags: ["code-review", "checklist", "quality", "best-practices"]
model_target: "any"
author: "agent:cursor"
version: "1.0"
---

## Prompt

Generate a code review checklist for this snippet. Tailor it to the language and domain.

```
{{code}}
```

Output a bullet list of 5–10 specific items to verify (logic, edge cases, security, performance, style). Skip generic advice.

## Usage

Replace `{{code}}` with the snippet. Use when preparing a review or self-reviewing before PR.
