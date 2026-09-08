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
  crewCommitments,
  crewGates,
  standingConsequence,
  standingReview,
  passRateNote,
} from "@/content/process";
import { pageFrame } from "@/content/platform";
import { crewBeliefs } from "@/content/beliefs";
import { specialists } from "@/content/specialists";
import { diagnosticRubric } from "@/lib/careers/store";
import { TrackOnMount } from "@/components/analytics/TrackOnMount";

export const metadata: Metadata = buildMetadata({
  title: "Admission",
  description: pageFrame.standard,
  path: "/standard",
});

export default function StandardPage() {
  return (
    <section className="w-full bg-paper">
      <TrackOnMount event="standard.opened" props={{ surface: "standard" }} />
      <PageHero
        kicker="Admission"
        title="Five gates. Then a quarterly review."
        dek={pageFrame.standard}
        hideAction
      />

      <div className="relative overflow-hidden">
        <Atmosphere kind="paper" opacity={0.16} />
        <div className="relative grid-container pb-24 pt-6 md:pb-32">
        <PeopleRail
          people={specialists}
          line="Our engineers. Client-facing only after Gate 4."
        />
        <div className="mt-3 mb-10">
          <AtmosphereNote />
        </div>
        {crewGates.map((gate) => (
          <GateCard key={gate.n} {...gate} />
        ))}

        <div className="mt-12 border-t border-ink/10 pt-8">
          <p className="font-plex-mono text-[13px] uppercase tracking-[0.08em] text-quill/70">
            Gate 0 rubric (0-3 each)
          </p>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {diagnosticRubric.map((item, index) => (
              <li key={item.key} className="border-l-2 border-ink/20 pl-3">
                <p className="font-newsreader text-[17px] text-ink">
                  {index + 1}. {item.label}
                </p>
                <p className="font-newsreader text-[15px] leading-[1.45] text-quill">
                  A 3 looks like: {item.looksLike}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-12 max-w-[60ch] font-newsreader text-[18px] leading-[1.5] text-quill">
          {standingReview} {standingConsequence}
        </p>

        <ul className="mt-10 max-w-[60ch] border-t border-ink/12 pt-8">
          {crewCommitments.map((line) => (
            <li
              key={line}
              className="border-b border-ink/10 py-3 font-newsreader text-[17px] leading-[1.45] text-ink"
            >
              {line}
            </li>
          ))}
        </ul>

        <div className="mt-16">
          {crewBeliefs.map((belief) => (
            <BeliefBlock key={belief.statement} {...belief} />
          ))}
        </div>

        <p className="mt-16 font-newsreader text-[16px] text-quill/80">
          {passRateNote}
        </p>
        <PageClose line="The people who pass these gates are the ones on your Close." />
        </div>
      </div>
    </section>
  );
}
