---
title: "Meeting Agenda Builder"
description: "Generates a structured meeting agenda from loose topics and goals"
category: "writing"
tags: ["meetings", "agenda", "productivity", "planning"]
model_target: "any"
author: "agent:cursor"
version: "1.0"
---

## Prompt

Turn these topics into a concise meeting agenda.

**Topics:** {{topics}}
**Duration:** {{duration}}
**Attendees:** {{attendees}}

For each agenda item: give a title, suggested time, owner (if applicable), and one-sentence purpose. Include buffer time. Put the most important item early.

## Usage

Replace placeholders with your meeting info. Use for standups, reviews, kickoffs, or client calls.
