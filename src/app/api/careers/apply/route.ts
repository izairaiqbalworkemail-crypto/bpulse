import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { submissions } from "@/lib/db/schema";
import { env } from "@/lib/env";
import { createApplicationData } from "@/lib/careers/repo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid body." }, { status: 400 });
  }

  const roleId = typeof body.roleId === "string" ? body.roleId.trim() : "";
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const link = typeof body.link === "string" ? body.link.trim() : "";
  const detail = typeof body.detail === "string" ? body.detail.trim() : "";

  if (!roleId || !name || !email || !detail) {
    return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "Invalid email." }, { status: 400 });
  }

  const result = await createApplicationData({
    roleId,
    name,
    email,
    source: "careers",
  });
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
  }

  if (env.DATABASE_URL) {
    const requestId = `careers-apply:${result.id}`;
    await getDb()
      .insert(submissions)
      .values({
        type: "careers-application",
        source: "careers",
        email,
        payload: {
          roleId,
          name,
          email,
          link,
          detail,
          statusToken: result.token,
          duplicate: result.duplicate,
        },
        requestId,
      })
      .onConflictDoNothing({ target: submissions.requestId });
  }

  return NextResponse.json({
    ok: true,
    id: result.id,
    statusToken: result.token,
    duplicate: result.duplicate,
  });
}
