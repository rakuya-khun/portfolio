import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, GraduationCap, Code, Cloud, Bot } from "lucide-react";

const highlights = [
  {
    icon: Code,
    title: "Enterprise Frontend Depth",
    desc: "React, Next.js, TypeScript, Tailwind, TanStack Query — shared libs and scalable features in a monorepo.",
  },
  {
    icon: Bot,
    title: "AI SaaS Delivery",
    desc: "Shipped AI-powered SaaS: OpenAI content gen, JWT auth, WebSockets, Stripe/PayPal billing on Azure.",
  },
  {
    icon: Cloud,
    title: "Backend & Cloud Delivery",
    desc: "FastAPI + Node.js REST APIs, Postgres/Mongo/Cosmos DB, Azure/AWS deploys, multi-env CI/CD.",
  },
  {
    icon: Briefcase,
    title: "Automation & CMS",
    desc: "GoHighLevel funnels + automation, WordPress builds, and freelance full-cycle delivery since 2022.",
  },
];

const experiences = [
  {
    role: "Full Stack Web Developer — ETLDataCompany B.V.",
    type: "Remote | Sept 2025 – May 2026",
    desc: "Built Copilot Resume (Next.js + FastAPI on Azure): JWT auth, rate limiting, WebSocket live updates, Stripe/PayPal billing, Cosmos DB, Service Bus, Front Door + multi-env pipelines.",
  },
  {
    role: "Freelance Full Stack Developer",
    type: "Remote | 2022 – Present",
    desc: "10+ projects across SaaS, education, e-commerce — React/Next.js, Electron + FastAPI, CodeIgniter 4; GoHighLevel automation and WordPress delivery; Docker, Nginx, GitHub Actions releases.",
  },
  {
    role: "Software Developer Intern — LMIS, Mandaluyong LGU",
    type: "Onsite | Mar 2025 – Jun 2025",
    desc: "Rebuilt 5+ CodeIgniter 4 modules, digitized legislative records, ran staff training that lifted adoption.",
  },
  {
    role: "Senior Frontend Developer — TESDA, Enterprise Internal Systems",
    type: "Onsite | 2026 – Present · Private GitLab",
    desc: "Maintain enterprise apps in a Turborepo monorepo; build shared UI libs and features; review PRs and Git workflow; Amplify deploys while collaborating with backend microservices teams.",
  },
];

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 relative scroll-mt-24" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="section-heading font-display">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="section-subheading">
            Full Stack Developer with frontend depth — shipping SaaS and enterprise systems, remote-first
          </p>
        </motion.div>

        {/* Bio + Highlights grid — asymmetric 7/5 for left-side reading bias */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left – Professional story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="glass-card p-8 mb-8">
              <h3 className="text-xl font-bold text-foreground mb-4 font-display">Who I Am</h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed text-sm">
                <p>
                  I'm <span className="text-foreground font-medium">Lloyd Harold Argawanon</span>, a Full Stack Developer
                  from the Philippines (PH-based, working worldwide across EU/US time overlap). 3+ years across SaaS,
                  enterprise internal systems, and freelance — BS in Information Technology, Southern Luzon State University (2021–2025).
                </p>
                <p>
                  Frontend depth in React, Next.js, TypeScript, Tailwind, and TanStack Query; backend delivery in FastAPI and
                  Node.js with Postgres/Mongo/Cosmos DB. I ship on Azure and AWS with Docker and multi-env CI/CD — most
                  enterprise work lives in private GitLab, so walkthroughs are available on request.
                </p>
              </div>

              {/* Education badge */}
              <div className="mt-6 flex items-center gap-3 p-3 rounded-xl bg-secondary/50 border border-border/50">
                <GraduationCap className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">BS Information Technology</p>
                  <p className="text-xs text-muted-foreground">Southern Luzon State University • 2021 – 2025</p>
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div className="grid sm:grid-cols-2 gap-4">
              {highlights.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="glass-card p-5 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors duration-200">
                    <item.icon className="w-4 h-4 text-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground text-sm">{item.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right – Experience timeline */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-5"
          >
            <h3 className="text-xl font-bold text-foreground mb-6 font-display">Experience</h3>
            <div className="relative pl-6 border-l-2 border-border/50 space-y-8">
              {experiences.map((exp, i) => (
                <motion.div
                  key={exp.role}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.12 }}
                  className="relative group"
                >
                  <div className="timeline-dot absolute -left-[31px] top-1.5" />
                  <div className="glass-card p-5 ml-2 group-hover:glow-border">
                    <h4 className="font-semibold text-foreground text-sm">{exp.role}</h4>
                    <span className="text-xs font-mono-code text-primary mt-1 block">{exp.type}</span>
                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{exp.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="grid grid-cols-3 gap-4 mt-10"
            >
              {[
                { value: "3+", label: "Years Experience" },
                { value: "10+", label: "Shipped Systems" },
                { value: "Remote", label: "First, Worldwide" },
              ].map((stat) => (
                <div key={stat.label} className="glass-card p-4 text-center">
                  <p className="text-2xl font-bold gradient-text">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
