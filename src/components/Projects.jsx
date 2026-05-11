import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

function Projects({ caseStudies }) {
  return (
    <section id="achievements" className="section-wrapper">
      <SectionHeading
        eyebrow="Case studies"
        title="How quality showed up on the job"
        subtitle="Condensed narratives recruiters can scan—scope, tooling, ownership, and outcomes."
      />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
        {caseStudies.map((study, index) => (
          <motion.article
            key={study.title}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.48, ease: "easeOut", delay: Math.min(index * 0.06, 0.12) }}
            className="group flex h-full flex-col rounded-2xl border border-slate-300/70 bg-gradient-to-b from-white to-slate-100/90 p-6 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-brand-400/40 hover:shadow-[0_20px_40px_-24px_rgba(16,105,255,0.2)] dark:border-slate-700/50 dark:from-slate-900/65 dark:to-slate-950/80 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] dark:hover:border-brand-400/35 dark:hover:shadow-[0_20px_40px_-24px_rgba(16,105,255,0.35)] sm:p-7"
          >
            <h3 className="text-lg font-semibold tracking-tight text-slate-900 group-hover:text-brand-700 dark:text-white dark:group-hover:text-brand-100">
              {study.title}
            </h3>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-500">
              Technologies
            </p>
            <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{study.tech}</p>

            <dl className="mt-5 flex flex-1 flex-col gap-4 text-sm">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-300/90">
                  QA contribution
                </dt>
                <dd className="mt-1 leading-relaxed text-slate-700 dark:text-slate-300">{study.contribution}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-300/90">
                  Automation scope
                </dt>
                <dd className="mt-1 leading-relaxed text-slate-700 dark:text-slate-300">{study.automationScope}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-300/90">
                  Business impact
                </dt>
                <dd className="mt-1 leading-relaxed text-slate-700 dark:text-slate-300">{study.businessImpact}</dd>
              </div>
              <div className="mt-auto rounded-xl border border-brand-500/25 bg-brand-500/[0.07] px-4 py-3 dark:border-brand-500/20 dark:bg-brand-500/5">
                <dt className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-300/90">
                  Outcome
                </dt>
                <dd className="mt-1 font-medium leading-relaxed text-slate-800 dark:text-slate-200">{study.outcome}</dd>
              </div>
            </dl>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export default Projects;
