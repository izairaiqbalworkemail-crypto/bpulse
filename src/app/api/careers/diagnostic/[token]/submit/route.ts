import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { submissions } from "@/lib/db/schema";
import { env } from "@/lib/env";
import { saveLocalSubmission } from "@/lib/intake/local-store";
import type { DiagnosticPayloadInput } from "@/lib/careers/store";
import {
  getDiagnosticByTokenData,
  submitDiagnosticData,
} from "@/lib/careers/repo";
import { sql } from "drizzle-orm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ token: string }>;
};

export async function POST(request: Request, { params }: Props) {
  const { token } = await params;
  if (!/^[A-Za-z0-9]{16}$/.test(token)) {
    return NextResponse.json({ ok: false, error: "Invalid token." }, { status: 400 });
  }
  const diagnostic = await getDiagnosticByTokenData(token);
  if (!diagnostic) {
    return NextResponse.json({ ok: false, error: "Token not found." }, { status: 404 });
  }
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid payload." }, { status: 400 });
  }

  const submitted = await submitDiagnosticData(token, payload as DiagnosticPayloadInput);
  if (!submitted.ok) {
    return NextResponse.json(submitted, { status: 400 });
  }

  const requestId = `careers-diagnostic-submit:${token}`;
  const rowPayload = {
    token,
    kind: "submit",
    submission: payload,
  };

  if (env.DATABASE_URL) {
    try {
      await getDb()
        .insert(submissions)
        .values({
          type: "careers-diagnostic-submit",
          source: "careers",
          payload: rowPayload,
          email: null,
          requestId,
          status: "received",
        })
        .onConflictDoUpdate({
          target: submissions.requestId,
          set: {
            payload: rowPayload,
            createdAt: sql`now()`,
          },
        });
    } catch {
      await saveLocalSubmission({
        id: requestId,
        type: "careers-diagnostic-submit",
        source: "careers",
        email: null,
        payload: rowPayload,
        requestId,
      });
    }
  } else {
    await saveLocalSubmission({
      id: requestId,
      type: "careers-diagnostic-submit",
      source: "careers",
      email: null,
      payload: rowPayload,
      requestId,
    });
  }

  return NextResponse.json({ ok: true });
}
