type Gate = 0 | 1 | 2 | 3 | 4;

type Role = {
  id: string;
  title: string;
  pod: string;
  status: "open" | "pipeline" | "closed";
  location: string;
  band: string;
  summary: string;
};

type Application = {
  id: string;
  token: string;
  roleId: string;
  name: string;
  email: string;
  gate: Gate;
  submittedAt: string;
  updatedAt: string;
  source: string;
};

type RoleStatus = Role["status"];

type Finding = {
  observed: string;
  consequence: string;
  closing: string;
  evidence: string;
};

type DiagnosticPayload = {
  read: string;
  findings: Finding[];
  whatItTakes: string;
  limits: string;
};

type ScoreCard = {
  specificity: number;
  prioritisation: number;
  evidence: number;
  limits: number;
  estimation: number;
  writing: number;
};

type Diagnostic = {
  id: string;
  applicationId: string;
  token: string;
  variant: "atlas" | "marlow" | "oxide";
  openedAt: string | null;
  dueAt: string | null;
  submittedAt: string | null;
  payload: DiagnosticPayload | null;
  draft: DiagnosticPayload | null;
  scores: ScoreCard | null;
  reviewerIds: string[];
  reviewerNote: string | null;
};

type GateEvent = {
  id: string;
  applicationId: string;
  gate: Gate;
  outcome: string;
  occurredAt: string;
  noteInternal: string;
};

const nowIso = () => new Date().toISOString();

function makeToken(length = 16) {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
  let out = "";
  for (let i = 0; i < length; i += 1) {
    out += alphabet[Math.floor(Math.random() * alphabet.length)] ?? "";
  }
  return out;
}

const roles: Role[] = [
  {
    id: "fd-001",
    title: "Forward-Deployed Engineer",
    pod: "Delivery",
    status: "open",
    location: "Remote (PK timezone overlap)",
    band: "$2,600-$3,600 / month",
    summary: "Client-facing delivery work after Gate 4 only.",
  },
  {
    id: "qa-002",
    title: "QA Engineer",
    pod: "Delivery",
    status: "pipeline",
    location: "Remote",
    band: "$1,800-$2,400 / month",
    summary: "Pipeline role; hiring expected, applications not opened yet.",
  },
  {
    id: "ops-003",
    title: "People Ops Coordinator",
    pod: "Operations",
    status: "closed",
    location: "Lahore",
    band: "$1,200-$1,800 / month",
    summary: "Closed role.",
  },
];

const applications: Application[] = [
  {
    id: "app-001",
    token: "sT8pL2mQ4vY7kN1r",
    roleId: "fd-001",
    name: "Samira Noor",
    email: "samira@example.com",
    gate: 0,
    submittedAt: "2026-09-04T09:00:00.000Z",
    updatedAt: "2026-09-04T09:00:00.000Z",
    source: "careers",
  },
  {
    id: "app-002",
    token: "pL3nX9qR2tV6mK8c",
    roleId: "fd-001",
    name: "Ibrahim Yousaf",
    email: "ibrahim@example.com",
    gate: 0,
    submittedAt: "2026-08-24T10:30:00.000Z",
    updatedAt: "2026-08-24T10:30:00.000Z",
    source: "careers",
  },
];

