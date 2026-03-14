---
title: "Rewrite for Clarity"
description: "Rewrites dense or confusing text into clear, direct prose without losing meaning"
category: "writing"
tags: ["clarity", "editing", "rewriting", "plain-language"]
model_target: "any"
author: "TMHSDigital"
version: "1.0"
---

## Prompt

Rewrite the following text to be clearer and more direct. Follow these rules:

1. Use active voice wherever possible
2. Break sentences longer than 25 words into two sentences
3. Replace jargon and filler phrases with plain words (e.g., "utilize" → "use", "in order to" → "to")
4. Keep all original meaning and facts intact — do not add or remove information
5. Preserve the original tone (formal, casual, technical) unless I say otherwise

After rewriting, list the 3 most impactful changes you made and why.

Text to rewrite:
{{text}}

## Usage

Replace `{{text}}` with any text you want cleaned up: emails, documentation, reports, proposals, social posts, etc.

Best used when:
- A draft feels wordy or hard to follow
- You need to simplify technical writing for a non-technical audience
- You want to tighten copy before publishing

To adjust scope, append one of:
- "Keep it under {{word count}} words"
- "Write at a 6th grade reading level"
- "This is for a legal audience — maintain formal register"

## Example Output

**Original:** "In order to facilitate the utilization of the new platform, it is recommended that all stakeholders who are involved in the implementation process ensure that they are in possession of the required credentials prior to the commencement of the onboarding session."

**Rewritten:** "Before the onboarding session begins, everyone involved in the implementation should have their credentials ready."

**Top 3 changes:**
1. Removed "in order to" and "facilitate the utilization of" — replaced with direct verb "use" (cut 8 words)
2. Converted passive "it is recommended that" to imperative "should" — clearer ownership
3. Consolidated three clauses into one sentence — reduced cognitive load

## Notes

- If you want the model to explain every change (not just the top 3), add: "Annotate each change inline using strikethrough for removed text"
- For bulk editing, paste multiple paragraphs and number them — the model will rewrite each one separately
- Variation: replace "clearer and more direct" with "more persuasive" or "more empathetic" to shift the goal
