import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { ServiceJsonLd } from "@/lib/JsonLd";
import { PageHero } from "@/components/PageHero";
import { SignalPlate } from "@/components/SignalPlate";
import { StageRail } from "@/components/StageRail";
import { Credit } from "@/components/primitives/Credit";
import { Atmosphere } from "@/components/landing/Atmosphere";
import { Reveal } from "@/components/landing/Reveal";
import { Desk } from "@/components/conversation/Desk";
import { PassAlong } from "@/components/PassAlong";
import { VettedPay } from "@/components/VettedPay";
import { offer } from "@/content/offer";
import { checkBadOutcome, checkDays, checkRunner } from "@/content/check";
import { getSpecialist } from "@/content/specialists";

export const metadata: Metadata = buildMetadata({
  title: "The Check",
  description: `A conversation that produces a written read. Then ${offer.check.duration}, $${offer.check.price.toLocaleString("en-US")}, a verdict of keep, repair, or rebuild.`,
  path: "/check",
});

export default function CheckPage() {
  const runner = getSpecialist(checkRunner.id);
  const price = `$${offer.check.price.toLocaleString("en-US")}`;

  return (
    <>
      <ServiceJsonLd
        name={offer.check.name}
        description={offer.check.description}
        price={offer.check.price}
      />

      <PageHero
        kicker="The Check"
        title="Five days. A verdict."
        dek="A written read of what you described. Then keep, repair, or rebuild. A person replies within one business day."
        hideAction
      />

      <SignalPlate
        kicker={`${offer.check.name} · ${offer.check.duration}`}
        price={price}
        line="Verdict of keep, repair, or rebuild. Credited on a Close invoice within 30 days."
        facts={[
          {
            kicker: "What you leave with",
            body: "A written condition report. Not a sales deck.",
          },
          {
            kicker: "Who runs it",
            body: `${runner.name}. The name on the Check is the name on the Close.`,
          },
          {
            kicker: "If we Close",
            body: `${price} is credited on that invoice within 30 days.`,
          },
        ]}
        href="#intake"
        action="Start on this desk"
      />

      <section
        id="intake"
        className="w-full scroll-mt-[5.75rem] bg-rag pt-14 pb-16 md:scroll-mt-28 md:pt-20"
      >
        <div className="grid-container">
          <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">
            The conversation
          </p>
          <h2 className="mt-3 max-w-[18ch] font-newsreader text-[32px] leading-[1.08] tracking-[-0.03em] text-iron md:text-[40px]">
            Tell us what happens when you try to ship it.
          </h2>
          <p className="mt-5 max-w-[46ch] font-newsreader text-[18px] leading-[1.45] text-ink">
            A structured intake. Not a chatbot. You leave with a written read
            of what you described.
          </p>
          <div className="mt-10">
            <Desk scriptId="check" ending="read" />
          </div>
        </div>
      </section>

      <section className="relative w-full overflow-hidden bg-rag">
        <Atmosphere kind="paper" opacity={0.18} />
        <div className="relative grid-container py-16 md:py-24">
          <Reveal>
            <p className="font-plex-mono text-[13px] uppercase tracking-[0.08em] text-ink/70">
              Five days
            </p>
          </Reveal>
          <StageRail stages={checkDays} label="Check days" />

          <Reveal className="mt-16">
            <p className="mb-4 font-plex-mono text-[13px] uppercase tracking-[0.08em] text-ink/70">
              Who runs it
            </p>
            <Credit
              name={runner.name}
              capability={runner.role}
              line={checkRunner.line}
              portraitSrc={runner.photo}
              portraitAlt={runner.name}
            />
          </Reveal>

          <Reveal className="card mt-16 max-w-[60ch] px-8 py-10">
            <p className="font-plex-mono text-[13px] uppercase tracking-[0.08em] text-ink/70">
              The honest bad outcome
            </p>
            <p className="mt-3 font-newsreader text-[16px] leading-[1.55] text-ink">
              {checkBadOutcome}
            </p>
          </Reveal>

          <div className="mt-16">
            <VettedPay />
          </div>
          <div className="mt-8">
            <PassAlong />
          </div>
          <p className="mt-10 max-w-[44ch] font-plex-sans text-[14px] leading-[1.5] text-ink">
            IP assigned in writing before code. NDA from day zero. See{" "}
            <Link href="/legal/terms" className="underline underline-offset-4">
              legal terms
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
