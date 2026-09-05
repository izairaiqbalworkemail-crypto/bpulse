"use client";

import Link from "next/link";
import { Mark } from "@/components/primitives/Mark";
import { Atmosphere } from "@/components/landing/Atmosphere";
import { Reveal } from "@/components/landing/Reveal";
import { brand } from "@/config/brand";
import { edition, addressLine } from "@/config/site";
import pkg from "../../package.json";

const workLinks = [{ label: "The catalogue", href: "/work" }];

const studioLinks = [
  { label: "How it works", href: "/how-it-works" },
  { label: "The crew", href: "/team" },
  { label: "The standard", href: "/standard" },
  { label: "Security", href: "/security" },
  { label: "Second Chair", href: "/second-chair" },
  { label: "The Check", href: "/check" },
  { label: "The Match", href: "/match" },
  { label: "Direct line", href: "/direct" },
  { label: "Sample portal", href: "/demo" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Notices", href: "/notices" },
];

const contactLinks = [{ label: "Get in touch", href: "/contact" }];

const legalLinks = [
  { label: "Terms of Service", href: "/legal/terms" },
  { label: "Privacy Policy", href: "/legal/privacy-policy" },
  { label: "Cookie Policy", href: "/legal/cookie-policy" },
  { label: "Accessibility", href: "/legal/accessibility" },
  { label: "Complaints and Dispute Resolution", href: "/legal/complaints" },
];

const copyrightYear = edition.date.split(" ").pop() ?? "";

const linkClass =
  "font-plex-sans text-[15px] text-rag/80 transition-colors duration-200 hover:text-rag";

export function Footer() {
  return (
    <footer className="on-iron relative w-full overflow-hidden bg-iron text-rag">
      <Atmosphere kind="ring" opacity={0.28} />
      <div className="relative z-10 grid-container pt-14 pb-10 md:pt-[72px] md:pb-12 lg:pt-[100px] lg:pb-16">
        <Reveal>
          <div className="flex items-center gap-5">
            <Mark size={56} />
            <span className="font-plex-sans text-[32px] font-medium leading-none tracking-[0.01em] text-rag">
              bpulse
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="mt-10 max-w-[500px] font-newsreader text-[24px] leading-[1.3] text-rag">
            The last twenty percent is where products get stuck. That is where we
            work.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <nav aria-label="Work">
            <p className="font-plex-mono text-[13px] tracking-[0.08em] text-rag/70 uppercase">
              Work
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              {workLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Studio">
            <p className="font-plex-mono text-[13px] tracking-[0.08em] text-rag/70 uppercase">
              Studio
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              {studioLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Contact">
            <p className="font-plex-mono text-[13px] tracking-[0.08em] text-rag/70 uppercase">
              Contact
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              {contactLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${brand.contact.email}`}
                  className={linkClass}
                >
                  {brand.contact.email}
                </a>
              </li>
              <li>
                <span className="font-plex-sans text-[15px] text-rag/80">
                  {addressLine}
                </span>
              </li>
            </ul>
          </nav>

          <nav aria-label="Legal">
            <p className="font-plex-mono text-[13px] tracking-[0.08em] text-rag/70 uppercase">
              Legal
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              {legalLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <span className="font-plex-sans text-[15px] text-rag/80">
                  Legal & risk: Hamza Khan
                </span>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-16 h-px w-full bg-rag/12" aria-hidden="true" />

        <div className="mt-6">
          <p className="font-plex-mono text-[13px] text-rag/70">
            set in Newsreader and IBM Plex · Lahore · this edition{" "}
            {edition.date} · build {pkg.version}
          </p>
        </div>

        <div className="mt-8">
          <ul className="flex flex-wrap items-center gap-x-2.5 gap-y-2 font-plex-mono text-[12px] text-rag/70">
            {legalLinks.map((item) => (
              <li key={item.href} className="flex items-center gap-2.5">
                <span aria-hidden="true">·</span>
                <Link
                  href={item.href}
                  className="transition-colors duration-200 hover:text-rag"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="flex items-center gap-2.5">
              <span aria-hidden="true">·</span>
              <span>© {copyrightYear} {brand.legalName}</span>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
