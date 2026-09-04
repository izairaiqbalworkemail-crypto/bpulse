import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { closeStages } from "@/content/process";

export const metadata: Metadata = buildMetadata({
  title: "How it works",
  description:
    "The six stages of a Close — what happens, what you receive, what you sign, and what you can see in the portal.",
  path: "/how-it-works",
});

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        kicker="The Close"
        title="How it works"
        dek="Six stages, written down. The sample portal is the proof — click through it before anyone is paid."
        actionHref="/demo"
        actionLabel="Open the sample portal"
      />

      <section className="grid-container py-16 md:py-24">
        <p className="max-w-measure font-newsreader text-reading leading-reading text-ink">
          The portal exists so you are in charge of the engagement — stage,
          documents, locked scope, findings, and the access revocation log —
          without waiting on a status email. What follows is the same six
          stages the sample is built on.
        </p>

        <ol className="mt-16 flex flex-col gap-16">
          {closeStages.map((stage, index) => (
            <li key={stage.id} className="border-t border-iron/15 pt-8">
              <p className="font-plex-mono text-[13px] uppercase tracking-[0.14em] text-ink/60">
                {String(index + 1).padStart(2, "0")} · {stage.label}
              </p>
              <h2 className="mt-3 font-newsreader text-[clamp(1.75rem,3vw,2.5rem)] leading-title text-iron">
                {stage.label}
              </h2>
              <dl className="mt-8 grid gap-8 md:grid-cols-2">
                <div>
                  <dt className="font-plex-mono text-[13px] uppercase tracking-[0.08em] text-ink/60">
                    What happens
                  </dt>
                  <dd className="mt-2 font-newsreader text-reading leading-reading text-ink">
                    {stage.happens}
                  </dd>
                </div>
                <div>
                  <dt className="font-plex-mono text-[13px] uppercase tracking-[0.08em] text-ink/60">
                    What you receive
                  </dt>
                  <dd className="mt-2 font-newsreader text-reading leading-reading text-ink">
                    {stage.receive}
                  </dd>
                </div>
                <div>
                  <dt className="font-plex-mono text-[13px] uppercase tracking-[0.08em] text-ink/60">
                    What you sign
                  </dt>
                  <dd className="mt-2 font-newsreader text-reading leading-reading text-ink">
                    {stage.sign}
                  </dd>
                </div>
                <div>
                  <dt className="font-plex-mono text-[13px] uppercase tracking-[0.08em] text-ink/60">
                    What you can see
                  </dt>
                  <dd className="mt-2 font-newsreader text-reading leading-reading text-ink">
                    {stage.see}
                  </dd>
                </div>
              </dl>
              <p className="mt-6">
                <Link
                  href={stage.demoHref}
                  className="font-plex-sans text-sm text-iron underline-offset-4 hover:underline"
                >
                  Open this stage in the sample →
                </Link>
              </p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
