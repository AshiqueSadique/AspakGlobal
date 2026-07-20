"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type ServiceOption = { value: string; label: string };
type FormState = "idle" | "sending" | "success" | "error";

export default function ContactContent() {
  const t = useTranslations("contact");
  const ft = useTranslations("contact.form");
  const it = useTranslations("contact.info");
  const vt = useTranslations("contact.form.validation");

  const serviceOptions = ft.raw("serviceOptions") as ServiceOption[];

  const [formState, setFormState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [values, setValues] = useState({
    name: "", email: "", phone: "", service: "", message: "",
  });

  function validate() {
    const errs: Record<string, string> = {};
    if (!values.name.trim()) errs.name = vt("nameRequired");
    if (!values.email.trim()) errs.email = vt("emailRequired");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errs.email = vt("emailInvalid");
    if (!values.service) errs.service = vt("serviceRequired");
    if (!values.message.trim()) errs.message = vt("messageRequired");
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setFormState("sending");

    // Simulate form submission (replace with real API call)
    await new Promise((r) => setTimeout(r, 1500));
    setFormState("success");
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-xl border text-sm transition-all outline-none focus:ring-2 focus:ring-[#C9A227]/40 ${
      errors[field]
        ? "border-red-400 bg-red-50 text-red-900"
        : "border-[rgba(9,22,40,0.12)] bg-white focus:border-[#C9A227] text-[#1e3a5a] placeholder:text-[#8a9fb8]"
    }`;

  return (
    <section className="section-pad" style={{ background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)" }}>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-14">

          {/* Form */}
          <div className="lg:col-span-3">
            <h2 className="font-display font-bold mb-8" style={{ color: "#050d1a", fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>{ft("heading")}</h2>

            {formState === "success" ? (
              <div className="rounded-xl bg-green-50 border border-green-200 p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                  </svg>
                </div>
                <p className="text-green-800 font-medium">{ft("success")}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold mb-1.5" style={{ color: "#1e3a5a" }}>{ft("name")} *</label>
                  <input
                    type="text" name="name" value={values.name} onChange={handleChange}
                    placeholder={ft("namePlaceholder")}
                    className={inputClass("name")} autoComplete="name"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Email + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold mb-1.5" style={{ color: "#1e3a5a" }}>{ft("email")} *</label>
                    <input
                      type="email" name="email" value={values.email} onChange={handleChange}
                      placeholder={ft("emailPlaceholder")}
                      className={inputClass("email")} autoComplete="email"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1.5" style={{ color: "#1e3a5a" }}>{ft("phone")}</label>
                    <input
                      type="tel" name="phone" value={values.phone} onChange={handleChange}
                      placeholder={ft("phonePlaceholder")}
                      className={inputClass("phone")} autoComplete="tel"
                    />
                  </div>
                </div>

                {/* Service */}
                <div>
                  <label className="block text-sm font-semibold text-[--grey-800] mb-1.5">{ft("service")} *</label>
                  <select name="service" value={values.service} onChange={handleChange} className={inputClass("service")}>
                    <option value="">{ft("servicePlaceholder")}</option>
                    {serviceOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service}</p>}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-[--grey-800] mb-1.5">{ft("message")} *</label>
                  <textarea
                    name="message" value={values.message} onChange={handleChange}
                    placeholder={ft("messagePlaceholder")} rows={5}
                    className={inputClass("message")}
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>

                {formState === "error" && (
                  <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg p-3">{ft("error")}</p>
                )}

                <button
                  type="submit"
                  disabled={formState === "sending"}
                  className="btn-primary w-full sm:w-auto px-10 py-3.5 text-base disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {formState === "sending" ? ft("sending") : ft("submit")}
                </button>
              </form>
            )}
          </div>

          {/* Info sidebar */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="font-display font-bold mb-6" style={{ color: "#050d1a", fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>{it("heading")}</h2>
              <div className="space-y-5">
                {/* Address */}
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(201,162,39,0.1)", border: "1px solid rgba(201,162,39,0.3)" }}>
                    <svg className="w-5 h-5 text-[--gold-600]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#7a5a0a" }}>{it("address.label")}</div>
                    <p className="text-sm leading-relaxed max-w-none" style={{ color: "#4a5f7a" } as React.CSSProperties}>{it("address.value")}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(201,162,39,0.1)", border: "1px solid rgba(201,162,39,0.3)" }}>
                    <svg className="w-5 h-5 text-[--gold-600]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#7a5a0a" }}>{it("phone.label")}</div>
                    <a href={`tel:${it("phone.value")}`} className="text-sm transition-colors" style={{ color: "#4a5f7a" } as React.CSSProperties} onMouseEnter={e=>(e.currentTarget as HTMLElement).style.color="#7a5a0a"} onMouseLeave={e=>(e.currentTarget as HTMLElement).style.color="#4a5f7a"}>
                      {it("phone.value")}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(201,162,39,0.1)", border: "1px solid rgba(201,162,39,0.3)" }}>
                    <svg className="w-5 h-5 text-[--gold-600]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#7a5a0a" }}>{it("email.label")}</div>
                    <a href={`mailto:${it("email.value")}`} className="text-sm transition-colors" style={{ color: "#4a5f7a" } as React.CSSProperties} onMouseEnter={e=>(e.currentTarget as HTMLElement).style.color="#7a5a0a"} onMouseLeave={e=>(e.currentTarget as HTMLElement).style.color="#4a5f7a"}>
                      {it("email.value")}
                    </a>
                  </div>
                </div>

                {/* LINE */}
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#06C755]/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#06C755]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.365 9.89c.50 0 .904.402.904.9s-.404.9-.904.9h-2.19v1.25h2.19c.50 0 .904.403.904.902 0 .498-.404.9-.904.9h-3.092a.902.902 0 01-.902-.9V7.988c0-.498.404-.9.902-.9h3.092c.50 0 .904.402.904.9s-.404.9-.904.9h-2.19v1.001h2.19zm-5.477 3.95a.9.9 0 01-.593.852.915.915 0 01-.987-.193l-2.888-3.15v2.49a.9.9 0 01-.902.9.9.9 0 01-.902-.9V7.988a.9.9 0 01.593-.852.915.915 0 01.987.193l2.888 3.15V7.988a.9.9 0 01.902-.9.9.9 0 01.902.9v5.852zm-6.386.9a.9.9 0 01-.902.9.9.9 0 01-.902-.9V7.988a.9.9 0 01.902-.9.9.9 0 01.902.9v5.852zm-3.09-6.752h-.001a.9.9 0 00-.901.9v5.852a.9.9 0 00.902.9h3.091a.9.9 0 000-1.8H5.31v-4.952h2.19a.9.9 0 000-1.8H4.411v-.1zM24 10.27C24 4.608 18.615 0 12 0S0 4.608 0 10.27c0 5.079 4.504 9.336 10.588 10.142.412.088.974.272 1.116.623.128.32.084.82.04 1.143l-.18 1.085c-.055.32-.254 1.25 1.095.68 1.35-.567 7.284-4.29 9.942-7.346C23.36 14.61 24 12.514 24 10.27z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#7a5a0a" }}>{it("line.label")}</div>
                    <a href="https://line.me/R/ti/p/@aspakglobal" target="_blank" rel="noopener noreferrer"
                      className="text-sm text-[--color-text-muted] hover:text-[#06C755] transition-colors">
                      {it("line.value")}
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(201,162,39,0.1)", border: "1px solid rgba(201,162,39,0.3)" }}>
                    <svg className="w-5 h-5 text-[--gold-600]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#7a5a0a" }}>{it("hours.label")}</div>
                    <p className="text-sm text-[--color-text-muted]">{it("hours.value")}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map embed */}
            <div>
              <h3 className="font-display font-semibold mb-4" style={{ color: "#050d1a" }}>
                {t("map.heading")}
              </h3>
              <div className="rounded-xl overflow-hidden aspect-video" style={{ border: "1.5px solid rgba(9,22,40,0.1)", boxShadow: "0 4px 20px rgba(9,22,40,0.08)" }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3879.0!2d100.5!3d13.65!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDM5JzAwLjAiTiAxMDDCsDMwJzAwLjAiRQ!5e0!3m2!1sen!2sth!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "200px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={t("map.alt")}
                  aria-label={t("map.alt")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
