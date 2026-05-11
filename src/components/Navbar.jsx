import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "certifications", label: "Certifications" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" }
];

const NAVBAR_HEIGHT_PX = 88;
/** Mobile: scroll target after menu closes (px under top of viewport) */
const MOBILE_NAV_OFFSET = 80;
/** Extra lead for scrollspy so the “current” section matches perceived reading position */
const SCROLLSPY_LEAD_PX = 160;

function Navbar({ darkMode, onToggleTheme }) {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isProgrammaticScroll = useRef(false);
  const scrollTimeoutRef = useRef(null);
  const mobileNavDelayRef = useRef(null);

  const scrollToSection = useCallback((id) => {
    const section = document.getElementById(id);
    if (!section) return;

    isProgrammaticScroll.current = true;
    setActiveSection(id);
    setIsMenuOpen(false);

    const navbarHeight = NAVBAR_HEIGHT_PX;
    const top = section.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

    window.scrollTo({
      top: Math.max(0, top),
      behavior: "smooth"
    });

    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

    scrollTimeoutRef.current = window.setTimeout(() => {
      scrollTimeoutRef.current = null;
      setActiveSection(id);
      isProgrammaticScroll.current = false;
    }, 1200);
  }, []);

  const handleMobileNavClick = useCallback((id) => {
    setActiveSection(id);
    setIsMenuOpen(false);

    isProgrammaticScroll.current = true;

    if (scrollTimeoutRef.current) {
      window.clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = null;
    }
    if (mobileNavDelayRef.current) {
      window.clearTimeout(mobileNavDelayRef.current);
      mobileNavDelayRef.current = null;
    }

    mobileNavDelayRef.current = window.setTimeout(() => {
      mobileNavDelayRef.current = null;

      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";

      const section = document.getElementById(id);
      if (!section) {
        isProgrammaticScroll.current = false;
        return;
      }

      const targetY =
        section.getBoundingClientRect().top + window.scrollY - MOBILE_NAV_OFFSET;

      window.scrollTo({
        top: Math.max(0, targetY),
        behavior: "smooth"
      });

      if (scrollTimeoutRef.current) window.clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = window.setTimeout(() => {
        scrollTimeoutRef.current = null;
        setActiveSection(id);
        isProgrammaticScroll.current = false;
      }, 1200);
    }, 250);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);

      if (isProgrammaticScroll.current) return;

      const navbarHeight = NAVBAR_HEIGHT_PX;
      const scrollPosition = window.scrollY + navbarHeight + SCROLLSPY_LEAD_PX;

      let currentSection = "home";

      navItems.forEach((item) => {
        const section = document.getElementById(item.id);
        if (!section) return;
        // Document Y of section top (offsetTop alone is wrong when offsetParent ≠ scroll root)
        const sectionDocTop = section.getBoundingClientRect().top + window.pageYOffset;
        if (sectionDocTop <= scrollPosition) {
          currentSection = item.id;
        }
      });

      setActiveSection((prev) => (prev === currentSection ? prev : currentSection));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (scrollTimeoutRef.current) window.clearTimeout(scrollTimeoutRef.current);
      if (mobileNavDelayRef.current) window.clearTimeout(mobileNavDelayRef.current);
    };
  }, []);

  const headerClass = scrolled
    ? "border-slate-300/80 bg-white/85 shadow-sm shadow-slate-900/5 dark:border-slate-800/80 dark:bg-slate-950/90 dark:shadow-black/20"
    : "border-slate-300/60 bg-white/70 dark:border-slate-800/50 dark:bg-slate-950/70";

  const desktopBtnBase =
    "relative rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400";

  const mobileBtnBase =
    "w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400 max-[480px]:px-2.5 max-[480px]:py-2.5";

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 border-b backdrop-blur-xl transition-[background-color,box-shadow,border-color] duration-300 ${headerClass}`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 max-[480px]:px-3 max-[480px]:py-3 sm:px-6 sm:py-4 lg:px-8">
        <button
          type="button"
          onClick={() => scrollToSection("home")}
          className="border-0 bg-transparent text-sm font-semibold uppercase tracking-[0.2em] text-brand-300 hover:text-brand-200 focus-visible:text-brand-200"
        >
          Mohamed Yehia
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={`${desktopBtnBase} ${
                  active
                    ? "text-brand-600 dark:text-brand-300"
                    : "text-slate-600 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-300"
                }`}
              >
                {item.label}
                {active ? (
                  <span className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-brand-500 dark:bg-brand-400" />
                ) : null}
              </button>
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
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      <AnimatePresence initial={false}>
        {isMenuOpen ? (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative z-[60] overflow-hidden border-t border-slate-300/80 bg-white/95 dark:border-slate-800 dark:bg-slate-950/95 md:hidden"
            style={{ pointerEvents: "auto" }}
          >
            <div className="relative z-[61] mx-auto flex max-w-6xl flex-col gap-0.5 px-4 py-3 max-[480px]:px-3 sm:px-6 sm:py-3.5">
              {navItems.map((item) => {
                const active = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleMobileNavClick(item.id)}
                    className={`relative z-[62] touch-manipulation ${mobileBtnBase} ${
                      active
                        ? "bg-brand-500/10 text-brand-600 dark:text-brand-300"
                        : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900"
                    }`}
                  >
                    {item.label}
                  </button>
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
