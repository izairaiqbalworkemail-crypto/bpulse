export const demoBanner =
  "Sample portal. Nothing here is a live engagement. Data is labelled sample throughout.";

export const demoClient = {
  name: "Northline Payroll",
  engagement: "Close — registration harden + launch sentence",
  band: "$18k–$40k",
  lockedScopeVersion: "2.1",
};

export const stages = [
  { id: "discovery", label: "Discovery", done: true },
  { id: "nda", label: "NDA", done: true },
  { id: "scope", label: "Scope locked", done: true },
  { id: "build", label: "Build", done: false, current: true },
  { id: "handover", label: "Handover", done: false },
  { id: "standing", label: "Standing", done: false },
] as const;

export const demoClock = {
  currentStage: "Build",
  nextMilestone: "Reset-token one-time use in production",
  daysElapsed: 11,
  daysRemaining: 10,
  lockedDays: 21,
};

export const documents = [
  {
    name: "NDA",
    dated: "12 Aug 2026",
    status: "signed",
    href: "/demo/stubs/nda.txt",
  },
  {
    name: "Scope v2.1",
    dated: "18 Aug 2026",
    status: "signed",
    href: "/demo/stubs/scope.txt",
  },
  {
    name: "IP assignment",
    dated: "18 Aug 2026",
    status: "signed",
    href: "/demo/stubs/ip.txt",
  },
  {
    name: "Change order 01 — password-reset tokens",
    dated: "28 Aug 2026",
    status: "signed",
    href: "/demo/stubs/co-01.txt",
  },
];

export const scopeVersions = [
  {
    version: "2.0",
    dated: "14 Aug 2026",
    summary: "Registration harden + public launch sentence.",
  },
  {
    version: "2.1",
    dated: "18 Aug 2026",
    summary: "Added one-time password-reset tokens after the first finding.",
  },
];

export const scopeDiff = [
  {
    change: "Added: invalidate reset tokens on first success, 15-minute expiry.",
    price: "+$4,200",
    order: "CO-01",
  },
  {
    change: "Unchanged: per-IP and per-email sliding window on /api/register.",
    price: "in lock",
    order: "v2.0",
  },
];

export const changeOrders = [
  {
    id: "CO-01",
    dated: "28 Aug 2026",
    request: "Reset tokens remain valid after first use.",
    price: "$4,200",
    signed: "28 Aug 2026",
  },
];

export const progress = {
  commits: [
    { hash: "a91c2e", message: "rate-limit register by ip + email", date: "1 Sep" },
    { hash: "b33f01", message: "reject disposable signup domains", date: "2 Sep" },
    { hash: "c08aa4", message: "reset token one-shot (staging)", date: "3 Sep" },
    { hash: "d14b77", message: "lock session cookie to host-only", date: "3 Sep" },
    { hash: "e2aa01", message: "staging health check on /readyz", date: "4 Sep" },
    { hash: "f09c18", message: "strip reset-token from server logs", date: "4 Sep" },
  ],
  deploys: [
    { env: "staging", status: "green", at: "3 Sep 16:12" },
    { env: "preview", status: "not connected", at: "—" },
    { env: "production", status: "not connected", at: "—" },
  ],
  burndown: "11 of 21 locked days used. Sample.",
};

const finding = (
  status: "open" | "closed" | "deferred",
  owner: string,
  date: string,
  observed: string,
  closing: string
) => ({ status, owner, date, observed, closing });

