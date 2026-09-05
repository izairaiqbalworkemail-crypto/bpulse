"use client";

import type { ReactNode } from "react";
import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Masthead } from "@/components/primitives/Masthead";
import { StickyContact } from "@/components/StickyContact";
import { scrollToSection, takeIntakeJump } from "@/lib/scroll-section";

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const report =
    pathname.startsWith("/report/") ||
    pathname.startsWith("/studio/") ||
    pathname.startsWith("/read/");

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
      <header className="pointer-events-none fixed inset-x-0 top-0 z-40 px-3 pt-3 md:px-5 md:pt-4 lg:px-8">
        <div className="pointer-events-auto mx-auto max-w-[820px]">
          <Masthead />
        </div>
      </header>
      <div className="h-[4.35rem] md:h-[4.85rem]" aria-hidden="true" />
      <main>{children}</main>
      {report ? null : (
        <>
          <StickyContact />
          <Footer />
        </>
      )}
    </>
  );
}
