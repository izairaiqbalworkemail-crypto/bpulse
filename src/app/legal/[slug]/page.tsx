import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { LegalDocumentView } from "@/components/legal/LegalDocumentView";
import { getLegalDoc, legalDocuments, legalOwner } from "@/content/documents";

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
  for (const { slug, aliases } of legalDocuments) {
    slugs.add(slug);
    for (const alias of aliases ?? []) slugs.add(alias);
  }
  return [...slugs].map((slug) => ({ slug }));
}

export default async function LegalDocPage({ params }: PageProps) {
  const { slug } = await params;
  const doc = getLegalDoc(slug);
  if (!doc) notFound();
  return <LegalDocumentView doc={doc} />;
}
