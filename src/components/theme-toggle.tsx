"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const sunRef = useRef<SVGSVGElement>(null);
  const moonRef = useRef<SVGSVGElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  React.useEffect(() => setMounted(true), []);

  // Initial icon state
  React.useEffect(() => {
    if (!mounted) return;
    const isDark = resolvedTheme === "dark";
    gsap.set(sunRef.current, {
      rotate: isDark ? -90 : 0,
      scale: isDark ? 0 : 1,
      opacity: isDark ? 0 : 1,
    });
    gsap.set(moonRef.current, {
      rotate: isDark ? 0 : 90,
      scale: isDark ? 1 : 0,
      opacity: isDark ? 1 : 0,
    });
  }, [mounted, resolvedTheme]);

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isAnimating.current) return;

    const next = resolvedTheme === "dark" ? "light" : "dark";
    const goingDark = next === "dark";
    const ripple = rippleRef.current;

    if (!ripple) {
      setTheme(next);
      return;
    }

    isAnimating.current = true;

    // Click coordinates (relative to viewport)
    const x = e.clientX;
    const y = e.clientY;

    // Radius needed to cover the whole viewport from the click point
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    // The ripple color = the NEW background color
    // Read from CSS vars, but resolve to actual computed color
    const probe = document.createElement("div");
    probe.className = goingDark ? "dark" : "";
    probe.style.cssText =
      "position:fixed;opacity:0;pointer-events:none;background:var(--background);";
    document.body.appendChild(probe);
    const newBg = getComputedStyle(probe).backgroundColor;
    document.body.removeChild(probe);

    // Position & size the ripple
    gsap.set(ripple, {
      display: "block",
      width: radius * 2,
      height: radius * 2,
      left: x - radius,
      top: y - radius,
      backgroundColor: newBg,
      scale: 0,
      opacity: 1,
    });

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(ripple, { display: "none" });
        isAnimating.current = false;
      },
    });

    // 1. Button press bounce + icon morph
    tl.to(buttonRef.current, {
      scale: 0.85,
      duration: 0.12,
      ease: "power2.out",
    })
      .to(buttonRef.current, {
        scale: 1,
        duration: 0.4,
        ease: "elastic.out(1, 0.4)",
      })
      .to(
        goingDark ? sunRef.current : moonRef.current,
        {
          rotate: goingDark ? -90 : 90,
          scale: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        },
        "<",
      )
      .to(
        goingDark ? moonRef.current : sunRef.current,
        {
          rotate: 0,
          scale: 1,
          opacity: 1,
          duration: 0.45,
          ease: "back.out(2)",
        },
        "<0.1",
      )

      // 2. Expand the ripple — swap theme at the midpoint
      .to(
        ripple,
        {
          scale: 1,
          duration: 0.7,
          ease: "power2.inOut",
          onStart: () => setTheme(next),
        },
        "<0.05",
      )

      // 3. Fade the ripple out to reveal real background
      .to(ripple, {
        opacity: 0,
        duration: 0.25,
        ease: "power1.out",
      });
  };

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" aria-label="Toggle theme">
        <Sun className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <>
      <div
        ref={rippleRef}
        aria-hidden
        className="pointer-events-none fixed z-[9999] hidden rounded-full"
        style={{ willChange: "transform, opacity" }}
      />
      <Button
        ref={buttonRef}
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="relative overflow-hidden"
      >
        <Sun ref={sunRef} className="absolute h-5 w-5" />
        <Moon ref={moonRef} className="absolute h-5 w-5" />
      </Button>
    </>
  );
}
