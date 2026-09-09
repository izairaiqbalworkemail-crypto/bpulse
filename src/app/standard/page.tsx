import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { GateCard } from "@/components/GateCard";
import { BeliefBlock } from "@/components/BeliefBlock";
import { PageClose } from "@/components/PageClose";
import { PeopleRail } from "@/components/PeopleRail";
import { Episode } from "@/components/episode/Episode";
import { LetterLedger } from "@/components/letter/LetterLedger";
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
    <>
      <TrackOnMount event="standard.opened" props={{ surface: "standard" }} />
      <PageHero
        kicker="Admission"
        title="Five gates. Then a quarterly review."
        dek={pageFrame.standard}
      />

      <Episode tone="paper">
        <PeopleRail
          people={specialists}
          line="Our engineers. Client-facing only after Gate 4."
        />

        <div className="mt-14">
          {crewGates.map((gate) => (
            <GateCard key={gate.n} {...gate} />
          ))}
        </div>

        <p className="mt-4 font-plex-mono text-[13px] uppercase tracking-[0.08em] text-quill/70">
          Gate 0 rubric
        </p>
        <p className="mt-3 max-w-[40ch] font-newsreader text-[20px] leading-[1.3] text-ink">
          Scored 0 to 3 on each line.
        </p>
        <div className="mt-8">
          <LetterLedger
            lines={diagnosticRubric.map((item, index) => ({
              id: item.key,
              kicker: String(index + 1).padStart(2, "0"),
              title: item.label,
              body: `A 3 looks like: ${item.looksLike}`,
            }))}
          />
        </div>

        <p className="mt-12 max-w-[60ch] font-newsreader text-[18px] leading-[1.5] text-quill">
          {standingReview} {standingConsequence}
        </p>

        <div className="mt-10">
          <LetterLedger
            lines={crewCommitments.map((line, index) => ({
              id: `commitment-${index}`,
              kicker: String(index + 1).padStart(2, "0"),
              title: line,
            }))}
          />
        </div>

        <div className="mt-16">
          {crewBeliefs.map((belief) => (
            <BeliefBlock key={belief.statement} {...belief} />
          ))}
        </div>

        <p className="mt-16 font-newsreader text-[16px] text-quill/80">
          {passRateNote}
        </p>
        <PageClose line="The people who pass these gates are the ones on your Close." />
      </Episode>
    </>
  );
}
