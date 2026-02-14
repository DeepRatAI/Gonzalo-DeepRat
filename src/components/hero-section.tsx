"use client";

import { ArrowDown, MessageCircle, Sparkles } from "lucide-react";

export function HeroSection() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section
      id="welcome"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6"
    >
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/8 blur-[120px] animate-glow" />
        <div
          className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] translate-x-1/2 translate-y-1/2 rounded-full bg-accent/6 blur-[100px] animate-glow"
          style={{ animationDelay: "1.5s" }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(oklch(0.72 0.19 195 / 0.3) 1px, transparent 1px), linear-gradient(90deg, oklch(0.72 0.19 195 / 0.3) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        {/* Status badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          Available for new projects
        </div>

        {/* Name */}
        <h1 className="mb-4 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          <span className="text-foreground">Gonzalo</span>{" "}
          <span className="gradient-text">Romero</span>
        </h1>

        {/* Title */}
        <p className="mb-6 font-mono text-base text-primary sm:text-lg tracking-wide">
          AI Engineer{" "}
          <span className="text-muted-foreground">
            · GenAI · RAG · AI Platforms
          </span>
        </p>

        {/* Intro text */}
        <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg text-balance">
          I am an AI Engineer focused on the comprehensive development of
          applied AI systems. Building production-grade GenAI backends,
          RAG pipelines, and agentic architectures.
        </p>

        {/* CTAs */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <button
            onClick={() => scrollTo("projects")}
            className="group inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 hover:shadow-lg hover:shadow-primary/25"
          >
            Explore my work
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </button>

          {/* ✨ Seductive "Ask my assistant" CTA */}
          <button
            onClick={() => {
              const event = new CustomEvent("open-chat");
              window.dispatchEvent(event);
            }}
            className="group relative inline-flex items-center gap-2.5 rounded-xl px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
            style={{
              background: "linear-gradient(135deg, oklch(0.72 0.19 195), oklch(0.65 0.16 160), oklch(0.7 0.15 300))",
              boxShadow: "0 0 20px oklch(0.72 0.19 195 / 0.3), 0 0 60px oklch(0.7 0.15 300 / 0.15), inset 0 1px 0 oklch(1 0 0 / 0.15)",
            }}
          >
            {/* Animated shimmer overlay */}
            <span
              className="absolute inset-0 rounded-xl opacity-40"
              style={{
                background: "linear-gradient(90deg, transparent, oklch(1 0 0 / 0.25), transparent)",
                backgroundSize: "200% 100%",
                animation: "cta-shimmer 3s ease-in-out infinite",
              }}
            />
            {/* Pulse ring behind button */}
            <span
              className="absolute -inset-[3px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: "linear-gradient(135deg, oklch(0.72 0.19 195 / 0.5), oklch(0.7 0.15 300 / 0.5))",
                filter: "blur(8px)",
                animation: "cta-ring-pulse 2s ease-in-out infinite",
              }}
            />
            <span className="relative flex items-center gap-2.5">
              <Sparkles className="h-4 w-4 animate-pulse" />
              Ask my AI assistant
              <MessageCircle className="h-4 w-4 transition-transform group-hover:rotate-12" />
            </span>
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 text-muted-foreground/50">
          <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
          <div className="h-8 w-[1px] bg-gradient-to-b from-muted-foreground/50 to-transparent" />
        </div>
      </div>
    </section>
  );
}
