/**
 * Delivery contract.
 * `next build` sets NODE_ENV=production and imports API routes to collect
 * page data. Throwing on import there is what killed the Vercel compile
 * (`Failed to collect configuration for /api/contact`). Missing keys still
 * throw at runtime, once a request actually hits a function.
 */

const isProduction = process.env.NODE_ENV === "production";
const isBuild = process.env.NEXT_PHASE === "phase-production-build";

function required(name: string): string | undefined {
  const value = process.env[name];
  if (!value && isProduction && !isBuild) {
    throw new Error(
      `[boot] ${name} is not set. bpulse refuses to start in production without ` +
        `delivery and shared serverless state configured. Set ${name} and rebuild.`
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
  UPSTASH_REDIS_REST_URL: required("UPSTASH_REDIS_REST_URL"),
  UPSTASH_REDIS_REST_TOKEN: required("UPSTASH_REDIS_REST_TOKEN"),
  RESEND_FROM: process.env.RESEND_FROM ?? "bpulse <intake@bpulse.dev>",
  FOUNDER_EMAIL: process.env.FOUNDER_EMAIL ?? "contact@bpulse.dev",
};

export const hasDeliveryChannel = Boolean(env.DATABASE_URL && env.RESEND_API_KEY);
