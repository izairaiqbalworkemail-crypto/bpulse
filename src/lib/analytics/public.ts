"use client";

import { cleanAnalyticsProps, type AnalyticsEvent } from "@/lib/analytics/events";

type Payload = Record<string, string | number | boolean | null | undefined>;

type UmamiLike = {
  track: (event: string, data?: Record<string, string | number | boolean>) => void;
};

declare global {
  interface Window {
    umami?: UmamiLike;
  }
}

export function track(event: AnalyticsEvent, props?: Payload): void {
  if (process.env.NEXT_PUBLIC_ANALYTICS_DISABLED === "1") return;
  if (typeof window === "undefined") return;
  const data = cleanAnalyticsProps(event, props);
  window.umami?.track(event, data);
}
