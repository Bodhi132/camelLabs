import { motion } from "framer-motion";

export default function HeroSection() {
  const scrollToWork = () => {
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <section className="relative min-h-screen flex items-center section-padding z-10">
      <div className="max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-sm font-body uppercase tracking-[0.3em] text-primary mb-6 block">
            Creative Digital Experience Studio
          </span>
        </motion.div>

        <motion.h1
          className="text-display text-6xl md:text-8xl lg:text-9xl text-foreground mb-8"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          CAMEL
          <br />
          <span className="text-primary">LAB</span>
        </motion.h1>

        <motion.p
          className="font-body text-lg leading-relaxed text-foreground max-w-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          We craft immersive digital experiences that blur the line between art and technology.
        </motion.p>

        <motion.div
          className="mt-12 flex items-center gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <button
            onClick={scrollToWork}
            className="px-8 py-4 border border-foreground text-foreground font-body text-sm uppercase tracking-[0.2em] hover:bg-primary hover:text-primary-foreground transition-all duration-500"
          >
            Explore Work
          </button>
          <span className="text-foreground font-body text-sm tracking-wider">
            Scroll to discover
          </span>
        </motion.div>
      </div>
    </section>
  );
}
