import type { ReactNode } from "react";
import Link from "next/link";
import { demoBanner, demoViews } from "@/content/demo";
import { pageFrame } from "@/content/platform";
import { PageHero } from "@/components/PageHero";
import { DemoAnalytics } from "@/components/analytics/DemoAnalytics";

export default function DemoLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <DemoAnalytics />
      <div className="h-[5.25rem] bg-rag md:h-[5.75rem]" aria-hidden />
      <div className="bg-signal px-4 py-2 text-center font-plex-mono text-[13px] text-iron">
        {demoBanner}
      </div>
      <PageHero
        kicker="The platform"
        title="You would be in charge."
        dek={pageFrame.demo}
        actionHref="/check"
        actionLabel="Start with a Check"
      />
      <nav
        aria-label="Demo views"
        className="border-b border-iron/15 bg-rag"
      >
        <div className="grid-container flex flex-wrap gap-x-6 gap-y-2 py-4">
          {demoViews.map((view) => (
            <Link
              key={view.slug}
              href={view.slug === "overview" ? "/demo" : `/demo/${view.slug}`}
              className="font-plex-sans text-sm text-ink/70 underline-offset-4 hover:text-iron hover:underline"
            >
              {view.label}
            </Link>
          ))}
        </div>
      </nav>
      {children}
    </>
  );
}
