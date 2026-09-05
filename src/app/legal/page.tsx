import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Atmosphere } from "@/components/landing/Atmosphere";
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
    <section className="w-full bg-rag">
      <PageHero
        kicker="Legal & Compliance"
        title="The forms we actually sign."
        dek="Active standard forms. Each executed set is dated, named, and reviewed by a solicitor in the client’s jurisdiction before completion."
        hideAction
      />

      <div className="relative overflow-hidden pb-24 md:pb-32">
        <Atmosphere kind="paper" opacity={0.14} />
        <div className="relative grid-container pt-10 md:pt-14">
          <p className="font-plex-sans text-[14px] text-ink/70">
            Owned by{" "}
            <Link
              href="/team/hamza"
              className="underline decoration-iron/30 underline-offset-4 hover:decoration-iron"
            >
              {legalOwner.name}
            </Link>
          </p>

          {(Object.keys(byFamily) as Array<keyof typeof byFamily>).map(
            (family) => (
              <div key={family} className="mt-12">
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
                        className="card card-hover group p-6 md:p-8"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <p className="font-newsreader text-[22px] leading-[1.2] text-iron group-hover:underline">
                            {doc.name}
                          </p>
                          <span
                            className={`shrink-0 font-plex-mono text-[12px] ${status.class}`}
                            title={status.label}
                          >
                            {status.dot} {status.label}
                          </span>
                        </div>
                        <p className="mt-3 max-w-[52ch] font-newsreader text-[16px] leading-[1.4] text-ink">
                          {doc.lead}
                        </p>
                        <p className="mt-4 font-plex-mono text-[12px] text-ink/60">
                          {doc.reference} · {doc.version}
                        </p>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ),
          )}

          <div className="mt-16 grid gap-3 md:grid-cols-2">
            <section className="card p-6 md:p-8">
              <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">
                Who owns this
              </p>
              <div className="mt-5 flex items-start gap-4">
                <Image
                  src="/team/hamza.jpg"
                  alt="Hamza Khan"
                  width={88}
                  height={110}
                  className="h-[110px] w-[88px] rounded-[16px] object-cover object-top grayscale"
                />
                <div>
                  <p className="font-newsreader text-[24px] leading-[1.2] text-iron">
                    {legalOwner.name}
                  </p>
                  <p className="mt-1 font-newsreader text-[16px] text-ink">
                    {legalOwner.role}
                  </p>
                  <p className="mt-3 max-w-[40ch] font-newsreader text-[16px] leading-[1.5] text-ink">
                    {legalOwner.line}
                  </p>
                  <p className="mt-3 font-plex-sans text-[14px] text-ink">
                    <Link
                      href="/team/hamza"
                      className="underline decoration-iron/30 underline-offset-4 hover:decoration-iron"
                    >
                      Crew profile
                    </Link>
                    {" · "}
                    <a
                      href={`mailto:${legalOwner.email}`}
                      className="underline decoration-iron/30 underline-offset-4 hover:decoration-iron"
                    >
                      {legalOwner.email}
                    </a>
                  </p>
                </div>
              </div>
            </section>

            <section className="card p-6 md:p-8">
              <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">
                How the forms work
              </p>
              <p className="mt-5 max-w-[45ch] font-newsreader text-[20px] leading-[1.4] text-iron">
                These are bpulse&apos;s active standard forms. Each executed set
                is dated and signed against a named client, and a solicitor
                reviews the executed set in the client&apos;s jurisdiction
                before completion.
              </p>
            </section>
          </div>

          <section className="mt-16">
            <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">
              What we sign with every client
            </p>
            <ul className="mt-4 grid gap-3 md:grid-cols-2">
              {contractSet.map((item) => (
                <li key={item.name} className="card p-6">
                  <p className="font-newsreader text-[20px] text-iron">
                    {item.name}
                  </p>
                  <p className="mt-2 font-newsreader text-[16px] leading-[1.5] text-ink">
                    {item.line}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-[56ch] font-newsreader text-[16px] leading-[1.5] text-ink">
              When a matter needs them, we add:{" "}
              {occasionalSet.map((item) => item.name).join(", ")}.
            </p>
            <p className="mt-4 font-plex-sans text-[14px] text-ink">
              See document shape in the sample portal:{" "}
              <Link
                href="/demo/documents"
                className="underline underline-offset-4"
              >
                /demo/documents
              </Link>
            </p>
          </section>

          <section className="card mt-12 p-6 md:p-8">
            <p className="font-newsreader text-[18px] leading-[1.5] text-ink">
              Vulnerability disclosure: security@bpulse.dev · Data protection
              contact: contact@bpulse.dev
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
