"use client";

import { useTranslations } from "next-intl";

type ValueItem = { title: string; description: string };

const VALUE_ICONS = [
  <svg key="integrity" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 003 12.5c0 3.136 1.215 5.984 3.205 8.083m3.695-15.12a11.955 11.955 0 016.1 0m3.705 15.12A11.972 11.972 0 0121 12.5a11.955 11.955 0 00-.598-6 11.959 11.959 0 01-3.402-1.536m-6.6 15.12a11.978 11.978 0 006.6 0"/></svg>,
  <svg key="excellence" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/></svg>,
  <svg key="partnership" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/></svg>,
  <svg key="innovation" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"/></svg>,
];

export default function ValuesSection() {
  const t = useTranslations("about.values");
  const items = t.raw("items") as ValueItem[];

  return (
    <section className="section-pad bg-[--ivory]">
      <div className="container">
        <div className="text-center mb-12">
          <span className="section-label">{t("label")}</span>
          <h2 className="mt-3 font-display font-bold text-[--navy-900]">{t("heading")}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <div key={i}
              className="bg-white rounded-xl p-6 text-center border border-[--grey-200] hover:border-[--gold-400] hover:shadow-md transition-all duration-300 group">
              <div className="w-14 h-14 rounded-full bg-[--navy-50] flex items-center justify-center mx-auto mb-4 text-[--navy-700] group-hover:bg-[--gold-100] group-hover:text-[--gold-700] transition-colors">
                {VALUE_ICONS[i]}
              </div>
              <h3 className="font-display font-semibold text-[--navy-900] mb-2">{item.title}</h3>
              <p className="text-sm text-[--color-text-muted] leading-relaxed max-w-none">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
