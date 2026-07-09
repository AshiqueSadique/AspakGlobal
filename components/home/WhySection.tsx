"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type WhyItem = { title: string; description: string };

export default function WhySection() {
  const t = useTranslations("home.why");
  const sectionRef = useRef<HTMLElement>(null);
  const items = t.raw("items") as WhyItem[];

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const heading = el.querySelectorAll("[data-h]");
    const cards = el.querySelectorAll("[data-why-card]");

    gsap.set(heading, { opacity: 0, y: 22 });
    gsap.set(cards, { opacity: 0, y: 36 });

    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      onEnter: () => {
        gsap.to(heading, { opacity: 1, y: 0, duration: 1.3, stagger: 0.15, ease: "expo.out" });
        gsap.to(cards, { opacity: 1, y: 0, duration: 1.1, stagger: 0.14, ease: "expo.out", delay: 0.3 });
      },
      once: true,
    });
  }, []);

  return (
    <section ref={sectionRef} className="section-pad bg-white">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <span data-h className="section-label">{t("label")}</span>
          <h2 data-h className="mt-3 font-display font-bold text-[--navy-900] whitespace-pre-line">{t("heading")}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {items.map((item, i) => (
            <div
              key={i}
              data-why-card
              className="p-6 rounded-xl border border-[--grey-200] hover:border-[--gold-400] hover:shadow-md transition-all duration-500 group"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[--navy-800] flex items-center justify-center flex-shrink-0 group-hover:bg-[--gold-600] transition-colors duration-400">
                  <span className="text-[--gold-400] group-hover:text-[--navy-900] font-bold text-sm transition-colors duration-400">
                    0{i + 1}
                  </span>
                </div>
                <div>
                  <h3 className="font-display font-semibold text-[--navy-900] mb-2">{item.title}</h3>
                  <p className="text-sm text-[--color-text-muted] leading-relaxed max-w-none">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
