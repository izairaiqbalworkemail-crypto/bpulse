"use client";

import { useState } from "react";

type FaqItem = { q: string; a: string };

type FaqAccordionProps = {
  items: readonly FaqItem[];
  /** One glyph per question. Falls back to "?" when fewer are given. */
  icons?: readonly string[];
  /** Keeps aria ids unique when two accordions share a page. */
  idPrefix?: string;
};

/**
 * One answer open at a time. The open card inverts to ink,
 * the glyph box turns gold and rotates to a cross.
 */
export function FaqAccordion({
  items,
  icons,
  idPrefix = "faq",
}: Readonly<FaqAccordionProps>) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="lp-faq-list">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div className={`lp-faq-card${isOpen ? " is-open" : ""}`} key={item.q}>
            <button
              type="button"
              className="lp-faq-q"
              aria-expanded={isOpen}
              aria-controls={`${idPrefix}-a-${i}`}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span aria-hidden className="lp-faq-q-icon">
                {icons?.[i] ?? "?"}
              </span>
              <span className="lp-faq-q-text">{item.q}</span>
            </button>
            <div className="lp-faq-a-wrap" id={`${idPrefix}-a-${i}`}>
              <p className="lp-faq-a">{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
