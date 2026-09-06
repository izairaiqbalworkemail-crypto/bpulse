import type { Metadata } from "next";
import { brand } from "@/config/brand";

type PageSEO = {
  title: string;
  description: string;
  path: string;
  /** Override to exclude from indexing */
  robots?: string;
  /** Override OG image */
  image?: string;
};

export function buildMetadata(page: PageSEO): Metadata {
  const url = `${brand.url}${page.path}`;
  const image = page.image ?? brand.ogImage;

  return {
    title: `${page.title} · ${brand.name}`,
    description: page.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url,
      siteName: brand.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: page.title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [image],
    },
    robots: page.robots ?? {
      index: true,
      follow: true,
    },
  };
}

/** Default metadata for the root layout */
export const rootMetadata: Metadata = {
  title: {
    template: `%s · ${brand.name}`,
    default: `${brand.name} · ${brand.tagline}`,
  },
  description: brand.description,
  metadataBase: new URL(brand.url),
  icons: {
    icon: [
      { url: "/bpulse-brand/favicon/bpulse-favicon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [
      { url: "/apple-icon.png", type: "image/png", sizes: "180x180" },
    ],
  },
  openGraph: {
    title: brand.name,
    description: brand.description,
    url: brand.url,
    siteName: brand.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: brand.ogImage,
        width: 1200,
        height: 630,
        alt: `${brand.name} · ${brand.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [brand.ogImage],
  },
};
