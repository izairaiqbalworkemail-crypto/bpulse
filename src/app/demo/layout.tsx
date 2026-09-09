import type { ReactNode } from "react";
import Link from "next/link";
import { demoBanner, demoViews } from "@/content/demo";
import { DemoAnalytics } from "@/components/analytics/DemoAnalytics";

export default function DemoLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <DemoAnalytics />
      <p className="bg-ink px-4 py-2 text-center font-plex-mono text-[13px] text-paper">
        {demoBanner}
      </p>
      <nav aria-label="Demo views" className="border-b border-ink/15 bg-paper">
        <div className="grid-container flex flex-wrap items-baseline gap-x-6 gap-y-2 py-4">
          {demoViews.map((view) => (
            <Link
              key={view.slug}
              href={view.slug === "overview" ? "/demo" : `/demo/${view.slug}`}
              className="font-plex-sans text-sm text-quill underline-offset-4 hover:text-ink hover:underline"
            >
              {view.label}
            </Link>
          ))}
          <Link
            href="/read"
            className="font-plex-sans text-sm text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
          >
            Get my free read
          </Link>
        </div>
      </nav>
      {children}
    </>
  );
}
