import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

function Experience({ experiences }) {
  return (
    <section id="experience" className="section-wrapper">
      <SectionHeading
        eyebrow="Experience"
        title="Impact across enterprise programs"
        subtitle="Leadership, automation ownership, and measurable outcomes—from national-scale delivery to regulated industries."
      />
      <div className="relative space-y-6 before:absolute before:left-[11px] before:top-3 before:hidden before:h-[calc(100%-24px)] before:w-px before:bg-gradient-to-b before:from-brand-500/50 before:via-slate-300/80 before:to-transparent dark:before:via-slate-700/60 md:before:block">
        {experiences.map((item, index) => {
          const flagship = Boolean(item.flagship);
          return (
            <div key={item.company} className="relative md:pl-8">
              <span
                className="absolute left-0 top-7 hidden h-2.5 w-2.5 rounded-full border-2 border-brand-500 bg-white dark:border-brand-400 dark:bg-slate-950 md:block"
                aria-hidden="true"
              />
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: Math.min(index * 0.03, 0.15)
                }}
                className={`relative overflow-hidden rounded-2xl border p-6 transition duration-300 sm:p-7 ${
                  flagship
                    ? "border-brand-400/40 bg-gradient-to-br from-brand-600/[0.08] via-white to-slate-50 shadow-md shadow-brand-500/10 hover:border-brand-500/50 dark:from-brand-600/[0.12] dark:via-slate-900/50 dark:to-slate-900/30 dark:shadow-[0_0_0_1px_rgba(84,171,255,0.12),0_24px_48px_-28px_rgba(16,105,255,0.35)] dark:hover:border-brand-400/50"
                    : "glass-card border-slate-300/70 hover:border-brand-400/30 dark:border-slate-700/50 dark:hover:border-brand-400/25"
                }`}
              >
                {flagship ? (
                  <span className="mb-4 inline-flex items-center rounded-full border border-brand-500/35 bg-brand-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-700 dark:border-brand-400/30 dark:bg-brand-500/10 dark:text-brand-200">
                    Flagship role
                  </span>
                ) : null}
                <div className="flex flex-col items-start gap-2 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between sm:gap-4">
                  <h3 className="min-w-0 w-full text-lg font-semibold leading-snug text-slate-900 dark:text-white sm:w-auto sm:max-w-[min(100%,36rem)] sm:text-xl">
                    {item.company}
                  </h3>
                  <span className="w-fit max-w-full shrink-0 rounded-xl border border-brand-500/35 bg-brand-500/10 px-3 py-1.5 text-left text-xs font-semibold leading-snug text-brand-700 [overflow-wrap:anywhere] dark:border-brand-400/35 dark:text-brand-200 sm:rounded-full sm:py-1 sm:leading-none">
                    {item.duration}
                  </span>
                </div>
                <p className="mt-4 text-base font-medium text-slate-800 dark:text-slate-100 sm:mt-3">
                  {item.role}
                  {item.subRole ? <span className="text-brand-300"> · {item.subRole}</span> : null}
                </p>
                {item.location ? (
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.location}</p>
                ) : null}
                <ul className="mt-5 space-y-2.5 border-t border-slate-700/40 pt-5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {item.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3">
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400"
                        aria-hidden="true"
                      />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Experience;
