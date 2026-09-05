"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

const SRC = {
  ring: "/atmosphere/iron-ring.jpg",
  paper: "/atmosphere/rag-paper.jpg",
  desk: "/atmosphere/desk.jpg",
  light: "/atmosphere/rag-light.jpg",
} as const;

type AtmosphereProps = {
  kind: keyof typeof SRC;
  className?: string;
  opacity?: number;
};

/**
 * Generated grounds — not photographs of the studio.
 * Faces elsewhere on the page are the named crew.
 */
export function Atmosphere({
  kind,
  className,
  opacity = 0.28,
}: Readonly<AtmosphereProps>) {
  const reduce = useReducedMotion();

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
      aria-hidden="true"
    >
      <motion.div
        className="absolute inset-[-10%]"
        animate={reduce ? undefined : { scale: [1, 1.07, 1] }}
        transition={
          reduce
            ? undefined
            : { duration: 22, repeat: Infinity, ease: "easeInOut" }
        }
        style={{ opacity }}
      >
        <Image src={SRC[kind]} alt="" fill className="object-cover" sizes="100vw" />
      </motion.div>
    </div>
  );
}

export function AtmosphereNote({
  tone = "ink",
}: Readonly<{ tone?: "ink" | "rag" }>) {
  return (
    <p
      className={`font-plex-mono text-[11px] uppercase tracking-[0.08em] ${
        tone === "rag" ? "text-rag/60" : "text-ink/70"
      }`}
    >
      Generated ground · the faces are the crew
    </p>
  );
}
