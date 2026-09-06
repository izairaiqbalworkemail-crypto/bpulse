"use client";

import { ObjectPlate } from "@/components/objects/ObjectPlate";

/**
 * The one start object. Yellow on pages that have not used gold yet.
 */
export function StartPlate({
  kicker,
  heading,
  line,
  href,
  label,
  tone = "signal",
}: Readonly<{
  kicker?: string;
  heading: string;
  line?: string;
  href: string;
  label: string;
  tone?: "paper" | "iron" | "signal";
}>) {
  return (
    <ObjectPlate href={href} tone={tone} className="mt-10 max-w-[36rem]">
      {kicker ? (
        <p className="font-plex-mono text-[12px] uppercase tracking-[0.1em] opacity-70">
          {kicker}
        </p>
      ) : null}
      <p className="mt-2 font-newsreader text-[28px] leading-[1.15] md:text-[32px]">
        {heading}
      </p>
      {line ? (
        <p className="mt-3 max-w-[36ch] font-plex-sans text-[16px] leading-[1.5] opacity-80">
          {line}
        </p>
      ) : null}
      <p className="mt-6 font-plex-sans text-[15px] underline decoration-current/30 underline-offset-4">
        {label}
      </p>
    </ObjectPlate>
  );
}
