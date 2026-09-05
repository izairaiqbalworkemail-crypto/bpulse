"use client";

import { CrewSession } from "@/components/intake/CrewSession";

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

/**
 * The Check door. Same conversation engine as contact, about, and the
 * crew pages — not a stack of boxes.
 */
export function PulseCheckIntake({
  prefill,
  source = "check",
}: Readonly<PulseCheckIntakeProps>) {
  const seeded: Record<string, string> = {};
  const situation = SITUATIONS.find((item) => item.id === prefill?.situation);
  if (situation) seeded.situation = situation.label;
  if (prefill?.stuckNote) seeded.build = prefill.stuckNote;

  return (
    <CrewSession
      type="check"
      source={source}
      prefill={Object.keys(seeded).length > 0 ? seeded : undefined}
    />
  );
}
