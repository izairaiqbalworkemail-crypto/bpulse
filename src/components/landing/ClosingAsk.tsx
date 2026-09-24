import Link from "next/link";
import { Reveal, Rise } from "@/components/landing/Reveal";

type ClosingAskProps = {
  label?: string;
  heading: string;
  line: string;
  href: string;
  ctaLabel: string;
};

/** The dark ask with the gold lamp. Reused as the last section of a page. */
export function ClosingAsk({
  label,
  heading,
  line,
  href,
  ctaLabel,
}: Readonly<ClosingAskProps>) {
  return (
    <section className="lp-section">
      <div className="lp-shell">
        <div className="lp-closing">
          {label ? (
            <Reveal>
              <p className="lp-section-label lp-section-label-ink">{label}</p>
            </Reveal>
          ) : null}
          <Rise delay={0.06}>
            <h2>{heading}</h2>
          </Rise>
          <Reveal delay={0.1}>
            <p>{line}</p>
          </Reveal>
          <Reveal delay={0.14}>
            <Link className="lp-closing-cta" href={href}>
              {ctaLabel}
              <span aria-hidden className="lp-arrow">
                →
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
