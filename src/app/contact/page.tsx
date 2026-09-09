import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { BriefIntake } from "@/components/intake/BriefIntake";
import { brand } from "@/config/brand";
import { addressLine } from "@/config/site";
import { pageFrame } from "@/content/platform";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: pageFrame.contact,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        kicker="Contact"
        title="Write us."
        dek="Name, email, what you need. Aneeb reads it within one business day."
        hideAction
      />

      <section className="relative w-full overflow-hidden bg-paper pb-24">
        <div className="relative grid-container pt-12 md:pt-16">
          <div id="start" className="scroll-mt-[5.75rem] md:scroll-mt-28">
          <div id="intake" className="scroll-mt-[5.75rem] md:scroll-mt-28">
            <BriefIntake type="contact" source="contact" />
          </div>
          </div>

          <p className="mt-12 max-w-[42ch] font-newsreader text-[18px] leading-[1.45] text-ink">
            If you have a stuck build, the{" "}
            <Link
              href="/read"
              className="underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
            >
              Read is faster
            </Link>
            .
          </p>

          <address className="mt-16 not-italic">
            <p className="font-plex-mono text-[13px] uppercase tracking-[0.08em] text-quill/70">
              Direct
            </p>
            <p className="mt-3 font-newsreader text-[18px] leading-[1.5] text-ink">
              <a
                href={`mailto:${brand.contact.email}`}
                className="underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
              >
                {brand.contact.email}
              </a>
              <br />
              {brand.legalName}
              <br />
              {addressLine}
            </p>
          </address>
        </div>
      </section>
    </>
  );
}
