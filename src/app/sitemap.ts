import type { MetadataRoute } from "next";
import { brand } from "@/config/brand";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = brand.url;

  const indexedRoutes = [
    "/",
    "/check",
    "/work",
    "/team",
    "/careers",
    "/about",
    "/notices",
    "/contact",
    "/legal/terms-of-service",
    "/legal/privacy-policy",
    "/legal/cookie-policy",
    "/legal/accessibility-statement",
    "/legal/complaints",
  ];

  return indexedRoutes.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
