"use client";

import { useSyncExternalStore } from "react";
import { BriefIntake } from "@/components/intake/BriefIntake";
import { readMatchBrief } from "@/lib/match/session";

function subscribe() {
  return () => {
    /* sessionStorage is read once for this visit */
  };
}

function getBrief() {
  return readMatchBrief().brief;
}

function emptyBrief() {
  return "";
}

export function MatchPrefill({
  specialistId,
}: Readonly<{ specialistId: string }>) {
  const brief = useSyncExternalStore(subscribe, getBrief, emptyBrief);

  return (
    <BriefIntake
      key={brief ? "from-match" : "open"}
      type="work"
      source="match"
      workWith={specialistId}
      prefill={brief ? { build: brief } : undefined}
    />
  );
}
