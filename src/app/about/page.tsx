import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/lib/JsonLd";
import { Episode, EpisodeHead } from "@/components/episode/Episode";
import { StartPlate } from "@/components/objects/StartPlate";
import { AboutWhat } from "@/components/about/AboutWhat";
import { AboutBeliefs } from "@/components/about/AboutBeliefs";
import { AboutOrigin } from "@/components/about/AboutOrigin";
import { AboutCrew } from "@/components/about/AboutCrew";
import { AboutWhere } from "@/components/about/AboutWhere";
import { AboutNot } from "@/components/about/AboutNot";
import { aboutStart } from "@/content/about";
import { pageFrame } from "@/content/platform";
import { brand } from "@/config/brand";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description: pageFrame.about,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "About", url: `${brand.url}/about` }]} />

      <Episode labelledBy="what" tone="cocoa">
        <AboutWhat />
      </Episode>

      <Episode labelledBy="believe" tone="paper">
        <AboutBeliefs />
      </Episode>

      <Episode labelledBy="started" tone="cocoa">
        <AboutOrigin />
      </Episode>

      <Episode labelledBy="accountable" tone="paper" size="tall">
        <AboutCrew />
      </Episode>

      <Episode labelledBy="where" tone="cocoa">
        <AboutWhere />
      </Episode>

      <Episode labelledBy="not" tone="paper" size="tall">
        <AboutNot />
      </Episode>

      <Episode labelledBy="start" tone="signal" size="short">
        <EpisodeHead n="07" kicker="START" id="start" tone="signal" heading={aboutStart.heading}>
          {aboutStart.line}
        </EpisodeHead>
        <StartPlate
          heading={aboutStart.heading}
          line={aboutStart.line}
          href={aboutStart.href}
          label={aboutStart.label}
          tone="paper"
        />
      </Episode>
    </>
  );
}
