import Link from "next/link";
import { HeroFrame } from "@/components/HeroFrame";
import { checkOffer } from "@/content/check";
import { offer } from "@/content/offer";

export function CheckOffer() {
  return (
    <HeroFrame id="offer" labelledBy="offer-heading">
      <div className="stage-container relative flex flex-1 flex-col justify-center py-24 md:py-28">
        <p className="kicker text-label">01 · THE OFFER</p>
        <h1
          id="offer-heading"
          className="type-display-xl mt-8 font-newsreader text-[clamp(2.75rem,7vw,6rem)] text-paper md:mt-10"
        >
          ${offer.check.price.toLocaleString("en-US")}
        </h1>
        <p className="mt-4 font-plex-mono text-[13px] uppercase tracking-[0.06em] text-label">
          {offer.check.duration}.
        </p>
        <p className="type-lead mt-8 max-w-[40ch] text-pretty text-read">
          {checkOffer.verdict}
        </p>
        <p className="mt-4 max-w-[40ch] font-plex-sans text-[16px] leading-[1.5] text-label">
          {checkOffer.credit}
        </p>
        <p className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Link
            href="#start"
            className="btn btn-gold min-h-12 px-8 text-[15px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper"
          >
            Reserve my Check
          </Link>
          <Link
            href="#deliverable"
            className="site-link font-plex-sans text-[15px] underline"
          >
            See a real report ↓
          </Link>
        </p>
      </div>
      <div className="stage-container grid grid-cols-2 gap-x-8 gap-y-4 border-t border-paper/20 py-5 md:grid-cols-4">
        {checkOffer.facts.map((fact) => (
          <p
            key={fact}
            className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-paper/70"
          >
            {fact}
          </p>
        ))}
      </div>
    </HeroFrame>
  );
}
