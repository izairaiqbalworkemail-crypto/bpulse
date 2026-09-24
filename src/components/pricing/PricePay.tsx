import { Item, Reveal, Stagger } from "@/components/landing/Reveal";
import { SectionHead } from "@/components/landing/SectionHead";
import { pricingPay } from "@/content/pricing";

export function PricePay() {
  return (
    <section className="lp-section" id="pay">
      <div className="lp-shell">
        <SectionHead
          label="How payment works"
          heading="How you pay."
          dek="Four steps, then work begins."
        />
        <Stagger className="lp-after-grid">
          {pricingPay.steps.map((step, index) => (
            <Item key={step}>
              <div className="lp-after-card">
                <p className="lp-p-num">{String(index + 1).padStart(2, "0")}</p>
                <h3>{step}</h3>
              </div>
            </Item>
          ))}
        </Stagger>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-8 max-w-[52ch] text-center text-[0.9rem] leading-[1.6] font-medium text-mute">
            {pricingPay.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
