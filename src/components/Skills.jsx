import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

function Skills({ skillCategories, tools }) {
  return (
    <section id="skills" className="section-wrapper">
      <SectionHeading
        eyebrow="Skills"
        title="Testing depth, automation stack, and leadership"
        subtitle="From hands-on execution to strategy—covering breadth across quality domains, toolchain, and enterprise delivery."
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {skillCategories.map((skill, index) => (
          <motion.div
            key={skill}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.35, ease: "easeOut", delay: Math.min(index * 0.04, 0.2) }}
            className="glass-card bg-gradient-to-b from-white to-slate-100/80 p-5 text-center font-semibold text-slate-800 transition hover:-translate-y-1 hover:shadow-glow dark:from-slate-900/80 dark:to-slate-900/35 dark:text-slate-100"
          >
            {skill}
          </motion.div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        {tools.map((tool, index) => (
          <motion.span
            key={tool}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.22, ease: "easeOut", delay: Math.min(index * 0.02, 0.18) }}
            className="rounded-full border border-slate-300 bg-white/80 px-4 py-2 text-sm text-slate-700 transition hover:border-brand-500 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:border-brand-300 dark:hover:text-brand-300"
          >
            {tool}
          </motion.span>
        ))}
      </div>
    </section>
  );
}

export default Skills;
