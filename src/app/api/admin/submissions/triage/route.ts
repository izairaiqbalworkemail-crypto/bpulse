import { NextResponse } from "next/server";
import { markSubmissionTriaged } from "@/lib/admin/submissions";
import { recordAuditEvent } from "@/lib/security/audit-log";
import {
  extractClientIp,
  readSessionFromRequest,
  studioNotFound,
} from "@/lib/security/studio-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const session = readSessionFromRequest(request);
  const ip = extractClientIp(request.headers);
  if (!session) {
    return studioNotFound();
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid body." }, { status: 400 });
  }

  const id = typeof body.id === "string" ? body.id : "";
  if (!id) {
    return NextResponse.json({ ok: false, error: "Missing id." }, { status: 400 });
  }

  const ok = await markSubmissionTriaged(id);
  try {
    await recordAuditEvent({
      actor: session.email,
      action: "admin.submission.triage.write",
      target: id,
      ip,
      metadata: { ok },
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Audit logging failed. Request blocked until logging is restored." },
      { status: 500 },
    );
  }

  if (!ok) {
    return NextResponse.json({ ok: false, error: "Submission not found." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
