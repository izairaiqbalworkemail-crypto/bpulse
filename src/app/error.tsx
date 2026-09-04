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
        title="Something on this page stopped."
        dek="The page hit an error before it could render. This was not your fault."
        hideAction
      />
      <div className="grid-container flex gap-4 py-16">
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-full bg-signal px-6 py-3 font-plex-sans text-[15px] font-medium text-iron"
        >
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-iron/15 px-6 py-3 font-plex-sans text-[15px] font-medium text-iron"
        >
          Back to the catalogue
        </Link>
      </div>
    </>
  );
}
