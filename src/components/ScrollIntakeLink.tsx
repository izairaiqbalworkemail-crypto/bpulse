"use client";

import type { ReactNode } from "react";
import { scrollToSection } from "@/lib/scroll-section";

export function ScrollIntakeLink({
  children,
  className,
}: Readonly<{ children: ReactNode; className?: string }>) {
  return (
    <a
      href="#intake"
      className={className}
      onClick={(event) => {
        event.preventDefault();
        scrollToSection("intake");
      }}
    >
      {children}
    </a>
  );
}