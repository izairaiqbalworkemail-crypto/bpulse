import { brand } from "@/config/brand";

export const siteNav = [
  { label: "Work", href: "/work" },
  { label: "Check", href: "/check" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Team", href: "/team" },
  { label: "Careers", href: "/careers" },
  { label: "About", href: "/about" },
  { label: "Notices", href: "/notices" },
  { label: "Contact", href: "/contact" },
] as const;

export const cta = {
  label: "Start with a check",
  href: "/check",
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
    "bpulse finishes the last twenty percent. What follows is the condition report on our own work — what arrived, what was wrong, what it took.",
};

export const addressLine = `${brand.address.street}, ${brand.address.region}, ${brand.address.countryName}`;
