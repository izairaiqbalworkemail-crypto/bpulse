# report.bpulse.dev

Private diagnostics host for bpulse prospects.

## Scope

- Private report route: `/[slug]`
- Report OG image route: `/[slug]/opengraph-image`
- Intake API for Framer forms: `/api/intake`
- Content source: `src/content/*`
- Framer CMS exports: `tooling/framer-cms/*.csv`

## Security constraints

See `SECURITY.md`. In short:

- Unguessable slugs with random 8-char suffix.
- Every report is noindex/nofollow.
- Robots disallow crawling.
- Sitemap excludes reports.
- No index route listing reports, ever.

## Intake API

`POST /api/intake` accepts structured JSON only.

### Required headers

- `Content-Type: application/json`
- Browser origin must be allowed by `INTAKE_ALLOWED_ORIGINS`

### Payload shape

```json
{
  "type": "general | check | specialist | candidate",
  "context": {
    "page": "string (required)",
    "reportSlug": "string (optional)",
    "lotSlug": "string (optional)",
    "crewSlug": "string (optional)",
    "source": "string (optional)"
  },
  "contact": {
    "name": "string (required)",
    "email": "string (required, valid email)",
    "company": "string (optional)",
    "role": "string (optional)"
  },
  "project": {
    "budget": "string (optional)",
    "timeline": "string (optional)",
    "state": "string (required for type=check)",
    "symptoms": ["string", "..."],
    "whatsBlocking": "string (required for type=check)"
  },
  "candidate": {
    "track": "candidate | pitch (required for type=candidate)",
    "portfolioUrl": "string (optional)",
    "cvUrl": "string (optional)",
    "skills": ["string", "..."]
  },
  "message": "string (optional)",
  "honeypot": "string (must be empty)"
}
```

### Validation and controls

- Honeypot must be empty.
- Rate limit per IP: 8 requests / 10 minutes.
- Per-type validation:
  - `specialist` requires `context.crewSlug`
  - `candidate` requires `candidate`
  - `check` requires `project.state` and `project.whatsBlocking`

### Delivery behavior (fail loudly)

- Production startup throws when delivery is not configured.
- Request returns error (never success) if delivery fails.
- Delivery writes to:
  1. Email webhook (`INTAKE_EMAIL_WEBHOOK_URL`)
  2. Append-only JSONL log (`INTAKE_LOG_PATH`)

### Environment variables

- `INTAKE_ALLOWED_ORIGINS` (comma-separated origins; Framer domain only)
- `INTAKE_EMAIL_WEBHOOK_URL`
- `INTAKE_LOG_PATH`
- `NEXT_PUBLIC_SITE_URL` (optional, for metadata image URLs)

### Example request

```bash
curl -X POST "https://report.bpulse.dev/api/intake" \
  -H "Content-Type: application/json" \
  -H "Origin: https://your-framer-site.example" \
  -d '{
    "type": "check",
    "context": {
      "page": "check",
      "reportSlug": "northline-finance-k4m2p8qz",
      "source": "framer-form"
    },
    "contact": {
      "name": "Alex Founder",
      "email": "alex@northline.com",
      "company": "Northline Finance"
    },
    "project": {
      "state": "integration-blocked",
      "whatsBlocking": "handover risk and no production pass",
      "symptoms": ["ghosted dev", "single owner"]
    },
    "honeypot": ""
  }'
```

## Framer CMS exports

Generate CSV files from `src/content`:

```bash
node --experimental-strip-types tooling/export-framer-cms.mjs
```

Outputs:

- `tooling/framer-cms/projects.csv`
- `tooling/framer-cms/crew.csv`
- `tooling/framer-cms/notices.csv`
- `tooling/framer-cms/offers.csv`
