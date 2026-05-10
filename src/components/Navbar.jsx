import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";

/** Pixels below the sticky header; tune with scroll-margin on sections */
const ACTIVATION_GAP_PX = 12;

/** Ignore scrollspy while smooth-scroll animates after a nav click (avoids flashing intermediate sections) */
const SPY_FREEZE_MS = 560;

function Navbar({ navLinks, darkMode, onToggleTheme }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("home");
  const headerRef = useRef(null);
  const rafRef = useRef(0);
  const spyFrozenUntilRef = useRef(0);
  const navClickGenRef = useRef(0);

  useEffect(() => {
    return () => {
      navClickGenRef.current += 1;
    };
  }, []);

  const computeActiveId = useCallback(() => {
    if (!navLinks.length) return "home";

    const header = headerRef.current;
    const headerHeight = header?.offsetHeight ?? 72;
    const activationLine = window.scrollY + headerHeight + ACTIVATION_GAP_PX;

    let current = navLinks[0].id;
    for (const { id } of navLinks) {
      const el = document.getElementById(id);
      if (!el) continue;
      const top = el.getBoundingClientRect().top + window.scrollY;
      if (top <= activationLine) current = id;
    }
    return current;
  }, [navLinks]);

  useEffect(() => {
    const flush = () => {
      rafRef.current = 0;
      setScrolled(window.scrollY > 12);
      if (performance.now() < spyFrozenUntilRef.current) return;
      const next = computeActiveId();
      setActiveId((prev) => (prev === next ? prev : next));
    };

    const schedule = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(flush);
    };

    flush();

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    window.addEventListener("hashchange", schedule, { passive: true });

    const header = headerRef.current;
    let resizeObserver;
    if (header && typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(schedule);
      resizeObserver.observe(header);
    }

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("hashchange", schedule);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      resizeObserver?.disconnect();
    };
  }, [computeActiveId]);

  const onNavActivate = useCallback(
    (id) => {
      const gen = ++navClickGenRef.current;
      setActiveId(id);
      spyFrozenUntilRef.current = performance.now() + SPY_FREEZE_MS;
      window.setTimeout(() => {
        if (navClickGenRef.current !== gen) return;
        spyFrozenUntilRef.current = 0;
        setActiveId(computeActiveId());
      }, SPY_FREEZE_MS);
    },
    [computeActiveId]
  );

  const headerClass = scrolled
    ? "border-slate-300/80 bg-white/85 shadow-sm shadow-slate-900/5 dark:border-slate-800/80 dark:bg-slate-950/90 dark:shadow-black/20"
    : "border-slate-300/60 bg-white/70 dark:border-slate-800/50 dark:bg-slate-950/70";

  return (
    <header
      ref={headerRef}
      className={`fixed left-0 right-0 top-0 z-50 border-b backdrop-blur-xl transition-[background-color,box-shadow,border-color] duration-300 ${headerClass}`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 max-[480px]:px-3 max-[480px]:py-3 sm:px-6 sm:py-4 lg:px-8">
        <a
          href="#home"
          className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-300"
          onClick={() => onNavActivate("home")}
        >
          Mohamed Yehia
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const active = activeId === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => onNavActivate(link.id)}
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
                    onClick={() => {
                      onNavActivate(link.id);
                      setOpen(false);
                    }}
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
