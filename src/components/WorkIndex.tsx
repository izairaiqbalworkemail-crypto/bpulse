"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Reveal } from "@/components/landing/Reveal";
import { FilterBar } from "@/components/FilterBar";
import { Trace } from "@/components/trace/Trace";
import {
  entryStates,
  getCatalogue,
  type CatalogueRow,
} from "@/content/catalogue";
import { brand } from "@/config/brand";
import {
  specFromIndex,
  specFromLot,
  verifiedFigures,
} from "@/lib/lot-trace";

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

function rowHref(row: CatalogueRow): string | undefined {
  return row.kind === "lot" ? row.href : row.project.url;
}

function rowMeta(row: CatalogueRow): string {
  return row.kind === "lot"
    ? `${row.entryState} · ${row.capability}`
    : [row.project.year, row.project.stack, row.entryState]
        .filter(Boolean)
        .join(" · ");
}

/** A row in the ledger: trace, client + line, and a mono tail. No card box. */
function LedgerRow({ row }: Readonly<{ row: CatalogueRow }>) {
  const href = rowHref(row);
  const spec =
    row.kind === "lot" ? specFromLot(row.lot) : specFromIndex(row.project);
  const proof = row.kind === "lot" ? verifiedFigures(row.lot)[0] : undefined;
  const meta = rowMeta(row);
  const outer =
    "group grid grid-cols-1 gap-3 py-5 md:grid-cols-[7.5rem_minmax(0,1fr)_auto] md:items-center md:gap-6";

  const inner = (
    <>
      <span className="w-[7.5rem] shrink-0">
        <Trace spec={spec} size="inline" surface="paper" />
      </span>
      <span className="min-w-0">
        <span className="font-plex-sans text-[16px] font-medium text-iron underline decoration-iron/35 underline-offset-4 transition-colors group-hover:decoration-iron">
          {row.client}
        </span>
        <span className="mt-1 block font-newsreader text-[16px] leading-[1.45] text-ink">
          {row.line}
        </span>
      </span>
      <span className="flex shrink-0 flex-col items-end gap-1 md:flex-row md:items-center md:gap-5">
        {proof ? (
          <span
            className="font-plex-mono text-[15px] tabular-nums text-iron"
            title={proof.label}
          >
            {proof.value}
          </span>
        ) : null}
        <span className="max-w-[24ch] font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/60 md:text-right">
          {meta}
        </span>
      </span>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={outer}
        {...(row.kind === "index"
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {inner}
      </Link>
    );
  }

  return <div className={outer}>{inner}</div>;
}

export function WorkIndex() {
  const [filter, setFilter] = useState(ALL);
  const rows = useMemo(() => getCatalogue(), []);
  const visible = rows.filter((row) => matches(row, filter));
  const lots = visible.filter((row) => row.kind === "lot");
  const indexRows = visible.filter((row) => row.kind === "index");
  const indexGroups = entryStates
    .map((state) => ({
      state,
      items: indexRows.filter((row) => row.entryState === state),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <div>
      <Reveal delay={0.06}>
        <FilterBar
          options={options()}
          value={filter}
          onChange={setFilter}
          count={visible.length}
          noun={visible.length === 1 ? "record" : "records"}
        />
      </Reveal>

      {lots.length > 0 ? (
        <>
          <Reveal delay={0.08}>
            <div className="mt-16 flex flex-wrap items-baseline justify-between gap-2 border-b border-iron/20 pb-3">
              <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">
                01 · In depth
              </p>
              <p className="font-plex-mono text-[12px] text-ink/50">
                {lots.length} {lots.length === 1 ? "lot" : "lots"}
              </p>
            </div>
          </Reveal>
          <ul className="mt-2">
            {lots.map((row, index) => (
              <li key={row.id} className="border-b border-iron/15">
                <Reveal delay={index * 0.04}>
                  <LedgerRow row={row} />
                </Reveal>
              </li>
            ))}
          </ul>
        </>
      ) : null}

      {indexGroups.length > 0 ? (
        <section className="mt-14">
          <Reveal delay={0.08}>
            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-iron/20 pb-3">
              <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">
                02 · The index
              </p>
              <p className="font-plex-mono text-[12px] text-ink/50">
                {indexRows.length}{" "}
                {indexRows.length === 1 ? "record" : "records"}
              </p>
            </div>
          </Reveal>
          <div className="mt-6 flex flex-col gap-8">
            {indexGroups.map((group, groupIndex) => (
              <Reveal key={group.state} delay={groupIndex * 0.05}>
                <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/60">
                  {group.state}
                </p>
                <ul className="mt-2">
                  {group.items.map((row, index) => (
                    <li key={row.id} className="border-b border-iron/15">
                      <Reveal delay={index * 0.03}>
                        <LedgerRow row={row} />
                      </Reveal>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}