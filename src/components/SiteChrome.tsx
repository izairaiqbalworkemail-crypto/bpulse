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
  const home = pathname === "/";
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
      {home ? null : (
        <header className="bg-rag px-5 pt-5 md:px-8 md:pt-7">
          <div className="mx-auto max-w-[960px]">
            <Masthead variant="solid" />
          </div>
        </header>
      )}
      <main>{children}</main>
      {report ? null : (
        <>
          <DirectStrip />
          <Footer />
        </>
      )}
    </>
  );
}
