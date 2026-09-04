import type { NextConfig } from "next";

/**
 * No inline <script> exists anywhere in this app — the only <script> tag is
 * JSON-LD (type="application/ld+json"), which browsers never execute as code
 * and which CSP's script-src does not gate. next/font self-hosts font files
 * at build time, so no runtime request to fonts.googleapis.com/gstatic.com is
 * ever made, and motion (Framer Motion's successor) animates via direct
 * style/transform writes, not eval. That means a strict script-src with no
 * 'unsafe-inline' and no nonce blocks the same attack surface (injected
 * <script> tags) without forcing the site into per-request dynamic
 * rendering — nonces require that on every page (see Next's CSP guide),
 * which would take the ~40 currently-static routes (/, /work/*, /team/*,
 * /demo/*, /standard, /edpulse, /how-it-works) off static generation for a
 * protection nothing here needs. If an inline script is ever genuinely
 * required, add it via next/script with a real nonce on that one route
 * rather than loosening this policy pre-emptively.
 *
 * React's style={{...}} prop sets CSSOM properties directly (not an inline
 * style="" attribute or a <style> block), so it is not gated by style-src
 * either — style-src stays strict for the same reason.
 */
const csp = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
