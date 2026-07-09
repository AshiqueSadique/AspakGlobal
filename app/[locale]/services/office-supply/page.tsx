import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import ServicePageLayout from "@/components/services/ServicePageLayout";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "officeSupply.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function OfficeSupplyPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "officeSupply" });
  const services = t.raw("services.items") as Array<{ title: string; description: string }>;

  return (
    <ServicePageLayout
      label={t("hero.label")}
      heading={t("hero.heading")}
      body={t("hero.body")}
      servicesHeading={t("services.heading")}
      services={services}
      ctaHeading={t("cta.heading")}
      ctaBtn={t("cta.btn")}
      accentColor="#0D2B52"
    />
  );
}
