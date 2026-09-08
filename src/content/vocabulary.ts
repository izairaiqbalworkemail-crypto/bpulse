/**
 * Public words. Internal names stay in code, /studio, and /admin.
 * A page that uses an old term on the glass is a defect.
 */
export const vocabulary = {
  engineers: {
    term: "our engineers",
    means: "cleared the standard",
    not: ["admitted", "hired", "our team"],
  },
  assigned: {
    term: "assigned",
    means: "this person is on the work",
    not: ["we picked"],
  },
  work: {
    term: "our work",
    means: "finished cases",
    not: ["the record", "portfolio"],
  },
  project: {
    term: "project",
    means: "a piece of work",
    not: ["deployment", "engagement"],
  },
  available: {
    term: "available now",
    means: "can take new work",
    not: ["standing"],
  },
  found: {
    term: "what we found",
    means: "repeatable conditions we have already seen",
    not: ["signals", "tags"],
  },
} as const;

export const assignmentStatuses = ["assigned", "available", "limited"] as const;
export type AssignmentStatus = (typeof assignmentStatuses)[number];
