import Link from "next/link";
import { Mark } from "@/components/primitives/Mark";

export default function NotFound() {
  return (
    <div className="grid-container">
      <section className="flex flex-col items-start py-36 md:py-24">
        <Mark size={32} mono />
        <h1 className="mt-8 max-w-measure font-newsreader text-h1 leading-title tracking-tighter text-iron">
          This lot is not in the catalogue.
        </h1>
        <p className="mt-8 max-w-measure font-newsreader text-reading leading-reading text-ink">
          The page you asked for does not exist. Check the address and try
          again, or go back to the catalogue and start from the top.
        </p>
        <div className="mt-12 flex gap-4">
          <Link
            href="/"
            className="inline-block rounded-button bg-iron px-8 py-4 font-plex-sans text-sm font-medium text-rag transition-colors duration-200 hover:bg-ink"
          >
            Back to the catalogue
          </Link>
        </div>
      </section>
    </div>
  );
}
