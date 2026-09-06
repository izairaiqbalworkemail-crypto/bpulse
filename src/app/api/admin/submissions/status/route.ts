import { NextResponse } from "next/server";
import { recordAuditEvent } from "@/lib/security/audit-log";
import {
  extractClientIp,
  readSessionFromRequest,
  studioNotFound,
} from "@/lib/security/studio-auth";
import {
  submissionStatuses,
  updateSubmissionStatus,
  type SubmissionStatus,
} from "@/lib/admin/submissions";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const statusSet = new Set<SubmissionStatus>(submissionStatuses);

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
  const status =
    typeof body.status === "string" && statusSet.has(body.status as SubmissionStatus)
      ? (body.status as SubmissionStatus)
      : null;

  if (!id || !status) {
    return NextResponse.json({ ok: false, error: "Missing id or status." }, { status: 400 });
  }

  const ok = await updateSubmissionStatus({ id, status });
  try {
    await recordAuditEvent({
      actor: session.email,
      action: "admin.submission.status.write",
      target: id,
      ip,
      metadata: { status, ok },
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
