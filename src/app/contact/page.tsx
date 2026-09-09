import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Episode } from "@/components/episode/Episode";
import { LetterLedger } from "@/components/letter/LetterLedger";
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

      <Episode tone="paper">
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
          <div className="mt-6">
            <LetterLedger
              lines={[
                {
                  id: "email",
                  kicker: "Studio",
                  title: brand.contact.email,
                  href: `mailto:${brand.contact.email}`,
                  ask: "Write",
                },
                {
                  id: "studio",
                  kicker: "Legal name",
                  title: brand.legalName,
                  body: addressLine,
                },
              ]}
            />
          </div>
        </address>
      </Episode>
    </>
  );
}
