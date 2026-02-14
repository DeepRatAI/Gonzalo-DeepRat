import Image from "next/image";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import {
  ExternalLink,
  Github,
  Star,
  Clock,
  RefreshCw,
} from "lucide-react";

const PROJECTS = [
  {
    slug: "cortex",
    name: "Cortex",
    tagline: "Corporate Knowledge Assistant",
    description:
      "Enterprise-grade RAG system with hexagonal architecture, multi-tenant RBAC, PII-aware processing, and full audit trail. Designed for regulated environments with zero-tolerance data leakage.",
    banner: "/banners/cortex.png",
    tags: ["RAG", "FastAPI", "Qdrant", "React", "Redis", "Docker", "RBAC"],
    highlights: [
      "Hexagonal architecture with explicit port/adapter separation",
      "Multi-tenant RBAC with row-level security",
      "PII detection & configurable redaction pipeline",
      "Full audit trail with structured logging",
    ],
    github: "https://github.com/DeepRatAI/Cortex",
    badge: "featured" as const,
  },
  {
    slug: "medx",
    name: "MedX",
    tagline: "Medical AI Assistant",
    description:
      "RAG-powered medical assistant for clinical document queries. Integrates LangChain orchestration with Kimi K2 model for accurate medical information retrieval and source-grounded responses.",
    banner: "/banners/Medx.gif",
    tags: ["RAG", "LangChain", "Kimi K2", "Medical NLP", "Python"],
    highlights: [
      "Clinical document processing pipeline",
      "Source-grounded responses with citation",
      "Evaluation-first development methodology",
    ],
    github: "https://github.com/DeepRatAI",
    badge: "updating" as const,
  },
  {
    slug: "cdr",
    name: "CDR",
    tagline: "Clinical Data Research · Agent Orchestration",
    description:
      "Multi-agent orchestration system for clinical data research. Autonomous agents collaborate to process, analyze, and synthesize clinical datasets — designed for scalable research workflows in healthcare.",
    banner: "/banners/cdr.png",
    tags: ["Agents", "Orchestration", "Clinical Research", "Python", "LangGraph"],
    highlights: [
      "Multi-agent task decomposition & orchestration",
      "Clinical dataset processing pipelines",
      "Autonomous research synthesis workflows",
    ],
    github: "https://github.com/DeepRatAI",
    badge: "coming-soon" as const,
    comingSoon: "17/02/26",
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="relative py-28 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <AnimateOnScroll className="mb-16 text-center">
          <p className="mb-2 font-mono text-sm text-primary tracking-wide uppercase">
            Portfolio
          </p>
          <h2 className="text-3xl font-bold sm:text-4xl">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            Production-grade AI systems designed for real-world constraints —
            security, scale, and reliability.
          </p>
        </AnimateOnScroll>

        {/* Projects grid — 3 equal columns */}
        <div className="grid gap-6 md:grid-cols-3">
          {PROJECTS.map((project, i) => {
            return (
              <AnimateOnScroll key={project.slug} delay={i * 100}>
                <article className="gradient-border group relative overflow-hidden rounded-xl bg-card transition-all duration-300 hover:bg-card/80 h-full flex flex-col">
                  {/* Banner image */}
                  <div className="relative w-full overflow-hidden">
                    <div className="relative w-full h-44 sm:h-48">
                      <Image
                        src={project.banner}
                        alt={`${project.name} banner`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        sizes="33vw"
                        unoptimized={project.banner.endsWith(".gif")}
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                    </div>

                    {/* Badges over banner */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      {project.badge === "featured" && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-primary/90 backdrop-blur-sm px-2.5 py-1 text-[10px] font-semibold text-primary-foreground shadow-lg">
                          <Star className="h-3 w-3" /> Featured
                        </span>
                      )}
                      {project.badge === "updating" && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/90 backdrop-blur-sm px-2.5 py-1 text-[10px] font-semibold text-white shadow-lg">
                          <RefreshCw className="h-3 w-3" /> Under Renovation
                        </span>
                      )}
                      {project.badge === "coming-soon" && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/90 backdrop-blur-sm px-2.5 py-1 text-[10px] font-semibold text-black shadow-lg">
                          <Clock className="h-3 w-3" /> Coming Soon · {project.comingSoon}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-6 pt-3 sm:pt-4 flex flex-col flex-1">
                    {/* Header */}
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-semibold">{project.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          {project.tagline}
                        </p>
                      </div>

                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground hover:border-primary/30 shrink-0"
                        aria-label={`View ${project.name} on GitHub`}
                      >
                        <Github className="h-3.5 w-3.5" />
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>

                    {/* Description */}
                    <p className="mb-4 text-xs leading-relaxed text-muted-foreground flex-1">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-secondary px-2 py-0.5 font-mono text-[10px] text-secondary-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
