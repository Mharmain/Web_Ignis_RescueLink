import type { Metadata } from "next";
import { Suspense } from "react";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/ui/Reveal";
import Icon from "@/components/ui/Icon";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Want a demo, have a question, or interested in working with us? Send the Ignis RescueLink team a message.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero title="Let's talk" sub="Want a demo, have a question, or interested in working with us? Send us a message and we will get back to you." />
      <section className="section" aria-label="Contact details and form">
        <div className="grid gap-8 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <aside className="glass rounded-3xl p-7">
              <ul className="space-y-6">
                <li className="flex gap-4"><span className="icon-box shrink-0"><Icon name="mail" /></span>
                  <div><h2 className="font-extrabold">Email</h2><a href={`mailto:${site.contactEmail}`} className="break-all text-blue underline underline-offset-4">{site.contactEmail}</a></div></li>
                <li className="flex gap-4"><span className="icon-box shrink-0"><Icon name="pin" /></span>
                  <div><h2 className="font-extrabold">Location</h2><p className="text-muted">{site.location}</p></div></li>
                <li className="flex gap-4"><span className="icon-box shrink-0"><Icon name="history" /></span>
                  <div><h2 className="font-extrabold">Project</h2><p className="text-muted">{site.institution}</p></div></li>
              </ul>
              <div className="mt-7 border-t border-line pt-6">
                <p className="font-extrabold">You can write to us about:</p>
                <ul className="mt-3 space-y-2 text-muted">
                  {["A demo of Ignis RescueLink", "Collaboration or partnership", "Feedback or questions"].map((t) => (
                    <li key={t} className="flex gap-2"><Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-green" />{t}</li>
                  ))}
                </ul>
              </div>
            </aside>
          </Reveal>
          <Reveal className="lg:col-span-3" delay={0.1}>
            <Suspense fallback={<div className="glass rounded-3xl p-8">Loading form…</div>}><ContactForm /></Suspense>
          </Reveal>
        </div>
      </section>
    </>
  );
}
