import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface LoadingScreenProps {
  isLoaded: boolean;
}

export default function LoadingScreen({ isLoaded }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [showScreen, setShowScreen] = useState(true);

  // Simulate progress that accelerates when actually loaded
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (isLoaded) {
          // Jump to 100 quickly once actually loaded
          return Math.min(prev + 8, 100);
        }
        // Slow crawl while loading (never exceeds 90)
        if (prev >= 90) return 90;
        return prev + Math.random() * 2;
      });
    }, 60);

    return () => clearInterval(interval);
  }, [isLoaded]);

  // Once progress hits 100, wait a beat then dismiss
  useEffect(() => {
    if (progress >= 100) {
      const timeout = setTimeout(() => setShowScreen(false), 400);
      return () => clearTimeout(timeout);
    }
  }, [progress]);

  // Lock scroll while loading
  useEffect(() => {
    if (showScreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showScreen]);

  const brandText = "CAMEL LAB";

  return (
    <AnimatePresence>
      {showScreen && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-background"
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          style={{ cursor: "default" }}
        >
          {/* Noise overlay on loading screen */}
          <div className="noise-overlay" />

          {/* Floating gold particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  background: "hsl(40 60% 45% / 0.3)",
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.2, 0.6, 0.2],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Brand text with staggered letter animation */}
          <div className="relative mb-16">
            <div className="flex items-baseline gap-[2px]">
              {brandText.split("").map((letter, i) => (
                <motion.span
                  key={i}
                  className="text-display text-5xl md:text-7xl lg:text-8xl"
                  style={{
                    color:
                      i >= 6
                        ? "hsl(40 60% 45%)"
                        : "hsl(var(--foreground))",
                  }}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.1 + i * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </div>

            {/* Subtitle */}
            <motion.p
              className="text-center font-body text-sm uppercase tracking-[0.4em] text-muted-foreground mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Creative Digital Studio
            </motion.p>
          </div>

          {/* Progress bar container */}
          <motion.div
            className="relative w-64 md:w-80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {/* Progress bar track */}
            <div className="h-[2px] w-full bg-border rounded-full overflow-hidden">
              {/* Progress bar fill */}
              <motion.div
                className="h-full rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, hsl(40 60% 45%), hsl(40 50% 60%))",
                }}
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
              />
            </div>

            {/* Shimmer effect on the bar */}
            <motion.div
              className="absolute top-0 left-0 h-[2px] w-16 rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent, hsl(40 50% 60% / 0.5), transparent)",
              }}
              animate={{ x: ["-64px", "320px"] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Percentage */}
            <div className="flex justify-between items-center mt-4">
              <span className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground">
                Loading experience
              </span>
              <span className="font-body text-xs tracking-wider text-primary tabular-nums">
                {Math.round(progress)}%
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
