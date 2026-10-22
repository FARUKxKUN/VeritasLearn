# VeritasLearn

**1st place, IEEE OPSYNC hackathon.**

VeritasLearn is a learning app built around one idea: before you use AI-generated content, you should prove you understand it. The AI tutor explains a topic, then a comprehension gate (quizzes, flashcards, study material) checks your understanding before the answer is yours to use. Scores feed tiers, badges and a leaderboard.

This repo is the clickable prototype we presented. AI responses and leaderboard data are mocked.

## Team

Built as a team. My teammates led the concept and the pitch. I built the prototype.

## What's in the prototype

- Landing page with a how-it-works walkthrough
- Chat-style tutor (`/learn`) with mocked AI responses
- Comprehension gate: timed quiz, results screen, flashcards, study materials
- Dashboard with score, tier card and badges (`/dashboard`)
- Local and national leaderboards (`/leaderboard`)

## Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Router
- Lucide icons

## Run locally

```bash
npm install
npm run dev
```
