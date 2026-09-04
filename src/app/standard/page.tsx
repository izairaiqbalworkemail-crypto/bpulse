import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import {
  crewCommitments,
  crewGates,
  passRateNote,
  standingReview,
} from "@/content/process";

export const metadata: Metadata = buildMetadata({
  title: "The standard",
  description:
    "The four crew gates, the quarterly standing review, and three public commitments. No invented pass rate.",
  path: "/standard",
});

export default function StandardPage() {
  return (
    <>
      <PageHero
        kicker="The crew"
        title="The standard"
        dek="Four gates before anyone is client-facing. The same rubric every time. Urgency is not a reason to skip one."
        actionHref="/careers"
        actionLabel="See open seats"
      />

      <section className="grid-container py-16 md:py-24">
        <ol className="flex flex-col gap-14">
          {crewGates.map((gate) => (
            <li key={gate.n} className="border-t border-iron/15 pt-8">
              <p className="font-plex-mono text-[13px] uppercase tracking-[0.14em] text-ink/60">
                Gate {gate.n}
              </p>
              <h2 className="mt-3 font-newsreader text-[clamp(1.75rem,3vw,2.5rem)] leading-title text-iron">
                {gate.title}
              </h2>
              <p className="mt-4 max-w-measure font-newsreader text-reading leading-reading text-ink">
                {gate.body}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-16 border-t border-iron/15 pt-8">
          <h2 className="font-newsreader text-lot-title text-iron">
            After the gates
          </h2>
          <p className="mt-4 max-w-measure font-newsreader text-reading leading-reading text-ink">
            {standingReview}
          </p>
        </div>

        <div className="mt-16 border-t border-iron/15 pt-8">
          <h2 className="font-newsreader text-lot-title text-iron">
            Three public commitments
          </h2>
          <ul className="mt-6 flex flex-col gap-4">
            {crewCommitments.map((line) => (
              <li
                key={line}
                className="max-w-measure font-newsreader text-reading leading-reading text-iron"
              >
                {line}
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-16 max-w-measure font-newsreader text-reading leading-reading text-ink">
          {passRateNote}
        </p>
      </section>
    </>
  );
}
