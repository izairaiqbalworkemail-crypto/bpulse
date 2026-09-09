import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { GateCard } from "@/components/GateCard";
import { PageHero } from "@/components/PageHero";
import { JobsBoard } from "@/components/careers/JobsBoard";
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
    <section className="w-full bg-paper pb-24 md:pb-32">
      <TrackOnMount event="careers.started" props={{ surface: "careers" }} />
      <PageHero
        kicker="Applying to the standard"
        title="A written Gate 0. Then the rest of the gates."
        dek={pageFrame.careers}
        hideAction
      />

      <div className="grid-container pt-12">
        <section className="border-b border-ink/12 pb-12">
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
          <ul className="mt-10 border-t border-ink/12">
            <li className="border-b border-ink/10 py-6">
              <p className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-quill/70">
                Pay
              </p>
              <p className="mt-2 font-plex-sans text-[17px] leading-[1.4] text-ink">
                Published pay bands on the role cards below. No candidate fee.
              </p>
            </li>
            <li className="border-b border-ink/10 py-6">
              <p className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-quill/70">
                Gate 2
              </p>
              <p className="mt-2 font-plex-sans text-[17px] leading-[1.4] text-ink">
                A paid work sample. You keep the money either way.
              </p>
            </li>
            <li className="border-b border-ink/10 py-6">
              <p className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-quill/70">
                After Gate 4
              </p>
              <p className="mt-2 font-plex-sans text-[17px] leading-[1.4] text-ink">
                A public assignment record. Example:{" "}
                <Link
                  href="/team/hamza"
                  className="underline decoration-ink/25 underline-offset-4 hover:decoration-ink"
                >
                  /team/hamza
                </Link>
                .
              </p>
            </li>
          </ul>
          <p className="mt-10">
            <a
              href="#intake"
              className="btn btn-gold letter-ask min-h-12 px-8 text-[15px]"
            >
              Start my application
            </a>
          </p>
        </section>

        <section id="start" className="mt-12 scroll-mt-28">
          <div id="intake">
            <p className="font-plex-mono text-[13px] uppercase tracking-[0.08em] text-quill/70">Admission plan</p>
            <JobsBoard roles={roles} />
          </div>
        </section>

        <section className="mt-14">
          {crewGates.map((gate) => (
            <GateCard key={gate.n} {...gate} />
          ))}
        </section>

        <section className="mt-12 border-t border-ink/10 pt-8">
          <p className="font-plex-mono text-[13px] uppercase tracking-[0.08em] text-quill/70">Three commitments</p>
          <ul className="mt-3 space-y-2">
            {crewCommitments.map((item) => (
              <li key={item} className="font-newsreader text-[17px] leading-[1.45] text-quill">{item}</li>
            ))}
          </ul>
        </section>

        <section className="mt-14">
          <p className="font-newsreader text-[17px] text-quill">
            On submit: you get a private status link and your Gate 0 brief within one business day.
          </p>
        </section>
      </div>
    </section>
  );
}
