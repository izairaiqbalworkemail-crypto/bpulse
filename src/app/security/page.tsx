import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Atmosphere } from "@/components/landing/Atmosphere";
import { pageFrame } from "@/content/platform";
import { subProcessors } from "@/content/legal/vendors";

export const metadata: Metadata = buildMetadata({
  title: "Security",
  description: pageFrame.security,
  path: "/security",
});

export default function SecurityPage() {
  return (
    <section className="w-full bg-rag">
      <PageHero
        kicker="Security"
        title="Data handling and disclosure routes."
        dek={pageFrame.security}
        hideAction
      />

      <div className="relative overflow-hidden pb-24 md:pb-32">
        <Atmosphere kind="paper" opacity={0.14} />
        <div className="relative grid-container pt-10 md:pt-14">
          <section className="border-t border-iron/12 pt-8">
            <h2 className="font-newsreader text-[27px] text-iron">
              Data handling
            </h2>
            <ul className="mt-4">
              {subProcessors.map((row) => (
                <li
                  key={row.name}
                  className="border-t border-iron/8 py-3 font-newsreader text-[17px] leading-[1.5] text-ink first:border-t-0 first:pt-0"
                >
                  {row.name} — {row.role}
                </li>
              ))}
            </ul>
            <p className="mt-4 max-w-[52ch] font-newsreader text-[17px] leading-[1.5] text-ink">
              No analytics, tracking pixels, advertising cookies, or session
              recording are used on this site. The site sets no cookies.
            </p>
          </section>

          <section className="mt-10 border-t border-iron/12 pt-8">
            <p className="max-w-[52ch] font-newsreader text-[18px] leading-[1.5] text-iron">
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
          </section>

          <section className="mt-10 border-t border-iron/12 pt-8">
            <p className="font-newsreader text-[17px] leading-[1.5] text-ink">
              Vulnerability disclosure: security@bpulse.dev · Legal owner:
              hamza@bpulse.dev.
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
