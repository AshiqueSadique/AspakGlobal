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

  const LangPill = ({ className = "" }: { className?: string }) => {
    const isEN = locale === "en";
    // Fixed dimensions — never change on toggle
    const W = 72, H = 28, KNOB = 22, PAD = 3;
    return (
      <button
        onClick={switchLocale}
        aria-label={isEN ? "Switch to Thai" : "เปลี่ยนเป็นภาษาอังกฤษ"}
        className={className}
        style={{
          position: "relative",
          width: W,
          height: H,
          borderRadius: 999,
          flexShrink: 0,
          cursor: "pointer",
          // Neumorphic sunken track
          background: "linear-gradient(145deg, #07111f 0%, #0d1e38 60%, #112244 100%)",
          boxShadow: [
            "inset 3px 3px 7px rgba(0,0,0,0.6)",
            "inset -2px -2px 5px rgba(255,255,255,0.04)",
            "0 1px 0 rgba(255,255,255,0.06)",
          ].join(", "),
          border: "1px solid rgba(255,255,255,0.07)",
          transition: "box-shadow 0.4s",
        }}
      >

        {/* OFF label (left when TH active) */}
        <span style={{
          position: "absolute",
          left: 11,
          top: "50%",
          transform: "translateY(-50%)",
          fontSize: "0.58rem",
          fontWeight: 700,
          letterSpacing: "0.1em",
          color: isEN ? "rgba(184,204,224,0.55)" : "rgba(255,255,255,0.9)",
          transition: "color 0.35s",
          pointerEvents: "none",
          userSelect: "none",
        }}>TH</span>

        {/* ON label (right when EN active) */}
        <span style={{
          position: "absolute",
          right: 11,
          top: "50%",
          transform: "translateY(-50%)",
          fontSize: "0.58rem",
          fontWeight: 700,
          letterSpacing: "0.1em",
          color: isEN ? "rgba(255,255,255,0.95)" : "rgba(184,204,224,0.55)",
          transition: "color 0.35s",
          pointerEvents: "none",
          userSelect: "none",
        }}>EN</span>

        {/* Neumorphic knob */}
        <span style={{
          position: "absolute",
          top: PAD,
          left: isEN ? W - KNOB - PAD : PAD,
          width: KNOB,
          height: H - PAD * 2,
          borderRadius: 999,
          background: "linear-gradient(160deg, #ffffff 0%, #dce4f0 100%)",
          boxShadow: [
            "3px 3px 8px rgba(0,0,0,0.5)",
            "-1px -1px 4px rgba(255,255,255,0.15)",
            "inset 0 1px 0 rgba(255,255,255,0.95)",
            "inset 0 -1px 0 rgba(0,0,0,0.08)",
          ].join(", "),
          transition: "left 0.4s cubic-bezier(0.34,1.4,0.64,1)",
          pointerEvents: "none",
        }} />
      </button>
    );
  };

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
        <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
          {[
            { label: t("home"), href: "/" },
            { label: t("about"), href: "/about" },
          ].map(({ label, href }) => {
            const active = isActive(href) && (href !== "/" || strippedPath === "/");
            return (
              <Link key={href} href={localHref(href)}
                className="relative px-4 py-2 text-sm font-semibold rounded-lg group transition-all duration-250"
                style={{ color: active ? "#E8C766" : "#c8d8f0" }}
                onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.color = "#f0d060"; (e.currentTarget as HTMLElement).style.background = "rgba(201,162,39,0.07)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = active ? "#E8C766" : "#c8d8f0"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              >
                <span className={`absolute bottom-1 left-4 right-4 h-px rounded-full transition-all duration-300 origin-left bg-[--gold-400] ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                {label}
              </Link>
            );
          })}

          {/* Services dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setServicesOpen((v) => !v)}
              className="relative flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-lg group transition-all duration-250"
              style={{ color: isActive("/services") ? "#E8C766" : "#c8d8f0" }}
              onMouseEnter={e => { if (!isActive("/services")) (e.currentTarget as HTMLElement).style.color = "#f0d060"; (e.currentTarget as HTMLElement).style.background = "rgba(201,162,39,0.07)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = isActive("/services") ? "#E8C766" : "#c8d8f0"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              aria-haspopup="true"
              aria-expanded={servicesOpen}
            >
              <span className={`absolute bottom-1 left-4 right-4 h-px rounded-full transition-all duration-300 origin-left bg-[--gold-400] ${isActive("/services") ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
              {t("services")}
              <svg
                className={`w-3 h-3 transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>

            {/* Dropdown panel */}
            <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 transition-all duration-250 origin-top ${
              servicesOpen ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
            }`}>
              {/* Top pointer */}
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45"
                style={{ background: "#0d2044", border: "1px solid rgba(201,162,39,0.3)", borderBottom: "none", borderRight: "none" }} />
              <div className="rounded-xl overflow-hidden shadow-2xl"
                style={{ background: "linear-gradient(160deg, #1a3560 0%, #0d2044 100%)", border: "1px solid rgba(201,162,39,0.25)" }}>
                {/* Shimmer top border */}
                <div className="h-px w-full overflow-hidden">
                  <div style={{ height: "100%", background: "linear-gradient(90deg, transparent, #C9A227, transparent)" }} />
                </div>
                {SERVICE_LINKS.map(({ key, href }) => (
                  <Link key={key} href={localHref(href)}
                    onClick={() => setServicesOpen(false)}
                    className="group/item flex items-center gap-3 px-4 py-3 text-sm font-medium border-b transition-all duration-200 last:border-0"
                    style={{ color: "#b8cce0", borderColor: "rgba(255,255,255,0.05)" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#f0d060"; (e.currentTarget as HTMLElement).style.background = "rgba(201,162,39,0.07)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#b8cce0"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-200"
                      style={{ background: "rgba(201,162,39,0.5)", boxShadow: "0 0 6px rgba(201,162,39,0.3)" }} />
                    {t(`servicesMenu.${key}`)}
                    <svg className="w-3 h-3 ml-auto opacity-0 group-hover/item:opacity-100 transition-all duration-200 -translate-x-1 group-hover/item:translate-x-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {(() => {
            const active = isActive("/contact");
            return (
              <Link href={localHref("/contact")}
                className="relative px-4 py-2 text-sm font-semibold rounded-lg group transition-all duration-250"
                style={{ color: active ? "#E8C766" : "#c8d8f0" }}
                onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.color = "#f0d060"; (e.currentTarget as HTMLElement).style.background = "rgba(201,162,39,0.07)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = active ? "#E8C766" : "#c8d8f0"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              >
                <span className={`absolute bottom-1 left-4 right-4 h-px rounded-full transition-all duration-300 origin-left bg-[--gold-400] ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                {t("contact")}
              </Link>
            );
          })()}
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
