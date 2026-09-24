import type { ReactNode } from "react";
import Link from "next/link";
import { Reveal, Rise } from "@/components/landing/Reveal";
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
 * Interior opening. Label pill, heavy title, one line of dek, one ask.
 * Centred on paper — the same shape as the home hero, quieter.
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
    <section className="lp-page-hero">
      <div className="lp-shell">
        <Reveal>
          <p className="lp-section-label">{kicker}</p>
        </Reveal>
        <Rise delay={0.06}>
          <h1 className="lp-page-title" id="page-hero-heading">
            {title}
          </h1>
        </Rise>
        {dek ? (
          <Reveal delay={0.12}>
            <p className="lp-page-dek">{dek}</p>
          </Reveal>
        ) : null}
        {hideAction ? null : (
          <Reveal delay={0.18}>
            <Link className="lp-btn-primary" href={actionHref}>
              {label}
              <span aria-hidden className="lp-arrow">
                →
              </span>
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
}
