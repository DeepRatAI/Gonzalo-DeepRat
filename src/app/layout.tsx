import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.deeprat.tech"),
  title: "Gonzalo Romero | DeepRat — AI Engineer",
  description:
    "Senior AI Engineer specializing in production-grade GenAI systems, RAG pipelines, agentic backends, and AI platforms. Building reliable AI infrastructure for sensitive environments.",
  keywords: [
    "AI Engineer",
    "RAG",
    "GenAI",
    "LLM",
    "Python",
    "FastAPI",
    "Machine Learning",
    "Agentic Systems",
    "MLOps",
  ],
  authors: [{ name: "Gonzalo Romero", url: "https://www.deeprat.tech" }],
  creator: "Gonzalo Romero",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.deeprat.tech",
    title: "Gonzalo Romero | DeepRat — AI Engineer",
    description:
      "Senior AI Engineer specializing in production-grade GenAI systems, RAG pipelines, and agentic backends.",
    siteName: "DeepRat",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DeepRat — AI Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gonzalo Romero | DeepRat — AI Engineer",
    description:
      "Senior AI Engineer specializing in production-grade GenAI systems.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Gonzalo Romero",
              alternateName: "DeepRat",
              url: "https://www.deeprat.tech",
              email: "info@deeprat.tech",
              jobTitle: "Senior AI Engineer",
              knowsAbout: [
                "Artificial Intelligence",
                "Machine Learning",
                "RAG",
                "LLM",
                "Python",
                "GenAI",
              ],
              sameAs: [
                "https://www.linkedin.com/in/gonzalo-romero-b9b5b4355/",
                "https://github.com/DeepRatAI",
              ],
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
