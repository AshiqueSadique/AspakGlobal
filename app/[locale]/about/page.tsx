import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import MissionVision from "@/components/about/MissionVision";
import ValuesSection from "@/components/about/ValuesSection";
import LeadershipSection from "@/components/about/LeadershipSection";
import TimelineSection from "@/components/about/TimelineSection";
import CtaBand from "@/components/home/CtaBand";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about.meta" });
  return { title: t("title"), description: t("description") };
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <MissionVision />
      <ValuesSection />
      <LeadershipSection />
      <TimelineSection />
      <CtaBand />
    </>
  );
}
