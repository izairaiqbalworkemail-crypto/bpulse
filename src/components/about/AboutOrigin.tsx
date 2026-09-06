import { EpisodeHead } from "@/components/episode/Episode";
import { aboutOrigin } from "@/content/about";

export function AboutOrigin() {
  return (
    <>
      <EpisodeHead
        n="03"
        kicker="HOW IT STARTED"
        id="started"
        tone="cocoa"
        heading="How it started."
      />
      <div className="mt-12 max-w-[38rem]">
        {aboutOrigin.body.map((para) => (
          <p
            key={para}
            className="mt-6 font-newsreader text-[20px] leading-[1.45] text-rag first:mt-0 md:text-[22px]"
          >
            {para}
          </p>
        ))}
        <p className="mt-12 font-newsreader text-[22px] italic leading-none text-rag md:text-[24px]">
          {aboutOrigin.signed}
        </p>
      </div>
    </>
  );
}
