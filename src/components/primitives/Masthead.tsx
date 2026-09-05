"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGroup,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
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
  {
    label: "How",
    href: "/how-it-works",
    detail: "Six stages, written down",
  },
  {
    label: "Match",
    href: "/match",
    detail: "Against work we already did",
  },
] as const;

const FOCUS_TRAP_SELECTOR = "a[href], button:not([disabled])";
const checkPrice = `$${offer.check.price.toLocaleString("en-US")}`;

export function Masthead() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const [menuOpenAt, setMenuOpenAt] = useState<string | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const scale = useTransform(scrollY, [0, 220], [1, 0.9]);
  const y = useTransform(scrollY, [0, 220], [0, 6]);

  const open = menuOpenAt === pathname;
  const closeMenu = () => setMenuOpenAt(null);
  const openMenu = () => setMenuOpenAt(pathname);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpenAt(null);
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
    const focusables = overlay.querySelectorAll<HTMLElement>(FOCUS_TRAP_SELECTOR);
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
        lastFocusable.focus();
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
      <motion.div
        style={reduce ? undefined : { scale, y }}
        className="origin-top"
      >
        <div className="flex items-center justify-between gap-2 rounded-full border border-rag/15 bg-iron/92 p-2 shadow-[0_18px_50px_-18px_rgba(13,18,24,0.65)] backdrop-blur-xl">
          <Link href="/" className="flex shrink-0 items-center gap-2.5 pl-1.5">
            <Mark size={36} />
            <span className="hidden font-plex-sans text-[15px] font-medium tracking-[0.01em] text-rag sm:inline">
              bpulse
            </span>
          </Link>

          <LayoutGroup>
          <nav aria-label="Primary" className="hidden items-center gap-0.5 md:flex">
            {nav.map((item) => {
              const on =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative rounded-full px-4 py-2 font-plex-sans text-[14px] font-medium transition-colors duration-200 ${
                    on ? "text-rag" : "text-rag/70 hover:text-rag"
                  }`}
                >
                  {item.label}
                  {on ? (
                    <motion.span
                      layoutId="nav-pip"
                      className="absolute inset-x-3 -bottom-0.5 h-[3px] rounded-full bg-signal"
                      transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    />
                  ) : null}
                </Link>
              );
            })}
          </nav>
          </LayoutGroup>

          <div className="flex items-center gap-1">
            <motion.div
              className="hidden md:block"
              whileHover={reduce ? undefined : { scale: 1.04, y: -1 }}
              whileTap={reduce ? undefined : { scale: 0.97 }}
              transition={{ type: "spring", stiffness: 380, damping: 24 }}
            >
              <Link
                href="/check"
                className="inline-flex rounded-full bg-signal px-4 py-2 font-plex-sans text-[14px] font-medium text-iron"
              >
                Check · {checkPrice}
              </Link>
            </motion.div>
            <button
              type="button"
              onClick={openMenu}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="rounded-full border border-rag/15 px-4 py-2 font-plex-mono text-[13px] text-rag/75 hover:text-rag md:hidden"
            >
              Menu
            </button>
          </div>
        </div>
      </motion.div>

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
              <Mark size={40} />
              <span className="font-plex-sans text-[15px] font-medium text-rag">
                bpulse
              </span>
            </div>
            <button
              type="button"
              onClick={closeMenu}
              className="rounded-full border border-rag/12 px-5 py-2.5 font-plex-mono text-[13px] text-rag/75 hover:text-rag"
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
                <span className="font-newsreader text-[32px] leading-[1.1] text-rag">
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
              href="/check"
              onClick={closeMenu}
              className="inline-flex rounded-full bg-signal px-8 py-3.5 font-plex-sans text-[15px] font-medium text-iron"
            >
              Check · {checkPrice}
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
}
