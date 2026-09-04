import { NextResponse, type NextRequest } from "next/server";

import { checkRateLimit } from "@/lib/security/rate-limit";

function isReportHost(host: string): boolean {
  return host.startsWith("report.");
}

function clientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}

export async function proxy(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api/")) {
    const { limited, retryAfterSeconds } = await checkRateLimit(
      pathname,
      clientIp(request)
    );
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

  if (!isReportHost(host)) {
    return NextResponse.next();
  }

  if (pathname === "/robots.txt") {
    return new NextResponse("User-agent: *\nDisallow: /\n", {
      status: 200,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  if (pathname === "/" || pathname === "/sitemap.xml") {
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
    "/((?!_next/static|_next/image|favicon.png|logo.png|apple-icon.png|icon.svg).*)",
  ],
};
