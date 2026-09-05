"use client";

import { useMemo, useState } from "react";
import { FilterBar } from "@/components/FilterBar";
import { demoFindings } from "@/content/demo";

const OPTIONS = [
  { id: "all", label: "All" },
  { id: "open", label: "Open" },
  { id: "closed", label: "Closed" },
  { id: "deferred", label: "Deferred" },
];

export function FindingsFilter() {
  const [filter, setFilter] = useState("all");
  const rows = useMemo(
    () =>
      demoFindings.filter((item) =>
        filter === "all" ? true : item.status === filter
      ),
    [filter]
  );

  return (
    <div>
      <FilterBar
        options={OPTIONS}
        value={filter}
        onChange={setFilter}
        count={rows.length}
        noun="sample findings"
        label="Filter sample findings"
      />
      <ul className="mt-10 flex flex-col gap-3">
        {rows.map((finding) => (
          <li key={finding.observed} className="card p-6">
            <p className="font-plex-mono text-[13px] uppercase tracking-[0.08em] text-ink/60">
              {finding.status} · {finding.owner} · {finding.date} · sample
            </p>
            <p className="mt-3 font-newsreader text-reading leading-reading text-iron">
              {finding.observed}
            </p>
            <p className="mt-3 font-newsreader text-reading leading-reading text-ink">
              {finding.closing}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
