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
  const primaryBtnRef = useRef<HTMLAnchorElement>(null);
  const outlineBtnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    /* heading chars */
    const heading = el.querySelector<HTMLElement>("[data-heading]");
    const chars = heading?.querySelectorAll<HTMLElement>("[data-char]");
    if (chars?.length) {
      gsap.set(chars, { opacity: 0, y: 32, rotateX: -45, transformOrigin: "0% 50%" });
      ScrollTrigger.create({
        trigger: heading,
        start: "top 85%",
        onEnter: () =>
          gsap.to(chars, { opacity: 1, y: 0, rotateX: 0, duration: 0.65, stagger: 0.018, ease: "expo.out" }),
        once: true,
      });
    }

    /* remaining elements */
    const rest = el.querySelectorAll<HTMLElement>("[data-c]");
    gsap.set(rest, { opacity: 0, y: 30 });
    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      onEnter: () =>
        gsap.to(rest, { opacity: 1, y: 0, duration: 1.2, stagger: 0.14, ease: "expo.out", delay: 0.1 }),
      once: true,
    });

    /* magnetic primary button */
    const btn = primaryBtnRef.current;
    if (btn) {
      const onMove = (e: MouseEvent) => {
        const r = btn.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) * 0.25;
        const dy = (e.clientY - (r.top + r.height / 2)) * 0.25;
        gsap.to(btn, { x: dx, y: dy, duration: 0.5, ease: "power2.out" });
      };
      const onLeave = () => gsap.to(btn, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1,0.4)" });
      btn.addEventListener("mousemove", onMove);
      btn.addEventListener("mouseleave", onLeave);
      return () => { btn.removeEventListener("mousemove", onMove); btn.removeEventListener("mouseleave", onLeave); };
    }
  }, []);

  const heading = t("heading");

  return (
    <section
      ref={sectionRef}
      className="relative py-36 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #050d1a 0%, #091628 40%, #0d1e38 70%, #050d1a 100%)" }}
    >
      {/* Large radial glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div style={{ width: "900px", height: "500px", background: "radial-gradient(ellipse, rgba(201,162,39,0.08) 0%, transparent 65%)", borderRadius: "50%", animation: "cta-pulse 6s ease-in-out infinite alternate" }} />
      </div>

      {/* Top gold border */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(201,162,39,0.5) 30%, #C9A227 50%, rgba(201,162,39,0.5) 70%, transparent)" }} />

      {/* Corner accents */}
      {[["top-0 left-0", "top-0 left-0", "top-0 left-0"], ["top-0 right-0", "top-0 right-0", "top-0 right-0"], ["bottom-0 left-0", "bottom-0 left-0", "bottom-0 left-0"], ["bottom-0 right-0", "bottom-0 right-0", "bottom-0 right-0"]].map((_, i) => {
        const pos = [
          { wrap: "top-0 left-0",    h: "top-0 left-0",    v: "top-0 left-0"    },
          { wrap: "top-0 right-0",   h: "top-0 right-0",   v: "top-0 right-0"   },
          { wrap: "bottom-0 left-0", h: "bottom-0 left-0", v: "bottom-0 left-0" },
          { wrap: "bottom-0 right-0",h: "bottom-0 right-0",v: "bottom-0 right-0"},
        ][i];
        return (
          <div key={i} className={`absolute ${pos.wrap} w-32 h-32 pointer-events-none`}>
            <div className={`absolute ${pos.h} w-12 h-px bg-[--gold-600] opacity-60`} />
            <div className={`absolute ${pos.v} w-px h-12 bg-[--gold-600] opacity-60`} />
          </div>
        );
      })}

      <div ref={contentRef} className="container relative z-10 text-center max-w-3xl mx-auto">
        <div data-c className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px flex-1 max-w-24" style={{ background: "linear-gradient(to right, transparent, rgba(201,162,39,0.5))" }} />
          <span className="text-[--gold-500] text-xs font-bold tracking-[0.3em] uppercase">Get in touch</span>
          <div className="h-px flex-1 max-w-24" style={{ background: "linear-gradient(to left, transparent, rgba(201,162,39,0.5))" }} />
        </div>

        <h2 data-heading className="font-display font-bold mb-5"
          style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)", lineHeight: 1.1, color: "#c8d8f0", WebkitTextStroke: "0.5px rgba(201,162,39,0.55)", textShadow: "0 0 60px rgba(201,162,39,0.12)", perspective: "600px" }}>
          {heading.split("").map((ch, i) => (
            <span key={i} data-char style={{ display: "inline-block", whiteSpace: ch === " " ? "pre" : "normal" }}>{ch}</span>
          ))}
        </h2>

        {/* Shimmer divider */}
        <div data-c className="relative w-48 h-px mx-auto mb-8 overflow-hidden rounded-full">
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent, #C9A227, transparent)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent 20%, rgba(255,255,255,0.8) 50%, transparent 80%)", animation: "shimmer-line 2.5s ease-in-out infinite" }} />
        </div>

        <p data-c className="text-lg leading-relaxed mb-12 max-w-xl mx-auto" style={{ color: "#b8cce0" }}>
          {t("body")}
        </p>

        <div data-c className="flex flex-wrap justify-center gap-4">
          <Link ref={primaryBtnRef} href={`/${locale}/contact`} className="btn-primary px-12 py-4 text-base group gap-2"
            style={{ display: "inline-flex", alignItems: "center" }}>
            {t("btn")}
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
            </svg>
          </Link>
          <Link ref={outlineBtnRef} href={`/${locale}/about`} className="btn-outline px-12 py-4 text-base">
            {t("btnSecondary")}
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes shimmer-line { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }
        @keyframes cta-pulse { from{transform:scale(1) translateY(0);opacity:.8} to{transform:scale(1.1) translateY(-20px);opacity:1} }
      `}</style>
    </section>
  );
}
