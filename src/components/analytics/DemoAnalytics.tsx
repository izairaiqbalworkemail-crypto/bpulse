"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { track } from "@/lib/analytics/public";

export function DemoAnalytics() {
  const pathname = usePathname();
  const opened = useRef(false);

  useEffect(() => {
    if (!pathname.startsWith("/demo")) return;
    if (!opened.current) {
      opened.current = true;
      track("demo.opened", { surface: "demo" });
    }
    const view = pathname === "/demo" ? "overview" : pathname.replace("/demo/", "");
    track("demo.view.changed", { view });
  }, [pathname]);

  return null;
}
