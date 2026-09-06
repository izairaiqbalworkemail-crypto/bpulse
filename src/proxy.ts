import { NextResponse, type NextRequest } from "next/server";

import { checkRateLimit } from "@/lib/security/rate-limit";
import { recordAuditEvent } from "@/lib/security/audit-log";
import {
  extractClientIp,
  readSessionFromNextRequest,
  studioNotFound,
} from "@/lib/security/studio-auth";

function isReportHost(host: string): boolean {
  return host.startsWith("report.");
}

export async function proxy(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const { pathname } = request.nextUrl;
  const ip = extractClientIp(request.headers);
  const session = readSessionFromNextRequest(request);

  if (session && pathname === "/" && !isReportHost(host)) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith("/api/")) {
    const { limited, retryAfterSeconds } = await checkRateLimit(pathname, ip);
    if (limited) {
      return new NextResponse(
        JSON.stringify({ ok: false, error: "too many requests" }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": String(retryAfterSeconds),
          },
        }
      );
    }
  }

  if (
    pathname === "/studio" ||
    pathname.startsWith("/studio/") ||
    pathname === "/admin" ||
    pathname.startsWith("/admin/") ||
    pathname === "/portal" ||
    pathname.startsWith("/portal/")
  ) {
    if (!session) {
      return studioNotFound();
    }

    if (request.method === "GET" || request.method === "HEAD") {
      try {
        await recordAuditEvent({
          actor: session.email,
          action: pathname.startsWith("/portal")
            ? "portal.read"
            : pathname.startsWith("/admin")
              ? "admin.read"
              : "studio.read",
          target: pathname,
          ip,
          metadata: {
            method: request.method,
            host,
          },
        });
      } catch {
        return new NextResponse("Audit logging failed. Admin read blocked.", {
          status: 500,
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        });
      }
    }
  }

  if (pathname.startsWith("/api/careers/admin/")) {
    if (!session) {
      return studioNotFound();
    }
  }

  if (pathname.startsWith("/api/admin/")) {
    if (!session) {
      return studioNotFound();
    }
  }

  if (!isReportHost(host)) {
    return NextResponse.next();
  }

  if (pathname === "/robots.txt") {
    return new NextResponse("User-agent: *\nDisallow: /\n", {
      status: 200,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/report";
    return NextResponse.rewrite(url);
  }

  if (pathname === "/sitemap.xml") {
    return new NextResponse("Not found", { status: 404 });
  }

  if (!pathname.startsWith("/report/")) {
    const url = request.nextUrl.clone();
    url.pathname = `/report${pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.png|logo.png|apple-icon.png|icon.svg|bpulse-brand/).*)",
  ],
};
