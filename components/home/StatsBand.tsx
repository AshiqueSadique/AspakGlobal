"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type StatItem = { value: number; suffix: string; label: string };

export default function StatsBand() {
  const t = useTranslations("home.stats");
  const sectionRef = useRef<HTMLElement>(null);
  const items = t.raw("items") as StatItem[];

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const counters = el.querySelectorAll<HTMLElement>("[data-count]");
    const labels = el.querySelectorAll<HTMLElement>("[data-label]");
    const heading = el.querySelector("[data-heading]");

    gsap.set([heading, labels], { opacity: 0, y: 20 });
    gsap.set(counters, { opacity: 0, y: 30 });

    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      onEnter: () => {
        gsap.to(heading, { opacity: 1, y: 0, duration: 1.2, ease: "expo.out" });
        gsap.to(counters, { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "expo.out", delay: 0.2 });
        gsap.to(labels, { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "expo.out", delay: 0.35 });

        // Count-up
        counters.forEach((counter) => {
          const target = parseInt(counter.getAttribute("data-count") || "0", 10);
          const suffix = counter.getAttribute("data-suffix") || "";
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 2.5,
            ease: "power2.out",
            delay: 0.4,
            snap: { val: 1 },
            onUpdate: () => { counter.textContent = Math.round(obj.val) + suffix; },
          });
        });
      },
      once: true,
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-[--navy-900]">
      <div className="container">
        <div className="text-center mb-14">
          <span data-heading className="section-label text-[--gold-400]">{t("label")}</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {items.map((item, i) => (
            <div key={i} className="text-center group">
              <div
                data-count={item.value}
                data-suffix={item.suffix}
                className="font-display font-bold text-[--gold-400] mb-3 leading-none"
                style={{ fontSize: "clamp(2.8rem, 5.5vw, 4.5rem)" }}
              >
                {item.value}{item.suffix}
              </div>
              <div data-label className="text-white/55 text-sm font-medium tracking-wide">
                {item.label}
              </div>
              <div className="h-px w-8 bg-[--gold-600] mx-auto mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
