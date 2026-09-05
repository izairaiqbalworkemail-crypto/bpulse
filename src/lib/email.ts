import { Resend } from "resend";

import { env } from "@/lib/env";

const resend = env.RESEND_API_KEY ? new Resend(env.RESEND_API_KEY) : null;

const LABELS: Record<string, string> = {
  type: "Intake type",
  with: "Direct line to",
  name: "Name",
  email: "Email",
  budget: "Budget",
  timeline: "Timeline",
  situation: "Situation",
  build: "What's blocking it",
  whatItIs: "What is the product",
  currentState: "Current state",
  whatsBlocking: "What's blocking it",
  codeLocation: "Repo / code location",
  stage: "Stage",
  spec: "Spec",
  progress: "Progress",
  access: "Access",
  mode: "Door",
  idea: "Idea",
  detail: "Detail",
  link: "Link",
  source: "How they found bpulse",
  clientId: "Session ref",
};

const SKIP_FIELDS = new Set(["website", "requestId"]);

function fieldRows(payload: Record<string, unknown>): string {
  return Object.entries(payload)
    .filter(([key, value]) => !SKIP_FIELDS.has(key) && value !== undefined && value !== "")
    .map(([key, value]) => {
      const label = LABELS[key] ?? key;
      const text = typeof value === "string" ? value : JSON.stringify(value);
      return `<tr><td style="padding:6px 12px 6px 0;color:#5a5a5a;vertical-align:top;white-space:nowrap;font-size:13px;">${escapeHtml(
        label
      )}</td><td style="padding:6px 0;font-size:14px;">${escapeHtml(text)}</td></tr>`;
    })
    .join("\n");
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export type SubmissionEmailInput = {
  type: string;
  payload: Record<string, unknown>;
  email?: string;
  requestId: string;
};

export async function sendSubmissionEmail(input: SubmissionEmailInput): Promise<void> {
  if (!resend) {
    console.warn(
      "[email] RESEND_API_KEY not set — logging submission to console instead of emailing.",
      input
    );
    return;
  }

  const subject = `New ${input.type} intake${input.email ? ` — ${input.email}` : ""}`;

  const html = `
    <div style="font-family:-apple-system,Helvetica,Arial,sans-serif;max-width:560px;">
      <p style="font-size:13px;color:#5a5a5a;margin:0 0 12px;">Request ${escapeHtml(
        input.requestId
      )}</p>
      <table style="border-collapse:collapse;width:100%;">
        ${fieldRows(input.payload)}
      </table>
    </div>
  `;

  const { error } = await resend.emails.send({
    from: env.RESEND_FROM,
    to: env.FOUNDER_EMAIL,
    replyTo: input.email || undefined,
    subject,
    html,
  });

  if (error) {
    throw new Error(`Resend send failed: ${error.message}`);
  }
}
