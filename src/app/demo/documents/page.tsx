import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { engagementDocs } from "@/content/documents/engagements";
import { LEGAL_STATUS_META } from "@/content/documents/types";
import { diffSections } from "@/lib/legal/diff";
import { documents, changeOrders, scopeVersions } from "@/content/demo";
import { LetterLedger } from "@/components/letter/LetterLedger";

export const metadata: Metadata = buildMetadata({
  title: "The platform. Documents",
  description:
    "Dated documents with signature status. Sample stubs only; living templates stay on /legal.",
  path: "/demo/documents",
});

const signedMap = new Map(documents.map((doc) => [doc.slug, doc]));

export default function DemoDocumentsPage() {
  const sow = engagementDocs.find((doc) => doc.slug === "statement-of-work");
  const changeOrder = engagementDocs.find((doc) => doc.slug === "change-order");
  const diff = sow?.versions?.[0]
    ? diffSections(sow.versions[0].sections, sow.sections)
    : [];
  const changedSections = diff.filter(
    (section) => section.clauses.some((clause) => clause.state !== "unchanged") || section.plainTermsChanged
  );
  const signedCount = documents.length;

  return (
    <section className="grid-container py-16 md:py-20">
      <h2 className="font-newsreader text-[clamp(1.75rem,3vw,2.5rem)] leading-title text-ink">
        Documents
      </h2>
      <p className="mt-3 max-w-measure font-newsreader text-reading leading-reading text-quill">
        Dated, with signature status. Files are labelled stubs, not live
        contracts.
      </p>
      <p className="mt-3 max-w-measure font-newsreader text-[17px] leading-[1.5] text-quill">
        This is the real set we sign on every Close: NDA, a fixed-scope SOW under
        the MSA, IP assignment, a DPA when personal data moves, and written
        change orders. The sample engagement shows {signedCount} of them signed;
        the living templates live on /legal.
      </p>

      {/* Table */}
      <div className="mt-10 overflow-x-auto">
        <table className="min-w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-ink/25">
              {["Document", "Ref", "Version", "Status", "Date"].map((header) => (
                <th
                  key={header}
                  className="py-2 pr-4 font-plex-mono text-[12px] uppercase tracking-[0.08em] text-quill/60"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {engagementDocs.map((doc) => {
              const signed = signedMap.get(doc.slug);
              const rawStatus = signed ? "signed" : doc.status;
              const status = LEGAL_STATUS_META[rawStatus];
              const date = signed?.dated ?? doc.updatedAt;
              return (
                <tr key={doc.slug} className="border-b border-ink/15 align-top">
                  <td className="py-3.5 pr-4">
                    <p className="font-newsreader text-[19px] leading-[1.2] text-ink">
                      {doc.name.charAt(0) + doc.name.slice(1).toLowerCase()}
                    </p>
                    <div className="mt-1.5 flex flex-wrap gap-2">
                      <Link
                        href={`/legal/${doc.slug}`}
                        className="font-plex-mono text-[12px] text-quill underline decoration-ink/25 underline-offset-4 hover:decoration-ink"
                      >
                        template
                      </Link>
                      <a
                        href={`/legal/${doc.slug}/pdf`}
                        className="font-plex-mono text-[12px] text-quill underline decoration-ink/25 underline-offset-4 hover:decoration-ink"
                      >
                        pdf
                      </a>
                      <a
                        href={`/legal/${doc.slug}/text`}
                        className="font-plex-mono text-[12px] text-quill underline decoration-ink/25 underline-offset-4 hover:decoration-ink"
                      >
                        text
                      </a>
                      {signed && (
                        <a
                          href={signed.href}
                          download
                          className="font-plex-mono text-[12px] text-quill underline decoration-ink/25 underline-offset-4 hover:decoration-ink"
                        >
                          stub
                        </a>
                      )}
                    </div>
                  </td>
                  <td className="py-3.5 pr-4 font-plex-mono text-[13px] text-quill/80">
                    {doc.reference}
                  </td>
                  <td className="py-3.5 pr-4 font-plex-mono text-[13px] text-quill/80">
                    {doc.version}
                  </td>
                  <td className="py-3.5 pr-4 font-plex-mono text-[13px] text-quill/80">
                    <span className={status.class}>{status.dot}</span>{" "}
                    <span className="ml-1">{status.label}</span>
                    <span className="ml-2 text-quill/50">sample</span>
                  </td>
                  <td className="py-3.5 font-plex-mono text-[13px] text-quill/80">
                    {date}
                    {signed ? (
                      <span className="ml-2 text-quill/50">signed</span>
                    ) : (
                      <span className="ml-2 text-quill/50">updated</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Scope diff */}
      <div className="mt-16 flex flex-wrap items-end justify-between gap-3">
        <h3 className="font-plex-mono text-[13px] uppercase tracking-[0.14em] text-quill/60">
          Scope diff · v2.0 → v2.1
        </h3>
        <a
          href="/legal/statement-of-work/diff/pdf"
          download
          className="rounded-[var(--radius-button)] border border-ink/25 px-4 py-2 font-plex-sans text-[13px] font-medium text-ink transition-colors hover:border-ink"
        >
          Download diff PDF
        </a>
      </div>
      <p className="mt-3 max-w-measure font-newsreader text-reading text-quill">
        Rendered from the SOW versions, not a hand copy. Only changed sections
        are shown.
      </p>

      <div className="mt-6 flex flex-col gap-5">
        {changedSections.length === 0 && (
          <p className="font-newsreader text-[17px] text-quill">
            No section changed between these versions.
          </p>
        )}
        {changedSections.map((section) => (
          <div key={section.number} className="letter-object">
            <p className="font-plex-mono text-[13px] uppercase tracking-[0.08em] text-quill/60">
              Section {section.number} · {section.heading}
              {section.plainTermsChanged && (
                <span className="ml-2 text-diag">plain terms changed</span>
              )}
            </p>
            <ul className="mt-3 flex flex-col gap-2">
              {section.clauses.map((clause) => (
                <li
                  key={clause.key}
                  className={
                    clause.state === "added"
                      ? "border-l-[3px] border-ink px-3 py-2"
                      : clause.state === "removed"
                        ? "border-l-[3px] border-ink/25 px-3 py-2 text-quill/60"
                        : "px-3 py-1"
                  }
                >
                  <span className="mr-3 font-plex-mono text-[12px] text-quill/60">
                    {clause.number}
                  </span>
                  <span className="font-newsreader text-[16px] leading-[1.45] text-ink">
                    {clause.state === "added" && "＋ "}
                    {clause.state === "removed" && "− "}
                    {clause.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Change order card */}
      {changeOrder && (
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-ink/25 pt-6">
          <div>
            <p className="font-plex-mono text-[13px] text-quill/60">{changeOrder.reference}</p>
            <p className="mt-1 font-newsreader text-[20px] leading-[1.3] text-ink">
              {changeOrder.name.charAt(0) + changeOrder.name.slice(1).toLowerCase()}.{" "}
              {changeOrder.sections[1]?.clauses[0]?.text.replace("Price: ", "")}
            </p>
            <p className="mt-1 font-newsreader text-[16px] text-quill">
              {changeOrder.sections[2]?.plainTerms}
            </p>
          </div>
          <Link
            href="/legal/change-order"
            className="rounded-[var(--radius-button)] border border-ink/25 px-5 py-2.5 font-plex-sans text-[14px] font-medium text-ink transition-colors hover:border-ink"
          >
            View change order
          </Link>
        </div>
      )}

      {/* Version history */}
      <h3 className="mt-16 font-plex-mono text-[13px] uppercase tracking-[0.14em] text-quill/60">
        Versions
      </h3>
      <div className="mt-4">
        <LetterLedger
          lines={[
            ...scopeVersions.map((version) => ({
              id: `v-${version.version}`,
              kicker: `v${version.version}`,
              title: version.dated,
              body: version.summary,
            })),
            ...changeOrders.map((order) => ({
              id: order.id,
              kicker: order.id,
              title: `${order.price} · signed ${order.signed}`,
              body: order.request,
            })),
          ]}
        />
      </div>
    </section>
  );
}