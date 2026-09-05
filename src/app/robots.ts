import type { MetadataRoute } from "next";
import { brand } from "@/config/brand";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/report/", "/read/", "/design", "/studio", "/careers/diagnostic/", "/careers/status/"],
    },
    sitemap: `${brand.url}/sitemap.xml`,
  };
}
