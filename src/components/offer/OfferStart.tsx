import type { ReactNode } from "react";
import { Episode, EpisodeHead } from "@/components/episode/Episode";
import { PricingLadder } from "@/components/offer/PricingLadder";
import type { LadderRung } from "@/content/ladder";

type OfferStartProps = {
  heading: string;
  dek: ReactNode;
  highlight: LadderRung["id"];
  children: ReactNode;
};

/**
 * The one gold room on a product page: the price, the desk, the ladder.
 */
export function OfferStart({
  heading,
  dek,
  highlight,
  children,
}: Readonly<OfferStartProps>) {
  return (
    <Episode labelledBy="start" tone="signal">
      <EpisodeHead
        n="02"
        kicker="START"
        id="start"
        tone="signal"
        heading={heading}
      >
        {dek}
      </EpisodeHead>
      <div
        id="intake"
        className="mt-12 scroll-mt-[5.75rem] md:scroll-mt-28"
      >
        {children}
      </div>
      <div className="mt-16 text-iron">
        <PricingLadder highlight={highlight} onGold />
      </div>
    </Episode>
  );
}
