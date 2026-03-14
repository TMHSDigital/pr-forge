---
title: "Rubber Duck Debugger"
description: "Guides you through explaining your code problem step-by-step to surface the bug yourself"
category: "coding"
tags: ["debugging", "rubber-duck", "problem-solving", "explanation"]
model_target: "any"
author: "TMHSDigital"
version: "1.0"
---

## Prompt

I'm going to explain a bug I'm dealing with. As I explain it, ask me clarifying questions one at a time to help me think through it. Do not suggest a fix until I've answered at least 3 questions. After I've walked through it, summarize what I've told you and then offer your hypothesis about the root cause.

Here is my problem: {{problem description}}

Here is the relevant code:
```
{{code block}}
```

## Usage

Use this when you're stuck on a bug and need to think out loud. Replace `{{problem description}}` with a plain-English description of what's going wrong, and `{{code block}}` with the relevant code snippet.

The model acts as a rubber duck — it doesn't just hand you the answer. It asks questions that force you to articulate your assumptions, which is often where the bug hides.

Works best with complex or logic bugs where you already know the code "should" work.

## Example Output

> **Question 1:** What is the expected output vs. what are you actually getting?
>
> **Question 2:** At what line or function does the behavior diverge from what you expect?
>
> **Question 3:** Have you verified the input values are what you think they are at the point the function is called?
>
> *(After answers)* Based on what you've described, it sounds like the loop exit condition is evaluated before the state update, which means it's always checking the previous iteration's value. The root cause is likely a race condition between the state setter and the conditional check.

## Notes

- Particularly effective for async bugs, off-by-one errors, and state management issues
- If you want the model to skip the questions and go straight to diagnosis, add: "Skip the questions and give me your best hypothesis immediately"
- Pair with a follow-up: "Now show me a minimal reproduction case" to isolate the bug further
