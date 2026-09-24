import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
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

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
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
      data-scroll-behavior="smooth"
      className={manrope.variable}
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
