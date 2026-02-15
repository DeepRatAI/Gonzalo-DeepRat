"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { MessageCircle, Send, X, Bot, User, Sparkles } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

/** Lightweight inline markdown: bold, italic, bullet lists, strip [Source N] refs */
function renderMarkdown(text: string) {
  if (!text) return <span className="text-muted-foreground/50">...</span>;

  // Strip [Source N] / [Source N, Source M] references
  const cleaned = text.replace(/\s*\[Source\s*\d+(?:,\s*Source\s*\d+)*\]/gi, "");

  const lines = cleaned.split("\n");
  const elements: React.ReactNode[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Bullet list items: * or -
    if (/^[*\-]\s+/.test(trimmed)) {
      const content = trimmed.replace(/^[*\-]\s+/, "");
      elements.push(
        <div key={i} className="flex gap-2 ml-1 my-0.5">
          <span className="mt-[7px] block h-1 w-1 flex-shrink-0 rounded-full bg-primary/60" />
          <span>{inlineMd(content)}</span>
        </div>
      );
    } else if (trimmed === "") {
      elements.push(<div key={i} className="h-2" />);
    } else {
      elements.push(
        <p key={i} className="my-0.5">
          {inlineMd(trimmed)}
        </p>
      );
    }
  }

  return <>{elements}</>;
}

/** Handle **bold** and *italic* inline */
function inlineMd(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  // Match **bold** or *italic*
  const regex = /(\*\*(.+?)\*\*|\*(.+?)\*)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    if (match[2]) {
      parts.push(
        <strong key={match.index} className="font-semibold text-foreground">
          {match[2]}
        </strong>
      );
    } else if (match[3]) {
      parts.push(
        <em key={match.index} className="italic">
          {match[3]}
        </em>
      );
    }
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
}