export const demoFindings = [
  finding("closed", "Hassan Saulat", "2 Sep 2026", "Signup POST had no sliding window.", "Per-IP and per-email limit shipped on staging."),
  finding("open", "Hassan Saulat", "3 Sep 2026", "Reset token still valid after first use in production.", "Fix is on staging. Production deploy is the next milestone."),
  finding("deferred", "Aneeb Iqbal", "28 Aug 2026", "Marketing hero still says coming this quarter.", "Copy change sits with the client. Not in locked scope."),
  finding("closed", "Hassan Saulat", "19 Aug 2026", "Register accepted disposable mail hosts.", "Domain denylist on staging."),
  finding("closed", "Hassan Saulat", "20 Aug 2026", "Session cookie missing Secure on staging HTTPS.", "Flag set. Sample."),
  finding("closed", "Aneeb Iqbal", "21 Aug 2026", "Password reset email used a shared from-address.", "From-domain aligned to the sample tenant."),
  finding("closed", "Hassan Saulat", "22 Aug 2026", "Rate-limit key was only the IP.", "Key is now IP + email."),
  finding("closed", "Hassan Saulat", "23 Aug 2026", "/readyz returned 200 with a dead database.", "Check now fails closed."),
  finding("closed", "Aneeb Iqbal", "24 Aug 2026", "Invite tokens lived for 30 days.", "Cut to 24 hours on staging."),
  finding("closed", "Hassan Saulat", "25 Aug 2026", "Error page leaked stack frames.", "Generic 500 copy in staging."),
  finding("closed", "Hassan Saulat", "26 Aug 2026", "CORS allow-list included localhost in the staging build.", "Removed."),
  finding("closed", "Aneeb Iqbal", "27 Aug 2026", "Admin route had no audit line.", "Write path now logs actor + time. Sample."),
  finding("open", "Hassan Saulat", "1 Sep 2026", "Production TLS cert is the client's — we cannot rotate it.", "Not connected. Waiting on their DNS."),
  finding("open", "Hassan Saulat", "2 Sep 2026", "Backup restore has not been rehearsed on staging.", "In the remaining locked days."),
  finding("open", "Aneeb Iqbal", "3 Sep 2026", "One-time reset is on staging only.", "Production remains not connected."),
  finding("open", "Hassan Saulat", "4 Sep 2026", "Sentry DSN is not connected.", "Unwired integration. Shows as not connected."),
  finding("open", "Aneeb Iqbal", "4 Sep 2026", "Status page is not connected.", "Unwired. Will stay labelled until they plug it in."),
  finding("open", "Hassan Saulat", "5 Sep 2026", "WAF ruleset is not connected.", "Unwired."),
  finding("deferred", "Aneeb Iqbal", "20 Aug 2026", "SSO against their IdP is out of lock.", "Change order if they want it."),
  finding("deferred", "Hassan Saulat", "22 Aug 2026", "SMS second factor is out of lock.", "Client to decide after handover."),
  finding("deferred", "Aneeb Iqbal", "25 Aug 2026", "Public changelog was requested after sign-off.", "Not in v2.1."),
  finding("deferred", "Hassan Saulat", "28 Aug 2026", "Office IP allow-list on admin.", "Client network work. Deferred."),
  finding("deferred", "Aneeb Iqbal", "30 Aug 2026", "Arabic locale on the register form.", "Copy sits with the client."),
  finding("deferred", "Hassan Saulat", "1 Sep 2026", "Custom SMTP they already pay for.", "Not connected. Their call after Close."),
];

export const updates = [
  {
    week: "Week of 18 Aug",
    body: "NDA and scope v2.1 signed. Change order 01 priced and countersigned the same day. Sample.",
  },
  {
    week: "Week of 25 Aug",
    body: "Registration limiter on staging. Disposable-domain list in review. Sample.",
  },
  {
    week: "Week of 1 Sep",
    body: "Reset-token one-shot on staging. Production remains not connected. Sample.",
  },
];

export const demoCrew = [
  { id: "hassan", role: "Delivery — named on the Close" },
  { id: "aneeb", role: "Integration — scope lock" },
];

export const handover = {
  runbook: "Not started. Handover is two stages out. Sample.",
  credentials: [
    { item: "Staging deploy key", heldBy: "bpulse", until: "handover day" },
    { item: "Production deploy key", heldBy: "client", until: "—" },
  ],
  revocation: [
    {
      item: "GitHub deploy key (staging)",
      revokedOn: "—",
      note: "Will be revoked the day handover is signed. Sample — no live key is held.",
    },
    {
      item: "Vercel team invite",
      revokedOn: "—",
      note: "Invite is client-owned. Nothing to revoke. Sample.",
    },
  ],
  training: "Handover training is bundled into every Close. Not recorded yet. Sample.",
};

export const demoViews = [
  { slug: "overview", label: "Overview" },
  { slug: "documents", label: "Documents" },
  { slug: "scope", label: "Scope" },
  { slug: "progress", label: "Progress" },
  { slug: "findings", label: "Findings" },
  { slug: "updates", label: "Updates" },
  { slug: "crew", label: "Crew" },
  { slug: "handover", label: "Handover" },
] as const;

export type DemoView = (typeof demoViews)[number]["slug"];

/**
 * Shared snapshot for the hero window and /demo Overview.
 * Change a seed field above — both surfaces update.
 */
export function getDemoOverview() {
  const open = demoFindings.filter((item) => item.status === "open").length;
  const closed = demoFindings.filter((item) => item.status === "closed").length;
  const deferred = demoFindings.filter((item) => item.status === "deferred").length;
  const signedDocs = documents.filter((item) => item.status === "signed").length;
  const lastUpdate = updates.at(-1);
  if (!lastUpdate) {
    throw new Error("demo updates seed is empty");
  }
  const staging = progress.deploys.find((item) => item.env === "staging");
  const production = progress.deploys.find((item) => item.env === "production");
  const usedRatio = demoClock.daysElapsed / demoClock.lockedDays;

  return {
    client: demoClient.name,
    engagement: demoClient.engagement,
    band: demoClient.band,
    scopeVersion: demoClient.lockedScopeVersion,
    daysElapsed: demoClock.daysElapsed,
    daysRemaining: demoClock.daysRemaining,
    lockedDays: demoClock.lockedDays,
    nextMilestone: demoClock.nextMilestone,
    currentStage: demoClock.currentStage,
    stages,
    views: demoViews,
    findings: { open, closed, deferred },
    signedDocs,
    documentCount: documents.length,
    lastUpdate,
    staging,
    production,
    usedRatio,
    usedPct: Math.round(usedRatio * 100),
    latestCommit: progress.commits[progress.commits.length - 1],
    crew: demoCrew,
  };
}
