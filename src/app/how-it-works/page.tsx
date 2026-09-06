import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { SignalPlate } from "@/components/SignalPlate";
import { StageRail } from "@/components/StageRail";
import { AnimatedStages } from "@/components/AnimatedStages";
import { PageClose } from "@/components/PageClose";
import { Episode } from "@/components/episode/Episode";
import { closeStages } from "@/content/process";
import { offer } from "@/content/offer";
import { guarantees, pageFrame } from "@/content/platform";

export const metadata: Metadata = buildMetadata({
  title: "How it works",
  description: pageFrame.howItWorks,
  path: "/how-it-works",
});

export default function HowItWorksPage() {
  const rail = closeStages.map((stage, index) => ({
    id: stage.id,
    label: stage.label,
    status: index === 0 ? ("current" as const) : ("upcoming" as const),
  }));

  return (
    <>
      <PageHero
        kicker="The platform"
        title="A process you can open."
        dek={pageFrame.howItWorks}
        hideAction
      />

      <SignalPlate
        kicker={`${offer.close.name} · locked scope`}
        price={offer.close.priceRange}
        line={offer.close.description}
        facts={[
          {
            kicker: "The Check first",
            body: `$${offer.check.price.toLocaleString("en-US")} · ${offer.check.duration}. Credited if we Close within 30 days.`,
          },
          {
            kicker: "The Close",
            body: "Fixed scope agreed in writing before any code. You watch every stage.",
          },
          {
            kicker: "Standing, if you want it",
            body: `${offer.standing.priceRange}. Optional. You can run it without us.`,
          },
        ]}
        href="/check"
        action={`Start the Check · $${offer.check.price.toLocaleString("en-US")}`}
      />

      <Episode tone="paper">
        <p className="max-w-[48ch] font-newsreader text-[18px] leading-[1.5] text-ink">
          Portal screenshots are not on file yet. Each stage opens the live
          sample view instead.
        </p>
        <div className="mt-10">
          <StageRail stages={rail} />
        </div>
        <AnimatedStages stages={closeStages} />
      </Episode>

      <Episode tone="cocoa">
        <p className="font-plex-mono text-[12px] uppercase tracking-[0.14em] text-rag/70">
          What the platform guarantees
        </p>
        <p className="mt-4 max-w-[40ch] font-newsreader text-[22px] leading-[1.3] text-rag">
          A promise is a sentence. A system is a link.
        </p>
        <ul className="mt-12">
          {guarantees.map((row) => (
            <li key={row.claim} className="border-t border-rag/12 py-6">
              <Link href={row.href} className="block">
                <span className="block font-newsreader text-[22px] text-rag">
                  {row.claim}
                </span>
                <span className="mt-1 block font-newsreader text-[16px] text-rag/70">
                  {row.proof}
                </span>
                <span className="mt-3 block font-plex-sans text-[14px] text-rag/80 underline decoration-rag/25 underline-offset-4 hover:decoration-rag">
                  Where this is provable →
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <PageClose line="The sample is the same stages, with sample data labelled sample." />
      </Episode>
    </>
  );
}
