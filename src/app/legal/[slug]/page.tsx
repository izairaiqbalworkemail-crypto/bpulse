import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { getLegalDoc, legalOwner, clauseNumber, partyPair } from "@/content/documents";
import { LEGAL_STATUS_META, LEGAL_FAMILY_LABEL } from "@/content/documents/types";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = getLegalDoc(slug);
  if (!doc) return {};
  return buildMetadata({
    title: doc.name,
    description: `${doc.lead} Maintained by ${legalOwner.name}.`,
    path: `/legal/${doc.slug}`,
  });
}

export async function generateStaticParams() {
  const slugs = new Set<string>();
  for (const { slug, aliases } of (await import("@/content/documents")).legalDocuments) {
    slugs.add(slug);
    for (const alias of aliases ?? []) slugs.add(alias);
  }
  return [...slugs].map((slug) => ({ slug }));
}

export default async function LegalDocPage({ params }: PageProps) {
  const { slug } = await params;
  const doc = getLegalDoc(slug);
  if (!doc) notFound();

  const status = LEGAL_STATUS_META[doc.status];
  const [from, to] = partyPair(doc);

  return (
    <section className="w-full bg-rag pb-24 md:pb-32">
      <div className="print:hidden">
        <PageHero
          kicker={`${LEGAL_FAMILY_LABEL[doc.family]} · ${doc.reference}`}
          title={doc.name}
          dek={doc.lead}
          hideAction
        />
      </div>
      <div className="legal-print grid-container pt-10 md:pt-14">
        <Link
          href="/legal"
          className="font-plex-sans text-sm text-ink/70 underline-offset-4 hover:underline print:hidden"
        >
          ← Back to legal register
        </Link>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-partial px-3 py-1 font-plex-sans text-[12px] font-medium text-white">
            <span aria-hidden="true">{status.dot}</span> {status.label}
          </span>
          <span className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">
            {LEGAL_FAMILY_LABEL[doc.family]} · {doc.reference}
          </span>
        </div>

        <article className="mt-8 max-w-[66ch]">
          <h1 className="mb-4 hidden font-newsreader type-display text-[40px] leading-[1.05] text-iron print:block">
            {doc.name}
          </h1>
          <p className="mb-6 hidden font-newsreader text-[18px] leading-[1.5] text-ink print:block">
            {doc.lead}
          </p>

          {/* Metadata card */}
          <dl className="mt-6 card p-5 font-plex-sans text-[14px] md:grid md:grid-cols-3">
            <div>
              <dt className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/60">
                Reference
              </dt>
              <dd className="mt-0.5 text-iron">{doc.reference}</dd>
            </div>
            <div>
              <dt className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/60">
                Version
              </dt>
              <dd className="mt-0.5 text-iron">{doc.version}</dd>
            </div>
            <div>
              <dt className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/60">
                Issued
              </dt>
              <dd className="mt-0.5 text-iron">{doc.issuedAt}</dd>
            </div>
            <div>
              <dt className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/60">
                Updated
              </dt>
              <dd className="mt-0.5 text-iron">{doc.updatedAt}</dd>
            </div>
            <div>
              <dt className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/60">
                Status
              </dt>
              <dd className={`mt-0.5 text-iron`}>
                <span className={status.class}>{status.dot}</span>{" "}
                <span className="ml-1">{status.label}</span>
              </dd>
            </div>
            <div>
              <dt className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/60">
                Owner
              </dt>
              <dd className="mt-0.5 text-iron">
                {doc.owner} · {doc.role}
              </dd>
            </div>
          </dl>

          {/* Parties */}
          {from && to && (
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[from, to].map((party) => (
                <div key={party.key} className="card p-4">
                  <p className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/60">
                    {party.key === "bpulse" ? "From" : "To"}
                  </p>
                  <p className="mt-1 font-newsreader text-[20px] leading-[1.2] text-iron">
                    {party.name}
                  </p>
                  <p className="mt-1 font-newsreader text-[15px] leading-[1.45] text-ink">
                    {party.entity} · {party.jurisdiction}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Legal owner — real crew profile */}
          <div className="mt-6 flex flex-wrap items-start gap-4 card p-4">
            <Image
              src="/team/hamza.jpg"
              alt={`${legalOwner.name} — ${legalOwner.role}`}
              width={88}
              height={110}
              className="h-[104px] w-[84px] rounded-[10px] object-cover object-top grayscale"
            />
            <div className="min-w-0 flex-1">
              <p className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/60">
                Legal owner
              </p>
              <p className="mt-1 font-newsreader text-[21px] leading-[1.2] text-iron">
                {legalOwner.name} · {legalOwner.role}
              </p>
              <p className="mt-1.5 max-w-[52ch] font-newsreader text-[16px] leading-[1.5] text-ink">
                {legalOwner.line}
              </p>
              <p className="mt-2 font-plex-sans text-[14px] text-ink">
                See the crew profile:{" "}
                <Link
                  href="/team/hamza"
                  className="underline decoration-iron/30 underline-offset-4 hover:decoration-iron"
                >
                  /team/hamza
                </Link>{" "}
                ·{" "}
                <a
                  href={`mailto:${legalOwner.email}`}
                  className="underline decoration-iron/30 underline-offset-4 hover:decoration-iron"
                >
                  {legalOwner.email}
                </a>
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-3 print:hidden">
            <a
              href={`/legal/${doc.slug}/pdf`}
              download
              className="inline-flex items-center gap-2 rounded-[var(--radius-button)] bg-iron px-5 py-2.5 font-plex-sans text-[14px] font-medium text-rag transition-colors hover:bg-iron-2"
            >
              Download PDF
            </a>
            <a
              href={`/legal/${doc.slug}/text`}
              className="inline-flex items-center gap-2 rounded-[var(--radius-button)] border border-iron/25 px-5 py-2.5 font-plex-sans text-[14px] font-medium text-iron transition-colors hover:border-iron"
            >
              Plain text
            </a>
            {doc.versions && doc.versions.length > 1 && (
              <a
                href={`/legal/${doc.slug}/diff/pdf`}
                download
                className="inline-flex items-center gap-2 rounded-[var(--radius-button)] border border-iron/25 px-5 py-2.5 font-plex-sans text-[14px] font-medium text-iron transition-colors hover:border-iron"
              >
                Diff PDF
              </a>
            )}
          </div>

          {/* Sections — one card per section */}
          {doc.sections.map((section) => (
            <section
              key={section.number}
              className="mt-8 scroll-mt-28 card p-5"
              aria-labelledby={`section-${section.number}`}
            >
              <h2
                id={`section-${section.number}`}
                className="font-newsreader text-[27px] leading-[1.2] text-iron"
              >
                {section.number}. {section.heading}
              </h2>
              <div className="mt-3 border-l-[3px] border-signal bg-rag px-4 py-3">
                <p className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/60">
                  In plain terms
                </p>
                <p className="mt-1 font-newsreader text-[17px] leading-[1.5] text-iron">
                  {section.plainTerms}
                </p>
              </div>
              <ul className="mt-4 space-y-3">
                {section.clauses.map((clause, index) => (
                  <li
                    key={clause.number ?? `${section.number}.${index}`}
                    className="flex gap-4 font-newsreader text-[17px] leading-[1.55] text-ink"
                  >
                    <span className="shrink-0 pl-0 font-plex-mono text-[13px] leading-[1.9] text-ink/70">
                      {clauseNumber(section.number, index, clause.number)}
                    </span>
                    <span>{clause.text}</span>
                  </li>
                ))}
              </ul>
              {section.reviewNote && (
                <p className="mt-3 font-plex-sans text-[13px] italic leading-[1.5] text-ink">
                  Review needed: {section.reviewNote}
                </p>
              )}
            </section>
          ))}

          {/* Signature block */}
          {doc.signatureBlocks.length > 0 && (
            <section className="mt-8 card p-5">
              <h3 className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">
                Signatures
              </h3>
              <div className="mt-6 grid gap-8 sm:grid-cols-2">
                {doc.signatureBlocks.map((block) => (
                  <div key={block.party}>
                    <p className="font-plex-sans text-[15px] font-medium text-iron">
                      For {block.party.toUpperCase()} — {block.name}
                    </p>
                    <p className="mt-0.5 font-plex-sans text-[15px] text-iron">
                      Title: {block.title}
                    </p>
                    <div className="mt-10 border-b border-ink/50 pt-1 font-plex-mono text-[12px] text-ink/50">
                      Signature and date
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Changelog */}
          <section className="mt-8 card p-5">
            <h3 className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">
              Changelog
            </h3>
            <ul className="mt-4 space-y-4">
              {doc.changelog.map((entry) => (
                <li key={`${entry.version}-${entry.date}`} className="border-l-2 border-iron/20 pl-4">
                  <p className="font-plex-mono text-[12px] text-ink/65">
                    {entry.version} · {entry.date} · {entry.change}
                  </p>
                  <p className="mt-1 font-newsreader text-[16px] leading-[1.45] text-ink">
                    Why: {entry.reason}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          {/* Version history + diff */}
          {doc.versions && doc.versions.length > 0 && (
            <section className="mt-8 card p-5">
              <h3 className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">
                Version history
              </h3>
              <ul className="mt-4 space-y-4">
                {doc.versions.map((version) => (
                  <li key={version.version} className="border-l-2 border-iron/20 pl-4">
                    <p className="font-plex-mono text-[12px] text-ink/65">
                      {version.version} · {version.issuedAt} · {version.note}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>

        {/* Footer */}
        <footer className="mt-16 flex flex-wrap items-center justify-between gap-2 border-t border-iron/20 pt-3 font-plex-mono text-[12px] text-ink/70">
          <p>bpulse · breakthrough pulse · contact@bpulse.dev</p>
          <p>
            {doc.reference} · {doc.version} ·{" "}
            <span className={status.class}>{status.dot}</span> {status.label}
          </p>
        </footer>
      </div>
    </section>
  );
}