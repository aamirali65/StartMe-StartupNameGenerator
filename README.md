# StartMe-StartupNameGenerator

A startup-name generator: give it an industry and a few keywords, and it asks a Gemini model for six brandable name suggestions.

## How it works

The form in `src/components/home/index.jsx` collects an industry and keywords, then `src/generate.js` builds a prompt and calls `gemini-pro` through `@google/generative-ai`. The prompt asks for memorable, pronounceable names and returns them one per line.

## Stack

React 18 · Vite · Tailwind CSS · Google Generative AI SDK (an OpenAI dependency is also installed, unused by the current flow)

## Setup

The API key is read from the environment, so nothing secret lives in the source:

```bash
cp .env.example .env
# then put your key in .env:
# VITE_GEMINI_API_KEY=your-key-here

npm install
npm run dev
```

`.env` is gitignored. Grab a key from [Google AI Studio](https://aistudio.google.com/app/apikey).

If the key is missing, the app still loads and tells you when you try to generate.

## ⚠️ Revoke the old key

An earlier version of `src/generate.js` had a Gemini API key hardcoded in it. That key is **still in the git history**, so simply removing it from the current file is not enough — anyone can read it from an old commit.

Revoke it in Google AI Studio / Google Cloud Console, then issue a new one for `.env`.

## Note on browser-side keys

Vite inlines `VITE_*` variables into the built bundle, so a deployed copy of this site exposes the key to anyone who looks. That is acceptable for a personal key with a quota you monitor; if the key must stay secret, move the Gemini call behind a small server route and keep it there.
