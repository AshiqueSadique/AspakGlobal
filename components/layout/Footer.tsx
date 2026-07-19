"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const locale = useLocale();
  const year = new Date().getFullYear();

  function localHref(path: string) {
    return `/${locale}${path}`;
  }

  return (
    <footer style={{ background: "linear-gradient(180deg, #eef0f4 0%, #e8eaef 100%)", color: "#2a3a52" }}>
      {/* Gold divider top */}
      <div className="gold-divider" />

      <div className="container" style={{ paddingTop: "calc(4rem + 8px)", paddingBottom: "4rem" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href={localHref("/")} className="flex items-center gap-3 mb-5 group">
              <div className="w-12 h-12 flex-shrink-0 transition-transform duration-500 group-hover:scale-105"
                style={{ background: "#1a2f50", borderRadius: 10, padding: 4 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/aspak-logo.png"
                  alt="Aspak Global logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                  style={{ mixBlendMode: "screen" }}
                />
              </div>
              <div>
                <div className="font-display font-bold text-base leading-tight" style={{ color: "#1a2f50" }}>Aspak Global Co., Ltd.</div>
                <div className="text-xs mt-0.5" style={{ color: "#a07818" }}>บริษัท แอสแพค โกลบอล จำกัด</div>
              </div>
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: "#4a5f7a" }}>{t("description")}</p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display font-semibold text-sm tracking-wider uppercase mb-5" style={{ color: "#1a2f50" }}>
              {t("services")}
            </h3>
            <ul className="flex flex-col gap-3 text-sm">
              {[
                { label: t("links.itSolutions"), href: "/services/it-solutions" },
                { label: t("links.importExport"), href: "/services/import-export" },
                { label: t("links.packaging"), href: "/services/packaging-paper" },
                { label: t("links.officeSupply"), href: "/services/office-supply" },
                { label: t("links.cleaning"), href: "/services/cleaning" },
              ].map(({ label, href }) => (
                <li key={href} className="flex items-center gap-2">
                  <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#C9A227", flexShrink: 0, display: "inline-block" }} />
                  <Link href={localHref(href)} className="transition-colors duration-200" style={{ color: "#4a5f7a" }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#a07818"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#4a5f7a"}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-display font-semibold text-sm tracking-wider uppercase mb-5" style={{ color: "#1a2f50" }}>
              {t("company")}
            </h3>
            <ul className="flex flex-col gap-3 text-sm">
              {[
                { label: t("links.about"), href: "/about" },
                { label: t("links.services"), href: "/services" },
                { label: t("links.contact"), href: "/contact" },
              ].map(({ label, href }) => (
                <li key={href} className="flex items-center gap-2">
                  <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#C9A227", flexShrink: 0, display: "inline-block" }} />
                  <Link href={localHref(href)} className="transition-colors duration-200" style={{ color: "#4a5f7a" }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#a07818"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#4a5f7a"}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold text-sm tracking-wider uppercase mb-5" style={{ color: "#1a2f50" }}>
              {t("contact")}
            </h3>
            <div className="flex flex-col gap-4 text-sm">
              <a href="tel:+6620000000" className="flex items-start gap-3 transition-colors duration-200" style={{ color: "#4a5f7a" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#a07818"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#4a5f7a"}>
                <PhoneIcon />
                <span>+66 2 XXX XXXX</span>
              </a>
              <a href="mailto:contact@aspakglobal.com" className="flex items-start gap-3 transition-colors duration-200" style={{ color: "#4a5f7a" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#a07818"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#4a5f7a"}>
                <EmailIcon />
                <span>contact@aspakglobal.com</span>
              </a>
              <a href="https://line.me/R/ti/p/@aspakglobal" target="_blank" rel="noopener noreferrer"
                className="flex items-start gap-3 transition-colors duration-200" style={{ color: "#4a5f7a" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#a07818"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#4a5f7a"}>
                <LineIcon />
                <span>LINE: @aspakglobal</span>
              </a>
              <div className="flex items-start gap-3 pt-1">
                <MapIcon />
                <span className="text-xs leading-relaxed" style={{ color: "#6a7f9a" }}>
                  No. 1, Soi Pracha Uthit 79 Yaek 1,<br />Thung Khru, Bangkok 10140
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(26,47,80,0.12)" }}>
        <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs" style={{ color: "#8a9fb8" }}>
          <span>{t("copyright", { year })}</span>
          <Link href={localHref("/")} className="transition-colors duration-200"
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#a07818"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#8a9fb8"}>
            {t("links.privacy")}
          </Link>
        </div>
      </div>
    </footer>
  );
}

function PhoneIcon() {
  return (
    <svg className="w-4 h-4 flex-shrink-0" style={{ color: "#C9A227" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/>
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg className="w-4 h-4 flex-shrink-0" style={{ color: "#C9A227" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
    </svg>
  );
}

function LineIcon() {
  return (
    <svg className="w-4 h-4 text-[#06C755] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.365 9.89c.50 0 .904.402.904.9s-.404.9-.904.9h-2.19v1.25h2.19c.50 0 .904.403.904.902 0 .498-.404.9-.904.9h-3.092a.902.902 0 01-.902-.9V7.988c0-.498.404-.9.902-.9h3.092c.50 0 .904.402.904.9s-.404.9-.904.9h-2.19v1.001h2.19zm-5.477 3.95a.9.9 0 01-.593.852.915.915 0 01-.987-.193l-2.888-3.15v2.49a.9.9 0 01-.902.9.9.9 0 01-.902-.9V7.988a.9.9 0 01.593-.852.915.915 0 01.987.193l2.888 3.15V7.988a.9.9 0 01.902-.9.9.9 0 01.902.9v5.852zm-6.386.9a.9.9 0 01-.902.9.9.9 0 01-.902-.9V7.988a.9.9 0 01.902-.9.9.9 0 01.902.9v5.852zm-3.09-6.752h-.001a.9.9 0 00-.901.9v5.852a.9.9 0 00.902.9h3.091a.9.9 0 000-1.8H5.31v-4.952h2.19a.9.9 0 000-1.8H4.411v-.1zM24 10.27C24 4.608 18.615 0 12 0S0 4.608 0 10.27c0 5.079 4.504 9.336 10.588 10.142.412.088.974.272 1.116.623.128.32.084.82.04 1.143l-.18 1.085c-.055.32-.254 1.25 1.095.68 1.35-.567 7.284-4.29 9.942-7.346C23.36 14.61 24 12.514 24 10.27z"/>
    </svg>
  );
}

function MapIcon() {
  return (
    <svg className="w-4 h-4 text-[--gold-600] inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
    </svg>
  );
}
