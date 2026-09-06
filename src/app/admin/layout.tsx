import type { ReactNode } from "react";
import Link from "next/link";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { readSessionFromCookieHeader } from "@/lib/security/studio-auth";
import { AdminLogoutButton } from "@/components/admin/AdminLogoutButton";

const adminViews = [
  { id: "follow-up", label: "Follow-up" },
  { id: "inbox", label: "Inbox" },
  { id: "reports", label: "Reports" },
  { id: "candidates", label: "Candidates" },
  { id: "numbers", label: "Numbers" },
] as const;

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const cookieHeader = (await headers()).get("cookie");
  const session = readSessionFromCookieHeader(cookieHeader);
  if (!session) notFound();

  return (
    <>
      <div className="h-[5.25rem] bg-rag md:h-[5.75rem]" aria-hidden />
      <PageHero
        kicker="Admin"
        title="Operations desk"
        dek="Live intake, report activity, follow-up replies, and pipeline outcomes in one desk."
        actionHref="/admin?view=follow-up"
        actionLabel="Open follow-up queue"
      />
      <div className="border-b border-iron/15 bg-rag">
        <div className="grid-container flex flex-wrap items-center justify-between gap-3 py-4">
          <nav aria-label="Admin views" className="flex flex-wrap gap-x-6 gap-y-2">
            {adminViews.map((view) => (
              <Link
                key={view.id}
                href={`/admin?view=${view.id}`}
                className="font-plex-sans text-sm text-ink/70 underline-offset-4 hover:text-iron hover:underline"
              >
                {view.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <p className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/60">
              {session.email}
            </p>
            <AdminLogoutButton />
          </div>
        </div>
      </div>
      {children}
    </>
  );
}
