import { lots } from "@/content/lots";
import type { EntryState, IndexProject, Lot, RailStage } from "@/content/types";
import { closeStages } from "@/content/process";

/**
 * Fifteen index rows from the old projects.json.
 * Client, one line, stack, link and year only where the source has them.
 * No screenshots, no figures, no extra narrative.
 */
export const indexProjects: IndexProject[] = [
  {
    id: "dubizzle",
    client: "Dubizzle",
    line: "Delivery support across one of the largest classified marketplace ecosystems.",
    stack: "Large-scale marketplace",
    url: "https://www.dubizzle.com",
    entryState: "taken over mid-flight",
  },
  {
    id: "third-app",
    client: "Third App",
    line: "Privacy-first mobile app helping women document incidents safely and export records when they choose.",
    stack: "Mobile product + secure records",
    url: "https://www.thirdapp.co/",
    year: "2021",
    entryState: "from blank canvas",
  },
  {
    id: "jovy",
    client: "Jovy",
    line: "Wedding planning platform deployed on Railway and available at hellojovy.ai.",
    stack: "Web app on Railway",
    url: "https://hellojovy.ai",
    entryState: "from blank canvas",
  },
  {
    id: "boolerize",
    client: "Boolerize",
    line: "A SaaS boolean-search toolkit recruiters reach for daily to build precise search strings.",
    stack: "Recruiting tooling",
    url: "https://boolerize.com",
    entryState: "from blank canvas",
  },
  {
    id: "noti",
    client: "Noti.io",
    line: "A Telegram bot wired through Web3.js so traders can snipe newly launched tokens.",
    stack: "Web3",
    url: "https://app.noti.io",
    entryState: "from blank canvas",
  },
  {
    id: "foodkarma",
    client: "FoodKarma",
    line: "Food delivery and cafe presence platform operating across the UAE.",
    stack: "Food commerce",
    url: "https://foodkarma.ae",
    entryState: "taken over mid-flight",
  },
  {
    id: "indoorgis",
    client: "IndoorGIS",
    line: "Navigation and asset management across a real building.",
    stack: "Mapping",
    entryState: "from blank canvas",
  },
  {
    id: "nexacare",
    client: "NexaCareTech",
    line: "Home care platform built on Next.js, Node, PostgreSQL, AWS, and the Claude API.",
    stack: "Healthcare SaaS",
    entryState: "entered unfinished",
  },
  {
    id: "cutlio",
    client: "Cutlio",
    line: "Feature development and platform support across frontend and serverless backend components.",
    stack: "Vite, React, TypeScript, Azure Functions, Cosmos DB",
    entryState: "taken over mid-flight",
  },
  {
    id: "cosell",
    client: "Cosell",
    line: "Ecommerce operations and app stack support on a mature Rails ecosystem.",
    stack: "Rails, PostgreSQL, Redis, Sidekiq, Shopify",
    entryState: "taken over mid-flight",
  },
  {
    id: "logistics",
    client: "Logistics Platform",
    line: "Logistics platform delivered on Railway with payments and backend architecture.",
    stack: "Node, PostgreSQL, Stripe, Railway",
    entryState: "from blank canvas",
  },
  {
    id: "joseph-platforms",
    client: "Joseph Kim",
    line: "Dual platform engagement including Solana-based escrow mechanics.",
    stack: "Solana escrow architecture",
    entryState: "taken over mid-flight",
  },
  {
    id: "uvel",
    client: "UVEL",
    line: "Ride-sharing product engagement delivered milestone by milestone.",
    stack: "Milestone delivery",
    entryState: "taken over mid-flight",
  },
  {
    id: "wayne-engagement",
    client: "Wayne Scholar",
    line: "Delivery support across CounselOS, BlueSky, CattleVerify, PilotLedger, SignalFoundry, and Verity.",
    stack: "Multi-product delivery",
    entryState: "taken over mid-flight",
  },
  {
    id: "treewallet",
    client: "Faizan",
    line: "A self-custody crypto wallet with portfolio tracking, cross-chain balances, and one-tap swaps.",
    stack: "React Native + Node + on-chain",
    entryState: "entered unfinished",
  },
];

/**
 * Old work-page rule: delivery → mid-flight; timeline contains ongoing →
 * unfinished; else blank canvas. Applied here from the source records.
 */
export const lotEntryState: Record<string, EntryState> = {
  deepidv: "entered unfinished",
  sully: "entered unfinished",
  myusta: "from blank canvas",
  wearmeout: "taken over mid-flight",
  "mythos-archive": "from blank canvas",
  sba504: "from blank canvas",
  clearance: "taken over mid-flight",
  evidero: "taken over mid-flight",
  fullscript: "entered unfinished",
};

/** Furthest Close stage we can infer from the lot's own status line. */
export const lotCloseStage: Record<
  string,
  (typeof closeStages)[number]["id"]
> = {
  deepidv: "standing",
  sully: "standing",
  myusta: "handover",
  wearmeout: "handover",
  "mythos-archive": "handover",
  sba504: "handover",
  clearance: "build",
  evidero: "build",
  fullscript: "build",
};

export const entryStates: EntryState[] = [
  "taken over mid-flight",
  "entered unfinished",
  "from blank canvas",
];

export type CatalogueRow =
  | {
      kind: "lot";
      id: string;
      client: string;
      line: string;
      entryState: EntryState;
      capability: string;
      href: string;
      lot: Lot;
    }
  | {
      kind: "index";
      id: string;
      client: string;
      line: string;
      entryState: EntryState;
      capability?: undefined;
      href?: string;
      project: IndexProject;
    };

export function getCatalogue(): CatalogueRow[] {
  const lotRows: CatalogueRow[] = lots.map((lot) => ({
    kind: "lot",
    id: lot.slug,
    client: lot.client,
    line: lot.summary,
    entryState: lotEntryState[lot.slug] ?? "from blank canvas",
    capability: lot.specialistCapability,
    href: `/work/${lot.slug}`,
    lot,
  }));
  const indexRows: CatalogueRow[] = indexProjects.map((project) => ({
    kind: "index",
    id: project.id,
    client: project.client,
    line: project.line,
    entryState: project.entryState,
    href: project.url,
    project,
  }));
  return [...lotRows, ...indexRows];
}

export function stagesForLot(slug: string): RailStage[] {
  const currentId = lotCloseStage[slug];
  const order = closeStages.map((stage) => stage.id);
  const currentIndex = currentId ? order.indexOf(currentId) : -1;
  return closeStages.map((stage, index) => {
    let status: RailStage["status"] = "upcoming";
    if (currentIndex >= 0) {
      if (index < currentIndex) status = "complete";
      else if (index === currentIndex) status = "current";
    }
    return { id: stage.id, label: stage.label, status };
  });
}
