import type { ReactNode } from "react";
import Link from "next/link";
import { legalOwner } from "@/content/documents";

export function legalTitle(name: string) {
  return name.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}

export function LegalPlain({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="legal-plain mt-5">
      <p className="font-plex-mono text-[11px] uppercase tracking-[0.1em] text-ink/70">
        In plain terms
      </p>
      <p className="mt-1.5 font-plex-sans text-[17px] leading-[1.6] text-iron">
        {children}
      </p>
    </div>
  );
}

export function LegalClause({
  number,
  children,
}: Readonly<{ number: string; children: ReactNode }>) {
  return (
    <li className="mt-5 grid grid-cols-[3.5rem_minmax(0,1fr)] gap-3 first:mt-0">
      <span className="pt-0.5 font-plex-mono text-[12px] leading-[1.7] text-ink/70">
        {number}
      </span>
      <p className="font-plex-sans text-[17px] leading-[1.7] text-iron">
        {children}
      </p>
    </li>
  );
}

export function LegalOwnerLine() {
  return (
    <p className="border-t border-iron/10 pt-8 font-plex-sans text-[15px] leading-[1.55] text-ink">
      Legal owner:{" "}
      <Link
        href="/team/hamza"
        className="underline decoration-iron/25 underline-offset-4 hover:decoration-iron"
      >
        {legalOwner.name}
      </Link>
      . {legalOwner.line}{" "}
      <a
        href={`mailto:${legalOwner.email}`}
        className="underline decoration-iron/25 underline-offset-4 hover:decoration-iron"
      >
        {legalOwner.email}
      </a>
      {"."}
    </p>
  );
}

export function LegalJump({
  items,
}: Readonly<{ items: readonly { href: string; label: string }[] }>) {
  return (
    <nav
      aria-label="On this page"
      className="legal-chrome mb-10 flex flex-wrap gap-x-5 gap-y-2 border-b border-iron/10 pb-5 md:hidden"
    >
      {items.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="font-plex-sans text-[13px] text-ink underline decoration-iron/20 underline-offset-4 hover:text-iron hover:decoration-iron"
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
