import { useState, useRef, useCallback, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Lock, Server, Shield, Database, Workflow, X, ZoomIn, ChevronDown, ChevronUp, Command, Cpu, Plug, ShieldCheck, ClipboardList, GitBranch, Cloud, Check, FileText, Terminal, Globe, Undo2 } from "lucide-react";

import alumniImg from "@/assets/Alumni Database System.png";
import slsuLogoImg from "@/assets/SLSU logo.png";
import spsoImg from "@/assets/Mandaluyong SPSO.png";
import cenfolioImg from "@/assets/SLSUCenFolio.png";
import productMixImg from "@/assets/Product Mix Optimization.png";
import copilotResumeImg from "@/assets/copilot-resume.png";

const categories = ["All", "SaaS", "Full Stack", "Enterprise / Private"];

interface Project {
  title: string;
  category: string[];
  stack: string[];
  desc: string;
  image?: string;
  logoOnly?: boolean;
  liveUrl?: string;
  privateRepo?: boolean;
  /** Public practice rebuild for proof — NOT the production codebase. Labeled as such in the UI. */
  practiceUrl?: string;
}

const projects: Project[] = [
  {
    title: "Copilot Resume",
    category: ["SaaS", "Full Stack"],
    stack: ["Next.js", "TypeScript", "FastAPI", "Azure", "OpenAI API"],
    desc: "AI-powered resume builder I contributed to as Full Stack Developer at ETLDataCompany B.V. — secure auth, AI-assisted content generation, and subscription billing. Note: the live site has changed significantly since my time there, and the company codebase is private — walkthrough available on request.",
    image: copilotResumeImg,
    liveUrl: "https://www.copilotresume.io/",
    privateRepo: true,
  },
  {
    title: "CENfolio",
    category: ["SaaS", "Full Stack"],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB", "Azure"],
    desc: "E-portfolio for SLSU College of Engineering — IE, ME, and ECE students track competencies, upload evidence, and showcase skills with real-time stats and program-wide insights.",
    image: cenfolioImg,
    privateRepo: true,
  },
  {
    title: "Product Mix Optimization System",
    category: ["Full Stack", "Enterprise / Private"],
    stack: ["Electron", "React", "TypeScript", "Python", "FastAPI"],
    desc: "Desktop production tool for daily bakery scheduling — order queuing, inventory carryover, and automated product-mix math delivered as a standalone installable app.",
    image: productMixImg,
    privateRepo: true,
  },
  {
    title: "Alumni Database System",
    category: ["Full Stack", "Enterprise / Private"],
    stack: ["Electron", "Next.js", "TypeScript", "Google Cloud"],
    desc: "Desktop/web hybrid for alumni management — centralized cloud database, output-based reporting, and role-based admin controls. The public repo is my practice rebuild for proof; the deployed system lives in a private repo.",
    image: alumniImg,
    privateRepo: true,
    practiceUrl: "https://github.com/rakuya-khun/alumni-db",
  },
  {
    title: "Mandaluyong SPSO",
    category: ["Enterprise / Private"],
    stack: ["PHP", "CodeIgniter 4", "MySQL", "Bootstrap"],
    desc: "Centralized employee and resource monitoring for Mandaluyong LGU — workforce data, allocation, and operational reporting (internship delivery, private repo).",
    image: spsoImg,
    privateRepo: true,
  },
  {
    title: "SLSU Procurement Monitoring System",
    category: ["Enterprise / Private"],
    stack: ["React", "Node.js", "Express", "MongoDB", "Azure"],
    desc: "Procurement workflow tracker for Southern Luzon State University — transparent requisition tracking and reporting (private repo).",
    image: slsuLogoImg,
    logoOnly: true,
    privateRepo: true,
  },
];

