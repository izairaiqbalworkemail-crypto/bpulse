import { NextResponse, type NextRequest } from "next/server";

function isReportHost(host: string): boolean {
  return host.startsWith("report.");
}

export function proxy(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const { pathname } = request.nextUrl;

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
