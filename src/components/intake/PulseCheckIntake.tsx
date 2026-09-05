"use client";

import { useSyncExternalStore } from "react";
import { ConditionDesk } from "@/components/intake/ConditionDesk";
import { readMatchBrief } from "@/lib/match/session";

const SITUATIONS = [
  { id: "almost", label: "Almost done" },
  { id: "stalled", label: "Stalled" },
  { id: "fragile", label: "Live, but fragile" },
  { id: "idea", label: "Just an idea" },
] as const;

export type PulseCheckSituation = (typeof SITUATIONS)[number]["id"];

export type PulseCheckPrefill = {
  situation?: PulseCheckSituation;
  stuckNote?: string;
};

type PulseCheckIntakeProps = {
  prefill?: PulseCheckPrefill;
  source?: string;
};

function subscribe() {
  return () => {
    /* sessionStorage is read once for this visit */
  };
}

function getMatchWound() {
  return readMatchBrief().brief;
}

function emptyWound() {
  return "";
}

export function PulseCheckIntake({
  prefill,
  source = "check",
}: Readonly<PulseCheckIntakeProps>) {
  const matchWound = useSyncExternalStore(subscribe, getMatchWound, emptyWound);
  const seeded: Record<string, string> = {};
  const situation = SITUATIONS.find((item) => item.id === prefill?.situation);
  if (situation) seeded.situation = situation.label;
  if (prefill?.stuckNote) seeded.build = prefill.stuckNote;
  if (!seeded.build && matchWound) seeded.build = matchWound;

  return (
    <ConditionDesk
      key={`${seeded.situation ?? ""}:${seeded.build ? "wound" : "open"}`}
      source={source}
      prefill={Object.keys(seeded).length > 0 ? seeded : undefined}
    />
  );
}
