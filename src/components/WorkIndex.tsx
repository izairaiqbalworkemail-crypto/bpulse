"use client";

import Link from "next/link";
import { LayoutGroup, motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";
import { FilterBar } from "@/components/FilterBar";
import { LotPlate } from "@/components/catalog/LotPlate";
import { Trace } from "@/components/trace/Trace";
import {
  entryStates,
  getCatalogue,
  type CatalogueRow,
} from "@/content/catalogue";
import { brand } from "@/config/brand";
import { specFromIndex, specFromLot } from "@/lib/lot-trace";

const ALL = "all";

function options() {
  return [
    { id: ALL, label: "All" },
    ...entryStates.map((state) => ({ id: state, label: state })),
    ...brand.capabilities.map((cap) => ({ id: cap.name, label: cap.name })),
  ];
}

function matches(row: CatalogueRow, filter: string) {
  if (filter === ALL) return true;
  if (entryStates.includes(filter as CatalogueRow["entryState"])) {
    return row.entryState === filter;
  }
  return row.kind === "lot" && row.capability === filter;
}

function CompactRow({ row }: Readonly<{ row: CatalogueRow }>) {
  const href = row.kind === "lot" ? row.href : row.project.url;
  const meta =
    row.kind === "lot"
      ? `${row.entryState} · ${row.capability}`
      : [row.project.year, row.project.stack, row.entryState]
          .filter(Boolean)
          .join(" · ");
  const spec =
    row.kind === "lot" ? specFromLot(row.lot) : specFromIndex(row.project);
  const className =
    "group flex flex-col gap-3 border-b border-iron/20 py-5 md:flex-row md:items-center md:justify-between";
  const inner = (
    <>
      <span className="w-[7.5rem] shrink-0">
        <Trace spec={spec} size="inline" surface="paper" />
      </span>
      <span className="font-plex-sans text-[16px] font-medium text-iron underline decoration-iron/35 underline-offset-4 group-hover:decoration-iron">
        {row.client}
      </span>
      <span className="max-w-[48ch] font-newsreader text-[16px] leading-[1.45] text-ink md:flex-1 md:px-8">
        {row.line}
      </span>
      <span className="font-plex-mono text-[12px] text-ink/70 md:text-right">
        {meta}
      </span>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={className}
        {...(row.kind === "index"
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {inner}
      </Link>
    );
  }

  return <div className={className}>{inner}</div>;
}

export function WorkIndex() {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState(ALL);
  const rows = useMemo(() => getCatalogue(), []);
  const visible = rows.filter((row) => matches(row, filter));
  const featured = visible.filter((row) => row.kind === "lot").slice(0, 2);
  const featuredIds = new Set(featured.map((row) => row.id));
  const rest = visible.filter((row) => !featuredIds.has(row.id));

  return (
    <div>
      <FilterBar
        options={options()}
        value={filter}
        onChange={setFilter}
        count={visible.length}
        noun={visible.length === 1 ? "record" : "records"}
      />

      <LayoutGroup>
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {featured.map((row) =>
            row.kind === "lot" ? (
              <motion.div key={row.id} layout={!reduce}>
                <LotPlate lot={row.lot} href={row.href} />
              </motion.div>
            ) : null,
          )}
        </div>

        <ul className="mt-16 border-t border-iron">
          {rest.map((row) => (
            <motion.li key={row.id} layout={!reduce}>
              <CompactRow row={row} />
            </motion.li>
          ))}
        </ul>
      </LayoutGroup>
    </div>
  );
}
