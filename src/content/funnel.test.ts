import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { cta, siteNav } from "../config/site";
import { footerNav, homeQuestions, pulseCopy, visibilityCopy, whereCopy } from "./home";
import { getDemoOverview } from "./demo";
import { findLot } from "./lots";
import { findSpecialist } from "./specialists";
import * as processCopy from "./process";

const root = resolve(import.meta.dirname, "../..");

describe("wave 1 funnel locks", () => {
  it("puts Work, Team, Pricing, Process, Match in the bar, and the Read as the action", () => {
    expect(siteNav.map((item) => item.label)).toEqual([
      "Work",
      "Team",
      "Pricing",
      "Process",
      "Match",
    ]);
    expect(cta).toEqual({ label: "Get my free read", href: "/read" });
  });

  it("lets a stranger repeat what the studio does from the first screen", () => {
    const claim = pulseCopy.claim
      .map((part) => (typeof part === "object" ? part.mark : part))
      .join("");
    expect(claim).toMatch(/stuck at 80%/);
    expect(pulseCopy.dek).toMatch(/last twenty percent/);
    expect(pulseCopy.primary).toBe("Get my free read");
    expect(pulseCopy.primaryHref).toBe("/read");
    expect(pulseCopy.secondaryHref).toBe("/work");
  });

  it("routes six situations, Read first and recommended, Close included", () => {
    expect(whereCopy.rows).toHaveLength(6);
    expect(whereCopy.rows[0]).toMatchObject({
      start: "The Read",
      href: "/read",
      recommended: true,
    });
    expect(whereCopy.rows.some((row) => row.start === "The Close")).toBe(true);
    expect(whereCopy.rows.some((row) => row.start === "Second Chair")).toBe(true);
    expect(whereCopy.rows.map((row) => row.href)).toEqual([
      "/read",
      "/session",
      "/first-slice",
      "/check",
      "/how-it-works",
      "/second-chair",
    ]);
    expect(whereCopy.rows.every((row) => row.href.startsWith("/"))).toBe(true);
    const whereSource = readFileSync(resolve(root, "src/components/home/Where.tsx"), "utf8");
    expect(whereSource).not.toMatch(/text-(stuck|diag|build|ship|gold)|bg-(stuck|diag|build|ship|gold)/);
  });

  it("shows a working sample without asking for anything", () => {
    const overview = getDemoOverview();
    expect(visibilityCopy.openHref).toBe("/demo");
    expect(visibilityCopy.open).toBe("Show me the sample");
    expect(visibilityCopy.revocationNote).toMatch(/in build/);
    expect(overview.daysElapsed).toBe(11);
    expect(overview.lockedDays).toBe(23);
    expect(overview.usedPct).toBe(48);
  });

  it("returns 404-ready empties for unknown work and team slugs", () => {
    expect(findLot("not-a-lot")).toBeUndefined();
    expect(findSpecialist("not-a-person")).toBeUndefined();
    expect(findLot("deepidv")?.client).toBe("DeepIDV");
    expect(findSpecialist("aneeb")?.name).toMatch(/Aneeb/);
  });

  it("puts the bad-at question first and lists the four footer columns", () => {
    expect(homeQuestions[0]?.q).toMatch(/bad at/);
    const links = [
      ...footerNav.work,
      ...footerNav.start,
      ...footerNav.company,
      ...footerNav.legal,
    ];
    expect(links.map((item) => item.label)).toEqual([
      "Work",
      "Team",
      "Process",
      "Match",
      "The Read",
      "The Session",
      "The Check",
      "The First Slice",
      "Pricing",
      "About",
      "The standard",
      "Careers",
      "Contact",
      "Legal",
      "Where data goes",
      "Terms",
      "Privacy",
    ]);
    expect(new Set(links.map((item) => item.href)).size).toBe(links.length);
  });

  it("does not publish a diagnostic token or a leftover $0 track", () => {
    expect("edpulseTracks" in processCopy).toBe(false);
    expect(readFileSync(resolve(root, "src/app/careers/page.tsx"), "utf8")).not.toMatch(
      /Q7m2Lc9rT4vN8xPw/,
    );
    expect(readFileSync(resolve(root, "src/lib/careers/store.ts"), "utf8")).not.toMatch(
      /Q7m2Lc9rT4vN8xPw/,
    );
    expect(readFileSync(resolve(root, "src/content/process.ts"), "utf8")).not.toMatch(/\$0/);
  });
});
