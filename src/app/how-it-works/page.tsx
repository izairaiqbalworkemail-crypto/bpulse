import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { StageRail } from "@/components/StageRail";
import { AnimatedStages } from "@/components/AnimatedStages";
import { PageClose } from "@/components/PageClose";
import { PeopleRail } from "@/components/PeopleRail";
import { Atmosphere, AtmosphereNote } from "@/components/landing/Atmosphere";
import { closeStages } from "@/content/process";
import { specialists } from "@/content/specialists";

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

      <div className="relative overflow-hidden">
        <Atmosphere kind="desk" opacity={0.16} />
        <div className="relative grid-container pb-24 pt-10 md:pb-32">
          <PeopleRail
            people={specialists.slice(0, 6)}
            line="The same hands through every stage"
          />
          <div className="mt-3">
            <AtmosphereNote />
          </div>
          <div className="mt-10">
            <StageRail stages={rail} />
          </div>
          <AnimatedStages stages={closeStages} />
          <PageClose line="The sample portal is the same stages, with sample data labelled sample." />
        </div>
      </div>
    </section>
  );
}
