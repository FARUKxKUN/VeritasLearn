# VeritasLearn

Redesigned in October 2026. The version presented at the hackathon is tagged `hackathon-2026-02`.

**1st place, IEEE OPSYNC hackathon.**

VeritasLearn is a learning app built around one idea: before you use AI-generated content, you should prove you understand it. The AI tutor explains a topic, then a comprehension gate (quizzes, flashcards, study material) checks your understanding before the answer is yours to use. Scores feed tiers, badges and a leaderboard.

This repo is the clickable prototype we presented. AI responses and leaderboard data are mocked.

![VeritasLearn landing](docs/screenshot.png)

![The comprehension gate](docs/gate.png)

## Team

Built as a team. [Yassine Bouteraa](https://github.com/yassinebouteraa) and [Rayen Chatti](https://github.com/rayenchatti) led the concept and the pitch. Farouk Battikh built the prototype.

## What's in the prototype

- Landing page with a playable one-question gate
- Chat-style tutor (`/learn`) with mocked AI responses
- Comprehension gate: timed quiz, results screen, flashcards, study materials
- Dashboard with score, tier ladder and activity log (`/dashboard`)
- Local and national leaderboards (`/leaderboard`)

## Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS v4 (CSS-first tokens)
- motion and GSAP ScrollTrigger
- React Router
- Phosphor icons
- Instrument Serif, Bricolage Grotesque and Geist Mono (self-hosted)

## Run locally

```bash
npm install
npm run dev
```
