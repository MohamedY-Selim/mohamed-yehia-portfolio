import { FiCalendar, FiMail } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import { useCalendlyModal } from "../context/CalendlyModalContext";

const MAILTO = "mailto:mohamedy.selim14@gmail.com";
const WHATSAPP_URL = "https://wa.me/201127624482";

const btn =
  "inline-flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

function FloatingQuickActions() {
  const { openCalendly } = useCalendlyModal();

  return (
    <div
      className="fixed bottom-6 right-6 z-[70] flex max-w-[83vw] flex-col-reverse gap-3 sm:bottom-8 sm:right-8 sm:max-w-none"
      role="navigation"
      aria-label="Quick contact actions"
    >
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp. Opens in a new tab."
        className={`${btn} bg-green-600 shadow-green-900/40 hover:bg-green-500 focus-visible:outline-green-300`}
      >
        <FaWhatsapp className="h-6 w-6" aria-hidden="true" />
      </a>
      <button
        type="button"
        onClick={openCalendly}
        aria-label="Book a meeting with Calendly"
        className={`${btn} bg-brand-600 shadow-brand-900/40 hover:bg-brand-500 focus-visible:outline-brand-300`}
      >
        <FiCalendar className="h-6 w-6" aria-hidden="true" />
      </button>
      <a
        href={MAILTO}
        aria-label="Send email to mohamedy.selim14@gmail.com"
        className={`${btn} bg-slate-700 shadow-slate-900/40 hover:bg-slate-600 focus-visible:outline-slate-300`}
      >
        <FiMail className="h-6 w-6" aria-hidden="true" />
      </a>
    </div>
  );
}

export default FloatingQuickActions;
