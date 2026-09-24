import type { ReactNode } from "react";
import { Reveal, Rise } from "@/components/landing/Reveal";

export type EpisodeTone = "paper" | "milk" | "cocoa" | "signal";

const surface: Record<EpisodeTone, string> = {
  paper: "bg-paper text-ink",
  milk: "bg-paper text-ink",
  cocoa: "on-ink bg-ink text-read",
  signal: "on-ink bg-ink text-read",
};

const headingTone: Record<EpisodeTone, string> = {
  paper: "text-headline",
  milk: "text-headline",
  cocoa: "text-paper",
  signal: "text-paper",
};

const dekTone: Record<EpisodeTone, string> = {
  paper: "text-quill",
  milk: "text-quill",
  cocoa: "text-read",
  signal: "text-read",
};

type EpisodeSize = "short" | "default" | "tall";

type EpisodeProps = {
  labelledBy?: string;
  children: ReactNode;
  tone?: EpisodeTone;
  size?: EpisodeSize;
};

const roomPad: Record<EpisodeSize, string> = {
  short: "py-20 md:py-24",
  default: "py-24 md:py-32",
  tall: "py-28 md:py-36",
};

/**
 * One room on the ribbon. Cream or ink. Yellow never fills the room.
 */
export function Episode({
  labelledBy,
  children,
  tone = "paper",
  size = "default",
}: Readonly<EpisodeProps>) {
  return (
    <section
      id={labelledBy}
      aria-labelledby={labelledBy ? `${labelledBy}-heading` : undefined}
      className={`ribbon relative scroll-mt-[5.75rem] md:scroll-mt-28 ${surface[tone]}`}
    >
      <div className={`relative stage-container ${roomPad[size]}`}>{children}</div>
    </section>
  );
}

type EpisodeHeadProps = {
  n: string;
  kicker: string;
  id: string;
  heading: string;
  tone?: EpisodeTone;
  aside?: ReactNode;
  children?: ReactNode;
};

export function EpisodeHead({
  n,
  kicker,
  id,
  heading,
  tone = "paper",
  aside,
  children,
}: Readonly<EpisodeHeadProps>) {
  return (
    <div className="flex items-end justify-between gap-8">
      <div className="min-w-0">
        <Reveal>
          <p
            className={`lp-section-label ${
              tone === "cocoa" || tone === "signal" ? "lp-section-label-ink" : ""
            }`}
          >
            {n} · {kicker}
          </p>
        </Reveal>
        <Rise delay={0.06}>
          <h2
            id={`${id}-heading`}
            className={`type-display mt-6 max-w-[16ch] font-newsreader text-[clamp(2rem,4vw,3.5rem)] ${headingTone[tone]}`}
          >
            {heading}
          </h2>
        </Rise>
        {children ? (
          <Reveal delay={0.1}>
            <p
              className={`mt-5 max-w-[42ch] font-plex-sans text-[17px] leading-[1.5] ${dekTone[tone]}`}
            >
              {children}
            </p>
          </Reveal>
        ) : null}
        {aside ? (
          <Reveal delay={0.16} className="mt-6 sm:hidden">
            {aside}
          </Reveal>
        ) : null}
      </div>
      {aside ? (
        <Reveal delay={0.16} className="hidden shrink-0 pb-2 sm:block">
          {aside}
        </Reveal>
      ) : null}
    </div>
  );
}
