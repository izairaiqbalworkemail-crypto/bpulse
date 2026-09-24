import { Item, Stagger } from "@/components/landing/Reveal";
import { SectionHead } from "@/components/landing/SectionHead";
import { pricingIncluded } from "@/content/pricing";

export function PriceIncluded() {
  return (
    <section className="lp-section" id="included">
      <div className="lp-shell">
        <SectionHead
          label="Included, always"
          heading="None of this is an upsell."
          dek="In every engagement, at every price."
        />
        <Stagger className="flex flex-col gap-2.5" gap={0.05}>
          {pricingIncluded.items.map((item) => (
            <Item key={item}>
              <div className="lp-row-card">
                <span className="lp-row-if">{item}</span>
                <span aria-hidden className="lp-row-start text-gold">
                  ✓
                </span>
              </div>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
