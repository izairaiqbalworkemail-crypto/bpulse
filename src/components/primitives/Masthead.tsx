"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGroup,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { Mark } from "@/components/primitives/Mark";
import { lots } from "@/content/lots";
import { specialists } from "@/content/specialists";
import { offer } from "@/content/offer";
import { scrollToHero, scrollToSection } from "@/lib/scroll-section";

const nav = [
  {
    label: "Record",
    href: "/work",
    detail: `${lots.length} engagements on the record`,
  },
  {
    label: "Admitted",
    href: "/team",
    detail: `${specialists.length} admitted to the standard`,
  },
  {
    label: "Check",
    href: "/check",
    detail: `$${offer.check.price.toLocaleString()} diagnostic`,
  },
  {
    label: "How",
    href: "/how-it-works",
    detail: "The platform, end to end",
  },
  {
    label: "Assign",
    href: "/match",
    detail: "The platform assigns",
  },
] as const;

const FOCUS_TRAP_SELECTOR = "a[href], button:not([disabled])";
const checkPrice = `$${offer.check.price.toLocaleString("en-US")}`;
const bar = { type: "spring" as const, stiffness: 340, damping: 30 };

export function Masthead() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const [compact, setCompact] = useState(false);
  const [menuOpenAt, setMenuOpenAt] = useState<string | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const open = menuOpenAt === pathname;
  const closeMenu = () => setMenuOpenAt(null);
  const openMenu = () => setMenuOpenAt(pathname);

  useMotionValueEvent(scrollY, "change", (y) => {
    setCompact((was) => (was ? y > 20 : y > 64));
  });

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
      <motion.header
        className="pointer-events-none fixed inset-x-0 top-0 z-40"
        animate={{
          paddingTop: compact ? 10 : 24,
        }}
        transition={reduce ? { duration: 0 } : bar}
      >
        <div className="pointer-events-auto mx-auto max-w-[1120px] px-5 md:px-8">
          <motion.div
            data-masthead={compact ? "compact" : "rest"}
            className="flex items-center justify-between gap-2 rounded-full border border-rag/12 bg-iron-2 p-2 shadow-[0_16px_40px_-20px_rgba(16,16,14,0.55)]"
            animate={{ scale: compact ? 0.92 : 1 }}
            style={{ originY: 0 }}
            transition={reduce ? { duration: 0 } : bar}
          >
            <Link
              href="/"
              onClick={(event) => {
                if (pathname !== "/") return;
                event.preventDefault();
                closeMenu();
                scrollToHero();
              }}
              className="flex shrink-0 items-center gap-2.5 pl-1.5"
            >
              <Mark size={36} />
              <span className="hidden font-plex-sans text-[15px] font-medium tracking-[0.01em] text-rag sm:inline">
                bpulse
              </span>
            </Link>

            <LayoutGroup>
              <nav
                aria-label="Primary"
                className="hidden items-center gap-0.5 md:flex"
              >
                {nav.map((item) => {
                  const on =
                    pathname === item.href ||
                    pathname.startsWith(`${item.href}/`);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`relative rounded-full px-5 py-2.5 font-plex-sans text-[14px] font-medium transition-colors duration-150 ${
                        on ? "text-rag" : "text-rag/75 hover:text-signal"
                      }`}
                    >
                      {item.label}
                      {on ? (
                        <motion.span
                          layoutId="nav-pip"
                          className="absolute inset-x-3 -bottom-0.5 h-[3px] rounded-full bg-signal"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 28,
                          }}
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
                  onClick={(event) => {
                    if (pathname !== "/") return;
                    event.preventDefault();
                    scrollToSection("intake");
                  }}
                  className="inline-flex min-h-11 touch-manipulation items-center rounded-full bg-signal px-5 py-2.5 font-plex-sans text-[14px] font-medium text-iron"
                >
                  Check · {checkPrice}
                </Link>
              </motion.div>
              <button
                type="button"
                onClick={openMenu}
                aria-expanded={open}
                aria-controls="mobile-menu"
                className="min-h-11 touch-manipulation rounded-full px-5 py-2.5 font-plex-mono text-[13px] text-rag/75 transition-colors duration-150 hover:text-rag md:hidden"
              >
                Menu
              </button>
            </div>
          </motion.div>
        </div>
      </motion.header>

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
            <Link
              href="/"
              onClick={(event) => {
                closeMenu();
                if (pathname !== "/") return;
                event.preventDefault();
                scrollToHero();
              }}
              className="flex items-center gap-3"
            >
              <Mark size={40} />
              <span className="font-plex-sans text-[15px] font-medium text-rag">
                bpulse
              </span>
            </Link>
            <button
              type="button"
              onClick={closeMenu}
              className="min-h-11 touch-manipulation rounded-full border border-rag/12 px-5 py-2.5 font-plex-mono text-[13px] text-rag/75 hover:text-rag"
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
                className="touch-manipulation border-b border-rag/12 py-6 hover:text-signal"
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
              onClick={(event) => {
                closeMenu();
                if (pathname !== "/") return;
                event.preventDefault();
                scrollToSection("intake");
              }}
              className="inline-flex min-h-11 touch-manipulation items-center rounded-full bg-signal px-8 py-3.5 font-plex-sans text-[15px] font-medium text-iron"
            >
              Check · {checkPrice}
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
}
