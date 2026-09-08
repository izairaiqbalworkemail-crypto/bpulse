import { brand } from "@/config/brand";

export const siteNav = [
  { label: "Work", href: "/work" },
  { label: "Team", href: "/team" },
  { label: "Pricing", href: "/pricing" },
  { label: "Process", href: "/how-it-works" },
  { label: "Match", href: "/match" },
] as const;

export const cta = {
  label: "Get my free read",
  href: "/read",
};

export const edition = {
  /** Catalogue edition line, e.g. "No. 1". */
  no: "No. 1",
  /**
   * Publication month of this edition.
   * Update when a lot, specialist, offer, or public claim changes.
   * Month + year of that content edit — not the deploy date, not "today".
   */
  date: "September 2026",
  /** The catalogue's one-sentence remit. */
  description:
    "bpulse finishes the last twenty percent. What follows is the condition report on our own work: what was stuck, what was wrong, what it took.",
};

export const addressLine = `${brand.address.street}, ${brand.address.region}, ${brand.address.countryName}`;
