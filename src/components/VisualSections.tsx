import { motion } from "framer-motion";
import { skills, experience, projects, education } from "@/data/portfolio";

function SkillsSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold font-mono text-primary text-glow-cyan mb-12 text-center"
        >
          {"<"}<span className="text-neon-green">Skills</span>{" />"}
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {Object.entries(skills).map(([category, items], idx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15 }}
              viewport={{ once: true }}
              className="bg-card border border-border rounded-lg p-6 box-glow-cyan hover:border-primary/50 transition-all duration-300"
            >
              <h3 className="font-mono text-neon-green text-lg mb-4">▸ {category}</h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-xs font-mono bg-muted border border-border rounded-full text-primary hover:border-primary/50 hover:bg-primary/10 transition-all duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold font-mono text-primary text-glow-cyan mb-12 text-center"
        >
          {"<"}<span className="text-neon-purple">Experience</span>{" />"}
        </motion.h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-primary/20" />

          {experience.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`relative mb-12 pl-12 md:pl-0 md:w-1/2 ${
                idx % 2 === 0 ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12"
              }`}
            >
              {/* Node */}
              <div className={`absolute top-1 w-3 h-3 rounded-full bg-primary box-glow-cyan left-[10px] ${
                idx % 2 === 0 ? "md:left-auto md:-right-[6.5px]" : "md:left-[-6.5px]"
              }`} />

              <div className="bg-card border border-border rounded-lg p-5 hover:border-primary/40 transition-all duration-300 box-glow-cyan">
                <div className="font-mono text-xs text-neon-green mb-1">{exp.period}</div>
                <h3 className="text-lg font-bold text-foreground">{exp.role}</h3>
                <div className="text-sm text-secondary mb-3">{exp.company} — {exp.location}</div>
                <ul className="space-y-1">
                  {exp.highlights.map((h, i) => (
                    <li key={i} className="text-xs text-muted-foreground">▸ {h}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold font-mono text-primary text-glow-cyan mb-12 text-center"
        >
          {"<"}<span className="text-neon-green">Projects</span>{" />"}
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all duration-300 box-glow-cyan"
            >
              <div className="font-mono text-xs text-neon-green mb-2">project_{idx + 1}</div>
              <h3 className="text-xl font-bold text-foreground mb-1">{project.fullName}</h3>
              <p className="text-xs text-muted-foreground mb-4 line-clamp-3">{project.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span key={t} className="px-2 py-0.5 text-[10px] font-mono bg-muted border border-border rounded text-primary/80">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EducationSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold font-mono text-primary text-glow-cyan mb-12 text-center"
        >
          {"<"}<span className="text-neon-purple">Education</span>{" />"}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card border border-border rounded-lg p-8 text-center box-glow-purple"
        >
         {
          education.map((edu) => (
            <div key={edu.degree} className="mb-4">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-xl font-bold text-foreground mb-2">{edu.degree}</h3>
              <p className="text-secondary text-lg">{edu.university}</p>
              <p className="text-sm text-muted-foreground mt-2">
                {edu.year} | {edu.location}
              </p>
            </div>
          ))
         }
        </motion.div>
      </div>
    </section>
  );
}

export function VisualSections() {
  return (
    <div>
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <EducationSection />
    </div>
  );
}
