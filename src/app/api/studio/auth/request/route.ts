import { NextResponse } from "next/server";
import { sendStudioMagicLinkEmail } from "@/lib/email";
import {
  createMagicLinkToken,
  isAllowedStudioEmail,
  normalizeEmail,
} from "@/lib/security/studio-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RequestBody = {
  email?: string;
  redirectTo?: string;
};

export async function POST(request: Request) {
  let body: RequestBody;
  try {
    body = (await request.json()) as RequestBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid body." }, { status: 400 });
  }

  const email = normalizeEmail(body.email ?? "");
  if (!email || !isAllowedStudioEmail(email)) {
    return NextResponse.json({ ok: true });
  }

  const token = createMagicLinkToken(email, body.redirectTo);
  if (!token) {
    return NextResponse.json({ ok: false, error: "Auth is not configured." }, { status: 500 });
  }

  const url = new URL(request.url);
  url.pathname = "/api/studio/auth/verify";
  url.search = "";
  url.searchParams.set("token", token);
  if (body.redirectTo) {
    url.searchParams.set("redirect", body.redirectTo);
  }

  try {
    await sendStudioMagicLinkEmail({
      email,
      link: url.toString(),
    });
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[studio-auth] dev magic link", url.toString());
      return NextResponse.json({ ok: true, devLink: url.toString() });
    }
    console.error("[studio-auth] failed to send magic link", error);
    return NextResponse.json({ ok: false, error: "Email failed to send." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
