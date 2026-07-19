"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  laptop: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25z"/>
    </svg>
  ),
  globe: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"/>
    </svg>
  ),
  package: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"/>
    </svg>
  ),
  briefcase: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"/>
    </svg>
  ),
  sparkles: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"/>
    </svg>
  ),
};

const CARD_COLORS = [
  { from: "#e8ecf2", border: "rgba(201,162,39,0.5)", glow: "rgba(201,162,39,0.22)" },
  { from: "#e4eaf2", border: "rgba(150,180,220,0.5)", glow: "rgba(150,180,220,0.2)" },
  { from: "#e8ecf2", border: "rgba(201,162,39,0.5)", glow: "rgba(201,162,39,0.22)" },
  { from: "#e4eaf2", border: "rgba(150,180,220,0.5)", glow: "rgba(150,180,220,0.2)" },
  { from: "#e8ecf2", border: "rgba(201,162,39,0.5)", glow: "rgba(201,162,39,0.22)" },
];

type ServiceItem = { id: string; title: string; description: string; icon: string };

function TiltCard({ item, idx, locale, learnMore }: {
  item: ServiceItem; idx: number; locale: string; learnMore: string
}) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const colors = CARD_COLORS[idx % CARD_COLORS.length];

  const onMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(card, {
      rotateY: x * 12,
      rotateX: -y * 10,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 800,
    });

    if (glowRef.current) {
      const cursorX = e.clientX - rect.left;
      const cursorY = e.clientY - rect.top;
      gsap.to(glowRef.current, {
        left: cursorX,
        top: cursorY,
        opacity: 1,
        duration: 0.15,
        ease: "power2.out",
      });
    }
  };

  const onMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateY: 0, rotateX: 0, duration: 0.7, ease: "expo.out",
    });
    if (glowRef.current) gsap.to(glowRef.current, { opacity: 0, duration: 0.4 });
  };

  return (
    <Link
      ref={cardRef}
      href={`/${locale}/services/${item.id}`}
      className="relative flex flex-col rounded-2xl p-7 overflow-hidden group cursor-pointer"
      style={{
        background: `linear-gradient(160deg, ${colors.from} 0%, #d0d8e8 100%)`,
        border: `1px solid ${colors.border}`,
        transformStyle: "preserve-3d",
        transition: "box-shadow 0.4s ease",
        willChange: "transform",
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Spotlight glow — tracks cursor exactly */}
      <div ref={glowRef} className="absolute pointer-events-none opacity-0"
        style={{
          width: "160px", height: "160px",
          borderRadius: "50%",
          background: `radial-gradient(circle at center, ${colors.glow} 0%, transparent 65%)`,
          transform: "translate(-50%, -50%)",
          left: "50%", top: "50%",
          mixBlendMode: "multiply",
        }}
      />

      {/* Top border glow line */}
      <div className="absolute top-0 left-6 right-6 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${colors.border}, transparent)` }}
      />

      {/* Icon */}
      <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 flex-shrink-0"
        style={{
          background: "rgba(9,30,58,0.07)",
          border: `1px solid ${colors.border}`,
          color: "#C9A227",
        }}>
        {SERVICE_ICONS[item.icon]}
      </div>

      {/* Number */}
      <div className="absolute top-6 right-7 font-display font-bold opacity-10 text-[--navy-900]"
        style={{ fontSize: "clamp(2.5rem, 3vw, 3.5rem)" }}>
        {String(idx + 1).padStart(2, "0")}
      </div>

      <h3 className="font-display font-bold text-[--navy-900] text-xl mb-3 group-hover:text-[--navy-700] transition-colors duration-300">
        {item.title}
      </h3>
      <p className="text-[--grey-600] text-sm leading-relaxed flex-1 mb-6 max-w-none">
        {item.description}
      </p>

      <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[--gold-700] group-hover:text-[--gold-600] transition-colors duration-300">
        {learnMore}
        <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
        </svg>
      </div>
    </Link>
  );
}

export default function ServiceCards() {
  const t = useTranslations("home.services");
  const locale = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const items = t.raw("items") as ServiceItem[];

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    if (headingRef.current) {
      const els = headingRef.current.querySelectorAll("[data-h]");
      gsap.set(els, { opacity: 0, y: 30 });
      ScrollTrigger.create({
        trigger: headingRef.current,
        start: "top 88%",
        onEnter: () => gsap.to(els, { opacity: 1, y: 0, duration: 1.3, stagger: 0.14, ease: "expo.out" }),
        once: true,
      });
    }

    const cards = cardsRef.current?.querySelectorAll<HTMLElement>("a");
    if (cards) {
      gsap.set(cards, { opacity: 0, y: 50 });
      ScrollTrigger.create({
        trigger: cardsRef.current,
        start: "top 85%",
        onEnter: () => gsap.to(cards, { opacity: 1, y: 0, duration: 1.1, stagger: 0.1, ease: "expo.out" }),
        once: true,
      });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pad relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0d1e38 0%, #112244 50%, #0d1e38 100%)" }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(201,162,39,0.4), transparent)" }} />

      <div className="container relative z-10">
        <div ref={headingRef} className="text-center mb-16">
          <span data-h className="section-label text-[--gold-400]">{t("label")}</span>
          <h2 data-h className="mt-3 font-display font-bold text-white whitespace-pre-line" style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}>
            {t("heading")}
          </h2>
          <div data-h className="h-px w-20 mx-auto mt-5 rounded-full"
            style={{ background: "linear-gradient(90deg, transparent, #C9A227, transparent)" }} />
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item, idx) => (
            <TiltCard key={item.id} item={item} idx={idx} locale={locale} learnMore={t("learnMore")} />
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link href={`/${locale}/services`} className="btn-primary px-10 py-4">
            {t("viewAll")}
          </Link>
        </div>
      </div>
    </section>
  );
}
