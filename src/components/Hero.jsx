import { motion } from "framer-motion";
import { FiDownload, FiLinkedin, FiMail } from "react-icons/fi";

function Hero({ titles }) {
  return (
    <section id="home" className="section-wrapper pt-36">
      <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="mb-3 text-xs uppercase tracking-[0.24em] text-brand-300">
            Senior QA Automation / SDET Portfolio
          </p>
          <h1 className="text-4xl font-extrabold leading-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">Mohamed Yehia</h1>
          <ul className="mt-6 space-y-2 text-slate-700 dark:text-slate-300">
            {titles.map((title) => (
              <li key={title} className="text-base sm:text-lg">
                {title}
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-2xl text-slate-700 dark:text-slate-300">
            Building reliable, scalable, and high-quality software through automation, QA strategy, and process
            improvement.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/Mohamed Yehia Senior QA CV.pdf"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-brand-500"
            >
              <FiDownload /> Download CV
            </a>
            <a
              href="https://linkedin.com/in/mohamed-yehia-selim"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-brand-500 hover:text-brand-600 dark:border-slate-700 dark:bg-transparent dark:text-slate-200 dark:hover:border-brand-300 dark:hover:text-brand-300"
            >
              <FiLinkedin /> LinkedIn Profile
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-brand-500 hover:text-brand-600 dark:border-slate-700 dark:bg-transparent dark:text-slate-200 dark:hover:border-brand-300 dark:hover:text-brand-300"
            >
              <FiMail /> Contact Me
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mx-auto w-full max-w-sm"
        >
          <div className="glass-card overflow-hidden p-2 shadow-glow">
            <img
              src="/mohamed-photo.jpg"
              alt="Mohamed Yehia portrait"
              className="h-[28rem] w-full rounded-xl object-cover object-center"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
