"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

const SERVICE_LINKS = [
  { key: "hub", href: "/services" },
  { key: "itSolutions", href: "/services/it-solutions" },
  { key: "importExport", href: "/services/import-export" },
  { key: "packaging", href: "/services/packaging-paper" },
  { key: "officeSupply", href: "/services/office-supply" },
  { key: "cleaning", href: "/services/cleaning" },
] as const;

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const strippedPath = pathname.replace(/^\/(en|th)/, "") || "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close services dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function switchLocale() {
    const nextLocale = locale === "en" ? "th" : "en";
    document.cookie = `NEXT_LOCALE=${nextLocale};max-age=${60 * 60 * 24 * 365};path=/`;
    router.push(`/${nextLocale}${strippedPath}`);
    setMenuOpen(false);
  }

  function localHref(path: string) {
    return `/${locale}${path}`;
  }

  const isActive = (path: string) =>
    strippedPath === path || (path !== "/" && strippedPath.startsWith(path));

  const LangPill = ({ className = "" }: { className?: string }) => (
    <button
      onClick={switchLocale}
      aria-label={locale === "en" ? "Switch to Thai" : "เปลี่ยนเป็นภาษาอังกฤษ"}
      className={`flex items-center gap-0 rounded-full border transition-all duration-300 overflow-hidden ${
        scrolled || menuOpen
          ? "border-white/20 hover:border-[--gold-400]"
          : "border-white/25 hover:border-[--gold-400]"
      } ${className}`}
    >
      <span
        className={`px-3 py-1.5 text-xs font-bold tracking-wider transition-all duration-300 ${
          locale === "en"
            ? "bg-[--gold-600] text-[--navy-950]"
            : "text-white/50 hover:text-white/80"
        }`}
      >
        EN
      </span>
      <span className="w-px h-4 bg-white/15 self-center" />
      <span
        className={`px-3 py-1.5 text-xs font-bold tracking-wider transition-all duration-300 ${
          locale === "th"
            ? "bg-[--gold-600] text-[--navy-950]"
            : "text-white/50 hover:text-white/80"
        }`}
      >
        TH
      </span>
    </button>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[--navy-950]/96 backdrop-blur-lg shadow-xl py-3"
          : "bg-gradient-to-b from-black/40 to-transparent py-5"
      }`}
    >
      <div className="container flex items-center justify-between gap-4">

        {/* ── Logo ── */}
        <Link href={localHref("/")} className="flex items-center gap-2.5 flex-shrink-0 group">
          {/* Icon mark */}
          <div className="w-10 h-10 flex-shrink-0 transition-transform duration-500 group-hover:scale-105">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/aspak-logo.png"
              alt="Aspak Global logo mark"
              width={40}
              height={40}
              className="w-full h-full object-contain"
              style={{ mixBlendMode: "screen" }}
            />
          </div>
          {/* Wordmark text */}
          <div className="leading-none">
            <div className="font-display font-bold text-white text-sm tracking-wide group-hover:text-[--gold-300] transition-colors duration-300">
              Aspak Global
            </div>
            <div className="text-[10px] text-[--gold-500] font-medium tracking-widest">
              Co., Ltd.
            </div>
          </div>
        </Link>

        {/* ── Desktop Nav ── */}
        <nav className="hidden lg:flex items-center gap-7" aria-label="Main navigation">
          {[
            { label: t("home"), href: "/" },
            { label: t("about"), href: "/about" },
          ].map(({ label, href }) => (
            <Link key={href} href={localHref(href)}
              className={`text-sm font-medium transition-colors duration-200 hover:text-[--gold-400] ${
                isActive(href) && (href !== "/" || strippedPath === "/")
                  ? "text-[--gold-400]"
                  : "text-white/75"
              }`}>
              {label}
            </Link>
          ))}

          {/* Services dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setServicesOpen((v) => !v)}
              className={`flex items-center gap-1 text-sm font-medium transition-colors duration-200 hover:text-[--gold-400] ${
                isActive("/services") ? "text-[--gold-400]" : "text-white/75"
              }`}
              aria-haspopup="true"
              aria-expanded={servicesOpen}
            >
              {t("services")}
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>

            {/* Dropdown panel */}
            <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 w-60 transition-all duration-200 origin-top ${
              servicesOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
            }`}>
              <div className="bg-[--navy-900] border border-white/10 rounded-xl shadow-2xl overflow-hidden">
                {SERVICE_LINKS.map(({ key, href }) => (
                  <Link key={key} href={localHref(href)}
                    onClick={() => setServicesOpen(false)}
                    className="flex items-center gap-2 px-4 py-3 text-sm text-white/70 hover:text-[--gold-400] hover:bg-white/5 transition-all duration-150 border-b border-white/5 last:border-0">
                    <span className="w-1 h-1 rounded-full bg-[--gold-600] opacity-60" />
                    {t(`servicesMenu.${key}`)}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link href={localHref("/contact")}
            className={`text-sm font-medium transition-colors duration-200 hover:text-[--gold-400] ${
              isActive("/contact") ? "text-[--gold-400]" : "text-white/75"
            }`}>
            {t("contact")}
          </Link>
        </nav>

        {/* ── Right: lang toggle + CTA + hamburger ── */}
        <div className="flex items-center gap-3">
          {/* Language toggle — always visible on all sizes */}
          <LangPill />

          {/* Desktop CTA */}
          <Link href={localHref("/contact")}
            className="hidden lg:inline-flex btn-primary text-sm px-5 py-2">
            {t("contact")}
          </Link>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden flex flex-col justify-center gap-[5px] w-9 h-9"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className={`block h-0.5 bg-white rounded-full transition-all duration-300 origin-center ${menuOpen ? "w-6 rotate-45 translate-y-[7px]" : "w-6"}`}/>
            <span className={`block h-0.5 bg-white rounded-full transition-all duration-200 ${menuOpen ? "w-0 opacity-0" : "w-5"}`}/>
            <span className={`block h-0.5 bg-white rounded-full transition-all duration-300 origin-center ${menuOpen ? "w-6 -rotate-45 -translate-y-[7px]" : "w-4"}`}/>
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      <div className={`lg:hidden overflow-hidden transition-all duration-400 ${menuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}>
        <nav className="container pt-4 pb-6 flex flex-col gap-1 border-t border-white/10 mt-3" aria-label="Mobile navigation">
          {[
            { label: t("home"), href: "/" },
            { label: t("about"), href: "/about" },
            { label: t("contact"), href: "/contact" },
          ].map(({ label, href }) => (
            <Link key={href} href={localHref(href)}
              className="block py-3 text-white/80 hover:text-[--gold-400] text-sm font-medium border-b border-white/5 transition-colors"
              onClick={() => setMenuOpen(false)}>
              {label}
            </Link>
          ))}

          <div className="pt-2 pb-1">
            <div className="text-[10px] text-[--gold-500] font-bold tracking-[0.2em] uppercase mb-2 pl-0.5">
              {t("services")}
            </div>
            {SERVICE_LINKS.map(({ key, href }) => (
              <Link key={key} href={localHref(href)}
                className="flex items-center gap-2 py-2.5 text-sm text-white/60 hover:text-[--gold-400] transition-colors"
                onClick={() => setMenuOpen(false)}>
                <span className="w-1 h-1 rounded-full bg-[--gold-600] flex-shrink-0" />
                {t(`servicesMenu.${key}`)}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
