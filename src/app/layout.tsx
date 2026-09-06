import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, Source_Code_Pro } from "next/font/google";
import { rootMetadata } from "@/lib/seo";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/lib/JsonLd";
import { SiteChrome } from "@/components/SiteChrome";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  interactiveWidget: "resizes-content",
};

const display = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
  display: "swap",
});

const mono = Source_Code_Pro({
  subsets: ["latin"],
  weight: ["400"],
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
      <body className="bg-rag text-ink">
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
