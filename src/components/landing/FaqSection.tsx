import type { ReactNode } from "react";
import { Reveal, Rise } from "@/components/landing/Reveal";
import { FaqAccordion } from "@/components/landing/FaqAccordion";

type FaqSectionProps = {
  id?: string;
  label: string;
  heading: ReactNode;
  dek?: ReactNode;
  items: readonly { q: string; a: string }[];
  /** One glyph per question. */
  icons?: readonly string[];
  /** Keeps aria ids unique when two accordions share a page. */
  idPrefix?: string;
};

/**
 * Sticky intro on the left, the inverting accordion on the right.
 * Shared by the home questions and the pricing ones.
 */
export function FaqSection({
  id,
  label,
  heading,
  dek,
  items,
  icons,
  idPrefix = "faq",
}: Readonly<FaqSectionProps>) {
  return (
    <section className="lp-section" id={id}>
      <div className="lp-shell">
        <div className="lp-faq-wrap">
          <div className="lp-faq-intro">
            <Reveal>
              <p className="lp-section-label">{label}</p>
            </Reveal>
            <Rise delay={0.06}>
              <h2>{heading}</h2>
            </Rise>
            {dek ? (
              <Reveal delay={0.1}>
                <p>{dek}</p>
              </Reveal>
            ) : null}
            <Reveal delay={0.14}>
              <p className="lp-faq-badge">
                <span aria-hidden className="lp-dot" />
                {items.length} straight answers
              </p>
            </Reveal>
          </div>
          <FaqAccordion icons={icons} idPrefix={idPrefix} items={items} />
        </div>
      </div>
    </section>
  );
}
