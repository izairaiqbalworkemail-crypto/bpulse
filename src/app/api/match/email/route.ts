import { NextResponse } from "next/server";
import { env, hasDeliveryChannel } from "@/lib/env";
import { isRateLimited } from "@/lib/rate-limit";
import { getMatch } from "@/lib/match/store";
import { sendMatchEmails } from "@/lib/email";
import { saveLocalSubmission } from "@/lib/intake/local-store";
import { submissions } from "@/lib/db/schema";
import { getDb } from "@/lib/db";
import { brand } from "@/config/brand";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAILTO_FALLBACK = `mailto:${env.FOUNDER_EMAIL}`;
const isProduction = process.env.NODE_ENV === "production";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  if (isProduction && !hasDeliveryChannel) {
    return fail("Email is not configured. The read was not sent.", 503);
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";
  if (await isRateLimited(ip)) {
    return fail("too many requests, try again shortly", 429);
  }

  const token = typeof body.token === "string" ? body.token : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";

  if (!token || !EMAIL_RE.test(email)) {
    return fail("A token and a real email are needed.", 400);
  }

  const event = await getMatch(token);
  if (!event) {
    return fail("That match is not on file.", 404);
  }

  const matchUrl = `${brand.url}/match/${token}`;
  const requestId =
    typeof body.requestId === "string" && body.requestId
      ? body.requestId
      : crypto.randomUUID();

  if (env.DATABASE_URL) {
    try {
      await getDb()
        .insert(submissions)
        .values({
          type: "match-email",
          source: "match-read",
          payload: { token, brief: event.description },
          email,
          requestId,
        })
        .onConflictDoNothing({ target: submissions.requestId });
    } catch {
      await saveLocalSubmission({
        id: requestId,
        type: "match-email",
        source: "match-read",
        email,
        payload: { token, brief: event.description },
        requestId,
      });
    }
  } else {
    await saveLocalSubmission({
      id: requestId,
      type: "match-email",
      source: "match-read",
      email,
      payload: { token, brief: event.description },
      requestId,
    });
  }

  if (isProduction || env.RESEND_API_KEY) {
    try {
      await sendMatchEmails({
        visitorEmail: email,
        token,
        matchUrl,
        brief: event.description,
        requestId,
      });
    } catch (error) {
      return fail(
        error instanceof Error ? error.message : "Email did not send.",
        503,
      );
    }
  }

  return NextResponse.json({ ok: true, url: `/match/${token}` });
}