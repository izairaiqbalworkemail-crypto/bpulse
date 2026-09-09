import Link from "next/link";
import { Mark } from "@/components/primitives/Mark";
import { footerNav } from "@/content/home";
import { brand } from "@/config/brand";
import { addressLine, edition } from "@/config/site";
import pkg from "../../package.json";

const copyrightYear = edition.date.split(" ").pop() ?? "";

const linkClass =
  "site-link font-plex-sans text-[15px]";

const columns = [
  { id: "work", label: "Work", links: footerNav.work },
  { id: "start", label: "Start", links: footerNav.start },
  { id: "company", label: "Company", links: footerNav.company },
  { id: "legal", label: "Legal", links: footerNav.legal },
] as const;

/**
 * Four columns. The listed destinations. Address and colophon.
 * The last-twenty sentence lives on the first screen, not here.
 */
export function Footer() {
  return (
    <footer className="letter-colophon w-full bg-ink text-paper">
      <div className="stage-container pt-14 pb-10 md:pt-16 md:pb-12">
        <div className="flex items-center gap-4">
          <Mark size={40} />
          <span className="font-plex-sans text-[20px] font-medium text-paper">
            bpulse
          </span>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {columns.map((column) => (
            <nav key={column.id} aria-label={column.label}>
              <p className="font-plex-mono text-[12px] uppercase tracking-[0.06em] text-label">
                {column.label}
              </p>
              <ul className="mt-4 flex flex-col gap-3">
                {column.links.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <p className="mt-12 font-plex-sans text-[15px] text-read">
          {addressLine}
        </p>

        <p className="mt-6 font-plex-mono text-[12px] text-label">
          Source Serif 4 and IBM Plex · Lahore · this edition {edition.date} ·
          build {pkg.version} · © {copyrightYear} {brand.legalName}
        </p>
      </div>
    </footer>
  );
}
