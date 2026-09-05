import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Atmosphere } from "@/components/landing/Atmosphere";
import { MatchDesk } from "@/components/match/MatchDesk";
import { getCatalogue } from "@/content/catalogue";

const count = getCatalogue().length;

export const metadata: Metadata = buildMetadata({
  title: "The Match",
  description: `Matched against ${count} real engagements. Not a guess. We check what you describe against what we have actually fixed.`,
  path: "/match",
});

export default function MatchPage() {
  return (
    <section className="w-full bg-rag">
      <PageHero
        kicker="The Match"
        title="Matched against the work we already did."
        dek={`Not a guess. ${count} real engagements. The reason is the product.`}
        hideAction
      />
      <div className="relative overflow-hidden">
        <Atmosphere kind="paper" opacity={0.2} />
        <div className="relative grid-container pb-24 pt-10 md:pb-32">
          <div className="mx-auto max-w-[40rem]">
            <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">
              What this is
            </p>
            <p className="mt-3 max-w-[40ch] font-newsreader text-[22px] leading-[1.25] text-iron">
              Other firms match on skills people typed about themselves. We
              match on evidence of work we have already shipped.
            </p>
            <ol className="mt-8 flex flex-col gap-5">
              <li className="border-t border-iron/15 pt-4">
                <p className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/60">
                  01 · You write the stuck part
                </p>
                <p className="mt-2 font-newsreader text-[17px] leading-[1.45] text-ink">
                  Staging never tried in production. Auth nobody left
                  understands. A model that will not hold. The more specific,
                  the closer the read.
                </p>
              </li>
              <li className="border-t border-iron/15 pt-4">
                <p className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/60">
                  02 · We check our record
                </p>
                <p className="mt-2 font-newsreader text-[17px] leading-[1.45] text-ink">
                  {count} engagements. Lots, condition-on-arrival, stack,
                  capability. If your words sit next to a lot we already took,
                  that is the match — and we show you why.
                </p>
              </li>
              <li className="border-t border-iron/15 pt-4">
                <p className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/60">
                  03 · A named person, with a reason
                </p>
                <p className="mt-2 font-newsreader text-[17px] leading-[1.45] text-ink">
                  No percentage. No “AI.” If nothing in the record is close,
                  Aneeb reads it himself. Either way you write a brief that
                  does not ask you to type it twice.
                </p>
              </li>
            </ol>
          </div>
          <div className="mx-auto mt-14 max-w-[40rem] rounded-[24px] bg-rag-card p-5 shadow-[var(--shadow-card)] ring-1 ring-iron/10 md:p-8">
            <MatchDesk />
          </div>
        </div>
      </div>
    </section>
  );
}
