import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { PriceCards } from "@/components/pricing/PriceCards";
import { PriceRoute } from "@/components/pricing/PriceRoute";
import { PriceRule } from "@/components/pricing/PriceRule";
import { PriceIncluded } from "@/components/pricing/PriceIncluded";
import { PriceExcluded } from "@/components/pricing/PriceExcluded";
import { PricePay } from "@/components/pricing/PricePay";
import { PriceQuestions } from "@/components/pricing/PriceQuestions";
import { ClosingAsk } from "@/components/landing/ClosingAsk";
import { TrackOnMount } from "@/components/analytics/TrackOnMount";
import { termsCopy } from "@/content/home";
import { pricingStart } from "@/content/pricing";
import { pageFrame } from "@/content/platform";

export const metadata: Metadata = buildMetadata({
  title: "Pricing",
  description: pageFrame.pricing,
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <>
      <TrackOnMount event="pricing.viewed" props={{ surface: "pricing" }} />
      <PageHero
        kicker="Pricing"
        title={termsCopy.heading}
        dek={pageFrame.pricing}
      />

      <PriceCards />
      <PriceRoute />
      <PriceRule />
      <PriceIncluded />
      <PriceExcluded />
      <PricePay />
      <PriceQuestions />

      <ClosingAsk
        heading={pricingStart.heading}
        href={pricingStart.href}
        ctaLabel={pricingStart.label}
        label="Start"
        line={pricingStart.line}
      />
    </>
  );
}
