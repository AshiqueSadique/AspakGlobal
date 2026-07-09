"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useLocale } from "next-intl";

export default function NotFound() {
  const t = useTranslations("notFound");
  const locale = useLocale();

  return (
    <div className="min-h-screen bg-[--navy-950] flex items-center justify-center px-6 relative overflow-hidden">
      {/* Decorative particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-10"
            style={{
              width: `${4 + (i % 4) * 3}px`,
              height: `${4 + (i % 4) * 3}px`,
              background: i % 2 === 0 ? "#C9A227" : "#245FA8",
              left: `${5 + (i * 4.7) % 90}%`,
              top: `${10 + (i * 7.3) % 80}%`,
            }}
          />
        ))}
      </div>

      <div className="relative text-center max-w-lg">
        {/* 404 */}
        <div
          className="font-display font-bold leading-none mb-4 select-none"
          style={{
            fontSize: "clamp(6rem, 20vw, 10rem)",
            WebkitTextFillColor: "transparent",
            backgroundImage: "linear-gradient(135deg, #C9A227, #E8C766)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
          aria-label={t("label")}
        >
          {t("label")}
        </div>

        {/* AG monogram with CSS animation */}
        <div className="flex justify-center mb-8">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #123A6B, #245FA8)",
              border: "2px solid rgba(201,162,39,0.4)",
              animation: "ag-bounce 2s infinite",
            }}
          >
            <span
              className="font-display font-bold text-lg"
              style={{ color: "#E8C766" }}
            >
              AG
            </span>
          </div>
        </div>

        <h1 className="font-display font-bold text-white text-2xl mb-4">{t("heading")}</h1>
        <p className="text-white/60 mb-10 leading-relaxed">{t("body")}</p>

        <Link
          href={`/${locale}`}
          className="btn-primary inline-flex items-center gap-2 px-8 py-3.5"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/>
          </svg>
          {t("btn")}
        </Link>
      </div>

      <style>{`
        @keyframes ag-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
      `}</style>
    </div>
  );
}
