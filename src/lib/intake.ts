import { appendFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";

export type IntakeType = "general" | "check" | "specialist" | "candidate";

export type IntakePayload = {
  type: IntakeType;
  context: {
    page: string;
    reportSlug?: string;
    lotSlug?: string;
    crewSlug?: string;
    source?: string;
  };
  contact: {
    name: string;
    email: string;
    company?: string;
    role?: string;
  };
  project?: {
    budget?: string;
    timeline?: string;
    state?: string;
    symptoms?: string[];
    whatsBlocking?: string;
  };
  candidate?: {
    track: "candidate" | "pitch";
    portfolioUrl?: string;
    cvUrl?: string;
    skills?: string[];
  };
  message?: string;
  honeypot?: string;
};

export type IntakeRecord = {
  id: string;
  receivedAt: string;
  ip: string;
  userAgent: string;
  payload: IntakePayload;
};

type ValidationResult =
  | { ok: true; value: IntakePayload }
  | { ok: false; issues: string[] };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const rateWindowMs = 10 * 60 * 1000;
const rateMax = 8;
const bucket = new Map<string, number[]>();

function ensureString(value: unknown, label: string, issues: string[]) {
  if (typeof value !== "string" || value.trim() === "") {
    issues.push(`${label} is required`);
    return "";
  }
  return value.trim();
}

function ensureOptionalString(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed === "" ? undefined : trimmed;
}

function validateTypeSpecific(payload: IntakePayload, issues: string[]) {
  if (payload.type === "specialist" && !payload.context.crewSlug) {
    issues.push("context.crewSlug is required for specialist intake");
  }

  if (payload.type === "candidate") {
    if (!payload.candidate) {
      issues.push("candidate object is required for candidate intake");
      return;
    }
    if (!payload.candidate.track) {
      issues.push("candidate.track is required");
    }
  }

  if (payload.type === "check") {
    if (!payload.project?.state) {
      issues.push("project.state is required for check intake");
    }
    if (!payload.project?.whatsBlocking) {
      issues.push("project.whatsBlocking is required for check intake");
    }
  }
}

export function validateIntakePayload(input: unknown): ValidationResult {
  const issues: string[] = [];
  if (!input || typeof input !== "object") {
    return { ok: false, issues: ["payload must be an object"] };
  }

  const raw = input as Record<string, unknown>;
  const type = raw.type;
  if (
    type !== "general" &&
    type !== "check" &&
    type !== "specialist" &&
    type !== "candidate"
  ) {
    issues.push("type must be one of: general, check, specialist, candidate");
  }

  const contextRaw = (raw.context ?? {}) as Record<string, unknown>;
  const contactRaw = (raw.contact ?? {}) as Record<string, unknown>;
  const projectRaw = (raw.project ?? {}) as Record<string, unknown>;
  const candidateRaw = (raw.candidate ?? {}) as Record<string, unknown>;

  const page = ensureString(contextRaw.page, "context.page", issues);
  const name = ensureString(contactRaw.name, "contact.name", issues);
  const email = ensureString(contactRaw.email, "contact.email", issues);
  if (email && !emailPattern.test(email)) {
    issues.push("contact.email must be valid");
  }

  const payload: IntakePayload = {
    type: (type as IntakeType) ?? "general",
    context: {
      page,
      reportSlug: ensureOptionalString(contextRaw.reportSlug),
      lotSlug: ensureOptionalString(contextRaw.lotSlug),
      crewSlug: ensureOptionalString(contextRaw.crewSlug),
      source: ensureOptionalString(contextRaw.source),
    },
    contact: {
      name,
      email,
      company: ensureOptionalString(contactRaw.company),
      role: ensureOptionalString(contactRaw.role),
    },
    project: {
      budget: ensureOptionalString(projectRaw.budget),
      timeline: ensureOptionalString(projectRaw.timeline),
      state: ensureOptionalString(projectRaw.state),
      whatsBlocking: ensureOptionalString(projectRaw.whatsBlocking),
      symptoms: Array.isArray(projectRaw.symptoms)
        ? projectRaw.symptoms.filter((item): item is string => typeof item === "string")
        : undefined,
    },
    candidate: {
      track:
        candidateRaw.track === "pitch" ? "pitch" : "candidate",
      portfolioUrl: ensureOptionalString(candidateRaw.portfolioUrl),
      cvUrl: ensureOptionalString(candidateRaw.cvUrl),
      skills: Array.isArray(candidateRaw.skills)
        ? candidateRaw.skills.filter((item): item is string => typeof item === "string")
        : undefined,
    },
    message: ensureOptionalString(raw.message),
    honeypot: ensureOptionalString(raw.honeypot),
  };

  if (payload.honeypot) {
    issues.push("honeypot must be empty");
  }

  validateTypeSpecific(payload, issues);

  if (issues.length > 0) return { ok: false, issues };
  return { ok: true, value: payload };
}

export function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (bucket.get(ip) ?? []).filter((stamp) => now - stamp < rateWindowMs);
  if (recent.length >= rateMax) {
    bucket.set(ip, recent);
    return true;
  }
  recent.push(now);
  bucket.set(ip, recent);
  return false;
}

export interface IntakeDelivery {
  deliver(record: IntakeRecord): Promise<void>;
}

class EmailDelivery implements IntakeDelivery {
  constructor(private webhookUrl: string) {}

  async deliver(record: IntakeRecord) {
    const response = await fetch(this.webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subject: `[bpulse intake] ${record.payload.type} · ${record.payload.contact.name}`,
        record,
      }),
    });

    if (!response.ok) {
      throw new Error(`email delivery failed: ${response.status}`);
    }
  }
}

class AppendOnlyLogDelivery implements IntakeDelivery {
  constructor(private filePath: string) {}

  async deliver(record: IntakeRecord) {
    await mkdir(dirname(this.filePath), { recursive: true });
    await appendFile(this.filePath, JSON.stringify(record) + "\n", {
      encoding: "utf8",
      flag: "a",
    });
  }
}

class CompositeDelivery implements IntakeDelivery {
  constructor(private sinks: IntakeDelivery[]) {}

  async deliver(record: IntakeRecord) {
    for (const sink of this.sinks) {
      await sink.deliver(record);
    }
  }
}

export function assertIntakeDeliveryConfig() {
  if (process.env.NODE_ENV !== "production") return;
  if (!process.env.INTAKE_EMAIL_WEBHOOK_URL || !process.env.INTAKE_LOG_PATH) {
    throw new Error(
      "INTAKE delivery misconfigured: set INTAKE_EMAIL_WEBHOOK_URL and INTAKE_LOG_PATH in production"
    );
  }
}

export function getIntakeDelivery(): IntakeDelivery {
  const webhookUrl = process.env.INTAKE_EMAIL_WEBHOOK_URL;
  const logPath = process.env.INTAKE_LOG_PATH;
  if (!webhookUrl || !logPath) {
    throw new Error(
      "INTAKE delivery unavailable: missing INTAKE_EMAIL_WEBHOOK_URL or INTAKE_LOG_PATH"
    );
  }
  return new CompositeDelivery([
    new EmailDelivery(webhookUrl),
    new AppendOnlyLogDelivery(logPath),
  ]);
}
