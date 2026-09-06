import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Episode, EpisodeHead } from "@/components/episode/Episode";
import { StartPlate } from "@/components/objects/StartPlate";
import { PriceLadder } from "@/components/pricing/PriceLadder";
import { PriceRule } from "@/components/pricing/PriceRule";
import { PriceRoute } from "@/components/pricing/PriceRoute";
import { PriceIncluded } from "@/components/pricing/PriceIncluded";
import { PriceExcluded } from "@/components/pricing/PriceExcluded";
import { PricePay } from "@/components/pricing/PricePay";
import { PriceQuestions } from "@/components/pricing/PriceQuestions";
import { TrackOnMount } from "@/components/analytics/TrackOnMount";
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
      <Episode labelledBy="ladder" tone="signal" size="tall">
        <PriceLadder />
      </Episode>

      <Episode labelledBy="rule" tone="paper" size="short">
        <PriceRule />
      </Episode>

      <Episode labelledBy="which" tone="cocoa">
        <PriceRoute />
      </Episode>

      <Episode labelledBy="included" tone="paper">
        <PriceIncluded />
      </Episode>

      <Episode labelledBy="excluded" tone="cocoa">
        <PriceExcluded />
      </Episode>

      <Episode labelledBy="pay" tone="paper">
        <PricePay />
      </Episode>

      <Episode labelledBy="questions" tone="cocoa">
        <PriceQuestions />
      </Episode>

      <Episode labelledBy="start" tone="paper" size="short">
        <EpisodeHead n="08" kicker="START" id="start" heading={pricingStart.heading}>
          {pricingStart.line}
        </EpisodeHead>
        <StartPlate
          heading={pricingStart.heading}
          line={pricingStart.line}
          href={pricingStart.href}
          label={pricingStart.label}
          tone="paper"
        />
      </Episode>
    </>
  );
}
