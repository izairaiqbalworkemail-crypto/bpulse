import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo";
import {
  legalOwner,
  documentsByFamily,
  contractSet,
  occasionalSet,
} from "@/content/documents";
import { LEGAL_FAMILY_LABEL, LEGAL_STATUS_META } from "@/content/documents/types";

export const metadata: Metadata = buildMetadata({
  title: "Legal & Compliance",
  description:
    "Document register and ownership for bpulse legal and compliance surfaces.",
  path: "/legal",
});

export default function LegalIndexPage() {
  const byFamily = documentsByFamily();

  return (
    <section className="w-full bg-rag pb-24 md:pb-32">
      <div className="grid-container pt-12 md:pt-16">
<header className="rounded-[16px] border border-iron/20 bg-rag-card p-6 shadow-[var(--shadow-card)]">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <h1 className="font-newsreader text-[40px] leading-[1.05] tracking-[-0.02em] text-iron md:text-[48px]">
                Legal & Compliance
              </h1>
              <p className="font-plex-sans text-[14px] text-ink/70">
                Owned by{" "}
                <Link
                  href="/team/hamza"
                  className="underline decoration-iron/30 underline-offset-4 hover:decoration-iron"
                >
                  {legalOwner.name}
                </Link>
              </p>
            </div>

            {(Object.keys(byFamily) as Array<keyof typeof byFamily>).map((family) => (
              <div key={family} className="mt-10">
                <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/65">
                  {LEGAL_FAMILY_LABEL[family]}
                </p>
                <div className="mt-4 grid gap-3 lg:grid-cols-2">
                  {byFamily[family].map((doc) => {
                    const status = LEGAL_STATUS_META[doc.status];
                    return (
                      <Link
                        key={doc.slug}
                        href={`/legal/${doc.slug}`}
                        className="group rounded-[16px] border border-iron/20 bg-rag p-4 transition-colors hover:border-iron/40"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <p className="font-newsreader text-[21px] leading-[1.25] text-iron group-hover:underline">
                            {doc.name}
                          </p>
                          <span
                            className={`shrink-0 font-plex-mono text-[12px] ${status.class}`}
                            title={status.label}
                          >
                            {status.dot} {status.label}
                          </span>
                        </div>
                        <p className="mt-2 max-w-[52ch] font-plex-sans text-[13px] leading-[1.4] text-ink/70">
                          {doc.lead}
                        </p>
                        <p className="mt-3 font-plex-mono text-[12px] text-ink/60">
                          {doc.reference} · {doc.version}
                        </p>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </header>

        <div className="mt-12 grid gap-10 md:grid-cols-2">
          <section>
            <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">
              Who owns this
            </p>
            <div className="mt-4 rounded-[16px] border border-iron/20 bg-rag-card p-4">
              <div className="flex items-start gap-4">
                <Image
                  src="/team/hamza.jpg"
                  alt="Hamza Khan"
                  width={88}
                  height={110}
                  className="h-[110px] w-[88px] rounded-[10px] object-cover object-top grayscale"
                />
                <div>
                  <p className="font-newsreader text-[24px] leading-[1.2] text-iron">
                    {legalOwner.name} · {legalOwner.role}
                  </p>
                  <p className="mt-2 max-w-[40ch] font-newsreader text-[17px] leading-[1.5] text-ink">
                    {legalOwner.line}
                  </p>
                  <p className="mt-2 font-plex-sans text-[14px] text-ink">
                    Part of the bpulse crew - profile:{" "}
                    <Link
                      href="/team/hamza"
                      className="underline decoration-iron/30 underline-offset-4 hover:decoration-iron"
                    >
                      /team/hamza
                    </Link>
                  </p>
                  <p className="mt-2 font-plex-sans text-[15px] text-ink">
                    <a
                      href={`mailto:${legalOwner.email}`}
                      className="underline decoration-iron/30 underline-offset-4 hover:decoration-iron"
                    >
                      {legalOwner.email}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[16px] border border-iron/20 bg-rag-card p-4">
            <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">
              How the forms work
            </p>
            <p className="mt-3 max-w-[45ch] font-newsreader text-[18px] leading-[1.5] text-iron">
              These are bpulse&apos;s active standard forms. Each executed set
              is dated and signed against a named client, and a solicitor
              reviews the executed set in the client&apos;s jurisdiction before
              completion.
            </p>
          </section>
        </div>

        <section className="mt-14 border-t border-iron/20 pt-8">
          <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">
            What we sign with every client
          </p>
          <ul className="mt-4 space-y-4">
            {contractSet.map((item) => (
              <li key={item.name}>
                <p className="font-newsreader text-[20px] text-iron">{item.name}</p>
                <p className="font-newsreader text-[16px] leading-[1.5] text-ink">{item.line}</p>
              </li>
            ))}
          </ul>
          <p className="mt-5 font-newsreader text-[16px] leading-[1.5] text-ink">
            When a matter needs them, we add:{" "}
            {occasionalSet.map((item) => item.name).join(", ")}.
          </p>
          <p className="mt-5 font-plex-sans text-[14px] text-ink">
            See document shape in the sample portal:{" "}
            <Link href="/demo/documents" className="underline underline-offset-4">
              /demo/documents
            </Link>
          </p>
        </section>

        <section className="mt-10 border-t border-iron/20 pt-8">
          <p className="font-newsreader text-[18px] leading-[1.5] text-ink">
            Vulnerability disclosure: security@bpulse.dev · Data protection contact:
            contact@bpulse.dev
          </p>
        </section>
      </div>
    </section>
  );
}