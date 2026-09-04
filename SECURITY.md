# SECURITY — report.bpulse.dev private diagnostics

This repository now serves **private per-prospect diagnostics** only.

## Route model

- Private route: `/[slug]`
- There is **no** public listing route.
- There must never be an index that enumerates private reports.

## Threat model

1. **Indexing risk**
   - A report can contain a critical assessment of a named company's product.
   - If indexed, prospects can discover each other and trust is broken.

2. **Enumeration risk**
   - If slugs are predictable, one recipient can browse other recipients' reports.

## Required controls (do not remove)

1. **Unguessable slug format**
   - `company-name-<8-char-random-suffix>`
   - Example: `northline-finance-k4m2p8qz`
   - Enforced by `reportSlugPattern` in `src/content/reports.ts`.

2. **Noindex/nofollow per report**
   - Every `/[slug]` page must set `robots: { index: false, follow: false }`.

3. **Robots disallow**
   - `src/app/robots.ts` must disallow crawling for this host.

4. **Sitemap exclusion**
   - `src/app/sitemap.ts` must not include private report URLs.

5. **No index route listing reports**
   - No `/` report list, no `/reports`, no API that dumps slugs.

## Operational rules

- Treat slugs as secrets.
- Deliver slugs directly to the intended recipient.
- Do not cross-link reports.
- Do not expose report slugs in analytics dashboards or public logs.
