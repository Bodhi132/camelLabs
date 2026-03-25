import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { title: "Find My Rentals", category: "Web Platform", year: "2024", link: "https://findmyrentals.ca/home" },
  { title: "Finance Flow", category: "Web Application", year: "2024", link: "https://finance-flow-nu.vercel.app/" },
  { title: "Sitarait", category: "Corporate Website", year: "2024", link: "https://www.sitarait.com/" },
  { title: "Luxe Automotive", category: "3D / Web", year: "2024", link: "#" },
  { title: "Noir Fashion", category: "Brand / Digital", year: "2024", link: "#" },
  { title: "Aether Sound", category: "Motion / Interactive", year: "2023", link: "#" },
  { title: "Vertex Labs", category: "Web / Strategy", year: "2023", link: "#" },
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
              transition={{ duration: 0.6, delay: 0.15 * i, ease: [0.16, 1, 0.3, 1] }}
              className="flex-shrink-0 w-[80vw] md:w-[45vw] lg:w-[35vw] group cursor-pointer block"
            >
              <div className="aspect-[4/3] bg-secondary rounded-sm overflow-hidden mb-6 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/60" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-display text-5xl md:text-7xl text-foreground/10 group-hover:text-primary/20 transition-colors duration-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-heading text-xl md:text-2xl text-foreground group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{project.category}</p>
                </div>
                <span className="text-xs text-muted-foreground tracking-wider">{project.year}</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
