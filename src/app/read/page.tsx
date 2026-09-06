import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { ServiceJsonLd } from "@/lib/JsonLd";
import { Episode, EpisodeHead } from "@/components/episode/Episode";
import { ReadOffer } from "@/components/read/ReadOffer";
import { ReadSample } from "@/components/read/ReadSample";
import { readAfter, readStart, readWhy } from "@/content/read";
import { offer } from "@/content/offer";
import { pageFrame } from "@/content/platform";

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

      <Episode labelledBy="offer" tone="signal" size="tall">
        <ReadOffer />
      </Episode>

      <Episode labelledBy="sample" tone="cocoa" size="tall">
        <ReadSample />
      </Episode>

      <Episode labelledBy="why" tone="paper" size="short">
        <EpisodeHead n="03" kicker="WHY IT IS FREE" id="why" heading={readWhy.heading}>
          {readWhy.body}
        </EpisodeHead>
        <p className="mt-10 max-w-[36ch] font-newsreader text-[20px] leading-[1.4] text-iron">
          {readWhy.next}
        </p>
        <p className="mt-5">
          <Link
            href="/check"
            className="font-plex-sans text-[15px] underline decoration-iron/25 underline-offset-4"
          >
            The Check
          </Link>
        </p>
      </Episode>

      <Episode labelledBy="after" tone="cocoa">
        <EpisodeHead
          n="04"
          kicker="WHAT HAPPENS AFTER"
          id="after"
          tone="cocoa"
          heading="Then we stop."
        />
        <ol className="mt-12 flex flex-col">
          {readAfter.steps.map((step, index) => (
            <li
              key={step}
              className="grid grid-cols-[2.25rem_minmax(0,1fr)] items-baseline gap-4 border-t border-rag/12 py-5 first:border-t-0 first:pt-0"
            >
              <span className="font-plex-mono text-[13px] tabular-nums text-rag/50">
                {index + 1}
              </span>
              <p className="max-w-[40ch] font-newsreader text-[20px] leading-[1.35] text-rag">
                {step}
              </p>
            </li>
          ))}
        </ol>
        <p className="mt-10 max-w-[36ch] font-newsreader text-[20px] leading-[1.4] text-rag/80">
          {readAfter.pledge}
        </p>
      </Episode>

      <Episode labelledBy="start" tone="paper" size="short">
        <EpisodeHead n="05" kicker="START" id="start" heading={readStart.heading} />
        <p className="mt-10">
          <Link
            href={readStart.href}
            className="font-plex-sans text-[16px] underline decoration-iron/30 underline-offset-4"
          >
            {readStart.label}
          </Link>
        </p>
      </Episode>
    </>
  );
}
