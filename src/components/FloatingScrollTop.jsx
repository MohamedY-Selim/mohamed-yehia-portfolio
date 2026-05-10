import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { FiChevronUp } from "react-icons/fi";

const SHOW_AFTER_PX = 320;

function FloatingScrollTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={scrollUp}
          aria-label="Scroll back to top"
          className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] left-[calc(0.75rem+env(safe-area-inset-left,0px))] z-[70] inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-400/40 bg-white/90 text-xl text-slate-800 shadow-lg backdrop-blur-sm transition hover:scale-105 hover:border-brand-400/50 hover:text-brand-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400 dark:border-slate-600/60 dark:bg-slate-900/90 dark:text-slate-100 dark:hover:border-brand-400/40 dark:hover:text-brand-300 max-[480px]:bottom-[calc(0.75rem+env(safe-area-inset-bottom,0px))] max-[480px]:left-3 sm:bottom-8 sm:left-8 sm:h-14 sm:w-14"
        >
          <FiChevronUp className="h-7 w-7" aria-hidden="true" />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}

export default FloatingScrollTop;
