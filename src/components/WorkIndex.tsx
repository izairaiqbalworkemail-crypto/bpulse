"use client";

import Image from "next/image";
import Link from "next/link";
import { LayoutGroup, motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";
import { FilterBar } from "@/components/FilterBar";
import { ProofRow } from "@/components/ProofRow";
import { figureDisclaimer } from "@/content/lots";
import {
  entryStates,
  getCatalogue,
  type CatalogueRow,
} from "@/content/catalogue";
import { brand } from "@/config/brand";

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
        <div className="mt-12 flex flex-col gap-16">
          {featured.map((row) =>
            row.kind === "lot" ? (
              <motion.article
                key={row.id}
                layout={!reduce}
                className="border-t border-iron/20 pt-8"
              >
                <Link href={row.href} className="group block">
                  <p className="font-plex-mono text-[13px] uppercase tracking-[0.08em] text-ink/70">
                    {row.lot.lotNumber} · {row.entryState}
                  </p>
                  <h2 className="mt-2 font-newsreader text-[24px] leading-[1.15] text-iron underline decoration-iron/30 underline-offset-4 group-hover:decoration-iron">
                    {row.client}
                  </h2>
                  <p className="mt-2 max-w-[60ch] font-newsreader text-[18px] leading-[1.45] text-ink">
                    {row.lot.title}
                  </p>
                  {row.lot.imageUrl ? (
                    <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-[24px] bg-iron/5">
                      <Image
                        src={row.lot.imageUrl}
                        alt=""
                        fill
                        className={`object-cover ${
                          reduce ? "" : "transition-transform duration-700 group-hover:scale-[1.04]"
                        }`}
                        sizes="(max-width: 768px) 100vw, 1180px"
                      />
                    </div>
                  ) : null}
                </Link>
                <div className="mt-6 max-w-[720px]">
                  {row.lot.dataLines
                    .filter((line) => line.label !== "Client")
                    .map((line) => (
                      <ProofRow
                        key={line.label}
                        value={line.value}
                        label={line.label}
                        source={
                          row.lot.attribution.sourceUrl ??
                          row.lot.attribution.type
                        }
                        unverified={Boolean(figureDisclaimer(row.lot))}
                      />
                    ))}
                </div>
              </motion.article>
            ) : null
          )}
        </div>

        <ul className="mt-16 border-t border-iron">
          {rest.map((row) => {
            const href = row.kind === "lot" ? row.href : row.project.url;
            const meta =
              row.kind === "lot"
                ? `${row.entryState} · ${row.capability}`
                : [row.project.year, row.project.stack, row.entryState]
                    .filter(Boolean)
                    .join(" · ");
            const className =
              "group flex flex-col gap-2 border-b border-iron/20 py-5 md:flex-row md:items-baseline md:justify-between";
            const inner = (
              <>
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
            return (
              <motion.li key={row.id} layout={!reduce}>
                {href ? (
                  <Link
                    href={href}
                    className={className}
                    {...(row.kind === "index"
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {inner}
                  </Link>
                ) : (
                  <div className={className}>{inner}</div>
                )}
              </motion.li>
            );
          })}
        </ul>
      </LayoutGroup>
    </div>
  );
}
