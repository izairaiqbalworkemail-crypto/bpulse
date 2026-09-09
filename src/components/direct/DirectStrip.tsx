import Link from "next/link";

export function DirectStrip() {
  return (
    <div className="ribbon on-ink w-full bg-ink text-read">
      <div className="h-px w-full bg-paper/10" aria-hidden="true" />
      <Link
        href="/direct"
        className="flex h-14 w-full items-center justify-between gap-4 px-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-paper sm:px-8"
      >
        <span className="truncate font-newsreader text-[16px] text-paper">
          Twelve specialists. Write to one directly.
        </span>
        <span className="site-link shrink-0 font-plex-sans text-[14px]">
          Open <span aria-hidden="true">→</span>
        </span>
      </Link>
    </div>
  );
}
