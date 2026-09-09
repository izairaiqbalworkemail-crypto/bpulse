import { ladderPrices, money } from "@/content/ladder";

export const closeStages = [
  {
    id: "read",
    label: "The Read",
    href: "/read",
    hrefLabel: "Get my free read",
    happens:
      "You describe what is stuck. A senior engineer writes back: what we think is happening, what we would look at, and what we could not tell from your description.",
    receive: "A written read, delivered at a private URL, within one business day.",
    sign: "Nothing. The Read is free. Nothing on it asks for a meeting.",
    see: "The document itself, the same shape as a condition report.",
  },
  {
    id: "session",
    label: "The Session",
    href: "/session",
    hrefLabel: "Book my session",
    happens:
      "Ninety minutes with a senior engineer, on your actual problem. Not a sales call.",
    receive: "A written scope and a range.",
    sign: "Nothing yet. The Session is credited against anything you buy in 30 days.",
    see: "The written scope you leave with.",
  },
  {
    id: "discovery",
    label: "The Check",
    demoHref: "/demo",
    href: "/check",
    hrefLabel: "How the five days work",
    happens:
      "Five days inside your repository. A written verdict: keep, repair or rebuild, with what each would take.",
    receive: "The written report, a readout, and a fixed quote if you want the work.",
    sign: "Payment for the Check. Credited in full against a build in 30 days.",
    see: "Overview in the portal: current stage, next milestone, days on the clock.",
  },
  {
    id: "nda",
    label: "NDA",
    demoHref: "/demo/documents",
    happens:
      "If we need the repo, the credentials, or the customer data to be sure, we sign first.",
    receive: "The dated NDA, with signature status visible to both sides.",
    sign: "The NDA. You can download the stub on the sample to see the shape.",
    see: "Documents: dated, signed or waiting, never implied.",
  },
  {
    id: "scope",
    label: "Scope locked",
    demoHref: "/demo/scope",
    happens:
      "Scope is versioned and signed before any code. A change is a change order, priced and re-signed. Nothing is absorbed silently.",
    receive: "Scope vN, the diff from the last version, and every change order with its price.",
    sign: "The locked scope, and each change order after that.",
    see: "The scope lock and the diff. This is why a client accepts a written number.",
  },
  {
    id: "build",
    label: "Build",
    demoHref: "/demo/progress",
    happens:
      "The people who scoped it ship it. Findings stay open, closed, or deferred with an owner and a date.",
    receive: "Weekly written updates. Commits and environment status when they are connected.",
    sign: "Nothing new unless a change order lands.",
    see: "Progress, findings, and updates. Unwired integrations say “not connected.”",
  },
  {
    id: "handover",
    label: "Handover",
    demoHref: "/demo/handover",
    happens:
      "Runbook, credentials transfer, training. Then we revoke what we held. No hostage codebases. Written down.",
    receive: "The runbook, the transfer log, the access revocation log, and the training.",
    sign: "Handover acceptance. Training is bundled into every Close.",
    see: "The revocation log with dates. Empty dates mean handover has not happened yet.",
  },
  {
    id: "standing",
    label: "Second Chair",
    demoHref: "/demo",
    happens:
      `Optional post-launch support, priced from ${money(ladderPrices.standingMin)} a month. You can run it without us. Second Chair is if you want us, not because you have to.`,
    receive: "A written after-launch agreement, or nothing. Both are fine.",
    sign: "Only if you take Second Chair.",
    see: "The stage tracker moves to Second Chair. The revocation log stays.",
  },
] as const;

export const crewGates = [
  {
    n: "00",
    title: "The diagnostic",
    mechanism:
      "Async written diagnostic in a 48-hour window. Broken repo, logs, and brief. Candidate writes a condition report with limits required.",
    costs: "Near-zero marginal cost at volume, before any senior interview time is spent.",
    proves: "They can read someone else's mess and say something true, specific, and bounded.",
  },
  {
    n: "01",
    title: "Structured technical interview",
    mechanism:
      "A senior human, same rubric every candidate. About 90 minutes within one week.",
    costs: "Two senior hours per candidate, every time. We do not outsource the first filter.",
    proves: "They can think in front of another senior. Not a vibe. Not a puzzle for its own sake.",
  },
  {
    n: "02",
    title: "Paid real-scope work sample",
    mechanism:
      "Paid. Real scope. The kind of work a Close actually contains. Candidates are never charged a fee at any stage.",
    costs: "We pay for the sample. That is cash out the door before anyone is on a client.",
    proves: "They can ship a slice of the work we sell, not a toy repo.",
  },
  {
    n: "03",
    title: "Blind two-peer review",
    mechanism: "Two peers review the sample independently. Both must agree. A single yes is not a pass.",
    costs: "Four more senior hours, and the right to lose a candidate we already paid.",
    proves: "The work holds when the interviewer is not in the room.",
  },
  {
    n: "04",
    title: "Ninety days on live client work",
    mechanism:
      "Supervised live client work before the person is client-facing. No exceptions for urgency.",
    costs:
      "Ninety days of senior supervision on a paying Close. This is the expensive gate. That is why it is the credible one.",
    proves: "They can hold a real engagement without becoming a risk to the client.",
  },
] as const;

export const standingReview =
  "Quarterly review against real delivered work, not a self-assessment, not a pulse survey.";

export const standingConsequence =
  "If they fall below the bar: paused placement and mentored work. Not dismissal. The person stays on the bench until they hold again, or they leave the standard in writing.";

export const crewCommitments = [
  "Candidates are never charged a fee at any stage.",
  "No multiple-choice test is ever a pass/fail gate.",
  "Nobody is client-facing before Gate 4, no exceptions for urgency.",
] as const;

export const passRateNote =
  "Gate 0 pass threshold: tracking from our first cohort - published once we have enough scored submissions.";
