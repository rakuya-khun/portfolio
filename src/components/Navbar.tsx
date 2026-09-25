import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import logo3D from "@/assets/Logo3D.png";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { theme, toggleTheme } = useTheme();

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);

    const sections = navLinks.map((l) => l.href.replace("#", ""));
    let current = "home";
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120) current = id;
      }
    }
    setActiveSection(current);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "nav-solid" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2.5 group focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none rounded-lg cursor-pointer">
          <img src={logo3D} alt="Lloyd Harold logo" className="w-9 h-9 rounded-lg object-contain dark:bg-white/90 dark:p-0.5" />
          <div>
            <span className="text-base font-bold text-foreground tracking-tight">Lloyd Harold</span>
            <span className="block text-[10px] font-mono-code text-muted-foreground tracking-wider uppercase">Full Stack Developer</span>
          </div>
        </a>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={`relative px-4 py-2 min-h-11 inline-flex items-center text-sm font-medium rounded-lg transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none cursor-pointer ${
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Right side */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="w-11 h-11 min-h-11 min-w-11 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <a
            href="#contact"
            className="btn-glow rounded-full bg-primary px-5 py-2 min-h-11 inline-flex items-center text-sm font-semibold text-primary-foreground transition-colors duration-200 hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none cursor-pointer"
          >
            Let's Talk
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="w-11 h-11 min-h-11 min-w-11 rounded-lg border border-border flex items-center justify-center text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-foreground p-1 w-11 h-11 min-h-11 min-w-11 inline-flex items-center justify-center rounded-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none cursor-pointer"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden nav-solid overflow-hidden"
            id="mobile-menu"
          >
            <ul className="flex flex-col items-center gap-2 py-6 px-6">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace("#", "");
                return (
                  <li key={link.label} className="w-full">
                    <a
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      aria-current={isActive ? "page" : undefined}
                      className={`block text-center py-3 min-h-11 rounded-xl transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none cursor-pointer ${
                        isActive
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-foreground hover:bg-secondary/50"
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
              <li className="w-full pt-2">
                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="block text-center rounded-full bg-primary px-5 py-3 min-h-11 text-sm font-semibold text-primary-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none cursor-pointer"
                >
                  Let's Talk
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
