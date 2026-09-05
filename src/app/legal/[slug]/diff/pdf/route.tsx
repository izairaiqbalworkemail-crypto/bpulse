import { NextResponse } from "next/server";
import { pdf } from "@react-pdf/renderer";
import { getLegalDoc } from "@/content/documents";
import { LegalDiffPdf } from "@/lib/legal/diff-pdf";

export const runtime = "nodejs";

type RouteProps = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, { params }: RouteProps) {
  const { slug } = await params;
  const doc = getLegalDoc(slug);
  if (!doc) {
    return new NextResponse("Not found", { status: 404 });
  }
  const before = doc.versions?.[0];
  if (!before) {
    return new NextResponse(
      "No earlier version on file for this document.",
      { status: 404 }
    );
  }

  const blob = await pdf(
    <LegalDiffPdf
      doc={doc}
      beforeLabel={before.version}
      afterLabel={doc.version}
    />
  ).toBlob();
  return new NextResponse(blob, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="bpulse-${doc.reference.toLowerCase()}-diff-${before.version}-${doc.version}.pdf"`,
    },
  });
}