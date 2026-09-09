import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Episode } from "@/components/episode/Episode";
import { Reveal } from "@/components/landing/Reveal";
import { legalTitle } from "@/components/legal/legal-ui";
import {
  contractSet,
  documentsByFamily,
  LEGAL_PUBLISH_STATUS,
  legalDocuments,
  legalOwner,
} from "@/content/documents";
import {
  LEGAL_FAMILY_LABEL,
  LEGAL_STATUS_META,
} from "@/content/documents/types";
import { pageFrame } from "@/content/platform";
import { DRAFT_NOTICE } from "@/lib/legal/status";

export const metadata: Metadata = buildMetadata({
  title: "Legal & Compliance",
  description: pageFrame.legal,
  path: "/legal",
});

const registerOrder = ["public", "engagement", "candidate", "crew"] as const;

export default function LegalIndexPage() {
  const byFamily = documentsByFamily();

  return (
    <>
      <PageHero
        kicker="Legal & compliance"
        title="The register."
        dek={
          <>
            {pageFrame.legal} Owned by{" "}
            <Link
              href="/team/hamza"
              className="underline decoration-paper/30 underline-offset-4 hover:decoration-paper"
            >
              {legalOwner.name}
            </Link>
            .
          </>
        }
      />

      <Episode tone="paper">
        {LEGAL_PUBLISH_STATUS === "draft" ? (
          <section className="border border-quill/20 bg-paper px-6 py-5">
            <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-quill">{DRAFT_NOTICE}</p>
            <p className="mt-3 max-w-[66ch] font-plex-sans text-[15px] leading-[1.6] text-quill">
              Draft means legal counsel has not signed off yet. Text may change, and no document on this register is in force until review is recorded in LEGAL-REVIEW.md.
            </p>
          </section>
        ) : null}

        {registerOrder.map((family) => {
          const rows = byFamily[family];
          if (rows.length === 0) return null;
          return (
            <section key={family} className="mt-16 first:mt-0">
              <Reveal>
                <h2 className="font-plex-mono text-[12px] uppercase tracking-[0.12em] text-quill/70">
                  {LEGAL_FAMILY_LABEL[family]}
                </h2>
              </Reveal>
              <div className="mt-5 overflow-x-auto">
                <table className="legal-table">
                  <thead>
                    <tr>
                      <th>Document</th>
                      <th>Version</th>
                      <th>Updated</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((doc) => {
                      const status = LEGAL_STATUS_META[doc.status];
                      return (
                        <tr key={doc.slug}>
                          <th className="font-plex-sans text-[16px] font-normal text-ink">
                            <Link
                              href={`/legal/${doc.slug}`}
                              className="underline decoration-ink/20 underline-offset-4 hover:decoration-ink"
                            >
                              {legalTitle(doc.name)}
                            </Link>
                          </th>
                          <td className="font-plex-mono text-[13px] text-quill">
                            {doc.version}
                          </td>
                          <td className="font-plex-mono text-[13px] text-quill">
                            {doc.updatedAt}
                          </td>
                          <td className={`font-plex-mono text-[13px] ${status.class}`}>
                            {status.label}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          );
        })}

        <section className="mt-24 border-t border-ink/12 pt-12">
          <Reveal>
            <h2 className="font-plex-mono text-[12px] uppercase tracking-[0.12em] text-quill/70">
              What we sign with every client
            </h2>
            <p className="mt-5 max-w-[52ch] font-newsreader text-[22px] leading-[1.35] text-ink">
              {contractSet.map((item) => item.name).join(" · ")}
            </p>
            <p className="mt-3 max-w-[48ch] font-plex-sans text-[16px] leading-[1.55] text-quill">
              A DPA and the SCC cover where personal data is involved.
            </p>
            <p className="mt-5">
              <Link
                href="/demo/documents"
                className="font-plex-sans text-[15px] underline decoration-ink/25 underline-offset-4 hover:decoration-ink"
              >
                See them in the sample
              </Link>
            </p>
          </Reveal>
        </section>

        <section className="mt-20 border-t border-ink/12 pt-12">
          <Reveal>
            <h2 className="font-plex-mono text-[12px] uppercase tracking-[0.12em] text-quill/70">
              Transfers
            </h2>
            <p className="mt-5 max-w-[58ch] font-newsreader text-[22px] leading-[1.4] text-ink">
              Where data lives, what leaves Pakistan, and the SCC route for EU
              and UK clients.
            </p>
            <p className="mt-6 font-plex-sans text-[15px] leading-[1.55] text-quill">
              <Link
                href="/legal/data"
                className="underline decoration-ink/25 underline-offset-4 hover:decoration-ink"
              >
                /legal/data
              </Link>
              . {legalDocuments.length} documents on this register.
            </p>
          </Reveal>
        </section>
      </Episode>
    </>
  );
}
