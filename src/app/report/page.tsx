import type { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Private report host",
  robots: { index: false, follow: false },
};

export default function ReportHostIndexPage() {
  return (
    <article className="report-page bg-rag text-ink">
      <div className="mx-auto max-w-[720px] px-6 py-16 md:py-24">
        <header className="border-b border-iron/15 pb-8">
          <p className="font-plex-mono text-[13px] uppercase tracking-[0.14em] text-ink/60">
            Private report host
          </p>
          <h1 className="mt-3 font-newsreader text-[28px] leading-[1.2] text-iron">
            Open the full report link.
          </h1>
        </header>

        <section className="mt-8 space-y-4">
          <p className="font-newsreader text-[18px] leading-[1.5] text-ink">
            Reports live on slugged routes under this host. Use the full URL from
            the delivery email.
          </p>
          <p className="font-newsreader text-[17px] leading-[1.5] text-ink">
            Local preview uses <code>http://report.localhost:3000/&lt;slug&gt;</code>.
          </p>
          <p>
            <Link
              href="https://bpulse.dev"
              className="font-plex-sans text-[15px] text-ink underline decoration-iron/25 underline-offset-4 hover:decoration-iron"
            >
              Go to bpulse.dev
            </Link>
          </p>
        </section>
      </div>
    </article>
  );
}
