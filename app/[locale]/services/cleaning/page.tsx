import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import ServicePageLayout from "@/components/services/ServicePageLayout";
import CleaningDeeLink from "@/components/services/CleaningDeeLink";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cleaning.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function CleaningPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cleaning" });
  const services = t.raw("services.items") as Array<{ title: string; description: string }>;
  const deeUrl = locale === "th"
    ? "https://dee-cleaning-co.vercel.app/th/"
    : "https://dee-cleaning-co.vercel.app/en/";

  return (
    <ServicePageLayout
      label={t("hero.label")}
      heading={t("hero.heading")}
      body={t("hero.body")}
      subBrand={t("hero.subBrand")}
      servicesHeading={t("services.heading")}
      services={services}
      ctaHeading={t("cta.heading")}
      ctaBtn={t("cta.btn")}
      accentColor="#0D9488"
      extraSection={
        <CleaningDeeLink
          heading={t("deeLink.heading")}
          body={t("deeLink.body")}
          btn={t("deeLink.btn")}
          url={deeUrl}
        />
      }
    />
  );
}
