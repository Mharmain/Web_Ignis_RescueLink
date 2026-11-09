import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { HowItWorks, Agents, Consoles, Access, Benefits } from "@/components/SolutionSections";
import CtaBand from "@/components/ui/CtaBand";
import { solution } from "@/content/solution";

export const metadata: Metadata = {
  title: "The Solution",
  description: "One alarm, three agents, one screen. See how Ignis RescueLink goes from a confirmed fire alarm to an ambulance at the scene.",
  alternates: { canonical: "/solution" },
};

export default function SolutionPage() {
  const h = solution.hero;
  return (
    <>
      <PageHero eyebrow={h.eyebrow} title={h.title} sub={h.subtitle} />
      <HowItWorks />
      <Agents />
      <Consoles />
      <Access />
      <Benefits />
      <CtaBand />
    </>
  );
}
