import type { ReactNode } from "react";
import Link from "next/link";
import { HeroFrame } from "@/components/HeroFrame";
import { cta } from "@/config/site";

type PageHeroProps = {
  kicker: string;
  title: ReactNode;
  dek?: ReactNode;
  actionHref?: string;
  actionLabel?: string;
  hideAction?: boolean;
};

/**
 * Interior opening. Same first window as home and /read.
 */
export function PageHero({
  kicker,
  title,
  dek,
  actionHref = cta.href,
  actionLabel,
  hideAction = false,
}: Readonly<PageHeroProps>) {
  const label = actionLabel ?? cta.label;

  return (
    <HeroFrame labelledBy="page-hero-heading">
      <div className="stage-container relative flex flex-1 flex-col justify-center py-24 md:py-28">
        <p className="kicker text-label">{kicker}</p>
        <h1
          id="page-hero-heading"
          className="type-display-xl mt-8 max-w-[16ch] font-newsreader text-[clamp(2.75rem,7vw,5rem)] text-paper md:mt-10"
        >
          {title}
        </h1>
        {dek ? (
          <div className="type-lead mt-8 max-w-[40ch] text-pretty break-words text-read md:mt-10">
            {dek}
          </div>
        ) : null}
        {!hideAction ? (
          <div className="mt-8 md:mt-10">
            <Link
              href={actionHref}
              className="btn btn-gold min-h-12 px-8 text-[15px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper"
            >
              {label}
            </Link>
          </div>
        ) : null}
      </div>
    </HeroFrame>
  );
}
