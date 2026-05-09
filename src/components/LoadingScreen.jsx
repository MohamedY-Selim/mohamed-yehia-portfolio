import { motion } from "framer-motion";

function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-slate-950">
      <div className="flex flex-col items-center gap-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.3, ease: "linear" }}
          className="h-12 w-12 rounded-full border-2 border-brand-400 border-t-transparent"
        />
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-300">Loading Portfolio</p>
      </div>
    </div>
  );
}

export default LoadingScreen;
