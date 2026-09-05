import { NextResponse } from "next/server";

import { env, hasDeliveryChannel } from "@/lib/env";
import { getDb } from "@/lib/db";
import { submissions } from "@/lib/db/schema";
import { sendSubmissionEmail } from "@/lib/email";
import { saveLocalSubmission } from "@/lib/intake/local-store";
import { isRateLimited } from "@/lib/rate-limit";
import { cacheSubmission, getCachedSubmission } from "@/lib/idempotency";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAILTO_FALLBACK = `mailto:${env.FOUNDER_EMAIL}`;

function fail(error: string, status: number) {
  return NextResponse.json({ ok: false, error, mailto: MAILTO_FALLBACK }, { status });
}

/**
 * Intake always saves. Email is optional until Resend is on.
 * Local dev without Neon writes `.data/submissions.jsonl`.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return fail("invalid body", 400);
  }

  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true, id: crypto.randomUUID(), stored: "honeypot", emailed: false });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";
  if (await isRateLimited(ip)) {
    return fail("too many requests, try again shortly", 429);
  }

  const requestId =
    typeof body.requestId === "string" && body.requestId
      ? body.requestId
      : typeof body.clientId === "string" && body.clientId
        ? body.clientId
        : crypto.randomUUID();

  const cached = await getCachedSubmission(requestId);
  if (cached) {
    return NextResponse.json({ ok: true, id: cached, stored: "cache", emailed: false });
  }

  const type = typeof body.type === "string" ? body.type : "unknown";
  if (
    process.env.NODE_ENV === "production" &&
    type === "second-chair" &&
    !hasDeliveryChannel
  ) {
    return fail("Delivery is not configured. The note was not filed.", 503);
  }
  const email = typeof body.email === "string" ? body.email : undefined;
  const budget = typeof body.budget === "string" ? body.budget : undefined;
  const timeline = typeof body.timeline === "string" ? body.timeline : undefined;
  const state = typeof body.state === "string" ? body.state : undefined;
  const { website: _website, ...payload } = body;
  void _website;

  let submissionId = requestId;
  let stored: "database" | "local" = "local";

  if (env.DATABASE_URL) {
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
        stored = "database";
      } else {
        const existing = await getDb().query.submissions.findFirst({
          where: (s, { eq }) => eq(s.requestId, requestId),
        });
        if (existing) {
          submissionId = existing.id;
          stored = "database";
          await cacheSubmission(requestId, submissionId);
          return NextResponse.json({
            ok: true,
            id: submissionId,
            stored,
            emailed: false,
          });
        }
        submissionId = await saveLocalSubmission({
          id: requestId,
          type,
          source: typeof body.source === "string" ? body.source : null,
          email: email ?? null,
          payload,
          requestId,
        });
      }
    } catch (err) {
      console.error("[intake] database write failed, saving locally", err);
      submissionId = await saveLocalSubmission({
        id: requestId,
        type,
        source: typeof body.source === "string" ? body.source : null,
        email: email ?? null,
        payload,
        requestId,
      });
      stored = "local";
    }
  } else {
    submissionId = await saveLocalSubmission({
      id: requestId,
      type,
      source: typeof body.source === "string" ? body.source : null,
      email: email ?? null,
      payload,
      requestId,
    });
    stored = "local";
  }

  let emailed = false;
  if (env.RESEND_API_KEY) {
    try {
      await sendSubmissionEmail({ type, payload, email, requestId });
      emailed = true;
    } catch (err) {
      console.error("[intake] email send failed — brief is still saved", err);
    }
  } else {
    console.info("[intake] saved without Resend", { id: submissionId, type, stored });
  }

  await cacheSubmission(requestId, submissionId);
  return NextResponse.json({ ok: true, id: submissionId, stored, emailed });
}
