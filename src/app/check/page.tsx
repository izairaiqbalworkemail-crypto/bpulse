import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { ServiceJsonLd } from "@/lib/JsonLd";
import { StageRail } from "@/components/StageRail";
import { TierTable } from "@/components/TierTable";
import { Credit } from "@/components/primitives/Credit";
import { PeopleRail } from "@/components/PeopleRail";
import {
  Atmosphere,
  AtmosphereNote,
} from "@/components/landing/Atmosphere";
import { Count, Reveal } from "@/components/landing/Reveal";
import {
  PulseCheckIntake,
  type PulseCheckSituation,
} from "@/components/intake/PulseCheckIntake";
import { PassAlong } from "@/components/PassAlong";
import { VettedPay } from "@/components/VettedPay";
import { offer } from "@/content/offer";
import { checkBadOutcome, checkDays, checkRunner, offerTiers } from "@/content/check";
import { getSpecialist, specialists } from "@/content/specialists";

export const metadata: Metadata = buildMetadata({
  title: "The Check",
  description: `A $${offer.check.price.toLocaleString("en-US")} diagnostic. ${offer.check.duration}. Verdict of keep, repair, or rebuild.`,
  path: "/check",
});

type CheckPageProps = {
  searchParams: Promise<{
    state?: string;
    symptoms?: string;
    source?: string;
  }>;
};

function arrivalSituation(state?: string): PulseCheckSituation | undefined {
  switch (state) {
    case "stalled":
      return "stalled";
    case "incomplete":
      return "almost";
    case "integration-blocked":
    case "unstable":
      return "fragile";
    default:
      return undefined;
  }
}

export default async function CheckPage({ searchParams }: CheckPageProps) {
  const params = await searchParams;
  const blocking = params.symptoms
    ? params.symptoms.split("|").map((part) => part.trim()).filter(Boolean)
    : [];
  const prefill = {
    ...(arrivalSituation(params.state)
      ? { situation: arrivalSituation(params.state) }
      : {}),
    ...(blocking.length > 0
      ? { stuckNote: `From hero self-check: ${blocking.join("; ")}` }
      : {}),
  };
  const runner = getSpecialist(checkRunner.id);

  return (
    <>
      <ServiceJsonLd
        name={offer.check.name}
        description={offer.check.description}
        price={offer.check.price}
      />

      <section className="w-full bg-signal">
        <div className="grid-container py-14 md:py-16">
          <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-iron/80">
            {offer.check.name} · {offer.check.duration}
          </p>
          <p className="mt-3 font-newsreader text-[56px] leading-none tracking-[-0.04em] text-iron md:text-[72px]">
            <Count prefix="$" to={offer.check.price} />
          </p>
          <p className="mt-6 max-w-[40ch] font-newsreader text-[16px] leading-[1.5] text-iron">
            Verdict of keep, repair, or rebuild. Credited on a Close invoice
            within 30 days.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="#intake"
              className="inline-flex items-center rounded-full bg-iron px-6 py-3 font-plex-sans text-[15px] font-medium text-rag"
            >
              Start the Check
            </Link>
            <Link
              href="/match"
              className="font-plex-sans text-[15px] text-iron underline decoration-iron/30 underline-offset-4 hover:decoration-iron"
            >
              Or match it against the record
            </Link>
          </div>
        </div>
      </section>

      <section className="relative w-full overflow-hidden bg-rag">
        <Atmosphere kind="paper" opacity={0.18} />
        <div className="relative grid-container py-16 md:py-24">
          <PeopleRail
            people={specialists.slice(0, 6)}
            line="Aneeb runs it. The rest stay on the Close."
          />
          <div className="mt-3">
            <AtmosphereNote />
          </div>
          <Reveal>
            <p className="mt-10 font-plex-mono text-[13px] uppercase tracking-[0.08em] text-ink/70">
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

          <Reveal className="mt-16">
            <TierTable tiers={offerTiers} caption="Against the rest of the offer" />
          </Reveal>
        </div>
      </section>

      <section id="intake" className="w-full bg-rag pb-24">
        <div className="grid-container">
          <PulseCheckIntake prefill={prefill} source="check" />
          <div className="mt-8">
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
