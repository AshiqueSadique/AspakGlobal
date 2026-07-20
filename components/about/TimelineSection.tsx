"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import DrawSVGPlugin from "gsap/DrawSVGPlugin";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

type TimelineItem = { year: string; title: string; description: string };

export default function TimelineSection() {
  const t = useTranslations("about.timeline");
  const items = t.raw("items") as TimelineItem[];
  const sectionRef = useRef<HTMLElement>(null);
  const spineRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const entries = el.querySelectorAll<HTMLElement>("[data-timeline-entry]");

    if (prefersReduced) {
      if (spineRef.current) gsap.set(spineRef.current, { drawSVG: "100%" });
      gsap.set(entries, { opacity: 1, x: 0 });
      return;
    }

    if (spineRef.current) {
      gsap.fromTo(spineRef.current, { drawSVG: "0%" }, {
        drawSVG: "100%",
        scrollTrigger: { trigger: el, start: "top 70%", end: "bottom 80%", scrub: 1 },
      });
    }

    entries.forEach((entry, i) => {
      const isLeft = i % 2 === 0;
      gsap.fromTo(entry,
        { opacity: 0, x: isLeft ? -50 : 50 },
        { opacity: 1, x: 0, duration: 0.8, ease: "expo.out", scrollTrigger: { trigger: entry, start: "top 88%", once: true } }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} className="section-pad overflow-hidden" style={{ background: "linear-gradient(180deg, #eef1f7 0%, #f8fafc 100%)" }}>
      <div className="container">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.25em] uppercase mb-4" style={{
            background: "rgba(201,162,39,0.1)", color: "#a07818", border: "1px solid rgba(201,162,39,0.3)",
          }}>{t("label")}</span>
          <h2 className="font-display font-bold mt-2" style={{ color: "#0d1e38", fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)" }}>
            {t("heading")}
          </h2>
          <div className="relative w-16 h-0.5 mx-auto mt-4 overflow-hidden rounded-full">
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent, #C9A227, transparent)" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent 20%, rgba(255,255,255,0.9) 50%, transparent 80%)", animation: "shimmer-line 2.5s ease-in-out infinite" }} />
          </div>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Desktop spine */}
          <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-0.5 hidden md:block">
            <svg className="w-full h-full" viewBox="0 0 2 100%" preserveAspectRatio="none">
              <line ref={spineRef} x1="1" y1="0" x2="1" y2="100%" stroke="url(#spineGrad)" strokeWidth="2" />
              <defs>
                <linearGradient id="spineGrad" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
                  <stop offset="0%" stopColor="#C9A227"/>
                  <stop offset="100%" stopColor="#C9A227" stopOpacity="0.2"/>
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Mobile spine */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 md:hidden" style={{
            background: "linear-gradient(to bottom, #C9A227, rgba(201,162,39,0.2))",
          }} />

          <div className="flex flex-col gap-10">
            {items.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div key={i} data-timeline-entry
                  className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  {/* Card */}
                  <div className={`flex-1 pl-14 md:pl-0 ${isLeft ? "md:text-right md:pr-10" : "md:text-left md:pl-10"}`}>
                    <div
                      className="relative rounded-2xl p-6 cursor-default"
                      style={{
                        background: "#ffffff",
                        border: "1.5px solid rgba(9,22,40,0.07)",
                        boxShadow: "0 4px 20px rgba(9,22,40,0.06)",
                        transition: "transform 0.4s cubic-bezier(0.34,1.4,0.64,1), box-shadow 0.4s, border-color 0.3s",
                      }}
                      onMouseEnter={e => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.transform = "translateY(-4px)";
                        el.style.boxShadow = "0 16px 40px rgba(9,22,40,0.1)";
                        el.style.borderColor = "rgba(201,162,39,0.45)";
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.transform = "";
                        el.style.boxShadow = "0 4px 20px rgba(9,22,40,0.06)";
                        el.style.borderColor = "rgba(9,22,40,0.07)";
                      }}
                    >
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3" style={{
                        background: "linear-gradient(135deg, #0d1e38, #1a3560)",
                        color: "#F0D060",
                      }}>{item.year}</span>
                      <h3 className="font-display font-bold mb-2" style={{ color: "#0d1e38" }}>{item.title}</h3>
                      <p className="text-sm leading-relaxed max-w-none" style={{ color: "#4a5f7a" }}>{item.description}</p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="absolute left-3 md:left-1/2 md:-translate-x-1/2 top-6 md:top-1/2 md:-translate-y-1/2 z-10 flex-shrink-0">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{
                      background: "linear-gradient(135deg, #C9A227, #F0D060)",
                      boxShadow: "0 0 0 4px white, 0 0 0 6px rgba(201,162,39,0.3), 0 4px 12px rgba(201,162,39,0.4)",
                    }}>
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#0d1e38" }} />
                    </div>
                  </div>

                  {/* Spacer */}
                  <div className="flex-1 hidden md:block" />
                </div>
              );
            })}
          </div>
        </div>
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
