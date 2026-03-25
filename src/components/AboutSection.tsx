import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative z-10 section-padding min-h-screen flex items-center">
      <div className="grid md:grid-cols-2 gap-16 md:gap-24 max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-sm font-body uppercase tracking-[0.3em] text-primary mb-4 block">
            01 — About
          </span>
          <h2 className="text-display text-4xl md:text-6xl text-foreground">
            We are
            <br />
            <span className="text-primary">Camellab</span>
          </h2>
        </motion.div>

        <motion.div
          className="flex flex-col justify-center gap-8"
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-body text-lg md:text-xl leading-relaxed text-foreground font-medium">
            A creative studio at the intersection of design, technology, and storytelling. 
            We build digital experiences that captivate, inspire, and endure.
          </p>
          <p className="font-body text-lg md:text-xl leading-relaxed text-foreground font-medium">
            From immersive 3D worlds to elegant interfaces, every pixel is crafted 
            with purpose and precision.
          </p>
          <div className="grid grid-cols-3 gap-8 mt-8">
            {[
              { num: "50+", label: "Projects" },
              { num: "12", label: "Awards" },
              { num: "8", label: "Years" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
              >
                <div className="text-3xl md:text-4xl font-display font-bold text-primary">{stat.num}</div>
                <div className="text-sm text-muted-foreground mt-1 tracking-wider uppercase">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
