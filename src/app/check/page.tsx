import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { ServiceJsonLd } from "@/lib/JsonLd";
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
  const price = offer.check.price;

  return (
    <>
      <ServiceJsonLd
        name={offer.check.name}
        description={offer.check.description}
        price={offer.check.price}
      />

      <section id="intake" className="w-full scroll-mt-[5.75rem] bg-rag pt-10 pb-16 md:scroll-mt-28 md:pt-14">
        <div className="grid-container">
          <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">
            The Check · the conversation
          </p>
          <h1 className="mt-3 max-w-[18ch] font-newsreader text-[40px] leading-[1.08] tracking-[-0.03em] text-iron md:text-[56px]">
            Tell us what happens when you try to ship it.
          </h1>
          <p className="mt-5 max-w-[46ch] font-newsreader text-[18px] leading-[1.45] text-ink">
            A structured intake. Not a chatbot. You leave with a written read
            of what you described. A person replies within one business day.
          </p>
          <div className="mt-10">
            <Desk scriptId="check" ending="read" />
          </div>
        </div>
      </section>

      <section className="w-full bg-signal">
        <div className="grid-container py-14 md:py-16">
          <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-iron/80">
            {offer.check.name} · {offer.check.duration}
          </p>
          <p className="mt-3 font-newsreader text-[clamp(3.5rem,22vw,6rem)] leading-none tracking-[-0.04em] text-iron">
            ${price.toLocaleString("en-US")}
          </p>
          <p className="mt-6 max-w-[40ch] font-newsreader text-[18px] leading-[1.5] text-iron">
            Verdict of keep, repair, or rebuild. Credited on a Close invoice
            within 30 days.
          </p>
          <p className="mt-6 max-w-[44ch] font-plex-sans text-[14px] leading-[1.5] text-iron/85">
            IP assigned in writing before code. NDA from day zero. See{" "}
            <Link href="/legal/terms" className="underline underline-offset-4">
              legal terms
            </Link>
            .
          </p>
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

          <Reveal className="mt-16 max-w-[60ch]">
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
        </div>
      </section>
    </>
  );
}
