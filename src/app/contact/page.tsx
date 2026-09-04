import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { CrewSession } from "@/components/intake/CrewSession";
import { brand } from "@/config/brand";
import { addressLine } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Lahore. One business day. A mailto if you will not fill a form.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <section className="w-full bg-rag">
      <div className="grid-container pb-24 pt-16 md:pb-32 md:pt-24">
        <p className="font-plex-mono text-[13px] uppercase tracking-[0.08em] text-ink/70">
          Studio
        </p>
        <p className="mt-3 font-newsreader text-[24px] leading-[1.25] text-iron">
          {brand.legalName}
          <br />
          {addressLine}
        </p>
        <p className="mt-6 max-w-[48ch] font-newsreader text-[16px] leading-[1.5] text-ink">
          A named person replies within one business day. No chatbot. If you
          will not fill a form, write the address below.
        </p>
        <p className="mt-4">
          <a
            href={`mailto:${brand.contact.email}`}
            className="font-plex-sans text-[16px] text-iron underline decoration-iron/30 underline-offset-4 hover:decoration-iron"
          >
            {brand.contact.email}
          </a>
        </p>

        <div id="intake" className="mt-16">
          <CrewSession type="contact" />
        </div>
      </div>
    </section>
  );
}
