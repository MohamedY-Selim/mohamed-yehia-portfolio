import { motion } from "framer-motion";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { FiLinkedin, FiMail, FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import SectionHeading from "./SectionHeading";

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

    // Run full validation
    if (!validateAll()) {
      setSubmitState({
        loading: false,
        success: "",
        error: "Please fix the errors above before sending."
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
    const base = "w-full rounded-xl border bg-white/80 px-4 py-3 text-slate-800 outline-none transition dark:bg-slate-900/90 dark:text-slate-100";
    const hasError = touched[fieldName] && fieldErrors[fieldName];
    if (hasError) {
      return `${base} border-rose-400 focus:border-rose-500 dark:border-rose-500`;
    }
    return `${base} border-slate-300 focus:border-brand-400 dark:border-slate-700`;
  };

  return (
    <section id="contact" className="section-wrapper pb-28">
      <SectionHeading
        eyebrow="Contact"
        title="Let's build quality that scales"
        subtitle="Open to senior QA leadership, automation consulting, and strategic quality engineering opportunities."
      />
      <div className="grid gap-8 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="glass-card p-6"
        >
          <div className="space-y-4 text-slate-700 dark:text-slate-300">
            <a href="mailto:mohamedy.selim14@gmail.com" className="flex items-center gap-3 hover:text-brand-500 dark:hover:text-brand-300">
              <FiMail /> mohamedy.selim14@gmail.com
            </a>
            <a
              href="https://linkedin.com/in/mohamed-yehia-selim"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 hover:text-brand-500 dark:hover:text-brand-300"
            >
              <FiLinkedin /> linkedin.com/in/mohamed-yehia-selim
            </a>
            <a href="tel:+201127624482" className="flex items-center gap-3 hover:text-brand-500 dark:hover:text-brand-300">
              <FiPhone /> +20 112 762 4482
            </a>
            <a
              href="https://wa.me/201127624482"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 hover:text-brand-500 dark:hover:text-brand-300"
            >
              <FaWhatsapp /> WhatsApp Chat
            </a>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          onSubmit={handleSubmit}
          className="glass-card space-y-4 p-6"
          noValidate
        >
          {/* Honeypot field - hidden from users, traps bots */}
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            tabIndex="-1"
            autoComplete="off"
            aria-hidden="true"
            style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }}
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
            className="w-full rounded-xl bg-brand-600 px-5 py-3 font-semibold text-white transition hover:bg-brand-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitState.loading ? "Sending..." : "Send Message"}
          </button>
        </motion.form>
      </div>
    </section>
  );
}

export default Contact;