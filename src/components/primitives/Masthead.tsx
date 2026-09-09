"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { lots } from "@/content/lots";
import { specialists } from "@/content/specialists";
import { cta, siteNav } from "@/config/site";
import { scrollToHero, scrollToSection } from "@/lib/scroll-section";

const details: Record<(typeof siteNav)[number]["href"], string> = {
  "/work": `${lots.length} finished engagements`,
  "/team": `${specialists.length} named engineers`,
  "/pricing": "Every published price",
  "/how-it-works": "How a piece of work runs",
  "/match": "A name for what is stuck",
};

const nav = siteNav.map((item) => ({
  ...item,
  detail: details[item.href],
}));

const FOCUS_TRAP_SELECTOR = "a[href], button:not([disabled])";

export function Masthead() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpenAt, setMenuOpenAt] = useState<string | null>(null);
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const navItems = sessionEmail
    ? [
        ...nav,
        {
          label: "Admin",
          href: "/admin",
          detail: "Operations and follow-up",
        },
      ]
    : nav;

  const open = menuOpenAt === pathname;
  const closeMenu = () => setMenuOpenAt(null);
  const openMenu = () => setMenuOpenAt(pathname);
  const askHref = pathname === "/read" ? "#intake" : cta.href;

  useEffect(() => {
    let active = true;
    void fetch("/api/studio/auth/session", { cache: "no-store" })
      .then((response) => response.json() as Promise<{ authenticated?: boolean; email?: string }>)
      .then((data) => {
        if (!active) return;
        if (data.authenticated && data.email) {
          setSessionEmail(data.email);
          return;
        }
        setSessionEmail(null);
      })
      .catch(() => {
        if (!active) return;
        setSessionEmail(null);
      });

    return () => {
      active = false;
    };
  }, [pathname]);

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

  async function logout() {
    await fetch("/api/studio/auth/logout", { method: "POST" });
    router.push("/");
  }

  function goHome(event: React.MouseEvent<HTMLAnchorElement>) {
    if (pathname !== "/") return;
    event.preventDefault();
    closeMenu();
    scrollToHero();
  }

  function goAsk(event: React.MouseEvent<HTMLAnchorElement>) {
    if (pathname !== "/read") return;
    event.preventDefault();
    closeMenu();
    scrollToSection("intake");
  }

  return (
    <>
      <header className="letter-pill-wrap is-night">
        <div className="letter-pill">
          <Link
            href="/"
            onClick={goHome}
            className="letter-pill-mark"
          >
            bpulse
          </Link>

          <nav aria-label="Primary" className="letter-pill-nav">
            {navItems.map((item) => {
              const on =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={on ? "is-on" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {sessionEmail ? (
            <div className="letter-pill-admin">
              <Link href="/admin">Open admin</Link>
              <button type="button" onClick={() => void logout()}>
                Logout
              </button>
            </div>
          ) : (
            <Link href={askHref} onClick={goAsk} className="letter-pill-ask">
              {cta.label}
            </Link>
          )}
          <button
            type="button"
            onClick={openMenu}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="letter-pill-menu"
          >
            Menu
          </button>
        </div>
      </header>

      {open ? (
        <div
          id="mobile-menu"
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile menu"
          className="letter-pill-overlay"
        >
          <div className="letter-pill-overlay-bar">
            <Link href="/" onClick={goHome} className="letter-pill-mark">
              bpulse
            </Link>
            <button type="button" onClick={closeMenu} className="letter-pill-menu">
              Close
            </button>
          </div>

          <nav aria-label="Mobile" className="letter-pill-overlay-nav">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={closeMenu}>
                <span>{item.label}</span>
                <span>{item.detail}</span>
              </Link>
            ))}
          </nav>

          <div className="letter-pill-overlay-ask">
            {sessionEmail ? (
              <div className="letter-pill-admin">
                <Link
                  href="/admin"
                  onClick={closeMenu}
                  className="btn btn-paper min-h-12 px-6"
                >
                  Open admin
                </Link>
                <button type="button" onClick={() => void logout()}>
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href={askHref}
                onClick={(event) => {
                  goAsk(event);
                  closeMenu();
                }}
                className="btn btn-gold letter-ask min-h-12 px-6 text-[15px]"
              >
                {cta.label}
              </Link>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
