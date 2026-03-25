import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
    };

    const animate = () => {
      followerX += (mouseX - followerX) * 0.08;
      followerY += (mouseY - followerY) * 0.08;
      follower.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px)`;
      requestAnimationFrame(animate);
    };

    // Hover effects
    const onHoverEnter = () => {
      follower.style.width = "60px";
      follower.style.height = "60px";
      follower.style.marginLeft = "-10px";
      follower.style.marginTop = "-10px";
    };
    const onHoverLeave = () => {
      follower.style.width = "40px";
      follower.style.height = "40px";
      follower.style.marginLeft = "0";
      follower.style.marginTop = "0";
    };

    document.addEventListener("mousemove", onMouseMove);
    animate();

    const interactiveEls = document.querySelectorAll("a, button, [data-magnetic]");
    interactiveEls.forEach((el) => {
      el.addEventListener("mouseenter", onHoverEnter);
      el.addEventListener("mouseleave", onHoverLeave);
    });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      interactiveEls.forEach((el) => {
        el.removeEventListener("mouseenter", onHoverEnter);
        el.removeEventListener("mouseleave", onHoverLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-primary z-[10000] pointer-events-none hidden md:block"
        style={{ transition: "none" }}
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-primary/40 z-[9999] pointer-events-none hidden md:block"
        style={{ transition: "width 0.3s, height 0.3s, margin 0.3s" }}
      />
    </>
  );
}
