"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";

export default function ContactHero() {
  const t = useTranslations("contact.hero");
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = el.querySelectorAll("[data-hero]");
    gsap.set(els, { opacity: 0, y: 30 });
    gsap.to(els, { opacity: 1, y: 0, duration: 1, stagger: 0.14, ease: "expo.out", delay: 0.15 });
  }, []);

  return (
    <section ref={ref} className="relative min-h-[55vh] flex flex-col justify-center overflow-hidden"
      style={{ paddingTop: "clamp(7rem,16vh,10rem)", paddingBottom: "5rem", background: "linear-gradient(160deg, #dde3ed 0%, #d4dce9 50%, #dae0eb 100%)" }}>
      <div className="absolute top-0 right-0 w-96 h-96 pointer-events-none" style={{ background: "radial-gradient(circle at 70% 20%, rgba(201,162,39,0.12) 0%, transparent 60%)" }} />
      <div className="absolute bottom-0 left-0 w-80 h-80 pointer-events-none" style={{ background: "radial-gradient(circle at 20% 80%, rgba(9,22,40,0.07) 0%, transparent 60%)" }} />
      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, transparent, #C9A227 30%, #F0D060 50%, #C9A227 70%, transparent)" }} />

      <div className="container relative z-10 max-w-3xl text-center mx-auto">
        <span data-hero className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.25em] uppercase mb-5"
          style={{ background: "rgba(160,120,24,0.15)", color: "#7a5a0a", border: "1px solid rgba(160,120,24,0.45)" }}>
          {t("label")}
        </span>
        <h1 data-hero className="font-display font-bold whitespace-pre-line mb-5"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#050d1a", lineHeight: 1.15, textShadow: "0 1px 2px rgba(0,0,0,0.08)" }}>
          {t("heading")}
        </h1>
        <div data-hero className="relative w-20 h-0.5 mx-auto mb-6 overflow-hidden rounded-full">
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent, #C9A227, transparent)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent 20%, rgba(255,255,255,0.9) 50%, transparent 80%)", animation: "shimmer-line 2.5s ease-in-out infinite" }} />
        </div>
        <p data-hero className="leading-relaxed text-lg text-center" style={{ color: "#1e3a5a" }}>
          {t("body")}
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 48" className="w-full h-10 block" preserveAspectRatio="none">
          <path d="M0,24 Q360,48 720,24 Q1080,0 1440,24 L1440,48 L0,48 Z" fill="white"/>
        </svg>
      </div>
      <style>{`@keyframes shimmer-line{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}`}</style>
    </section>
  );
}
