# CLAUDE.md

Behavioral guidelines to reduce common LLM coding mistakes, plus Hobson project context. Read this first before making changes.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

# Project: Hobson

## What Hobson Is

Hobson is an AI real estate concierge platform for South Florida (Palm Beach County), built by Paul Schafranick, a 28-year South Florida real estate broker. It pulls live IDX listings and lets users search/chat with an AI assistant about properties.

## Tech Stack

- **Frontend/Backend:** Next.js
- **Hosting/Deploy:** Vercel (auto-deploys from `main` branch on GitHub)
- **Database:** MongoDB Atlas
- **Listings Data:** Spark RESO Web API (Palm Beach County IDX) — 200+ live listings pulling successfully
- **Voice (in progress):** Deepgram Nova (speech-to-text) and Aura (text-to-speech); ElevenLabs also explored (Orion voice, British butler persona)
- **Repo:** github.com/PSchaf7231/hobson-concierge — this is the single source of truth

## Design System

- Split-screen layout: Hobson chat on the left, property listings on the right
- Navy/gold color scheme (Anasa design system)
- Design center overlay on property cards — currently on hold, not being built right now

## Project History (for context only — not necessarily current issues; confirm before treating as active)

- **Env variable naming:** A past mismatch existed between `MONGODB_URL` and `MONGO_URL` naming, which caused a connection bug. If touching Mongo config, confirm current variable name before assuming this is still an issue.
- **Branch cleanup:** The repo previously had multiple branches, including one called `conflict_090726_1832`, from earlier IDX troubleshooting. Plan is to delete unused branches once Hobson is stable — confirm with Paul which branches are safe to remove before deleting anything.
- **AI builder credits:** Emergent is the primary AI builder for Hobson. Emergent gateway credits can run out, which requires routing directly through the Anthropic API instead. QuantumByte was tried and abandoned — do not suggest going back to it.

## Features In Development (don't build unless asked)

- Per-client memory profiles (highest-value unbuilt feature)
- "One Hobson, three modes": search / design / furniture
- Sterling — a separate back-office AI agent concept
- Voice Agent integration — still being evaluated; concern is that multi-filter voice search (price range + location + amenities) can misfire and give false confidence. Voice may end up used for concierge-style Q&A (utilities, moving companies, general info) rather than property search itself.
- Hobson Concierge section — general lifestyle/moving info (utilities, cable, moving companies), NOT restaurant recommendations unless backed by a real live data source like Google Places API

## Workflow Rules

- Claude writes complete files. Paul pastes them into the GitHub web editor. Vercel auto-deploys from there.
- Two real attempts to fix a bug, then stop and flag it rather than guessing repeatedly and burning credits.
- Never attempt to edit existing PDFs — always rebuild from scratch if a PDF deliverable is needed.
- Short, direct responses. No em dashes. No corporate jargon or AI-tell words like "bespoke," "curate," or "seamless."
- The Hobson YouTube channel is residential-only. Never suggest commercial/NNN real estate content for it.

## Self-Learning

When Paul corrects something, or a mistake is caught mid-task: before continuing, add a one-line rule under **Lessons** below, with a short reason so it's clear later why the rule exists. If Lessons grows past 20 items, ask Paul before adding more and suggest which old ones can be retired.

## Lessons

- (rules get added here as they come up)
