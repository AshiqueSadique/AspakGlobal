"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";

export default function AboutHero() {
  const t = useTranslations("about.hero");
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    gsap.fromTo(
      el.querySelectorAll("[data-hero]"),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out", delay: 0.3 }
    );
  }, []);

  return (
    <section
      ref={ref}
      className="relative pt-36 pb-24 bg-[--navy-950] overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: "radial-gradient(ellipse at 30% 50%, #C9A227, transparent 60%)" }} />

      <div className="container relative z-10 text-center max-w-3xl mx-auto">
        {/* Logo mark */}
        <div data-hero className="flex justify-center mb-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/aspak-logo.png" alt="Aspak Global" width={72} height={72}
            className="w-16 h-auto object-contain"
            style={{ mixBlendMode: "screen" }} />
        </div>
        <span data-hero className="section-label text-[--gold-400] block mb-4">
          {t("label")}
        </span>
        <h1 data-hero className="font-display font-bold text-white whitespace-pre-line mb-6"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
          {t("heading")}
        </h1>
        <p data-hero className="text-white/60 leading-relaxed text-lg max-w-none mx-auto">
          {t("body")}
        </p>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" className="w-full h-12 block" preserveAspectRatio="none">
          <path d="M0,30 Q360,60 720,30 Q1080,0 1440,30 L1440,60 L0,60 Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}
