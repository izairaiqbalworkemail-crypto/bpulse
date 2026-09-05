import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { WorkIndex } from "@/components/WorkIndex";
import { PageClose } from "@/components/PageClose";
import { Reveal } from "@/components/landing/Reveal";
import { getCatalogue } from "@/content/catalogue";
import { PeopleRail } from "@/components/PeopleRail";
import { Episode } from "@/components/episode/Episode";
import { AtmosphereNote } from "@/components/landing/Atmosphere";
import { specialists } from "@/content/specialists";

const count = getCatalogue().length;

export const metadata: Metadata = buildMetadata({
  title: "Catalogue of work",
  description: `${count} records. Nine lots in depth. Fifteen index rows from the studio history. No invented figures.`,
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <PageHero
        kicker="Catalogue"
        title="Twenty-four records. Nine in depth."
        dek="Filter by how the work arrived, or by capability. Figures stay tagged with how they were sourced."
        hideAction
      />

      <Episode tone="milk">
          <Reveal delay={0.06}>
            <PeopleRail
              people={specialists.slice(0, 6)}
              line="The names on the lots"
            />
            <div className="mt-3 mb-10">
              <AtmosphereNote />
            </div>
          </Reveal>
          <WorkIndex />
          <PageClose line="Your lot is not in the log yet. A Check is how it gets there." />
      </Episode>
    </>
  );
}
