"use client";

import { useTranslations } from "next-intl";

export default function MissionVision() {
  const t = useTranslations("about.mission");

  return (
    <section className="section-pad bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <span className="section-label">{t("label")}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Mission */}
          <div className="rounded-2xl p-8 bg-[--navy-900] text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 opacity-10"
              style={{ backgroundImage: "radial-gradient(circle, #C9A227, transparent 70%)" }} />
            <div className="w-12 h-12 rounded-xl bg-[--gold-600]/20 flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-[--gold-400]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/>
              </svg>
            </div>
            <h3 className="font-display font-bold text-[--gold-400] mb-3 text-xl">{t("missionTitle")}</h3>
            <p className="text-white/70 leading-relaxed max-w-none">{t("missionBody")}</p>
          </div>

          {/* Vision */}
          <div className="rounded-2xl p-8 border-2 border-[--gold-600] bg-[--gold-100] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 opacity-10"
              style={{ backgroundImage: "radial-gradient(circle, #123A6B, transparent 70%)" }} />
            <div className="w-12 h-12 rounded-xl bg-[--navy-800]/10 flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-[--navy-800]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </div>
            <h3 className="font-display font-bold text-[--navy-900] mb-3 text-xl">{t("visionTitle")}</h3>
            <p className="text-[--navy-700] leading-relaxed max-w-none">{t("visionBody")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
