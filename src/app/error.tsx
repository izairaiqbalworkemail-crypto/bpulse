"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Mark } from "@/components/primitives/Mark";

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
    <div className="grid-container">
      <section className="flex flex-col items-start py-36 md:py-24">
        <Mark size={32} mono />
        <h1 className="mt-8 max-w-measure font-newsreader text-h1 leading-title tracking-tighter text-iron">
          Something on this page stopped.
        </h1>
        <p className="mt-8 max-w-measure font-newsreader text-reading leading-reading text-ink">
          The page hit an error before it could render. This was not your fault.
          You can try again, or go back to the catalogue.
        </p>
        <div className="mt-12 flex gap-4">
          <button
            type="button"
            onClick={reset}
            className="inline-block rounded-button bg-iron px-8 py-4 font-plex-sans text-sm font-medium text-rag transition-colors duration-200 hover:bg-ink"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-block rounded-button border border-iron/15 px-8 py-4 font-plex-sans text-sm font-medium text-iron transition-colors duration-200 hover:border-iron/40"
          >
            Back to the catalogue
          </Link>
        </div>
      </section>
    </div>
  );
}
