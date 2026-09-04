import type { ReactNode } from "react";
import Link from "next/link";
import { HeroFrame } from "@/components/HeroFrame";
import { EightyBar } from "@/components/EightyBar";

type PageHeroProps = {
  kicker: string;
  title: ReactNode;
  dek: ReactNode;
  actionHref?: string;
  actionLabel?: string;
  hideAction?: boolean;
};

/**
 * Interior-page hero. Same iron plate, masthead, and 80% bar as home.
 */
export function PageHero({
  kicker,
  title,
  dek,
  actionHref = "/check",
  actionLabel = "Book a call",
  hideAction = false,
}: PageHeroProps) {
  return (
    <HeroFrame>
      <EightyBar />
      <div className="mt-10 flex flex-col gap-8 md:mt-14 md:gap-10">
        <div>
          <p className="font-plex-mono text-[13px] uppercase tracking-[0.14em] text-rag/60">
            {kicker}
          </p>
          <h1 className="mt-4 max-w-[16ch] font-newsreader text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.02] tracking-[-0.03em] text-rag">
            {title}
          </h1>
          <div className="mt-5 max-w-[540px] font-newsreader text-[20px] leading-[1.35] text-rag/70 md:text-[22px]">
            {dek}
          </div>
        </div>
        {!hideAction ? (
          <Link
            href={actionHref}
            className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-signal px-6 py-3 font-plex-sans text-[15px] font-medium text-iron transition-transform duration-200 hover:-translate-y-0.5"
          >
            {actionLabel}
            <span aria-hidden="true">→</span>
          </Link>
        ) : null}
      </div>
    </HeroFrame>
  );
}
