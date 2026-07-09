"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    // lerp 0.06 = silky slow premium feel; duration 1.4s
    const lenis = new Lenis({ lerp: 0.06, smoothWheel: true, wheelMultiplier: 0.9 });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    // Use GSAP ticker only — avoids double RAF
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const rafId = 0; // unused but kept for cleanup type compat

    return () => {
      void rafId;
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
