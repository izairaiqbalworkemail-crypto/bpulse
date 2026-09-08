"use client";

import { Reveal, Rise } from "@/components/landing/Reveal";

type IntroTone = "paper" | "ink";

const kickerTone: Record<IntroTone, string> = {
  paper: "text-quill/70",
  ink: "text-paper/60",
};

const headingTone: Record<IntroTone, string> = {
  paper: "text-ink",
  ink: "text-paper",
};

const dekTone: Record<IntroTone, string> = {
  paper: "text-quill",
  ink: "text-paper/75",
};

export function SectionIntro({
  id,
  n,
  kicker,
  heading,
  dek,
  tone = "paper",
  headingMax = "max-w-[16ch]",
  dekMax = "max-w-[44ch]",
}: Readonly<{
  id: string;
  n: string;
  kicker: string;
  heading: string;
  dek?: string;
  tone?: IntroTone;
  headingMax?: string;
  dekMax?: string;
}>) {
  return (
    <>
      <Reveal>
        <p className={`font-plex-mono text-[11px] uppercase tracking-[0.14em] ${kickerTone[tone]}`}>
          {n} · {kicker}
        </p>
      </Reveal>
      <Rise delay={0.05}>
        <h2
          id={id}
          className={`mt-5 font-newsreader text-[clamp(2rem,4vw,3.5rem)] leading-[1.06] tracking-[-0.02em] ${headingTone[tone]} ${headingMax}`}
        >
          {heading}
        </h2>
      </Rise>
      {dek ? (
        <Reveal delay={0.1}>
          <p className={`mt-5 font-plex-sans text-[16px] leading-[1.55] ${dekTone[tone]} ${dekMax}`}>
            {dek}
          </p>
        </Reveal>
      ) : null}
    </>
  );
}
