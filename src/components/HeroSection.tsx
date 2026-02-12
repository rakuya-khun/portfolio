import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import gsap from "gsap";

interface TechBadge {
  name: string;
  highlight?: boolean;
}

const techBadges: TechBadge[] = [
  // Front-End
  { name: "HTML5 / CSS3" },
  { name: "JavaScript (ES6+)" },
  { name: "React.js" , highlight: true },
  { name: "Next.js" , highlight: true },
  { name: "Tailwind CSS" },
  { name: "Bootstrap" },
  // Back-End
  { name: "Node.js" , highlight: true },
  { name: "Express.js" },
  { name: "PHP / CI4" },
  { name: "FastAPI" , highlight: true },
  { name: "C#" },
  { name: "Java" },
  { name: "REST APIs" , highlight: true },
  // Database
  { name: "MySQL" },
  { name: "SQL Server" },
  { name: "MongoDB" },
  { name: "Azure Cosmos DB", highlight: true },
  // Cloud & DevOps — highlighted
  { name: "Microsoft Azure", highlight: true },
  { name: "Azure DevOps", highlight: true },
  { name: "CI/CD Pipelines", highlight: true },
  { name: "Azure App Services", highlight: true },
  // Platforms
  { name: "WordPress" },
  { name: "Wix" },
  { name: "GoHighLevel" },
  // Tools
  { name: "Git / GitHub" , highlight: true },
  { name: "Postman" },
  { name: "Agile" },
];

const roles = ["Full Stack Developer", "Backend Engineer", "Cloud Architect", "Problem Solver"];

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing effect
  useEffect(() => {
    const currentRole = roles[roleIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
          if (displayText.length === currentRole.length) {
            setTimeout(() => setIsDeleting(true), 2000);
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
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  // GSAP floating orbs
  useEffect(() => {
    if (!heroRef.current) return;
    const orbs = heroRef.current.querySelectorAll(".hero-orb");
    orbs.forEach((orb, i) => {
      gsap.to(orb, {
        y: "random(-40, 40)",
        x: "random(-30, 30)",
        duration: 4 + i,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg"
    >
      {/* Animated background orbs */}
      <div className="hero-orb absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-primary/[0.06] blur-[100px] pointer-events-none" />
      <div className="hero-orb absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-accent/[0.06] blur-[100px] pointer-events-none" />
      <div className="hero-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/[0.04] blur-[120px] pointer-events-none" />

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
            <span className="text-xs font-medium text-primary">Available for opportunities</span>
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

          {/* Animated role */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight"
          >
            <span className="gradient-text">{displayText}</span>
            <span className="inline-block w-[3px] h-[0.9em] bg-primary ml-1 animate-pulse align-text-bottom" />
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-6 max-w-2xl text-muted-foreground leading-relaxed text-base sm:text-lg"
          >
            I build robust, scalable web applications with modern technologies.
            Specializing in React, Node.js, and cloud infrastructure — from concept to deployment.
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
              className="btn-glow rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:scale-105"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="rounded-full border border-border px-8 py-3.5 text-sm font-semibold text-foreground hover:border-primary hover:text-primary transition-all duration-300"
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
              { icon: Github, href: "https://github.com/", label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/lloyd-harold-argawanon-43bb57222/", label: "LinkedIn" },
              { icon: Mail, href: "mailto:lloydharoldargawanon@gmail.com", label: "Email" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
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
            {techBadges.map((tech, i) => (
              <motion.span
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.9 + i * 0.03 }}
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
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted-foreground">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowDown size={16} className="text-muted-foreground" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
