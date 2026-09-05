import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { CrewSession } from "@/components/intake/CrewSession";
import { PassAlong } from "@/components/PassAlong";
import { VettedPay } from "@/components/VettedPay";
import { Credit } from "@/components/primitives/Credit";
import { brand } from "@/config/brand";
import { addressLine } from "@/config/site";
import { checkRunner } from "@/content/check";
import { getSpecialist } from "@/content/specialists";

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
        dek="This is an intake form that reads like a conversation. No one is typing. If you will not fill a form, write the address below."
        hideAction
      />

      <section className="w-full bg-rag pb-24">
        <div className="grid-container pt-12 md:pt-16">
          <Credit
            name={runner.name}
            capability={runner.role}
            line={checkRunner.line}
            portraitSrc={runner.photo}
            portraitAlt={runner.name}
          />

          <div id="intake" className="mt-12">
            <CrewSession type="contact" source="contact" />
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
