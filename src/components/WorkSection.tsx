import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Find My Rentals",
    category: "Web Platform",
    year: "2024",
    link: "https://findmyrentals.ca/home",
    image: "https://image.thum.io/get/width/800/crop/600/https://findmyrentals.ca/home",
  },
  {
    title: "Finance Flow",
    category: "Web Application",
    year: "2024",
    link: "https://finance-flow-nu.vercel.app/",
    image: "https://image.thum.io/get/width/800/crop/600/https://finance-flow-nu.vercel.app/",
  },
  {
    title: "Sitarait",
    category: "Corporate Website",
    year: "2024",
    link: "https://www.sitarait.com/",
    image: "https://image.thum.io/get/width/800/crop/600/https://www.sitarait.com/",
  },
  {
    title: "Luxe Automotive",
    category: "3D / Web",
    year: "2024",
    link: "#",
    image: "",
  },
  {
    title: "Noir Fashion",
    category: "Brand / Digital",
    year: "2024",
    link: "#",
    image: "",
  },
  {
    title: "Aether Sound",
    category: "Motion / Interactive",
    year: "2023",
    link: "#",
    image: "",
  },
  {
    title: "Vertex Labs",
    category: "Web / Strategy",
    year: "2023",
    link: "#",
    image: "",
  },
];

export default function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef(null);
  const isInView = useInView(headingRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const getScrollAmount = () => {
      return -(track.scrollWidth - window.innerWidth);
    };

    const tween = gsap.to(track, {
      x: getScrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${track.scrollWidth - window.innerWidth}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 h-screen overflow-hidden"
    >
      <div className="h-full flex flex-col justify-center">
        <div className="section-padding !py-0 mb-10">
          <motion.div
            ref={headingRef}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm font-body uppercase tracking-[0.3em] text-primary mb-4 block">
              03 — Work
            </span>
            <h2 className="text-display text-4xl md:text-6xl text-foreground">
              Selected projects
            </h2>
          </motion.div>
        </div>

        <div
          ref={trackRef}
          className="flex gap-6 px-6 md:px-12 lg:px-24 will-change-transform"
        >
          {projects.map((project, i) => (
            <motion.a
              href={project.link}
              target={project.link !== "#" ? "_blank" : "_self"}
              rel={project.link !== "#" ? "noopener noreferrer" : ""}
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.15 * i,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex-shrink-0 w-[80vw] md:w-[45vw] lg:w-[35vw] group cursor-pointer block"
              style={{ transform: "translateY(0)" }}
            >
              {/* Card image container */}
              <div
                className="aspect-[4/3] rounded-sm overflow-hidden mb-6 relative transition-all duration-500 ease-out"
                style={{
                  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                }}
              >
                {/* Project preview image or fallback */}
                {project.image ? (
                  <img
                    src={project.image}
                    alt={`${project.title} preview`}
                    className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="absolute inset-0 bg-secondary" />
                )}

                {/* Default dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-foreground/20 transition-opacity duration-500" />

                {/* Gold gradient overlay on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(to top, hsl(40 60% 45% / 0.35), hsl(40 60% 45% / 0.08) 50%, transparent)",
                  }}
                />

                {/* Project number watermark */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-display text-5xl md:text-7xl text-white/10 group-hover:text-white/20 transition-all duration-500 group-hover:scale-110">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* External link arrow - slides in on hover */}
                {project.link !== "#" && (
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400 ease-out backdrop-blur-sm">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="transition-transform duration-300 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]"
                    >
                      <path
                        d="M4 12L12 4M12 4H6M12 4V10"
                        stroke="hsl(40 60% 35%)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </div>

              {/* Card info */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-heading text-xl md:text-2xl text-foreground group-hover:text-primary transition-colors duration-300 relative inline-block">
                    {project.title}
                    {/* Animated gold underline */}
                    <span
                      className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 ease-out"
                      style={{
                        background:
                          "linear-gradient(90deg, hsl(40 60% 45%), hsl(40 50% 60%))",
                      }}
                    />
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {project.category}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground tracking-wider group-hover:text-primary/60 transition-colors duration-300">
                  {project.year}
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Custom styles for the card hover lift effect */}
      <style>{`
        .group:hover .aspect-\\[4\\/3\\] {
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12), 0 0 0 1px hsl(40 60% 45% / 0.1) !important;
        }
        .group {
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .group:hover {
          transform: translateY(-8px) !important;
        }
      `}</style>
    </section>
  );
}
