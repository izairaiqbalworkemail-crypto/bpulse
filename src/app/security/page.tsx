import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Atmosphere } from "@/components/landing/Atmosphere";

export const metadata: Metadata = buildMetadata({
  title: "Security",
  description:
    "Operational security posture, data handling surfaces, and legal cross-links.",
  path: "/security",
});

const vendors = [
  "Postgres for intake and application records",
  "Upstash Redis for rate limits and selected counters",
  "Resend for transactional email delivery",
];

export default function SecurityPage() {
  return (
    <section className="w-full bg-rag">
      <PageHero
        kicker="Security"
        title="Data handling and disclosure routes."
        dek="This page mirrors the same factual claims made in our legal documents. If a fact changes in one place, it must change in both."
        hideAction
      />

      <div className="relative overflow-hidden pb-24 md:pb-32">
        <Atmosphere kind="paper" opacity={0.14} />
        <div className="relative grid-container pt-10 md:pt-14">
          <section className="card p-8">
            <h2 className="font-newsreader text-[27px] text-iron">
              Data handling
            </h2>
            <ul className="mt-4 space-y-3">
              {vendors.map((item) => (
                <li
                  key={item}
                  className="font-newsreader text-[17px] leading-[1.5] text-ink"
                >
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 font-newsreader text-[17px] leading-[1.5] text-ink">
              No analytics, tracking pixels, advertising cookies, or session
              recording are used on this site.
            </p>
          </section>

          <section className="card mt-4 p-8">
            <p className="font-newsreader text-[18px] leading-[1.5] text-iron">
              Cross-check policy source:{" "}
              <Link
                href="/legal/privacy-policy"
                className="underline underline-offset-4"
              >
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link
                href="/legal/cookie-policy"
                className="underline underline-offset-4"
              >
                Cookie Policy
              </Link>
              .
            </p>
          </section>

          <section className="card mt-4 p-8">
            <p className="font-newsreader text-[17px] leading-[1.5] text-ink">
              Vulnerability disclosure: security@bpulse.dev · Legal and risk
              owner: hamza@bpulse.dev
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
