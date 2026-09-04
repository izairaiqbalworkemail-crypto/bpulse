"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mark } from "@/components/primitives/Mark";
import { lots } from "@/content/lots";
import { specialists } from "@/content/specialists";
import { offer } from "@/content/offer";

const nav = [
  {
    label: "Work",
    href: "/work",
    detail: `${lots.length} lots in the catalogue`,
  },
  {
    label: "Crew",
    href: "/team",
    detail: `${specialists.length} specialists`,
  },
  {
    label: "Check",
    href: "/check",
    detail: `$${offer.check.price.toLocaleString()} diagnostic`,
  },
  { label: "Notices", href: "/notices", detail: "Read before booking" },
] as const;

const FOCUS_TRAP_SELECTOR = "a[href], button:not([disabled])";

export function Masthead() {
  const pathname = usePathname();
  const [menuOpenAt, setMenuOpenAt] = useState<string | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  /* Derived state — the overlay is only "open" on the pathname it was
     opened on, so a route change closes it without an effect. */
  const open = menuOpenAt === pathname;
  const closeMenu = () => setMenuOpenAt(null);
  const openMenu = () => setMenuOpenAt(pathname);

  /* Escape close. */
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpenAt(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  /* Focus trap + scroll lock while open. */
  useEffect(() => {
    if (!open) return;
    const overlay = overlayRef.current;
    if (!overlay) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusables = overlay.querySelectorAll<HTMLElement>(
      FOCUS_TRAP_SELECTOR
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
    <>
      <div className="flex items-center justify-between gap-3 rounded-full border border-rag/12 bg-iron-2 p-2">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <Mark size={32} />
          <span className="hidden font-plex-sans text-[15px] font-medium tracking-[0.01em] text-rag sm:inline">
            bpulse
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative rounded-full px-5 py-2.5 font-plex-sans text-[15px] font-medium text-rag/75 transition-colors duration-150 hover:text-rag focus-visible:text-rag"
            >
              {item.label}
              <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-iron px-3 py-1 font-plex-mono text-[13px] text-rag opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100">
                {item.detail}
              </span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Link
            href="/contact"
            className="hidden rounded-full bg-signal px-5 py-2.5 font-plex-sans text-[15px] font-medium text-iron transition-colors duration-150 hover:bg-signal/90 md:inline-flex"
          >
            Book a call
          </Link>
          <button
            type="button"
            onClick={openMenu}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="rounded-full border border-rag/12 px-5 py-2.5 font-plex-mono text-[13px] text-rag/75 transition-colors duration-150 hover:text-rag md:hidden"
          >
            Menu
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-menu"
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile menu"
          className="on-iron fixed inset-0 z-50 flex flex-col bg-iron text-rag"
        >
          <div className="flex items-center justify-between px-5 pt-4 md:px-8 md:pt-6">
            <div className="flex items-center gap-3">
              <Mark size={32} />
              <span className="font-plex-sans text-[15px] font-medium tracking-[0.01em] text-rag">
                bpulse
              </span>
            </div>
            <button
              type="button"
              onClick={closeMenu}
              className="rounded-full border border-rag/12 px-5 py-2.5 font-plex-mono text-[13px] text-rag/75 transition-colors duration-150 hover:text-rag"
            >
              Close
            </button>
          </div>

          <nav aria-label="Mobile" className="mt-12 flex flex-col px-5 md:px-8">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="border-b border-rag/12 py-6"
              >
                <span className="font-newsreader text-[28px] leading-[1.1] text-rag/75 transition-colors duration-150 hover:text-rag">
                  {item.label}
                </span>
                <span className="mt-1 block font-plex-mono text-[13px] text-rag/70">
                  {item.detail}
                </span>
              </Link>
            ))}
          </nav>

          <div className="mt-auto px-5 pb-10 md:px-8">
            <Link
              href="/contact"
              onClick={closeMenu}
              className="inline-flex rounded-full bg-signal px-8 py-3.5 font-plex-sans text-[15px] font-medium text-iron"
            >
              Book a call
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
}