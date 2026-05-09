import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import About from "./components/About";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import Hero from "./components/Hero";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import {
  caseStudies,
  certifications,
  experiences,
  heroStats,
  navLinks,
  skillGroups,
  titles
} from "./data";

function App() {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      const isDark = storedTheme === "dark";
      setDarkMode(isDark);
      document.documentElement.classList.toggle("dark", isDark);
    } else {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }

    const timeout = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timeout);
  }, []);

  const toggleTheme = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <>
      <AnimatePresence>{loading && <LoadingScreen />}</AnimatePresence>
      {!loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Navbar navLinks={navLinks} darkMode={darkMode} onToggleTheme={toggleTheme} />
          <main>
            <Hero titles={titles} heroStats={heroStats} />
            <About />
            <Experience experiences={experiences} />
            <Skills skillGroups={skillGroups} />
            <Certifications certifications={certifications} />
            <Projects caseStudies={caseStudies} />
            <Contact />
          </main>
          <FloatingWhatsApp />
          <Footer />
        </motion.div>
      )}
    </>
  );
}

export default App;
