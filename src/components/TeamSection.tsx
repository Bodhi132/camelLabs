import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Github, Linkedin, Globe } from "lucide-react";

const team = [
  {
    name: "Bodhisattwa Basu",
    role: "Developer",
    image: "/Profile/Bodhi.jpeg",
    objectPosition: "top",
    bio: "Full-stack developer who brings ideas to life with clean code, performant systems and interactive 3D experiences.",
    links: [
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/bodhisattwa-basu/",
        icon: Linkedin,
      },
      {
        label: "GitHub",
        href: "https://github.com/Bodhi132",
        icon: Github,
      },
    ],
  },
  {
    name: "Prabir Chakravarty",
    role: "UI/UX Designer",
    image: "/Profile/Prabir.jpeg",
    objectPosition: "center",
    bio: "Design thinker crafting intuitive interfaces and visual systems that unite beauty with purpose across every screen.",
    links: [
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/prabir-chakravarty/",
        icon: Linkedin,
      },
      {
        label: "Portfolio",
        href: "https://jade-cucurucho-edb56f.netlify.app/",
        icon: Globe,
      },
      {
        label: "GitHub",
        href: "https://github.com/prabirchakravarty90-hue",
        icon: Github,
      },
    ],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 80 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      delay: i * 0.2,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const imageVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.06, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

const overlayVariants = {
  rest: { opacity: 0 },
  hover: { opacity: 1, transition: { duration: 0.35 } },
};

const linkIconVariants = {
  rest: { y: 8, opacity: 0 },
  hover: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.35, delay: i * 0.08 },
  }),
};

export default function TeamSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section
      ref={ref}
      className="relative z-10 section-padding min-h-screen flex flex-col justify-center"
    >
      {/* Section header */}
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-sm font-body uppercase tracking-[0.3em] text-primary mb-4 block">
            02 — Team
          </span>
          <h2 className="text-display text-4xl md:text-6xl text-foreground">
            Meet the{" "}
            <span className="text-primary">People</span>
          </h2>
          {/* Animated rule */}
          <motion.div
            className="mt-6 h-px bg-border origin-left"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
          {team.map((member, i) => (
            <TeamCard key={member.name} member={member} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamCard({
  member,
  index,
  isInView,
}: {
  member: (typeof team)[number];
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.div
        className="group relative bg-card border border-border rounded-2xl overflow-hidden"
        whileHover="hover"
        initial="rest"
        animate="rest"
      >
        {/* Gold accent top bar */}
        <motion.div
          className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-primary to-gold-light z-10 origin-left"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 + index * 0.2, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Image block */}
        <div className="relative overflow-hidden aspect-[4/3]">
          <motion.img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover"
            style={{ objectPosition: member.objectPosition }}
            variants={imageVariants}
          />

          {/* Hover overlay with links */}
          <motion.div
            className="absolute inset-0 bg-foreground/70 flex items-end justify-start p-8 gap-4"
            variants={overlayVariants}
          >
            {member.links.map((link, li) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-primary text-primary-foreground rounded-full px-4 py-2 text-sm font-body font-medium hover:bg-gold-light transition-colors"
                  custom={li}
                  variants={linkIconVariants}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={15} />
                  {link.label}
                </motion.a>
              );
            })}
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-xl md:text-2xl font-display font-bold text-foreground">
                {member.name}
              </h3>
              <span className="text-sm font-body uppercase tracking-[0.2em] text-primary mt-1 block">
                {member.role}
              </span>
            </div>
            {/* Decorative gold dot */}
            <motion.div
              className="w-3 h-3 rounded-full bg-primary mt-1 flex-shrink-0"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <p className="font-body text-sm md:text-base leading-relaxed text-muted-foreground">
            {member.bio}
          </p>

          {/* Desktop link row (always visible below card) */}
          <div className="flex gap-3 mt-6">
            {member.links.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} ${link.label}`}
                  className="w-9 h-9 border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors duration-200"
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
