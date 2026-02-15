import { useRef } from "react";
import { Hero } from "@/components/Hero";
import { Terminal } from "@/components/Terminal";
import { VisualSections } from "@/components/VisualSections";
import { ContactSection } from "@/components/ContactSection";

const Index = () => {
  const terminalRef = useRef<HTMLDivElement>(null);

  const scrollToTerminal = () => {
    terminalRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="bg-background min-h-screen">
      <Hero onEnterTerminal={scrollToTerminal} />
      <div ref={terminalRef}>
        <Terminal />
      </div>
      <VisualSections />
      <ContactSection />
    </main>
  );
};

export default Index;
