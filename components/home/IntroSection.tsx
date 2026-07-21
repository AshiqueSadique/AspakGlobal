"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* Split a string into individual <span> chars for staggered reveal */
function SplitChars({ text, className, style }: { text: string; className?: string; style?: React.CSSProperties }) {
  return (
    <span className={className} style={{ ...style, display: "inline-block" }}>
      {text.split("").map((ch, i) => (
        <span key={i} data-char style={{ display: "inline-block", whiteSpace: ch === " " ? "pre" : "normal" }}>
          {ch}
        </span>
      ))}
    </span>
  );
}

export default function IntroSection() {
  const t = useTranslations("home.intro");
  const ref = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    /* ── char-by-char heading reveal ── */
    const chars = headingRef.current?.querySelectorAll<HTMLElement>("[data-char]");
    if (chars?.length) {
      gsap.set(chars, { opacity: 0, y: 28, rotateX: -40, transformOrigin: "0% 50%" });
      ScrollTrigger.create({
        trigger: headingRef.current,
        start: "top 85%",
        onEnter: () =>
          gsap.to(chars, {
            opacity: 1, y: 0, rotateX: 0,
            duration: 0.7, stagger: 0.022, ease: "expo.out",
          }),
        once: true,
      });
    }

    /* ── left text elements slide up ── */
    const left = textColRef.current?.querySelectorAll<HTMLElement>("[data-left]");
    if (left?.length) {
      gsap.set(left, { opacity: 0, y: 36 });
      ScrollTrigger.create({
        trigger: textColRef.current,
        start: "top 82%",
        onEnter: () =>
          gsap.to(left, { opacity: 1, y: 0, duration: 1.1, stagger: 0.14, ease: "expo.out", delay: 0.15 }),
        once: true,
      });
    }

    /* ── visual column scale + fade ── */
    const vis = visualRef.current;
    if (vis) {
      gsap.set(vis, { opacity: 0, scale: 0.88 });
      ScrollTrigger.create({
        trigger: vis,
        start: "top 85%",
        onEnter: () =>
          gsap.to(vis, { opacity: 1, scale: 1, duration: 1.5, ease: "expo.out", delay: 0.2 }),
        once: true,
      });
    }

    /* ── scroll-parallax: visual floats upward as section scrolls ── */
    if (vis) {
      gsap.to(vis, {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }

    /* ── slow float on the logo ── */
    if (logoRef.current) {
      gsap.to(logoRef.current, { y: -12, duration: 4, yoyo: true, repeat: -1, ease: "sine.inOut" });
    }
  }, []);

  const heading = t("heading");

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
          <div ref={visualRef} className="relative flex items-center justify-center order-2 lg:order-1">
            <div className="absolute rounded-full pointer-events-none"
              style={{ width: "340px", height: "340px", background: "radial-gradient(circle, rgba(201,162,39,0.08) 0%, transparent 70%)", animation: "ring-pulse 5s ease-in-out infinite alternate" }} />
            <div className="absolute rounded-full pointer-events-none"
              style={{ width: "300px", height: "300px", border: "1px solid rgba(201,162,39,0.15)", animation: "spin-slow 20s linear infinite" }} />
            <div className="absolute rounded-full pointer-events-none"
              style={{ width: "240px", height: "240px", border: "1px solid rgba(36,95,168,0.2)", animation: "spin-slow 14s linear infinite reverse" }} />

            <div ref={logoRef} className="relative z-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/aspak-logo.png" alt="Aspak Global" width={200} height={160}
                className="w-44 md:w-52 h-auto object-contain"
                style={{ mixBlendMode: "screen", filter: "drop-shadow(0 0 50px rgba(201,162,39,0.25)) drop-shadow(0 0 20px rgba(201,162,39,0.15))" }} />
            </div>

            {[0, 72, 144, 216, 288].map((deg) => (
              <div key={deg} className="absolute pointer-events-none" suppressHydrationWarning
                style={{
                  width: "6px", height: "6px", borderRadius: "50%", background: "#C9A227",
                  top: `calc(50% + ${Math.sin((deg * Math.PI) / 180) * 150}px - 3px)`,
                  left: `calc(50% + ${Math.cos((deg * Math.PI) / 180) * 150}px - 3px)`,
                  opacity: 0.4, animation: `orbit-dot 6s ${deg / 60}s ease-in-out infinite alternate`,
                }} />
            ))}
          </div>

          {/* Text — right */}
          <div ref={textColRef} className="order-1 lg:order-2">
            <span data-left className="section-label text-[--gold-400] block mb-5">{t("label")}</span>

            <h2 ref={headingRef} className="font-display font-bold mb-6"
              style={{ fontSize: "clamp(1.9rem, 3.5vw, 3rem)", lineHeight: 1.15, color: "#c8d8f0", WebkitTextStroke: "0.5px rgba(201,162,39,0.55)", textShadow: "0 0 60px rgba(201,162,39,0.1)", perspective: "600px" }}>
              <SplitChars text={heading} />
            </h2>

            <div data-left className="relative w-14 h-px mb-7 overflow-hidden rounded-full">
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, #C9A227, transparent)" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent 20%, rgba(255,255,255,0.8) 50%, transparent 80%)", animation: "shimmer-line 2.5s ease-in-out infinite" }} />
            </div>

            <p data-left className="leading-relaxed mb-8 max-w-none text-base" style={{ color: "#b8cce0" }}>
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
              <span className="text-sm font-medium" style={{ color: "#b8cce0" }}>{t("since")}</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer-line { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }
        @keyframes ring-pulse { from{transform:scale(1);opacity:.6} to{transform:scale(1.12);opacity:1} }
        @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes orbit-dot { from{opacity:.2;transform:scale(.7)} to{opacity:.6;transform:scale(1.3)} }
      `}</style>
    </section>
  );
}
