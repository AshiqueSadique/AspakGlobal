"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ServiceItem = { title: string; description: string };

interface ServicePageLayoutProps {
  label: string;
  heading: string;
  body: string;
  servicesHeading: string;
  services: ServiceItem[];
  ctaHeading: string;
  ctaBtn: string;
  accentColor?: string;
  subBrand?: string;
  extraSection?: React.ReactNode;
  contactPath?: string;
}

const LABEL_STYLE = {
  background: "rgba(160,120,24,0.15)", color: "#7a5a0a", border: "1px solid rgba(160,120,24,0.45)",
};

export default function ServicePageLayout({
  label, heading, body, servicesHeading, services,
  ctaHeading, ctaBtn, accentColor = "#C9A227", subBrand, extraSection, contactPath = "/contact",
}: ServicePageLayoutProps) {
  const locale = useLocale();
  const heroRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (hero && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const els = hero.querySelectorAll("[data-hero]");
      gsap.set(els, { opacity: 0, y: 30 });
      gsap.to(els, { opacity: 1, y: 0, duration: 1, stagger: 0.14, ease: "expo.out", delay: 0.15 });
    }
    const cards = cardsRef.current?.querySelectorAll<HTMLElement>("[data-card]");
    if (cards && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(cards, { opacity: 0, y: 36 });
      ScrollTrigger.create({
        trigger: cardsRef.current, start: "top 82%",
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
        <div className="absolute top-0 right-0 w-96 h-96 pointer-events-none" style={{ background: `radial-gradient(circle at 70% 20%, ${accentColor}22 0%, transparent 60%)` }} />
        <div className="absolute bottom-0 left-0 w-80 h-80 pointer-events-none" style={{ background: "radial-gradient(circle at 20% 80%, rgba(9,22,40,0.07) 0%, transparent 60%)" }} />
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, transparent, #C9A227 30%, #F0D060 50%, #C9A227 70%, transparent)" }} />

        <div className="container relative z-10 max-w-3xl">
          <span data-hero className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.25em] uppercase mb-5" style={LABEL_STYLE}>
            {label}
          </span>
          {subBrand && (
            <div data-hero className="text-sm font-semibold mb-3" style={{ color: "#4a5f7a" }}>{subBrand}</div>
          )}
          <h1 data-hero className="font-display font-bold whitespace-pre-line mb-5"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#050d1a", lineHeight: 1.15, textShadow: "0 1px 2px rgba(0,0,0,0.08)" }}>
            {heading}
          </h1>
          <div data-hero className="relative w-20 h-0.5 mb-6 overflow-hidden rounded-full">
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent, #C9A227, transparent)" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent 20%, rgba(255,255,255,0.9) 50%, transparent 80%)", animation: "shimmer-line 2.5s ease-in-out infinite" }} />
          </div>
          <p data-hero className="leading-relaxed text-lg max-w-none" style={{ color: "#1e3a5a" }}>{body}</p>
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
          <div className="text-center mb-12">
            <h2 className="font-display font-bold" style={{ color: "#050d1a", fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}>{servicesHeading}</h2>
            <div className="relative w-16 h-0.5 mx-auto mt-4 overflow-hidden rounded-full">
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent, #C9A227, transparent)" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent 20%, rgba(255,255,255,0.9) 50%, transparent 80%)", animation: "shimmer-line 2.5s ease-in-out infinite" }} />
            </div>
          </div>
          <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <div key={i} data-card className="relative rounded-2xl p-6 cursor-default"
                style={{
                  background: "linear-gradient(145deg, #f8fafc 0%, #f0f4f8 100%)",
                  border: "1.5px solid rgba(9,22,40,0.07)",
                  boxShadow: "0 2px 16px rgba(9,22,40,0.05)",
                  transition: "transform 0.4s cubic-bezier(0.34,1.4,0.64,1), box-shadow 0.4s, border-color 0.3s",
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-6px)"; el.style.boxShadow = "0 16px 40px rgba(9,22,40,0.1)"; el.style.borderColor = "rgba(201,162,39,0.45)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = ""; el.style.boxShadow = "0 2px 16px rgba(9,22,40,0.05)"; el.style.borderColor = "rgba(9,22,40,0.07)"; }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 font-display font-bold text-sm"
                  style={{ background: "linear-gradient(135deg, rgba(201,162,39,0.15), rgba(201,162,39,0.08))", border: "1.5px solid rgba(201,162,39,0.35)", color: "#a07818" }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-display font-semibold mb-2" style={{ color: "#050d1a" }}>{service.title}</h3>
                <p className="text-sm leading-relaxed max-w-none" style={{ color: "#4a5f7a" }}>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {extraSection}

      {/* CTA */}
      <section className="py-20 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0d1e38 0%, #1a3560 100%)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(201,162,39,0.1) 0%, transparent 65%)" }} />
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, transparent, #C9A227 30%, #F0D060 50%, #C9A227 70%, transparent)" }} />
        <div className="container relative z-10 text-center">
          <h2 className="font-display font-bold mb-8 max-w-2xl mx-auto" style={{ color: "#f0f4f8", fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)" }}>{ctaHeading}</h2>
          <Link href={`/${locale}${contactPath}`}
            className="inline-flex items-center gap-2 px-10 py-4 text-base font-semibold rounded-full transition-all duration-300"
            style={{ background: "linear-gradient(135deg, #C9A227, #F0D060)", color: "#0d1e38" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px rgba(201,162,39,0.4)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = ""; }}
          >
            {ctaBtn}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
