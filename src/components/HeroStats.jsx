import { motion } from "framer-motion";
//
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 }
  }
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }
  }
};

function HeroStats({ stats }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="mt-8 grid min-w-0 grid-cols-2 gap-2.5 sm:mt-10 sm:gap-4 md:max-lg:gap-3.5 lg:mt-10 lg:grid-cols-4 lg:gap-4"
      aria-label="Career highlights"
    >
      {stats.map((stat) => (
        <motion.div
          key={stat.label}
          variants={item}
          className={`relative min-w-0 overflow-hidden rounded-2xl border px-3 py-3.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-md border-slate-300/70 bg-white/75 dark:border-slate-700/50 dark:bg-slate-900/55 sm:px-4 sm:py-4 md:max-lg:flex md:max-lg:min-h-[7rem] md:max-lg:flex-col md:max-lg:justify-center lg:min-h-0 ${
            stat.wide ? "col-span-2 md:max-lg:col-span-1 lg:col-span-1" : ""
          }`}
        >
          <div
            className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-brand-500/15 blur-2xl dark:bg-brand-500/15"
            aria-hidden="true"
          />
          <p className="relative text-lg font-bold tracking-tight text-slate-900 dark:text-white sm:text-xl">
            {stat.value}
          </p>
          <p className="relative mt-1 text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default HeroStats;
