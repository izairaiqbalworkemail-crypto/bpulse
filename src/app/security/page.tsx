import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Episode } from "@/components/episode/Episode";
import { LetterLedger } from "@/components/letter/LetterLedger";
import { pageFrame } from "@/content/platform";
import { subProcessors } from "@/content/legal/vendors";

export const metadata: Metadata = buildMetadata({
  title: "Security",
  description: pageFrame.security,
  path: "/security",
});

export default function SecurityPage() {
  return (
    <>
      <PageHero
        kicker="Security"
        title="Data handling and disclosure routes."
        dek={pageFrame.security}
      />

      <Episode tone="paper">
        <p className="font-plex-mono text-[12px] uppercase tracking-[0.14em] text-quill/70">
          Data handling
        </p>
        <p className="mt-4 max-w-[40ch] font-newsreader text-[22px] leading-[1.25] text-ink">
          Named vendors. Same list as the legal register.
        </p>
        <div className="mt-10">
          <LetterLedger
            lines={subProcessors.map((row) => ({
              id: row.name,
              kicker: row.name,
              title: row.role,
              body: row.data,
            }))}
          />
        </div>
        <p className="mt-10 max-w-[52ch] font-newsreader text-[17px] leading-[1.5] text-quill">
          Public analytics is self-hosted. No visitor analytics request reaches
          a third-party domain. Public pages set no cookies.
        </p>

        <p className="mt-16 max-w-[52ch] font-newsreader text-[18px] leading-[1.5] text-ink">
          The same vendors, with regions and the Pakistan transfer position:{" "}
          <Link href="/legal/data" className="underline underline-offset-4">
            /legal/data
          </Link>
          . Privacy:{" "}
          <Link
            href="/legal/privacy-policy"
            className="underline underline-offset-4"
          >
            /legal/privacy-policy
          </Link>
          . Cookies:{" "}
          <Link
            href="/legal/cookie-policy"
            className="underline underline-offset-4"
          >
            /legal/cookie-policy
          </Link>
          . Disclosure:{" "}
          <Link
            href="/legal/vulnerability-disclosure"
            className="underline underline-offset-4"
          >
            /legal/vulnerability-disclosure
          </Link>
          .
        </p>

        <p className="mt-10 font-newsreader text-[17px] leading-[1.5] text-quill">
          Vulnerability disclosure: security@bpulse.dev · Legal owner:
          hamza@bpulse.dev.
        </p>
      </Episode>
    </>
  );
}
