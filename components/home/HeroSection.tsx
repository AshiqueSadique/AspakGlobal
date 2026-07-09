"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import gsap from "gsap";
import DrawSVGPlugin from "gsap/DrawSVGPlugin";

gsap.registerPlugin(DrawSVGPlugin);

export default function HeroSection() {
  const t = useTranslations("home.hero");
  const locale = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const swooshRef = useRef<SVGPathElement>(null);
  const bgOrb1Ref = useRef<HTMLDivElement>(null);
  const bgOrb2Ref = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const reveals = el.querySelectorAll<HTMLElement>("[data-reveal]");

    if (prefersReduced) {
      gsap.set(reveals, { opacity: 1, y: 0 });
      if (swooshRef.current) gsap.set(swooshRef.current, { drawSVG: "100%" });
      return;
    }

    // Set initial state
    gsap.set(reveals, { opacity: 0, y: 28 });
    gsap.set([bgOrb1Ref.current, bgOrb2Ref.current], { opacity: 0, scale: 0.7 });
    gsap.set(gridRef.current, { opacity: 0 });

    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

    // 1. Background atmosphere fades in first — sets the stage
    tl.to(gridRef.current, { opacity: 1, duration: 2.5, ease: "power1.out" }, 0)
      .to(bgOrb1Ref.current, { opacity: 1, scale: 1, duration: 3, ease: "power2.out" }, 0.1)
      .to(bgOrb2Ref.current, { opacity: 1, scale: 1, duration: 3.5, ease: "power2.out" }, 0.3)

    // 2. Eyebrow line + label — slow, dignified entry
      .to(el.querySelector("[data-reveal='eyebrow']"), {
        opacity: 1, y: 0, duration: 1.4, ease: "expo.out",
      }, 0.6)

    // 3. Headline lines stagger in — the main event
      .to(el.querySelectorAll("[data-reveal='line']"), {
        opacity: 1, y: 0, duration: 1.6, stagger: 0.18, ease: "expo.out",
      }, 1.0)

    // 4. Gold swoosh draws across
      .fromTo(swooshRef.current,
        { drawSVG: "0% 0%" },
        { drawSVG: "0% 100%", duration: 1.8, ease: "expo.inOut" },
        1.5)

    // 5. Sub-headline
      .to(el.querySelector("[data-reveal='sub']"), {
        opacity: 1, y: 0, duration: 1.4, ease: "expo.out",
      }, 2.0)

    // 6. CTAs last
      .to(el.querySelector("[data-reveal='cta']"), {
        opacity: 1, y: 0, duration: 1.2, ease: "expo.out",
      }, 2.5)

    // 7. Scroll indicator
      .to(el.querySelector("[data-reveal='scroll']"), {
        opacity: 1, duration: 1, ease: "power2.out",
      }, 3.0);

    // Subtle continuous float on background orbs
    gsap.to(bgOrb1Ref.current, {
      y: -30, x: 20, duration: 9, yoyo: true, repeat: -1, ease: "sine.inOut",
    });
    gsap.to(bgOrb2Ref.current, {
      y: 20, x: -15, duration: 12, yoyo: true, repeat: -1, ease: "sine.inOut", delay: 2,
    });

    return () => { tl.kill(); };
  }, []);

  const lines = t("headline").split("\n");
  const localHref = (p: string) => `/${locale}${p}`;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-[--navy-950]"
    >
      {/* ── Atmospheric background ── */}

      {/* Subtle grid texture */}
      <div
        ref={gridRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Deep base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#070E1A] via-[#0D1E38] to-[#091628]" />

      {/* Gold orb — upper right */}
      <div
        ref={bgOrb1Ref}
        className="absolute pointer-events-none"
        style={{
          top: "-10%", right: "-5%",
          width: "55vw", height: "55vw", maxWidth: 700, maxHeight: 700,
          background: "radial-gradient(circle, rgba(201,162,39,0.12) 0%, rgba(201,162,39,0.04) 40%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(1px)",
        }}
      />

      {/* Navy orb — lower left */}
      <div
        ref={bgOrb2Ref}
        className="absolute pointer-events-none"
        style={{
          bottom: "-15%", left: "-10%",
          width: "50vw", height: "50vw", maxWidth: 600, maxHeight: 600,
          background: "radial-gradient(circle, rgba(36,95,168,0.18) 0%, rgba(36,95,168,0.05) 40%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(2px)",
        }}
      />

      {/* Thin gold horizon line */}
      <div
        className="absolute left-0 right-0 pointer-events-none"
        style={{ top: "55%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(201,162,39,0.08) 30%, rgba(201,162,39,0.15) 50%, rgba(201,162,39,0.08) 70%, transparent)" }}
      />

      {/* ── Content ── */}
      <div className="container relative z-10 pt-32 pb-24">
        <div className="max-w-3xl">

          {/* Logo mark — the hero centrepiece on load */}
          <div data-reveal="eyebrow" className="flex items-center gap-5 mb-10">
            <img
              src="/aspak-logo.png"
              alt="Aspak Global Co., Ltd."
              width={120}
              height={96}
              className="w-24 h-auto object-contain flex-shrink-0"
              style={{ mixBlendMode: "screen" }}
            />
            <div>
              <div className="h-px w-10 bg-gradient-to-r from-transparent to-[--gold-600] mb-3" />
              <span className="text-[--gold-500] text-xs font-semibold tracking-[0.25em] uppercase block">
                {t("eyebrow")}
              </span>
            </div>
          </div>

          {/* Headline */}
          <div className="mb-3 space-y-1">
            {lines.map((line, i) => (
              <div key={i} data-reveal="line" className="overflow-visible">
                <h1
                  className="font-display font-bold leading-[1.1] tracking-tight"
                  style={{ fontSize: "clamp(2.6rem, 5.5vw, 5rem)" }}
                >
                  {i === lines.length - 1 ? (
                    <span
                      className="inline-block"
                      style={{
                        WebkitTextFillColor: "transparent",
                        backgroundImage: "linear-gradient(120deg, #C9A227 0%, #E8C766 50%, #C9A227 100%)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        backgroundSize: "200%",
                      }}
                    >
                      {line}
                    </span>
                  ) : (
                    <span className="text-white">{line}</span>
                  )}
                </h1>
              </div>
            ))}
          </div>

          {/* Gold swoosh */}
          <div data-reveal="line" className="mb-10 mt-2">
            <svg viewBox="0 0 480 16" className="w-72 h-4" fill="none" aria-hidden="true">
              <path
                ref={swooshRef}
                d="M0 8 C80 2, 160 14, 240 8 C320 2, 400 13, 480 8"
                stroke="url(#swGrad)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="swGrad" x1="0" y1="0" x2="480" y2="0" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#C9A227" stopOpacity="0"/>
                  <stop offset="20%" stopColor="#C9A227" stopOpacity="0.8"/>
                  <stop offset="60%" stopColor="#E8C766"/>
                  <stop offset="100%" stopColor="#E8C766" stopOpacity="0"/>
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Subheadline */}
          <p
            data-reveal="sub"
            className="text-white/55 text-lg leading-[1.85] mb-12 max-w-[52ch]"
          >
            {t("subheadline")}
          </p>

          {/* CTAs */}
          <div data-reveal="cta" className="flex flex-wrap gap-4 items-center">
            <Link
              href={localHref("/services")}
              className="btn-primary text-sm px-8 py-3.5 gap-2"
            >
              {t("cta")}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
              </svg>
            </Link>
            <Link
              href={localHref("/contact")}
              className="btn-outline text-sm px-8 py-3.5"
            >
              {t("ctaSecondary")}
            </Link>
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        data-reveal="scroll"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10 opacity-0"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-[--gold-600] opacity-60" />
        <div className="w-4 h-4 rounded-full border border-[--gold-600]/50 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-[--gold-500]" style={{ animation: "scroll-pulse 2s ease-in-out infinite" }} />
        </div>
      </div>

      <style>{`
        @keyframes scroll-pulse {
          0%, 100% { opacity: 1; transform: translateY(0); }
          50% { opacity: 0.4; transform: translateY(4px); }
        }
      `}</style>
    </section>
  );
}
