import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { BeliefBlock } from "@/components/BeliefBlock";
import { PortraitStrip } from "@/components/PortraitStrip";
import { BreadcrumbJsonLd } from "@/lib/JsonLd";
import { studioBeliefs, studioOpening } from "@/content/beliefs";
import { specialists } from "@/content/specialists";
import { brand } from "@/config/brand";
import { addressLine } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "A senior studio in Lahore. Four rules we would rather lose a deal for than break.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "About", url: `${brand.url}/about` }]} />

      <PageHero
        kicker="About"
        title="Four rules we'd rather lose a deal for than break."
        hideAction
      />

      <section className="w-full bg-rag pb-24">
        <div className="grid-container pt-10 md:pt-14">
          <p className="max-w-[62ch] font-newsreader text-[18px] leading-[1.5] text-ink">
            {studioOpening}
          </p>

          <div className="mt-16">
            {studioBeliefs.map((belief) => (
              <BeliefBlock key={belief.statement} {...belief} />
            ))}
          </div>

          <div className="mt-20 border-t border-iron/20 pt-10">
            <p className="mb-8 font-plex-mono text-[13px] uppercase tracking-[0.08em] text-ink/70">
              The crew
            </p>
            <PortraitStrip people={specialists} />
          </div>

          <address className="mt-20 not-italic">
            <p className="font-plex-mono text-[13px] uppercase tracking-[0.08em] text-ink/70">
              Studio
            </p>
            <p className="mt-3 font-newsreader text-[18px] leading-[1.5] text-iron">
              {brand.legalName}
              <br />
              {addressLine}
              <br />
              <a
                href={`mailto:${brand.contact.email}`}
                className="underline decoration-iron/30 underline-offset-4 hover:decoration-iron"
              >
                {brand.contact.email}
              </a>
            </p>
          </address>
        </div>
      </section>
    </>
  );
}
