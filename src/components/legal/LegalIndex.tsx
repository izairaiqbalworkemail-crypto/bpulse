"use client";

import { useEffect, useState } from "react";

export type LegalIndexItem = {
  href: string;
  id: string;
  label: string;
};

export function LegalIndex({
  items,
}: Readonly<{ items: readonly LegalIndexItem[] }>) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    if (items.length === 0) return;
    const nodes = items
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => Boolean(node));
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0.15, 0.4, 0.7] },
    );

    for (const node of nodes) observer.observe(node);
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="Sections"
      className="legal-chrome sticky top-28 hidden md:block"
    >
      <p className="font-plex-mono text-[11px] uppercase tracking-[0.1em] text-ink/70">
        On this page
      </p>
      <ol className="mt-5">
        {items.map((item) => {
          const on = item.id === active;
          return (
            <li
              key={item.id}
              className="border-t border-iron/8 py-2.5 first:border-t-0 first:pt-0"
            >
              <a
                href={item.href}
                className={`block font-plex-sans text-[14px] leading-[1.35] underline-offset-4 transition-colors duration-200 ${
                  on
                    ? "text-iron underline decoration-iron/40"
                    : "text-ink/70 decoration-transparent hover:text-iron hover:underline hover:decoration-iron/30"
                }`}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
