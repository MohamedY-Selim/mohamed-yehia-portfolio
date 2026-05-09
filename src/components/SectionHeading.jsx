import { motion } from "framer-motion";

function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="mb-12"
    >
      <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-300">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 max-w-3xl text-slate-600 dark:text-slate-300">{subtitle}</p>}
    </motion.div>
  );
}

export default SectionHeading;
