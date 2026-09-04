import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { documents } from "@/content/demo";

export const metadata: Metadata = buildMetadata({
  title: "Sample portal — documents",
  description: "Dated documents with signature status. Sample stubs only.",
  path: "/demo/documents",
});

export default function DemoDocumentsPage() {
  return (
    <section className="grid-container py-16 md:py-20">
      <h2 className="font-newsreader text-[clamp(1.75rem,3vw,2.5rem)] leading-title text-iron">
        Documents
      </h2>
      <p className="mt-3 max-w-measure font-newsreader text-reading leading-reading text-ink">
        Dated, with signature status. Files are labelled stubs — not live
        contracts.
      </p>
      <ul className="mt-10 flex flex-col gap-8">
        {documents.map((doc) => (
          <li key={doc.name} className="border-t border-iron/15 pt-5">
            <p className="font-plex-mono text-[13px] uppercase tracking-[0.08em] text-ink/60">
              {doc.status} · {doc.dated} · sample
            </p>
            <p className="mt-2 font-newsreader text-lot-title text-iron">
              {doc.name}
            </p>
            <a
              href={doc.href}
              className="mt-3 inline-block font-plex-sans text-sm text-ink underline-offset-4 hover:underline"
              download
            >
              Download stub
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
