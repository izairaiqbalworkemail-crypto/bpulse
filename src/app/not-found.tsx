import Link from "next/link";
import { PageHero } from "@/components/PageHero";

export default function NotFound() {
  return (
    <>
      <PageHero
        kicker="404"
        title="This lot is not in the catalogue."
        dek="The page you asked for does not exist. Check the address, or start from the top."
        actionHref="/"
        actionLabel="Back to the catalogue"
      />
      <div className="grid-container py-16">
        <Link
          href="/work"
          className="font-plex-sans text-sm text-ink/60 underline-offset-4 hover:underline"
        >
          Or browse the work →
        </Link>
      </div>
    </>
  );
}
