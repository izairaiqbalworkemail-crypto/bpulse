"use client";

import Link from "next/link";
import { Item, Stagger } from "@/components/landing/Reveal";
import { SectionHead } from "@/components/landing/SectionHead";
import { pricingRoute } from "@/content/pricing";

export function PriceRoute() {
  return (
    <section className="lp-section" id="which">
      <div className="lp-shell">
        <SectionHead
          label="Start here"
          heading="Which one are you."
          dek="If you are not sure, start at the Read."
        />
        <Stagger className="flex flex-col gap-2.5" gap={0.06}>
          {pricingRoute.map((row) => (
            <Item key={row.if}>
              <Link className="lp-row-card" href={row.href}>
                <span className="lp-row-if">{row.if}</span>
                <span className="lp-row-start">
                  {row.start}
                  <span aria-hidden className="lp-arrow">
                    →
                  </span>
                </span>
              </Link>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
