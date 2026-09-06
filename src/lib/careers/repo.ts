import { and, asc, desc, eq, sql } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { applications, diagnostics, gateEvents, roles } from "@/lib/db/schema";
import { env } from "@/lib/env";
import {
  advanceGate,
  createApplication,
  getAdminDiagnostic,
  getCandidateStatus,
  getDiagnosticByToken,
  listAdminBoard,
  listRoleApplications,
  listRoles,
  openDiagnostic,
  saveDiagnosticDraft,
  scoreDiagnostic,
  submitDiagnostic,
  upsertRole,
  type DiagnosticPayloadInput,
} from "@/lib/careers/store";

type ScoreCard = {
  specificity: number;
  prioritisation: number;
  evidence: number;
  limits: number;
  estimation: number;
  writing: number;
};

type Gate = 0 | 1 | 2 | 3 | 4;
type RoleStatus = "open" | "pipeline" | "closed";

export type JobPostInput = {
  id?: string;
  title: string;
  pod: string;
  status: RoleStatus;
  location: string;
  band: string;
  summary: string;
};

export type JobApplicationInput = {
  roleId: string;
  name: string;
  email: string;
  source: string;
};

let seeded = false;
let dbCareersReady: boolean | null = null;

async function canUseDbCareers(): Promise<boolean> {
  if (!env.DATABASE_URL) return false;
  if (dbCareersReady !== null) return dbCareersReady;

  try {
    await getDb()
      .select({ c: sql<number>`count(*)` })
      .from(roles)
      .limit(1);
    dbCareersReady = true;
    return true;
  } catch (error) {
    if (isMissingRelationError(error)) {
      dbCareersReady = false;
      console.warn("[careers-repo] careers tables missing, using in-memory fallback");
      return false;
    }
    throw error;
  }
}

async function ensureSeeded() {
  if (seeded || !env.DATABASE_URL) return;
  const db = getDb();
  const count = await db
    .select({ c: sql<number>`count(*)` })
    .from(roles)
    .limit(1);
  if ((count[0]?.c ?? 0) > 0) {
    seeded = true;
    return;
  }

  await db.insert(roles).values([
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
  ]);

  await db.insert(applications).values([
    {
      id: "app-001",
      token: "sT8pL2mQ4vY7kN1r",
      roleId: "fd-001",
      name: "Samira Noor",
      email: "samira@example.com",
      gate: "0",
      submittedAt: new Date("2026-09-04T09:00:00.000Z"),
      updatedAt: new Date("2026-09-04T09:00:00.000Z"),
      source: "careers",
    },
    {
      id: "app-002",
      token: "pL3nX9qR2tV6mK8c",
      roleId: "fd-001",
      name: "Ibrahim Yousaf",
      email: "ibrahim@example.com",
      gate: "0",
      submittedAt: new Date("2026-08-24T10:30:00.000Z"),
      updatedAt: new Date("2026-08-24T10:30:00.000Z"),
      source: "careers",
    },
  ]);

  await db.insert(diagnostics).values([
    {
      id: "diag-001",
      applicationId: "app-001",
      token: "Q7m2Lc9rT4vN8xPw",
      variant: "atlas",
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
      openedAt: new Date("2026-08-24T11:00:00.000Z"),
      dueAt: new Date("2026-08-26T11:00:00.000Z"),
      submittedAt: new Date("2026-08-24T12:50:00.000Z"),
      payload: {
        read: "Auth and invite paths are the launch blockers.",
        findings: [],
        whatItTakes: "Two days fixes and one day rehearsal.",
        limits: "Could not verify callback branch behavior without IdP credentials.",
      },
      draft: null,
      scores: null,
      reviewerIds: [],
      reviewerNote: null,
    },
  ]);

  await db.insert(gateEvents).values([
    {
      id: "evt-001",
      applicationId: "app-001",
      gate: "0",
      outcome: "diagnostic sent",
      occurredAt: new Date("2026-09-04T09:15:00.000Z"),
      noteInternal: "Window starts when candidate opens token page.",
    },
    {
      id: "evt-002",
      applicationId: "app-002",
      gate: "0",
      outcome: "diagnostic submitted",
      occurredAt: new Date("2026-08-24T12:50:00.000Z"),
      noteInternal: "Borderline on estimation; second reviewer required.",
    },
  ]);

  seeded = true;
}

export async function listRolesData() {
  if (!(await canUseDbCareers())) return listRoles();
  await ensureSeeded();
  return getDb().select().from(roles).orderBy(asc(roles.title));
}

