import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { SignalPlate } from "@/components/SignalPlate";
import { StageRail } from "@/components/StageRail";
import { AnimatedStages } from "@/components/AnimatedStages";
import { Episode } from "@/components/episode/Episode";
import { closeStages } from "@/content/process";
import { ladder, money, noDiscount } from "@/content/ladder";
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
        kicker="The ladder · published"
        price={offer.close.priceRange}
        line="The Close is the full deployment. The rungs before it are how you get there without negotiating."
        facts={[
          {
            kicker: "The Read",
            body: "Free. Written. One business day. Nothing on it asks for a meeting.",
          },
          {
            kicker: "The Session",
            body: `${money(offer.session.price)}. Ninety minutes. Credited against anything you buy in 30 days.`,
          },
          {
            kicker: "The Check",
            body: `${money(offer.check.price)}. ${offer.check.duration}. Credited in full against a build in 30 days.`,
          },
        ]}
        href="/read"
        action="Start with the Read"
      />

      <Episode tone="paper">
        <p className="font-plex-mono text-[12px] uppercase tracking-[0.14em] text-ink/70">
          The stages
        </p>
        <p className="mt-4 max-w-[40ch] font-newsreader text-[22px] leading-[1.3] text-iron">
          The Read and the Session come first. Portal screenshots are not on
          file yet. Later stages open the live sample.
        </p>
        <div className="mt-10">
          <StageRail stages={rail} />
        </div>
        <AnimatedStages stages={closeStages} />
        <p className="mt-12 max-w-[52ch] font-plex-sans text-[15px] leading-[1.55] text-ink">
          {noDiscount}
        </p>
        <p className="mt-6 font-plex-sans text-[15px] text-ink">
          {ladder.length} rungs, all published.{" "}
          <Link
            href="/first-slice"
            className="underline decoration-iron/25 underline-offset-4 hover:decoration-iron"
          >
            The First Slice
          </Link>{" "}
          is for an idea that needs to become real before it needs to become
          finished.
        </p>
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
                  Where this is provable
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-16 font-newsreader text-[20px] text-rag">
          <Link
            href="/read"
            className="underline decoration-rag/30 underline-offset-4 hover:decoration-rag"
          >
            Start with the Read. Free. One business day.
          </Link>
        </p>
      </Episode>
    </>
  );
}
