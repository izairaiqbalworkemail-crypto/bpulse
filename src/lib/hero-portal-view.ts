import { getDemoOverview } from "@/content/demo";

export type HeroPortalView = {
  client: string;
  engagement: string;
  band: string;
  daysElapsed: number;
  lockedDays: number;
  usedPct: number;
  scopeVersion: string;
  currentStage: string;
  stages: readonly {
    id: string;
    label: string;
    done: boolean;
    current?: boolean;
  }[];
  findingsOpen: number;
  deployLine: string;
  nextMilestone: string;
};

/** Shared projection for the desktop window and the mobile card. */
export function heroPortalView(
  overview: ReturnType<typeof getDemoOverview>,
): HeroPortalView {
  const staging = overview.staging;
  const deployLine = staging
    ? `${staging.env} ${staging.status}`
    : "not connected";

  return {
    client: overview.client,
    engagement: overview.engagement,
    band: overview.band,
    daysElapsed: overview.daysElapsed,
    lockedDays: overview.lockedDays,
    usedPct: overview.usedPct,
    scopeVersion: overview.scopeVersion,
    currentStage: overview.currentStage,
    stages: overview.stages,
    findingsOpen: overview.findings.open,
    deployLine,
    nextMilestone: overview.nextMilestone,
  };
}