export async function upsertRoleData(input: JobPostInput) {
  if (!(await canUseDbCareers())) return upsertRole(input);
  await ensureSeeded();

  const id = input.id?.trim() || `role-${crypto.randomUUID()}`;
  await getDb()
    .insert(roles)
    .values({
      id,
      title: input.title,
      pod: input.pod,
      status: input.status,
      location: input.location,
      band: input.band,
      summary: input.summary,
    })
    .onConflictDoUpdate({
      target: roles.id,
      set: {
        title: input.title,
        pod: input.pod,
        status: input.status,
        location: input.location,
        band: input.band,
        summary: input.summary,
      },
    });

  return { ok: true as const, id };
}

export async function createApplicationData(input: JobApplicationInput) {
  if (!(await canUseDbCareers())) return createApplication(input);
  await ensureSeeded();

  const [role] = await getDb().select({ id: roles.id, status: roles.status }).from(roles).where(eq(roles.id, input.roleId)).limit(1);
  if (!role) return { ok: false as const, error: "Role not found." };
  if (role.status !== "open") return { ok: false as const, error: "Role is not open for applications." };

  const [duplicate] = await getDb()
    .select({ id: applications.id, token: applications.token })
    .from(applications)
    .where(and(eq(applications.roleId, input.roleId), eq(applications.email, input.email)))
    .limit(1);
  if (duplicate) {
    return { ok: true as const, id: duplicate.id, token: duplicate.token, duplicate: true as const };
  }

  const id = `app-${crypto.randomUUID()}`;
  const token = createToken(16);
  const now = new Date();
  await getDb().insert(applications).values({
    id,
    token,
    roleId: input.roleId,
    name: input.name,
    email: input.email,
    gate: "0",
    submittedAt: now,
    updatedAt: now,
    source: input.source,
  });

  await getDb().insert(gateEvents).values({
    id: `evt-${crypto.randomUUID()}`,
    applicationId: id,
    gate: "0",
    outcome: "applied",
    occurredAt: now,
    noteInternal: "Application received from careers page.",
  });

  return { ok: true as const, id, token, duplicate: false as const };
}

export async function listJobsWithCandidatesData() {
  if (!(await canUseDbCareers())) {
    const allRoles = listRoles();
    const roleApps = listRoleApplications();
    return allRoles.map((role) => {
      const candidates = roleApps.filter((application) => application.roleId === role.id);
      return {
        ...role,
        candidates: candidates.map((candidate) => ({
          id: candidate.id,
          name: candidate.name,
          email: candidate.email,
          gate: candidate.gate,
          submittedAt: candidate.submittedAt,
          statusToken: candidate.token,
        })),
      };
    });
  }

  await ensureSeeded();
  const [roleRows, appRows] = await Promise.all([
    getDb().select().from(roles).orderBy(asc(roles.title)),
    getDb().select().from(applications).orderBy(desc(applications.submittedAt)),
  ]);

  return roleRows.map((role) => {
    const candidates = appRows.filter((application) => application.roleId === role.id);
    return {
      id: role.id,
      title: role.title,
      pod: role.pod,
      status: role.status as RoleStatus,
      location: role.location,
      band: role.band,
      summary: role.summary,
      candidates: candidates.map((candidate) => ({
        id: candidate.id,
        name: candidate.name,
        email: candidate.email,
        gate: Number(candidate.gate),
        submittedAt: candidate.submittedAt.toISOString(),
        statusToken: candidate.token,
      })),
    };
  });
}

export async function getDiagnosticByTokenData(token: string) {
  if (!(await canUseDbCareers())) return getDiagnosticByToken(token);
  await ensureSeeded();
  const [row] = await getDb().select().from(diagnostics).where(eq(diagnostics.token, token)).limit(1);
  return row ?? null;
}

