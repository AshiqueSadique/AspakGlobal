"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type StatItem = { value: number; suffix: string; label: string };

export default function StatsBand() {
  const t = useTranslations("home.stats");
  const sectionRef = useRef<HTMLElement>(null);
  const items = t.raw("items") as StatItem[];

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const counters = el.querySelectorAll<HTMLElement>("[data-count]");
    const labels = el.querySelectorAll<HTMLElement>("[data-label]");
    const lines = el.querySelectorAll<HTMLElement>("[data-line]");

    gsap.set(counters, { opacity: 0, y: 40, scale: 0.85 });
    gsap.set(labels, { opacity: 0, y: 16 });
    gsap.set(lines, { scaleX: 0, transformOrigin: "center" });

    ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      onEnter: () => {
        gsap.to(counters, { opacity: 1, y: 0, scale: 1, duration: 1.2, stagger: 0.12, ease: "expo.out" });
        gsap.to(labels, { opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: "expo.out", delay: 0.3 });
        gsap.to(lines, { scaleX: 1, duration: 1.2, stagger: 0.1, ease: "expo.out", delay: 0.5 });

        counters.forEach((counter) => {
          const target = parseInt(counter.getAttribute("data-count") || "0", 10);
          const suffix = counter.getAttribute("data-suffix") || "";
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 2.2,
            ease: "power3.out",
            delay: 0.3,
            snap: { val: 1 },
            onUpdate: () => { counter.textContent = Math.round(obj.val) + suffix; },
          });
        });
      },
      once: true,
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #050d1a 0%, #091628 50%, #070f1e 100%)" }}
    >
      {/* Big ambient glow in centre */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div style={{
          width: "700px", height: "700px",
          background: "radial-gradient(circle, rgba(201,162,39,0.06) 0%, transparent 65%)",
          borderRadius: "50%",
        }} />
      </div>

      {/* Top + bottom gold lines */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(201,162,39,0.35) 30%, rgba(201,162,39,0.5) 50%, rgba(201,162,39,0.35) 70%, transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(201,162,39,0.35) 30%, rgba(201,162,39,0.5) 50%, rgba(201,162,39,0.35) 70%, transparent)" }} />

      <div className="container relative z-10">
        <div className="text-center mb-16">
          <span className="section-label text-[--gold-400]">{t("label")}</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {items.map((item, i) => (
            <div key={i} className="relative text-center px-4">
              {/* Vertical divider (except last) */}
              {i < items.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -translate-y-1/2 right-0 w-px h-16"
                  style={{ background: "linear-gradient(to bottom, transparent, rgba(201,162,39,0.2), transparent)" }} />
              )}

              {/* Counter */}
              <div
                data-count={item.value}
                data-suffix={item.suffix}
                className="font-display font-black leading-none mb-1"
                style={{
                  fontSize: "clamp(3rem, 6vw, 5.5rem)",
                  background: "linear-gradient(135deg, #E8C766 0%, #C9A227 50%, #F0D060 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 0 20px rgba(201,162,39,0.3))",
                }}
              >
                {item.value}{item.suffix}
              </div>

              {/* Gold underline */}
              <div data-line className="h-px w-12 mx-auto mb-3 rounded-full"
                style={{ background: "linear-gradient(90deg, transparent, #C9A227, transparent)" }} />

              <div data-label className="text-white/45 text-sm font-medium tracking-wide leading-snug">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
