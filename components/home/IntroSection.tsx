"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function IntroSection() {
  const t = useTranslations("home.intro");
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const left = el.querySelectorAll("[data-left]");
    const right = el.querySelector("[data-right]");

    gsap.set(left, { opacity: 0, y: 30 });
    gsap.set(right, { opacity: 0, x: 40 });

    ScrollTrigger.create({
      trigger: el,
      start: "top 82%",
      onEnter: () => {
        gsap.to(left, { opacity: 1, y: 0, duration: 1.3, stagger: 0.18, ease: "expo.out" });
        gsap.to(right, { opacity: 1, x: 0, duration: 1.5, ease: "expo.out", delay: 0.25 });
      },
      once: true,
    });
  }, []);

  return (
    <section ref={ref} className="section-pad bg-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <span data-left className="section-label block mb-4">{t("label")}</span>
            <h2 data-left className="font-display font-bold text-[--navy-900] mb-6">{t("heading")}</h2>
            <p data-left className="text-[--color-text-muted] leading-relaxed mb-8 max-w-none">{t("body")}</p>
            <div data-left className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[--gold-100] flex items-center justify-center">
                <svg className="w-5 h-5 text-[--gold-600]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
                </svg>
              </div>
              <span className="text-sm font-medium text-[--navy-700]">{t("since")}</span>
            </div>
          </div>

          {/* Visual */}
          <div data-right className="relative h-80 lg:h-96 rounded-2xl overflow-hidden bg-[--navy-800]">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 400 300" className="w-full h-full opacity-20" aria-hidden="true">
                <rect x="20" y="200" width="40" height="100" fill="#C9A227" rx="2"/>
                <rect x="70" y="160" width="30" height="140" fill="#E8C766" rx="2"/>
                <rect x="110" y="180" width="50" height="120" fill="#C9A227" rx="2"/>
                <rect x="170" y="120" width="60" height="180" fill="#E8C766" rx="2"/>
                <rect x="240" y="150" width="40" height="150" fill="#C9A227" rx="2"/>
                <rect x="290" y="170" width="35" height="130" fill="#E8C766" rx="2"/>
                <rect x="335" y="190" width="45" height="110" fill="#C9A227" rx="2"/>
                <circle cx="200" cy="140" r="60" stroke="#C9A227" strokeWidth="1" fill="none" opacity="0.5"/>
                <ellipse cx="200" cy="140" rx="30" ry="60" stroke="#E8C766" strokeWidth="1" fill="none" opacity="0.5"/>
                <line x1="140" y1="140" x2="260" y2="140" stroke="#C9A227" strokeWidth="1" opacity="0.3"/>
              </svg>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-[--navy-900]/60 to-[--navy-950]/80" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="text-xs text-[--gold-400] tracking-widest uppercase mb-1 font-semibold">Aspak Global</div>
              <div className="text-white font-display font-bold text-xl">Bangkok, Thailand</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
