import Link from "next/link";

/** Quiet pre-footer bar on paper. One line, one link, no chrome. */
export function DirectStrip() {
  return (
    <div className="w-full border-t border-line bg-paper-card">
      <Link
        href="/direct"
        className="flex h-14 w-full items-center justify-between gap-4 px-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-ink sm:px-8"
      >
        <span className="truncate text-[15px] font-bold text-ink">
          Twelve specialists. Write to one directly.
        </span>
        <span className="shrink-0 text-[13px] font-bold text-mute">
          Open <span aria-hidden="true">→</span>
        </span>
      </Link>
    </div>
  );
}
