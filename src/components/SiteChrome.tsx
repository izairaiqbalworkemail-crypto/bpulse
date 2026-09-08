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
    pathname.startsWith("/report/") ||
    pathname.startsWith("/read/") ||
    pathname.startsWith("/match/");
  const home = pathname === "/";
  let mainClass = "min-h-screen bg-paper text-quill";
  if (report) mainClass = "min-h-screen";
  else if (home) mainClass = "letter-night min-h-screen";

  useLayoutEffect(() => {
    document.documentElement.classList.toggle("letter-night", home);
    return () => document.documentElement.classList.remove("letter-night");
  }, [home]);

  useLayoutEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const pinTop = () => {
      if (window.location.hash) {
        window.history.replaceState(null, "", pathname);
      }
      window.scrollTo(0, 0);
    };

    if (takeIntakeJump()) {
      window.history.replaceState(null, "", pathname);
      requestAnimationFrame(() => scrollToSection("intake"));
      return;
    }

    pinTop();
    window.addEventListener("pageshow", pinTop);
    return () => window.removeEventListener("pageshow", pinTop);
  }, [pathname]);

  return (
    <>
      {report ? null : <Masthead />}
      <main className={mainClass}>{children}</main>
      {report ? null : (
        <>
          <DirectStrip />
          <Footer />
        </>
      )}
    </>
  );
}
