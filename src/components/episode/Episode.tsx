import type { ReactNode } from "react";
import { Reveal, Rise } from "@/components/landing/Reveal";

export type EpisodeTone = "paper" | "milk" | "cocoa" | "signal";

const surface: Record<EpisodeTone, string> = {
  paper: "bg-rag text-iron",
  milk: "border-y border-iron/8 bg-rag-card text-iron",
  cocoa: "on-iron bg-iron-2 text-rag",
  signal: "bg-signal text-iron",
};

const kickerTone: Record<EpisodeTone, string> = {
  paper: "text-ink/70",
  milk: "text-ink/70",
  cocoa: "text-rag/70",
  signal: "text-iron/70",
};

const headingTone: Record<EpisodeTone, string> = {
  paper: "text-iron",
  milk: "text-iron",
  cocoa: "text-rag",
  signal: "text-iron",
};

const dekTone: Record<EpisodeTone, string> = {
  paper: "text-ink",
  milk: "text-ink",
  cocoa: "text-rag/80",
  signal: "text-iron/80",
};

const ruleTone: Record<EpisodeTone, string> = {
  paper: "text-iron",
  milk: "text-iron",
  cocoa: "text-rag",
  signal: "text-iron",
};

type EpisodeProps = {
  labelledBy?: string;
  children: ReactNode;
  tone?: EpisodeTone;
};

/**
 * One room. Flat colour. Same stage, same rhythm.
 */
export function Episode({
  labelledBy,
  children,
  tone = "paper",
}: Readonly<EpisodeProps>) {
  return (
    <section
      id={labelledBy}
      aria-labelledby={labelledBy ? `${labelledBy}-heading` : undefined}
      className={`relative scroll-mt-[5.75rem] md:scroll-mt-28 ${surface[tone]}`}
    >
      <div className="relative stage-container py-24 md:py-32">{children}</div>
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
            className={`font-plex-mono text-[12px] uppercase tracking-[0.14em] ${kickerTone[tone]}`}
          >
            {n} · {kicker}
          </p>
        </Reveal>
        <div className={`episode-rule ${ruleTone[tone]}`} aria-hidden="true" />
        <Rise delay={0.06}>
          <h2
            id={`${id}-heading`}
            className={`mt-5 max-w-[16ch] font-newsreader type-display-m text-[34px] leading-[1.1] md:text-[44px] ${headingTone[tone]}`}
          >
            {heading}
          </h2>
        </Rise>
        {children ? (
          <Reveal delay={0.1}>
            <p
              className={`mt-4 max-w-[42ch] font-newsreader text-[18px] leading-[1.5] md:text-[20px] ${dekTone[tone]}`}
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
