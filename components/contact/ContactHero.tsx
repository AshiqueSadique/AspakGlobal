"use client";

import { useTranslations } from "next-intl";

export default function ContactHero() {
  const t = useTranslations("contact.hero");

  return (
    <section className="relative pt-36 pb-24 bg-[--navy-950] overflow-hidden">
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: "radial-gradient(ellipse at 30% 50%, #C9A227, transparent 60%)" }} />
      <div className="container relative z-10 max-w-3xl text-center mx-auto">
        <span className="section-label text-[--gold-400] block mb-4">{t("label")}</span>
        <h1 className="font-display font-bold text-white whitespace-pre-line mb-6"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
          {t("heading")}
        </h1>
        <p className="text-white/60 leading-relaxed text-lg max-w-none">{t("body")}</p>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" className="w-full h-12 block" preserveAspectRatio="none">
          <path d="M0,30 Q360,60 720,30 Q1080,0 1440,30 L1440,60 L0,60 Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}
