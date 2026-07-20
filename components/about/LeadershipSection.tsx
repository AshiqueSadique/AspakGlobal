"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LeadershipSection() {
  const t = useTranslations("about.leadership");
  const d = useTranslations("about.leadership.director");
  const ref = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.set(cardRef.current, { opacity: 0, y: 40 });
    ScrollTrigger.create({
      trigger: el, start: "top 80%",
      onEnter: () => gsap.to(cardRef.current, { opacity: 1, y: 0, duration: 1, ease: "expo.out" }),
      once: true,
    });
  }, []);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(card, { rotateY: x * 8, rotateX: -y * 6, duration: 0.4, ease: "power2.out", transformPerspective: 800 });
    if (glowRef.current) gsap.to(glowRef.current, { left: e.clientX - rect.left, top: e.clientY - rect.top, opacity: 1, duration: 0.2 });
  };
  const onMouseLeave = () => {
    gsap.to(cardRef.current, { rotateY: 0, rotateX: 0, duration: 0.7, ease: "expo.out" });
    if (glowRef.current) gsap.to(glowRef.current, { opacity: 0, duration: 0.3 });
  };

  return (
    <section ref={ref} className="section-pad" style={{ background: "#ffffff" }}>
      <div className="container">
        <div className="text-center mb-14">
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

        <div className="max-w-sm mx-auto">
          <div
            ref={cardRef}
            className="relative rounded-2xl overflow-hidden cursor-default"
            style={{
              background: "#ffffff",
              border: "1.5px solid rgba(9,22,40,0.08)",
              boxShadow: "0 8px 40px rgba(9,22,40,0.1)",
              transformStyle: "preserve-3d",
              willChange: "transform",
            }}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
          >
            {/* Spotlight glow */}
            <div ref={glowRef} className="absolute pointer-events-none opacity-0 rounded-full z-10" style={{
              width: 200, height: 200,
              background: "radial-gradient(circle, rgba(201,162,39,0.12) 0%, transparent 65%)",
              transform: "translate(-50%,-50%)",
              left: "50%", top: "50%",
            }} />

            {/* Avatar area */}
            <div className="relative h-56 flex items-center justify-center overflow-hidden" style={{
              background: "linear-gradient(145deg, #0d1e38 0%, #1a3560 100%)",
            }}>
              <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 80%, rgba(201,162,39,0.15) 0%, transparent 60%)" }} />
              <div className="relative w-28 h-28 rounded-full flex items-center justify-center" style={{
                background: "rgba(201,162,39,0.12)",
                border: "2px solid rgba(201,162,39,0.5)",
                boxShadow: "0 0 24px rgba(201,162,39,0.2)",
              }}>
                <svg className="w-14 h-14" style={{ color: "#F0D060" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>
                </svg>
              </div>
              {/* Decorative ring */}
              <div className="absolute w-40 h-40 rounded-full pointer-events-none" style={{
                border: "1px solid rgba(201,162,39,0.15)",
              }} />
            </div>

            {/* Content */}
            <div className="p-7 text-center" style={{ background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)" }}>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4" style={{
                background: "rgba(201,162,39,0.1)", color: "#a07818", border: "1px solid rgba(201,162,39,0.3)",
              }}>{d("title")}</span>
              <h3 className="font-display font-bold text-xl mb-3" style={{ color: "#0d1e38" }}>{d("name")}</h3>
              <p className="text-sm leading-relaxed max-w-none" style={{ color: "#4a5f7a" }}>{d("bio")}</p>
            </div>

            {/* Gold bottom accent */}
            <div className="h-1" style={{ background: "linear-gradient(90deg, transparent, #C9A227, #F0D060, #C9A227, transparent)" }} />
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
