import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

function Projects({ projects }) {
  return (
    <section id="projects" className="section-wrapper">
      <SectionHeading
        eyebrow="Projects & Achievements"
        title="High-impact quality outcomes"
        subtitle="Representative initiatives delivering measurable quality and delivery confidence."
      />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => (
          <motion.article
            key={project}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: Math.min(index * 0.05, 0.15) }}
            className="glass-card bg-gradient-to-b from-white to-slate-100/70 p-6 transition hover:-translate-y-1 hover:border-brand-300 dark:from-slate-900/70 dark:to-slate-900/30"
          >
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{project}</h3>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
              Delivered with a quality-first mindset, automation maturity, and cross-team collaboration.
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export default Projects;
