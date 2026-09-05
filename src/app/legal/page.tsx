import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo";
import { contractSet, legalDocs, legalDraftMeaning, legalOwner } from "@/content/legal";

export const metadata: Metadata = buildMetadata({
  title: "Legal & Compliance",
  description:
    "Document register, ownership, and draft status for bpulse legal and compliance surfaces.",
  path: "/legal",
});

function statusLabel(status: "draft" | "in-force") {
  return status === "draft" ? "Draft" : "In force";
}

export default function LegalIndexPage() {
  return (
    <section className="w-full bg-rag pb-24 md:pb-32">
      <div className="grid-container pt-12 md:pt-16">
        <header className="border border-iron/20 bg-rag-card p-6 shadow-[var(--shadow-card)]">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h1 className="font-newsreader text-[34px] leading-none tracking-[-0.02em] text-iron md:text-[48px]">
              Legal & Compliance
            </h1>
            <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">
              Owned by {legalOwner.name}
            </p>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-iron/20">
                  <th className="py-2 pr-3 font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/65">Document</th>
                  <th className="py-2 pr-3 font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/65">Version</th>
                  <th className="py-2 pr-3 font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/65">Updated</th>
                  <th className="py-2 font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/65">Status</th>
                </tr>
              </thead>
              <tbody>
                {legalDocs.map((doc) => (
                  <tr key={doc.slug} className="border-b border-iron/10">
                    <td className="py-3 pr-3 font-newsreader text-[19px] text-iron">
                      <Link href={`/legal/${doc.slug}`} className="underline decoration-iron/20 underline-offset-4 hover:decoration-iron">
                        {doc.title}
                      </Link>
                    </td>
                    <td className="py-3 pr-3 font-plex-mono text-[13px] text-ink/80">{doc.version}</td>
                    <td className="py-3 pr-3 font-plex-mono text-[13px] text-ink/80">{doc.updatedAt}</td>
                    <td className="py-3 font-plex-mono text-[13px] text-ink/80">● {statusLabel(doc.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </header>

        <div className="mt-12 grid gap-10 md:grid-cols-2">
          <section>
            <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">Who owns this</p>
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
                    Part of the bpulse crew - profile: {" "}
                    <Link href="/team/hamza" className="underline decoration-iron/30 underline-offset-4 hover:decoration-iron">
                      /team/hamza
                    </Link>
                  </p>
                  <p className="mt-2 font-plex-sans text-[15px] text-ink">
                    <a href={`mailto:${legalOwner.email}`} className="underline decoration-iron/30 underline-offset-4 hover:decoration-iron">
                      {legalOwner.email}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="border-l-4 border-signal bg-signal/10 p-4">
            <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">What draft means</p>
            <p className="mt-3 max-w-[45ch] font-newsreader text-[18px] leading-[1.5] text-iron">
              {legalDraftMeaning}
            </p>
          </section>
        </div>

        <section className="mt-14 border-t border-iron/20 pt-8">
          <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">What we sign with every client</p>
          <ul className="mt-4 space-y-4">
            {contractSet.map((item) => (
              <li key={item.name}>
                <p className="font-newsreader text-[20px] text-iron">{item.name}</p>
                <p className="font-newsreader text-[16px] leading-[1.5] text-ink">{item.line}</p>
              </li>
            ))}
          </ul>
          <p className="mt-5 font-plex-sans text-[14px] text-ink">
            See document shape in the sample portal: <Link href="/demo/documents" className="underline underline-offset-4">/demo/documents</Link>
          </p>
        </section>

        <section className="mt-10 border-t border-iron/20 pt-8">
          <p className="font-newsreader text-[18px] leading-[1.5] text-ink">
            Vulnerability disclosure: security@bpulse.dev · Data protection contact: contact@bpulse.dev
          </p>
        </section>
      </div>
    </section>
  );
}
