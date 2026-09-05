import type { ReactNode } from "react";
import { Reveal, Rise } from "@/components/landing/Reveal";

export type EpisodeTone = "paper" | "milk" | "cocoa" | "signal";

const surface: Record<EpisodeTone, string> = {
  paper: "bg-rag text-iron",
  milk: "bg-rag-card text-iron",
  cocoa: "bg-iron text-rag",
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

type EpisodeProps = {
  labelledBy?: string;
  children: ReactNode;
  tone?: EpisodeTone;
};

/**
 * One room. Flat colour — paper grain lives only on heroes.
 * Cocoa, milk, signal, and paper each appear for a reason.
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
      <div className="relative stage-container py-20 md:py-28">{children}</div>
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
            className={`font-plex-mono text-[12px] uppercase tracking-[0.08em] ${kickerTone[tone]}`}
          >
            {n} · {kicker}
          </p>
        </Reveal>
        <Rise delay={0.06}>
          <h2
            id={`${id}-heading`}
            className={`mt-3 max-w-[18ch] font-newsreader text-[32px] leading-[1.12] tracking-[-0.015em] md:text-[42px] ${headingTone[tone]}`}
          >
            {heading}
          </h2>
        </Rise>
        {children ? (
          <Reveal delay={0.1}>
            <p
              className={`mt-4 max-w-[40ch] font-newsreader text-[18px] leading-[1.5] md:text-[20px] ${dekTone[tone]}`}
            >
              {children}
            </p>
          </Reveal>
        ) : null}
        {aside ? (
          <Reveal delay={0.16} className="mt-5 sm:hidden">
            {aside}
          </Reveal>
        ) : null}
      </div>
      {aside ? (
        <Reveal delay={0.16} className="hidden shrink-0 pb-1 sm:block">
          {aside}
        </Reveal>
      ) : null}
    </div>
  );
}
