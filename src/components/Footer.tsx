import Link from "next/link";
import { footerNav } from "@/content/home";
import { brand } from "@/config/brand";
import { addressLine, edition } from "@/config/site";
import pkg from "../../package.json";

const copyrightYear = edition.date.split(" ").pop() ?? "";

const columns = [
  { id: "start", label: "Start", links: footerNav.start },
  { id: "work", label: "Work", links: footerNav.work },
  { id: "company", label: "Company", links: footerNav.company },
  { id: "legal", label: "Legal", links: footerNav.legal },
] as const;

/**
 * Paper footer. Brand, four columns, one meta line.
 * The last-twenty sentence lives on the first screen, not here.
 */
export function Footer() {
  return (
    <footer className="lp-footer w-full">
      <div className="lp-shell">
        <div className="lp-foot-grid">
          <div>
            <Link className="lp-foot-brand" href="/">
              bpulse
            </Link>
            <p className="mt-3 max-w-[26ch] text-[0.85rem] font-medium text-mute">
              The last twenty percent, in production.
            </p>
          </div>
          {columns.map((column) => (
            <nav aria-label={column.label} className="lp-foot-col" key={column.id}>
              <h5>{column.label}</h5>
              {column.links.map((item) => (
                <Link href={item.href} key={item.href}>
                  {item.label}
                </Link>
              ))}
            </nav>
          ))}
        </div>
        <p className="lp-foot-meta">
          {addressLine} · this edition {edition.date} · build {pkg.version} · ©{" "}
          {copyrightYear} {brand.legalName}
        </p>
      </div>
    </footer>
  );
}
