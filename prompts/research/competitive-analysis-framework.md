---
title: "Competitive Analysis Framework"
description: "Produces a structured competitor breakdown covering positioning, strengths, weaknesses, and gaps"
category: "research"
tags: ["competitive-analysis", "business", "strategy", "research", "marketing"]
model_target: "any"
author: "TMHSDigital"
version: "1.0"
---

## Prompt

Analyze {{competitor name}} as a competitor to {{my company/product}}. Structure your analysis as follows:

**1. Overview**
- What do they do and who is their primary customer?
- What is their core value proposition in one sentence?

**2. Positioning**
- How do they position themselves in the market (price, quality, niche)?
- What keywords or phrases dominate their messaging?

**3. Strengths**
- List 3–5 genuine strengths (not just size or funding)

**4. Weaknesses**
- List 3–5 genuine weaknesses or gaps based on public signals (reviews, complaints, missing features)

**5. Differentiation Opportunities**
- Where could {{my company/product}} credibly out-position them?
- What underserved customer pain points do they leave open?

**6. Watch List**
- What should I monitor about this competitor over the next 6 months?

Base your analysis on publicly available information. Flag any assumptions clearly.

## Usage

Replace `{{competitor name}}` with the company or product you want to analyze, and `{{my company/product}}` with your own.

Works best when you supply additional context after the prompt, such as:
- Your own positioning or target customer
- The specific market or geography
- Recent news about the competitor

Example opener: `Analyze Notion as a competitor to my B2B project management SaaS targeting construction firms.`

## Example Output

> **1. Overview:** Notion is an all-in-one workspace combining notes, databases, and project management. Primary customer: knowledge workers and small teams who want flexibility over structure.
>
> **2. Positioning:** Premium-priced generalist tool. Messaging centers on "the connected workspace" and customizability.
>
> **3. Strengths:** Extreme flexibility, strong brand among developers/designers, large template ecosystem, active community.
>
> **4. Weaknesses:** Steep learning curve, poor offline support, not purpose-built for any vertical (construction, healthcare, legal), slow on mobile, no native time tracking.
>
> **5. Differentiation Opportunities:** A vertical-specific tool with construction-native workflows (RFIs, submittals, punch lists) would win customers who find Notion too generic.
>
> **6. Watch List:** Enterprise tier expansion, AI feature rollout pace, any vertical-specific acquisitions.

## Notes

- For deeper analysis, follow up with: "Now do the same analysis for {{competitor 2}} and compare them side by side"
- To validate weaknesses, add: "Find 5 real customer complaints from reviews on G2, Capterra, or Reddit to support the weaknesses section"
- Useful for pitch decks, go-to-market planning, and quarterly strategy reviews
