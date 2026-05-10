import { motion } from "framer-motion";
import { FiCalendar, FiDownload, FiLinkedin, FiMail } from "react-icons/fi";
import { useCalendlyModal } from "../context/CalendlyModalContext";
import HeroStats from "./HeroStats";

const ease = [0.25, 0.1, 0.25, 1];

const ctaPrimary =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-brand-600 px-5 py-3.5 text-sm font-semibold text-white shadow-glow transition duration-300 hover:z-10 hover:-translate-y-1 hover:scale-[1.02] hover:bg-brand-500 hover:shadow-[0_0_32px_-4px_rgba(41,136,255,0.55)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400 active:scale-[0.98]";

const ctaSecondary =
  "group inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300/90 bg-white/75 px-5 py-3.5 text-sm font-semibold text-slate-800 backdrop-blur-sm transition duration-300 hover:z-10 hover:-translate-y-1 hover:scale-[1.02] hover:border-brand-500/50 hover:bg-white hover:text-brand-700 hover:shadow-[0_0_28px_-6px_rgba(84,171,255,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400 active:scale-[0.98] dark:border-slate-600/80 dark:bg-slate-900/40 dark:text-slate-100 dark:hover:border-brand-400/60 dark:hover:bg-slate-800/60 dark:hover:text-white dark:hover:shadow-[0_0_28px_-6px_rgba(84,171,255,0.45)]";

function Hero({ titles, heroStats }) {
  const { openCalendly } = useCalendlyModal();

  return (
    <section
      id="home"
      className="relative overflow-x-clip overflow-y-visible scroll-mt-20 pt-[4.75rem] max-[480px]:scroll-mt-[4.5rem] max-[480px]:pt-[4.5rem] sm:scroll-mt-24 sm:pt-24 lg:pt-24 xl:pt-24"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(41,136,255,0.22),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(41,136,255,0.18),transparent)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-1/4 top-1/3 -z-10 h-64 w-64 rounded-full bg-brand-500/10 blur-3xl dark:bg-brand-400/10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 -z-10 h-80 w-80 rounded-full bg-brand-600/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl px-3 pb-12 pt-0 max-[480px]:px-3 sm:px-6 sm:pb-16 lg:px-8 lg:pb-20 xl:pb-24">
        <div className="grid min-w-0 items-center gap-8 max-[480px]:gap-7 sm:gap-10 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:gap-12 xl:gap-14">
          <div className="order-2 min-w-0 max-w-3xl lg:order-1">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease }}
              className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-brand-300"
            >
              Senior QA Automation / SDET
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05, ease }}
              className="max-[480px]:text-[clamp(1.85rem,6.5vw,2.25rem)] text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl xl:text-[3.35rem]"
            >
              Mohamed Yehia
            </motion.h1>
            <motion.ul
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12, ease }}
              className="mt-7 space-y-2.5 border-l-2 border-brand-500/40 pl-5 text-slate-600 dark:text-slate-300"
            >
              {titles.map((title) => (
                <li key={title} className="text-[0.95rem] leading-snug sm:text-base sm:leading-relaxed">
                  {title}
                </li>
              ))}
            </motion.ul>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2, ease }}
              className="mt-8 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg"
            >
              I own quality outcomes for enterprise programs—pairing automation depth with QA leadership, CI/CD
              discipline, and stakeholder-ready evidence from strategy through release.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.28, ease }}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            >
              <button type="button" onClick={openCalendly} className={ctaPrimary}>
                <FiCalendar className="shrink-0 transition group-hover:scale-110" aria-hidden="true" />
                Schedule a Call
              </button>
              <a href="/Mohamed Yehia Senior QA CV.pdf" className={ctaPrimary}>
                <FiDownload className="shrink-0 transition group-hover:scale-110" aria-hidden="true" />
                Download CV
              </a>
              <a
                href="https://linkedin.com/in/mohamed-yehia-selim"
                target="_blank"
                rel="noopener noreferrer"
                className={ctaSecondary}
                aria-label="View LinkedIn profile. Opens in a new tab."
              >
                <FiLinkedin className="shrink-0 transition group-hover:scale-110" aria-hidden="true" />
                View LinkedIn
              </a>
              <a href="#contact" className={ctaSecondary}>
                <FiMail className="shrink-0 transition group-hover:scale-110" aria-hidden="true" />
                Contact Me
              </a>
            </motion.div>

            <HeroStats stats={heroStats} />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.18, ease }}
            className="order-1 mx-auto w-full min-w-0 max-w-[18.5rem] max-[480px]:max-w-[min(100%,17.5rem)] sm:max-w-sm lg:order-2 lg:max-w-none"
          >
            <div className="relative">
              <div
                className="absolute -inset-1 rounded-[1.35rem] bg-gradient-to-br from-brand-500/35 via-brand-600/10 to-transparent opacity-80 blur-md dark:opacity-100"
                aria-hidden="true"
              />
              <div className="relative overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-900/80 p-1.5 shadow-glow dark:border-slate-600/50">
                <img
                  src="/mohamed-photo.jpg"
                  alt="Mohamed Yehia portrait"
                  className="aspect-[4/5] w-full rounded-xl object-cover object-center sm:h-[min(32rem,70vh)] sm:aspect-auto lg:h-[min(36rem,78vh)]"
                  width={480}
                  height={600}
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
