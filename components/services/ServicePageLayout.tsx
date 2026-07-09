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
  accentColor?: string; // for cleaning sub-brand
  subBrand?: string;
  extraSection?: React.ReactNode;
  contactPath?: string;
}

export default function ServicePageLayout({
  label,
  heading,
  body,
  servicesHeading,
  services,
  ctaHeading,
  ctaBtn,
  accentColor = "var(--gold-600)",
  subBrand,
  extraSection,
  contactPath = "/contact",
}: ServicePageLayoutProps) {
  const locale = useLocale();
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = cardsRef.current?.querySelectorAll<HTMLElement>("[data-card]");
    if (!cards) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    gsap.set(cards, { opacity: 0, y: 30 });
    ScrollTrigger.create({
      trigger: cardsRef.current,
      start: "top 80%",
      onEnter: () => {
        gsap.to(cards, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" });
      },
      once: true,
    });
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-24 bg-[--navy-950] overflow-hidden">
        <div className="absolute inset-0 opacity-15"
          style={{ backgroundImage: `radial-gradient(ellipse at 25% 50%, ${accentColor}, transparent 65%)` }} />
        <div className="container relative z-10 max-w-3xl">
          <span className="section-label block mb-4" style={{ color: accentColor }}>{label}</span>
          {subBrand && (
            <div className="text-sm font-semibold mb-3 opacity-70 text-white">{subBrand}</div>
          )}
          <h1 className="font-display font-bold text-white whitespace-pre-line mb-6"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            {heading}
          </h1>
          <p className="text-white/60 leading-relaxed text-lg max-w-none">{body}</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" className="w-full h-12 block" preserveAspectRatio="none">
            <path d="M0,30 Q360,60 720,30 Q1080,0 1440,30 L1440,60 L0,60 Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Services grid */}
      <section className="section-pad bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-[--navy-900]">{servicesHeading}</h2>
            <div className="h-1 w-16 mx-auto mt-4 rounded-full"
              style={{ background: `linear-gradient(90deg, ${accentColor}, var(--gold-400))` }} />
          </div>
          <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <div
                key={i}
                data-card
                className="p-6 rounded-xl border border-[--grey-200] hover:border-[--gold-400] hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 font-display font-bold text-sm"
                  style={{ background: `${accentColor}18`, color: accentColor }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-display font-semibold text-[--navy-900] mb-2">{service.title}</h3>
                <p className="text-sm text-[--color-text-muted] leading-relaxed max-w-none">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {extraSection}

      {/* CTA */}
      <section className="py-20 bg-[--navy-950] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `radial-gradient(circle at 50% 50%, ${accentColor}, transparent 70%)` }} />
        <div className="container relative z-10 text-center">
          <h2 className="font-display font-bold text-white mb-8 max-w-2xl mx-auto">{ctaHeading}</h2>
          <Link
            href={`/${locale}${contactPath}`}
            className="btn-primary px-10 py-4 text-base inline-flex items-center gap-2"
            style={{ background: `linear-gradient(135deg, ${accentColor}, var(--gold-400))` }}
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
