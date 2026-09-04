import type { Report } from "./types";
import { assertReport } from "./types";

const report: Report = {
  slug: "harbor-chart-n4R8wL2c",
  company: "Harbor Chart",
  preparedBy: "Mehak Seedat",
  preparedOn: "4 September 2026",
  surfacesRead: [
    "https://app.harborchart.example (login + a demo tenant reachable from the marketing 'Try the chart' CTA)",
    "https://harborchart.example/security and /hipaa pages",
    "Public job post: 'Senior engineer to finish EHR integration' posted 18 Aug 2026",
  ],
  theRead:
    "The demo tenant loads real-looking patient names and dates of birth in the browser, and the network tab shows those rows coming from an unauthenticated /api/demo/charts.json. The security page claims HIPAA production. Those two sentences cannot both be true.",
  findings: [
    {
      severity: "blocks launch",
      observed:
        "/api/demo/charts.json is reachable without a cookie and returns 40 chart summaries with names, DOB, and a clinic ID. The same payload is what the signed-in app renders.",
      consequence:
        "If any of those rows are real, this is a reportable exposure. If they are invented, the security page is still claiming a HIPAA floor the demo does not practice.",
      closing:
        "Kill the unauthenticated JSON. Serve the demo from a signed, synthetic fixture that cannot be confused with production data. Say so on the security page.",
    },
    {
      severity: "blocks a customer",
      observed:
        "The EHR integration job post asks for 'someone to finish the Epic sandbox connection that has been in progress since Q1.' The product UI still shows 'Connect EHR' as a coming-soon tile.",
      consequence:
        "A clinic that buys for charting-plus-EHR will discover the integration is a tile, not a path. That is the last 20% they thought they had already paid for.",
      closing:
        "Either ship a working sandbox connection with a written definition of done, or take the tile down until a Close is scoped.",
    },
    {
      severity: "blocks trust",
      observed:
        "The HIPAA page lists 'BAAs available on request' and 'encryption at rest' with no mention of the demo endpoint, audit logs, or who can export a chart.",
      consequence:
        "A compliance officer who reads the page and then opens DevTools will not trust the rest of the claims.",
      closing:
        "Rewrite the HIPAA page against what is actually deployed. Missing controls go in Limits, not in adjectives.",
    },
    {
      severity: "blocks trust",
      observed:
        "No status page, no status Twitter, no incident history. The only uptime sentence is 'we take reliability seriously' in the footer.",
      consequence:
        "A clinic cannot tell whether last Tuesday's outage was yours or theirs.",
      closing:
        "Stand up a public status page before the next sales call that mentions HIPAA.",
    },
  ],
  whatItTakes: {
    scope:
      "Close the demo data hole, write an honest HIPAA surface, and produce a fixed-scope plan for the EHR connection the job post already admitted is unfinished.",
    weeks: "3–5 weeks",
    band: "$40k–$95k",
  },
  pod: "integration",
  specialistId: "mehak",
  limits: [
    "Public surfaces and one demo tenant only. We have not signed a BAA, seen the EHR sandbox, or reviewed access logs.",
    "We cannot prove the demo rows are real patients. We can prove they are shaped like them and are public.",
    "Harbor Chart is a fictional company used as a sample report.",
  ],
};

export default assertReport(report);
