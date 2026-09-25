import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Code2, Server, Database, Cloud, Wrench, Settings, Bot,
} from "lucide-react";

interface Skill {
  name: string;
  level: number; // 0-100
}

interface SkillCategory {
  title: string;
  icon: typeof Code2;
  color: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Front-End",
    icon: Code2,
    color: "from-cyan-400 to-blue-500",
    skills: [
      { name: "React.js", level: 90 },
      { name: "Next.js", level: 88 },
      { name: "TypeScript", level: 90 },
      { name: "JavaScript (ES6+)", level: 90 },
      { name: "Tailwind CSS", level: 92 },
      { name: "TanStack Query / Zustand / Zod", level: 86 },
    ],
  },
  {
    title: "Back-End",
    icon: Server,
    color: "from-violet-400 to-purple-500",
    skills: [
      { name: "FastAPI (Python)", level: 90 },
      { name: "Node.js / Express.js", level: 86 },
      { name: "REST API Design", level: 90 },
      { name: "JWT / RBAC Auth", level: 88 },
      { name: "WebSockets / Realtime", level: 82 },
      { name: "PHP / CodeIgniter 4", level: 84 },
    ],
  },
  {
    title: "Database",
    icon: Database,
    color: "from-emerald-400 to-teal-500",
    skills: [
      { name: "PostgreSQL", level: 86 },
      { name: "MongoDB (NoSQL)", level: 90 },
      { name: "Azure Cosmos DB", level: 88 },
      { name: "MySQL", level: 86 },
    ],
  },
  {
    title: "Cloud & DevOps",
    icon: Cloud,
    color: "from-sky-400 to-indigo-500",
    skills: [
      { name: "Microsoft Azure", level: 85 },
      { name: "AWS (Amplify, S3, Cognito)", level: 80 },
      { name: "Docker / Dokploy / VPS", level: 82 },
      { name: "CI/CD (Azure Pipelines, GitHub Actions)", level: 85 },
      { name: "Git / GitLab", level: 90 },
    ],
  },
  {
    title: "AI & Integration",
    icon: Bot,
    color: "from-fuchsia-400 to-purple-500",
    skills: [
      { name: "OpenAI / Azure OpenAI", level: 84 },
      { name: "AI Content Generation + Safety", level: 82 },
      { name: "Stripe / PayPal Billing", level: 84 },
      { name: "API Integration", level: 88 },
    ],
  },
  {
    title: "Automation & CMS",
    icon: Settings,
    color: "from-orange-400 to-red-500",
    skills: [
      { name: "GoHighLevel", level: 85 },
      { name: "WordPress", level: 88 },
      { name: "ThriveCart / Funnels", level: 78 },
      { name: "Vercel / Render", level: 84 },
    ],
  },
  {
    title: "Tools & Practices",
    icon: Wrench,
    color: "from-pink-400 to-rose-500",
    skills: [
      { name: "Postman / Bruno", level: 88 },
      { name: "Vitest / Playwright", level: 78 },
      { name: "Agile / Scrum + Jira", level: 84 },
      { name: "Figma to Build", level: 80 },
    ],
  },
];

const SkillBar = ({ skill, delay, inView }: { skill: Skill; delay: number; inView: boolean }) => (
  <div className="space-y-1.5">
    <div className="flex items-center justify-between">
      <span className="text-xs font-medium text-foreground">{skill.name}</span>
      <span className="text-xs text-muted-foreground font-mono-code">{skill.level}%</span>
    </div>
    <div className="h-1.5 rounded-full bg-secondary/80 overflow-hidden">
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
        initial={{ width: 0 }}
        animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
        transition={{ duration: 1, delay, ease: "easeOut" }}
      />
    </div>
  </div>
);

const SkillsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section id="skills" className="py-24 scroll-mt-24" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="section-heading font-display">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="section-subheading">
            The stack behind my SaaS, enterprise systems, and freelance delivery
          </p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {skillCategories.map((cat, i) => (
            <button
              key={cat.title}
              onClick={() => setActiveCategory(i)}
              aria-pressed={activeCategory === i}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 min-h-11 text-sm font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none cursor-pointer ${
                activeCategory === i
                  ? "bg-primary text-primary-foreground btn-glow"
                  : "bg-secondary/50 border border-border/50 text-muted-foreground hover:text-foreground hover:border-foreground/20"
              }`}
            >
              <cat.icon size={14} />
              {cat.title}
            </button>
          ))}
        </motion.div>

        {/* Active category detail */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-2xl mx-auto"
        >
          <div className="glass-card p-8">
            <div className="flex items-center gap-3 mb-6">
              {(() => {
                const Icon = skillCategories[activeCategory].icon;
                return (
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                );
              })()}
              <h3 className="text-lg font-bold text-foreground font-display">
                {skillCategories[activeCategory].title}
              </h3>
            </div>
            <div className="space-y-4">
              {skillCategories[activeCategory].skills.map((skill, i) => (
                <SkillBar key={skill.name} skill={skill} delay={i * 0.1} inView={true} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Skill grid overview (all categories) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4"
        >
          {skillCategories.map((cat, i) => (
            <motion.button
              key={cat.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
              onClick={() => {
                setActiveCategory(i);
                const top = (ref.current as HTMLElement | null)?.offsetTop ?? 0;
                window.scrollTo({ top: Math.max(0, top - 96), behavior: "smooth" });
              }}
              aria-pressed={activeCategory === i}
              className={`glass-card p-4 text-center group cursor-pointer min-h-11 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
                activeCategory === i ? "glow-border border-primary/30" : ""
              }`}
            >
              <div className={`w-10 h-10 mx-auto rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-3 transition-colors duration-200`}>
                <cat.icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-xs font-semibold text-foreground">{cat.title}</p>
              <p className="text-[10px] text-muted-foreground mt-1">
                {cat.skills.length} skills
              </p>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
