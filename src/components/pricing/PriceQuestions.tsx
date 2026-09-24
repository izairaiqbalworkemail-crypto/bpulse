import { FaqSection } from "@/components/landing/FaqSection";
import { pricingFaqIcons } from "@/content/landing-sections";
import { pricingQuestions } from "@/content/pricing";

export function PriceQuestions() {
  return (
    <FaqSection
      dek="Straight answers about money."
      heading="The questions."
      icons={pricingFaqIcons}
      id="questions"
      idPrefix="pricing-faq"
      items={pricingQuestions}
      label="Questions"
    />
  );
}
