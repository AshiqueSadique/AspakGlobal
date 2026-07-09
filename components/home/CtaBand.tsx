"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export default function CtaBand() {
  const t = useTranslations("home.cta");
  const locale = useLocale();

  return (
    <section className="py-20 relative overflow-hidden bg-[--navy-900]">
      {/* Decorative */}
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #C9A227 0%, transparent 60%), radial-gradient(circle at 80% 50%, #245FA8 0%, transparent 60%)" }} />

      <div className="container relative z-10 text-center">
        <div className="gold-divider mb-12 max-w-xs mx-auto" />
        <h2 className="font-display font-bold text-white mb-4 max-w-2xl mx-auto">
          {t("heading")}
        </h2>
        <p className="text-white/60 mb-10 max-w-xl mx-auto leading-relaxed">
          {t("body")}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href={`/${locale}/contact`} className="btn-primary px-10 py-4 text-base">
            {t("btn")}
          </Link>
          <Link href={`/${locale}/about`} className="btn-outline px-10 py-4 text-base">
            {t("btnSecondary")}
          </Link>
        </div>
        <div className="gold-divider mt-12 max-w-xs mx-auto" />
      </div>
    </section>
  );
}
