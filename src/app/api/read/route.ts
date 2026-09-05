import { NextResponse } from "next/server";
import { env, hasDeliveryChannel } from "@/lib/env";
import { generateRead } from "@/lib/read/generate";
import { saveRead } from "@/lib/read/store";
import { sendReadEmails } from "@/lib/email";
import { saveLocalSubmission } from "@/lib/intake/local-store";
import { submissions } from "@/lib/db/schema";
import { getDb } from "@/lib/db";
import { isRateLimited } from "@/lib/rate-limit";
import { brand } from "@/config/brand";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAILTO_FALLBACK = `mailto:${env.FOUNDER_EMAIL}`;
const isProduction = process.env.NODE_ENV === "production";

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

  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true, token: crypto.randomUUID() });
  }

  if (isProduction && !hasDeliveryChannel) {
    return fail("Delivery is not configured. The read was not filed.", 503);
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";
  if (await isRateLimited(ip)) {
    return fail("too many requests, try again shortly", 429);
  }

  const answers =
    body.answers && typeof body.answers === "object"
      ? (body.answers as Record<string, string>)
      : {};
  const email = answers.email?.trim();
  const name = answers.name?.trim();
  const shipWound = answers.shipWound?.trim();
  if (!email || !name || !shipWound) {
    return fail("The read needs the stuck part, a name, and an email.", 400);
  }

  const token = crypto.randomUUID();
  const requestId =
    typeof body.requestId === "string" && body.requestId
      ? body.requestId
      : token;
  const read = generateRead(answers, token);
  const readUrl = `${brand.url}/read/${token}`;

  try {
    await saveRead(read);
  } catch {
    return fail("The read did not save.", 500);
  }

  if (env.DATABASE_URL) {
    try {
      await getDb()
        .insert(submissions)
        .values({
          type: "check-intake",
          source: "check-intake",
          payload: { ...answers, readToken: token },
          email,
          requestId,
        })
        .onConflictDoNothing({ target: submissions.requestId });
    } catch {
      await saveLocalSubmission({
        id: requestId,
        type: "check-intake",
        source: "check-intake",
        email,
        payload: { ...answers, readToken: token },
        requestId,
      });
    }
  } else {
    await saveLocalSubmission({
      id: requestId,
      type: "check-intake",
      source: "check-intake",
      email,
      payload: { ...answers, readToken: token },
      requestId,
    });
  }

  if (isProduction) {
    try {
      await sendReadEmails({
        visitorEmail: email,
        requestId,
        readUrl,
        title: read.title,
        payload: { ...answers, readUrl },
      });
    } catch (error) {
      return fail(
        error instanceof Error ? error.message : "Email did not send.",
        503,
      );
    }
  } else if (env.RESEND_API_KEY) {
    try {
      await sendReadEmails({
        visitorEmail: email,
        requestId,
        readUrl,
        title: read.title,
        payload: { ...answers, readUrl },
      });
    } catch (error) {
      console.error("[read] email failed; the read is still filed", error);
    }
  }

  return NextResponse.json({ ok: true, token, url: `/read/${token}` });
}
