import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/landing/Reveal";
import { LegalIndex } from "@/components/legal/LegalIndex";
import {
  LegalClause,
  LegalJump,
  LegalOwnerLine,
  LegalPlain,
} from "@/components/legal/legal-ui";
import { transferPage } from "@/content/legal/data";
import { legalOwner } from "@/content/documents";
import { pageFrame } from "@/content/platform";

export const metadata: Metadata = buildMetadata({
  title: "Where data goes",
  description: pageFrame.legalData,
  path: "/legal/data",
});

const index = [
  { id: "pakistan", href: "#pakistan", label: transferPage.pakistan.heading },
  { id: "architecture", href: "#architecture", label: transferPage.architecture.heading },
  { id: "scc", href: "#scc", label: transferPage.scc.heading },
  { id: "uk", href: "#uk", label: transferPage.uk.heading },
  { id: "tia", href: "#tia", label: transferPage.tia.heading },
  { id: "measures", href: "#measures", label: transferPage.measures.heading },
  { id: "access", href: "#access", label: transferPage.access.heading },
  { id: "vendors", href: "#vendors", label: "Where data lives" },
] as const;

function Block({
  id,
  heading,
  plain,
  clauses,
}: Readonly<{
  id: string;
  heading: string;
  plain: string;
  clauses: readonly string[];
}>) {
  return (
    <section
      id={id}
      className="scroll-mt-28 border-t border-iron/10 py-12 first:border-t-0 first:pt-0"
    >
      <h2 className="font-newsreader text-[26px] leading-[1.2] tracking-[-0.015em] text-iron md:text-[28px]">
        {heading}
      </h2>
      <LegalPlain>{plain}</LegalPlain>
      <ol className="mt-8">
        {clauses.map((line, i) => (
          <LegalClause key={line} number={String(i + 1).padStart(2, "0")}>
            {line}
          </LegalClause>
        ))}
      </ol>
    </section>
  );
}

export default function LegalDataPage() {
  return (
    <section className="w-full bg-rag text-iron">
      <PageHero
        kicker="Legal · transfers"
        title={transferPage.title}
        dek={
          <>
            {transferPage.dek} Owned by{" "}
            <Link
              href="/team/hamza"
              className="underline decoration-rag/30 underline-offset-4 hover:decoration-rag"
            >
              {legalOwner.name}
            </Link>
            .
          </>
        }
        hideAction
      />

      <div className="stage-container grid items-start gap-16 py-16 md:grid-cols-[13.5rem_minmax(0,1fr)] md:py-24">
        <LegalIndex items={index} />

        <article className="min-w-0 max-w-[66ch]">
          <LegalJump items={[...index]} />

          <Block
            id="pakistan"
            heading={transferPage.pakistan.heading}
            plain={transferPage.pakistan.plain}
            clauses={transferPage.pakistan.clauses}
          />
          <Block
            id="architecture"
            heading={transferPage.architecture.heading}
            plain={transferPage.architecture.plain}
            clauses={transferPage.architecture.clauses}
          />
          <Block
            id="scc"
            heading={transferPage.scc.heading}
            plain={transferPage.scc.plain}
            clauses={transferPage.scc.clauses}
          />
          <Block
            id="uk"
            heading={transferPage.uk.heading}
            plain={transferPage.uk.plain}
            clauses={transferPage.uk.clauses}
          />
          <Block
            id="tia"
            heading={transferPage.tia.heading}
            plain={transferPage.tia.plain}
            clauses={transferPage.tia.clauses}
          />

          <section
            id="measures"
            className="scroll-mt-28 border-t border-iron/10 py-12"
          >
            <h2 className="font-newsreader text-[26px] leading-[1.2] tracking-[-0.015em] text-iron md:text-[28px]">
              {transferPage.measures.heading}
            </h2>
            <LegalPlain>{transferPage.measures.plain}</LegalPlain>
            {(
              [
                ["In place", transferPage.measures.inPlace],
                ["Not claimed", transferPage.measures.notClaimed],
                ["Intended", transferPage.measures.intended],
              ] as const
            ).map(([label, lines]) => (
              <div key={label} className="mt-10">
                <p className="font-plex-mono text-[11px] uppercase tracking-[0.1em] text-ink/70">
                  {label}
                </p>
                <ul className="mt-3">
                  {lines.map((line) => (
                    <li
                      key={line}
                      className="border-t border-iron/8 py-3.5 font-plex-sans text-[17px] leading-[1.65] text-iron first:border-t-0 first:pt-0"
                    >
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <Block
            id="access"
            heading={transferPage.access.heading}
            plain={transferPage.access.plain}
            clauses={transferPage.access.clauses}
          />

          <section
            id="vendors"
            className="scroll-mt-28 border-t border-iron/10 py-12"
          >
            <h2 className="font-newsreader text-[26px] leading-[1.2] tracking-[-0.015em] text-iron md:text-[28px]">
              Where data lives
            </h2>
            <Reveal>
              <div className="mt-8 overflow-x-auto">
                <table className="legal-table min-w-[32rem]">
                  <thead>
                    <tr>
                      <th>Vendor</th>
                      <th>Role</th>
                      <th>Region</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transferPage.vendors.map((row) => (
                      <tr key={row.name}>
                        <th className="font-plex-sans text-[16px] font-normal text-iron">
                          {row.name}
                        </th>
                        <td className="font-plex-sans text-[15px] leading-[1.45] text-ink">
                          {row.role}
                        </td>
                        <td className="font-plex-sans text-[15px] leading-[1.45] text-ink">
                          {row.region}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
            <p className="mt-6 font-plex-sans text-[15px] leading-[1.55] text-ink">
              Full list:{" "}
              <Link
                href="/legal/sub-processors"
                className="underline decoration-iron/25 underline-offset-4 hover:decoration-iron"
              >
                /legal/sub-processors
              </Link>
              . SCC cover:{" "}
              <Link
                href="/legal/standard-contractual-clauses"
                className="underline decoration-iron/25 underline-offset-4 hover:decoration-iron"
              >
                /legal/standard-contractual-clauses
              </Link>
              .
            </p>
          </section>

          <LegalOwnerLine />
        </article>
      </div>
    </section>
  );
}
