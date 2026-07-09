"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SplitTextRevealProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  className?: string;
  delay?: number;
  trigger?: boolean; // if true, animate on scroll; if false, animate on mount
  locale?: string;
}

export default function SplitTextReveal({
  text,
  as: Tag = "h2",
  className = "",
  delay = 0,
  trigger = true,
  locale = "en",
}: SplitTextRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // For Thai, split by word (space-separated); for English, split by character
    // Actually Thai words don't have spaces — so we split by line breaks only for Thai
    const isThai = locale === "th";
    const lines = text.split("\n");

    el.innerHTML = lines
      .map((line) => {
        if (isThai) {
          // Word-level split for Thai (words separated by spaces if any, else treat whole line as unit)
          return `<div class="overflow-visible" style="display:block">
            <div class="split-line-inner" style="transform:translateY(100%)">
              ${line}
            </div>
          </div>`;
        } else {
          // Line-level split for English (safe across all cases)
          return `<div class="overflow-hidden" style="display:block">
            <div class="split-line-inner" style="transform:translateY(100%)">
              ${line}
            </div>
          </div>`;
        }
      })
      .join("");

    const inners = el.querySelectorAll<HTMLElement>(".split-line-inner");

    if (prefersReduced) {
      inners.forEach((inner) => gsap.set(inner, { y: 0 }));
      return;
    }

    const animateIn = () => {
      gsap.to(inners, {
        y: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        delay,
      });
    };

    if (trigger) {
      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        onEnter: animateIn,
        once: true,
      });
    } else {
      animateIn();
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [text, delay, trigger, locale]);

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className={className}>
      {text}
    </Tag>
  );
}
