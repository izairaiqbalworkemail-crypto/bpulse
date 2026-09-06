import { NextResponse } from "next/server";
import { recordAuditEvent } from "@/lib/security/audit-log";
import {
  extractClientIp,
  readSessionFromRequest,
  studioNotFound,
} from "@/lib/security/studio-auth";
import {
  submissionOutcomes,
  updateSubmissionOutcome,
  type SubmissionOutcome,
} from "@/lib/admin/submissions";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const outcomeSet = new Set<SubmissionOutcome>(submissionOutcomes);

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
  const outcome =
    typeof body.outcome === "string" && outcomeSet.has(body.outcome as SubmissionOutcome)
      ? (body.outcome as SubmissionOutcome)
      : null;
  const valueUsd = typeof body.valueUsd === "string" ? body.valueUsd : null;

  if (!id || !outcome) {
    return NextResponse.json({ ok: false, error: "Missing id or outcome." }, { status: 400 });
  }

  const ok = await updateSubmissionOutcome({ id, outcome, valueUsd });
  try {
    await recordAuditEvent({
      actor: session.email,
      action: "admin.submission.outcome.write",
      target: id,
      ip,
      metadata: { outcome, ok },
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
