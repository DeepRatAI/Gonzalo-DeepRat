<div align="center">

# AI Portfolio Template

### A production-ready portfolio website with a built-in RAG chatbot

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Gemini](https://img.shields.io/badge/Gemini-2.5_Flash-4285F4?logo=google)](https://ai.google.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

<br/>

**Live demo → [deeprat.tech](https://deeprat.tech)**

<br/>

> Fork it. Swap the content. Deploy. You now have a portfolio with an AI assistant that knows everything about you.

</div>

---

## What is this?

A **modern portfolio website** with an embedded **RAG-powered AI chatbot** that answers questions about you — your projects, skills, experience, and anything else you write in a simple Markdown file.

Built for developers, AI engineers, and anyone who wants their portfolio to *talk back*.

### Key Features

| Feature | Details |
|---------|---------|
| **RAG Chatbot** | Retrieval-Augmented Generation grounded in your own knowledge base — no hallucinations about you |
| **Streaming responses** | Real-time SSE streaming with Gemini 2.5 Flash |
| **Dark-first design** | Glass morphism, gradient orbs, animated background, fully responsive |
| **Security built-in** | Rate limiting, prompt injection defense, PII protection |
| **Mobile-ready** | Responsive across all screen sizes |
| **SEO optimized** | OpenGraph, Twitter cards, JSON-LD schema, sitemap, robots.txt |
| **One-command deploy** | Push to GitHub → auto-deploys on Vercel |

---

## Architecture

```
┌─────────────────────────────────────────────────┐
│                   Frontend                       │
│   Next.js 16 · React 19 · Tailwind v4 · shadcn  │
├─────────────────────────────────────────────────┤
│                  Chat Panel                      │
│   SSE streaming · Markdown rendering · Glass UI  │
├──────────────┬──────────────────────────────────┤
│  /api/chat   │         RAG Pipeline              │
│  (Route)     │  HuggingFace embeddings (MiniLM)  │
│              │  Cosine similarity retrieval       │
│              │  Gemini 2.5 Flash generation       │
├──────────────┴──────────────────────────────────┤
│              Knowledge Base                      │
│   Markdown corpus → Chunked → Embedded → JSON    │
└─────────────────────────────────────────────────┘
```

---

## Use it as YOUR portfolio

This is the fun part. You don't need to build anything from scratch — just customize the content.

### 1. Fork & clone

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_FORK.git
cd YOUR_FORK
npm install
```

### 2. Get your API keys (free)

| Service | What for | Get it |
|---------|----------|--------|
| **Google AI Studio** | Gemini 2.5 Flash (chat generation) | [aistudio.google.com](https://aistudio.google.com/apikey) |
| **HuggingFace** | Sentence embeddings (RAG retrieval) | [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens) |

Both have generous free tiers — more than enough for a personal portfolio.

Create a `.env.local` file in the project root:

```env
GOOGLE_AI_API_KEY=your_google_ai_key
HF_TOKEN=your_huggingface_token
```

### 3. Write your corpus

Edit the file `kb/sources/final/base_corpus.md` — this is the **single source of truth** for your AI assistant.

Write everything you want the chatbot to know about you in natural Markdown:

```markdown
# Identity
I'm Jane Doe, a Full-Stack Developer based in Berlin...

# Projects
## ProjectX
A real-time analytics dashboard built with...

# Tech Stack
Python, React, PostgreSQL, Docker, AWS...

# Experience
- 2024-present: Senior Dev at Company
- 2022-2024: Dev at Startup

# Contact
Email: jane@example.com
LinkedIn: linkedin.com/in/janedoe
```

> **Tip:** Write it like you're briefing a human assistant about yourself. The RAG system chunks it, embeds it, and retrieves the relevant parts per question.

### 4. Customize the UI

The main sections live in `src/components/`:

| File | Section | What to change |
|------|---------|----------------|
| `hero-section.tsx` | Landing / Hero | Your name, title, tagline |
| `projects-section.tsx` | Projects | Your projects, banners, descriptions |
| `stack-section.tsx` | Tech Stack | Your technologies and categories |
| `contact-section.tsx` | Contact | Your email, LinkedIn, GitHub |
| `navbar.tsx` | Navigation | Your logo (replace `public/logo.png`) |
| `footer.tsx` | Footer | Your name, links |

Project banners go in `public/banners/` and your logo in `public/logo.png`.

### 5. Ingest & run

```bash
# Generate embeddings for your corpus
npm run ingest

# Start the dev server
npm run dev
```

Open [localhost:3000](http://localhost:3000) and talk to your AI assistant.

### 6. Deploy to Vercel (free)

1. Push your repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) and import your repo
3. Add `GOOGLE_AI_API_KEY` and `HF_TOKEN` as Environment Variables
4. Click **Deploy**

Every push to `main` auto-deploys.

---

## Project Structure

```
├── kb/
│   ├── sources/final/         # Your knowledge base (Markdown)
│   └── index/                 # Generated vector index (auto)
├── public/
│   ├── banners/               # Project banner images
│   ├── icons/                 # Tech stack icons
│   ├── logo.png               # Your logo
│   └── cv.pdf                 # Your CV (optional)
├── scripts/
│   └── ingest.ts              # RAG ingestion pipeline
├── src/
│   ├── app/
│   │   ├── api/chat/route.ts  # Chat API (Gemini + RAG)
│   │   ├── page.tsx           # Main page
│   │   └── layout.tsx         # Root layout + metadata
│   ├── components/            # All UI sections
│   └── lib/
│       └── rag.ts             # RAG retrieval logic
├── .env.local                 # API keys (not committed)
└── package.json
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4, shadcn/ui |
| LLM | Google Gemini 2.5 Flash |
| Embeddings | HuggingFace `all-MiniLM-L6-v2` |
| RAG | Custom chunking + cosine similarity |
| Deployment | Vercel (serverless) |

---

## Scripts

```bash
npm run dev        # Start dev server (Turbopack)
npm run build      # Ingest corpus + build for production
npm run ingest     # Re-generate vector embeddings
npm run lint       # ESLint
npm run start      # Start production server
```

---

## Contributing

Found a bug? Have an idea? PRs and issues are welcome.

If you build your own portfolio with this template, I'd love to see it — drop me a message.

---

## License

MIT — use it, fork it, make it yours.

---

<div align="center">

**Built by [Gonzalo Romero (DeepRat)](https://deeprat.tech)** · AI Engineer

[LinkedIn](https://www.linkedin.com/in/gonzalo-luis-romero-b9b5b4355) · [GitHub](https://github.com/DeepRatAI) · [Email](mailto:deeprat.tec@gmail.com)

</div>
