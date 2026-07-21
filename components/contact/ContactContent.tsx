"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ServiceOption = { value: string; label: string };
type FormState = "idle" | "sending" | "success" | "error";

/* ── tiny floating orb ── */
function Particle({ style }: { style: React.CSSProperties }) {
  return (
    <span className="particle" style={style} />
  );
}

export default function ContactContent() {
  const t  = useTranslations("contact");
  const ft = useTranslations("contact.form");
  const it = useTranslations("contact.info");
  const vt = useTranslations("contact.form.validation");

  const serviceOptions = ft.raw("serviceOptions") as ServiceOption[];

  const [formState, setFormState] = useState<FormState>("idle");
  const [errors,    setErrors]    = useState<Record<string, string>>({});
  const [values,    setValues]    = useState({ name: "", email: "", phone: "", service: "", message: "" });

  /* refs */
  const sectionRef  = useRef<HTMLElement>(null);
  const formColRef  = useRef<HTMLDivElement>(null);
  const sideColRef  = useRef<HTMLDivElement>(null);
  const submitRef   = useRef<HTMLButtonElement>(null);
  const spotRef     = useRef<HTMLDivElement>(null);
  const glowRef     = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  /* ── GSAP scroll animations ── */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    /* form column — slide in from left */
    const formEls = formColRef.current?.querySelectorAll<HTMLElement>("[data-form]");
    if (formEls?.length) {
      gsap.set(formEls, { opacity: 0, x: -40 });
      ScrollTrigger.create({
        trigger: formColRef.current,
        start: "top 100%",
        onEnter: () => gsap.to(formEls, { opacity: 1, x: 0, duration: 0.9, stagger: 0.1, ease: "expo.out" }),
        once: true,
      });
    }

    /* sidebar — slide in from right */
    const sideEls = sideColRef.current?.querySelectorAll<HTMLElement>("[data-side]");
    if (sideEls?.length) {
      gsap.set(sideEls, { opacity: 0, x: 40 });
      ScrollTrigger.create({
        trigger: sideColRef.current,
        start: "top 100%",
        onEnter: () => gsap.to(sideEls, { opacity: 1, x: 0, duration: 0.9, stagger: 0.12, ease: "expo.out" }),
        once: true,
      });
    }

    /* gold icon pings — bounce in once visible */
    const icons = sideColRef.current?.querySelectorAll<HTMLElement>("[data-icon]");
    if (icons?.length) {
      gsap.set(icons, { scale: 0, rotate: -15, opacity: 0 });
      ScrollTrigger.create({
        trigger: sideColRef.current,
        start: "top 100%",
        onEnter: () => gsap.to(icons, { scale: 1, rotate: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "back.out(1.6)", delay: 0.2 }),
        once: true,
      });
    }
  }, []);

  /* ── magnetic submit button ── */
  useEffect(() => {
    const btn = submitRef.current;
    if (!btn || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e: MouseEvent) => {
      const r = btn.getBoundingClientRect();
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) * 0.22, dy = (e.clientY - cy) * 0.22;
      gsap.to(btn, { x: dx, y: dy, duration: 0.5, ease: "power2.out" });
    };
    const onLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1,0.4)" });
    };

    btn.addEventListener("mousemove", onMove);
    btn.addEventListener("mouseleave", onLeave);
    return () => { btn.removeEventListener("mousemove", onMove); btn.removeEventListener("mouseleave", onLeave); };
  }, [formState]);

  /* ── cursor spotlight on sidebar ── */
  useEffect(() => {
    const side = sideColRef.current;
    const spot = spotRef.current;
    if (!side || !spot) return;

    const onMove = (e: MouseEvent) => {
      const r = side.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      glowRef.current = { x, y };
      gsap.to(spot, { left: x, top: y, duration: 0.25, ease: "power1.out" });
    };
    const onEnter = () => gsap.to(spot, { opacity: 1, duration: 0.3 });
    const onLeave = () => gsap.to(spot, { opacity: 0, duration: 0.4 });

    side.addEventListener("mousemove", onMove);
    side.addEventListener("mouseenter", onEnter);
    side.addEventListener("mouseleave", onLeave);
    return () => {
      side.removeEventListener("mousemove", onMove);
      side.removeEventListener("mouseenter", onEnter);
      side.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  /* ── success burst ── */
  function triggerSuccessBurst() {
    const sec = sectionRef.current;
    if (!sec || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const sparks = Array.from({ length: 14 }, (_, i) => {
      const el = document.createElement("span");
      el.className = "success-spark";
      sec.appendChild(el);
      const angle = (i / 14) * Math.PI * 2;
      const dist  = 80 + Math.random() * 60;
      gsap.fromTo(el,
        { x: 0, y: 0, opacity: 1, scale: 0.5 + Math.random() * 0.5, backgroundColor: i % 2 === 0 ? "#C9A227" : "#F0D060" },
        { x: Math.cos(angle) * dist, y: Math.sin(angle) * dist, opacity: 0, scale: 0, duration: 1.1 + Math.random() * 0.4, ease: "expo.out",
          onComplete: () => el.remove() }
      );
      return el;
    });
    return sparks;
  }

  /* form logic */
  function validate() {
    const errs: Record<string, string> = {};
    if (!values.name.trim())  errs.name    = vt("nameRequired");
    if (!values.email.trim()) errs.email   = vt("emailRequired");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errs.email = vt("emailInvalid");
    if (!values.service)      errs.service = vt("serviceRequired");
    if (!values.message.trim()) errs.message = vt("messageRequired");
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setFormState("sending");
    await new Promise((r) => setTimeout(r, 1500));
    setFormState("success");
    triggerSuccessBurst();
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  /* input focus ripple */
  function handleFocus(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = e.currentTarget;
    gsap.fromTo(el, { boxShadow: "0 0 0 0 rgba(201,162,39,0)" }, { boxShadow: "0 0 0 6px rgba(201,162,39,0.18)", duration: 0.35, ease: "power2.out",
      onComplete: () => gsap.to(el, { boxShadow: "0 0 0 3px rgba(201,162,39,0.12)", duration: 0.4 }) });
  }

  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors duration-200 focus:border-[#C9A227] ${
      errors[field]
        ? "border-red-400 bg-red-50 text-red-900"
        : "border-[rgba(9,22,40,0.12)] bg-white text-[#1e3a5a] placeholder:text-[#8a9fb8]"
    }`;

  /* particles config */
  const particles = Array.from({ length: 18 }, (_, i) => ({
    left:     `${5 + (i * 5.3) % 90}%`,
    top:      `${8 + (i * 7.1) % 84}%`,
    width:    `${4 + (i % 4) * 3}px`,
    height:   `${4 + (i % 4) * 3}px`,
    animationDelay: `${(i * 0.7) % 6}s`,
    animationDuration: `${6 + (i % 5) * 1.2}s`,
    opacity:  0.35 + (i % 5) * 0.1,
  }));

  return (
    <section ref={sectionRef} className="section-pad relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #ffffff 0%, #f0f4f8 100%)" }}>

      {/* ── floating background particles ── */}
      {particles.map((p, i) => (
        <Particle key={i} style={{
          position: "absolute", borderRadius: "50%", pointerEvents: "none",
          background: i % 3 === 0 ? "rgba(201,162,39,0.25)" : i % 3 === 1 ? "rgba(9,22,40,0.07)" : "rgba(201,162,39,0.12)",
          ...p,
        }} />
      ))}

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-14">

          {/* ── Form column ── */}
          <div ref={formColRef} className="lg:col-span-3">
            <h2 data-form className="font-display font-bold mb-8" style={{ color: "#050d1a", fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
              {ft("heading")}
            </h2>

            {formState === "success" ? (
              <div data-form className="rounded-2xl p-10 text-center relative overflow-hidden"
                style={{ background: "linear-gradient(135deg, #f0faf4 0%, #e6f7ee 100%)", border: "1.5px solid rgba(34,197,94,0.3)" }}>
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{ background: "linear-gradient(135deg, rgba(34,197,94,0.15), rgba(34,197,94,0.08))", border: "2px solid rgba(34,197,94,0.4)" }}>
                  <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                  </svg>
                </div>
                <p className="font-semibold text-lg" style={{ color: "#166534" }}>{ft("success")}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div data-form>
                  <label className="block text-sm font-semibold mb-1.5" style={{ color: "#1e3a5a" }}>{ft("name")} *</label>
                  <input type="text" name="name" value={values.name} onChange={handleChange} onFocus={handleFocus}
                    placeholder={ft("namePlaceholder")} className={inputClass("name")} autoComplete="name" />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div data-form className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold mb-1.5" style={{ color: "#1e3a5a" }}>{ft("email")} *</label>
                    <input type="email" name="email" value={values.email} onChange={handleChange} onFocus={handleFocus}
                      placeholder={ft("emailPlaceholder")} className={inputClass("email")} autoComplete="email" />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1.5" style={{ color: "#1e3a5a" }}>{ft("phone")}</label>
                    <input type="tel" name="phone" value={values.phone} onChange={handleChange} onFocus={handleFocus}
                      placeholder={ft("phonePlaceholder")} className={inputClass("phone")} autoComplete="tel" />
                  </div>
                </div>

                <div data-form>
                  <label className="block text-sm font-semibold mb-1.5" style={{ color: "#1e3a5a" }}>{ft("service")} *</label>
                  <select name="service" value={values.service} onChange={handleChange} onFocus={handleFocus} className={inputClass("service")}>
                    <option value="">{ft("servicePlaceholder")}</option>
                    {serviceOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service}</p>}
                </div>

                <div data-form>
                  <label className="block text-sm font-semibold mb-1.5" style={{ color: "#1e3a5a" }}>{ft("message")} *</label>
                  <textarea name="message" value={values.message} onChange={handleChange} onFocus={handleFocus}
                    placeholder={ft("messagePlaceholder")} rows={5} className={inputClass("message")} />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>

                {formState === "error" && (
                  <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg p-3">{ft("error")}</p>
                )}

                <div data-form className="pt-1" style={{ position: "relative", display: "inline-block" }}>
                  <button ref={submitRef} type="submit" disabled={formState === "sending"}
                    className="btn-primary px-10 py-3.5 text-base disabled:opacity-60 disabled:cursor-not-allowed relative overflow-hidden"
                    style={{ minWidth: 200, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                    {formState === "sending" ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                        </svg>
                        {ft("sending")}
                      </>
                    ) : (
                      <>
                        {ft("submit")}
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* ── Sidebar ── */}
          <div ref={sideColRef} className="lg:col-span-2 space-y-8 relative">
            {/* cursor spotlight */}
            <div ref={spotRef} className="pointer-events-none absolute z-0" style={{
              width: 280, height: 280, borderRadius: "50%", opacity: 0,
              background: "radial-gradient(circle, rgba(201,162,39,0.12) 0%, transparent 70%)",
              transform: "translate(-50%,-50%)",
            }} />

            <div className="relative z-10">
              <h2 data-side className="font-display font-bold mb-6" style={{ color: "#050d1a", fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
                {it("heading")}
              </h2>
              <div className="space-y-5">

                {/* Address */}
                <div data-side className="flex gap-3 info-row">
                  <div data-icon className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(201,162,39,0.1)", border: "1px solid rgba(201,162,39,0.3)" }}>
                    <svg className="w-5 h-5" style={{ color: "#C9A227" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#7a5a0a" }}>{it("address.label")}</div>
                    <p className="text-sm leading-relaxed" style={{ color: "#4a5f7a" }}>{it("address.value")}</p>
                  </div>
                </div>

                {/* Phone */}
                <div data-side className="flex gap-3 info-row">
                  <div data-icon className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(201,162,39,0.1)", border: "1px solid rgba(201,162,39,0.3)" }}>
                    <svg className="w-5 h-5" style={{ color: "#C9A227" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#7a5a0a" }}>{it("phone.label")}</div>
                    <a href={`tel:${it("phone.value")}`} className="text-sm transition-colors" style={{ color: "#4a5f7a" }}
                      onMouseEnter={e=>(e.currentTarget as HTMLElement).style.color="#7a5a0a"}
                      onMouseLeave={e=>(e.currentTarget as HTMLElement).style.color="#4a5f7a"}>
                      {it("phone.value")}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div data-side className="flex gap-3 info-row">
                  <div data-icon className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(201,162,39,0.1)", border: "1px solid rgba(201,162,39,0.3)" }}>
                    <svg className="w-5 h-5" style={{ color: "#C9A227" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#7a5a0a" }}>{it("email.label")}</div>
                    <a href={`mailto:${it("email.value")}`} className="text-sm transition-colors" style={{ color: "#4a5f7a" }}
                      onMouseEnter={e=>(e.currentTarget as HTMLElement).style.color="#7a5a0a"}
                      onMouseLeave={e=>(e.currentTarget as HTMLElement).style.color="#4a5f7a"}>
                      {it("email.value")}
                    </a>
                  </div>
                </div>

                {/* LINE */}
                <div data-side className="flex gap-3 info-row">
                  <div data-icon className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(6,199,85,0.1)", border: "1px solid rgba(6,199,85,0.3)" }}>
                    <svg className="w-5 h-5" style={{ color: "#06C755" }} viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.365 9.89c.50 0 .904.402.904.9s-.404.9-.904.9h-2.19v1.25h2.19c.50 0 .904.403.904.902 0 .498-.404.9-.904.9h-3.092a.902.902 0 01-.902-.9V7.988c0-.498.404-.9.902-.9h3.092c.50 0 .904.402.904.9s-.404.9-.904.9h-2.19v1.001h2.19zm-5.477 3.95a.9.9 0 01-.593.852.915.915 0 01-.987-.193l-2.888-3.15v2.49a.9.9 0 01-.902.9.9.9 0 01-.902-.9V7.988a.9.9 0 01.593-.852.915.915 0 01.987.193l2.888 3.15V7.988a.9.9 0 01.902-.9.9.9 0 01.902.9v5.852zm-6.386.9a.9.9 0 01-.902.9.9.9 0 01-.902-.9V7.988a.9.9 0 01.902-.9.9.9 0 01.902.9v5.852zm-3.09-6.752h-.001a.9.9 0 00-.901.9v5.852a.9.9 0 00.902.9h3.091a.9.9 0 000-1.8H5.31v-4.952h2.19a.9.9 0 000-1.8H4.411v-.1zM24 10.27C24 4.608 18.615 0 12 0S0 4.608 0 10.27c0 5.079 4.504 9.336 10.588 10.142.412.088.974.272 1.116.623.128.32.084.82.04 1.143l-.18 1.085c-.055.32-.254 1.25 1.095.68 1.35-.567 7.284-4.29 9.942-7.346C23.36 14.61 24 12.514 24 10.27z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#7a5a0a" }}>{it("line.label")}</div>
                    <a href="https://line.me/R/ti/p/@aspakglobal" target="_blank" rel="noopener noreferrer"
                      className="text-sm transition-colors" style={{ color: "#4a5f7a" }}
                      onMouseEnter={e=>(e.currentTarget as HTMLElement).style.color="#06C755"}
                      onMouseLeave={e=>(e.currentTarget as HTMLElement).style.color="#4a5f7a"}>
                      {it("line.value")}
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div data-side className="flex gap-3 info-row">
                  <div data-icon className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(201,162,39,0.1)", border: "1px solid rgba(201,162,39,0.3)" }}>
                    <svg className="w-5 h-5" style={{ color: "#C9A227" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#7a5a0a" }}>{it("hours.label")}</div>
                    <p className="text-sm" style={{ color: "#4a5f7a" }}>{it("hours.value")}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div data-side className="relative z-10">
              <h3 className="font-display font-semibold mb-4" style={{ color: "#050d1a" }}>{t("map.heading")}</h3>
              <div className="rounded-xl overflow-hidden aspect-video map-card"
                style={{ border: "1.5px solid rgba(9,22,40,0.1)", boxShadow: "0 4px 20px rgba(9,22,40,0.08)", transition: "box-shadow 0.4s, border-color 0.3s" }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3879.0!2d100.5!3d13.65!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDM5JzAwLjAiTiAxMDDCsDMwJzAwLjAiRQ!5e0!3m2!1sen!2sth!4v1"
                  width="100%" height="100%"
                  style={{ border: 0, minHeight: "200px" }}
                  allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={t("map.alt")} aria-label={t("map.alt")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* floating particles */
        .particle {
          position: absolute;
          border-radius: 50%;
          animation: particle-float linear infinite;
          pointer-events: none;
        }
        @keyframes particle-float {
          0%   { transform: translateY(0px) scale(1);   opacity: var(--op, 0.35); }
          50%  { transform: translateY(-22px) scale(1.15); opacity: calc(var(--op, 0.35) * 1.4); }
          100% { transform: translateY(0px) scale(1);   opacity: var(--op, 0.35); }
        }

        /* info row hover lift */
        .info-row {
          padding: 0.6rem 0.75rem;
          border-radius: 14px;
          transition: background 0.3s, transform 0.35s cubic-bezier(0.34,1.4,0.64,1);
        }
        .info-row:hover {
          background: rgba(201,162,39,0.06);
          transform: translateX(5px);
        }

        /* map hover glow */
        .map-card:hover {
          box-shadow: 0 8px 32px rgba(201,162,39,0.2) !important;
          border-color: rgba(201,162,39,0.4) !important;
        }

        /* success burst sparks */
        .success-spark {
          position: absolute;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          pointer-events: none;
          left: 50%;
          top: 50%;
          z-index: 20;
        }
      `}</style>
    </section>
  );
}
