"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { solution } from "@/content/solution";
import { useEnv } from "./EnvProvider";
import Reveal from "./ui/Reveal";
import TiltCard from "./ui/TiltCard";
import SectionHead from "./ui/SectionHead";
import SafeImage from "./ui/SafeImage";
import Icon from "./ui/Icon";

/** 7 steps on a vertical line that draws itself while scrolling. */
export function HowItWorks() {
  const s = solution.how;
  const ref = useRef<HTMLOListElement>(null);
  const { reduced } = useEnv();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 65%", "end 60%"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="section" aria-labelledby="how-title">
      <SectionHead title={s.title} id="how-title" />
      <ol ref={ref} className="relative mx-auto mt-14 max-w-4xl">
        <div aria-hidden="true" className="absolute bottom-2 left-5 top-2 w-[3px] -translate-x-1/2 rounded bg-line lg:left-1/2">
          <motion.div className="h-full origin-top rounded bg-gradient-to-b from-brand to-blue" style={{ scaleY: reduced ? 1 : scaleY }} />
        </div>
        {s.steps.map((st, i) => {
          const left = i % 2 === 0;
          return (
            <li key={st.title} className="relative pb-10 pl-16 last:pb-0 lg:grid lg:grid-cols-2 lg:gap-16 lg:pl-0">
              <span className="absolute left-0 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-brand text-base font-extrabold text-white shadow-soft ring-4 ring-white lg:left-1/2 lg:-translate-x-1/2">{i + 1}</span>
              <motion.div
                className={`glass rounded-3xl p-6 ${left ? "lg:col-start-1" : "lg:col-start-2"}`}
                style={{ transformPerspective: 1000 }}
                initial={reduced ? false : { opacity: 0, rotateY: left ? 28 : -28, x: left ? -30 : 30, z: -60 }}
                whileInView={{ opacity: 1, rotateY: 0, x: 0, z: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <h3 className="text-xl font-extrabold">{st.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{st.text}</p>
              </motion.div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

export function Agents() {
  const a = solution.agents;
  const colors = ["bg-brand/10 text-brand", "bg-blue/10 text-blue", "bg-green/10 text-green"];
  return (
    <section className="section" aria-labelledby="agents-title">
      <SectionHead title={a.title} id="agents-title" />
      <ul className="mt-12 grid gap-6 md:grid-cols-3">
        {a.items.map((x, i) => (
          <Reveal as="li" key={x.name} delay={i * 0.12}>
            <TiltCard className="glass h-full rounded-3xl p-7">
              <div className="flex items-start justify-between gap-3">
                <span className={`icon-box ${colors[i]}`}><Icon name={x.icon} /></span>
                {x.tag && <span className="rounded-full bg-amber/20 px-3 py-1 text-sm font-bold text-[#7A5200]">{x.tag}</span>}
              </div>
              <h3 className="mt-5 text-xl font-extrabold">{x.name}</h3>
              <p className="mt-2 leading-relaxed text-muted">{x.text}</p>
            </TiltCard>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

function ConsoleCard({ c, delay }: { c: { title: string; image: string; bullets: string[] }; delay: number }) {
  return (
    <Reveal delay={delay} className="h-full">
      <TiltCard className="glass h-full overflow-hidden rounded-3xl" max={4}>
        <SafeImage src={`/images/${c.image}.jpg`} alt={`${c.title} illustration`} className="aspect-[16/9] w-full" />
        <div className="p-7">
          <h3 className="text-2xl font-extrabold">{c.title}</h3>
          <ul className="mt-4 space-y-3">
            {c.bullets.map((b) => (
              <li key={b} className="flex gap-3 text-[15.5px] leading-snug text-navy">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-green/15 text-green"><Icon name="check" className="h-4 w-4" /></span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </TiltCard>
    </Reveal>
  );
}

export function Consoles() {
  const c = solution.consoles;
  return (
    <section className="section" aria-labelledby="consoles-title">
      <SectionHead title={c.title} sub={c.subtitle} id="consoles-title" />
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <ConsoleCard c={c.admin} delay={0} />
        <ConsoleCard c={c.driver} delay={0.12} />
      </div>
    </section>
  );
}

export function Access() {
  const a = solution.access;
  return (
    <section className="section" aria-labelledby="access-title">
      <SectionHead title={a.title} id="access-title" />
      <ul className="mt-10 grid gap-5 md:grid-cols-3">
        {a.items.map((x, i) => (
          <Reveal as="li" key={x.title} delay={i * 0.1}>
            <div className="glass flex h-full gap-4 rounded-3xl p-6">
              <span className="icon-box shrink-0"><Icon name={x.icon} /></span>
              <div><h3 className="text-lg font-extrabold">{x.title}</h3><p className="mt-1 text-[15px] leading-relaxed text-muted">{x.text}</p></div>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

export function Benefits() {
  const b = solution.benefits;
  return (
    <section className="section" aria-labelledby="benefits-title">
      <SectionHead title={b.title} id="benefits-title" />
      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {b.items.map((x, i) => (
          <Reveal as="li" key={x.title} delay={(i % 3) * 0.1}>
            <TiltCard className="glass h-full rounded-3xl p-6">
              <span className="icon-box bg-brand/10 text-brand"><Icon name={x.icon} /></span>
              <h3 className="mt-4 text-lg font-extrabold">{x.title}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{x.text}</p>
            </TiltCard>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
