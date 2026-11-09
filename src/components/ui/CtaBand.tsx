import Link from "next/link";
import SafeImage from "./SafeImage";
import Reveal from "./Reveal";
import { home } from "@/content/home";

// Shared call-to-action band (Home + Solution).
export default function CtaBand() {
  const c = home.cta;
  return (
    <section className="section">
      <Reveal>
        <div className="relative overflow-hidden rounded-[28px] bg-navy shadow-glass">
          <SafeImage src="/images/ambulance-road.jpg" alt="" className="absolute inset-0 h-full w-full" fallback={<span />} />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-brand/75" aria-hidden="true" />
          <div className="relative px-6 py-14 text-center text-white sm:px-12 md:py-20">
            <h2 className="mx-auto max-w-2xl text-[clamp(1.6rem,3.4vw,2.5rem)] font-extrabold leading-tight">{c.title}</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/85">{c.text}</p>
            <Link href={c.button.href} className="btn mt-8 bg-white text-brand hover:bg-tint">{c.button.label}</Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
