import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { StageRail } from "@/components/StageRail";
import { AnimatedStages } from "@/components/AnimatedStages";
import { Episode } from "@/components/episode/Episode";
import { LetterLedger } from "@/components/letter/LetterLedger";
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
  const rail = closeStages.map((stage) => ({
    id: stage.id,
    label: stage.label,
    status: "upcoming" as const,
  }));

  return (
    <>
      <PageHero
        kicker="The platform"
        title="A process you can open."
        dek={pageFrame.howItWorks}
        cut="Process"
      />

      <Episode tone="paper">
        <p className="font-plex-mono text-[12px] uppercase tracking-[0.14em] text-quill/70">
          How we work together
        </p>
        <p className="mt-6 font-newsreader text-[clamp(2.5rem,7vw,4.5rem)] leading-none tracking-[-0.03em] text-ink">
          {offer.close.priceRange}
        </p>
        <p className="mt-6 max-w-[42ch] font-plex-sans text-[17px] leading-[1.5] text-quill">
          The Close is the full project. The offers before it are how you get
          there without negotiating.
        </p>
        <div className="mt-12">
          <LetterLedger
            lines={[
              {
                id: "read",
                kicker: "The Read",
                title: "Free. Written. One business day.",
                body: "Nothing on it asks for a meeting.",
                href: "/read",
                ask: "Open",
              },
              {
                id: "session",
                kicker: "The Session",
                title: `${money(offer.session.price)}. Ninety minutes.`,
                body: "Credited against anything you buy in 30 days.",
                href: "/session",
                ask: "Open",
              },
              {
                id: "check",
                kicker: "The Check",
                title: `${money(offer.check.price)}. ${offer.check.duration}.`,
                body: "Credited in full against a build in 30 days.",
                href: "/check",
                ask: "Open",
              },
            ]}
          />
        </div>
        <p className="mt-12">
          <Link
            href="/read"
            className="btn btn-ink letter-ask min-h-12 px-8 text-[15px]"
          >
            Get my free read
          </Link>
        </p>

        <p className="mt-20 font-plex-mono text-[12px] uppercase tracking-[0.14em] text-quill/70">
          The stages
        </p>
        <p className="mt-4 max-w-[40ch] font-newsreader text-[22px] leading-[1.3] text-ink">
          The Read and the Session come first. Later stages open the live
          sample.
        </p>
        <div className="mt-10">
          <StageRail stages={rail} />
        </div>
        <AnimatedStages stages={closeStages} />
        <p className="mt-12 max-w-[52ch] font-plex-sans text-[15px] leading-[1.55] text-quill">
          {noDiscount}
        </p>
        <p className="mt-6 font-plex-sans text-[15px] text-quill">
          {ladder.length} offers, all published.{" "}
          <Link
            href="/first-slice"
            className="underline decoration-ink/25 underline-offset-4 hover:decoration-ink"
          >
            The First Slice
          </Link>{" "}
          is for an idea that needs to become real before it needs to become
          finished.
        </p>
      </Episode>

      <Episode tone="cocoa">
        <p className="font-plex-mono text-[12px] uppercase tracking-[0.06em] text-label">
          What the platform guarantees
        </p>
        <p className="mt-4 max-w-[40ch] font-newsreader text-[22px] leading-[1.18] text-paper">
          A promise is a sentence. A system is a link.
        </p>
        <div className="mt-12">
          <LetterLedger
            tone="ink"
            lines={guarantees.map((row) => ({
              id: row.href,
              title: row.claim,
              body: row.proof,
              href: row.href,
              ask: "Where this is provable",
            }))}
          />
        </div>
        <p className="mt-16 font-newsreader text-[20px] text-paper">
          <Link
            href="/read"
            className="underline decoration-paper/30 underline-offset-4 hover:decoration-paper"
          >
            Start with the Read. Free. One business day.
          </Link>
        </p>
      </Episode>
    </>
  );
}
