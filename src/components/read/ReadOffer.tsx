import Link from "next/link";
import { readOffer, readStart } from "@/content/read";

/**
 * The first window. Cream margin, one plate.
 * The form lives at the end. Two objects here made the old page busy.
 */
export function ReadOffer() {
  return (
    <section
      id="offer"
      aria-labelledby="offer-heading"
      className="story-inset bg-paper"
    >
      <div className="hero-plate on-ink relative flex min-h-[calc(100svh-1.25rem)] flex-col md:min-h-[calc(100svh-2rem)]">
        <div className="hero-watermark" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/bpulse-B.svg" alt="" />
        </div>
        <div className="stage-container relative flex flex-1 flex-col justify-center py-24 md:py-28">
          <p className="font-plex-mono text-[11px] uppercase tracking-[0.06em] text-label">
            {readOffer.n} · {readOffer.kicker}
          </p>
          <h1
            id="offer-heading"
            className="type-display-xl mt-8 max-w-[12ch] font-newsreader text-[clamp(2.75rem,7vw,5rem)] text-paper md:mt-10"
          >
            {readOffer.heading}
          </h1>
          <p className="type-lead mt-8 max-w-[40ch] text-pretty text-read md:mt-10">
            {readOffer.dek}
          </p>
          <p className="mt-4 max-w-[40ch] font-plex-sans text-[16px] leading-[1.5] text-label">
            {readOffer.pledge}
          </p>
          <div className="mt-10">
            <Link
              href={readStart.href}
              className="btn btn-gold min-h-12 px-8 text-[15px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper"
            >
              {readStart.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
