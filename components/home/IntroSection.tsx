"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function IntroSection() {
  const t = useTranslations("home.intro");
  const ref = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const left = el.querySelectorAll("[data-left]");
    const right = el.querySelector("[data-right]");

    gsap.set(left, { opacity: 0, y: 32 });
    gsap.set(right, { opacity: 0, scale: 0.94 });

    ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      onEnter: () => {
        gsap.to(left, { opacity: 1, y: 0, duration: 1.3, stagger: 0.15, ease: "expo.out" });
        gsap.to(right, { opacity: 1, scale: 1, duration: 1.5, ease: "expo.out", delay: 0.2 });
      },
      once: true,
    });

    // Slow float on the logo
    if (logoRef.current) {
      gsap.to(logoRef.current, {
        y: -12, duration: 4, yoyo: true, repeat: -1, ease: "sine.inOut",
      });
    }
  }, []);

  return (
    <section
      ref={ref}
      className="section-pad relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #050d1a 0%, #091628 100%)" }}
    >
      {/* Side accent */}
      <div className="absolute right-0 top-0 bottom-0 w-px"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(201,162,39,0.25) 30%, rgba(201,162,39,0.25) 70%, transparent)" }} />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Visual — left */}
          <div data-right className="relative flex items-center justify-center order-2 lg:order-1">
            {/* Outer glow ring */}
            <div className="absolute rounded-full pointer-events-none"
              style={{
                width: "340px", height: "340px",
                background: "radial-gradient(circle, rgba(201,162,39,0.08) 0%, transparent 70%)",
                animation: "ring-pulse 5s ease-in-out infinite alternate",
              }}
            />
            {/* Spinning ring border */}
            <div className="absolute rounded-full pointer-events-none"
              style={{
                width: "300px", height: "300px",
                border: "1px solid rgba(201,162,39,0.15)",
                animation: "spin-slow 20s linear infinite",
              }}
            />
            <div className="absolute rounded-full pointer-events-none"
              style={{
                width: "240px", height: "240px",
                border: "1px solid rgba(36,95,168,0.2)",
                animation: "spin-slow 14s linear infinite reverse",
              }}
            />

            {/* Logo floating */}
            <div ref={logoRef} className="relative z-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/aspak-logo.png"
                alt="Aspak Global"
                width={200}
                height={160}
                className="w-44 md:w-52 h-auto object-contain"
                style={{
                  mixBlendMode: "screen",
                  filter: "drop-shadow(0 0 50px rgba(201,162,39,0.25)) drop-shadow(0 0 20px rgba(201,162,39,0.15))",
                }}
              />
            </div>

            {/* Orbit dots */}
            {[0, 72, 144, 216, 288].map((deg) => (
              <div key={deg} className="absolute pointer-events-none"
                style={{
                  width: "6px", height: "6px", borderRadius: "50%",
                  background: "#C9A227",
                  top: `calc(50% + ${Math.sin((deg * Math.PI) / 180) * 150}px - 3px)`,
                  left: `calc(50% + ${Math.cos((deg * Math.PI) / 180) * 150}px - 3px)`,
                  opacity: 0.4,
                  animation: `orbit-dot 6s ${deg / 60}s ease-in-out infinite alternate`,
                }}
              />
            ))}
          </div>

          {/* Text — right */}
          <div className="order-1 lg:order-2">
            <span data-left className="section-label text-[--gold-400] block mb-5">{t("label")}</span>
            <h2 data-left className="font-display font-bold text-white mb-6"
              style={{ fontSize: "clamp(1.9rem, 3.5vw, 3rem)", lineHeight: 1.15 }}>
              {t("heading")}
            </h2>
            <div data-left className="h-px w-14 rounded-full mb-7"
              style={{ background: "linear-gradient(90deg, #C9A227, transparent)" }} />
            <p data-left className="text-white/45 leading-relaxed mb-8 max-w-none text-base">
              {t("body")}
            </p>
            <div data-left className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(201,162,39,0.12)", border: "1px solid rgba(201,162,39,0.3)" }}>
                <svg className="w-4 h-4 text-[--gold-500]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
                </svg>
              </div>
              <span className="text-sm text-white/40 font-medium">{t("since")}</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ring-pulse {
          from { transform: scale(1); opacity: 0.6; }
          to { transform: scale(1.12); opacity: 1; }
        }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes orbit-dot {
          from { opacity: 0.2; transform: scale(0.7); }
          to { opacity: 0.6; transform: scale(1.3); }
        }
      `}</style>
    </section>
  );
}
