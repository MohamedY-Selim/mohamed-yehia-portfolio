import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

function About() {
  return (
    <section id="about" className="section-wrapper">
      <SectionHeading
        eyebrow="About"
        title="Quality strategy built for enterprise scale"
        subtitle="Professional QA leader focused on quality engineering, automation impact, and team growth."
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55 }}
        className="glass-card p-8"
      >
        <p className="leading-relaxed text-slate-700 dark:text-slate-300">
          I bring 6+ years of experience spanning manual, automation, API, performance, mobile, database, and security
          testing, with hands-on coverage in AI-assisted testing and modern delivery practices. I thrive in Agile and
          CI/CD environments—defining QA/QC strategy and gap analysis, mentoring teams, and driving measurable quality
          outcomes for enterprise-scale systems where reliability, speed, and stakeholder trust all matter.
        </p>
      </motion.div>
    </section>
  );
}

export default About;
