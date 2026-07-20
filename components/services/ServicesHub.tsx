"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    id: "it-solutions",
    color: "#123A6B",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25z"/>
      </svg>
    ),
  },
  {
    id: "import-export",
    color: "#1A4E8C",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"/>
      </svg>
    ),
  },
  {
    id: "packaging-paper",
    color: "#245FA8",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"/>
      </svg>
    ),
  },
  {
    id: "office-supply",
    color: "#0D2B52",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"/>
      </svg>
    ),
  },
  {
    id: "cleaning",
    color: "#0D9488",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/>
      </svg>
    ),
  },
];

const LABEL_STYLE = {
  background: "rgba(160,120,24,0.15)", color: "#7a5a0a", border: "1px solid rgba(160,120,24,0.45)",
};

export default function ServicesHub() {
  const t = useTranslations("services");
  const homeT = useTranslations("home.services");
  const locale = useLocale();
  const items = homeT.raw("items") as Array<{ id: string; title: string; description: string }>;
  const heroRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (hero && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const els = hero.querySelectorAll("[data-hero]");
      gsap.set(els, { opacity: 0, y: 30 });
      gsap.to(els, { opacity: 1, y: 0, duration: 1, stagger: 0.14, ease: "expo.out", delay: 0.15 });
    }
    const grid = gridRef.current;
    if (grid && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const cards = grid.querySelectorAll("[data-card]");
      gsap.set(cards, { opacity: 0, y: 36 });
      ScrollTrigger.create({
        trigger: grid, start: "top 82%",
        onEnter: () => gsap.to(cards, { opacity: 1, y: 0, duration: 0.9, stagger: 0.09, ease: "expo.out" }),
        once: true,
      });
    }
  }, []);

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="relative min-h-[55vh] flex flex-col justify-center overflow-hidden"
        style={{ paddingTop: "clamp(7rem,16vh,10rem)", paddingBottom: "5rem", background: "linear-gradient(160deg, #dde3ed 0%, #d4dce9 50%, #dae0eb 100%)" }}>
        <div className="absolute top-0 right-0 w-96 h-96 pointer-events-none" style={{ background: "radial-gradient(circle at 70% 20%, rgba(201,162,39,0.12) 0%, transparent 60%)" }} />
        <div className="absolute bottom-0 left-0 w-80 h-80 pointer-events-none" style={{ background: "radial-gradient(circle at 20% 80%, rgba(9,22,40,0.07) 0%, transparent 60%)" }} />
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, transparent, #C9A227 30%, #F0D060 50%, #C9A227 70%, transparent)" }} />

        <div className="container relative z-10 max-w-3xl text-center mx-auto">
          <span data-hero className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.25em] uppercase mb-5" style={LABEL_STYLE}>
            {t("hero.label")}
          </span>
          <h1 data-hero className="font-display font-bold whitespace-pre-line mb-5"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#050d1a", lineHeight: 1.15, textShadow: "0 1px 2px rgba(0,0,0,0.08)" }}>
            {t("hero.heading")}
          </h1>
          <div data-hero className="relative w-20 h-0.5 mx-auto mb-6 overflow-hidden rounded-full">
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent, #C9A227, transparent)" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent 20%, rgba(255,255,255,0.9) 50%, transparent 80%)", animation: "shimmer-line 2.5s ease-in-out infinite" }} />
          </div>
          <p data-hero className="leading-relaxed text-lg max-w-none" style={{ color: "#1e3a5a" }}>
            {t("hero.body")}
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 48" className="w-full h-10 block" preserveAspectRatio="none">
            <path d="M0,24 Q360,48 720,24 Q1080,0 1440,24 L1440,48 L0,48 Z" fill="white"/>
          </svg>
        </div>
        <style>{`@keyframes shimmer-line{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}`}</style>
      </section>

      {/* Services grid */}
      <section className="section-pad" style={{ background: "#ffffff" }}>
        <div className="container">
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item) => {
              const svc = SERVICES.find((s) => s.id === item.id);
              return (
                <Link key={item.id} href={`/${locale}/services/${item.id}`} data-card
                  className="group block rounded-2xl overflow-hidden"
                  style={{
                    background: "#ffffff",
                    border: "1.5px solid rgba(9,22,40,0.08)",
                    boxShadow: "0 4px 20px rgba(9,22,40,0.06)",
                    transition: "transform 0.4s cubic-bezier(0.34,1.4,0.64,1), box-shadow 0.4s, border-color 0.3s",
                  }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-8px)"; el.style.boxShadow = "0 20px 48px rgba(9,22,40,0.12)"; el.style.borderColor = "rgba(201,162,39,0.5)"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = ""; el.style.boxShadow = "0 4px 20px rgba(9,22,40,0.06)"; el.style.borderColor = "rgba(9,22,40,0.08)"; }}
                >
                  {/* Icon header */}
                  <div className="h-32 flex items-center justify-center relative overflow-hidden"
                    style={{ background: `linear-gradient(145deg, ${svc?.color || "#123A6B"}, ${svc?.color || "#123A6B"}dd)` }}>
                    <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 80% 20%, rgba(201,162,39,0.15) 0%, transparent 60%)" }} />
                    <div className="relative text-[#F0D060] transition-transform duration-400 group-hover:scale-110">
                      {svc?.icon}
                    </div>
                  </div>
                  {/* Content */}
                  <div className="p-6">
                    <h2 className="font-display font-bold text-lg mb-3 transition-colors duration-300" style={{ color: "#050d1a" }}>
                      {item.title}
                    </h2>
                    <p className="text-sm leading-relaxed mb-5 max-w-none" style={{ color: "#4a5f7a" }}>{item.description}</p>
                    <div className="flex items-center gap-2 text-sm font-semibold transition-all duration-300 group-hover:gap-3" style={{ color: "#a07818" }}>
                      {t("grid.learnMore")}
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
                      </svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
