import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Source_Serif_4 } from "next/font/google";
import { rootMetadata } from "@/lib/seo";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/lib/JsonLd";
import { SiteChrome } from "@/components/SiteChrome";
import { PublicAnalytics } from "@/components/analytics/PublicAnalytics";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  interactiveWidget: "resizes-content",
};

const display = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = rootMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body className="bg-paper text-quill">
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <PublicAnalytics />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
