import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";

function Navbar({ navLinks, darkMode, onToggleTheme }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      if (y < 96) setActiveId("home");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.id);
    const elements = sectionIds
      .map((id) => ({ id, el: document.getElementById(id) }))
      .filter((x) => x.el);

    if (elements.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));
        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { root: null, rootMargin: "-42% 0px -42% 0px", threshold: [0, 0.12, 0.25, 0.5] }
    );

    elements.forEach(({ el }) => observer.observe(el));
    return () => observer.disconnect();
  }, [navLinks]);

  const headerClass = scrolled
    ? "border-slate-300/80 bg-white/85 shadow-sm shadow-slate-900/5 dark:border-slate-800/80 dark:bg-slate-950/90 dark:shadow-black/20"
    : "border-slate-300/60 bg-white/70 dark:border-slate-800/50 dark:bg-slate-950/70";

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 border-b backdrop-blur-xl transition-[background-color,box-shadow,border-color] duration-300 ${headerClass}`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 max-[480px]:px-3 max-[480px]:py-3 sm:px-6 sm:py-4 lg:px-8">
        <a href="#home" className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-300">
          Mohamed Yehia
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const active = activeId === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "text-brand-600 dark:text-brand-300"
                    : "text-slate-600 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-300"
                }`}
              >
                {link.label}
                {active ? (
                  <span className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-brand-500 dark:bg-brand-400" />
                ) : null}
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            className="rounded-lg border border-slate-300 bg-white/70 p-2 text-slate-700 transition hover:border-brand-400 hover:text-brand-600 dark:border-slate-700/70 dark:bg-slate-900/40 dark:text-slate-200 dark:hover:border-brand-300 dark:hover:text-brand-300"
            aria-label="Toggle theme"
          >
            {darkMode ? <FiSun /> : <FiMoon />}
          </button>
          <button
            type="button"
            className="rounded-lg border border-slate-300 p-2 text-slate-700 md:hidden dark:border-slate-700/70 dark:text-slate-200"
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden border-t border-slate-300/80 bg-white/95 dark:border-slate-800 dark:bg-slate-950/95 md:hidden"
          >
            <div className="mx-auto flex max-w-6xl flex-col px-4 py-3 max-[480px]:px-3 sm:px-6 sm:py-3.5">
              {navLinks.map((link, index) => {
                const active = activeId === link.id;
                return (
                  <motion.a
                    key={link.id}
                    href={`#${link.id}`}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04, duration: 0.22 }}
                    onClick={() => setOpen(false)}
                    className={`rounded-lg px-3 py-2.5 text-sm font-medium max-[480px]:px-2.5 max-[480px]:py-2.5 ${
                      active
                        ? "bg-brand-500/10 text-brand-600 dark:text-brand-300"
                        : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900"
                    }`}
                  >
                    {link.label}
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
