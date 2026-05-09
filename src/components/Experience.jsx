import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

function Experience({ experiences }) {
  return (
    <section id="experience" className="section-wrapper">
      <SectionHeading
        eyebrow="Experience"
        title="Career Timeline"
        subtitle="Hands-on QA automation delivery with leadership impact across enterprise, fintech, retail, and banking domains."
      />
      <div className="space-y-5">
        {experiences.map((item, index) => (
          <motion.article
            key={item.company}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: Math.min(index * 0.04, 0.24) }}
            className="glass-card relative overflow-hidden p-6 transition hover:border-brand-300"
          >
            <span className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-brand-400 to-brand-700" />
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="pl-4 text-lg font-semibold text-slate-900 dark:text-white">{item.company}</h3>
              <span className="rounded-full border border-brand-400/40 bg-brand-500/10 px-3 py-1 text-xs font-medium text-brand-200">
                {item.duration}
              </span>
            </div>
            <p className="mt-3 pl-4 text-base font-medium text-slate-800 dark:text-slate-100">
              {item.role}
              {item.subRole ? <span className="text-brand-300"> · {item.subRole}</span> : null}
            </p>
            {item.location ? <p className="mt-1 pl-4 text-sm text-slate-500 dark:text-slate-400">{item.location}</p> : null}
            <ul className="mt-4 space-y-2 pl-4 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {item.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-300" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export default Experience;
