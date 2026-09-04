import type { Metadata } from "next";
import Link from "next/link";
import { Newsreader, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { rootMetadata } from "@/lib/seo";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/lib/JsonLd";
import { Mark } from "@/components/primitives/Mark";
import { StickyContact } from "@/components/StickyContact";
import { brand } from "@/config/brand";
import { siteNav, edition, addressLine } from "@/config/site";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = rootMetadata;

const legalLinks = [
  { label: "Terms of Service", href: "/legal/terms-of-service" },
  { label: "Privacy Policy", href: "/legal/privacy-policy" },
  { label: "Cookie Policy", href: "/legal/cookie-policy" },
  { label: "Accessibility Statement", href: "/legal/accessibility-statement" },
  {
    label: "Complaints and Dispute Resolution",
    href: "/legal/complaints",
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${plexSans.variable} ${plexMono.variable}`}
    >
      <body className="bg-rag text-ink">
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <main>{children}</main>
        <StickyContact />

        {/* ── Colophon footer ── */}
        <footer className="w-full bg-iron text-rag">
          <div className="grid-container py-16">
            {/* Wordmark and Mark at real scale */}
            <div className="flex items-center gap-4">
              <Mark size={40} />
              <span className="font-plex-sans text-xl font-medium tracking-tight text-rag">
                bpulse
              </span>
            </div>

            {/* Route columns */}
            <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4">
              <nav aria-label="Work">
                <p className="font-plex-mono text-caption tracking-[0.08em] text-rag/50 uppercase">
                  Work
                </p>
                <ul className="mt-3 flex flex-col gap-2">
                  {siteNav.filter((n) => n.href === "/work").map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="font-plex-sans text-sm text-rag/80 transition-colors duration-200 hover:text-rag"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href="/work"
                      className="font-plex-sans text-sm text-rag/80 transition-colors duration-200 hover:text-rag"
                    >
                      Full catalogue
                    </Link>
                  </li>
                </ul>
              </nav>

              <nav aria-label="Services">
                <p className="font-plex-mono text-caption tracking-[0.08em] text-rag/50 uppercase">
                  Services
                </p>
                <ul className="mt-3 flex flex-col gap-2">
                  <li>
                    <Link
                      href="/check"
                      className="font-plex-sans text-sm text-rag/80 transition-colors duration-200 hover:text-rag"
                    >
                      The Check
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/team"
                      className="font-plex-sans text-sm text-rag/80 transition-colors duration-200 hover:text-rag"
                    >
                      The crew
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      className="font-plex-sans text-sm text-rag/80 transition-colors duration-200 hover:text-rag"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/careers"
                      className="font-plex-sans text-sm text-rag/80 transition-colors duration-200 hover:text-rag"
                    >
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/notices"
                      className="font-plex-sans text-sm text-rag/80 transition-colors duration-200 hover:text-rag"
                    >
                      Notices
                    </Link>
                  </li>
                </ul>
              </nav>

              <nav aria-label="Contact">
                <p className="font-plex-mono text-caption tracking-[0.08em] text-rag/50 uppercase">
                  Contact
                </p>
                <ul className="mt-3 flex flex-col gap-2">
                  <li>
                    <Link
                      href="/contact"
                      className="font-plex-sans text-sm text-rag/80 transition-colors duration-200 hover:text-rag"
                    >
                      Get in touch
                    </Link>
                  </li>
                  <li>
                    <a
                      href={`mailto:${brand.contact.email}`}
                      className="font-plex-sans text-sm text-rag/80 transition-colors duration-200 hover:text-rag"
                    >
                      {brand.contact.email}
                    </a>
                  </li>
                </ul>
              </nav>

              <nav aria-label="Legal">
                <p className="font-plex-mono text-caption tracking-[0.08em] text-rag/50 uppercase">
                  Legal
                </p>
                <ul className="mt-3 flex flex-col gap-2">
                  {legalLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="font-plex-sans text-sm text-rag/80 transition-colors duration-200 hover:text-rag"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Address */}
            <div className="mt-12 border-t border-rag/15 pt-6">
              <p className="font-plex-mono text-caption text-rag/60">
                {brand.legalName} · {addressLine}
              </p>
            </div>

            {/* Colophon proper — mono */}
            <div className="mt-6 border-t border-rag/15 pt-6">
              <p className="font-plex-mono text-caption text-rag/50">
                Set in Newsreader and IBM Plex · {edition.no}, {edition.date} ·{" "}
                {brand.name}
              </p>
              <p className="mt-2 font-newsreader text-caption leading-reading text-rag/50 italic">
                We finish what starts.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
