import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import ServicesHub from "@/components/services/ServicesHub";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services.meta" });
  return { title: t("title"), description: t("description") };
}

export default function ServicesPage() {
  return <ServicesHub />;
}
