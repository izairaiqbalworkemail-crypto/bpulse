"use client";

import { Reveal, Rise } from "@/components/landing/Reveal";
import { secondChair, secondChairCompare } from "@/content/second-chair";

/**
 * A comparison ledger. Last column is ours, by weight, not colour.
 */
export function CompareLedger() {
  const ours = secondChairCompare.columns.length - 1;

  return (
    <div>
      <Reveal className="mt-12 overflow-x-auto">
        <table className="legal-table min-w-[44rem]">
          <thead>
            <tr>
              <th> </th>
              {secondChairCompare.columns.map((column, index) => (
                <th
                  key={column}
                  className={index === ours ? "text-iron" : undefined}
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {secondChairCompare.rows.map((row) => (
              <tr key={row.label}>
                <th className="font-plex-sans text-[15px] font-normal text-iron">
                  {row.label}
                </th>
                {row.cells.map((cell, index) => (
                  <td
                    key={`${row.label}-${secondChairCompare.columns[index]}`}
                    className={
                      index === ours
                        ? "compare-ours font-plex-sans text-[15px] leading-[1.45]"
                        : "font-plex-sans text-[15px] leading-[1.45] text-ink"
                    }
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>
      <Rise delay={0.12} className="mt-12">
        <p className="max-w-[28ch] border-t border-iron/12 pt-8 font-newsreader text-[26px] leading-[1.25] text-iron md:text-[28px]">
          {secondChair.concede}
        </p>
      </Rise>
    </div>
  );
}
