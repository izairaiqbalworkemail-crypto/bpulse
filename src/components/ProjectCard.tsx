"use client";

import Image from "next/image";
import Link from "next/link";
import { Grade } from "@/components/primitives/Grade";
import type { Lot } from "@/content/types";

type ProjectCardProps = {
  lot: Lot;
  index?: number;
};

/**
 * Project card with background image, hover zoom, and status badge.
 * Inspired by bpulse.dev's project cards — adapted to the catalogue theme.
 *
 * Features:
 * - Background image with object-cover
 * - Hover: image scale 1.04, border accent
 * - Status badge (top-left)
 * - Lot number + client name + title
 * - Grade indicator
 * - Arrow on hover
 */
export function ProjectCard({ lot, index = 0 }: ProjectCardProps) {
  const statusMap: Record<string, string> = {
    incomplete: "Entered unfinished",
    stalled: "Stalled on arrival",
    "integration-blocked": "Integration blocked",
    unstable: "Arrived broken",
  };

  return (
    <Link
      href={`/work/${lot.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-surface border border-iron/10 bg-rag transition-all duration-300 hover:border-iron/30 hover:shadow-[0_8px_30px_-8px_rgba(16,22,28,0.12)]"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Image */}
      {lot.imageUrl && (
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src={lot.imageUrl}
            alt={`${lot.client} project`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="pointer-events-none absolute inset-0 bg-rag/0 transition-colors duration-150 group-hover:bg-rag/10" />
        </div>
      )}

      {/* Status badge */}
      <div className="absolute left-3 top-3 z-10">
        <span className="inline-flex items-center rounded-surface border border-iron/20 bg-rag/80 px-2.5 py-1 font-plex-mono text-[0.68rem] text-iron backdrop-blur-sm">
          {statusMap[lot.grade.state] || lot.grade.label}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-baseline justify-between">
          <span className="font-plex-mono text-[0.68rem] text-ink/70">
            {lot.lotNumber}
          </span>
          {lot.logoUrl && (
            <div className="h-5 w-5 overflow-hidden opacity-40">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={lot.logoUrl}
                alt=""
                className="h-full w-full object-contain"
              />
            </div>
          )}
        </div>

        <h3 className="mt-2 font-newsreader text-lg font-medium leading-snug tracking-tight text-iron group-hover:text-ink transition-colors duration-200">
          {lot.client}
        </h3>
        <p className="mt-0.5 font-plex-mono text-[0.62rem] text-ink/70 group-hover:text-ink/70 transition-colors duration-200">
          {lot.title}
        </p>

        <div className="mt-auto flex items-center justify-between pt-4">
          <Grade
            grade={lot.grade.grade}
            label={lot.grade.label}
            date={lot.grade.date}
          />
          <span className="inline-block h-4 w-4 text-iron/30 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-iron/60">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
