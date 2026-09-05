import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { GateCard } from "@/components/GateCard";
import { BeliefBlock } from "@/components/BeliefBlock";
import { PageClose } from "@/components/PageClose";
import { PeopleRail } from "@/components/PeopleRail";
import {
  Atmosphere,
  AtmosphereNote,
} from "@/components/landing/Atmosphere";
import {
  crewGates,
  standingReview,
  passRateNote,
} from "@/content/process";
import { crewBeliefs } from "@/content/beliefs";
import { specialists } from "@/content/specialists";
import { diagnosticRubric } from "@/lib/careers/store";

export const metadata: Metadata = buildMetadata({
  title: "The standard",
  description:
    "Five gates before anyone is client-facing. No candidate fee. No multiple-choice pass/fail.",
  path: "/standard",
});

export default function StandardPage() {
  return (
    <section className="w-full bg-rag">
      <PageHero
        kicker="The standard"
        title="Five gates. Then standing review."
        dek="Nobody is client-facing before Gate 4. No exceptions for urgency."
        hideAction
      />

      <div className="relative overflow-hidden">
        <Atmosphere kind="paper" opacity={0.16} />
        <div className="relative grid-container pb-24 pt-6 md:pb-32">
        <PeopleRail
          people={specialists}
          line="Client-facing only after Gate 4"
        />
        <div className="mt-3 mb-10">
          <AtmosphereNote />
        </div>
        {crewGates.map((gate) => (
          <GateCard key={gate.n} {...gate} />
        ))}

        <div className="mt-12 rounded-[16px] border border-iron/20 bg-rag-card p-5">
          <p className="font-plex-mono text-[13px] uppercase tracking-[0.08em] text-ink/70">
            Gate 0 rubric (0-3 each)
          </p>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {diagnosticRubric.map((item, index) => (
              <li key={item.key} className="border-l-2 border-iron/20 pl-3">
                <p className="font-newsreader text-[17px] text-iron">
                  {index + 1}. {item.label}
                </p>
                <p className="font-newsreader text-[15px] leading-[1.45] text-ink">
                  A 3 looks like: {item.looksLike}
                </p>
              </li>
            ))}
          </ul>
        </div>

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
        <PageClose line="The people who pass these gates are the ones on your Close." />
        </div>
      </div>
    </section>
  );
}
