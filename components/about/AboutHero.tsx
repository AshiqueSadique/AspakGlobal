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
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(
      el.querySelectorAll("[data-hero]"),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.14, ease: "expo.out", delay: 0.2 }
    );
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden min-h-screen flex flex-col justify-center"
      style={{
        paddingTop: "clamp(7rem, 16vh, 10rem)",
        paddingBottom: "5rem",
        background: "linear-gradient(160deg, #f0f4f8 0%, #e8edf5 50%, #eef1f7 100%)",
      }}
    >
      {/* Decorative gold orb top-right */}
      <div className="absolute top-0 right-0 w-96 h-96 pointer-events-none" style={{
        background: "radial-gradient(circle at 70% 20%, rgba(201,162,39,0.12) 0%, transparent 60%)",
      }} />
      {/* Decorative navy orb bottom-left */}
      <div className="absolute bottom-0 left-0 w-80 h-80 pointer-events-none" style={{
        background: "radial-gradient(circle at 20% 80%, rgba(9,22,40,0.07) 0%, transparent 60%)",
      }} />

      {/* Thin gold top border */}
      <div className="absolute top-0 left-0 right-0 h-1" style={{
        background: "linear-gradient(90deg, transparent, #C9A227 30%, #F0D060 50%, #C9A227 70%, transparent)",
      }} />

      <div className="container relative z-10 text-center max-w-3xl mx-auto">
        {/* Logo */}
        <div data-hero className="flex justify-center mb-6">
          <div style={{
            width: 80, height: 80, borderRadius: 20,
            background: "linear-gradient(145deg, #0d1e38, #1a3560)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 8px 32px rgba(9,22,40,0.18), 0 2px 8px rgba(201,162,39,0.15)",
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/aspak-logo.png" alt="Aspak Global" width={56} height={56}
              className="w-14 h-auto object-contain"
              style={{ mixBlendMode: "screen" }} />
          </div>
        </div>

        {/* Label */}
        <span data-hero className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.25em] uppercase mb-5" style={{
          background: "rgba(201,162,39,0.12)",
          color: "#a07818",
          border: "1px solid rgba(201,162,39,0.3)",
        }}>
          {t("label")}
        </span>

        {/* Heading */}
        <h1 data-hero className="font-display font-bold whitespace-pre-line mb-5" style={{
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          color: "#0d1e38",
          lineHeight: 1.1,
        }}>
          {t("heading")}
        </h1>

        {/* Shimmer divider */}
        <div data-hero className="relative w-20 h-0.5 mx-auto mb-6 overflow-hidden rounded-full">
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent, #C9A227, transparent)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent 20%, rgba(255,255,255,0.9) 50%, transparent 80%)", animation: "shimmer-line 2.5s ease-in-out infinite" }} />
        </div>

        {/* Body */}
        <p data-hero className="leading-relaxed text-lg max-w-none mx-auto" style={{ color: "#4a5f7a" }}>
          {t("body")}
        </p>
      </div>

      {/* Wave into next section */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 48" className="w-full h-10 block" preserveAspectRatio="none">
          <path d="M0,24 Q360,48 720,24 Q1080,0 1440,24 L1440,48 L0,48 Z" fill="white"/>
        </svg>
      </div>

      <style>{`
        @keyframes shimmer-line {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
}
