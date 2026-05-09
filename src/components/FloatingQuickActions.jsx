import { FiCalendar, FiMail } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";

const CALENDLY_URL = "https://calendly.com/mohamedy-selim14/new-meeting";
const MAILTO = "mailto:mohamedy.selim14@gmail.com";
const WHATSAPP_URL = "https://wa.me/201127624482";

const btn =
  "inline-flex h-14 w-14 items-center justify-center rounded-full text-xl text-white shadow-lg transition hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

function FloatingQuickActions() {
  return (
    <div
      className="fixed bottom-6 right-6 z-[70] flex flex-col-reverse gap-3 max-[380px]:bottom-4 max-[380px]:right-4"
      role="navigation"
      aria-label="Quick contact actions"
    >
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp. Opens in a new tab."
        className={`${btn} bg-green-500 shadow-green-600/30 hover:bg-green-400 focus-visible:outline-green-300`}
      >
        <FaWhatsapp aria-hidden="true" />
      </a>
      <a
        href={CALENDLY_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Schedule a call on Calendly. Opens in a new tab."
        className={`${btn} bg-brand-600 shadow-brand-900/40 hover:bg-brand-500 focus-visible:outline-brand-300`}
      >
        <FiCalendar className="h-6 w-6" aria-hidden="true" />
      </a>
      <a
        href={MAILTO}
        aria-label="Send email to mohamedy.selim14@gmail.com"
        className={`${btn} bg-slate-700 shadow-slate-950/40 hover:bg-slate-600 dark:bg-slate-600 dark:hover:bg-slate-500 focus-visible:outline-slate-300`}
      >
        <FiMail className="h-6 w-6" aria-hidden="true" />
      </a>
    </div>
  );
}

export default FloatingQuickActions;
