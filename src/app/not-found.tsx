import Link from "next/link";
import { Mark } from "@/components/primitives/Mark";

export default function NotFound() {
  return (
    <div className="grid-container">
      <section className="flex flex-col items-start py-36 md:py-24">
        <Mark size={32} mono />
        <h1 className="mt-8 max-w-measure font-newsreader text-h1 leading-title tracking-tighter text-iron">
          This report link is invalid.
        </h1>
        <p className="mt-8 max-w-measure font-newsreader text-reading leading-reading text-ink">
          Report links are private and unguessable. Request a fresh link from
          your bpulse contact if this one has expired or was copied incorrectly.
        </p>
        <div className="mt-12 flex gap-4">
          <Link
            href="mailto:contact@bpulse.dev"
            className="inline-block rounded-button bg-iron px-8 py-4 font-plex-sans text-sm font-medium text-rag transition-colors duration-200 hover:bg-ink"
          >
            Contact bpulse
          </Link>
        </div>
      </section>
    </div>
  );
}
