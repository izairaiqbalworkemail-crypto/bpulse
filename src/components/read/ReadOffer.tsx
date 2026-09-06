import { Desk } from "@/components/conversation/Desk";
import { readOffer } from "@/content/read";

export function ReadOffer() {
  return (
    <>
      <p className="font-plex-mono text-[12px] uppercase tracking-[0.14em] text-iron/70">
        01 · THE READ
      </p>
      <div className="episode-rule text-iron" aria-hidden="true" />
      <h1
        id="offer-heading"
        className="mt-6 max-w-[10ch] font-newsreader type-display text-[48px] leading-[1.02] text-iron md:text-[64px]"
      >
        {readOffer.heading}
      </h1>
      <p className="mt-5 max-w-[40ch] font-newsreader text-[18px] leading-[1.4] text-iron/80 md:text-[20px]">
        {readOffer.dek}
      </p>
      <p className="mt-4 max-w-[40ch] font-plex-mono text-[12px] uppercase tracking-[0.08em] text-iron/55">
        {readOffer.pledge}
      </p>
      <div id="intake" className="mt-12 scroll-mt-[5.75rem] md:scroll-mt-28">
        <Desk scriptId="read" ending="read" />
      </div>
    </>
  );
}
