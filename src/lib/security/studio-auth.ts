import { createHmac, timingSafeEqual } from "node:crypto";
import type { NextRequest } from "next/server";

export const STUDIO_SESSION_COOKIE = "__Host-bpulse-studio";
const STUDIO_MAGIC_TTL_SECONDS = 10 * 60;
const STUDIO_SESSION_TTL_SECONDS = 30 * 60;

type SignedPayload = {
  kind: "magic" | "session";
  email: string;
  exp: number;
  redirectTo?: string;
};

export type StudioSession = {
  email: string;
  exp: number;
};

export function studioNotFound(): Response {
  return new Response("Not found", { status: 404 });
}

export function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

export function readStudioAllowlist(): string[] {
  const raw = process.env.STUDIO_ADMIN_ALLOWLIST ?? "";
  return raw
    .split(/[\n,;]+/)
    .map((item) => normalizeEmail(item))
    .filter(Boolean);
}

export function isAllowedStudioEmail(value: string): boolean {
  const email = normalizeEmail(value);
  const allowlist = readStudioAllowlist();
  return allowlist.includes(email);
}

export function createMagicLinkToken(email: string, redirectTo?: string): string | null {
  const secret = authSecret();
  if (!secret) return null;

  const payload: SignedPayload = {
    kind: "magic",
    email: normalizeEmail(email),
    exp: nowSeconds() + STUDIO_MAGIC_TTL_SECONDS,
    redirectTo: safeRedirect(redirectTo),
  };
  return encodeSignedPayload(payload, secret);
}

export function verifyMagicLinkToken(token: string): { email: string; redirectTo: string } | null {
  const payload = verifySignedPayload(token);
  if (!payload || payload.kind !== "magic") return null;
  return {
    email: payload.email,
    redirectTo: safeRedirect(payload.redirectTo),
  };
}

export function createSessionToken(email: string): string | null {
  const secret = authSecret();
  if (!secret) return null;
  const payload: SignedPayload = {
    kind: "session",
    email: normalizeEmail(email),
    exp: nowSeconds() + STUDIO_SESSION_TTL_SECONDS,
  };
  return encodeSignedPayload(payload, secret);
}

export function verifySessionToken(token: string): StudioSession | null {
  const payload = verifySignedPayload(token);
  if (!payload || payload.kind !== "session") return null;
  return { email: payload.email, exp: payload.exp };
}

export function readSessionFromNextRequest(request: NextRequest): StudioSession | null {
  const token = request.cookies.get(STUDIO_SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export function readSessionFromRequest(request: Request): StudioSession | null {
  const token = readCookieFromHeader(request.headers.get("cookie"), STUDIO_SESSION_COOKIE);
  if (!token) return null;
  return verifySessionToken(token);
}

export function studioSessionCookie(): {
  name: string;
  options: {
    httpOnly: boolean;
    secure: boolean;
    sameSite: "strict";
    path: string;
    maxAge: number;
  };
} {
  return {
    name: STUDIO_SESSION_COOKIE,
    options: {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: STUDIO_SESSION_TTL_SECONDS,
    },
  };
}

export function extractClientIp(headers: Headers): string {
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headers.get("x-real-ip") ??
    "unknown"
  );
}

export function readSessionFromCookieHeader(cookieHeader: string | null): StudioSession | null {
  const token = readCookieFromHeader(cookieHeader, STUDIO_SESSION_COOKIE);
  if (!token) return null;
  return verifySessionToken(token);
}

function verifySignedPayload(token: string): SignedPayload | null {
  const secret = authSecret();
  if (!secret) return null;
  const [payloadPart, signaturePart] = token.split(".");
  if (!payloadPart || !signaturePart) return null;

  const expected = sign(payloadPart, secret);
  if (!secureEqual(signaturePart, expected)) return null;

  const payload = parsePayload(payloadPart);
  if (!payload) return null;
  if (payload.exp < nowSeconds()) return null;
  if (!payload.email || !isAllowedStudioEmail(payload.email)) return null;
  return payload;
}

function encodeSignedPayload(payload: SignedPayload, secret: string): string {
  const encoded = base64urlEncode(JSON.stringify(payload));
  const signature = sign(encoded, secret);
  return `${encoded}.${signature}`;
}

function parsePayload(value: string): SignedPayload | null {
  try {
    const parsed = JSON.parse(base64urlDecode(value)) as SignedPayload;
    if (!parsed || typeof parsed !== "object") return null;
    if (parsed.kind !== "magic" && parsed.kind !== "session") return null;
    if (typeof parsed.email !== "string") return null;
    if (typeof parsed.exp !== "number") return null;
    if (parsed.redirectTo && typeof parsed.redirectTo !== "string") return null;
    return parsed;
  } catch {
    return null;
  }
}

function authSecret(): string | null {
  const value = process.env.STUDIO_AUTH_SECRET;
  if (!value) {
    console.error("[studio-auth] STUDIO_AUTH_SECRET is missing.");
    return null;
  }
  return value;
}

function safeRedirect(value?: string): string {
  if (!value) return "/studio/careers";
  if (!value.startsWith("/")) return "/studio/careers";
  if (!value.startsWith("/studio")) return "/studio/careers";
  return value;
}

function readCookieFromHeader(cookieHeader: string | null, name: string): string | null {
  if (!cookieHeader) return null;
  const parts = cookieHeader.split(";");
  for (const part of parts) {
    const [key, ...rest] = part.trim().split("=");
    if (key !== name) continue;
    return rest.join("=") || null;
  }
  return null;
}

function nowSeconds(): number {
  return Math.floor(Date.now() / 1000);
}

function sign(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

function secureEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

function base64urlEncode(value: string): string {
  return Buffer.from(value, "utf8").toString("base64url");
}

function base64urlDecode(value: string): string {
  return Buffer.from(value, "base64url").toString("utf8");
}
