import { InferenceClient } from "@huggingface/inference";
import vectorIndex from "@/../kb/index/vector-index.json";

const EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2";
const TOP_K = 5;

interface Chunk {
  id: string;
  content: string;
  filename: string;
  embedding: number[];
}

interface RetrievalResult {
  chunk: Chunk;
  similarity: number;
}

interface VectorIndex {
  version: string;
  created: string;
  chunks: Chunk[];
  metadata: {
    totalChunks: number;
    embeddingModel: string;
    chunkSize: number;
    chunkOverlap: number;
  };
}

// Cosine similarity
function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length || a.length === 0) return 0;
  
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  const denominator = Math.sqrt(normA) * Math.sqrt(normB);
  return denominator === 0 ? 0 : dotProduct / denominator;
}

export async function retrieve(
  query: string,
  hf: InferenceClient,
  topK: number = TOP_K
): Promise<RetrievalResult[]> {
  const index = vectorIndex as VectorIndex;
  
  // If no chunks, return empty
  if (index.chunks.length === 0) {
    console.warn("No chunks in vector index");
    return [];
  }

  // Generate query embedding using HuggingFace
  const embedding = await hf.featureExtraction({
    model: EMBEDDING_MODEL,
    inputs: query,
  });

  // Flatten if nested
  const queryEmbedding = Array.isArray(embedding[0]) 
    ? (embedding as number[][]).flat() 
    : embedding as number[];

  // Calculate similarity for each chunk
  const results: RetrievalResult[] = index.chunks
    .filter(chunk => chunk.embedding && chunk.embedding.length > 0)
    .map((chunk) => ({
      chunk,
      similarity: cosineSimilarity(queryEmbedding, chunk.embedding),
    }))
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, topK);

  return results;
}

export function formatContext(results: RetrievalResult[]): string {
  if (results.length === 0) {
    return "No relevant context found in the knowledge base.";
  }
  return results
    .map((r, i) => `[${i + 1}] (${r.chunk.filename})\n${r.chunk.content}`)
    .join("\n\n---\n\n");
}

export function formatSources(results: RetrievalResult[]) {
  return results.map((r) => ({
    filename: r.chunk.filename,
    excerpt: r.chunk.content.slice(0, 200) + (r.chunk.content.length > 200 ? "..." : ""),
    relevance: Math.round(r.similarity * 100) / 100,
  }));
}