export async function openDiagnosticData(token: string) {
  if (!(await canUseDbCareers())) return openDiagnostic(token);
  await ensureSeeded();
  const row = await getDiagnosticByTokenData(token);
  if (!row) return null;
  if (!row.openedAt) {
    const openedAt = new Date();
    const dueAt = new Date(openedAt.getTime() + 48 * 60 * 60 * 1000);
    await getDb()
      .update(diagnostics)
      .set({ openedAt, dueAt })
      .where(eq(diagnostics.token, token));
    return {
      ...row,
      openedAt: openedAt.toISOString(),
      dueAt: dueAt.toISOString(),
      submittedAt: row.submittedAt ? toIso(row.submittedAt) : null,
      payload: row.payload as DiagnosticPayloadInput | null,
      draft: row.draft as DiagnosticPayloadInput | null,
    };
  }
  return {
    ...row,
    openedAt: row.openedAt ? toIso(row.openedAt) : null,
    dueAt: row.dueAt ? toIso(row.dueAt) : null,
    submittedAt: row.submittedAt ? toIso(row.submittedAt) : null,
    payload: row.payload as DiagnosticPayloadInput | null,
    draft: row.draft as DiagnosticPayloadInput | null,
  };
}

export async function saveDiagnosticDraftData(token: string, payload: DiagnosticPayloadInput) {
  if (!(await canUseDbCareers())) return saveDiagnosticDraft(token, payload);
  await ensureSeeded();
  const [updated] = await getDb()
    .update(diagnostics)
    .set({ draft: payload })
    .where(and(eq(diagnostics.token, token), sql`${diagnostics.submittedAt} is null`))
    .returning({ id: diagnostics.id });
  return updated ? { ok: true as const } : { ok: false as const, error: "Diagnostic not found or submitted." };
}

export async function submitDiagnosticData(token: string, payload: DiagnosticPayloadInput) {
  if (!(await canUseDbCareers())) return submitDiagnostic(token, payload);
  await ensureSeeded();
  const row = await openDiagnosticData(token);
  if (!row) return { ok: false as const, error: "Diagnostic token not found." };
  if (row.submittedAt) return { ok: false as const, error: "Diagnostic already submitted." };
  if (!row.dueAt || Date.now() > new Date(row.dueAt).getTime()) {
    return { ok: false as const, error: "Submission window has closed." };
  }

  await getDb()
    .update(diagnostics)
    .set({
      payload,
      draft: payload,
      submittedAt: new Date(),
    })
    .where(eq(diagnostics.token, token));

  const [app] = await getDb().select().from(applications).where(eq(applications.id, row.applicationId)).limit(1);
  if (app) {
    await getDb().update(applications).set({ updatedAt: new Date() }).where(eq(applications.id, app.id));
    await getDb().insert(gateEvents).values({
      id: `evt-${crypto.randomUUID()}`,
      applicationId: app.id,
      gate: app.gate,
      outcome: "diagnostic submitted",
      occurredAt: new Date(),
      noteInternal: "Awaiting reviewer scoring.",
    });
  }

  return { ok: true as const };
}

export async function getCandidateStatusData(token: string) {
  if (!(await canUseDbCareers())) return getCandidateStatus(token);
  await ensureSeeded();
  const [app] = await getDb().select().from(applications).where(eq(applications.token, token)).limit(1);
  if (!app) return null;
  const [role] = await getDb().select().from(roles).where(eq(roles.id, app.roleId)).limit(1);
  const events = await getDb()
    .select()
    .from(gateEvents)
    .where(eq(gateEvents.applicationId, app.id))
    .orderBy(asc(gateEvents.occurredAt));
  return {
    name: app.name,
    roleTitle: role?.title ?? "Role",
    gate: Number(app.gate),
    gateName: gateName(Number(app.gate) as Gate),
    updatedAt: app.updatedAt.toISOString(),
    events: events.map((event) => ({
      gate: Number(event.gate),
      gateName: gateName(Number(event.gate) as Gate),
      outcome: event.outcome,
      occurredAt: event.occurredAt.toISOString(),
    })),
    next: Number(app.gate) === 0 ? "Awaiting diagnostic review." : "Awaiting next gate scheduling.",
  };
}

export async function listAdminBoardData() {
  if (!(await canUseDbCareers())) return listAdminBoard();
  await ensureSeeded();
  const apps = await getDb().select().from(applications).orderBy(desc(applications.updatedAt));
  const diagnosticsRows = await getDb().select().from(diagnostics);
  const roleRows = await getDb().select().from(roles);
  const roleMap = new Map(roleRows.map((row) => [row.id, row]));
  const diagMap = new Map(diagnosticsRows.map((row) => [row.applicationId, row]));

  return apps.map((app) => {
    const role = roleMap.get(app.roleId);
    const diagnostic = diagMap.get(app.id) ?? null;
    const daysInGate = Math.floor((Date.now() - app.updatedAt.getTime()) / (1000 * 60 * 60 * 24));
    return {
      id: app.id,
      name: app.name,
      role: role?.title ?? "Role",
      gate: Number(app.gate),
      gateName: gateName(Number(app.gate) as Gate),
      statusToken: app.token,
      diagnosticToken: diagnostic?.token ?? null,
      submittedAt: app.submittedAt.toISOString(),
      updatedAt: app.updatedAt.toISOString(),
      daysInGate,
      flagged: daysInGate > 7,
      hasSubmission: Boolean(diagnostic?.submittedAt),
    };
  });
}

