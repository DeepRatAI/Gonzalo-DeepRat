import { NextRequest } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { InferenceClient } from "@huggingface/inference";
import { retrieve, formatSources } from "@/lib/rag";

// Initialize clients at module level
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || "");
const hf = new InferenceClient(process.env.HF_TOKEN);

// Simple rate limiting with automatic cleanup
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60000; // 1 minute
  const maxRequests = 20;
  
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (record.count >= maxRequests) {
    return false;
  }
  
  record.count++;
  return true;
}

export async function POST(request: NextRequest) {
  const encoder = new TextEncoder();
  
  // Helper to create SSE message
  const createSSEMessage = (data: object | string) => {
    const payload = typeof data === "string" ? data : JSON.stringify(data);
    return encoder.encode(`data: ${payload}\n\n`);
  };

  try {
    // Rate limiting
    const ip = request.headers.get("x-forwarded-for") || 
               request.headers.get("x-real-ip") || 
               "anonymous";
    
    if (!checkRateLimit(ip)) {
      return new Response(
        JSON.stringify({ error: "Too many requests. Please wait a moment." }),
        { status: 429, headers: { "Content-Type": "application/json" } }
      );
    }

    // Parse request
    const body = await request.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "Messages array is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Get the latest user message
    const lastUserMessage = [...messages].reverse().find(m => m.role === "user");
    if (!lastUserMessage) {
      return new Response(
        JSON.stringify({ error: "No user message found" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Sanitize input
    const userQuery = lastUserMessage.content
      .slice(0, 1000)
      .replace(/[<>]/g, "");

    console.log("[Chat API] Processing query:", userQuery.substring(0, 50));

    // Query RAG knowledge base using retrieve function
    let retrievalResults: Awaited<ReturnType<typeof retrieve>> = [];
    try {
      retrievalResults = await retrieve(userQuery, hf, 4);
      console.log("[Chat API] Found", retrievalResults.length, "relevant chunks");
    } catch (ragError) {
      console.error("[Chat API] RAG error:", ragError);
    }

    // Build context string for user message
    const contextString = retrievalResults.length > 0
      ? retrievalResults
          .map((r, i) => `[Source ${i + 1}: ${r.chunk.filename}]\n${r.chunk.content}`)
          .join("\n\n---\n\n")
      : "";

    // Create streaming response
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Send sources first
          if (retrievalResults.length > 0) {
            const sources = formatSources(retrievalResults);
            controller.enqueue(createSSEMessage({ sources }));
          }

          // Initialize Gemini model
          const model = genAI.getGenerativeModel({ 
            model: "gemini-2.5-flash",
            generationConfig: {
              maxOutputTokens: 1024,
              temperature: 0.7,
            },
            // System instruction as Content object
            systemInstruction: {
              role: "user",
              parts: [{ 
                text: `You are an AI assistant for Gonzalo Romero (DeepRat), a senior developer specializing in AI/ML and automation.

Your role:
- Answer questions about Gonzalo's experience, skills, and projects
- Be helpful, professional, and concise
- Only use information from the provided context
- If you don't have enough information, say so honestly
- Cite sources when relevant using [Source N] format`
              }]
            }
          });

          // Build conversation history for Gemini
          const history = messages.slice(0, -1).map((m: { role: string; content: string }) => ({
            role: m.role === "user" ? "user" : "model",
            parts: [{ text: m.content }]
          }));

          // Start chat
          const chat = model.startChat({ history });

          // Prepare the user message with context
          const userMessageWithContext = contextString 
            ? `Context from knowledge base:\n${contextString}\n\n---\n\nUser question: ${userQuery}`
            : userQuery;

          // Send message and stream response
          const result = await chat.sendMessageStream(userMessageWithContext);

          for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) {
              controller.enqueue(createSSEMessage({ content: text }));
            }
          }

          // Send done signal
          controller.enqueue(createSSEMessage("[DONE]"));
          controller.close();
          
        } catch (streamError) {
          console.error("[Chat API] Stream error:", streamError);
          const errorMessage = streamError instanceof Error 
            ? streamError.message 
            : "An error occurred";
          controller.enqueue(createSSEMessage({ 
            content: `Sorry, I encountered an error. Please try again.` 
          }));
          controller.enqueue(createSSEMessage("[DONE]"));
          controller.close();
        }
      }
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        "Connection": "keep-alive",
        "X-Accel-Buffering": "no",
      },
    });

  } catch (error) {
    console.error("[Chat API] Error:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Internal server error" 
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
