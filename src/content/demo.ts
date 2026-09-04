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
  ],
  deploys: [
    { env: "staging", status: "green", at: "3 Sep 16:12" },
    { env: "production", status: "not connected", at: "—" },
  ],
  burndown: "11 of 21 locked days used. Sample.",
};

export const demoFindings = [
  {
    status: "closed" as const,
    owner: "Hassan Saulat",
    date: "2 Sep 2026",
    observed: "Signup POST had no sliding window.",
    closing: "Per-IP and per-email limit shipped on staging.",
  },
  {
    status: "open" as const,
    owner: "Hassan Saulat",
    date: "3 Sep 2026",
    observed: "Reset token still valid after first use in production.",
    closing: "Fix is on staging. Production deploy is the next milestone.",
  },
  {
    status: "deferred" as const,
    owner: "Aneeb Iqbal",
    date: "28 Aug 2026",
    observed: "Marketing hero still says coming this quarter.",
    closing: "Copy change sits with the client. Not in locked scope.",
  },
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
