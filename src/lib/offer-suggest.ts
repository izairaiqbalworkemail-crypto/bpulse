import { whereCopy } from "@/content/home";
import { ladder } from "@/content/ladder";
import { hasTerm } from "@/lib/match/normalize";

export type SuggestState = {
  error: string | null;
  start: string | null;
  href: string | null;
  price: string | null;
  meter: string | null;
  because: string | null;
  ask: string | null;
  person: string | null;
  role: string | null;
};

export const emptySuggest: SuggestState = {
  error: null,
  start: null,
  href: null,
  price: null,
  meter: null,
  because: null,
  ask: null,
  person: null,
  role: null,
};

const RULES = [
  {
    href: "/second-chair",
    terms: [
      "maintain",
      "cannot maintain",
      "second chair",
      "standing",
      "after launch",
      "already shipped",
    ],
  },
  {
    href: "/how-it-works",
    terms: ["deadline", "fixed scope", "finished scope", "close"],
  },
  {
    href: "/first-slice",
    terms: ["prototype", "must become real", "no production", "mvp"],
  },
  {
    href: "/session",
    terms: ["idea", "no code", "not built", "blank"],
  },
  {
    href: "/check",
    terms: [
      "will not ship",
      "cannot ship",
      "staging",
      "on staging",
      "stuck",
      "leftover",
      "last twenty",
      "eighty percent",
      "80%",
      "90%",
      "ninety percent",
      "will not deploy",
    ],
  },
] as const;

export function askFor(href: string) {
  if (href === "/session") return "Reserve my Session";
  if (href === "/check") return "Reserve my Check";
  if (href === "/first-slice") return "Start my First Slice";
  if (href === "/how-it-works") return "Show me the Close";
  if (href === "/second-chair") return "Show me Second Chair";
  return "Get my free read";
}

export function suggestOffer(description: string, pickHref?: string) {
  const picked = pickHref
    ? whereCopy.rows.find((item) => item.href === pickHref)
    : undefined;
  const hit = picked
    ? undefined
    : RULES.find((rule) =>
        rule.terms.some((term) => hasTerm(description, term)),
      );
  const row =
    picked ??
    whereCopy.rows.find((item) => item.href === (hit?.href ?? "/read")) ??
    whereCopy.rows[0];
  const offer = ladder.find((item) => item.href === row.href) ?? ladder[0];
  return { row, offer };
}
