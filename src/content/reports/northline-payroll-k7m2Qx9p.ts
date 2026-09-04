import type { Report } from "./types";
import { assertReport } from "./types";

const report: Report = {
  slug: "northline-payroll-k7m2Qx9p",
  company: "Northline Payroll",
  preparedBy: "Aneeb Iqbal",
  preparedOn: "4 September 2026",
  surfacesRead: [
    "https://northlinepayroll.example/signup (public registration)",
    "https://status.northlinepayroll.example (status page, last incident 11 Aug)",
    "Public marketing site pricing page and changelog, 4 Sep 2026",
  ],
  theRead:
    "The signup POST at /api/register has no visible rate limit or bot check. A pricing page still lists a 'free workspace' tier with a 500-run monthly cap. Combined with an open register, one script can exhaust that cap overnight and lock paying teams out of payroll runs the next morning.",
  findings: [
    {
      severity: "blocks a customer",
      observed:
        "The signup endpoint returns 201 with no Retry-After, no captcha, and identical latency on the 1st and 40th unauthenticated POST from the same IP (measured on the public form).",
      consequence:
        "A free-tier exhaustion script is a one-evening job. Existing customers then hit a hard cap they did not cause, during a payroll window.",
      closing:
        "Put a per-IP and per-email sliding window on /api/register, reject disposable domains, and move the free-tier cap to a queue with a human-visible status — not a silent 429 on the payroll job itself.",
    },
    {
      severity: "blocks launch",
      observed:
        "The public changelog last mentioned 'production payroll' on 2 March. The status page has been green since, but the marketing site still labels the product 'coming this quarter' in the hero.",
      consequence:
        "Prospects cannot tell whether payroll is live. Sales and the product disagree in public, which is how a launch date dies a second time.",
      closing:
        "Pick one sentence and put it in both places. If payroll is live for a subset of tenants, say which. If it is not, take the word 'production' off the changelog.",
    },
    {
      severity: "blocks trust",
      observed:
        "The password-reset email, triggered from the public form, contains a link that stays valid after use (the same token loaded twice in two browsers still signed in).",
      consequence:
        "A forwarded reset mail is a standing login. For a payroll product that is the whole trust model.",
      closing:
        "One-time tokens, 15-minute expiry, invalidate on first success. Confirm it by attempting the second load and getting a dead page.",
    },
  ],
  whatItTakes: {
    scope:
      "Harden registration and reset, reconcile the public launch sentence, and write a one-page completion plan for the remaining payroll edge cases we could not see from outside.",
    weeks: "2–3 weeks",
    band: "$18k–$40k",
  },
  pod: "delivery",
  specialistId: "hassan",
  limits: [
    "This was read from public surfaces only. We have not seen the repo, the job runner, or the actual free-tier enforcement code.",
    "Rate-limit absence is inferred from response behaviour, not from a config file.",
    "Northline Payroll is a fictional company used as a sample report. No real tenant was contacted.",
  ],
};

export default assertReport(report);
