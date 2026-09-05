import { NextResponse } from "next/server";
import { pdf } from "@react-pdf/renderer";
import { getLegalDoc } from "@/content/documents";
import { LegalPdf } from "@/lib/legal/pdf";

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

  const blob = await pdf(<LegalPdf doc={doc} />).toBlob();
  return new NextResponse(blob, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="bpulse-${doc.reference.toLowerCase()}-${doc.version}.pdf"`,
    },
  });
}