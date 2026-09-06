import { NextResponse } from "next/server";
import { scoreDiagnosticData } from "@/lib/careers/repo";
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
        action: "careers.admin.score.denied",
        target: "/api/careers/admin/score",
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
        action: "careers.admin.score.invalid_body",
        target: "/api/careers/admin/score",
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

  const result = await scoreDiagnosticData(token, scores, reviewerId, note);
  try {
    await recordAuditEvent({
      actor: session.email,
      action: "careers.admin.score.write",
      target: token || "/api/careers/admin/score",
      ip,
      metadata: {
        ok: result.ok,
        reviewerId,
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
