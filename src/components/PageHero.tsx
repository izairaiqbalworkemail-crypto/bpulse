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
  /** Kept so existing pages do not break. Unused. */
  cut?: string;
};

/**
 * Interior chapter. Index on a spine. Claim on the page. Then paper.
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
      <div className="letter-folio-open">
        <p className="letter-folio-index">{kicker}</p>
        <div className="letter-folio-body">
          <h1 id="page-hero-heading" className="letter-window-claim">
            {title}
          </h1>
          {dek ? <div className="letter-window-dek">{dek}</div> : null}
          {hideAction ? null : (
            <div className="letter-cta">
              <Link
                href={actionHref}
                className="btn btn-gold letter-ask min-h-12 px-8 text-[15px]"
              >
                {label}
              </Link>
            </div>
          )}
        </div>
      </div>
    </HeroFrame>
  );
}