const diagnostics: Diagnostic[] = [
  {
    id: "diag-001",
    applicationId: "app-001",
    token: "Q7m2Lc9rT4vN8xPw",
    variant: "atlas",
    openedAt: null,
    dueAt: null,
    submittedAt: null,
    payload: null,
    draft: {
      read: "Sample seeded read. Candidate started but has not submitted.",
      findings: [
        {
          observed: "POST /api/invite has no limiter.",
          consequence: "Invite brute-force can flood mail and abuse credits.",
          closing: "Add per-IP and per-email sliding window with hard floor.",
          evidence: "runtime.log line 44 and routes/invite.ts",
        },
        {
          observed: "Migration 014_backfill_tokens fails on rerun.",
          consequence: "Repeat deploys fail in CI and block release.",
          closing: "Make migration idempotent and guarded by existence checks.",
          evidence: "build.log line 77 and migrations/014_backfill_tokens.sql",
        },
        {
          observed: "PROD_API_KEY is required but not present in production env.",
          consequence: "Worker crashes on startup and queue backs up.",
          closing: "Set env in production and add startup guard with explicit error.",
          evidence: "runtime.log lines 8-15 and config/env.ts",
        },
      ],
      whatItTakes: "Two engineering days plus one QA pass with deploy rehearse.",
      limits: "I cannot verify auth callback behavior without the identity provider config.",
    },
    scores: null,
    reviewerIds: [],
    reviewerNote: null,
  },
  {
    id: "diag-002",
    applicationId: "app-002",
    token: "L8mQ2vT7cR4nP1xK",
    variant: "atlas",
    openedAt: "2026-08-24T11:00:00.000Z",
    dueAt: "2026-08-26T11:00:00.000Z",
    submittedAt: "2026-08-24T12:50:00.000Z",
    payload: {
      read: "Auth and invite paths are the launch blockers. Build is failing on a non-idempotent migration and runtime crashes from missing production env, so launch is blocked before feature quality discussion.",
      findings: [
        {
          observed: "POST /api/invite has no limiter and logs show spikes under pilot traffic.",
          consequence: "Mail abuse and credit burn are likely before launch.",
          closing: "Apply per-IP and per-email sliding limiter plus circuit-breaker threshold.",
          evidence: "runtime.log line 2 and app/routes/invite.ts",
        },
        {
          observed: "Migration 014 writes reset tokens without rerun guard and fails unique constraints.",
          consequence: "Repeat deploys break CI and block release.",
          closing: "Make migration idempotent and skip rows with existing token.",
          evidence: "build.log line 1 and migrations/014_backfill_tokens.sql",
        },
        {
          observed: "Worker boot throws on missing PROD_API_KEY in production.",
          consequence: "Queue processing crashes at startup and user emails do not send.",
          closing: "Set env at deploy target and add explicit startup health failure.",
          evidence: "runtime.log line 1 and app/config/env.ts",
        },
      ],
      whatItTakes:
        "Roughly two days for fixes and one day for deploy rehearsal and verification. Blocking work is migration fix, limiter, and production env hardening.",
      limits:
        "Could not verify callback branch behavior without identity provider test credentials and full auth logs.",
    },
    draft: null,
    scores: null,
    reviewerIds: [],
    reviewerNote: null,
  },
];

const gateEvents: GateEvent[] = [
  {
    id: "evt-001",
    applicationId: "app-001",
    gate: 0,
    outcome: "diagnostic sent",
    occurredAt: "2026-09-04T09:15:00.000Z",
    noteInternal: "Window starts when candidate opens token page.",
  },
  {
    id: "evt-002",
    applicationId: "app-002",
    gate: 0,
    outcome: "diagnostic submitted",
    occurredAt: "2026-08-24T12:50:00.000Z",
    noteInternal: "Borderline on estimation; second reviewer required.",
  },
];

const gateNames: Record<Gate, string> = {
  0: "Diagnostic",
  1: "Structured interview",
  2: "Paid work sample",
  3: "Blind peer review",
  4: "90 days supervised",
};

function getAppById(id: string) {
  return applications.find((item) => item.id === id) ?? null;
}

function getRoleById(id: string) {
  return roles.find((item) => item.id === id) ?? null;
}

function copyPayload(payload: DiagnosticPayload): DiagnosticPayload {
  return {
    read: payload.read,
    findings: payload.findings.map((item) => ({ ...item })),
    whatItTakes: payload.whatItTakes,
    limits: payload.limits,
  };
}

export function listRoles() {
  return roles.map((item) => ({ ...item }));
}

export function upsertRole(input: {
  id?: string;
  title: string;
  pod: string;
  status: RoleStatus;
  location: string;
  band: string;
  summary: string;
}) {
  const id = input.id?.trim() || `role-${roles.length + 1}`;
  const existing = roles.find((role) => role.id === id);
  if (existing) {
    existing.title = input.title;
    existing.pod = input.pod;
    existing.status = input.status;
    existing.location = input.location;
    existing.band = input.band;
    existing.summary = input.summary;
    return { ok: true as const, id, created: false as const };
  }

  roles.push({
    id,
    title: input.title,
    pod: input.pod,
    status: input.status,
    location: input.location,
    band: input.band,
    summary: input.summary,
  });

  return { ok: true as const, id, created: true as const };
}

export function createApplication(input: {
  roleId: string;
  name: string;
  email: string;
  source: string;
}) {
  const role = getRoleById(input.roleId);
  if (!role) {
    return { ok: false as const, error: "Role not found." };
  }

  const duplicate = applications.find(
    (application) =>
      application.roleId === input.roleId &&
      application.email.toLowerCase() === input.email.toLowerCase(),
  );
  if (duplicate) {
    return { ok: true as const, id: duplicate.id, token: duplicate.token, duplicate: true as const };
  }

  const id = `app-${applications.length + 1}`;
  const token = makeToken();
  const now = nowIso();
  applications.push({
    id,
    token,
    roleId: input.roleId,
    name: input.name,
    email: input.email,
    gate: 0,
    submittedAt: now,
    updatedAt: now,
    source: input.source,
  });

  gateEvents.push({
    id: `evt-${gateEvents.length + 1}`,
    applicationId: id,
    gate: 0,
    outcome: "applied",
    occurredAt: now,
    noteInternal: "Application received from careers page.",
  });

  return { ok: true as const, id, token, duplicate: false as const };
}

