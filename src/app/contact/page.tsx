import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { IntakeForm } from "@/components/IntakeForm";
import { brand } from "@/config/brand";
import { addressLine } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Get in touch. A real person replies within one business day.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <section className="w-full bg-rag">
      <PageHero
        kicker="Contact"
        title="A real person replies."
        dek="Within one business day. No chatbot, no auto-responder, no support ticket queue."
        actionHref="#intake"
        actionLabel="Write to us"
      />

      {/* Real address and response commitment */}
      <section className="w-full bg-rag pt-16 pb-8 md:pt-20 md:pb-12">
        <div className="grid-container">
          <div className="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-12">
            <div className="md:col-span-6">
              <h2 className="font-plex-mono text-data tracking-[0.08em] text-ink/70 uppercase">
                Address
              </h2>
              <p className="mt-4 font-newsreader text-reading leading-reading text-ink">
                {brand.legalName}
              </p>
              <p className="font-newsreader text-reading leading-reading text-ink">
                {addressLine}
              </p>
              <p className="mt-4 font-newsreader text-reading leading-reading text-ink">
                {brand.contact.email}
              </p>
            </div>
            <div className="md:col-span-6">
              <h2 className="font-plex-mono text-data tracking-[0.08em] text-ink/70 uppercase">
                Response commitment
              </h2>
              <p className="mt-4 font-newsreader text-reading leading-reading text-ink">
                We reply within one business day. Usually sooner. If it is
                urgent, say so in the intake and we will prioritise it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Intake */}
      <section id="intake" className="w-full bg-rag py-24 md:py-40">
        <div className="grid-container">
          <IntakeForm variant="general" />
        </div>
      </section>
    </section>
  );
}
