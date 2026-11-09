"use client";
import Link from "next/link";
import { home } from "@/content/home";
import { useEnv } from "./EnvProvider";
import AmbulanceIllustration from "./ui/AmbulanceIllustration";

export default function Hero() {
  const h = home.hero;
  const { mode, reduced } = useEnv();
  return (
    <section className="relative min-h-[calc(100svh-72px)]" aria-labelledby="hero-title">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 pb-28 pt-10 sm:px-8 md:pt-16 lg:grid-cols-2 lg:pt-20">
        <div className="glass rounded-3xl p-6 sm:p-8 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none lg:backdrop-blur-none">
          <span className="eyebrow">{h.eyebrow}</span>
          <h1 id="hero-title" className="h1 mt-5">{h.title}</h1>
          <p className="lead mt-5 max-w-xl">{h.subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={h.primary.href} className="btn btn-primary">{h.primary.label}</Link>
            <Link href={h.secondary.href} className="btn btn-secondary">{h.secondary.label}</Link>
          </div>
        </div>
        {/* Right column: the 3D ambulance shows through from the background canvas.
            If 3D is off, we show a static illustration here instead. */}
        <div className="min-h-[260px] lg:min-h-[420px]">
          {mode === "static" && <AmbulanceIllustration className="mx-auto w-full max-w-lg drop-shadow-xl" />}
        </div>
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-muted" aria-hidden="true">
        <div className="flex h-10 w-6 justify-center rounded-full border-2 border-muted/50 pt-2">
          <span className={`h-2 w-1 rounded-full bg-muted ${reduced ? "" : "scroll-dot"}`} />
        </div>
      </div>
    </section>
  );
}
