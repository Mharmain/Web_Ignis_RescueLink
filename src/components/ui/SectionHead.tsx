import Reveal from "./Reveal";
export default function SectionHead({ eyebrow, title, sub, id, center = true }: { eyebrow?: string; title: string; sub?: string; id?: string; center?: boolean }) {
  return (
    <Reveal className={`mx-auto max-w-3xl ${center ? "text-center" : ""}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 id={id} className={`h2 ${eyebrow ? "mt-4" : ""}`}>{title}</h2>
      {sub && <p className="lead mt-3">{sub}</p>}
    </Reveal>
  );
}
