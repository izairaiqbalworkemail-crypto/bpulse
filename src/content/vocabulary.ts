/**
 * Platform vocabulary. Used identically on every public page.
 * A page that uses a term differently is a defect.
 */
export const vocabulary = {
  admitted: {
    term: "admitted",
    means: "cleared the standard",
    not: ["hired", "our team"],
  },
  assigned: {
    term: "assigned",
    means: "the platform put them on it",
    not: ["we picked"],
  },
  record: {
    term: "the record",
    means: "delivery history",
    not: ["portfolio", "case studies"],
  },
  engagement: {
    term: "engagement",
    means: "a piece of work",
    not: ["project"],
  },
  standing: {
    term: "standing",
    means: "current admission status",
    not: ["active"],
  },
  signals: {
    term: "signals",
    means: "failure patterns",
    not: ["skills", "tags"],
  },
} as const;

export const assignmentStatuses = ["assigned", "available", "limited"] as const;
export type AssignmentStatus = (typeof assignmentStatuses)[number];
