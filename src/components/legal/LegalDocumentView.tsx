import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Item, Reveal, Stagger } from "@/components/landing/Reveal";
import { LegalIndex } from "@/components/legal/LegalIndex";
import {
  LegalClause,
  LegalJump,
  LegalOwnerLine,
  LegalPlain,
  legalTitle,
} from "@/components/legal/legal-ui";
import { clauseNumber, legalOwner } from "@/content/documents";
import { LEGAL_FAMILY_LABEL, LEGAL_STATUS_META } from "@/content/documents/types";
import type { LegalDoc } from "@/content/documents/types";
import { DRAFT_NOTICE, isDraftDocument } from "@/lib/legal/status";

export function LegalDocumentView({ doc }: Readonly<{ doc: LegalDoc }>) {
  const status = LEGAL_STATUS_META[doc.status];
  const isDraft = isDraftDocument(doc);
  const sectionReviewNotes = doc.sections
    .filter((section) => section.reviewNote)
    .map((section) => ({ section: section.number, note: section.reviewNote as string }));
  const index = [
    ...doc.sections.map((section) => ({
      id: `section-${section.number}`,
      href: `#section-${section.number}`,
      label: `${section.number}. ${section.heading}`,
    })),
    ...(doc.signatureBlocks.length > 0
      ? [{ id: "signatures", href: "#signatures", label: "Signatures" }]
      : []),
    { id: "changelog", href: "#changelog", label: "What changed" },
  ];

  return (
    <section className="ribbon w-full bg-rag text-iron">
      <div className="legal-chrome">
        <PageHero
          kicker={`${LEGAL_FAMILY_LABEL[doc.family]} · ${doc.reference}`}
          title={legalTitle(doc.name)}
          dek={doc.lead}
          hideAction
        />
      </div>

      <div className="legal-chrome stage-container pt-10 md:pt-12">
        {isDraft ? (
          <div className="rounded-[10px] border border-ink/30 bg-rag px-5 py-4">
            <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink">{DRAFT_NOTICE}</p>
          </div>
        ) : null}
        <Reveal>
          <dl className="grid gap-6 border-t border-iron/12 pt-7 font-plex-mono text-[12px] uppercase tracking-[0.08em] sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <dt className="text-ink/70">Version</dt>
              <dd className="mt-1.5 text-iron">{doc.version}</dd>
            </div>
            <div>
              <dt className="text-ink/70">Updated</dt>
              <dd className="mt-1.5 text-iron">{doc.updatedAt}</dd>
            </div>
            <div>
              <dt className="text-ink/70">Status</dt>
              <dd className={`mt-1.5 ${status.class}`}>{status.label}</dd>
            </div>
            <div>
              <dt className="text-ink/70">Owner</dt>
              <dd className="mt-1.5 text-iron">
                <Link
                  href="/team/hamza"
                  className="underline decoration-iron/20 underline-offset-4 hover:decoration-iron"
                >
                  {legalOwner.name}
                </Link>
              </dd>
            </div>
          </dl>
        </Reveal>
        <p className="mt-7 flex flex-wrap gap-x-8 gap-y-3 print:hidden">
          <a
            href={`/legal/${doc.slug}/pdf`}
            className="font-plex-sans text-[15px] underline decoration-iron/25 underline-offset-4 hover:decoration-iron"
          >
            PDF
          </a>
          <a
            href={`/legal/${doc.slug}/text`}
            className="font-plex-sans text-[15px] underline decoration-iron/25 underline-offset-4 hover:decoration-iron"
          >
            Plain text
          </a>
          <Link
            href="/legal"
            className="font-plex-sans text-[15px] text-ink underline decoration-iron/20 underline-offset-4 hover:decoration-iron"
          >
            The register
          </Link>
        </p>

        {doc.reviewNote || sectionReviewNotes.length > 0 ? (
          <div className="mt-8 border border-ink/20 bg-rag px-5 py-4">
            <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/80">Open legal review items</p>
            {doc.reviewNote ? (
              <p className="mt-3 font-plex-sans text-[15px] leading-[1.6] text-iron">{doc.reviewNote}</p>
            ) : null}
            {sectionReviewNotes.map((item) => (
              <p key={`${item.section}-${item.note}`} className="mt-2 font-plex-sans text-[15px] leading-[1.6] text-iron">
                Section {item.section}: {item.note}
              </p>
            ))}
          </div>
        ) : null}
      </div>

      <div className="stage-container grid items-start gap-16 py-16 md:grid-cols-[13.5rem_minmax(0,1fr)] md:py-24">
        <LegalIndex items={index} />

        <article className="legal-print min-w-0 max-w-[66ch]">
          <LegalJump items={index} />

          {doc.sections.map((section) => (
            <section
              key={section.number}
              id={`section-${section.number}`}
              className="scroll-mt-28 border-t border-iron/10 py-12 first:border-t-0 first:pt-0"
            >
              <h2 className="font-newsreader text-[26px] leading-[1.2] tracking-[-0.015em] text-iron md:text-[28px]">
                {section.number}. {section.heading}
              </h2>
              <LegalPlain>{section.plainTerms}</LegalPlain>
              <ol className="mt-8">
                {section.clauses.map((clause, i) => {
                  const number = clauseNumber(section.number, i, clause.number);
                  return (
                    <LegalClause key={number} number={number}>
                      {clause.text}
                    </LegalClause>
                  );
                })}
              </ol>
            </section>
          ))}

          {doc.signatureBlocks.length > 0 ? (
            <section
              id="signatures"
              className="scroll-mt-28 border-t border-iron/10 py-12"
            >
              <h2 className="font-plex-mono text-[12px] uppercase tracking-[0.1em] text-ink/70">
                Signatures
              </h2>
              <div className="mt-8 grid gap-12 sm:grid-cols-2">
                {doc.signatureBlocks.map((block) => (
                  <div key={block.party}>
                    <p className="font-plex-sans text-[16px] text-iron">
                      For {block.party} — {block.name}
                    </p>
                    <p className="mt-1 font-plex-sans text-[15px] text-ink">
                      {block.title}
                    </p>
                    <p className="mt-20 border-b border-iron/30 pb-1 font-plex-mono text-[12px] text-ink/60">
                      Signature
                    </p>
                    <p className="mt-10 border-b border-iron/30 pb-1 font-plex-mono text-[12px] text-ink/60">
                      Date
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          <section
            id="changelog"
            className="scroll-mt-28 border-t border-iron/10 py-12"
          >
            <h2 className="font-plex-mono text-[12px] uppercase tracking-[0.1em] text-ink/70">
              What changed
            </h2>
            <Stagger className="mt-6" gap={0.05}>
              {doc.changelog.map((entry) => (
                <Item
                  key={`${entry.version}-${entry.date}`}
                  className="border-t border-iron/8 py-4 first:border-t-0 first:pt-0"
                >
                  <p className="font-plex-mono text-[12px] text-ink/70">
                    {entry.version} · {entry.date}
                  </p>
                  <p className="mt-1 font-plex-sans text-[16px] leading-[1.5] text-iron">
                    {entry.change}
                  </p>
                  <p className="mt-1 font-plex-sans text-[15px] text-ink">
                    {entry.reason}
                  </p>
                </Item>
              ))}
            </Stagger>
          </section>

          <LegalOwnerLine />
        </article>
      </div>
    </section>
  );
}
