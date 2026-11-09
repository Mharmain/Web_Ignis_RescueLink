import type { Metadata } from "next";
import Hero from "@/components/Hero";
import { Problem, Why, Who } from "@/components/HomeSections";
import VideoSection from "@/components/ui/VideoSection";
import CtaBand from "@/components/ui/CtaBand";

export const metadata: Metadata = {
  title: { absolute: "Ignis RescueLink | An Automated Emergency Response System For Ambulance Drivers" },
  description: "From the fire alarm to the building, one screen. Ignis RescueLink alerts the nearest ambulances, plans a traffic-aware route and guides the driver hands-free.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Problem />
      <Why />
      <VideoSection />
      <Who />
      <CtaBand />
    </>
  );
}
