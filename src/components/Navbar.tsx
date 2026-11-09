"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import Icon from "./ui/Icon";

const links = [
  { href: "/", label: "Home" },
  { href: "/solution", label: "Solution" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [pathname]); // close the menu after navigating

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/75 backdrop-blur-xl">
      <nav aria-label="Main" className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" aria-label="Ignis RescueLink home"><Logo /></Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <li key={l.href}>
                <Link href={l.href} aria-current={active ? "page" : undefined}
                  className={`rounded-xl px-4 py-2 text-[15px] font-bold transition-colors ${active ? "bg-tint text-brand" : "text-navy hover:bg-tint"}`}>
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Link href="/contact?reason=demo" className="btn btn-primary hidden !px-5 !py-2.5 text-[15px] md:inline-flex">Request a Demo</Link>
          <button type="button" className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-white md:hidden"
            aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((v) => !v)}>
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-line bg-white/95 px-5 pb-5 pt-3 md:hidden">
          <ul className="flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} aria-current={pathname === l.href ? "page" : undefined}
                  className={`block rounded-xl px-4 py-3 font-bold ${pathname === l.href ? "bg-tint text-brand" : "text-navy"}`}>{l.label}</Link>
              </li>
            ))}
          </ul>
          <Link href="/contact?reason=demo" className="btn btn-primary mt-3 w-full">Request a Demo</Link>
        </div>
      )}
    </header>
  );
}
