import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { BriefIntake } from "@/components/intake/BriefIntake";
import { PassAlong } from "@/components/PassAlong";
import { VettedPay } from "@/components/VettedPay";
import { Credit } from "@/components/primitives/Credit";
import { PeopleRail } from "@/components/PeopleRail";
import {
  Atmosphere,
  AtmosphereNote,
} from "@/components/landing/Atmosphere";
import { Reveal } from "@/components/landing/Reveal";
import { brand } from "@/config/brand";
import { addressLine } from "@/config/site";
import { checkRunner } from "@/content/check";
import { getSpecialist, specialists } from "@/content/specialists";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Lahore. One business day. A mailto if you will not fill a form.",
  path: "/contact",
});

export default function ContactPage() {
  const runner = getSpecialist(checkRunner.id);

  return (
    <>
      <PageHero
        kicker="Contact"
        title="A person replies within one business day."
        dek="Write the brief. A person reads it. If you will not fill a form, write the address below."
        hideAction
      />

      <section className="relative w-full overflow-hidden bg-rag pb-24">
        <Atmosphere kind="paper" opacity={0.16} />
        <div className="relative grid-container pt-12 md:pt-16">
          <PeopleRail
            people={specialists}
            line="A named person replies. Not a queue."
          />
          <div className="mt-3">
            <AtmosphereNote />
          </div>
          <Reveal className="mt-10">
            <Credit
              name={runner.name}
              capability={runner.role}
              line={checkRunner.line}
              portraitSrc={runner.photo}
              portraitAlt={runner.name}
            />
          </Reveal>

          <div id="intake" className="mt-12">
            <BriefIntake type="contact" source="contact" />
            <div className="mt-8">
              <VettedPay />
            </div>
            <div className="mt-8">
              <PassAlong />
            </div>
          </div>

          <address className="mt-16 not-italic">
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
