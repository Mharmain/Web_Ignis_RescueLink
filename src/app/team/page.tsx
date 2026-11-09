import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import PersonCard from "@/components/PersonCard";
import Reveal from "@/components/ui/Reveal";
import SafeImage from "@/components/ui/SafeImage";
import { team, supervisor, teamPage } from "@/content/team";

export const metadata: Metadata = {
  title: "Team",
  description: "Meet the computer science students and the supervisor behind Ignis RescueLink, a Final Year Project at FAST NUCES Karachi.",
  alternates: { canonical: "/team" },
};

export default function TeamPage() {
  return (
    <>
      <PageHero title={teamPage.title} sub={teamPage.subtitle} />
      <section className="section" aria-label="Team members">
        <ul className="grid gap-6 md:grid-cols-3">
          {team.map((p, i) => (<Reveal as="li" key={p.name} delay={i * 0.1}><PersonCard p={p} /></Reveal>))}
        </ul>
        <Reveal className="mt-6" delay={0.1}><PersonCard p={supervisor} wide /></Reveal>
      </section>
      <section className="section pt-0" aria-labelledby="about-title">
        <Reveal>
          <div className="glass relative overflow-hidden rounded-[28px] px-6 py-12 text-center sm:px-12">
            <SafeImage src="/images/team-banner.jpg" alt="" className="absolute inset-0 h-full w-full opacity-25" fallback={<span />} />
            <div className="relative">
              <h2 id="about-title" className="h2">{teamPage.aboutTitle}</h2>
              <p className="lead mx-auto mt-3 max-w-2xl">{teamPage.aboutText}</p>
              <Link href="/contact" className="btn btn-primary mt-7">Contact us</Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
