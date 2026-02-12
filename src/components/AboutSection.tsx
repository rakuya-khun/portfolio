import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, GraduationCap, Code, Cloud, Rocket } from "lucide-react";

const highlights = [
  {
    icon: Code,
    title: "Full-Stack Web Developer",
    desc: "Building end-to-end web applications with React, Node.js, PHP, and Python — from frontend to backend.",
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps Enthusiast",
    desc: "Experienced with Microsoft Azure, CI/CD pipelines, Azure DevOps, and scalable cloud infrastructure.",
  },
  {
    icon: Briefcase,
    title: "Remote Professional",
    desc: "Delivering quality work across freelance, virtual assistance, and WordPress development roles worldwide.",
  },
  {
    icon: Rocket,
    title: "Continuous Learner",
    desc: "Constantly exploring new technologies and best practices to stay ahead in the ever-evolving tech landscape.",
  },
];

const experiences = [
  {
    role: "Full-Stack Web Developer",
    type: "Remote | Flexible Time",
    desc: "Building scalable web applications and REST APIs using modern frameworks and cloud services.",
  },
  {
    role: "WordPress Elementor Developer",
    type: "Remote | Flexible Time",
    desc: "Designing and developing custom WordPress sites with Elementor for various clients.",
  },
  {
    role: "VA / Technical Support / Web Management",
    type: "Remote",
    desc: "Providing technical support, CRM automation, and website management for businesses.",
  },
  {
    role: "Freelance Developer",
    type: "Self-Employed",
    desc: "Delivering full-cycle development from requirements to deployment for diverse client projects.",
  },
];

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="section-heading">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="section-subheading">
            A passionate developer focused on building impactful digital solutions
          </p>
        </motion.div>

        {/* Bio + Highlights grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left – Professional story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="glass-card p-8 mb-8">
              <h3 className="text-xl font-bold text-foreground mb-4">Who I Am</h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed text-sm">
                <p>
                  I'm <span className="text-foreground font-medium">Lloyd Harold Argawanon</span>, a Full Stack & Backend Web Developer
                  from the Philippines. With a BS in Information Technology from Southern Luzon State University (2021–2025),
                  I bring a solid academic foundation paired with hands-on professional experience.
                </p>
                <p>
                  I specialize in building robust web applications using React, Next.js, Node.js, PHP (CodeIgniter 4),
                  and Python (FastAPI), backed by cloud infrastructure on Microsoft Azure. I'm passionate about clean code,
                  scalable architecture, and delivering solutions that make a real impact.
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
                  <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
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
          >
            <h3 className="text-xl font-bold text-foreground mb-6">Experience</h3>
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
                { value: "2", label: "Years Coding" },
                { value: "20+", label: "Projects" },
                { value: "10+", label: "Technologies" },
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
