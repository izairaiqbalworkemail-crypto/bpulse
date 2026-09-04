/**
 * Boot-time delivery contract. §8.6 of the old build moved this check from
 * boot to write-time, which meant a JSONL log always "succeeded" and the
 * failure became invisible. This module restores the boot-time contract:
 * in production, importing it without a delivery channel configured throws
 * and the build refuses to start. Local dev degrades to a console warning
 * so the app still runs without real credentials.
 */

const isProduction = process.env.NODE_ENV === "production";

function required(name: string): string | undefined {
  const value = process.env[name];
  if (!value && isProduction) {
    throw new Error(
      `[boot] ${name} is not set. bpulse refuses to start in production without a working ` +
        `lead-delivery channel — see AGENTS.md Phase 1. Set ${name} and rebuild.`
    );
  }
  if (!value) {
    console.warn(
      `[boot] ${name} is not set. Falling back to console logging for lead delivery — this is only acceptable in local dev.`
    );
  }
  return value;
}

export const env = {
  DATABASE_URL: required("DATABASE_URL"),
  RESEND_API_KEY: required("RESEND_API_KEY"),
  RESEND_FROM: process.env.RESEND_FROM ?? "bpulse <intake@bpulse.dev>",
  FOUNDER_EMAIL: process.env.FOUNDER_EMAIL ?? "contact@bpulse.dev",
};

export const hasDeliveryChannel = Boolean(env.DATABASE_URL && env.RESEND_API_KEY);
