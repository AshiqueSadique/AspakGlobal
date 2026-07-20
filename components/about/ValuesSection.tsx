"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ValueItem = { title: string; description: string };

const VALUE_ICONS = [
  <svg key="integrity" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 003 12.5c0 3.136 1.215 5.984 3.205 8.083m3.695-15.12a11.955 11.955 0 016.1 0m3.705 15.12A11.972 11.972 0 0121 12.5a11.955 11.955 0 00-.598-6 11.959 11.959 0 01-3.402-1.536m-6.6 15.12a11.978 11.978 0 006.6 0"/></svg>,
  <svg key="excellence" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/></svg>,
  <svg key="partnership" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/></svg>,
  <svg key="innovation" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"/></svg>,
];

export default function ValuesSection() {
  const t = useTranslations("about.values");
  const items = t.raw("items") as ValueItem[];
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cards = el.querySelectorAll("[data-vcard]");
    gsap.set(cards, { opacity: 0, y: 36 });
    ScrollTrigger.create({
      trigger: el, start: "top 80%",
      onEnter: () => gsap.to(cards, { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: "expo.out" }),
      once: true,
    });
  }, []);

  return (
    <section ref={ref} className="section-pad" style={{ background: "linear-gradient(180deg, #f8fafc 0%, #eef1f7 100%)" }}>
      <div className="container">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.25em] uppercase mb-4" style={{
            background: "rgba(201,162,39,0.1)", color: "#a07818", border: "1px solid rgba(201,162,39,0.3)",
          }}>{t("label")}</span>
          <h2 className="font-display font-bold mt-2" style={{ color: "#0d1e38", fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)" }}>
            {t("heading")}
          </h2>
          {/* Shimmer divider */}
          <div className="relative w-16 h-0.5 mx-auto mt-4 overflow-hidden rounded-full">
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent, #C9A227, transparent)" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent 20%, rgba(255,255,255,0.9) 50%, transparent 80%)", animation: "shimmer-line 2.5s ease-in-out infinite" }} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <div
              key={i}
              data-vcard
              className="relative rounded-2xl p-6 text-center cursor-default"
              style={{
                background: "#ffffff",
                border: "1.5px solid rgba(9,22,40,0.07)",
                boxShadow: "0 2px 16px rgba(9,22,40,0.05)",
                transition: "transform 0.4s cubic-bezier(0.34,1.4,0.64,1), box-shadow 0.4s, border-color 0.3s",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(-8px) scale(1.02)";
                el.style.boxShadow = "0 20px 48px rgba(9,22,40,0.12)";
                el.style.borderColor = "rgba(201,162,39,0.5)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "";
                el.style.boxShadow = "0 2px 16px rgba(9,22,40,0.05)";
                el.style.borderColor = "rgba(9,22,40,0.07)";
              }}
            >
              {/* Gold top line on hover — always rendered, opacity toggled */}
              <div className="absolute top-0 left-6 right-6 h-0.5 rounded-full" style={{
                background: "linear-gradient(90deg, transparent, #C9A227, transparent)",
                opacity: 0,
                transition: "opacity 0.3s",
              }} ref={el => { if (el) { const p = el.parentElement; p?.addEventListener("mouseenter", () => el.style.opacity = "1"); p?.addEventListener("mouseleave", () => el.style.opacity = "0"); }}} />

              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{
                background: "linear-gradient(135deg, rgba(201,162,39,0.12) 0%, rgba(201,162,39,0.06) 100%)",
                border: "1.5px solid rgba(201,162,39,0.35)",
                color: "#C9A227",
                transition: "background 0.3s, transform 0.3s",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "linear-gradient(135deg, rgba(201,162,39,0.25), rgba(201,162,39,0.15))"; (e.currentTarget as HTMLElement).style.transform = "scale(1.1) rotate(5deg)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "linear-gradient(135deg, rgba(201,162,39,0.12), rgba(201,162,39,0.06))"; (e.currentTarget as HTMLElement).style.transform = ""; }}
              >
                {VALUE_ICONS[i % VALUE_ICONS.length]}
              </div>
              <h3 className="font-display font-bold text-base mb-2" style={{ color: "#0d1e38" }}>{item.title}</h3>
              <p className="text-sm leading-relaxed max-w-none" style={{ color: "#4a5f7a" }}>{item.description}</p>
            </div>
          ))}
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
