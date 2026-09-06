"use client";

import { useEffect, useRef } from "react";
import { track } from "@/lib/analytics/public";
import type { AnalyticsEvent } from "@/lib/analytics/events";

type Props = {
  event: AnalyticsEvent;
  props?: Record<string, string | number | boolean>;
};

export function TrackOnMount({ event, props }: Readonly<Props>) {
  const once = useRef(false);

  useEffect(() => {
    if (once.current) return;
    once.current = true;
    track(event, props);
  }, [event, props]);

  return null;
}
