import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

function Skills({ skillGroups }) {
  return (
    <section id="skills" className="section-wrapper">
      <SectionHeading
        eyebrow="Skills"
        title="Depth you can audit in an interview"
        subtitle="Grouped for clarity—automation and API execution through delivery tooling, languages, and leadership."
      />

      <div className="space-y-8">
        {skillGroups.map((block, blockIndex) => (
          <motion.div
            key={block.group}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: Math.min(blockIndex * 0.05, 0.12) }}
            className="rounded-2xl border border-slate-300/70 bg-white/60 p-5 backdrop-blur-md dark:border-slate-700/45 dark:bg-slate-900/40 sm:p-6"
          >
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-brand-600 dark:text-brand-300">
              {block.group}
            </h3>
            <div className="flex flex-wrap gap-2 sm:gap-2.5">
              {block.items.map((chip, chipIndex) => (
                <motion.span
                  key={chip}
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{
                    duration: 0.22,
                    ease: "easeOut",
                    delay: Math.min(chipIndex * 0.02, 0.12)
                  }}
                  whileHover={{ scale: 1.03, y: -1 }}
                  className="rounded-full border border-slate-300/90 bg-white/80 px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-500/50 hover:text-brand-700 dark:border-slate-600/50 dark:bg-slate-950/50 dark:text-slate-200 dark:hover:border-brand-400/45 dark:hover:text-white sm:px-3.5 sm:py-2 sm:text-sm"
                >
                  {chip}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
