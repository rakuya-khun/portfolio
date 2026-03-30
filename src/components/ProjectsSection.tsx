import { useState, useRef, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Star, ArrowUpRight, Server, Shield, Database, Workflow, X, ZoomIn, ChevronDown, ChevronUp } from "lucide-react";

import authFlowImg from "@/assets/auth-flow.png";
import alumniImg from "@/assets/Alumni Database System.png";
import slsuLogoImg from "@/assets/SLSU logo.png";
import spsoImg from "@/assets/Mandaluyong SPSO.png";
import cenfolioImg from "@/assets/SLSUCenFolio.png";
import productMixImg from "@/assets/Product Mix Optimization.png";
import copilotResumeImg from "@/assets/CopilotResume.png";

const categories = ["All", "Full Stack", "Desktop", "Web App"];

interface Project {
  title: string;
  category: string[];
  stack: string[];
  desc: string;
  image?: string;
  logoOnly?: boolean;
  featured?: boolean;
  liveUrl?: string;
  githubUrl?: string;
}

const projects: Project[] = [
  {
    title: "Alumni Database System",
    category: ["Full Stack", "Desktop", "Web App"],
    stack: ["Electron", "Next.js", "TypeScript", "Google Cloud"],
    desc: "A desktop and web hybrid application built with Electron and Next.js. Features an output-based system for alumni management with a centralized cloud database for seamless data access and reporting.",
    image: alumniImg,
    featured: true,
  },
  {
    title: "SLSU Procurement Monitoring System",
    category: ["Web App"],
    stack: ["React", "Node.js", "Express", "MongoDB", "Azure"],
    desc: "A web-based procurement monitoring system designed to streamline and automate the procurement workflow for Southern Luzon State University, improving transparency and tracking efficiency.",
    image: slsuLogoImg,
    logoOnly: true,
    featured: true,
  },
  {
    title: "Mandaluyong SPSO",
    category: ["Web App"],
    stack: ["PHP", "CodeIgniter 4", "MySQL", "Bootstrap"],
    desc: "Mandaluyong's centralized system for employee and resources monitoring. A comprehensive SPSO platform for managing workforce data, resource allocation, and operational reporting.",
    image: spsoImg,
    featured: true,
  },
  {
    title: "CENfolio",
    category: ["Full Stack", "Web App"],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB", "Azure"],
    desc: "An e-portfolio system built for the SLSU College of Engineering, enabling IE, ME, and ECE students to track competencies, upload evidence, and showcase their engineering skills with real-time statistics and program-wide insights.",
    image: cenfolioImg,
    featured: true,
    liveUrl: "https://slsucenfolio.com",
  },
  {
    title: "Product Mix Optimization System",
    category: ["Full Stack", "Desktop"],
    stack: ["Electron", "React", "TypeScript", "Python", "FastAPI"],
    desc: "A desktop application for daily production optimization that manages order queuing, inventory carryover tracking, and automated product mix calculations to maximize efficiency in bakery production workflows.",
    image: productMixImg,
    featured: true,
  },
  {
    title: "Copilot Resume",
    category: ["Full Stack", "Web App"],
    stack: ["Next.js", "TypeScript", "FastAPI", "Azure", "OpenAI API"],
    desc: "An AI-powered resume builder that helps users create ATS-friendly resumes and cover letters in minutes. Features smart content generation, customizable templates, and AI-driven optimization to land dream jobs with professional results.",
    image: copilotResumeImg,
    featured: true,
  },
];

/* Fullscreen image lightbox */
const ImageLightbox = ({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md cursor-zoom-out"
    onClick={onClose}
  >
    <motion.img
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ duration: 0.25 }}
      src={src}
      alt={alt}
      className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl cursor-default"
      onClick={(e) => e.stopPropagation()}
    />
    <button
      onClick={onClose}
      className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
      aria-label="Close preview"
    >
      <X size={20} />
    </button>
  </motion.div>
);

