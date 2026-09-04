import { NextResponse } from "next/server";

import { env } from "@/lib/env";
import { getDb } from "@/lib/db";
import { submissions } from "@/lib/db/schema";
import { sendSubmissionEmail } from "@/lib/email";
import { isRateLimited } from "@/lib/rate-limit";
import { cacheSubmission, getCachedSubmission } from "@/lib/idempotency";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAILTO_FALLBACK = `mailto:${env.FOUNDER_EMAIL}`;

function fail(error: string, status: number) {
  return NextResponse.json({ ok: false, error, mailto: MAILTO_FALLBACK }, { status });
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return fail("invalid body", 400);
  }

  // Honeypot: a real visitor never fills a field named "website" here — it's
  // visually hidden and unlabeled in every intake form. A filled value means
  // a bot posted directly to the endpoint.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true, id: crypto.randomUUID() });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";
  if (isRateLimited(ip)) {
    return fail("too many requests, try again shortly", 429);
  }

  const requestId =
    typeof body.requestId === "string" && body.requestId
      ? body.requestId
      : typeof body.clientId === "string" && body.clientId
        ? body.clientId
        : crypto.randomUUID();

  const cached = getCachedSubmission(requestId);
  if (cached) {
    return NextResponse.json({ ok: true, id: cached });
  }

  const type = typeof body.type === "string" ? body.type : "unknown";
  const email = typeof body.email === "string" ? body.email : undefined;
  const budget = typeof body.budget === "string" ? body.budget : undefined;
  const timeline = typeof body.timeline === "string" ? body.timeline : undefined;
  const state = typeof body.state === "string" ? body.state : undefined;
  const { website: _website, ...payload } = body;
  void _website;

  if (!env.DATABASE_URL || !env.RESEND_API_KEY) {
    console.warn("[intake, no delivery channel configured]", { type, payload });
    return fail("delivery is not configured in this environment", 500);
  }

  let submissionId: string;
  try {
    const db = getDb();
    const [row] = await db
      .insert(submissions)
      .values({
        type,
        source: typeof body.source === "string" ? body.source : null,
        payload,
        email: email ?? null,
        budget: budget ?? null,
        timeline: timeline ?? null,
        state: state ?? null,
        requestId,
      })
      .onConflictDoNothing({ target: submissions.requestId })
      .returning({ id: submissions.id });

    if (row) {
      submissionId = row.id;
    } else {
      const existing = await getDb().query.submissions.findFirst({
        where: (s, { eq }) => eq(s.requestId, requestId),
      });
      if (!existing) throw new Error("conflict with no existing row");
      submissionId = existing.id;
      cacheSubmission(requestId, submissionId);
      return NextResponse.json({ ok: true, id: submissionId });
    }
  } catch (err) {
    console.error("[intake] database write failed", err);
    return fail("could not save your submission", 500);
  }

  try {
    await sendSubmissionEmail({ type, payload, email, requestId });
  } catch (err) {
    console.error("[intake] email send failed", err);
    return fail("saved, but the notification email failed to send", 500);
  }

  cacheSubmission(requestId, submissionId);
  return NextResponse.json({ ok: true, id: submissionId });
}
