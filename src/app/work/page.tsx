import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { WorkIndex } from "@/components/WorkIndex";
import { PageClose } from "@/components/PageClose";
import { Episode } from "@/components/episode/Episode";
import { getCatalogue } from "@/content/catalogue";
import { pageFrame } from "@/content/platform";

const count = getCatalogue().length;

export const metadata: Metadata = buildMetadata({
  title: "Our work",
  description: pageFrame.work,
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <PageHero
        kicker="Our work"
        title="What we shipped. What was stuck."
        dek={`${pageFrame.work} ${count} rows. Nine in depth.`}
        hideAction
      />

      <Episode tone="paper">
        <WorkIndex />
        <PageClose line="Your case is not here yet. A Check is how it gets there." />
      </Episode>
    </>
  );
}
