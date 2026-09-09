import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { GateCard } from "@/components/GateCard";
import { PageHero } from "@/components/PageHero";
import { JobsBoard } from "@/components/careers/JobsBoard";
import { Episode } from "@/components/episode/Episode";
import { LetterLedger } from "@/components/letter/LetterLedger";
import { pageFrame } from "@/content/platform";
import { crewCommitments, crewGates } from "@/content/process";
import { listRolesData } from "@/lib/careers/repo";
import { TrackOnMount } from "@/components/analytics/TrackOnMount";

export const metadata: Metadata = buildMetadata({
  title: "Applying to the standard",
  description: pageFrame.careers,
  path: "/careers",
});

export default async function CareersPage() {
  const roles = await listRolesData();

  return (
    <>
      <TrackOnMount event="careers.started" props={{ surface: "careers" }} />
      <PageHero
        kicker="Applying to the standard"
        title="A written Gate 0. Then the rest of the gates."
        dek={pageFrame.careers}
        hideAction
      />

      <Episode tone="paper">
        <p className="font-plex-mono text-[12px] uppercase tracking-[0.14em] text-quill/70">
          What you get
        </p>
        <p className="mt-6 max-w-[16ch] font-newsreader text-[clamp(2rem,5vw,3.25rem)] leading-[1.1] tracking-[-0.015em] text-ink">
          Published bands. A paid sample.
        </p>
        <p className="mt-6 max-w-[42ch] font-plex-sans text-[17px] leading-[1.5] text-quill">
          No multiple-choice pass/fail gate. Gate 2 is paid whether or not you
          join.
        </p>
        <div className="mt-10">
          <LetterLedger
            lines={[
              {
                id: "pay",
                kicker: "Pay",
                title: "Published pay bands.",
                body: "On the role cards below. No candidate fee.",
              },
              {
                id: "gate-2",
                kicker: "Gate 2",
                title: "A paid work sample.",
                body: "You keep the money either way.",
              },
              {
                id: "after-gate-4",
                kicker: "After Gate 4",
                title: "A public assignment record.",
                body: "The name on the page is the name on the work.",
                href: "/team/hamza",
                ask: "Open an example",
              },
            ]}
          />
        </div>
        <p className="mt-10">
          <a
            href="#intake"
            className="btn btn-gold letter-ask min-h-12 px-8 text-[15px]"
          >
            Start my application
          </a>
        </p>
      </Episode>

      <Episode labelledBy="start" tone="paper" size="short">
        <div id="start" className="scroll-mt-28">
          <p className="font-plex-mono text-[13px] uppercase tracking-[0.08em] text-quill/70">
            Admission plan
          </p>
          <JobsBoard roles={roles} />
        </div>
      </Episode>

      <Episode tone="paper">
        {crewGates.map((gate) => (
          <GateCard key={gate.n} {...gate} />
        ))}

        <p className="mt-4 font-plex-mono text-[13px] uppercase tracking-[0.08em] text-quill/70">
          Three commitments
        </p>
        <div className="mt-6">
          <LetterLedger
            lines={crewCommitments.map((item, index) => ({
              id: `commitment-${index}`,
              kicker: String(index + 1).padStart(2, "0"),
              title: item,
            }))}
          />
        </div>

        <p className="mt-12 font-newsreader text-[17px] text-quill">
          On submit: you get a private status link and your Gate 0 brief within
          one business day.
        </p>
      </Episode>
    </>
  );
}
