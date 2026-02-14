# DeepRat Portfolio — AI-Powered Personal Website

A modern, production-grade personal portfolio website for Gonzalo Romero (DeepRat), featuring an embedded RAG-powered chatbot that can answer questions about professional experience, projects, and technical expertise.

## 🚀 Features

- **Modern Portfolio Design**: Clean, sober aesthetic with responsive design
- **RAG-Powered Chatbot**: AI assistant grounded in documented sources with citations
- **Streaming Responses**: Real-time streaming chat with source references
- **SEO Optimized**: OpenGraph, Twitter cards, JSON-LD schema, sitemap
- **Security-First**: Rate limiting, prompt injection defense, PII protection
- **CI/CD Ready**: GitHub Actions workflow for automated builds

## 📁 Project Structure

```
deeprat/
├── kb/                          # Knowledge base
│   ├── sources/final/           # Curated source documents (MD)
│   └── index/                   # Generated vector index
├── scripts/
│   └── ingest.ts                # Ingestion pipeline
├── src/
│   ├── app/
│   │   ├── api/chat/            # Chat API route
│   │   ├── page.tsx             # Main page
│   │   ├── layout.tsx           # Root layout with metadata
│   │   ├── sitemap.ts           # Dynamic sitemap
│   │   └── robots.ts            # Robots.txt config
│   ├── components/              # React components
│   │   ├── ui/                  # shadcn/ui components
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── hero-section.tsx
│   │   ├── projects-section.tsx
│   │   ├── method-section.tsx
│   │   ├── chat-section.tsx
│   │   └── contact-section.tsx
│   └── lib/
│       ├── rag.ts               # RAG retrieval functions
│       └── utils.ts             # Utility functions
├── .github/workflows/           # CI/CD configuration
└── package.json
```

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS + shadcn/ui
- **AI/LLM**: OpenAI (GPT-4o-mini, text-embedding-3-small)
- **Vector Search**: In-memory cosine similarity
- **Deployment**: Vercel-ready

## 🏃 Getting Started

### Prerequisites

- Node.js 20+
- OpenAI API key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/DeepRatAI/deeprat.tech.git
   cd deeprat
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   # Edit .env.local and add your OPENAI_API_KEY
   ```

4. Build the knowledge base:
   ```bash
   npm run ingest
   ```

5. Start development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000)

## 📚 Knowledge Base Management

### Adding New Sources

1. Add Markdown files to `kb/sources/final/`
2. Follow the naming convention: `topic.md`
3. Run the ingestion pipeline:
   ```bash
   npm run ingest
   ```

### Source Document Guidelines

- Use clear, factual content
- Include headers for better chunking
- Avoid personal/private information
- Keep content professional and accurate

### Updating Sources

1. Edit files in `kb/sources/final/`
2. Re-run ingestion: `npm run ingest`
3. Restart the dev server or redeploy

## 🔐 Security Features

### Chatbot Safety Boundaries

- **Grounded Responses**: Only answers based on knowledge base content
- **No Fabrication**: Never invents experience, employers, or achievements
- **PII Protection**: Refuses requests for private information
- **Prompt Injection Defense**: System prompt instructs to ignore override attempts
- **Rate Limiting**: IP-based rate limiting (20 requests/minute)

### Public Information Only

The chatbot only shares publicly available contact information:
- Email: info@deeprat.tech
- LinkedIn: linkedin.com/in/gonzalo-romero-b9b5b4355
- GitHub: github.com/DeepRatAI
- Website: deeprat.tech

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect repository to Vercel
3. Add environment variables:
   - `OPENAI_API_KEY`
4. Deploy

### Manual Build

```bash
npm run build
npm run start
```

## 📊 CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/build.yml`):

1. Runs on push to `main` and pull requests
2. Installs dependencies
3. Runs ingestion pipeline (generates embeddings)
4. Builds Next.js application
5. Uploads build artifacts

### Required Secrets

Add to GitHub repository secrets:
- `OPENAI_API_KEY`: Your OpenAI API key

## 🔧 Configuration

### Chunking Parameters (scripts/ingest.ts)

- `CHUNK_SIZE`: 500 characters
- `CHUNK_OVERLAP`: 100 characters
- `EMBEDDING_MODEL`: text-embedding-3-small

### Chat Configuration (src/app/api/chat/route.ts)

- `TOP_K`: 5 (number of retrieved chunks)
- `RATE_LIMIT`: 20 requests per minute
- `MODEL`: gpt-4o-mini

## 📝 License

MIT License - See LICENSE file for details.

## 👤 Author

**Gonzalo Romero (DeepRat)**
- Website: [deeprat.tech](https://www.deeprat.tech)
- GitHub: [@DeepRatAI](https://github.com/DeepRatAI)
- LinkedIn: [Gonzalo Romero](https://www.linkedin.com/in/gonzalo-romero-b9b5b4355/)
