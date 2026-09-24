"use client";

import type { ReactNode } from "react";
import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { Footer } from "@/components/Footer";
import { DirectStrip } from "@/components/direct/DirectStrip";
import { Masthead } from "@/components/primitives/Masthead";
import { scrollToSection, takeIntakeJump } from "@/lib/scroll-section";

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const report =
    pathname === "/report" ||
    pathname.startsWith("/report/") ||
    pathname.startsWith("/read/") ||
    pathname.startsWith("/match/") ||
    pathname.startsWith("/careers/diagnostic/") ||
    pathname.startsWith("/careers/status/");
  const home = pathname === "/";
  const bleed = !report;
  const strip =
    pathname === "/about" ||
    pathname.startsWith("/work") ||
    pathname.startsWith("/team");
  const mainClass = report
    ? "min-h-screen"
    : "letter-bleed min-h-screen bg-paper";

  useLayoutEffect(() => {
    document.documentElement.classList.toggle("letter-bleed", bleed);
    return () => {
      document.documentElement.classList.remove("letter-bleed");
    };
  }, [bleed]);

  useLayoutEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const jumpToHash = () => {
      const id = window.location.hash.replace(/^#/, "");
      if (!id) return false;
      if (!document.getElementById(id)) return false;
      requestAnimationFrame(() => scrollToSection(id));
      return true;
    };

    const pinTop = () => {
      if (jumpToHash()) return;
      window.scrollTo(0, 0);
    };

    if (takeIntakeJump()) {
      window.history.replaceState(null, "", pathname);
      requestAnimationFrame(() => scrollToSection("intake"));
      return;
    }

    if (!jumpToHash()) {
      const retry = window.setTimeout(() => {
        if (!jumpToHash()) pinTop();
      }, 80);
      window.addEventListener("pageshow", pinTop);
      return () => {
        window.clearTimeout(retry);
        window.removeEventListener("pageshow", pinTop);
      };
    }

    window.addEventListener("pageshow", pinTop);
    return () => window.removeEventListener("pageshow", pinTop);
  }, [pathname]);

  return (
    <>
      {report ? null : <Masthead />}
      <main className={mainClass}>{children}</main>
      {report ? null : (
        <>
          {home || !strip ? null : <DirectStrip />}
          <Footer />
        </>
      )}
    </>
  );
}
