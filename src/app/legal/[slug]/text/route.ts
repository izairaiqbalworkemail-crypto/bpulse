import { NextResponse } from "next/server";
import { getLegalDoc } from "@/content/documents";
import { renderPlainText } from "@/lib/legal/plain";

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

  return new NextResponse(renderPlainText(doc), {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": `inline; filename="bpulse-${doc.reference.toLowerCase()}-${doc.version}.txt"`,
    },
  });
}