"use client";

interface CleaningDeeLinkProps {
  heading: string;
  body: string;
  btn: string;
  url: string;
}

export default function CleaningDeeLink({ heading, body, btn, url }: CleaningDeeLinkProps) {
  return (
    <section className="py-16 bg-white">
      <div className="container max-w-2xl mx-auto text-center">
        <div className="rounded-2xl p-10 border-2 border-[#0D9488]/30 bg-[#CCFBF1]/30 relative overflow-hidden">
          {/* Teal accent */}
          <div className="absolute top-0 right-0 w-40 h-40 opacity-10"
            style={{ backgroundImage: "radial-gradient(circle, #0D9488, transparent 70%)" }} />

          {/* Dee Cleaning Co. mini badge */}
          <div className="inline-flex items-center gap-2 bg-[#0D9488] text-white px-4 py-2 rounded-full text-sm font-bold mb-6">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/>
            </svg>
            Dee Cleaning Company
          </div>

          <h2 className="font-display font-bold text-[--navy-900] mb-4">{heading}</h2>
          <p className="text-[--color-text-muted] leading-relaxed mb-8 max-w-none">{body}</p>

          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{ background: "linear-gradient(135deg, #0D9488, #2DD4BF)" }}
          >
            {btn}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
