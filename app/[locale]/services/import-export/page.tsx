import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import ServicePageLayout from "@/components/services/ServicePageLayout";
import ImportExportExtra from "@/components/services/ImportExportExtra";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "importExport.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function ImportExportPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "importExport" });
  const services = t.raw("services.items") as Array<{ title: string; description: string }>;
  const regions = t.raw("reach.regions") as string[];

  return (
    <ServicePageLayout
      label={t("hero.label")}
      heading={t("hero.heading")}
      body={t("hero.body")}
      servicesHeading={t("services.heading")}
      services={services}
      ctaHeading={t("cta.heading")}
      ctaBtn={t("cta.btn")}
      accentColor="#1A4E8C"
      extraSection={
        <ImportExportExtra
          heading={t("reach.heading")}
          body={t("reach.body")}
          regions={regions}
        />
      }
    />
  );
}
