import type { ReactNode } from "react";
import Link from "next/link";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { readSessionFromCookieHeader } from "@/lib/security/studio-auth";

type Props = {
  children: ReactNode;
};

const studioViews = [
  { href: "/studio/careers", label: "Careers" },
  { href: "/studio/matches", label: "Matches" },
  { href: "/admin", label: "Operations" },
] as const;

export default async function StudioLayout({ children }: Readonly<Props>) {
  const session = readSessionFromCookieHeader((await headers()).get("cookie"));
  if (!session) notFound();

  return (
    <>
      <div className="h-[5.25rem] bg-rag md:h-[5.75rem]" aria-hidden />
      <PageHero
        kicker="Studio"
        title="Delivery dashboard"
        dek="Authenticated operations across careers, reports, follow-up, and matching logs."
        actionHref="/admin?view=follow-up"
        actionLabel="Open follow-up queue"
      />
      <div className="border-b border-iron/15 bg-rag">
        <div className="grid-container flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-4">
          <nav aria-label="Studio views" className="flex flex-wrap gap-x-6 gap-y-2">
            {studioViews.map((view) => (
              <Link
                key={view.href}
                href={view.href}
                className="font-plex-sans text-sm text-ink/70 underline-offset-4 hover:text-iron hover:underline"
              >
                {view.label}
              </Link>
            ))}
          </nav>
          <p className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/60">
            Signed in as {session.email}
          </p>
        </div>
      </div>
      {children}
    </>
  );
}
