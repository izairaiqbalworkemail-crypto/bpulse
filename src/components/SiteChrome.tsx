"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Masthead } from "@/components/primitives/Masthead";
import { StickyContact } from "@/components/StickyContact";

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const report =
    pathname.startsWith("/report/") || pathname.startsWith("/studio/");

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
