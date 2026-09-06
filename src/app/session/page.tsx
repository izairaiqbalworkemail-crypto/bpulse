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
import { sessionPage } from "@/content/slice";

export const metadata: Metadata = buildMetadata({
  title: "The Session",
  description: pageFrame.session,
  path: "/session",
});

export default function SessionPage() {
  return (
    <>
      <ServiceJsonLd
        name={offer.session.name}
        description={offer.session.description}
        price={offer.session.price}
      />

      <PageHero
        kicker={`The Session · ${money(offer.session.price)}`}
        title={sessionPage.title}
        dek={pageFrame.session}
        hideAction
      />

      <Episode tone="paper">
        <EpisodeHead n="01" kicker="THE HOUR" id="hour" heading={sessionPage.not}>
          {sessionPage.dek}
        </EpisodeHead>
        <div className="price-object mt-12 max-w-[36rem]">
          <p className="font-plex-mono text-[12px] uppercase tracking-[0.1em] text-ink/70">
            Ninety minutes
          </p>
          <p className="mt-3 font-newsreader type-display text-[48px] leading-none tabular-nums text-iron">
            {money(offer.session.price)}
          </p>
          <p className="mt-4 max-w-[40ch] font-newsreader text-[18px] leading-[1.45] text-iron">
            Credited against anything you buy in 30 days.
          </p>
        </div>
        <InOutPlate
          inLabel="What is in"
          inLines={sessionPage.in}
          outLabel="What is not"
          outLines={sessionPage.out}
        />
        <p className="mt-12 max-w-[48ch] font-plex-sans text-[16px] leading-[1.55] text-ink">
          If you only need the written read, start with{" "}
          <Link
            href="/read"
            className="underline decoration-iron/25 underline-offset-4 hover:decoration-iron"
          >
            the Read
          </Link>
          . Free. One business day.
        </p>
      </Episode>

      <OfferStart
        heading={`${money(offer.session.price)}. Credited in 30 days.`}
        dek="Write what is stuck. A person replies within one business day."
        highlight="session"
      >
        <BriefIntake type="start" source="session" />
      </OfferStart>
    </>
  );
}
