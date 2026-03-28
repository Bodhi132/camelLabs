import { useState, useEffect, useCallback } from "react";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import WorkSection from "@/components/WorkSection";
import TeamSection from "@/components/TeamSection";
import ContactSection from "@/components/ContactSection";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import Particles from "@/components/Particles";
import CamelScene from "@/components/CamelScene";
import LoadingScreen from "@/components/LoadingScreen";

const Index = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoaded = useCallback(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = window.scrollY / totalHeight;
      setScrollProgress(Math.min(progress, 1));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative bg-background min-h-screen" style={{ cursor: "none" }}>
      {/* Loading Screen */}
      <LoadingScreen isLoaded={isLoaded} />

      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Custom cursor */}
      <CustomCursor />

      {/* Scroll progress */}
      <ScrollProgress progress={scrollProgress} />

      {/* Particles */}
      <Particles />

      {/* 3D Scene */}
      <CamelScene scrollProgress={scrollProgress} onLoaded={handleLoaded} />

      {/* Content */}
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <WorkSection />
      <TeamSection />
      <ContactSection />
    </div>
  );
};

export default Index;
