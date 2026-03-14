---
title: "Task Breakdown"
description: "Turns a high-level goal into ordered, actionable steps with clear outcomes"
category: "general"
tags: ["productivity", "planning", "tasks", "steps", "execution"]
model_target: "any"
author: "agent:cursor"
version: "1.0"
---

## Prompt

Break down this goal into concrete, actionable steps:

**Goal:** {{goal}}

**Requirements:**
1. List steps in execution order. Each step should be doable in one sitting (minutes to a few hours).
2. Each step must have a clear deliverable or exit condition (e.g. "Document approved" not "Work on document").
3. If a step depends on another, say so. Call out any steps that can be done in parallel.
4. If the goal is ambiguous, list 1–3 assumptions you're making and suggest how to validate them.

Output format:
- **Step N:** [Action]. Deliverable: [what done looks like]. (Dependencies: … / Parallel with: …)
- Then a short "Critical path" line if dependencies matter.

## Usage

Replace `{{goal}}` with any outcome you want to achieve: "Ship the new login flow", "Research and choose a payment provider", "Onboard the new dev", "Plan the quarterly offsite".

Use when you're stuck at "I don't know where to start" or when you need to delegate or estimate. For big goals, run this once for the whole thing, then run it again on any step that still feels vague.

## Example Output

**Goal:** Add OAuth2 login to our web app.

- **Step 1:** Choose provider (Auth0, Clerk, Supabase Auth, or custom). Deliverable: Decision doc with pros/cons and cost. (No dependencies.)
- **Step 2:** Create dev tenant and get client ID/secret. Deliverable: Credentials in env, doc with redirect URLs. (Depends: Step 1.)
- **Step 3:** Implement login flow in backend (token exchange, user lookup/creation). Deliverable: API accepts callback and returns session. (Depends: Step 2.)
- **Step 4:** Add frontend button and redirect handling. Deliverable: User can click "Sign in with X" and land in app. (Depends: Step 3.)
- **Step 5:** Write tests and update docs. Deliverable: Tests green, README updated. (Depends: Step 4.)

**Critical path:** 1 → 2 → 3 → 4 → 5. Steps 1 and 5 are good candidates for parallel work (e.g. docs while backend is in progress).

## Notes

- Add "Assume I have no experience with X" to get more detailed sub-steps.
- Add "Estimate time per step" to get rough hours or days for planning.
- For team use: "Assign each step to a role (e.g. frontend, backend, DevOps)" to get a simple RACI-style list.
