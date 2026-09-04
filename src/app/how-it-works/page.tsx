import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { StageRail } from "@/components/StageRail";
import { closeStages } from "@/content/process";

export const metadata: Metadata = buildMetadata({
  title: "How it works",
  description:
    "Six stages, written down. What happens, what you receive, what you sign, and what you can see in the portal.",
  path: "/how-it-works",
});

export default function HowItWorksPage() {
  const rail = closeStages.map((stage, index) => ({
    id: stage.id,
    label: stage.label,
    status:
      index === 0 ? ("current" as const) : ("upcoming" as const),
  }));

  return (
    <section className="w-full bg-rag">
      <PageHero
        kicker="How it works"
        title="You can see the work."
        dek="Until the founder’s portal screenshots land here, each stage links to the live sample view."
        hideAction
      />

      <div className="grid-container pb-24 pt-10 md:pb-32">
        <StageRail stages={rail} />

        <ol className="mt-16 flex flex-col">
          {closeStages.map((stage) => (
            <li key={stage.id} className="border-t border-iron/20 py-10">
              <h2 className="font-newsreader text-[24px] leading-[1.2] text-iron">
                {stage.label}
              </h2>
              <dl className="mt-6 grid gap-5 md:grid-cols-2">
                <div>
                  <dt className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">
                    What happens
                  </dt>
                  <dd className="mt-2 font-newsreader text-[16px] leading-[1.5] text-ink">
                    {stage.happens}
                  </dd>
                </div>
                <div>
                  <dt className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">
                    What you receive
                  </dt>
                  <dd className="mt-2 font-newsreader text-[16px] leading-[1.5] text-ink">
                    {stage.receive}
                  </dd>
                </div>
                <div>
                  <dt className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">
                    What you sign
                  </dt>
                  <dd className="mt-2 font-newsreader text-[16px] leading-[1.5] text-ink">
                    {stage.sign}
                  </dd>
                </div>
                <div>
                  <dt className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">
                    What you can see
                  </dt>
                  <dd className="mt-2 font-newsreader text-[16px] leading-[1.5] text-ink">
                    {stage.see}{" "}
                    <Link
                      href={stage.demoHref}
                      className="underline decoration-iron/40 underline-offset-4 hover:decoration-iron"
                    >
                      Open the sample {stage.label.toLowerCase()} view
                    </Link>
                    .
                  </dd>
                </div>
              </dl>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
