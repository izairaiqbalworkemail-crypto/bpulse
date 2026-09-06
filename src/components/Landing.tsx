"use client";

import { Difference } from "@/components/home/Difference";
import { Questions } from "@/components/home/Questions";
import { Reading } from "@/components/home/Reading";
import { Record } from "@/components/home/Record";
import { StandardRail } from "@/components/home/StandardRail";
import { Terms } from "@/components/home/Terms";
import { View } from "@/components/home/View";

/**
 * Chapters 02–08. 01 is the Pulse (Hero).
 * Deep links stay. Hash is not stripped on load.
 */
export function Landing() {
  return (
    <>
      <Reading />
      <Difference />
      <Record />
      <StandardRail />
      <View />
      <Terms />
      <Questions />
    </>
  );
}