export async function getDiagnosticContextData(token: string) {
  const board = await listAdminBoardData();
  const row = board.find((item) => item.diagnosticToken === token) ?? null;
  if (!row) return null;
  return {
    candidateName: row.name,
    roleTitle: row.role,
    gateName: row.gateName,
    statusToken: row.statusToken,
    submittedAt: row.submittedAt,
    updatedAt: row.updatedAt,
  };
}

export async function getAdminDiagnosticData(token: string) {
  if (!(await canUseDbCareers())) return getAdminDiagnostic(token);
  await ensureSeeded();
  const [diagnostic] = await getDb().select().from(diagnostics).where(eq(diagnostics.token, token)).limit(1);
  if (!diagnostic) return null;
  const [app] = await getDb().select().from(applications).where(eq(applications.id, diagnostic.applicationId)).limit(1);
  if (!app) return null;
  return {
    diagnostic: {
      ...diagnostic,
      openedAt: diagnostic.openedAt ? toIso(diagnostic.openedAt) : null,
      dueAt: diagnostic.dueAt ? toIso(diagnostic.dueAt) : null,
      submittedAt: diagnostic.submittedAt ? toIso(diagnostic.submittedAt) : null,
      payload: diagnostic.payload as DiagnosticPayloadInput | null,
      draft: diagnostic.draft as DiagnosticPayloadInput | null,
    },
    app,
  };
}

export async function scoreDiagnosticData(
  token: string,
  scores: ScoreCard,
  reviewerId: string,
  note: string,
) {
  if (!(await canUseDbCareers())) {
    return scoreDiagnostic(token, scores, reviewerId, note);
  }
  await ensureSeeded();
  const [current] = await getDb().select().from(diagnostics).where(eq(diagnostics.token, token)).limit(1);
  if (!current) return { ok: false as const, error: "Diagnostic not found." };
  const reviewerIds = Array.isArray(current.reviewerIds)
    ? (current.reviewerIds as string[])
    : [];
  if (!reviewerIds.includes(reviewerId)) reviewerIds.push(reviewerId);

  await getDb()
    .update(diagnostics)
    .set({ scores, reviewerIds, reviewerNote: note })
    .where(eq(diagnostics.token, token));
  await getDb()
    .update(applications)
    .set({ updatedAt: new Date() })
    .where(eq(applications.id, current.applicationId));
  return { ok: true as const };
}

export async function advanceGateData(statusToken: string, nextGate: Gate, noteInternal: string) {
  if (!(await canUseDbCareers())) {
    return advanceGate(statusToken, nextGate, noteInternal);
  }
  await ensureSeeded();
  const [app] = await getDb().select().from(applications).where(eq(applications.token, statusToken)).limit(1);
  if (!app) return { ok: false as const, error: "Application not found." };
  await getDb()
    .update(applications)
    .set({ gate: String(nextGate), updatedAt: new Date() })
    .where(eq(applications.id, app.id));
  await getDb().insert(gateEvents).values({
    id: `evt-${crypto.randomUUID()}`,
    applicationId: app.id,
    gate: String(nextGate),
    outcome: "advanced",
    occurredAt: new Date(),
    noteInternal,
  });
  return { ok: true as const };
}

function gateName(gate: Gate): string {
  if (gate === 0) return "Diagnostic";
  if (gate === 1) return "Structured interview";
  if (gate === 2) return "Paid work sample";
  if (gate === 3) return "Blind peer review";
  return "90 days supervised";
}

function toIso(value: string | Date): string {
  return value instanceof Date ? value.toISOString() : new Date(value).toISOString();
}

function createToken(length: number): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
  let token = "";
  for (let i = 0; i < length; i += 1) {
    const index = Math.floor(Math.random() * alphabet.length);
    token += alphabet[index] ?? "A";
  }
  return token;
}

function isMissingRelationError(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;

  const candidate = error as {
    code?: string;
    cause?: { code?: string };
  };
  return candidate.code === "42P01" || candidate.cause?.code === "42P01";
}
