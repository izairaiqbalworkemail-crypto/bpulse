"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import type { Lot } from "@/content/types";

const filters = [
  { label: "All", value: "all" },
  { label: "Stalled", value: "stalled" },
  { label: "Incomplete", value: "incomplete" },
  { label: "Integration-blocked", value: "integration-blocked" },
] as const;

type FilterValue = (typeof filters)[number]["value"];

type ProjectGridProps = {
  lots: Lot[];
};

/**
 * Filterable grid of project cards. Client-side so the filter tabs work
 * without a page reload.
 */
export function ProjectGrid({ lots }: ProjectGridProps) {
  const [active, setActive] = useState<FilterValue>("all");

  const filtered = useMemo(
    () =>
      active === "all" ? lots : lots.filter((lot) => lot.grade.state === active),
    [active, lots]
  );

  return (
    <div>
      {/* Filter tabs */}
      <div className="mb-8 flex flex-wrap gap-2 border-t border-iron/15 pt-6">
        {filters.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setActive(f.value)}
            className={`rounded-full border px-4 py-1.5 font-plex-mono text-[0.66rem] tracking-tight transition-all duration-200 ${
              active === f.value
                ? "border-iron bg-iron text-rag"
                : "border-iron/15 text-ink/60 hover:border-iron/30 hover:text-iron"
            }`}
          >
            {f.label}
            <span className="ml-1.5 opacity-50">
              {f.value === "all"
                ? lots.length
                : lots.filter((l) => l.grade.state === f.value).length}
            </span>
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((lot, i) => (
          <ProjectCard key={lot.slug} lot={lot} index={i} />
        ))}
      </div>
    </div>
  );
}
