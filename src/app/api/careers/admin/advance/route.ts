import { NextResponse } from "next/server";
import { advanceGateData } from "@/lib/careers/repo";
import { recordAuditEvent } from "@/lib/security/audit-log";
import {
  extractClientIp,
  readSessionFromRequest,
  studioNotFound,
} from "@/lib/security/studio-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const ip = extractClientIp(request.headers);
  const session = readSessionFromRequest(request);
  if (!session) {
    try {
      await recordAuditEvent({
        actor: "anonymous",
        action: "careers.admin.advance.denied",
        target: "/api/careers/admin/advance",
        ip,
      });
    } catch {
      return NextResponse.json(
        { ok: false, error: "Audit logging failed. Request blocked until logging is restored." },
        { status: 500 },
      );
    }
    return studioNotFound();
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    try {
      await recordAuditEvent({
        actor: session.email,
        action: "careers.admin.advance.invalid_body",
        target: "/api/careers/admin/advance",
        ip,
      });
    } catch {
      return NextResponse.json(
        { ok: false, error: "Audit logging failed. Request blocked until logging is restored." },
        { status: 500 },
      );
    }
    return NextResponse.json({ ok: false, error: "Invalid body." }, { status: 400 });
  }

  const statusToken = typeof body.statusToken === "string" ? body.statusToken : "";
  const nextGate = typeof body.nextGate === "number" ? body.nextGate : 1;
  const noteInternal =
    typeof body.noteInternal === "string" ? body.noteInternal : "Advanced by reviewer.";

  const result = await advanceGateData(statusToken, nextGate as 0 | 1 | 2 | 3 | 4, noteInternal);
  try {
    await recordAuditEvent({
      actor: session.email,
      action: "careers.admin.advance.write",
      target: statusToken || "/api/careers/admin/advance",
      ip,
      metadata: {
        ok: result.ok,
        nextGate,
      },
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Audit logging failed. Request blocked until logging is restored." },
      { status: 500 },
    );
  }
  if (!result.ok) {
    return NextResponse.json(result, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}
