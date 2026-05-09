import { FaWhatsapp } from "react-icons/fa6";

function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/201127624482"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-[70] inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-2xl text-white shadow-lg shadow-green-600/30 transition hover:scale-105 hover:bg-green-400"
    >
      <FaWhatsapp />
    </a>
  );
}

export default FloatingWhatsApp;
