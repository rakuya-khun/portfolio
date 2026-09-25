import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Globe, Linkedin, Mail } from "lucide-react";

interface TechBadge {
  name: string;
  highlight?: boolean;
}

const techBadges: TechBadge[] = [
  // Full-stack core — highlighted (backs up experience + skills)
  { name: "React.js", highlight: true },
  { name: "Next.js", highlight: true },
  { name: "TypeScript", highlight: true },
  { name: "Node.js", highlight: true },
  { name: "FastAPI", highlight: true },
  { name: "REST APIs", highlight: true },
  { name: "PostgreSQL" },
  { name: "MongoDB" },
  { name: "Azure Cosmos DB", highlight: true },
  { name: "Microsoft Azure", highlight: true },
  { name: "Azure OpenAI", highlight: true },
  { name: "Stripe", highlight: true },
  { name: "CI/CD Pipelines", highlight: true },
  // Supporting experience
  { name: "JavaScript (ES6+)" },
  { name: "Tailwind CSS" },
  { name: "TanStack Query" },
  { name: "Zustand" },
  { name: "Express.js" },
  { name: "PHP / CI4" },
  { name: "MySQL" },
  { name: "Docker" },
  { name: "GitLab" },
  { name: "GoHighLevel" },
  { name: "WordPress" },
];

const roles = ["Full Stack Developer", "React + TS Specialist", "FastAPI & Node Builder", "Remote SaaS Shipper"];

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing effect (cleans up nested timer to avoid leaks)
  useEffect(() => {
    const currentRole = roles[roleIndex];
    let inner: ReturnType<typeof setTimeout> | undefined;
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
          if (displayText.length === currentRole.length) {
            inner = setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          setDisplayText(currentRole.slice(0, displayText.length - 1));
          if (displayText.length === 0) {
            setIsDeleting(false);
            setRoleIndex((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 40 : 80,
    );
    return () => {
      clearTimeout(timeout);
      if (inner) clearTimeout(inner);
    };
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg scroll-mt-24"
    >
      {/* Static ambient orbs — CSS float animation (no GSAP) */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-primary/[0.06] blur-[100px] pointer-events-none motion-safe:animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-accent/[0.06] blur-[100px] pointer-events-none motion-safe:animate-float" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/[0.04] blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-medium text-primary">Available for remote roles worldwide</span>
          </motion.div>

          {/* Name */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg sm:text-xl font-medium text-muted-foreground tracking-wide"
          >
            Hi, I'm <span className="text-foreground font-semibold">Lloyd Harold Argawanon</span>
          </motion.h2>

          {/* Animated role — reserved 1-line height so shorter/longer roles never shift content below */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 min-h-[1.3em] leading-[1.15] text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
            aria-live="polite"
          >
            <span className="gradient-text">{displayText}</span>
            <span aria-hidden="true" className="inline-block w-[3px] h-[0.9em] bg-primary ml-1 animate-pulse align-text-bottom" />
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-6 max-w-2xl text-muted-foreground leading-relaxed text-base sm:text-lg"
          >
            Full Stack Developer with 3+ years across SaaS, enterprise internal systems, and freelance platforms.
            React/Next.js depth, FastAPI/Node.js APIs, Azure + AWS delivery — including AI-powered SaaS with OpenAI and Stripe billing. Remote-first.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-10 flex flex-wrap gap-4 justify-center"
          >
            <a
              href="#projects"
              className="btn-glow rounded-full bg-primary px-8 py-3.5 min-h-11 text-sm font-semibold text-primary-foreground transition-colors duration-200 hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none cursor-pointer"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="rounded-full border border-border px-8 py-3.5 min-h-11 text-sm font-semibold text-foreground hover:border-primary hover:text-primary transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none cursor-pointer"
            >
              Get In Touch
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="mt-8 flex items-center gap-4"
          >
            {[
              { icon: Globe, href: "#projects", label: "Featured work" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/lloyd-harold-argawanon-43bb57222/", label: "LinkedIn" },
              { icon: Mail, href: "mailto:lloydharoldargawanon@gmail.com", label: "Email" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="w-11 h-11 min-h-11 min-w-11 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none cursor-pointer"
                aria-label={social.label}
              >
                <social.icon size={18} />
              </a>
            ))}
          </motion.div>

          {/* Tech badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 flex flex-wrap justify-center gap-2 max-w-2xl"
          >
            {techBadges.map((tech) => (
              <span
                key={tech.name}
                className={`skill-badge ${
                  tech.highlight
                    ? "!bg-primary/15 !border-primary/40 !text-primary font-semibold"
                    : ""
                }`}
              >
                {tech.highlight && (
                  <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                )}
                {tech.name}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 motion-reduce:hidden"
        >
          <span className="text-xs text-muted-foreground">Scroll</span>
          <div className="motion-safe:animate-bounce">
            <ArrowDown size={16} className="text-muted-foreground" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
