import { useState } from "react";
import { motion } from "framer-motion";
import { profile } from "@/data/portfolio";
import { supabase } from "@/lib/supabaseClient"; 

export function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const { error } = await supabase.from("contact_me").insert([
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
      ]);

      if (error) throw error;

      setStatus("sent");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    } catch (err) {
      console.error("Supabase insert error:", err);
      setStatus("error");
      // optionally auto‑reset error state after a few seconds
      // setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold font-mono text-primary text-glow-cyan mb-12 text-center"
        >
          {"<"}<span className="text-neon-green">Contact</span>{" />"}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card border border-border rounded-lg overflow-hidden box-glow-cyan"
        >
          {/* Terminal header */}
          <div className="bg-muted px-4 py-2 flex items-center gap-2 border-b border-border">
            <div className="w-3 h-3 rounded-full bg-destructive/70" />
            <div className="w-3 h-3 rounded-full bg-neon-green/50" />
            <div className="w-3 h-3 rounded-full bg-primary/50" />
            <span className="ml-4 font-mono text-xs text-muted-foreground">contact-form.sh</span>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="font-mono text-xs text-neon-green block mb-1">
                <span className="text-muted-foreground">const</span> name <span className="text-muted-foreground">=</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full bg-background border border-border rounded px-4 py-2 font-mono text-sm text-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all"
                placeholder='"Your Name"'
              />
            </div>

            <div>
              <label className="font-mono text-xs text-neon-green block mb-1">
                <span className="text-muted-foreground">const</span> email <span className="text-muted-foreground">=</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full bg-background border border-border rounded px-4 py-2 font-mono text-sm text-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all"
                placeholder='"you@example.com"'
              />
            </div>

            <div>
              <label className="font-mono text-xs text-neon-green block mb-1">
                <span className="text-muted-foreground">const</span> message <span className="text-muted-foreground">=</span>
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                className="w-full bg-background border border-border rounded px-4 py-2 font-mono text-sm text-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all resize-none"
                placeholder='`Your message here...`'
              />
            </div>

            <motion.button
              type="submit"
              disabled={status === "sending"}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 border border-primary/50 bg-primary/10 text-primary font-mono text-sm rounded hover:bg-primary/20 transition-all duration-300 box-glow-cyan disabled:opacity-50"
            >
              {status === "idle" && "> send_message()"}
              {status === "sending" && "> sending..."}
              {status === "sent" && "✓ Message sent!"}
              {status === "error" && "✗ Error — try again"}
            </motion.button>
          </form>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-wrap justify-center gap-6"
        >
          {[
            { label: "📧 Email", href: `mailto:${profile.email}`, text: profile.email },
            { label: "📞 Phone", href: `tel:${profile.phone}`, text: profile.phone },
            { label: "🔗 LinkedIn", href: profile.linkedin, text: "LinkedIn Profile" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 font-mono text-xs border border-border rounded-lg text-muted-foreground hover:text-primary hover:border-primary/50 hover:box-glow-cyan transition-all duration-300"
            >
              {link.label}
            </a>
          ))}
        </motion.div>

        {/* Footer */}
        <div className="mt-20 text-center font-mono text-xs text-muted-foreground/50">
          <p>Built with React + Three.js + TypeScript</p>
          <p className="mt-1">© {new Date().getFullYear()} Amulya Kumar. All rights reserved.</p>
        </div>
      </div>
    </section>
  );
}