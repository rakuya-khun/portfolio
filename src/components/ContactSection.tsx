import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, Linkedin, MapPin, Github, MessageCircle, Clock, Zap } from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "lloydharoldargawanon@gmail.com",
    href: "mailto:lloydharoldargawanon@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+63 930 650 3749",
    href: "tel:+639306503749",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "Lloyd Harold Argawanon",
    href: "https://www.linkedin.com/in/lloyd-harold-argawanon-43bb57222/",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Philippines",
    href: "#",
  },
];

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-24" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="section-heading">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="section-subheading">
            Open to full-time roles, remote work, and freelance projects. Let's build something great.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Availability highlight */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="glass-card p-8 mb-8 text-center glow-border"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 mb-5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm font-semibold text-emerald-400">Available Now</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
              I'm reachable <span className="gradient-text">anytime</span>
            </h3>
            <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
              Whether you have a project idea, a job opportunity, or just want to say hello —
              feel free to reach out through any of the channels below. I respond quickly.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-6">
              {[
                { icon: Clock, text: "Fast Response" },
                { icon: Zap, text: "Ready to Start" },
                { icon: MessageCircle, text: "Always Open" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <item.icon size={14} className="text-primary" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Contact cards grid */}
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {contactInfo.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.25 + i * 0.1 }}
                className="glass-card p-5 flex items-center gap-4 group hover:glow-border"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                    {item.value}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="glass-card p-6 text-center"
          >
            <h3 className="text-sm font-semibold text-foreground mb-4">Follow Me</h3>
            <div className="flex justify-center gap-3">
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
                  className="w-11 h-11 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
