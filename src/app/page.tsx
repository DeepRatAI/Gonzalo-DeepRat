import { Navbar } from "@/components/navbar";
import { AnimatedBackground } from "@/components/animated-background";
import { HeroSection } from "@/components/hero-section";
import { ProjectsSection } from "@/components/projects-section";
import { StackSection } from "@/components/stack-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { ChatSection } from "@/components/chat-section";

export default function Home() {
  return (
    <>
      <AnimatedBackground />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <ProjectsSection />
        <StackSection />
        <ContactSection />
      </main>
      <Footer />
      <ChatSection />
    </>
  );
}
