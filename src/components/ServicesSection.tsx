import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const services = [
  {
    title: "Brand Identity",
    description: "Crafting visual identities that resonate and endure across every touchpoint.",
    num: "01",
  },
  {
    title: "Web Experiences",
    description: "Immersive websites that blend cutting-edge technology with elegant design.",
    num: "02",
  },
  {
    title: "3D & Motion",
    description: "Cinematic 3D visuals and motion design that captivate and engage.",
    num: "03",
  },
  {
    title: "Digital Strategy",
    description: "Data-driven strategies that transform brands and accelerate growth.",
    num: "04",
  },
];

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative z-10 section-padding min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto"
      >
        <span className="text-sm font-body uppercase tracking-[0.3em] text-primary mb-4 block">
          02 — Services
        </span>
        <h2 className="text-display text-4xl md:text-6xl text-foreground mb-16">
          What we do
        </h2>

        <div className="grid md:grid-cols-2 gap-1">
          {services.map((service, i) => (
            <motion.div
              key={service.num}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 * i, ease: [0.16, 1, 0.3, 1] }}
              className="group p-8 md:p-12 border border-border hover:bg-secondary/50 transition-all duration-500 cursor-pointer"
            >
              <span className="text-xs font-body text-primary tracking-[0.3em] mb-6 block">
                {service.num}
              </span>
              <h3 className="text-heading text-2xl md:text-3xl text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-muted-foreground font-body leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
