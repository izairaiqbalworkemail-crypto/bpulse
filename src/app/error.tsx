"use client";

import { useEffect } from "react";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <PageHero
        kicker="Error"
        title="This page stopped."
        dek="Something failed before it could render. That was not your fault."
        actionHref="/read"
        actionLabel="Get my free read"
      />
      <div className="ribbon relative bg-paper text-ink">
        <div className="stage-container flex flex-wrap gap-4 py-20 md:py-24">
        <button
          type="button"
          onClick={reset}
          className="btn btn-ink min-h-12 px-8 text-[15px]"
        >
          Try again
        </button>
        <Link
          href="/"
          className="font-plex-sans text-[15px] text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
        >
          Back home
        </Link>
        </div>
      </div>
    </>
  );
}
