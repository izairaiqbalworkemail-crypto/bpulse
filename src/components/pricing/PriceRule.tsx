import { Reveal } from "@/components/landing/Reveal";
import { SectionHead } from "@/components/landing/SectionHead";
import { pricingRule } from "@/content/pricing";

export function PriceRule() {
  return (
    <section className="lp-section" id="rule">
      <div className="lp-shell">
        <SectionHead
          label="The rule"
          heading="The same for everyone."
          dek={pricingRule.statement}
        />
        <div className="grid gap-8 text-center md:grid-cols-2">
          {pricingRule.why.map((line) => (
            <Reveal key={line}>
              <p className="mx-auto max-w-[36ch] text-[0.95rem] leading-[1.6] font-medium text-mute">
                — {line}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
