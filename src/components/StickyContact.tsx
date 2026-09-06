"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { landSpring } from "@/components/landing/Reveal";

/**
 * Sticky contact button — bottom-right floating button.
 * A person replies within one business day. No fake presence.
 */
export function StickyContact() {
  const reduce = useReducedMotion();
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const sync = () => {
      const tag = document.activeElement?.tagName;
      setTyping(tag === "INPUT" || tag === "TEXTAREA");
    };
    document.addEventListener("focusin", sync);
    document.addEventListener("focusout", sync);
    return () => {
      document.removeEventListener("focusin", sync);
      document.removeEventListener("focusout", sync);
    };
  }, []);

  if (typing) return null;

  return (
    <motion.div
      className="fixed right-4 bottom-4 z-40 sm:right-6 sm:bottom-6"
      initial={reduce ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={reduce ? { duration: 0 } : { ...landSpring, delay: 0.7 }}
    >
      <Link
        href="/contact"
        className="group inline-flex items-center gap-2.5 rounded-full border border-iron/20 bg-rag/90 py-2.5 pr-4 pl-3 shadow-[0_8px_30px_-8px_rgba(16,16,14,0.14)] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-iron/40 hover:shadow-[0_16px_40px_-12px_rgba(16,16,14,0.22)]"
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
          <span className="mt-0.5 font-plex-mono text-[0.62rem] text-ink/70">
            replies within one business day
          </span>
        </span>
      </Link>
    </motion.div>
  );
}
