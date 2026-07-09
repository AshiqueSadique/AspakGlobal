"use client";

import { useTranslations } from "next-intl";

export default function LeadershipSection() {
  const t = useTranslations("about.leadership");
  const d = useTranslations("about.leadership.director");

  return (
    <section className="section-pad bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <span className="section-label">{t("label")}</span>
          <h2 className="mt-3 font-display font-bold text-[--navy-900]">{t("heading")}</h2>
        </div>

        <div className="max-w-md mx-auto">
          <div className="rounded-2xl border border-[--grey-200] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            {/* Avatar placeholder */}
            <div className="h-56 bg-gradient-to-br from-[--navy-800] to-[--navy-950] flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-[--gold-600]/20 border-2 border-[--gold-400] flex items-center justify-center">
                <svg className="w-12 h-12 text-[--gold-400]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>
                </svg>
              </div>
            </div>
            <div className="p-6 text-center">
              <div className="inline-block px-3 py-1 rounded-full bg-[--gold-100] text-[--gold-700] text-xs font-semibold mb-3">
                {d("title")}
              </div>
              <h3 className="font-display font-bold text-[--navy-900] text-xl mb-3">{d("name")}</h3>
              <p className="text-sm text-[--color-text-muted] leading-relaxed max-w-none">{d("bio")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
