import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

function Certifications({ certifications }) {
  return (
    <section id="certifications" className="section-wrapper">
      <SectionHeading
        eyebrow="Certifications"
        title="ISTQB® advanced depth"
        subtitle="Seven credentials spanning foundation, agile, mobile, and advanced technical test engineering—signals seriousness to hiring managers."
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {certifications.map((cert, index) => (
          <motion.div
            key={cert.code}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.42, ease: "easeOut", delay: Math.min(index * 0.05, 0.18) }}
            whileHover={{ y: -4, transition: { duration: 0.22 } }}
            className="relative overflow-hidden rounded-2xl border border-slate-300/80 bg-white/70 p-6 text-left shadow-sm transition-colors hover:border-brand-400/45 hover:shadow-[0_16px_40px_-20px_rgba(41,136,255,0.2)] dark:border-slate-700/55 dark:bg-slate-900/55 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] dark:hover:border-brand-400/40 dark:hover:shadow-[0_16px_40px_-20px_rgba(41,136,255,0.35)]"
          >
            <div
              className="pointer-events-none absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-brand-500 via-brand-400 to-transparent opacity-90"
              aria-hidden="true"
            />
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-600 dark:text-brand-300/90">
              ISTQB®
            </p>
            <p className="mt-3 font-mono text-xl font-bold tracking-tight text-slate-900 dark:text-white">{cert.code}</p>
            <p className="mt-3 text-sm leading-snug text-slate-600 dark:text-slate-400">{cert.name}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Certifications;
