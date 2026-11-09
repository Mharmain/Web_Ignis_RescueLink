import Reveal from "./ui/Reveal";
export default function PageHero({ eyebrow, title, sub, children }: { eyebrow?: string; title: string; sub: string; children?: React.ReactNode }) {
  return (
    <section className="relative mx-auto max-w-6xl px-5 pb-6 pt-14 text-center sm:px-8 md:pt-24" aria-labelledby="page-title">
      <Reveal>
        <div className="glass mx-auto max-w-3xl rounded-[28px] px-6 py-10 sm:px-10">
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h1 id="page-title" className={`h1 ${eyebrow ? "mt-5" : ""}`}>{title}</h1>
          <p className="lead mx-auto mt-5 max-w-2xl">{sub}</p>
          {children}
        </div>
      </Reveal>
    </section>
  );
}
