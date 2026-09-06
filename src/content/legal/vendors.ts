/**
 * Named sub-processors. One list. Privacy, DPA, /legal/data, /security,
 * and the sub-processor document all read from here.
 *
 * Regions are stated as we can verify them. A region we have not recorded
 * is not invented.
 */
export const subProcessors = [
  {
    name: "Vercel",
    entity: "Vercel Inc.",
    role: "Hosting and edge for this site and serverless functions",
    region: "US-incorporated. Deployment region is per project; not recorded as a single fixed region on this site.",
    data: "Site traffic, serverless logs, and whatever an intake request contains while it is being handled.",
  },
  {
    name: "Neon",
    entity: "Neon Inc.",
    role: "Managed Postgres for intake and application records",
    region: "US-incorporated. Region is fixed at project creation and cannot be changed later. The live project region must be written into Annex I before a DPA is executed.",
    data: "Intake submissions and stored application records when a database is configured.",
  },
  {
    name: "Upstash",
    entity: "Upstash Inc.",
    role: "Redis for rate limits and selected counters",
    region: "US-incorporated. Region not published as a single fixed location on this site.",
    data: "Request rate-limit keys and selected counters. Not a store of form answers.",
  },
  {
    name: "Resend",
    entity: "Resend Inc.",
    role: "Transactional email",
    region: "US-incorporated. Region not published as a single fixed location on this site.",
    data: "The email address and the contents of a filed intake, when delivery is configured.",
  },
] as const;

export const vendorNames = subProcessors.map((row) => row.name);
