/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"]
      },
      colors: {
        brand: {
          50: "#eef8ff",
          100: "#d8eeff",
          200: "#b9deff",
          300: "#89c9ff",
          400: "#54abff",
          500: "#2988ff",
          600: "#1069ff",
          700: "#0d52e6",
          800: "#1443ba",
          900: "#173d92"
        }
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(84, 171, 255, 0.3), 0 20px 45px -20px rgba(16, 105, 255, 0.6)"
      }
    }
  },
  plugins: []
};
