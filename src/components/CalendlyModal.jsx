import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FiX } from "react-icons/fi";
import { useCalendlyModal } from "../context/CalendlyModalContext";

const CALENDLY_PATH = "mohamedy-selim14/new-meeting";
const CALENDLY_ORIGIN = "https://calendly.com";
/** If postMessage never arrives (e.g. missing embed_domain), hide loader after iframe load + this */
const SETTLE_FALLBACK_MS = 2200;

function buildEmbedSrc() {
  const params = new URLSearchParams({
    embed: "true",
    embed_type: "Inline",
    hide_gdpr_banner: "1",
    background_color: "020617",
    text_color: "e2e8f0",
    primary_color: "2988ff"
  });
  if (typeof window !== "undefined") {
    params.set("embed_domain", window.location.host || window.location.hostname);
  }
  return `${CALENDLY_ORIGIN}/${CALENDLY_PATH}?${params.toString()}`;
}

function parseCalendlyMessage(data) {
  if (data == null) return null;
  if (typeof data === "string") {
    try {
      return JSON.parse(data);
    } catch {
      return null;
    }
  }
  if (typeof data === "object") return data;
  return null;
}

function isCalendlyContentReadyEvent(eventName) {
  return (
    eventName === "calendly.event_type_viewed" || eventName === "calendly.profile_page_viewed"
  );
}

function CalendlyIframeLoader({ visible }) {
  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="calendly-iframe-loader"
          className="absolute inset-0 z-[2] flex flex-col items-center justify-center gap-4 bg-[#020617]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.3, ease: "linear" }}
            className="h-12 w-12 rounded-full border-2 border-brand-400 border-t-transparent"
            aria-hidden="true"
          />
          <p className="text-center text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-300">
            Loading Calendar
          </p>
          <span className="sr-only">Loading scheduling widget</span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function CalendlyModal() {
  const { open, closeCalendly } = useCalendlyModal();
  const [iframeSrc, setIframeSrc] = useState("");
  const [iframeSession, setIframeSession] = useState(0);
  const [embedReady, setEmbedReady] = useState(false);
  const revealedRef = useRef(false);
  const fallbackTimerRef = useRef(null);
  const wasOpenRef = useRef(false);

  const clearFallback = useCallback(() => {
    if (fallbackTimerRef.current != null) {
      window.clearTimeout(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }
  }, []);

  const markEmbedReady = useCallback(() => {
    if (revealedRef.current) return;
    revealedRef.current = true;
    clearFallback();
    setEmbedReady(true);
  }, [clearFallback]);

  useEffect(() => {
    setIframeSrc(buildEmbedSrc());
  }, []);

  useEffect(() => {
    if (open && !wasOpenRef.current) {
      revealedRef.current = false;
      setEmbedReady(false);
      clearFallback();
      setIframeSession((s) => s + 1);
    }
    wasOpenRef.current = open;
  }, [open, clearFallback]);

  useEffect(() => {
    if (!open) return undefined;

    function onMessage(e) {
      if (e.origin !== CALENDLY_ORIGIN) return;
      const payload = parseCalendlyMessage(e.data);
      const eventName = payload?.event;
      if (typeof eventName === "string" && isCalendlyContentReadyEvent(eventName)) {
        markEmbedReady();
      }
    }

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [open, markEmbedReady]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") closeCalendly();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, closeCalendly]);

  const handleIframeLoad = useCallback(() => {
    if (revealedRef.current) return;
    clearFallback();
    fallbackTimerRef.current = window.setTimeout(() => {
      markEmbedReady();
    }, SETTLE_FALLBACK_MS);
  }, [clearFallback, markEmbedReady]);

  const showLoader = open && !embedReady;

  const modal = (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="calendly-layer"
          className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center sm:p-4"
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.button
            type="button"
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            aria-label="Close booking dialog"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCalendly}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="calendly-modal-title"
            aria-describedby="calendly-modal-desc"
            aria-busy={showLoader}
            className="relative z-[1] flex max-h-[100dvh] w-full max-w-4xl flex-col overflow-hidden rounded-t-2xl border border-slate-600/50 bg-slate-950 shadow-[0_25px_80px_-12px_rgba(0,0,0,0.65)] sm:mx-4 sm:max-h-[min(90dvh,880px)] sm:rounded-2xl"
            initial={{ opacity: 0, y: 48, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.98 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex shrink-0 items-start justify-between gap-4 border-b border-slate-700/60 bg-slate-900/90 px-5 py-4 sm:px-6">
              <div className="min-w-0 pr-2">
                <h2 id="calendly-modal-title" className="text-lg font-semibold tracking-tight text-white sm:text-xl">
                  Book a Meeting
                </h2>
                <p id="calendly-modal-desc" className="mt-1 text-sm leading-relaxed text-slate-400">
                  Schedule a quick call to discuss opportunities, collaborations, or QA consulting.
                </p>
              </div>
              <button
                type="button"
                onClick={closeCalendly}
                className="shrink-0 rounded-xl border border-slate-600/80 bg-slate-800/80 p-2.5 text-slate-300 transition hover:border-slate-500 hover:bg-slate-700 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
                aria-label="Close"
              >
                <FiX className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="relative min-h-0 flex-1 overflow-hidden bg-[#020617]">
              <CalendlyIframeLoader visible={showLoader} />
              {iframeSrc ? (
                <iframe
                  key={iframeSession}
                  title="Calendly scheduling"
                  src={iframeSrc}
                  className={`relative z-[1] block h-[min(72dvh,720px)] w-full border-0 sm:h-[min(62vh,680px)] lg:h-[min(65vh,720px)] ${
                    embedReady ? "opacity-100" : "opacity-0"
                  }`}
                  loading="lazy"
                  onLoad={handleIframeLoad}
                />
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );

  if (typeof document === "undefined") return null;
  return createPortal(modal, document.body);
}

export default CalendlyModal;
