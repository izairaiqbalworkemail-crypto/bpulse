import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { ServiceJsonLd } from "@/lib/JsonLd";
import { Desk } from "@/components/conversation/Desk";
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

      <ReadOffer />
      <ReadSample />

      <section
        id="why"
        aria-labelledby="why-heading"
        className="overflow-x-clip bg-paper text-ink"
      >
        <div className="stage-container py-24 md:py-32">
          <p className="font-plex-mono text-[11px] uppercase tracking-[0.18em] text-quill">
            {readWhy.n} · {readWhy.kicker}
          </p>
          <h2
            id="why-heading"
            className="type-display mt-8 max-w-[12ch] font-newsreader text-[clamp(2rem,4vw,3.5rem)] leading-[1.08] text-ink"
          >
            {readWhy.heading}
          </h2>
          <p className="type-lead mt-6 max-w-[42ch] text-ink">{readWhy.body}</p>
          <p className="mt-10 max-w-[36ch] font-plex-sans text-[17px] leading-[1.5] text-ink">
            {readWhy.next}
          </p>
          <p className="mt-5">
            <Link
              href="/check"
              className="font-plex-sans text-[15px] text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink"
            >
              The Check
            </Link>
          </p>
        </div>
      </section>

      <section
        id="after"
        aria-labelledby="after-heading"
        className="story-inset bg-paper"
      >
        <div className="hero-plate on-ink px-6 py-16 md:px-12 md:py-24 lg:px-16">
          <p className="font-plex-mono text-[11px] uppercase tracking-[0.18em] text-paper/55">
            {readAfter.n} · {readAfter.kicker}
          </p>
          <h2
            id="after-heading"
            className="type-display mt-8 max-w-[12ch] font-newsreader text-[clamp(2rem,4vw,3.5rem)] leading-[1.08] text-paper"
          >
            {readAfter.heading}
          </h2>
          <ol className="mt-14">
            {readAfter.steps.map((step, index) => (
              <li
                key={step}
                className="grid grid-cols-[2.5rem_minmax(0,1fr)] items-baseline gap-4 border-t border-paper/12 py-6 first:border-t-0 first:pt-0"
              >
                <span className="font-plex-mono text-[13px] text-paper/45">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="max-w-[40ch] font-newsreader text-[22px] leading-[1.3] text-paper md:text-[24px]">
                  {step}
                </p>
              </li>
            ))}
          </ol>
          <p className="mt-12 max-w-[36ch] font-plex-sans text-[17px] leading-[1.5] text-paper/70">
            {readAfter.pledge}
          </p>
        </div>
      </section>

      <section
        id="start"
        aria-labelledby="start-heading"
        className="overflow-x-clip bg-paper text-ink"
      >
        <div className="stage-container py-24 md:py-32">
          <p className="font-plex-mono text-[11px] uppercase tracking-[0.18em] text-quill">
            {readStart.n} · {readStart.kicker}
          </p>
          <h2
            id="start-heading"
            className="type-display mt-8 max-w-[12ch] font-newsreader text-[clamp(2rem,4vw,3.5rem)] leading-[1.08] text-ink"
          >
            {readStart.heading}
          </h2>
          <div
            id="intake"
            className="mt-14 scroll-mt-[5.75rem] md:scroll-mt-28"
          >
            <Desk scriptId="read" ending="read" />
          </div>
        </div>
      </section>
    </>
  );
}
