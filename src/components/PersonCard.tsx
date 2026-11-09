"use client";
import { Person } from "@/content/team";
import SafeImage from "./ui/SafeImage";
import TiltCard from "./ui/TiltCard";
import Icon from "./ui/Icon";

function initials(name: string) {
  return name.replace(/^Dr\.?\s+/i, "").split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

export default function PersonCard({ p, wide = false }: { p: Person; wide?: boolean }) {
  const avatar = (
    <span className="grid h-full w-full place-items-center rounded-full bg-gradient-to-br from-blue to-brand text-3xl font-extrabold text-white">{initials(p.name)}</span>
  );
  return (
    <TiltCard className={`glass h-full rounded-3xl p-7 ${wide ? "md:flex md:items-center md:gap-8" : "text-center"}`} max={5}>
      <div className={`h-32 w-32 shrink-0 overflow-hidden rounded-full ring-4 ring-white shadow-soft ${wide ? "" : "mx-auto"}`}>
        {p.photo ? <SafeImage src={p.photo} alt={`Photo of ${p.name}`} className="h-full w-full rounded-full" fallback={avatar} /> : avatar}
      </div>
      <div className={wide ? "mt-5 md:mt-0" : "mt-5"}>
        <h3 className="text-xl font-extrabold">{p.name}</h3>
        <p className="mt-0.5 font-bold text-brand">{p.role}</p>
        {p.title && <p className="mt-3 font-extrabold text-navy">{p.title}</p>}
        <p className={`${p.title ? "mt-1" : "mt-3"} leading-relaxed text-muted`}>{p.bio}</p>
        {(p.linkedin || p.github) && (
          <div className={`mt-4 flex gap-3 ${wide ? "" : "justify-center"}`}>
            {p.linkedin && <a href={p.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${p.name} on LinkedIn`} className="grid h-10 w-10 place-items-center rounded-xl bg-tint text-blue hover:bg-blue hover:text-white"><Icon name="linkedin" className="h-5 w-5" /></a>}
            {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" aria-label={`${p.name} on GitHub`} className="grid h-10 w-10 place-items-center rounded-xl bg-tint text-blue hover:bg-blue hover:text-white"><Icon name="github" className="h-5 w-5" /></a>}
          </div>
        )}
      </div>
    </TiltCard>
  );
}
