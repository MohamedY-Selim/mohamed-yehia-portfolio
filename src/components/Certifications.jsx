import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

function Certifications({ certifications }) {
  return (
    <section id="certifications" className="section-wrapper">
      <SectionHeading
        eyebrow="Certifications"
        title="ISTQB® 7x Certified Tester"
        subtitle="Recognized across foundation, agile, mobile, and advanced technical streams."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {certifications.map((cert, index) => (
          <motion.div
            key={cert.code}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.35, ease: "easeOut", delay: Math.min(index * 0.05, 0.2) }}
            className="glass-card p-5 text-center"
          >
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-300">ISTQB</p>
            <p className="mt-2 text-lg font-bold text-slate-900 dark:text-white">{cert.code}</p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{cert.name}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Certifications;