export function ChatSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi! I'm Gonzalo's AI assistant. Ask me anything about his experience, projects, or technical skills.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Listen for "open-chat" custom event from hero CTA
  useEffect(() => {
    const handler = () => setIsOpen(true);
    window.addEventListener("open-chat", handler);
    return () => {
      window.removeEventListener("open-chat", handler);
      abortRef.current?.abort();
    };
  }, []);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!input.trim() || isLoading) return;

      const userMsg: Message = {
        id: Date.now().toString(),
        role: "user",
        content: input.trim(),
      };
      const assistantId = (Date.now() + 1).toString();

      setMessages((prev) => [
        ...prev,
        userMsg,
        { id: assistantId, role: "assistant", content: "" },
      ]);
      setInput("");
      setIsLoading(true);
      abortRef.current = new AbortController();

      try {
        const history = messages
          .filter((m) => m.id !== "welcome")
          .concat(userMsg)
          .map((m) => ({ role: m.role, content: m.content }));

        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history }),
          signal: abortRef.current.signal,
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || `HTTP ${res.status}`);
        }

        const reader = res.body?.getReader();
        if (!reader) throw new Error("No response body");

        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const events = buffer.split("\n\n");
          buffer = events.pop() || "";

          for (const event of events) {
            for (const line of event.split("\n")) {
              if (!line.startsWith("data: ")) continue;
              const data = line.slice(6);
              if (data === "[DONE]") continue;
              try {
                const parsed = JSON.parse(data);
                if (parsed.content) {
                  setMessages((prev) =>
                    prev.map((m) =>
                      m.id === assistantId
                        ? { ...m, content: m.content + parsed.content }
                        : m
                    )
                  );
                }
                // Silently ignore sources — we don't display them
              } catch {
                /* incomplete JSON chunk */
              }
            }
          }
        }
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? {
                  ...m,
                  content:
                    err instanceof Error ? err.message : "Something went wrong.",
                }
              : m
          )
        );
      } finally {
        setIsLoading(false);
        abortRef.current = null;
      }
    },
    [input, isLoading, messages]
  );

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      {/* Floating trigger button — pulsing glow */}
      <SheetTrigger asChild>
        <Button
          size="lg"
          className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg text-primary-foreground hover:brightness-110 border-0"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.72 0.19 195), oklch(0.65 0.16 160))",
            animation: isOpen
              ? "none"
              : "chat-btn-pulse 2.5s ease-in-out infinite",
          }}
          aria-label="Open chat"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <MessageCircle className="h-6 w-6" />
          )}
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-full sm:w-[420px] p-0 flex flex-col border-l border-border/50 overflow-hidden"
      >
        {/* Animated gradient background for the entire panel */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background: `
              linear-gradient(
                160deg,
                oklch(0.08 0.01 260) 0%,
                oklch(0.10 0.025 220) 20%,
                oklch(0.12 0.04 200) 40%,
                oklch(0.11 0.035 280) 60%,
                oklch(0.10 0.025 310) 80%,
                oklch(0.08 0.01 260) 100%
              )
            `,
            backgroundSize: "400% 400%",
            animation: "chat-gradient-flow 12s ease-in-out infinite",
          }}
        />

        {/* Header */}
        <div className="relative z-10 flex items-center gap-3 border-b border-white/10 px-5 py-4 shrink-0 backdrop-blur-md bg-black/20">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.72 0.19 195 / 0.25), oklch(0.7 0.15 300 / 0.25))",
            }}
          >
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <div>
            <SheetTitle className="text-sm font-semibold text-foreground">
              DeepRat Assistant
            </SheetTitle>
            <p className="text-[10px] text-muted-foreground font-mono">
              Powered by RAG · Gemini 2.5 Flash
            </p>
          </div>
        </div>

        {/* Messages — native scrollable div instead of ScrollArea to avoid scroll bugs */}
        <div
          ref={scrollContainerRef}
          className="relative z-10 flex-1 overflow-y-auto px-4 py-4 scroll-smooth"
          style={{ overscrollBehavior: "contain" }}
        >
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.role === "assistant" && (
                  <div
                    className="flex-shrink-0 mt-1 h-7 w-7 rounded-full flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.72 0.19 195 / 0.2), oklch(0.7 0.15 300 / 0.2))",
                    }}
                  >
                    <Bot className="h-3.5 w-3.5 text-primary" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                    msg.role === "user"
                      ? "text-white"
                      : "bg-white/[0.06] backdrop-blur-sm border border-white/10 text-foreground"
                  }`}
                  style={
                    msg.role === "user"
                      ? {
                          background:
                            "linear-gradient(135deg, oklch(0.72 0.19 195), oklch(0.6 0.17 210))",
                        }
                      : undefined
                  }
                >
                  <div className="text-sm leading-relaxed">
                    {msg.role === "assistant"
                      ? renderMarkdown(msg.content)
                      : msg.content || "..."}
                  </div>
                </div>
                {msg.role === "user" && (
                  <div className="flex-shrink-0 mt-1 h-7 w-7 rounded-full bg-white/10 flex items-center justify-center">
                    <User className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && messages[messages.length - 1]?.content === "" && (
              <div className="flex gap-3 justify-start">
                <div
                  className="flex-shrink-0 mt-1 h-7 w-7 rounded-full flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.72 0.19 195 / 0.2), oklch(0.7 0.15 300 / 0.2))",
                  }}
                >
                  <Bot className="h-3.5 w-3.5 text-primary" />
                </div>
                <div className="bg-white/[0.06] backdrop-blur-sm border border-white/10 rounded-2xl px-4 py-3">
                  <div className="flex gap-1.5">
                    <span
                      className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              </div>
            )}
            {/* Scroll anchor */}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="relative z-10 border-t border-white/10 p-4 shrink-0 backdrop-blur-md bg-black/20"
        >
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Gonzalo..."
              disabled={isLoading}
              className="flex-1 bg-white/[0.06] border-white/10 placeholder:text-muted-foreground/50 focus:border-primary/50 rounded-xl"
            />
            <Button
              type="submit"
              size="icon"
              disabled={isLoading || !input.trim()}
              className="shrink-0 rounded-xl"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.72 0.19 195), oklch(0.65 0.16 160))",
              }}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
