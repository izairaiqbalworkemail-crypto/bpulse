import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { ServiceJsonLd } from "@/lib/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Episode, EpisodeHead } from "@/components/episode/Episode";
import { BriefIntake } from "@/components/intake/BriefIntake";
import { InOutPlate } from "@/components/offer/InOutPlate";
import { OfferStart } from "@/components/offer/OfferStart";
import { money } from "@/content/ladder";
import { offer } from "@/content/offer";
import { pageFrame } from "@/content/platform";
import { slicePage } from "@/content/slice";

export const metadata: Metadata = buildMetadata({
  title: "The First Slice",
  description: pageFrame.slice,
  path: "/first-slice",
});

export default function FirstSlicePage() {
  return (
    <>
      <ServiceJsonLd
        name={offer.slice.name}
        description={offer.slice.description}
        price={offer.slice.price}
      />

      <PageHero
        kicker={`The First Slice · ${money(offer.slice.price)}`}
        title={slicePage.title}
        dek={pageFrame.slice}
        hideAction
      />

      <Episode tone="paper">
        <EpisodeHead
          n="01"
          kicker="A BEGINNING"
          id="beginning"
          heading={slicePage.honest}
        >
          {slicePage.dek}
        </EpisodeHead>
        <div className="price-object mt-12 max-w-[36rem]">
          <p className="font-plex-mono text-[12px] uppercase tracking-[0.1em] text-ink/70">
            Two weeks. Fixed scope.
          </p>
          <p className="mt-3 font-newsreader type-display text-[48px] leading-none tabular-nums text-iron">
            {money(offer.slice.price)}
          </p>
          <p className="mt-4 max-w-[40ch] font-newsreader text-[18px] leading-[1.45] text-iron">
            One thing that works, in production, that you can show someone.
          </p>
        </div>
        <InOutPlate
          inLabel="What is in"
          inLines={slicePage.in}
          outLabel="What it is not"
          outLines={slicePage.out}
        />
        <p className="mt-12 max-w-[48ch] font-plex-sans text-[16px] leading-[1.55] text-ink">
          If the thing already exists and is stuck, start with{" "}
          <Link
            href="/check"
            className="underline decoration-iron/25 underline-offset-4 hover:decoration-iron"
          >
            the Check · {money(offer.check.price)}
          </Link>
          .
        </p>
      </Episode>

      <OfferStart
        heading={`${money(offer.slice.price)}. Two weeks.`}
        dek="A beginning, not a finish. Write the one thing that has to work."
        highlight="slice"
      >
        <BriefIntake type="start" source="first-slice" />
      </OfferStart>
    </>
  );
}
