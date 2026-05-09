import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

function About() {
  return (
    <section id="about" className="section-wrapper">
      <SectionHeading
        eyebrow="About"
        title="Executive summary"
        subtitle="A concise view of how I operate as a senior quality leader—technical enough to build, senior enough to own the narrative."
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="glass-card border-slate-700/50 p-7 sm:p-8"
      >
        <p className="max-w-3xl text-base leading-[1.75] text-slate-600 dark:text-slate-300 sm:text-[1.05rem]">
          Six-plus years shipping quality for fintech, retail, logistics, and national-scale programs. I lead squads,
          define QA strategy, and deliver automation that shortens feedback loops—without sacrificing governance. My
          default is evidence stakeholders trust: traceable coverage, API and performance discipline, and CI/CD-ready
          assets that hold up in enterprise reviews.
        </p>
      </motion.div>
    </section>
  );
}

export default About;
