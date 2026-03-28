import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Add your specific profile paths to the ends of these URLs
  const socialLinks = [
    { name: "Linkedin", url: "https://www.linkedin.com/in/camel-lab-a049543ba" },
    { name: "Instagram", url: "https://www.instagram.com/hellocamellab/" },
    { name: "X", url: "https://x.com/" }
  ];

  return (
    <section ref={ref} className="relative z-10 section-padding min-h-screen flex items-center">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-sm font-body uppercase tracking-[0.3em] text-primary mb-4 block">
            04 — Contact
          </span>
          <h2 className="text-display text-5xl md:text-7xl lg:text-8xl text-foreground mb-8">
            Let's create
            <br />
            something <span className="text-primary">extraordinary</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 flex flex-col md:flex-row gap-12 md:gap-24"
        >
          <div>
            <p className="text-muted-foreground text-sm uppercase tracking-[0.2em] mb-3">Email</p>
            <a href="mailto:hello@camellab.studio" className="text-foreground text-lg md:text-xl font-body hover:text-primary transition-colors duration-300">
              hellocamellab@gmail.com
            </a>
          </div>
          <div>
            <p className="text-muted-foreground text-sm uppercase tracking-[0.2em] mb-3">Social</p>
            <div className="flex gap-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground font-body hover:text-primary transition-colors duration-300"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-32 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-muted-foreground text-sm font-body">
            © 2024 Camellab. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm font-body">
            Crafted with precision
          </p>
        </motion.div>
      </div>
    </section>
  );
}