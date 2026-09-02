import type { Metadata } from "next";

const BASE_URL = "https://aspakglobal.com";

/**
 * Builds canonical/hreflang alternates + OpenGraph/Twitter metadata for a page.
 * `path` is locale-less, e.g. "" for home, "/about", "/services/it-solutions".
 */
export function pageMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: string;
  path: string;
  title: string;
  description: string;
}): Metadata {
  const url = `${BASE_URL}/${locale}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `${BASE_URL}/en${path}`,
        th: `${BASE_URL}/th${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      locale: locale === "th" ? "th_TH" : "en_US",
      alternateLocale: locale === "th" ? "en_US" : "th_TH",
      type: "website",
      images: [
        {
          url: `${BASE_URL}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${BASE_URL}/opengraph-image`],
    },
  };
}
