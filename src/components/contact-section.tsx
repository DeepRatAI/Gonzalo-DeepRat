import { AnimateOnScroll } from "@/components/animate-on-scroll";
import { Mail, Linkedin, Github, MapPin, Download } from "lucide-react";

const LINKS = [
  {
    label: "Email",
    value: "deeprat.tec@gmail.com",
    href: "mailto:deeprat.tec@gmail.com",
    icon: Mail,
  },
  {
    label: "LinkedIn",
    value: "gonzalo-luis-romero",
    href: "https://www.linkedin.com/in/gonzalo-luis-romero-b9b5b4355",
    icon: Linkedin,
  },
  {
    label: "GitHub",
    value: "DeepRatAI",
    href: "https://github.com/DeepRatAI",
    icon: Github,
  },
] as const;

export function ContactSection() {
  return (
    <section id="contact" className="relative py-28 px-6">
      <div className="mx-auto max-w-3xl text-center">
        {/* Header */}
        <AnimateOnScroll>
          <p className="mb-2 font-mono text-sm text-primary tracking-wide uppercase">
            Get in Touch
          </p>
          <h2 className="text-3xl font-bold sm:text-4xl">
            Let&apos;s <span className="gradient-text">Connect</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">
            Interested in working together or have a question? Feel free to
            reach out through any of these channels.
          </p>
        </AnimateOnScroll>

        {/* Contact cards */}
        <AnimateOnScroll delay={100} className="mt-12 grid gap-4 sm:grid-cols-3">
          {LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="gradient-border group flex items-center gap-4 rounded-xl bg-card p-5 text-left transition-all hover:bg-card/80"
              >
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{link.label}</p>
                  <p className="text-sm font-medium text-foreground">{link.value}</p>
                </div>
              </a>
            );
          })}
        </AnimateOnScroll>

        {/* Location & Language */}
        <AnimateOnScroll delay={200} className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            Argentina
          </div>
          <div className="text-sm text-muted-foreground">
            Spanish <span className="text-primary/60">(native)</span> ·
            English <span className="text-primary/60">(professional)</span>
          </div>
        </AnimateOnScroll>

        {/* CTA */}
        <AnimateOnScroll delay={300} className="mt-10">
          <a
            href="/cv.pdf"
            download
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-6 py-3 text-sm font-semibold transition-all hover:bg-secondary hover:border-primary/30"
          >
            <Download className="h-4 w-4" />
            Download CV
          </a>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
