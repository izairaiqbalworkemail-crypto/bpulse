"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Mark } from "@/components/primitives/Mark";
import { lots } from "@/content/lots";
import { specialists } from "@/content/specialists";
import { offer } from "@/content/offer";

const nav = [
  {
    label: "Work",
    href: "/work",
    detail: `${lots.slice(0, 6).length} lots in the catalogue`,
  },
  { label: "Crew", href: "/team", detail: `${specialists.length} specialists` },
  {
    label: "Check",
    href: "/check",
    detail: `$${offer.check.price.toLocaleString()} diagnostic`,
  },
  { label: "Notices", href: "/notices", detail: "Read before booking" },
] as const;

export function Masthead() {
  const [open, setOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const overlay = overlayRef.current;
    if (!overlay) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusables = overlay.querySelectorAll<HTMLElement>(
      "a[href], button:not([disabled])"
    );
    const first = focusables[0] ?? overlay;
    first.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || focusables.length === 0) return;
      const firstFocusable = focusables[0];
      const lastFocusable = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable.focus();
      } else if (!event.shiftKey && document.activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="w-full bg-rag text-iron">
      <div className="grid-container pt-6 md:pt-8">
        <p className="font-plex-mono text-caption tracking-[0.08em] text-ink/70 uppercase">
          No. 1 · Sep 2026 · {lots.slice(0, 6).length} lots in the catalogue ·
          reply in 1 day
        </p>

        <div className="mt-4 flex items-center justify-between gap-4 rounded-full border border-iron/15 bg-rag-card px-5 py-3 shadow-[var(--shadow-card)] md:px-8">
          <Link href="/" className="inline-flex items-center gap-3">
            <Mark size={26} />
            <span className="font-plex-sans text-lg font-medium tracking-tight text-iron">
              bpulse
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative font-plex-sans text-sm font-medium text-ink/70 transition-colors duration-150 hover:text-iron focus-visible:text-iron"
              >
                {item.label}
                <span className="pointer-events-none absolute left-1/2 mt-2 -translate-x-1/2 whitespace-nowrap rounded-full border border-iron/20 bg-iron px-3 py-1 font-plex-mono text-[0.62rem] tracking-[0.08em] text-rag opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100">
                  {item.detail}
                </span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/check"
              className="hidden rounded-full border border-iron/20 px-5 py-2.5 font-plex-sans text-sm font-medium text-iron transition-colors duration-150 hover:border-iron/40 md:inline-flex"
            >
              Start with the check
            </Link>
            <Link
              href="/contact"
              className="hidden rounded-full bg-signal px-6 py-2.5 font-plex-sans text-sm font-medium text-signal-ink transition-all duration-150 hover:brightness-95 md:inline-flex"
            >
              Book a call
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="rounded-full border border-iron/20 px-4 py-2.5 font-plex-mono text-caption tracking-[0.08em] text-iron lg:hidden"
            >
              Menu
            </button>
          </div>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-menu"
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile menu"
          className="fixed inset-0 z-50 bg-rag text-iron"
        >
          <div className="grid-container flex h-full flex-col py-6">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-3">
                <Mark size={26} />
                <span className="font-plex-sans text-lg font-medium tracking-tight">bpulse</span>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-iron/20 px-4 py-2.5 font-plex-mono text-caption text-iron"
              >
                Close
              </button>
            </div>

            <nav aria-label="Mobile" className="mt-8 flex flex-col gap-4">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-[16px] border border-iron/15 bg-rag-card px-5 py-4 shadow-[var(--shadow-card)]"
                >
                  <p className="font-newsreader text-h2 leading-title text-iron">{item.label}</p>
                  <p className="mt-1 font-plex-mono text-caption tracking-[0.08em] text-ink/70 uppercase">
                    {item.detail}
                  </p>
                </Link>
              ))}
            </nav>

            <div className="mt-auto">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="inline-flex rounded-full bg-signal px-8 py-4 font-plex-sans text-sm font-medium text-signal-ink"
              >
                Book a call
              </Link>
            </div>
          </div>
        </div>
      ) : null}

      <div className="mt-6 h-px w-full bg-iron/15" />
    </header>
  );
}