/* Fullscreen image lightbox */
const ImageLightbox = ({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md cursor-zoom-out"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={alt}
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
        className="absolute top-5 right-5 w-11 h-11 min-h-11 min-w-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none cursor-pointer"
        aria-label="Close preview"
      >
        <X size={20} />
      </button>
    </motion.div>
  );
};

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
      className="glass-card overflow-hidden group"
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
                className="w-24 h-24 object-contain drop-shadow-lg"
                loading="lazy"
              />
            </div>
          </>
        ) : project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover object-top"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 grid-bg opacity-30" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />

        {/* Private-repo badge (replaces dead source-code links) */}
        {project.privateRepo && (
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-secondary/80 backdrop-blur-sm border border-border rounded-full px-2.5 py-1">
            <Lock size={10} className="text-muted-foreground" />
            <span className="text-[10px] font-semibold text-muted-foreground">Private repo</span>
          </div>
        )}

        {/* Hover overlay — zoom icon */}
        {project.image && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-background/40 backdrop-blur-[2px]">
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
              className="mt-1.5 flex items-center gap-1 min-h-11 text-xs font-medium text-primary hover:text-primary/80 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none cursor-pointer"
              aria-label={expanded ? "Show less" : "Read more"}
              aria-expanded={expanded}
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
        <div className="mt-4 flex flex-wrap gap-2">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg bg-primary/10 border border-primary/20 px-3 py-1.5 min-h-11 text-xs font-medium text-primary hover:bg-primary/20 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none cursor-pointer"
            >
              <ExternalLink size={12} /> Live Demo
            </a>
          )}
          {project.practiceUrl && (
            <a
              href={project.practiceUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Practice rebuild for proof — not the production codebase"
              className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 min-h-11 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none cursor-pointer"
            >
              <Github size={12} /> Practice copy
            </a>
          )}
          {project.privateRepo && (
            <span className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 min-h-11 text-xs font-medium text-muted-foreground cursor-default">
              <Lock size={12} /> Walkthrough on request
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

/* AI-assisted delivery workflow — code-built diagram (theme-aware, no image asset).
   Agent Harness is the visual centerpiece; a return lane marks agentic iteration.
   Vertical stack on mobile, horizontal flow on lg. Static (motion-safe by construction). */
const AiWorkflowDiagram = () => {
  const harnessTools = ["OpenCode", "Claude Code", "Codex", "Copilot"];
  const llmTools = [
    { icon: FileText, label: "Files" },
    { icon: Terminal, label: "Shell" },
    { icon: Globe, label: "APIs" },
  ];
  const gateChecks = ["Tests", "Safety", "Review"];
  const nodes = [
    { icon: ClipboardList, title: "Task / Spec", sub: "ticket · spec · bug" },
    { icon: Command, title: "Agent Harness", sub: "CLI · Chat · Web · Custom", centerpiece: true },
    { icon: Cpu, title: "LLM + Tools", sub: "model · files · shell · APIs" },
    { icon: ShieldCheck, title: "Guardrails & Evals", gate: true },
    { icon: GitBranch, title: "CI/CD → Cloud", sub: "Test → Build → Deploy", destination: true },
  ];

  return (
    <div className="flex flex-col lg:flex-row items-stretch justify-center gap-0 w-full" role="list" aria-label="AI-assisted delivery workflow">
      {nodes.map(({ icon: Icon, title, sub, centerpiece, gate, destination }, i) => (
        <div
          key={title}
          className={`flex flex-col lg:flex-row items-center ${centerpiece ? "flex-[1.45]" : destination ? "flex-[1.3]" : "flex-1"}`}
          role="listitem"
        >
          <div
            className={`w-full rounded-xl border p-3 text-center ${
              centerpiece
                ? "border-primary/50 bg-primary/[0.08]"
                : gate
                  ? "border-emerald-500/35 bg-emerald-500/[0.05]"
                  : "border-border/40 bg-secondary/50"
            }`}
          >
            <div className="w-9 h-9 mx-auto rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-2">
              <Icon className="w-4 h-4 text-primary" />
            </div>
            <p className="text-xs font-semibold text-foreground">{title}</p>
            {sub && <p className="text-[10px] text-muted-foreground mt-0.5">{sub}</p>}
            {title === "Agent Harness" && (
              <div className="flex flex-wrap justify-center gap-1 mt-2">
                {harnessTools.map((h) => (
                  <span key={h} className="text-[9px] font-medium font-mono-code bg-primary/10 text-primary border border-primary/20 rounded px-1.5 py-0.5">
                    {h}
                  </span>
                ))}
              </div>
            )}
            {title === "LLM + Tools" && (
              <div className="flex justify-center gap-3 mt-2">
                {llmTools.map(({ icon: ToolIcon, label }) => (
                  <div key={label} className="flex flex-col items-center gap-0.5">
                    <ToolIcon size={13} className="text-primary" />
                    <span className="text-[9px] text-muted-foreground">{label}</span>
                  </div>
                ))}
              </div>
            )}
            {title === "Guardrails & Evals" && (
              <div className="flex flex-col items-start gap-1 mt-2 mx-auto w-fit">
                {gateChecks.map((c) => (
                  <div key={c} className="flex items-center gap-1.5 text-[10px] text-foreground/80">
                    <Check size={11} className="text-emerald-400" />
                    {c}
                  </div>
                ))}
              </div>
            )}
            {title === "CI/CD → Cloud" && (
              <div className="flex justify-center gap-1 mt-2">
                {["AWS", "Azure"].map((c) => (
                  <span key={c} className="text-[9px] font-medium font-mono-code bg-primary/10 text-primary border border-primary/20 rounded px-1.5 py-0.5">
                    {c}
                  </span>
                ))}
              </div>
            )}
          </div>
          {i < nodes.length - 1 && (
            <div aria-hidden="true" className="flex flex-col items-center shrink-0">
              <div className="w-px h-5 my-1 lg:w-6 lg:h-px lg:my-0 lg:mx-1 bg-gradient-to-b lg:bg-gradient-to-r from-primary/60 to-primary/20" />
              {title === "Agent Harness" && (
                <div className="hidden lg:flex items-center gap-1 mt-1.5 text-[9px] font-medium text-muted-foreground whitespace-nowrap">
                  <Undo2 size={10} className="text-primary" /> iterate
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const ProjectsSection = () => {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const filtered = active === "All" ? projects : projects.filter((p) => p.category.includes(active));

  return (
    <section id="projects" className="py-24 scroll-mt-24" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="section-heading font-display">
            Featured <span className="gradient-text">Work</span>
          </h2>
          <p className="section-subheading">
            A selection of SaaS and enterprise systems covering my experience and skills. Most enterprise work is private GitLab; walkthroughs available on request. Public repos marked "Practice copy" are my own rebuilds for proof — not production code.
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
              aria-pressed={active === cat}
              className={`rounded-full px-5 py-2 min-h-11 text-sm font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none cursor-pointer ${
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

        {/* Systems Architecture & AI Workflows panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <div className="rounded-2xl border border-border/60 bg-card/50 backdrop-blur-sm overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Text side */}
              <div className="p-8 lg:p-10 flex flex-col justify-center text-left">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 w-fit mb-5">
                  <Server className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs font-medium text-primary">Architecture + AI Workflows</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3 font-display">
                  Systems Architecture & AI Workflows
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Day to day I work close to system architecture — auth, API design, data modeling, and cloud
                  infrastructure. I deliver it the modern way: agent harnesses (OpenCode, Claude Code, Codex,
                  Copilot — CLI, chat, or web, including custom harnesses on cloud LLMs) driving implementation
                  through guardrails, evals, and multi-env CI/CD.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: Workflow, label: "API Architecture" },
                    { icon: Database, label: "Database Design" },
                    { icon: Server, label: "Cloud Infrastructure" },
                    { icon: Plug, label: "LLM Integration" },
                    { icon: Command, label: "Agent Harnesses" },
                    { icon: ShieldCheck, label: "Guardrails & Evals" },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-2.5 rounded-lg bg-secondary/50 border border-border/40 px-3 py-2.5">
                      <Icon className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-sm text-foreground/80">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Diagram side */}
              <div className="relative bg-secondary/30 border-t lg:border-t-0 lg:border-l border-border/40">
                <div className="p-4 lg:p-6 h-full flex flex-col items-center justify-center gap-3">
                  <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-3 py-1">
                    <Cloud className="w-3.5 h-3.5 text-primary" />
                    <span className="text-xs font-medium text-primary">How I ship</span>
                  </div>
                  <AiWorkflowDiagram />
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
