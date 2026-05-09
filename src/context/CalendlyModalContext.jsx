import { createContext, useCallback, useContext, useMemo, useState } from "react";

const CalendlyModalContext = createContext(null);

export function CalendlyModalProvider({ children }) {
  const [open, setOpen] = useState(false);

  const openCalendly = useCallback(() => setOpen(true), []);
  const closeCalendly = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({
      open,
      openCalendly,
      closeCalendly
    }),
    [open, openCalendly, closeCalendly]
  );

  return <CalendlyModalContext.Provider value={value}>{children}</CalendlyModalContext.Provider>;
}

export function useCalendlyModal() {
  const ctx = useContext(CalendlyModalContext);
  if (!ctx) {
    throw new Error("useCalendlyModal must be used within CalendlyModalProvider");
  }
  return ctx;
}
