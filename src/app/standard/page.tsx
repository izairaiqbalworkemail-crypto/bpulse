import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { GateCard } from "@/components/GateCard";
import { BeliefBlock } from "@/components/BeliefBlock";
import {
  crewGates,
  standingReview,
  passRateNote,
} from "@/content/process";
import { crewBeliefs } from "@/content/beliefs";

export const metadata: Metadata = buildMetadata({
  title: "The standard",
  description:
    "Four gates before anyone is client-facing. No candidate fee. No multiple-choice pass/fail.",
  path: "/standard",
});

export default function StandardPage() {
  return (
    <section className="w-full bg-rag">
      <PageHero
        kicker="The standard"
        title="Four gates. Then standing review."
        dek="Nobody is client-facing before Gate 4. No exceptions for urgency."
        hideAction
      />

      <div className="grid-container pb-24 pt-6 md:pb-32">
        {crewGates.map((gate) => (
          <GateCard key={gate.n} {...gate} />
        ))}

        <p className="mt-12 max-w-[60ch] font-newsreader text-[18px] leading-[1.5] text-ink">
          {standingReview}
        </p>

        <div className="mt-16">
          {crewBeliefs.map((belief) => (
            <BeliefBlock key={belief.statement} {...belief} />
          ))}
        </div>

        <p className="mt-16 font-newsreader text-[16px] text-ink/80">
          {passRateNote}
        </p>
      </div>
    </section>
  );
}
