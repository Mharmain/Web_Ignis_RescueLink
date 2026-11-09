import Link from "next/link";
import Logo from "./Logo";
import { site } from "@/config/site";

export default function Footer() {
  return (
    <footer className="relative z-10 mt-10 bg-navy text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-3">
        <div>
          <Logo light />
          <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-white/75">{site.tagline}</p>
        </div>
        <nav aria-label="Footer">
          <h2 className="text-base font-extrabold">Quick links</h2>
          <ul className="mt-4 space-y-2 text-[15px] text-white/80">
            {[["/", "Home"], ["/solution", "Solution"], ["/team", "Team"], ["/contact", "Contact"]].map(([h, l]) => (
              <li key={h}><Link href={h} className="hover:text-white hover:underline">{l}</Link></li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="text-base font-extrabold">Contact</h2>
          <ul className="mt-4 space-y-2 text-[15px] text-white/80">
            <li><a href={`mailto:${site.contactEmail}`} className="hover:text-white hover:underline">{site.contactEmail}</a></li>
            <li>{site.location}</li>
            <li>{site.institution}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-sm text-white/65">© {site.year} {site.name}</div>
    </footer>
  );
}
