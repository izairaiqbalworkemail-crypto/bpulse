"use client";

import Link from "next/link";
import { Item, Stagger } from "@/components/landing/Reveal";
import { SectionHead } from "@/components/landing/SectionHead";
import { pricingLadder } from "@/content/pricing";
import { termsCopy } from "@/content/home";
import { track } from "@/lib/analytics/public";

/** The Read is the door we point unsure visitors at. */
const featuredId = pricingLadder[0]?.id;

/** Each rung says what happens next, in its own words. */
const linkLabels: Record<string, string> = {
  read: "Start here",
  session: "Book a session",
  check: "Get a check",
  slice: "See the slice",
  close: "See the process",
  standing: "Learn more",
};

/** The bands, in the compact form the cards carry. */
const compact: Record<string, string> = {
  close: "$18k–$95k",
  standing: "$900–$6k/mo",
};

/**
 * The published ladder as cards. The Read sits dark with a badge;
 * every click keeps its place in the analytics ladder.
 */
export function PriceCards() {
  return (
    <section className="lp-section" id="ladder">
      <div className="lp-shell">
        <SectionHead
          label="The ladder"
          heading="Six starts. Every price published."
          dek="The same ladder everywhere on this site. No form to see it, no call to hear it."
        />
        <Stagger className="lp-pricing-grid">
          {pricingLadder.map((rung) => {
            const featured = rung.id === featuredId;
            return (
              <Item key={rung.id} className="h-full">
                <Link
                  className={`lp-price-card h-full${featured ? " is-featured" : ""}`}
                  href={rung.href}
                  onClick={() => track("pricing.rung.clicked", { rung: rung.id })}
                >
                  {featured ? (
                    <span className="lp-price-badge">
                      {termsCopy.recommended}
                    </span>
                  ) : null}
                  <p className="lp-price-name">{rung.name}</p>
                  <p className="lp-price-amount">
                    {compact[rung.id] ?? rung.price}
                  </p>
                  <p className="lp-price-desc">{rung.body}</p>
                  <span className="lp-price-link">
                    {linkLabels[rung.id] ?? "See the details"}
                    <span aria-hidden className="lp-arrow">
                      →
                    </span>
                  </span>
                </Link>
              </Item>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
