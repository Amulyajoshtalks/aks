import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Scene3D } from "./Scene3D";

export function Hero({ onEnterTerminal }: { onEnterTerminal: () => void }) {
  const [displayedName, setDisplayedName] = useState("");
  const fullName = "AMULYA KUMAR";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedName(fullName.slice(0, i + 1));
      i++;
      if (i >= fullName.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Scene3D />

      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(180 100% 50% / 0.03) 2px, hsl(180 100% 50% / 0.03) 4px)",
        }}
      />

      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-4 font-mono text-sm text-neon-green tracking-[0.3em] opacity-70">
            &gt; initializing portfolio...
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold font-mono tracking-wider text-primary text-glow-cyan mb-4">
            {displayedName}
            <span className="animate-blink text-neon-green">_</span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="text-lg sm:text-xl font-mono text-muted-foreground mb-12"
          >
            Frontend Engineer{" "}
            <span className="text-neon-purple">|</span>{" "}
            React Developer
          </motion.p>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2, duration: 0.5 }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px hsl(180 100% 50% / 0.5)" }}
            whileTap={{ scale: 0.95 }}
            onClick={onEnterTerminal}
            className="px-8 py-4 border border-primary/50 bg-primary/10 text-primary font-mono text-lg rounded-lg box-glow-cyan hover:bg-primary/20 transition-all duration-300"
          >
            <span className="text-neon-green">&gt;</span> Enter Terminal_
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-primary rounded-full mt-2"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
