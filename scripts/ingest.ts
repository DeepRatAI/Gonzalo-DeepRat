import { readFileSync, readdirSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";
import { InferenceClient } from "@huggingface/inference";

// Configuration
const CHUNK_SIZE = 500; // characters
const CHUNK_OVERLAP = 100; // characters
const EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2"; // Free, fast, excellent for semantic search

interface Chunk {
  id: string;
  content: string;
  filename: string;
  embedding?: number[];
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

function chunkText(text: string, filename: string): Chunk[] {
  const chunks: Chunk[] = [];
  let start = 0;
  let chunkIndex = 0;

  // Clean the text
  const cleanText = text
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  while (start < cleanText.length) {
    let end = start + CHUNK_SIZE;
    
    // Try to break at a natural boundary (paragraph or sentence)
    if (end < cleanText.length) {
      const nextParagraph = cleanText.indexOf("\n\n", end - 50);
      const nextSentence = cleanText.indexOf(". ", end - 50);
      
      if (nextParagraph !== -1 && nextParagraph < end + 100) {
        end = nextParagraph + 2;
      } else if (nextSentence !== -1 && nextSentence < end + 50) {
        end = nextSentence + 2;
      }
    }

    const chunkContent = cleanText.slice(start, end).trim();
    
    if (chunkContent.length > 50) { // Only add meaningful chunks
      chunks.push({
        id: `${filename.replace(".md", "")}_chunk_${chunkIndex}`,
        content: chunkContent,
        filename,
      });
      chunkIndex++;
    }

    start = end - CHUNK_OVERLAP;
    if (start < 0) start = 0;
    if (end >= cleanText.length) break;
  }

  return chunks;
}

async function generateEmbeddings(chunks: Chunk[], hf: InferenceClient): Promise<Chunk[]> {
  console.log(`Generating embeddings for ${chunks.length} chunks using ${EMBEDDING_MODEL}...`);
  
  const embeddedChunks: Chunk[] = [];

  // Process chunks one by one to avoid rate limits on free tier
  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    
    try {
      // Use featureExtraction for embeddings
      const embedding = await hf.featureExtraction({
        model: EMBEDDING_MODEL,
        inputs: chunk.content,
      });

      // The result can be a nested array, flatten if needed
      const flatEmbedding = Array.isArray(embedding[0]) 
        ? (embedding as number[][]).flat() 
        : embedding as number[];

      embeddedChunks.push({
        ...chunk,
        embedding: flatEmbedding,
      });

      console.log(`  Processed ${i + 1}/${chunks.length}: ${chunk.id}`);
      
      // Small delay to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      console.error(`  Error processing chunk ${chunk.id}:`, error);
      // Skip this chunk on error
    }
  }

  return embeddedChunks;
}

async function main() {
  const hfToken = process.env.HF_TOKEN;
  if (!hfToken) {
    console.error("Error: HF_TOKEN environment variable is required");
    process.exit(1);
  }

  const hf = new InferenceClient(hfToken);

  // Paths
  const sourcesDir = join(process.cwd(), "kb", "sources", "final");
  const outputDir = join(process.cwd(), "kb", "index");

  // Check sources exist
  if (!existsSync(sourcesDir)) {
    console.error(`Error: Sources directory not found: ${sourcesDir}`);
    process.exit(1);
  }

  // Read all markdown files
  const files = readdirSync(sourcesDir).filter((f) => f.endsWith(".md"));
  console.log(`Found ${files.length} source files`);

  // Process each file
  let allChunks: Chunk[] = [];
  for (const file of files) {
    const content = readFileSync(join(sourcesDir, file), "utf-8");
    const chunks = chunkText(content, file);
    console.log(`  ${file}: ${chunks.length} chunks`);
    allChunks = [...allChunks, ...chunks];
  }

  console.log(`Total chunks: ${allChunks.length}`);

  // Generate embeddings
  const embeddedChunks = await generateEmbeddings(allChunks, hf);

  // Create output directory
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  // Save index
  const index: VectorIndex = {
    version: "1.0.0",
    created: new Date().toISOString(),
    chunks: embeddedChunks,
    metadata: {
      totalChunks: embeddedChunks.length,
      embeddingModel: EMBEDDING_MODEL,
      chunkSize: CHUNK_SIZE,
      chunkOverlap: CHUNK_OVERLAP,
    },
  };

  writeFileSync(join(outputDir, "vector-index.json"), JSON.stringify(index, null, 2));
  console.log(`\nIndex saved to ${join(outputDir, "vector-index.json")}`);
  console.log(`  Total chunks: ${index.metadata.totalChunks}`);
  console.log(`  Embedding model: ${index.metadata.embeddingModel}`);
}

main().catch(console.error);
