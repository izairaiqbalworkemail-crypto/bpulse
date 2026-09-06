import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { BeliefBlock } from "@/components/BeliefBlock";
import { PortraitStrip } from "@/components/PortraitStrip";
import { PeopleRail } from "@/components/PeopleRail";
import {
  Atmosphere,
  AtmosphereNote,
} from "@/components/landing/Atmosphere";
import { DirectDesk } from "@/components/direct/DirectDesk";
import { PassAlong } from "@/components/PassAlong";
import { VettedPay } from "@/components/VettedPay";
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

      <section className="relative w-full overflow-hidden bg-rag pb-24">
        <Atmosphere kind="paper" opacity={0.18} />
        <div className="relative grid-container pt-10 md:pt-14">
          <p className="max-w-[52ch] font-newsreader text-[18px] leading-[1.5] text-ink">
            {studioOpening}
          </p>
          <div className="mt-8">
            <PeopleRail people={specialists} line="Lahore · named" />
          </div>
          <div className="mt-3">
            <AtmosphereNote />
          </div>

          <div className="card mt-12">
            {/* SVG lockup — next/image is for raster. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/bpulse-brand/lockup/bpulse-lockup-dark.svg"
              alt="bpulse"
              width={1600}
              height={460}
              className="h-auto w-full"
            />
          </div>

          <div className="mt-16">
            {studioBeliefs.map((belief) => (
              <BeliefBlock key={belief.statement} {...belief} />
            ))}
          </div>

          <div id="intake" className="mt-20 scroll-mt-[5.75rem] md:scroll-mt-28">
            <p className="mb-6 font-plex-mono text-[13px] uppercase tracking-[0.08em] text-ink/70">
              Different people would read different answers
            </p>
            <DirectDesk variant="about" pageSource="about" />
          </div>

          <div className="mt-20 border-t border-iron/20 pt-10">
            <p className="mb-8 font-plex-mono text-[13px] uppercase tracking-[0.08em] text-ink/70">
              Admitted to the standard
            </p>
            <PortraitStrip people={specialists} />
          </div>

          <div className="mt-20">
            <div className="mt-8">
              <VettedPay />
            </div>
            <div className="mt-8">
              <PassAlong />
            </div>
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
