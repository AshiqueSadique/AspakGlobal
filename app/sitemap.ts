import { MetadataRoute } from "next";

const BASE_URL = "https://aspakglobal.com";
const LOCALES = ["en", "th"];

const PATHS = [
  "",
  "/about",
  "/services",
  "/services/it-solutions",
  "/services/import-export",
  "/services/packaging-paper",
  "/services/office-supply",
  "/services/cleaning",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const path of PATHS) {
    entries.push({
      url: `${BASE_URL}/en${path}`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((locale) => [locale, `${BASE_URL}/${locale}${path}`])
        ),
      },
    });
  }

  return entries;
}
