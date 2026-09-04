import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { WorkIndex } from "@/components/WorkIndex";
import { getCatalogue } from "@/content/catalogue";

const count = getCatalogue().length;

export const metadata: Metadata = buildMetadata({
  title: "Catalogue of work",
  description: `${count} records. Nine lots in depth. Fifteen index rows from the studio history. No invented figures.`,
  path: "/work",
});

export default function WorkPage() {
  return (
    <section className="w-full bg-rag">
      <PageHero
        kicker="Catalogue"
        title="Twenty-four records. Nine in depth."
        dek="Filter by how the work arrived, or by capability. Figures stay tagged with how they were sourced."
        hideAction
      />

      <div className="grid-container pb-24 pt-10 md:pb-32 md:pt-14">
        <WorkIndex />
      </div>
    </section>
  );
}