const ProjectCard = ({ project, index, inView, onImageClick }: { project: Project; index: number; inView: boolean; onImageClick: (src: string, alt: string) => void }) => {
  const [expanded, setExpanded] = useState(false);
  const descRef = useRef<HTMLParagraphElement>(null);
  const [isClamped, setIsClamped] = useState(false);

  const checkClamp = useCallback((node: HTMLParagraphElement | null) => {
    if (node) {
      descRef.current = node;
      // scrollHeight > clientHeight means text is truncated
      setIsClamped(node.scrollHeight > node.clientHeight + 1);
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`glass-card overflow-hidden group hover:glow-border transition-all duration-300 ${
        project.featured ? "md:col-span-2 lg:col-span-1" : ""
      }`}
    >
      {/* Card header / preview area */}
      <div
        className="relative h-52 bg-gradient-to-br from-secondary/80 to-secondary/30 overflow-hidden cursor-pointer"
        onClick={() => project.image && onImageClick(project.image, project.title)}
      >
        {/* Project image or decorative pattern */}
        {project.image && project.logoOnly ? (
          <>
            <div className="absolute inset-0 grid-bg opacity-20" />
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <img
                src={project.image}
                alt={project.title}
                className="w-24 h-24 object-contain drop-shadow-lg transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
            </div>
          </>
        ) : project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 grid-bg opacity-30" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full px-2.5 py-1">
            <Star size={10} className="text-primary fill-primary" />
            <span className="text-[10px] font-semibold text-primary">Featured</span>
          </div>
        )}

        {/* Hover overlay — zoom icon */}
        {project.image && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/40 backdrop-blur-[2px]">
            <div className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center text-foreground">
              <ZoomIn size={20} />
            </div>
          </div>
        )}

        {/* Project title in preview */}
        <div className="absolute bottom-4 left-5 right-5">
          <h3 className="text-lg font-bold text-foreground">{project.title}</h3>
        </div>
      </div>

      {/* Card body */}
      <div className="p-5">
        {/* Tech stack tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.stack.map((tech) => (
            <span key={tech} className="text-[10px] font-medium font-mono-code bg-primary/10 text-primary border border-primary/20 rounded-md px-2 py-0.5">
              {tech}
            </span>
          ))}
        </div>

        {/* Expandable description */}
        <div className="relative">
          <p
            ref={checkClamp}
            className={`text-sm text-muted-foreground leading-relaxed transition-all duration-300 ${
              expanded ? "" : "line-clamp-3"
            }`}
          >
            {project.desc}
          </p>
          {isClamped && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-1.5 flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
              aria-label={expanded ? "Show less" : "Read more"}
            >
              {expanded ? (
                <>Show less <ChevronUp size={12} /></>
              ) : (
                <>Read more <ChevronDown size={12} /></>
              )}
            </button>
          )}
        </div>

        {/* Action buttons */}
        <div className="mt-4 flex gap-2">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              className="flex items-center gap-1.5 rounded-lg bg-primary/10 border border-primary/20 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/20 transition-colors"
            >
              <ExternalLink size={12} /> Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
            >
              <Github size={12} /> Source Code
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const filtered = active === "All" ? projects : projects.filter((p) => p.category.includes(active));

  return (
    <section id="projects" className="py-24" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="section-heading">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subheading">
            A selection of projects that showcase my skills and experience
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
                active === cat
                  ? "bg-primary text-primary-foreground btn-glow"
                  : "border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Project cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} inView={inView} onImageClick={(src, alt) => setLightbox({ src, alt })} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground mt-8">No projects in this category yet.</p>
        )}

        {/* Backend & Architecture Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <div className="rounded-2xl border border-border/60 bg-card/50 backdrop-blur-sm overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Text side */}
              <div className="p-8 lg:p-10 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 w-fit mb-5">
                  <Server className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs font-medium text-primary">Beyond the Frontend</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3 font-display">
                  Backend & System Architecture
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  While the projects above show the full picture, the core of my work lives in what users don't see — secure authentication flows, API design, database modeling, and cloud infrastructure. I design systems that are scalable, maintainable, and production-ready.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: Shield, label: "OAuth & Auth Flows" },
                    { icon: Workflow, label: "API Architecture" },
                    { icon: Database, label: "Database Design" },
                    { icon: Server, label: "Cloud Infrastructure" },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-2.5 rounded-lg bg-secondary/50 border border-border/40 px-3 py-2.5">
                      <Icon className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-sm text-foreground/80">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Image side */}
              <div className="relative bg-secondary/30 border-t lg:border-t-0 lg:border-l border-border/40">
                <div className="p-4 lg:p-6 h-full flex items-center justify-center">
                  <img
                    src={authFlowImg}
                    alt="Authentication flow architecture diagram"
                    className="rounded-lg w-full h-auto object-contain max-h-[400px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>



      {/* Image lightbox */}
      <AnimatePresence>
        {lightbox && (
          <ImageLightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />
        )}
      </AnimatePresence>
      </div>
    </section>
  );
};

export default ProjectsSection;
