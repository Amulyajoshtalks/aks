import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { terminalCommands, experience, projects } from "@/data/portfolio";

function formatExperience(): string {
  return experience
    .map(
      (e) =>
        `┌─ ${e.company} ─────────────────────────
│  ${e.role}
│  ${e.period} | ${e.location}
│
${e.highlights.map((h) => `│  ▸ ${h}`).join("\n")}
└─────────────────────────────────────`
    )
    .join("\n\n");
}

function formatProjects(): string {
  return projects
    .map(
      (p) =>
        `  ▸ ${p.name.padEnd(20)} — ${p.fullName}
    ${p.tech.join(" • ")}`
    )
    .join("\n\n");
}

function getProjectDetail(name: string): string {
  const search = name.toLowerCase().trim();
  const p = projects.find(
    (pr) =>
      pr.name.toLowerCase() === search ||
      pr.fullName.toLowerCase().includes(search)
  );
  if (!p) return `Project "${name}" not found. Try: pis, advocase, asr, school, pos`;
  return `┌─────────────────────────────────────────────┐
│  ${p.fullName}
├─────────────────────────────────────────────┤
│  ${p.description}
│
│  Tech: ${p.tech.join(" • ")}
└─────────────────────────────────────────────┘`;
}

interface TerminalLine {
  type: "input" | "output";
  content: string;
  isTyping?: boolean;
  visibleLines?: number;
}

const AVAILABLE_COMMANDS = [
  "help", "about", "skills", "experience", "projects", "education", "contact", "social", "clear",
];

export function Terminal() {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "output", content: "Welcome to Amulya's Terminal Portfolio v1.0.0" },
    { type: "output", content: 'Type "help" to see available commands.\n' },
  ]);
  const [input, setInput] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }, 50);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [lines, scrollToBottom]);

  useEffect(() => {
    if (input.length > 0) {
      const match = AVAILABLE_COMMANDS.find((c) => c.startsWith(input.toLowerCase()) && c !== input.toLowerCase());
      setSuggestion(match || "");
    } else {
      setSuggestion("");
    }
  }, [input]);

  // Typing animation effect
  useEffect(() => {
    const typingLine = lines.find((line) => line.isTyping);
    if (!typingLine) {
      setIsTyping(false);
      return;
    }

    setIsTyping(true);
    const totalLines = typingLine.content.split("\n").length;
    const currentVisible = typingLine.visibleLines || 0;

    if (currentVisible < totalLines) {
      typingTimeoutRef.current = setTimeout(() => {
        setLines((prev) =>
          prev.map((line) =>
            line === typingLine
              ? { ...line, visibleLines: currentVisible + 1 }
              : line
          )
        );
      }, 50); // Adjust speed here (milliseconds per line)
    } else {
      // Typing complete, remove typing flag
      setLines((prev) =>
        prev.map((line) =>
          line === typingLine
            ? { ...line, isTyping: false }
            : line
        )
      );
    }

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [lines]);

  // Auto-focus input when typing finishes
  useEffect(() => {
    if (!isTyping) {
      inputRef.current?.focus();
    }
  }, [isTyping]);

  const processCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newLines: TerminalLine[] = [{ type: "input", content: cmd }];

    if (trimmed === "clear") {
      setLines([]);
      // Focus after clear
      setTimeout(() => inputRef.current?.focus(), 10);
      return;
    }

    if (trimmed === "experience") {
      newLines.push({ type: "output", content: formatExperience(), isTyping: true, visibleLines: 0 });
    } else if (trimmed === "projects") {
      newLines.push({ type: "output", content: formatProjects(), isTyping: true, visibleLines: 0 });
    } else if (trimmed.startsWith("project ")) {
      const projectName = trimmed.replace("project ", "");
      newLines.push({ type: "output", content: getProjectDetail(projectName), isTyping: true, visibleLines: 0 });
    } else if (terminalCommands[trimmed]) {
      newLines.push({ type: "output", content: terminalCommands[trimmed], isTyping: true, visibleLines: 0 });
    } else {
      newLines.push({
        type: "output",
        content: `Command not found: "${cmd}". Type "help" for available commands.`,
        isTyping: true,
        visibleLines: 0,
      });
    }

    setLines((prev) => [...prev, ...newLines]);
    setCommandHistory((prev) => [cmd, ...prev]);
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Prevent input while typing animation is in progress
    if (isTyping && e.key === "Enter") {
      e.preventDefault();
      return;
    }

    if (e.key === "Enter" && input.trim()) {
      processCommand(input.trim());
      setInput("");
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (suggestion) setInput(suggestion);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  return (
    <section id="terminal" className="min-h-screen flex items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="w-full max-w-4xl"
      >
        {/* Terminal window chrome */}
        <div className="bg-card border border-border rounded-t-lg px-4 py-2 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-destructive/70" />
          <div className="w-3 h-3 rounded-full bg-neon-green/50" />
          <div className="w-3 h-3 rounded-full bg-primary/50" />
          <span className="ml-4 font-mono text-xs text-muted-foreground">
            amulya@portfolio:~$
          </span>
        </div>

        {/* Terminal body */}
        <div
          ref={scrollRef}
          onClick={() => inputRef.current?.focus()}
          className="bg-background/80 backdrop-blur-sm border border-t-0 border-border rounded-b-lg p-6 h-[500px] overflow-y-auto cursor-text box-glow-cyan"
        >
          {lines.map((line, i) => {
            const contentToShow = line.isTyping && line.visibleLines !== undefined
              ? line.content.split("\n").slice(0, line.visibleLines).join("\n")
              : line.content;
            
            return (
              <div key={i} className="font-mono text-sm leading-relaxed">
                {line.type === "input" ? (
                  <div className="flex gap-2">
                    <span className="text-neon-green">❯</span>
                    <span className="text-primary">{line.content}</span>
                  </div>
                ) : (
                  <pre className="text-muted-foreground whitespace-pre-wrap mb-2 ml-4">
                    {contentToShow}
                  </pre>
                )}
              </div>
            );
          })}

          {/* Input line */}
          <div className="flex items-center gap-2 font-mono text-sm mt-1 relative">
            <span className="text-neon-green">❯</span>
            <div className="relative flex-1">
              {suggestion && (
                <span className="absolute left-0 text-muted-foreground/30 pointer-events-none">
                  {suggestion}
                </span>
              )}
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent text-primary outline-none caret-neon-green disabled:opacity-50"
                autoFocus
                spellCheck={false}
                aria-label="Terminal input"
                disabled={isTyping}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}