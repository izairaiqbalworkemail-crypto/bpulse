import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { SignalPlate } from "@/components/SignalPlate";
import { StageRail } from "@/components/StageRail";
import { AnimatedStages } from "@/components/AnimatedStages";
import { PageClose } from "@/components/PageClose";
import { PeopleRail } from "@/components/PeopleRail";
import { Episode } from "@/components/episode/Episode";
import { AtmosphereNote } from "@/components/landing/Atmosphere";
import { closeStages } from "@/content/process";
import { specialists } from "@/content/specialists";
import { offer } from "@/content/offer";

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
    <>
      <PageHero
        kicker="How it works"
        title="You can see the work."
        dek="Until the founder’s portal screenshots land here, each stage links to the live sample view."
        hideAction
      />

      <SignalPlate
        kicker={`${offer.close.name} · locked scope`}
        price={offer.close.priceRange}
        line={offer.close.description}
        facts={[
          {
            kicker: "The Check first",
            body: `$${offer.check.price.toLocaleString("en-US")} · ${offer.check.duration}. Credited if we Close within 30 days.`,
          },
          {
            kicker: "The Close",
            body: "Fixed scope agreed in writing before any code. You watch every stage.",
          },
          {
            kicker: "Standing, if you want it",
            body: `${offer.standing.priceRange}. Optional. You can run it without us.`,
          },
        ]}
        href="/check"
        action={`Start the Check · $${offer.check.price.toLocaleString("en-US")}`}
      />

      <Episode tone="paper">
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
      </Episode>
    </>
  );
}
