import { NextResponse } from "next/server";
import { readSessionFromRequest } from "@/lib/security/studio-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const session = readSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ ok: true, authenticated: false });
  }
  return NextResponse.json({
    ok: true,
    authenticated: true,
    email: session.email,
  });
}
