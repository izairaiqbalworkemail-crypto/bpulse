import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Episode } from "@/components/episode/Episode";

export default function NotFound() {
  return (
    <>
      <PageHero
        kicker="404"
        title="This page is not here."
        dek="The address does not match anything we publish. Start from home, or send the Read."
        actionHref="/read"
        actionLabel="Get my free read"
      />
      <Episode tone="paper" size="short">
        <Link
          href="/"
          className="font-plex-sans text-sm text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
        >
          Back home
        </Link>
      </Episode>
    </>
  );
}
