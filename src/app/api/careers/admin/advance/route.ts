import { NextResponse } from "next/server";
import { advanceGate } from "@/lib/careers/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid body." }, { status: 400 });
  }

  const statusToken = typeof body.statusToken === "string" ? body.statusToken : "";
  const nextGate = typeof body.nextGate === "number" ? body.nextGate : 1;
  const noteInternal =
    typeof body.noteInternal === "string" ? body.noteInternal : "Advanced by reviewer.";

  const result = advanceGate(statusToken, nextGate as 0 | 1 | 2 | 3 | 4, noteInternal);
  if (!result.ok) {
    return NextResponse.json(result, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}
