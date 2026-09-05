import type { MetadataRoute } from "next";
import { brand } from "@/config/brand";
import { lots } from "@/content/lots";
import { specialists } from "@/content/specialists";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = brand.url;

  const indexedRoutes = [
    "/",
    "/check",
    "/how-it-works",
    "/standard",
    "/edpulse",
    "/second-chair",
    "/demo",
    "/work",
    "/team",
    "/careers",
    "/about",
    "/notices",
    "/contact",
    "/security",
    "/match",
    "/legal",
    "/legal/terms",
    "/legal/privacy-policy",
    "/legal/cookie-policy",
    "/legal/accessibility",
    "/legal/complaints",
    ...lots.map((lot) => `/work/${lot.slug}`),
    ...specialists.map((person) => `/team/${person.id}`),
  ];

  return indexedRoutes.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : path.startsWith("/work/") || path.startsWith("/team/") ? 0.6 : 0.8,
  }));
}
