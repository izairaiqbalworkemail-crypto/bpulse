"use client";

import Link from "next/link";

/**
 * Sticky contact button — bottom-right floating button with online status.
 * Inspired by bpulse.dev's "Message the crew" button.
 *
 * Adapts to the rag/iron theme instead of the dark theme.
 */
export function StickyContact() {
  return (
    <Link
      href="/contact"
      className="group fixed right-4 bottom-4 z-40 inline-flex items-center gap-2.5 rounded-full border border-iron/20 bg-rag/90 py-2.5 pr-4 pl-3 shadow-[0_8px_30px_-8px_rgba(16,22,28,0.15)] backdrop-blur-sm transition-all duration-200 hover:border-iron/40 hover:shadow-[0_12px_40px_-8px_rgba(16,22,28,0.2)] sm:right-6 sm:bottom-6"
    >
      <span className="relative grid h-7 w-7 place-items-center rounded-full bg-iron text-rag">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </span>
      <span className="flex flex-col items-start leading-none">
        <span className="font-plex-sans text-[0.82rem] font-medium tracking-tight text-iron">
          Message the crew
        </span>
        <span className="mt-0.5 font-plex-mono text-[0.62rem] text-ink/70 group-hover:text-ink/70">
          replies within one business day
        </span>
      </span>
    </Link>
  );
}
