import type { MetadataRoute } from "next";
import { brand } from "@/config/brand";
import { lots } from "@/content/lots";
import { specialists } from "@/content/specialists";
import { legalDocuments } from "@/content/documents";

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
    "/direct",
    "/legal",
    "/legal/terms",
    "/legal/privacy-policy",
    "/legal/cookie-policy",
    "/legal/accessibility",
    "/legal/complaints",
    ...lots.map((lot) => `/work/${lot.slug}`),
    ...specialists.map((person) => `/team/${person.id}`),
    ...specialists.map((person) => `/direct/${person.id}`),
    ...legalDocuments.flatMap((doc) => [
      `/legal/${doc.slug}`,
      ...(doc.aliases?.map((alias) => `/legal/${alias}`) ?? []),
    ]),
  ];

  return indexedRoutes.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path.startsWith("/legal")
      ? 0.5
      : path === "/"
        ? 1
        : path.startsWith("/work/") || path.startsWith("/team/")
          ? 0.6
          : 0.8,
  }));
}
