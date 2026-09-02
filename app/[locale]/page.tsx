import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import HeroSection from "@/components/home/HeroSection";
import IntroSection from "@/components/home/IntroSection";
import ServiceCards from "@/components/home/ServiceCards";
import StatsBand from "@/components/home/StatsBand";
import WhySection from "@/components/home/WhySection";
import CtaBand from "@/components/home/CtaBand";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home.meta" });
  return pageMetadata({ locale, path: "", title: t("title"), description: t("description") });
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <IntroSection />
      <ServiceCards />
      <StatsBand />
      <WhySection />
      <CtaBand />
    </>
  );
}
