"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Footer } from "@/components/Footer";
import { StickyContact } from "@/components/StickyContact";

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const bare = pathname.startsWith("/report/");

  return (
    <>
      <main>{children}</main>
      {bare ? null : (
        <>
          <StickyContact />
          <Footer />
        </>
      )}
    </>
  );
}
