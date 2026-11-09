"use client";
import Link from "next/link";
import { home } from "@/content/home";
import Reveal from "./ui/Reveal";
import TiltCard from "./ui/TiltCard";
import SectionHead from "./ui/SectionHead";
import SafeImage from "./ui/SafeImage";
import Icon from "./ui/Icon";

export function Problem() {
  const p = home.problem;
  return (
    <section className="section" aria-labelledby="problem-title">
      <SectionHead eyebrow={p.eyebrow} title={p.title} id="problem-title" />
      <ul className="mt-12 grid gap-6 md:grid-cols-3">
        {p.cards.map((c, i) => (
          <Reveal as="li" key={c.title} delay={i * 0.12}>
            <TiltCard className="glass h-full rounded-3xl p-7">
              <span className="icon-box"><Icon name={c.icon} /></span>
              <h3 className="mt-5 text-xl font-extrabold">{c.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{c.text}</p>
            </TiltCard>
          </Reveal>
        ))}
      </ul>
      <Reveal className="mt-10 text-center"><p className="text-xl font-extrabold text-brand">{p.closing}</p></Reveal>
    </section>
  );
}

export function Why() {
  const w = home.why;
  return (
    <section className="section" aria-labelledby="why-title">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <div className="glass rounded-3xl p-7 sm:p-9">
            <span className="eyebrow">{w.eyebrow}</span>
            <h2 id="why-title" className="h2 mt-4">{w.title}</h2>
            <div className="mt-5 space-y-4 leading-relaxed text-muted">{w.paragraphs.map((t) => <p key={t}>{t}</p>)}</div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <SafeImage src="/images/karachi-skyline.jpg" alt="Skyline of Karachi" className="aspect-[4/3] w-full rounded-3xl shadow-glass" />
        </Reveal>
      </div>
      <SectionHead title={w.timelineTitle} />
      <ol className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {w.timeline.map((s, i) => (
          <Reveal as="li" key={s.title} delay={i * 0.1}>
            <div className="glass relative h-full rounded-3xl p-6 pt-9">
              <span className="absolute -top-4 left-6 grid h-9 w-9 place-items-center rounded-full bg-brand text-sm font-extrabold text-white shadow-soft">{i + 1}</span>
              <h3 className="text-lg font-extrabold">{s.title}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{s.text}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

export function Who() {
  const w = home.who;
  return (
    <section className="section" aria-labelledby="who-title">
      <SectionHead title={w.title} id="who-title" />
      <ul className="mt-12 grid gap-6 md:grid-cols-3">
        {w.cards.map((c, i) => (
          <Reveal as="li" key={c.title} delay={i * 0.12}>
            <TiltCard className="glass h-full rounded-3xl p-7">
              <span className="icon-box bg-brand/10 text-brand"><Icon name={c.icon} /></span>
              <h3 className="mt-5 text-xl font-extrabold">{c.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{c.text}</p>
            </TiltCard>
          </Reveal>
        ))}
      </ul>
      <div className="mt-8 text-center"><Link href="/solution" className="font-bold text-blue underline underline-offset-4">See how it works</Link></div>
    </section>
  );
}
