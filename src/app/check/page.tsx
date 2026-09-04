import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { ServiceJsonLd } from "@/lib/JsonLd";
import { PageHero } from "@/components/PageHero";
import { DataLine } from "@/components/primitives/DataLine";
import {
  PulseCheckIntake,
  type PulseCheckSituation,
} from "@/components/intake/PulseCheckIntake";
import { offer } from "@/content/offer";

export const metadata: Metadata = buildMetadata({
  title: "The Check",
  description:
    `A $${offer.check.price.toLocaleString("en-US")} diagnostic. ${offer.check.duration}. Verdict of keep, repair, or rebuild. Credited on a Close invoice within 30 days.`,
  path: "/check",
});

const dayByDay = [
  {
    day: "Day 1",
    title: "Read",
    description:
      "We read the codebase, the deployment, the docs, and whatever else you hand over. No assumptions. We map what exists.",
  },
  {
    day: "Day 2",
    title: "Trace",
    description:
      "We trace the integration paths, the compliance constraints, and the data flows. We find where the product is pulling in every direction.",
  },
  {
    day: "Day 3",
    title: "Map",
    description:
      "We map the condition: what arrived, what's wrong, what it would take to hold. Every finding is sourced, not asserted.",
  },
  {
    day: "Day 4",
    title: "Grade",
    description:
      "We grade the condition on arrival using the arrival-state vocabulary. Sound or unsound. Incomplete, stalled, integration-blocked, or unstable.",
  },
  {
    day: "Day 5",
    title: "Report",
    description:
      "You receive the condition report: what arrived, what was wrong, what it took to hold, and the verdict — keep, repair, or rebuild.",
  },
];

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
    ...(arrivalSituation(params.state) ? { situation: arrivalSituation(params.state) } : {}),
    ...(blocking.length > 0
      ? {
          stuckNote: `From hero self-check: ${blocking.join("; ")}`,
        }
      : {}),
  };

  return (
    <>
      <ServiceJsonLd
        name={offer.check.name}
        description={offer.check.description}
        price={offer.check.price}
      />

      <PageHero
        kicker="The Check"
        title={
          <>
            Verdict of keep,
            <br />
            repair, or rebuild.
          </>
        }
        dek={
          <>
            ${offer.check.price.toLocaleString()} · {offer.check.duration}.
            If we take a Close within 30 days, the fee is credited on that
            invoice by hand — not by this site. The Check may conclude that
            you don&apos;t need us. The fee is still credited.
          </>
        }
        actionHref="#intake"
        actionLabel="Start the Check"
      />

      <section className="w-full bg-rag">
        <div className="grid-container py-16 md:py-24">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
            <DataLine label="Duration" value={offer.check.duration} />
            <DataLine
              label="Price"
              value={`$${offer.check.price.toLocaleString()} USD`}
            />
            <DataLine label="Credit" value="30 days" />
            <DataLine label="Deliverable" value="Condition report" />
            <DataLine label="Verdict" value="Keep · Repair · Rebuild" />
          </div>
        </div>
      </section>

      {/* Day by day */}
      <section className="w-full bg-rag py-24 md:py-40">
        <div className="grid-container">
          <h2 className="font-plex-mono text-data tracking-[0.08em] text-ink/70 uppercase">
            Five business days, day by day
          </h2>

          <div className="mt-12 flex flex-col gap-12">
            {dayByDay.map((day) => (
              <div
                key={day.day}
                className="grid grid-cols-1 gap-x-12 gap-y-4 md:grid-cols-12 border-t border-iron/15 pt-8"
              >
                <div className="md:col-span-2">
                  <p className="font-plex-mono text-data text-ink/70">
                    {day.day}
                  </p>
                </div>
                <div className="md:col-span-3">
                  <h3 className="font-newsreader text-lot-title leading-title text-iron">
                    {day.title}
                  </h3>
                </div>
                <div className="md:col-span-7">
                  <p className="max-w-[560px] font-newsreader text-reading leading-reading text-ink">
                    {day.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The honest bad outcome */}
      <section className="w-full bg-rag py-16 md:py-24">
        <div className="grid-container">
          <div className="max-w-[66ch] border-t border-iron/15 pt-8">
            <h2 className="font-newsreader text-lot-title leading-title text-iron">
              The honest outcome
            </h2>
            <p className="mt-4 font-newsreader text-reading leading-reading text-ink">
              Sometimes the Check concludes that the product is fine as it is.
              The integrations are messy but functional, the last twenty percent
              is cosmetic, and a senior engineer cleaning up for a week would
              solve it — no studio required. We will tell you that, and the fee
              is still credited. A quiet verdict beats a false urgency.
            </p>
          </div>
        </div>
      </section>

      {/* Intake */}
      <section id="intake" className="w-full bg-rag py-24 md:py-40">
        <div className="grid-container">
          <PulseCheckIntake prefill={prefill} />
        </div>
      </section>
    </>
  );
}
