import { NextResponse } from "next/server";
import {
  extractClientIp,
  readSessionFromRequest,
  studioNotFound,
} from "@/lib/security/studio-auth";
import { recordAuditEvent } from "@/lib/security/audit-log";
import {
  getReplyTarget,
  markSubmissionReplied,
} from "@/lib/admin/submissions";
import { sendAdminReplyEmail } from "@/lib/email";

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

  const submissionId = typeof body.submissionId === "string" ? body.submissionId : null;
  const to = typeof body.to === "string" ? body.to.trim().toLowerCase() : "";
  const subject = typeof body.subject === "string" ? body.subject.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!to || !subject || !message) {
    return NextResponse.json(
      { ok: false, error: "to, subject, and message are required." },
      { status: 400 },
    );
  }

  if (message.length < 10) {
    return NextResponse.json({ ok: false, error: "Message is too short." }, { status: 400 });
  }

  if (submissionId) {
    const target = await getReplyTarget(submissionId);
    if (!target) {
      return NextResponse.json({ ok: false, error: "Submission not found." }, { status: 404 });
    }
    if (!target.email) {
      return NextResponse.json({ ok: false, error: "Submission has no email." }, { status: 400 });
    }
    if (target.email.toLowerCase() !== to) {
      return NextResponse.json(
        { ok: false, error: "Email does not match submission." },
        { status: 400 },
      );
    }
  }

  try {
    await sendAdminReplyEmail({
      to,
      subject,
      body: message,
      fromActor: session.email,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Reply send failed.",
      },
      { status: 500 },
    );
  }

  if (submissionId) {
    await markSubmissionReplied(submissionId);
  }

  try {
    await recordAuditEvent({
      actor: session.email,
      action: "admin.reply.send",
      target: submissionId ?? to,
      ip,
      metadata: {
        to,
        subject,
        submissionId,
      },
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Audit logging failed. Request blocked until logging is restored." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
