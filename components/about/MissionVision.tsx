"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MissionVision() {
  const t = useTranslations("about.mission");
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cards = el.querySelectorAll("[data-card]");
    gsap.set(cards, { opacity: 0, y: 40 });
    ScrollTrigger.create({
      trigger: el, start: "top 80%",
      onEnter: () => gsap.to(cards, { opacity: 1, y: 0, duration: 1, stagger: 0.18, ease: "expo.out" }),
      once: true,
    });
  }, []);

  return (
    <section ref={ref} className="section-pad" style={{ background: "#ffffff" }}>
      <div className="container">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.25em] uppercase mb-4" style={{
            background: "rgba(201,162,39,0.1)", color: "#a07818", border: "1px solid rgba(201,162,39,0.3)",
          }}>{t("label")}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Mission */}
          <div data-card className="group relative rounded-2xl p-8 overflow-hidden cursor-default" style={{
            background: "linear-gradient(145deg, #f8fafc 0%, #f0f4f8 100%)",
            border: "1.5px solid rgba(9,22,40,0.08)",
            boxShadow: "0 4px 24px rgba(9,22,40,0.06)",
            transition: "transform 0.4s cubic-bezier(0.34,1.4,0.64,1), box-shadow 0.4s",
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 48px rgba(9,22,40,0.12), 0 0 0 1.5px rgba(201,162,39,0.4)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(9,22,40,0.06)"; }}
          >
            {/* Gold top accent */}
            <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{
              background: "linear-gradient(90deg, #C9A227, #F0D060, #C9A227)",
              opacity: 0,
              transition: "opacity 0.3s",
            }} ref={el => { if (el) { const p = el.parentElement; p?.addEventListener("mouseenter", () => el.style.opacity = "1"); p?.addEventListener("mouseleave", () => el.style.opacity = "0"); }}} />

            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{
              background: "linear-gradient(135deg, rgba(201,162,39,0.15) 0%, rgba(201,162,39,0.08) 100%)",
              border: "1.5px solid rgba(201,162,39,0.4)",
            }}>
              <svg className="w-7 h-7" style={{ color: "#C9A227" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/>
              </svg>
            </div>
            <h3 className="font-display font-bold text-xl mb-3" style={{ color: "#0d1e38" }}>{t("missionTitle")}</h3>
            <p className="leading-relaxed max-w-none text-sm" style={{ color: "#4a5f7a" }}>{t("missionBody")}</p>
          </div>

          {/* Vision */}
          <div data-card className="group relative rounded-2xl p-8 overflow-hidden cursor-default" style={{
            background: "linear-gradient(145deg, #0d1e38 0%, #1a3560 100%)",
            border: "1.5px solid rgba(201,162,39,0.2)",
            boxShadow: "0 4px 24px rgba(9,22,40,0.18)",
            transition: "transform 0.4s cubic-bezier(0.34,1.4,0.64,1), box-shadow 0.4s",
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 48px rgba(9,22,40,0.3), 0 0 0 1.5px rgba(201,162,39,0.5)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(9,22,40,0.18)"; }}
          >
            <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none" style={{
              background: "radial-gradient(circle, rgba(201,162,39,0.1) 0%, transparent 70%)",
            }} />
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{
              background: "rgba(201,162,39,0.15)",
              border: "1.5px solid rgba(201,162,39,0.5)",
            }}>
              <svg className="w-7 h-7" style={{ color: "#F0D060" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </div>
            <h3 className="font-display font-bold text-xl mb-3" style={{ color: "#F0D060" }}>{t("visionTitle")}</h3>
            <p className="leading-relaxed max-w-none text-sm" style={{ color: "rgba(184,204,224,0.85)" }}>{t("visionBody")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
