import { randomUUID } from "node:crypto";
import { headers } from "next/headers";

import {
  assertIntakeDeliveryConfig,
  getIntakeDelivery,
  isRateLimited,
  validateIntakePayload,
} from "@/lib/intake";

assertIntakeDeliveryConfig();

const allowedOrigins = (process.env.INTAKE_ALLOWED_ORIGINS ?? "")
  .split(",")
  .map((item) => item.trim())
  .filter(Boolean);

function corsHeaders(origin: string | null) {
  const allowed = origin && allowedOrigins.includes(origin);
  if (!allowed) return null;
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

export async function OPTIONS(request: Request) {
  const origin = request.headers.get("origin");
  const cors = corsHeaders(origin);
  if (!cors) {
    return new Response(JSON.stringify({ error: "origin not allowed" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }
  return new Response(null, { status: 204, headers: cors });
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const cors = corsHeaders(origin);
  if (!cors) {
    return new Response(JSON.stringify({ error: "origin not allowed" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  const headerStore = await headers();
  const forwardedFor = headerStore.get("x-forwarded-for") ?? "";
  const ip = forwardedFor.split(",")[0]?.trim() || "0.0.0.0";

  if (isRateLimited(ip)) {
    return new Response(JSON.stringify({ error: "rate limit exceeded" }), {
      status: 429,
      headers: { "Content-Type": "application/json", ...cors },
    });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "invalid json" }), {
      status: 400,
      headers: { "Content-Type": "application/json", ...cors },
    });
  }

  const parsed = validateIntakePayload(body);
  if (!parsed.ok) {
    return new Response(JSON.stringify({ error: "validation failed", issues: parsed.issues }), {
      status: 400,
      headers: { "Content-Type": "application/json", ...cors },
    });
  }

  const record = {
    id: randomUUID(),
    receivedAt: new Date().toISOString(),
    ip,
    userAgent: headerStore.get("user-agent") ?? "unknown",
    payload: parsed.value,
  };

  try {
    const delivery = getIntakeDelivery();
    await delivery.deliver(record);
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "delivery failed",
        detail: error instanceof Error ? error.message : "unknown",
      }),
      {
        status: 503,
        headers: { "Content-Type": "application/json", ...cors },
      }
    );
  }

  return new Response(JSON.stringify({ ok: true, id: record.id }), {
    status: 202,
    headers: { "Content-Type": "application/json", ...cors },
  });
}
