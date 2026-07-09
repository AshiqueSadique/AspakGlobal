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

    // Animate spine on scroll
    if (spineRef.current) {
      gsap.fromTo(
        spineRef.current,
        { drawSVG: "0%" },
        {
          drawSVG: "100%",
          scrollTrigger: {
            trigger: el,
            start: "top 70%",
            end: "bottom 80%",
            scrub: 1,
          },
        }
      );
    }

    // Animate each entry
    entries.forEach((entry, i) => {
      const isLeft = i % 2 === 0;
      gsap.fromTo(
        entry,
        { opacity: 0, x: isLeft ? -40 : 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: entry,
            start: "top 85%",
            once: true,
          },
        }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} className="section-pad bg-[--ivory] overflow-hidden">
      <div className="container">
        <div className="text-center mb-16">
          <span className="section-label">{t("label")}</span>
          <h2 className="mt-3 font-display font-bold text-[--navy-900]">{t("heading")}</h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Spine SVG */}
          <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-0.5 hidden md:block">
            <svg className="w-full h-full" viewBox="0 0 2 100%" preserveAspectRatio="none">
              <line
                ref={spineRef}
                x1="1" y1="0" x2="1" y2="100%"
                stroke="url(#spineGrad)"
                strokeWidth="2"
              />
              <defs>
                <linearGradient id="spineGrad" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
                  <stop offset="0%" stopColor="#C9A227"/>
                  <stop offset="100%" stopColor="#E8C766" stopOpacity="0.3"/>
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Mobile spine */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[--gold-600] to-[--gold-400]/30 md:hidden" />

          <div className="flex flex-col gap-10">
            {items.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={i}
                  data-timeline-entry
                  className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Content card */}
                  <div className={`flex-1 pl-14 md:pl-0 ${isLeft ? "md:text-right md:pr-10" : "md:text-left md:pl-10"}`}>
                    <div className="bg-white rounded-xl p-6 border border-[--grey-200] shadow-sm hover:shadow-md hover:border-[--gold-400] transition-all duration-300">
                      <div className="inline-block px-3 py-1 rounded-full bg-[--navy-900] text-[--gold-400] text-xs font-bold font-display mb-3 tracking-wider">
                        {item.year}
                      </div>
                      <h3 className="font-display font-semibold text-[--navy-900] mb-2">{item.title}</h3>
                      <p className="text-sm text-[--color-text-muted] leading-relaxed max-w-none">{item.description}</p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="absolute left-3 md:left-1/2 md:-translate-x-1/2 top-6 md:top-1/2 md:-translate-y-1/2 w-7 h-7 rounded-full bg-[--gold-500] border-4 border-white shadow-md flex items-center justify-center z-10 flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-[--navy-900]" />
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="flex-1 hidden md:block" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
