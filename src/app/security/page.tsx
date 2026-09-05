import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

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
    <section className="w-full bg-rag pb-24 md:pb-32">
      <div className="grid-container pt-14 md:pt-20">
        <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">Security</p>
        <h1 className="mt-2 font-newsreader text-[40px] leading-[1.05] text-iron md:text-[54px]">
          Data handling and disclosure routes.
        </h1>

        <p className="mt-6 max-w-[64ch] font-newsreader text-reading leading-reading text-ink">
          This page mirrors the same factual claims made in our legal documents.
          If a fact changes in one place, it must change in both.
        </p>

        <section className="mt-12 border border-iron/20 bg-rag-card p-6">
          <h2 className="font-newsreader text-[27px] text-iron">Data handling</h2>
          <ul className="mt-4 space-y-3">
            {vendors.map((item) => (
              <li key={item} className="font-newsreader text-[17px] leading-[1.5] text-ink">
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 font-newsreader text-[17px] leading-[1.5] text-ink">
            No analytics, tracking pixels, advertising cookies, or session recording are used on this site.
          </p>
        </section>

        <section className="mt-10 border-l-4 border-signal bg-signal/10 p-4">
          <p className="font-newsreader text-[17px] leading-[1.5] text-iron">
            Cross-check policy source: <Link href="/legal/privacy-policy" className="underline underline-offset-4">Privacy Policy</Link> and <Link href="/legal/cookie-policy" className="underline underline-offset-4">Cookie Policy</Link>.
          </p>
        </section>

        <section className="mt-10">
          <p className="font-newsreader text-[17px] leading-[1.5] text-ink">
            Vulnerability disclosure: security@bpulse.dev · Legal and risk owner: hamza@bpulse.dev
          </p>
        </section>
      </div>
    </section>
  );
}