export function listRoleApplications() {
  return applications
    .map((application) => {
      const role = getRoleById(application.roleId);
      return {
        ...application,
        roleTitle: role?.title ?? "Role",
      };
    })
    .sort((left, right) => (left.submittedAt > right.submittedAt ? -1 : 1));
}

export function getDiagnosticByToken(token: string) {
  return diagnostics.find((item) => item.token === token) ?? null;
}

export function openDiagnostic(token: string) {
  const diagnostic = getDiagnosticByToken(token);
  if (!diagnostic) return null;
  if (!diagnostic.openedAt) {
    const opened = new Date();
    const due = new Date(opened.getTime() + 48 * 60 * 60 * 1000);
    diagnostic.openedAt = opened.toISOString();
    diagnostic.dueAt = due.toISOString();
  }
  return diagnostic;
}

function validatePayload(payload: DiagnosticPayload) {
  if (payload.read.trim().length < 80) {
    return "Initial read must be at least 80 characters.";
  }
  if (payload.findings.length < 3 || payload.findings.length > 5) {
    return "Diagnostic must include 3-5 findings.";
  }
  for (const finding of payload.findings) {
    if (
      finding.observed.trim().length < 30 ||
      finding.consequence.trim().length < 30 ||
      finding.closing.trim().length < 20 ||
      finding.evidence.trim().length < 10
    ) {
      return "Each finding must include observed, consequence, closing, and evidence with minimum detail.";
    }
  }
  if (payload.whatItTakes.trim().length < 40) {
    return "What-it-takes section must be at least 40 characters.";
  }
  if (payload.limits.trim().length < 20) {
    return "At least one explicit limit is required.";
  }
  return null;
}

export function saveDiagnosticDraft(token: string, payload: DiagnosticPayload) {
  const diagnostic = getDiagnosticByToken(token);
  if (!diagnostic) return { ok: false as const, error: "Diagnostic token not found." };
  if (diagnostic.submittedAt) {
    return { ok: false as const, error: "Diagnostic already submitted." };
  }
  diagnostic.draft = copyPayload(payload);
  return { ok: true as const };
}

export function submitDiagnostic(token: string, payload: DiagnosticPayload) {
  const diagnostic = getDiagnosticByToken(token);
  if (!diagnostic) return { ok: false as const, error: "Diagnostic token not found." };
  if (!diagnostic.openedAt || !diagnostic.dueAt) {
    openDiagnostic(token);
  }
  if (diagnostic.submittedAt) {
    return { ok: false as const, error: "Diagnostic already submitted." };
  }
  if (!diagnostic.dueAt || Date.now() > new Date(diagnostic.dueAt).getTime()) {
    return { ok: false as const, error: "Submission window has closed." };
  }
  const validation = validatePayload(payload);
  if (validation) return { ok: false as const, error: validation };

  diagnostic.payload = copyPayload(payload);
  diagnostic.submittedAt = nowIso();
  diagnostic.draft = copyPayload(payload);

  const app = getAppById(diagnostic.applicationId);
  if (app) {
    app.updatedAt = nowIso();
    gateEvents.push({
      id: `evt-${gateEvents.length + 1}`,
      applicationId: app.id,
      gate: app.gate,
      outcome: "diagnostic submitted",
      occurredAt: nowIso(),
      noteInternal: "Awaiting reviewer scoring.",
    });
  }
  return { ok: true as const };
}

export function getCandidateStatus(token: string) {
  const app = applications.find((item) => item.token === token) ?? null;
  if (!app) return null;
  const role = getRoleById(app.roleId);
  const events = gateEvents
    .filter((item) => item.applicationId === app.id)
    .map((item) => ({
      gate: item.gate,
      gateName: gateNames[item.gate],
      outcome: item.outcome,
      occurredAt: item.occurredAt,
    }))
    .sort((a, b) => (a.occurredAt < b.occurredAt ? -1 : 1));

  return {
    name: app.name,
    roleTitle: role?.title ?? "Role",
    gate: app.gate,
    gateName: gateNames[app.gate],
    updatedAt: app.updatedAt,
    events,
    next: app.gate === 0 ? "Awaiting diagnostic review." : "Awaiting next gate scheduling.",
  };
}

