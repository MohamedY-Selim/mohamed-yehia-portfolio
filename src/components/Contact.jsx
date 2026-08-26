import { motion } from "framer-motion";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { FiCalendar, FiLinkedin, FiMail, FiPhone, FiSend } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import SectionHeading from "./SectionHeading";
import { useCalendlyModal } from "../context/CalendlyModalContext";

// Validation rules - centralized for easy adjustment
const VALIDATION_RULES = {
  name: {
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\u0600-\u06FF\s'-]+$/,
    patternMessage: "Name can only contain letters, spaces, hyphens, and apostrophes"
  },
  email: {
    maxLength: 100,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    patternMessage: "Please enter a valid email address"
  },
  message: {
    minLength: 10,
    maxLength: 1000
  }
};

// Anti-spam: minimum time between page load and submission (humans take >3s)
const MIN_SUBMIT_TIME_MS = 3000;
// Anti-spam: cooldown between submissions
const SUBMIT_COOLDOWN_MS = 30000;

function Contact() {
  const { openCalendly } = useCalendlyModal();
  const emailJsServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const emailJsTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const emailJsPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    website: "" // honeypot field - hidden from real users, bots fill it
  });
  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false
  });
  const [submitState, setSubmitState] = useState({
    loading: false,
    success: "",
    error: ""
  });
  const [pageLoadTime] = useState(Date.now());
  const [lastSubmitTime, setLastSubmitTime] = useState(0);

  // Validate a single field and return error message ("" if valid)
  const validateField = (name, value) => {
    const trimmed = value.trim();

    if (name === "name") {
      if (!trimmed) return "Name is required";
      if (trimmed.length < VALIDATION_RULES.name.minLength)
        return `Name must be at least ${VALIDATION_RULES.name.minLength} characters`;
      if (trimmed.length > VALIDATION_RULES.name.maxLength)
        return `Name must be less than ${VALIDATION_RULES.name.maxLength} characters`;
      if (!VALIDATION_RULES.name.pattern.test(trimmed))
        return VALIDATION_RULES.name.patternMessage;
    }

    if (name === "email") {
      if (!trimmed) return "Email is required";
      if (trimmed.length > VALIDATION_RULES.email.maxLength)
        return `Email must be less than ${VALIDATION_RULES.email.maxLength} characters`;
      if (!VALIDATION_RULES.email.pattern.test(trimmed))
        return VALIDATION_RULES.email.patternMessage;
    }

    if (name === "message") {
      if (!trimmed) return "Message is required";
      if (trimmed.length < VALIDATION_RULES.message.minLength)
        return `Message must be at least ${VALIDATION_RULES.message.minLength} characters`;
      if (trimmed.length > VALIDATION_RULES.message.maxLength)
        return `Message must be less than ${VALIDATION_RULES.message.maxLength} characters`;
      // Detect spam: too many URLs in message
      const urlCount = (trimmed.match(/https?:\/\//gi) || []).length;
      if (urlCount > 2) return "Message contains too many links";
    }

    return "";
  };

  // Validate all fields, return true if all valid
  const validateAll = () => {
    const errors = {
      name: validateField("name", formData.name),
      email: validateField("email", formData.email),
      message: validateField("message", formData.message)
    };
    setFieldErrors(errors);
    setTouched({ name: true, email: true, message: true });
    return !errors.name && !errors.email && !errors.message;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Real-time validation - only show error if field was already touched
    if (touched[name]) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: validateField(name, value)
      }));
    }
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setFieldErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value)
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Clear any previous submit feedback before re-evaluating
    setSubmitState({ loading: false, success: "", error: "" });

    // Validate first so real users always see field errors instead of a fake success
    if (!validateAll()) {
      setSubmitState({
        loading: false,
        success: "",
        error: "Please fix the errors above before sending."
      });
      return;
    }

    // Anti-spam: honeypot check (real users won't fill hidden field)
    if (formData.website) {
      setSubmitState({
        loading: false,
        success: "Message sent successfully. Thank you!", // fake success for bots
        error: ""
      });
      return;
    }

    // Anti-spam: too fast submission (bot)
    const timeSinceLoad = Date.now() - pageLoadTime;
    if (timeSinceLoad < MIN_SUBMIT_TIME_MS) {
      setSubmitState({
        loading: false,
        success: "",
        error: "Please take a moment to review your message before sending."
      });
      return;
    }

    // Anti-spam: cooldown between submissions
    const timeSinceLastSubmit = Date.now() - lastSubmitTime;
    if (lastSubmitTime > 0 && timeSinceLastSubmit < SUBMIT_COOLDOWN_MS) {
      const waitSeconds = Math.ceil((SUBMIT_COOLDOWN_MS - timeSinceLastSubmit) / 1000);
      setSubmitState({
        loading: false,
        success: "",
        error: `Please wait ${waitSeconds} seconds before sending another message.`
      });
      return;
    }

    setSubmitState({ loading: true, success: "", error: "" });

    try {
      if (!emailJsServiceId || !emailJsTemplateId || !emailJsPublicKey) {
        throw new Error("EmailJS config missing");
      }

      await emailjs.send(
        emailJsServiceId,
        emailJsTemplateId,
        {
          from_name: formData.name.trim(),
          from_email: formData.email.trim(),
          message: formData.message.trim(),
          to_name: "Mohamed Yehia"
        },
        emailJsPublicKey
      );

      setLastSubmitTime(Date.now());
      setSubmitState({
        loading: false,
        success: "Message sent successfully. Thank you!",
        error: ""
      });
      setFormData({ name: "", email: "", message: "", website: "" });
      setTouched({ name: false, email: false, message: false });
      setFieldErrors({ name: "", email: "", message: "" });
    } catch (error) {
      setSubmitState({
        loading: false,
        success: "",
        error: "Unable to send right now. Please verify EmailJS keys and try again."
      });
    }
  };

  // Helper for input className based on validation state
  const inputClass = (fieldName) => {
    const base =
      "w-full rounded-xl border bg-white/90 px-4 py-3.5 text-slate-800 outline-none transition placeholder:text-slate-400 focus-visible:border-brand-500/60 focus-visible:ring-2 focus-visible:ring-brand-500/25 dark:bg-slate-900/85 dark:text-slate-100 dark:placeholder:text-slate-500";
    const hasError = touched[fieldName] && fieldErrors[fieldName];
    if (hasError) {
      return `${base} border-rose-400 focus-visible:border-rose-500 focus-visible:ring-rose-500/25 dark:border-rose-500`;
    }
    return `${base} border-slate-300 hover:border-slate-400/90 dark:border-slate-600 dark:hover:border-slate-500`;
  };

  return (
    <section id="contact" className="section-wrapper overflow-x-clip pb-24 max-[480px]:pb-20 sm:pb-28">
      <SectionHeading
        eyebrow="Contact"
        title="Let's talk about your next quality hire"
        subtitle="Senior QA automation, squad leadership, and enterprise test strategy—available for selective roles and advisory conversations."
      />

      <p className="-mt-6 mb-8 max-w-3xl px-0 text-sm font-medium sm:mb-10 sm:text-base">
        <span className="block w-full max-w-full rounded-2xl border border-slate-300/80 bg-white/60 px-3.5 py-2.5 text-center text-xs leading-snug text-slate-600 text-balance [overflow-wrap:anywhere] dark:border-slate-600/60 dark:bg-slate-900/50 dark:text-slate-300 sm:inline-block sm:w-auto sm:max-w-xl sm:rounded-full sm:px-3 sm:py-1.5 sm:text-left sm:text-sm">
          Based in Egypt · Open to remote &amp; GCC opportunities
        </span>
      </p>

      <div className="grid min-w-0 gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="flex min-w-0 flex-col gap-5 sm:gap-6"
        >
          <button
            type="button"
            onClick={openCalendly}
            className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-brand-600 px-6 py-4 text-base font-semibold text-white shadow-glow transition duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:bg-brand-500 hover:shadow-[0_0_36px_-6px_rgba(41,136,255,0.55)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-300"
          >
            <FiCalendar className="shrink-0 transition group-hover:scale-110" aria-hidden="true" />
            Schedule a Call
          </button>

          <div className="glass-card space-y-1 p-4 sm:p-6">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-300">
              Direct channels
            </p>
            <a
              href="mailto:mohamedy.selim14@gmail.com"
              className="flex min-w-0 items-start gap-3 rounded-lg py-2 text-slate-700 transition hover:bg-slate-100/80 hover:text-brand-600 dark:text-slate-300 dark:hover:bg-slate-800/50 dark:hover:text-brand-300 sm:items-center"
            >
              <FiMail className="mt-0.5 shrink-0 sm:mt-0" aria-hidden="true" />
              <span className="min-w-0 break-words [overflow-wrap:anywhere]">mohamedy.selim14@gmail.com</span>
            </a>
            <a
              href="https://linkedin.com/in/mohamed-yehia-selim"
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-w-0 items-start gap-3 rounded-lg py-2 text-slate-700 transition hover:bg-slate-100/80 hover:text-brand-600 dark:text-slate-300 dark:hover:bg-slate-800/50 dark:hover:text-brand-300 sm:items-center"
            >
              <FiLinkedin className="mt-0.5 shrink-0 sm:mt-0" aria-hidden="true" />
              <span className="min-w-0 break-words [overflow-wrap:anywhere]">linkedin.com/in/mohamed-yehia-selim</span>
            </a>
            <a
              href="tel:+201127624482"
              className="flex items-center gap-3 rounded-lg py-2 text-slate-700 transition hover:bg-slate-100/80 hover:text-brand-600 dark:text-slate-300 dark:hover:bg-slate-800/50 dark:hover:text-brand-300"
            >
              <FiPhone className="shrink-0" aria-hidden="true" />
              +20 112 762 4482
            </a>
            <a
              href="https://wa.me/201127624482"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-lg py-2 text-slate-700 transition hover:bg-slate-100/80 hover:text-brand-600 dark:text-slate-300 dark:hover:bg-slate-800/50 dark:hover:text-brand-300"
            >
              <FaWhatsapp className="shrink-0" aria-hidden="true" />
              WhatsApp
            </a>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          onSubmit={handleSubmit}
          className="glass-card min-w-0 space-y-5 border-slate-700/50 p-4 sm:p-7"
          noValidate
        >
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Send a message</h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Brief context on role, stack, and timeline—I typically reply within one business day.
            </p>
          </div>
          {/* Honeypot field - hidden from users, traps bots */}
          <input
            type="text"
            name="company_url"
            value={formData.website}
            onChange={(event) =>
              setFormData((prev) => ({ ...prev, website: event.target.value }))
            }
            tabIndex="-1"
            autoComplete="off"
            data-lpignore="true"
            data-1p-ignore="true"
            aria-hidden="true"
            style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none", height: 0, width: 0 }}
          />

          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Your Name"
              maxLength={VALIDATION_RULES.name.maxLength}
              required
              className={inputClass("name")}
            />
            {touched.name && fieldErrors.name && (
              <p className="mt-1 text-xs text-rose-400">{fieldErrors.name}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Your Email"
              maxLength={VALIDATION_RULES.email.maxLength}
              required
              className={inputClass("email")}
            />
            {touched.email && fieldErrors.email && (
              <p className="mt-1 text-xs text-rose-400">{fieldErrors.email}</p>
            )}
          </div>

          <div>
            <textarea
              rows="5"
              name="message"
              value={formData.message}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Your Message"
              maxLength={VALIDATION_RULES.message.maxLength}
              required
              className={inputClass("message")}
            />
            <div className="mt-1 flex justify-between text-xs">
              <span className="text-rose-400">
                {touched.message && fieldErrors.message ? fieldErrors.message : ""}
              </span>
              <span className="text-slate-400">
                {formData.message.length}/{VALIDATION_RULES.message.maxLength}
              </span>
            </div>
          </div>

          {submitState.success ? (
            <p className="text-sm text-emerald-400">{submitState.success}</p>
          ) : null}
          {submitState.error ? (
            <p className="text-sm text-rose-400">{submitState.error}</p>
          ) : null}

          <button
            type="submit"
            disabled={submitState.loading}
            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3.5 font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-brand-500 hover:shadow-[0_0_28px_-6px_rgba(41,136,255,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none"
          >
            {submitState.loading ? (
              "Sending..."
            ) : (
              <>
                <FiSend className="transition group-hover:translate-x-0.5" aria-hidden="true" />
                Send Message
              </>
            )}
          </button>
        </motion.form>
      </div>
    </section>
  );
}

export default Contact;