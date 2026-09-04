import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
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
      <div className="h-px w-full bg-iron/15" />

      <div className="pt-40 pb-24 md:pt-48 md:pb-32">
        <div className="grid-container">
          <h1 className="font-newsreader text-[clamp(2rem,4vw+0.5rem,3.5rem)] leading-title tracking-tight text-iron">
            Contact
          </h1>
          <p className="mt-4 max-w-[560px] font-newsreader text-reading leading-reading text-ink">
            A real person replies within one business day. No chatbot, no
            auto-responder, no support ticket queue.
          </p>
        </div>
      </div>

      {/* Real address and response commitment */}
      <section className="w-full bg-rag py-8 md:py-12">
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
      <section className="w-full bg-rag py-24 md:py-40">
        <div className="grid-container">
          <IntakeForm variant="general" />
        </div>
      </section>
    </section>
  );
}
