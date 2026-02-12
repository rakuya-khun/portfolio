import { Github, Linkedin, Mail, Heart } from "lucide-react";
import logo3D from "@/assets/Logo3D.png";

const Footer = () => (
  <footer className="border-t border-border py-10">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <img src={logo3D} alt="Logo" className="w-8 h-8 rounded-lg object-contain dark:bg-white/90 dark:p-0.5" />
          <div>
            <span className="text-sm font-bold text-foreground">Lloyd Harold</span>
            <span className="block text-[10px] font-mono-code text-muted-foreground">Full Stack Developer</span>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-sm text-muted-foreground flex items-center gap-1">
          © {new Date().getFullYear()} Lloyd Harold Argawanon. Built with <Heart size={12} className="text-primary" />.
        </p>

        {/* Social links */}
        <div className="flex gap-3">
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
              className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
              aria-label={social.label}
            >
              <social.icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
