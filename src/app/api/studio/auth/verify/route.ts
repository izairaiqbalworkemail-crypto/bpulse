import { NextResponse } from "next/server";
import {
  createSessionToken,
  studioNotFound,
  studioSessionCookie,
  verifyMagicLinkToken,
} from "@/lib/security/studio-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token") ?? "";
  const verified = verifyMagicLinkToken(token);
  if (!verified) {
    return studioNotFound();
  }

  const sessionToken = createSessionToken(verified.email);
  if (!sessionToken) {
    return NextResponse.json({ ok: false, error: "Auth is not configured." }, { status: 500 });
  }

  const destination = new URL(verified.redirectTo, request.url);
  const response = NextResponse.redirect(destination, { status: 302 });
  const cookie = studioSessionCookie();
  response.cookies.set(cookie.name, sessionToken, cookie.options);
  return response;
}
