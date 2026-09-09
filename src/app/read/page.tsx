import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { ServiceJsonLd } from "@/lib/JsonLd";
import { Desk } from "@/components/conversation/Desk";
import { Episode, EpisodeHead } from "@/components/episode/Episode";
import { ReadOffer } from "@/components/read/ReadOffer";
import { ReadSample } from "@/components/read/ReadSample";
import { offer } from "@/content/offer";
import { pageFrame } from "@/content/platform";
import { readAfter, readOffer, readStart, readWhy } from "@/content/read";

export const metadata: Metadata = buildMetadata({
  title: "The Read",
  description: pageFrame.read,
  path: "/read",
});

export default function ReadLandingPage() {
  return (
    <>
      <ServiceJsonLd
        name={offer.read.name}
        description={offer.read.description}
        price={0}
      />

      <ReadOffer />

      <Episode tone="paper">
        <ul className="letter-folio-facts text-ink" aria-label="Read commitments">
          <li>free</li>
          <li>one business day</li>
          <li>a real person writes it</li>
          <li>a sentence is enough</li>
        </ul>
        <p className="mt-12 font-plex-mono text-[12px] uppercase tracking-[0.1em] text-quill/70">
          What it is
        </p>
        <p className="mt-3 max-w-[52ch] font-newsreader text-[18px] leading-[1.5] text-ink">
          {readOffer.what}
        </p>
        <p className="mt-10 font-plex-mono text-[12px] uppercase tracking-[0.1em] text-quill/70">
          Who it is for
        </p>
        <p className="mt-3 max-w-[52ch] font-newsreader text-[18px] leading-[1.5] text-ink">
          {readOffer.who}
        </p>
        <p className="mt-4 max-w-[52ch] font-newsreader text-[18px] leading-[1.5] text-quill">
          {readOffer.idea}
        </p>
        <p className="mt-10 font-plex-mono text-[12px] uppercase tracking-[0.1em] text-quill/70">
          What it is not
        </p>
        <p className="mt-3 max-w-[52ch] font-newsreader text-[18px] leading-[1.5] text-ink">
          {readOffer.not}
        </p>
      </Episode>

      <ReadSample />

      <Episode tone="paper">
        <EpisodeHead n={readWhy.n} kicker={readWhy.kicker} id="why" heading={readWhy.heading}>
          {readWhy.body} {readWhy.next}
        </EpisodeHead>
        <p className="mt-16 font-plex-mono text-[12px] uppercase tracking-[0.1em] text-quill/70">
          {readAfter.n} · {readAfter.kicker}
        </p>
        <p className="mt-3 max-w-[20ch] font-newsreader text-[28px] leading-[1.15] text-ink">
          {readAfter.heading}
        </p>
        <ol className="mt-8 max-w-[48ch] border-t border-ink/12">
          {readAfter.steps.map((step) => (
            <li
              key={step}
              className="border-b border-ink/10 py-4 font-newsreader text-[17px] leading-[1.45] text-ink"
            >
              {step}
            </li>
          ))}
        </ol>
        <p className="mt-6 max-w-[46ch] font-newsreader text-[17px] leading-[1.5] text-quill">
          {readAfter.pledge}
        </p>
      </Episode>

      <Episode labelledBy="start" tone="paper">
        <EpisodeHead
          n={readStart.n}
          kicker={readStart.kicker}
          id="start"
          heading={readStart.heading}
        >
          Five short questions. A written reply in one business day.
        </EpisodeHead>
        <div id="intake" className="mt-12 scroll-mt-[5.75rem] md:scroll-mt-28">
          <Desk scriptId="read" ending="read" />
        </div>
      </Episode>
    </>
  );
}
