# SECURITY — Private Diagnostics

## What `/report/[slug]` is

`/report/[slug]` pages are private per-prospect diagnostics. They name a real
company and list what is wrong with its product. They are generated for a
single recipient and are not meant to be found by search engines, other
prospects, or the company itself.

## The two threats

1. **Indexing.** If these pages are indexable, a prospect can google their own
   company and find a stranger's public critique of their product. That is a
   defamation and trust disaster.

2. **Enumeration.** If the slug scheme is predictable, one recipient can browse
   every other recipient's report. That is a confidentiality breach.

## The mitigations — do not undo these

- **Noindex, nofollow** on every `/report/[slug]` page (via `buildMetadata` robots).
- Excluded from `sitemap.ts`.
- `Disallow: /report/` in `robots.ts`.
- **Unguessable slugs.** Slugs are `company-name-XyZ8aBc2`: the company name
  plus a random 8-character suffix. They are treated as secrets, delivered to
  the recipient directly, never linked from public pages.
- **No `/report` index route may ever exist.** There is no page that lists
  reports, and there must never be one. A list route is what makes
  enumeration trivial.

## Verification

- Confirm `robots.ts` still has `Disallow: /report/`.
- Confirm no page and no link in the public tree points into `/report/`.
- Confirm every report page sets `robots: "noindex, nofollow"`.
