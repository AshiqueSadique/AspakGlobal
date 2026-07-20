"use client";

import { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import gsap from "gsap";

export default function HeroSection() {
  const t = useTranslations("home.hero");
  const locale = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const logoRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const localHref = (p: string) => `/${locale}${p}`;

  // ── Particle field canvas ──────────────────────────────────────
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    let W = 0, H = 0;
    const particles: Array<{
      x: number; y: number; z: number;
      vx: number; vy: number; vz: number;
      r: number; gold: boolean;
    }> = [];

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    // Spawn particles
    const N = Math.min(120, Math.floor((W * H) / 12000));
    for (let i = 0; i < N; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        z: Math.random(),
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.15,
        vz: (Math.random() - 0.5) * 0.002,
        r: Math.random() * 1.8 + 0.3,
        gold: Math.random() < 0.25,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      const mx = mouseRef.current.x * W;
      const my = mouseRef.current.y * H;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.z = Math.max(0.1, Math.min(1, p.z + p.vz));

        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        if (p.y > H + 10) p.y = -10;

        const scale = 0.4 + p.z * 0.6;
        const alpha = 0.15 + p.z * 0.55;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * scale, 0, Math.PI * 2);
        ctx.fillStyle = p.gold
          ? `rgba(201,162,39,${alpha})`
          : `rgba(100,150,220,${alpha * 0.7})`;
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const lineAlpha = (1 - dist / 120) * 0.08;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(201,162,39,${lineAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Mouse repulsion
        const mdx = p.x - mx;
        const mdy = p.y - my;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 150) {
          const force = (1 - mdist / 150) * 0.4;
          p.vx += (mdx / mdist) * force;
          p.vy += (mdy / mdist) * force;
        }

        // Dampen velocity
        p.vx *= 0.98;
        p.vy *= 0.98;
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // ── Mouse parallax ─────────────────────────────────────────────
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
      if (logoRef.current) {
        const dx = (e.clientX / window.innerWidth - 0.5) * 24;
        const dy = (e.clientY / window.innerHeight - 0.5) * 16;
        gsap.to(logoRef.current, { x: dx, y: dy, duration: 1.2, ease: "power2.out" });
      }
    };
    el.addEventListener("mousemove", onMove, { passive: true });
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  // ── Canvas init ────────────────────────────────────────────────
  useEffect(() => {
    const cleanup = initCanvas();
    return cleanup;
  }, [initCanvas]);

  // ── Entry animation ────────────────────────────────────────────
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const reveals = el.querySelectorAll("[data-r]");
    if (prefersReduced) {
      gsap.set(reveals, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(reveals, { opacity: 0, y: 40 });
    const tl = gsap.timeline({ delay: 0.1 });
    tl.to(el.querySelector("[data-r='logo']"), { opacity: 1, y: 0, duration: 1.4, ease: "expo.out" })
      .to(el.querySelector("[data-r='eyebrow']"), { opacity: 1, y: 0, duration: 1.2, ease: "expo.out" }, "-=0.8")
      .to(el.querySelectorAll("[data-r='line']"), { opacity: 1, y: 0, duration: 1.5, stagger: 0.14, ease: "expo.out" }, "-=0.7")
      .to(el.querySelector("[data-r='sub']"), { opacity: 1, y: 0, duration: 1.2, ease: "expo.out" }, "-=0.6")
      .to(el.querySelector("[data-r='cta']"), { opacity: 1, y: 0, duration: 1.0, ease: "expo.out" }, "-=0.5")
      .to(el.querySelector("[data-r='scroll']"), { opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.2");

    return () => { tl.kill(); };
  }, []);

  const lines = t("headline").split("\n");

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
      style={{ background: "linear-gradient(135deg, #050d1a 0%, #091628 40%, #0d1e38 70%, #07121f 100%)" }}
    >
      {/* ── Particle canvas ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.9 }}
      />

      {/* ── Radial glow spots ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div style={{
          position: "absolute", top: "5%", right: "8%",
          width: "600px", height: "600px",
          background: "radial-gradient(circle, rgba(201,162,39,0.09) 0%, transparent 65%)",
          borderRadius: "50%",
          animation: "orb1 14s ease-in-out infinite alternate",
        }} />
        <div style={{
          position: "absolute", bottom: "0%", left: "-5%",
          width: "500px", height: "500px",
          background: "radial-gradient(circle, rgba(36,95,168,0.14) 0%, transparent 65%)",
          borderRadius: "50%",
          animation: "orb2 18s ease-in-out infinite alternate",
        }} />
        <div style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          width: "800px", height: "800px",
          background: "radial-gradient(circle, rgba(201,162,39,0.03) 0%, transparent 60%)",
          borderRadius: "50%",
        }} />
      </div>

      {/* ── Noise texture overlay ── */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "200px" }}
      />

      {/* ── Fine grid ── */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }} />

      {/* ── Horizontal gold lines ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[20, 50, 78].map((pct) => (
          <div key={pct} style={{
            position: "absolute", top: `${pct}%`, left: 0, right: 0,
            height: "1px",
            background: `linear-gradient(90deg, transparent, rgba(201,162,39,${pct === 50 ? 0.12 : 0.05}) 30%, rgba(201,162,39,${pct === 50 ? 0.2 : 0.08}) 50%, rgba(201,162,39,${pct === 50 ? 0.12 : 0.05}) 70%, transparent)`,
          }} />
        ))}
      </div>

      {/* ── Main content — centered layout ── */}
      <div className="container relative z-10 flex flex-col items-center text-center pt-48 pb-24">

        {/* Logo — parallax target */}
        <div ref={logoRef} data-r="logo" className="mb-10" style={{ opacity: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/aspak-logo.png"
            alt="Aspak Global Co., Ltd."
            width={256}
            height={205}
            className="w-52 md:w-64 h-auto object-contain drop-shadow-2xl"
            style={{ mixBlendMode: "screen", filter: "drop-shadow(0 0 40px rgba(201,162,39,0.3))" }}
          />
        </div>

        {/* Eyebrow */}
        <div data-r="eyebrow" className="flex items-center gap-3 mb-7" style={{ opacity: 0 }}>
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-[--gold-600]" />
          <span className="text-[--gold-500] text-xs font-bold tracking-[0.3em] uppercase">
            {t("eyebrow")}
          </span>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-[--gold-600]" />
        </div>

        {/* Headline — large, centred */}
        <div className="mb-8 space-y-0">
          {lines.map((line, i) => (
            <div key={i} data-r="line" className="overflow-visible" style={{ opacity: 0 }}>
              <h1
                className="font-display font-bold leading-[1.05] tracking-tight"
                style={{ fontSize: "clamp(2.2rem, 5vw, 4.8rem)" }}
              >
                {i === lines.length - 1 ? (
                  <span style={{
                    WebkitTextFillColor: "transparent",
                    backgroundImage: "linear-gradient(120deg, #C9A227 0%, #F0D060 40%, #E8C766 60%, #C9A227 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    backgroundSize: "200%",
                    animation: "shimmer 4s linear infinite",
                  }}>
                    {line}
                  </span>
                ) : (
                  <span className="text-white">{line}</span>
                )}
              </h1>
            </div>
          ))}
        </div>

        {/* Elegant accent — diamond + lines + travelling spark */}
        <div data-r="sub" className="flex items-center justify-center gap-3 mb-10" style={{ opacity: 0 }}>
          {/* Left line with fade */}
          <div className="relative h-px w-24 overflow-hidden rounded-full">
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent, rgba(201,162,39,0.6))" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.9) 50%, transparent 100%)", animation: "spark-l 3s ease-in-out infinite 0.5s" }} />
          </div>
          {/* Diamond gem */}
          <div className="relative flex items-center justify-center" style={{ width: 20, height: 20 }}>
            <div style={{
              width: 8, height: 8,
              background: "linear-gradient(135deg, #F0D060, #C9A227)",
              transform: "rotate(45deg)",
              boxShadow: "0 0 12px rgba(201,162,39,0.8), 0 0 24px rgba(201,162,39,0.4)",
              animation: "gem-pulse 2.5s ease-in-out infinite",
            }} />
          </div>
          {/* Centre word */}
          <span style={{ color: "#C9A227", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase" }}>
            Aspak Global
          </span>
          {/* Right diamond */}
          <div className="relative flex items-center justify-center" style={{ width: 20, height: 20 }}>
            <div style={{
              width: 8, height: 8,
              background: "linear-gradient(135deg, #C9A227, #F0D060)",
              transform: "rotate(45deg)",
              boxShadow: "0 0 12px rgba(201,162,39,0.8), 0 0 24px rgba(201,162,39,0.4)",
              animation: "gem-pulse 2.5s ease-in-out infinite 1.25s",
            }} />
          </div>
          {/* Right line */}
          <div className="relative h-px w-24 overflow-hidden rounded-full">
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to left, transparent, rgba(201,162,39,0.6))" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.9) 50%, transparent 100%)", animation: "spark-r 3s ease-in-out infinite 1.5s" }} />
          </div>
        </div>

        {/* Subheadline */}
        <p data-r="sub" className="text-lg leading-[1.85] mb-12 max-w-[46ch]" style={{ opacity: 0, color: "#b8cce0" }}>
          {t("subheadline")}
        </p>

        {/* CTAs */}
        <div data-r="cta" className="flex flex-wrap justify-center gap-4" style={{ opacity: 0 }}>
          <Link href={localHref("/services")} className="btn-primary text-sm px-9 py-4 gap-2 group">
            {t("cta")}
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
            </svg>
          </Link>
          <Link href={localHref("/contact")} className="btn-outline text-sm px-9 py-4">
            {t("ctaSecondary")}
          </Link>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div data-r="scroll" className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10" style={{ opacity: 0 }}>
        <span className="text-white/30 text-[10px] tracking-[0.25em] uppercase font-medium">Scroll</span>
        <div className="w-px h-14 relative overflow-hidden">
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, transparent, #C9A227, transparent)",
            animation: "scroll-line 2s ease-in-out infinite",
          }} />
        </div>
      </div>

      <style>{`
        @keyframes orb1 { from { transform: translate(0,0) scale(1); } to { transform: translate(-30px, 40px) scale(1.15); } }
        @keyframes orb2 { from { transform: translate(0,0) scale(1); } to { transform: translate(40px, -30px) scale(1.2); } }
        @keyframes shimmer { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }
        @keyframes scroll-line {
          0% { transform: translateY(-100%); opacity: 0; }
          30% { opacity: 1; }
          70% { opacity: 1; }
          100% { transform: translateY(100%); opacity: 0; }
        }
        @keyframes spark-l {
          0%   { transform: translateX(-120%); opacity: 0; }
          15%  { opacity: 1; }
          85%  { opacity: 1; }
          100% { transform: translateX(120%); opacity: 0; }
        }
        @keyframes spark-r {
          0%   { transform: translateX(-120%); opacity: 0; }
          15%  { opacity: 1; }
          85%  { opacity: 1; }
          100% { transform: translateX(120%); opacity: 0; }
        }
        @keyframes gem-pulse {
          0%, 100% { transform: rotate(45deg) scale(1); box-shadow: 0 0 12px rgba(201,162,39,0.8), 0 0 24px rgba(201,162,39,0.4); }
          50%       { transform: rotate(45deg) scale(1.25); box-shadow: 0 0 20px rgba(240,208,96,1), 0 0 40px rgba(201,162,39,0.6); }
        }
      `}</style>
    </section>
  );
}