export function listAdminBoard() {
  return applications.map((app) => {
    const role = getRoleById(app.roleId);
    const daysInGate = Math.floor(
      (Date.now() - new Date(app.updatedAt).getTime()) / (1000 * 60 * 60 * 24),
    );
    const diagnostic = diagnostics.find((item) => item.applicationId === app.id) ?? null;
    return {
      id: app.id,
      name: app.name,
      role: role?.title ?? "Role",
      gate: app.gate,
      gateName: gateNames[app.gate],
      statusToken: app.token,
      diagnosticToken: diagnostic?.token ?? null,
      submittedAt: app.submittedAt,
      updatedAt: app.updatedAt,
      daysInGate,
      flagged: daysInGate > 7,
      hasSubmission: Boolean(diagnostic?.submittedAt),
    };
  });
}

export function getAdminDiagnostic(token: string) {
  const diagnostic = diagnostics.find((item) => item.token === token) ?? null;
  if (!diagnostic) return null;
  const app = getAppById(diagnostic.applicationId);
  if (!app) return null;
  return {
    diagnostic,
    app,
  };
}

export function scoreDiagnostic(
  token: string,
  scores: ScoreCard,
  reviewerId: string,
  note: string,
) {
  const item = diagnostics.find((diagnostic) => diagnostic.token === token);
  if (!item) return { ok: false as const, error: "Diagnostic not found." };
  item.scores = { ...scores };
  item.reviewerNote = note;
  if (!item.reviewerIds.includes(reviewerId)) {
    item.reviewerIds.push(reviewerId);
  }
  const app = getAppById(item.applicationId);
  if (app) {
    app.updatedAt = nowIso();
  }
  return { ok: true as const };
}

export function advanceGate(statusToken: string, nextGate: Gate, noteInternal: string) {
  const app = applications.find((item) => item.token === statusToken);
  if (!app) return { ok: false as const, error: "Application not found." };
  app.gate = nextGate;
  app.updatedAt = nowIso();
  gateEvents.push({
    id: `evt-${gateEvents.length + 1}`,
    applicationId: app.id,
    gate: nextGate,
    outcome: "advanced",
    occurredAt: nowIso(),
    noteInternal,
  });
  return { ok: true as const };
}

export const diagnosticRubric = [
  {
    key: "specificity",
    label: "Specificity",
    looksLike: "Findings name concrete files, logs, and behaviors.",
  },
  {
    key: "prioritisation",
    label: "Prioritisation",
    looksLike: "Ordering tracks launch blockers before secondary risks.",
  },
  {
    key: "evidence",
    label: "Evidence",
    looksLike: "Each claim maps to observable repo or log evidence.",
  },
  {
    key: "limits",
    label: "Limits",
    looksLike: "States unknowns explicitly and avoids false certainty.",
  },
  {
    key: "estimation",
    label: "Estimation",
    looksLike: "Scope and duration survive engineering scrutiny.",
  },
  {
    key: "writing",
    label: "Writing",
    looksLike: "A non-technical founder can act on it immediately.",
  },
] as const;

export const diagnosticScenarios = {
  atlas: {
    company: "Atlas Billing",
    brief:
      "Atlas is two weeks from launch. Sign-ups spike in pilot, the queue worker dies under load, and nobody trusts the reset flow.",
    tree: [
      "app/routes/invite.ts",
      "app/routes/reset.ts",
      "app/auth/session.ts",
      "app/config/env.ts",
      "migrations/014_backfill_tokens.sql",
      "workers/mail.worker.ts",
    ],
    keyFiles: {
      "app/routes/invite.ts": "export async function postInvite(req) { /* no limiter */ return sendInvite(req.body.email); }",
      "migrations/014_backfill_tokens.sql": "update users set reset_token = gen_random_uuid(); -- rerun duplicates",
      "app/config/env.ts": "if (!process.env.PROD_API_KEY) throw new Error('missing PROD_API_KEY');",
    },
    buildLog: [
      "[build] migration 014_backfill_tokens.sql failed: duplicate key value violates unique constraint",
      "[build] command failed with exit code 1",
    ],
    runtimeLog: [
      "[runtime] worker boot failed: missing PROD_API_KEY",
      "[runtime] invite endpoint p95 4.8s, 300 req/min with no limiter",
      "[runtime] auth trace ambiguous around reset token invalidation",
    ],
  },
  marlow: {
    company: "Marlow Clinic",
    brief: "Patient intake app with flaky deploy and unreadable auth callbacks.",
    tree: [],
    keyFiles: {},
    buildLog: [],
    runtimeLog: [],
  },
  oxide: {
    company: "Oxide Payroll",
    brief: "Payroll edge cases crash end-of-month close and alerting is missing.",
    tree: [],
    keyFiles: {},
    buildLog: [],
    runtimeLog: [],
  },
} as const;

export type DiagnosticPayloadInput = DiagnosticPayload;
export type RoleInput = Role;
