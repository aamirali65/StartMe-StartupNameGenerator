# StartMe-StartupNameGenerator

A startup-name generator: give it an industry and a few keywords, and it asks a Gemini model for six brandable name suggestions.

## How it works

The form in `src/components/home/index.jsx` collects an industry and keywords, then `src/generate.js` builds a prompt and calls `gemini-pro` through `@google/generative-ai`. The prompt asks for memorable, pronounceable names and returns them one per line.

## Stack

React 18 · Vite · Tailwind CSS · Google Generative AI SDK (an OpenAI dependency is also installed, unused by the current flow)

## Running

```bash
npm install
npm run dev
```

## ⚠️ Before you run or redeploy this

**The Gemini API key is hardcoded in `src/generate.js`.** It is committed to this public repository, which means it is compromised — anyone who reads the file can use it against your quota.

1. Revoke that key in Google AI Studio / Google Cloud Console and create a new one.
2. Move the new key into an environment variable (`import.meta.env.VITE_GEMINI_API_KEY` with a `.env` file that stays out of git) and read it in `src/generate.js`.

Also note that a browser-side API key is visible to anyone using the app, so a key that must stay secret belongs behind a small server route instead.

## Notes

Practice project for calling an LLM from a React front end. Once the key is rotated out of the source, this is a reasonable small example of prompt construction and streaming-free responses.
