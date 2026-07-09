import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LenisProvider from "@/components/animations/LenisProvider";
import "../globals.css";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: { default: t("siteName"), template: `%s — ${t("siteName")}` },
    description: t("tagline"),
    metadataBase: new URL("https://aspakglobal.com"),
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", th: "/th" },
    },
    openGraph: {
      siteName: t("siteName"),
      locale: locale === "th" ? "th_TH" : "en_US",
      alternateLocale: locale === "th" ? "en_US" : "th_TH",
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "th")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className="h-full">
      <head>
        <link rel="icon" href="/aspak-logo.png" type="image/png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700;800&family=Anuphan:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <NextIntlClientProvider messages={messages}>
          <LenisProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </LenisProvider>
        </NextIntlClientProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Aspak Global Co., Ltd.",
              alternateName: "บริษัท แอสแพค โกลบอล จำกัด",
              url: "https://aspakglobal.com",
              logo: "https://aspakglobal.com/logo.png",
              description: "Bangkok-based trading and services company offering IT Solutions, Import & Export, Packaging, Office Supply, and Cleaning Services.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "No. 1, Soi Pracha Uthit 79 Yaek 1",
                addressLocality: "Thung Khru",
                addressRegion: "Bangkok",
                postalCode: "10140",
                addressCountry: "TH",
              },
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                email: "contact@aspakglobal.com",
                availableLanguage: ["English", "Thai"],
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
