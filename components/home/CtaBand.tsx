"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CtaBand() {
  const t = useTranslations("home.cta");
  const locale = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const els = el.querySelectorAll("[data-c]");
    gsap.set(els, { opacity: 0, y: 30 });
    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      onEnter: () => gsap.to(els, { opacity: 1, y: 0, duration: 1.2, stagger: 0.14, ease: "expo.out" }),
      once: true,
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-36 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #050d1a 0%, #091628 40%, #0d1e38 70%, #050d1a 100%)" }}
    >
      {/* Large radial glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div style={{
          width: "900px", height: "500px",
          background: "radial-gradient(ellipse, rgba(201,162,39,0.08) 0%, transparent 65%)",
          borderRadius: "50%",
          animation: "cta-pulse 6s ease-in-out infinite alternate",
        }} />
      </div>

      {/* Top gold border */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(201,162,39,0.5) 30%, #C9A227 50%, rgba(201,162,39,0.5) 70%, transparent)" }} />

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-32 h-32 pointer-events-none">
        <div className="absolute top-0 left-0 w-12 h-px bg-[--gold-600] opacity-60" />
        <div className="absolute top-0 left-0 w-px h-12 bg-[--gold-600] opacity-60" />
      </div>
      <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none">
        <div className="absolute top-0 right-0 w-12 h-px bg-[--gold-600] opacity-60" />
        <div className="absolute top-0 right-0 w-px h-12 bg-[--gold-600] opacity-60" />
      </div>
      <div className="absolute bottom-0 left-0 w-32 h-32 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-12 h-px bg-[--gold-600] opacity-60" />
        <div className="absolute bottom-0 left-0 w-px h-12 bg-[--gold-600] opacity-60" />
      </div>
      <div className="absolute bottom-0 right-0 w-32 h-32 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-12 h-px bg-[--gold-600] opacity-60" />
        <div className="absolute bottom-0 right-0 w-px h-12 bg-[--gold-600] opacity-60" />
      </div>

      <div ref={contentRef} className="container relative z-10 text-center max-w-3xl mx-auto">
        <div data-c className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px flex-1 max-w-24"
            style={{ background: "linear-gradient(to right, transparent, rgba(201,162,39,0.5))" }} />
          <span className="text-[--gold-500] text-xs font-bold tracking-[0.3em] uppercase">Get in touch</span>
          <div className="h-px flex-1 max-w-24"
            style={{ background: "linear-gradient(to left, transparent, rgba(201,162,39,0.5))" }} />
        </div>

        <h2 data-c className="font-display font-bold text-white mb-5"
          style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)", lineHeight: 1.1 }}>
          {t("heading")}
        </h2>

        <p data-c className="text-white/45 text-lg leading-relaxed mb-12 max-w-xl mx-auto">
          {t("body")}
        </p>

        <div data-c className="flex flex-wrap justify-center gap-4">
          <Link href={`/${locale}/contact`} className="btn-primary px-12 py-4 text-base group gap-2">
            {t("btn")}
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
            </svg>
          </Link>
          <Link href={`/${locale}/about`} className="btn-outline px-12 py-4 text-base">
            {t("btnSecondary")}
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes cta-pulse {
          from { transform: scale(1) translateY(0); opacity: 0.8; }
          to { transform: scale(1.1) translateY(-20px); opacity: 1; }
        }
      `}</style>
    </section>
  );
}
