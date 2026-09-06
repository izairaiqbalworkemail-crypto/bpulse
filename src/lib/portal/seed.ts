import { getDemoOverview, demoViews } from "@/content/demo";

export function getPortalOverview() {
  const data = getDemoOverview();
  return {
    ...data,
    engagement: data.engagement.replace("Close", "Engagement").replace("—", "-"),
  };
}

export const portalViews = demoViews;
