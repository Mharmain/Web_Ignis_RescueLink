"use client";
import { useEffect, useRef, useState } from "react";
import { site } from "@/config/site";
import { home } from "@/content/home";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";
import Icon from "./Icon";

export default function VideoSection() {
  const v = home.video;
  const yt = site.video.youtubeEmbedUrl;
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  // If the file is missing, show the "coming soon" card instead of a broken player.
  useEffect(() => {
    if (yt) return;
    fetch(site.video.file, { method: "HEAD" })
      .then((r) => { if (!r.ok) setFailed(true); })
      .catch(() => setFailed(true));
  }, [yt]);

  return (
    <section className="section" aria-labelledby="video-title">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="eyebrow">{v.eyebrow}</span>
        <h2 id="video-title" className="h2 mt-4">{v.title}</h2>
        <p className="lead mt-3">{v.subtitle}</p>
      </Reveal>
      <Reveal className="mx-auto mt-10 max-w-4xl" delay={0.1}>
        <TiltCard max={4}>
          <div className="relative rounded-[28px] bg-white/60 p-2.5 shadow-[0_30px_90px_-20px_rgba(229,72,77,0.35)] ring-1 ring-line">
            <div className="aspect-video overflow-hidden rounded-[22px] bg-navy">
              {yt ? (
                <iframe src={yt} title="Ignis RescueLink walkthrough video" className="h-full w-full" allow="encrypted-media; picture-in-picture" allowFullScreen loading="lazy" />
              ) : failed ? (
                <div className="grid h-full place-items-center bg-gradient-to-br from-tint to-white px-6 text-center">
                  <div>
                    <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand/10 text-brand"><Icon name="clock" className="h-8 w-8" /></span>
                    <p className="mt-4 text-xl font-extrabold">{v.fallbackTitle}</p>
                    <p className="mt-1 text-muted">{v.fallbackText}</p>
                  </div>
                </div>
              ) : (
                <video ref={ref} className="h-full w-full" controls preload="metadata" playsInline poster={site.video.poster}
                  src={site.video.file} onError={() => setFailed(true)}>
                  Your browser cannot play this video.
                </video>
              )}
            </div>
          </div>
        </TiltCard>
      </Reveal>
    </section>
  );
}
