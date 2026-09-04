/**
 * Canonical Close-qualifying bands. One set everywhere.
 * Maps to the real Close range so the answer qualifies the lead.
 */
export const BUDGET_BANDS = [
  "under $18k",
  "$18k–$40k",
  "$40k–$95k",
  "$95k+",
  "not sure yet",
] as const;

export type BudgetBand = (typeof BUDGET_BANDS)[number];
