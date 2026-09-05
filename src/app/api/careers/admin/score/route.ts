import { NextResponse } from "next/server";
import { scoreDiagnostic } from "@/lib/careers/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid body." }, { status: 400 });
  }

  const token = typeof body.token === "string" ? body.token : "";
  const reviewerId = typeof body.reviewerId === "string" ? body.reviewerId : "reviewer";
  const note = typeof body.note === "string" ? body.note : "";
  const scores = body.scores as {
    specificity: number;
    prioritisation: number;
    evidence: number;
    limits: number;
    estimation: number;
    writing: number;
  };

  const result = scoreDiagnostic(token, scores, reviewerId, note);
  if (!result.ok) {
    return NextResponse.json(result, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}
