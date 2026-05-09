import { useState } from "react";
import { FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";

function Navbar({ navLinks, darkMode, onToggleTheme }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-slate-300/70 bg-white/70 backdrop-blur-xl dark:border-slate-800/50 dark:bg-slate-950/70">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#home" className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-300">
          Mohamed Yehia
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
            className="text-sm text-slate-700 transition hover:text-brand-500 dark:text-slate-300 dark:hover:text-brand-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            className="rounded-lg border border-slate-300 bg-white/70 p-2 text-slate-700 transition hover:border-brand-400 hover:text-brand-500 dark:border-slate-700/70 dark:bg-slate-900/40 dark:text-slate-200 dark:hover:border-brand-300 dark:hover:text-brand-300"
            aria-label="Toggle theme"
          >
            {darkMode ? <FiSun /> : <FiMoon />}
          </button>
          <button
            type="button"
            className="rounded-lg border border-slate-300 p-2 text-slate-700 md:hidden dark:border-slate-700/70 dark:text-slate-200"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-slate-300 bg-white md:hidden dark:border-slate-800 dark:bg-slate-950">
          <div className="mx-auto flex max-w-6xl flex-col px-4 py-3 sm:px-6">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2 text-sm text-slate-700 transition hover:bg-slate-100 hover:text-brand-500 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-brand-300"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
