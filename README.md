# Bushnell Dev

An interactive web prototype based on *Warriors Don't Cry*. The project combines static HTML/CSS/JavaScript screens, a chapter-based text adventure, and an AI-powered character chat with Dottie.

## What This Project Contains

- A chapter selection map for the *Warriors Don't Cry* experience.
- A reusable text-adventure player that loads story content from JSON files in `data/chapters`.
- A Dottie character chat page that sends conversation history to an API route.
- Supporting visual assets for chapter maps, playbills, characters, Dottie animation layers, and scene backgrounds.
- A small serverless API endpoint at `api/chat.js` for OpenAI text generation, ElevenLabs voice generation, and conversation logging through a Make webhook.

## Current Chapter Status

The project currently defines five chapter files:

| Chapter file | Title | Status |
| --- | --- | --- |
| `data/chapters/chapter-1.json` | Regret | Content-filled, 26 scenes |
| `data/chapters/chapter-2.json` | Innocence | Placeholder |
| `data/chapters/chapter-3.json` | Confrontation | Placeholder |
| `data/chapters/chapter-4.json` | Chapter 4 | Placeholder |
| `data/chapters/chapter-5.json` | Chapter 5 | Placeholder |

The chapter map exposes all five chapters, but only Chapter 1 currently appears to have full playable story content.

## Live Site

The project is hosted on Vercel:

- https://project-v9m5f.vercel.app/index.html

The repository is structured for this kind of Vercel deployment:

- The frontend is static HTML/CSS/JavaScript.
- The API route lives at `api/chat.js`.
- The browser calls the API using `/api/chat`.
- `api/chat.js` exports a default request handler, which matches Vercel serverless function conventions.

## Is There RAG?

No retrieval-augmented generation system is implemented in this codebase.

The Dottie chat sends the conversation history directly to OpenAI with a system prompt. There is no evidence of:

- embeddings
- vector database
- document retrieval
- indexed knowledge base
- LangChain or LlamaIndex pipeline
- Pinecone, Supabase vector search, Chroma, Weaviate, or similar storage

The AI behavior is prompt-driven rather than retrieval-driven.

## Key Files and Folders

- `index.html` - Intro/stage selection experience.
- `warriors-map.html` - Chapter selection map.
- `text-adventure.html` - Story player page.
- `dottie.html` - Dottie chat page.
- `dottie-intro.html` - Dottie intro/animation page.
- `playbills.html` - Playbill carousel page.
- `api/chat.js` - Serverless API for Dottie chat, audio generation, and logging.
- `js/text-adventure.js` - Loads chapter JSON and renders story scenes.
- `js/map.js` - Powers the chapter map popup and chapter navigation.
- `js/dottie.js` - Dottie animation, chat UI, API calls, and story handoff logic.
- `data/chapters/` - Chapter JSON files.
- `css/` - Page-specific styles.
- `visuals/`, `visuals-updated/`, `characters/`, `dottie/`, `prompters/` - Image assets.

## Requirements

- Node.js, for installing the OpenAI dependency and running the serverless API locally.
- An OpenAI API key for Dottie text responses.
- An ElevenLabs API key for Dottie voice audio.

Required environment variables:

```bash
OPENAI_API_KEY=your_openai_api_key
ELEVEN_LABS_API_KEY=your_elevenlabs_api_key
```

## Running Locally

Install dependencies:

```bash
npm install
```

Because the frontend calls `/api/chat`, the full Dottie chat experience should be run through a local server that supports the `api/chat.js` serverless route. The easiest path is the Vercel CLI:

```bash
npm install -g vercel
vercel dev
```

Then open the local URL printed by the Vercel CLI, usually:

```text
http://localhost:3000
```

Static pages can also be opened directly in a browser for visual review, but Dottie chat will not work correctly without the `/api/chat` route and environment variables.

## Main User Flow

1. Open `index.html` for the intro experience.
2. Continue to the chapter map at `warriors-map.html`.
3. Select a chapter.
4. The story player opens `text-adventure.html?chapter=chapter-x`.
5. Story content is loaded from `data/chapters/chapter-x.json`.
6. Some story scenes can send the player to Dottie for a reflective chat.
7. Dottie returns the player to the saved chapter and scene using `localStorage`.

## Responsive Design

Responsive design has been partially implemented. The CSS uses viewport units, `clamp()`, flexible layout, wrapping, and media queries for smaller screens and shorter viewports.

Relevant styles live mainly in:

- `css/map.css`
- `css/text-adventure.css`
- `css/dottie.css`
- `css/playbills.css`
- `css/index.css`

The text adventure stylesheet contains overlapping layout definitions for `.adventure-cont` and `.options`, so mobile and tablet behavior should be tested carefully before production use.
