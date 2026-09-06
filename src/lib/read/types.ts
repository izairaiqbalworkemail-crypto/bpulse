export type ReadPattern = {
  claim: string;
  lotSlug: string;
  lotName: string;
  count: number;
  of: number;
};

export type PreliminaryRead = {
  token: string;
  preparedAt: string;
  title: string;
  told: string;
  pattern: ReadPattern | null;
  lookFirst: string[];
  limits: string;
  checkLine: string;
  answers: Record<string, string>;
  source: "check-intake" | "read";
};
