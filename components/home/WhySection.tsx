"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type WhyItem = { title: string; description: string };

const ICONS = [
  // Handshake / trust
  <svg key="t" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"/>
  </svg>,
  // Globe
  <svg key="g" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"/>
  </svg>,
  // Lightning
  <svg key="l" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/>
  </svg>,
  // Star
  <svg key="s" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/>
  </svg>,
];

export default function WhySection() {
  const t = useTranslations("home.why");
  const sectionRef = useRef<HTMLElement>(null);
  const items = t.raw("items") as WhyItem[];

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const heading = el.querySelectorAll("[data-h]");
    const cards = el.querySelectorAll("[data-card]");

    gsap.set(heading, { opacity: 0, y: 24 });
    gsap.set(cards, { opacity: 0, x: -30 });

    ScrollTrigger.create({
      trigger: el,
      start: "top 82%",
      onEnter: () => {
        gsap.to(heading, { opacity: 1, y: 0, duration: 1.2, stagger: 0.14, ease: "expo.out" });
        gsap.to(cards, { opacity: 1, x: 0, duration: 1.0, stagger: 0.1, ease: "expo.out", delay: 0.25 });
      },
      once: true,
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pad relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #091628 0%, #0a1a2e 100%)" }}
    >
      {/* Decorative left accent line */}
      <div className="absolute left-0 top-0 bottom-0 w-px"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(201,162,39,0.3) 30%, rgba(201,162,39,0.3) 70%, transparent)" }} />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — heading */}
          <div>
            <span data-h className="section-label text-[--gold-400] block mb-5">{t("label")}</span>
            <h2 data-h className="font-display font-bold text-white whitespace-pre-line mb-6"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", lineHeight: 1.1 }}>
              {t("heading")}
            </h2>
            <div data-h className="h-px w-16 rounded-full mb-8"
              style={{ background: "linear-gradient(90deg, #C9A227, transparent)" }} />
            <p data-h className="text-white/40 leading-relaxed max-w-md text-sm">
              {t("heading").split("\n")[0]}
            </p>
          </div>

          {/* Right — feature list */}
          <div className="flex flex-col gap-4">
            {items.map((item, i) => (
              <div
                key={i}
                data-card
                className="group flex items-start gap-4 p-5 rounded-xl transition-all duration-500 cursor-default"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(201,162,39,0.06)";
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(201,162,39,0.25)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.03)";
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.06)";
                }}
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-[--gold-500]"
                  style={{ background: "rgba(201,162,39,0.1)", border: "1px solid rgba(201,162,39,0.2)" }}>
                  {ICONS[i % ICONS.length]}
                </div>
                <div>
                  <h3 className="font-display font-semibold text-white text-base mb-1 group-hover:text-[--gold-400] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed max-w-none">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
