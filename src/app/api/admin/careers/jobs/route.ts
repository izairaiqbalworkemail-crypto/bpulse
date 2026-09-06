import { NextResponse } from "next/server";
import { recordAuditEvent } from "@/lib/security/audit-log";
import {
  extractClientIp,
  readSessionFromRequest,
  studioNotFound,
} from "@/lib/security/studio-auth";
import { upsertRoleData } from "@/lib/careers/repo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const statusValues = new Set(["open", "pipeline", "closed"]);

export async function POST(request: Request) {
  const session = readSessionFromRequest(request);
  const ip = extractClientIp(request.headers);
  if (!session) return studioNotFound();

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid body." }, { status: 400 });
  }

  const id = typeof body.id === "string" ? body.id.trim() : "";
  const title = typeof body.title === "string" ? body.title.trim() : "";
  const pod = typeof body.pod === "string" ? body.pod.trim() : "";
  const status = typeof body.status === "string" ? body.status : "";
  const location = typeof body.location === "string" ? body.location.trim() : "";
  const band = typeof body.band === "string" ? body.band.trim() : "";
  const summary = typeof body.summary === "string" ? body.summary.trim() : "";

  if (!title || !pod || !location || !band || !summary || !statusValues.has(status)) {
    return NextResponse.json({ ok: false, error: "Missing or invalid fields." }, { status: 400 });
  }

  const result = await upsertRoleData({
    id: id || undefined,
    title,
    pod,
    status: status as "open" | "pipeline" | "closed",
    location,
    band,
    summary,
  });

  try {
    await recordAuditEvent({
      actor: session.email,
      action: "admin.careers.job.write",
      target: result.id,
      ip,
      metadata: { title, status },
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Audit logging failed. Request blocked until logging is restored." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, id: result.id });
}
