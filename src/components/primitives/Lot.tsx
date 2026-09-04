"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { DataLine } from "@/components/primitives/DataLine";
import { Grade } from "@/components/primitives/Grade";
import { useInView } from "@/hooks/useInView";
import type { ArrivalGrade } from "@/content/types";

type LotDataLine = {
  label: string;
  value: string;
  mono?: boolean;
};

type LotProps = {
  /**
   * The lot number, e.g. "LOT 034". Rendered in mono.
   */
  lotNumber: string;
  /**
   * Client name and what it was — the title in Newsreader.
   */
  title: string;
  /**
   * Condition on arrival. Blunt reading text, no saving it.
   */
  condition: string;
  /**
   * Data rows. Left label, right value, hairline leader between.
   */
  dataLines: LotDataLine[];
  /**
   * The assessed condition on arrival.
   */
  conditionGrade: ArrivalGrade;
  /**
   * What shipped — the outcome, stated separately from the arrival state.
   */
  outcome?: string;
  /**
   * Optional horizontal limit line rendered beneath the data block.
   */
  limit?: string;
  /**
   * Specialist credit line, e.g. "Specialist: Aneeb Iqbal, Delivery".
   */
  specialist?: ReactNode;
  /**
   * Stagger delay in ms for the rule draw-on (default 0, increments 60).
   */
  delayMs?: number;
  href?: string;
};

/**
 * The primary content object — a catalogue lot.
 *
 * Lot number (mono), client and what it was (title), condition on arrival
 * (reading), data lines, grade, limits, specialist. Bounded by rules above
 * and below — never a card border, never a shadow.
 *
 * Constraint enforces: a Lot is a document range between two rules. On
 * paper. The grade must carry both a word and a date.
 */
export function Lot({
  lotNumber,
  title,
  condition,
  dataLines,
  conditionGrade,
  outcome,
  limit,
  specialist,
  delayMs = 0,
  href,
}: LotProps) {
  const { ref, isInView } = useInView();

  const content = (
    <>
      <div className="flex items-baseline justify-between gap-6 pb-6">
        <span className="font-plex-mono text-data text-ink/60">
          {lotNumber}
        </span>
        {href && (
          <span className="font-plex-sans text-sm text-ink/60">View lot</span>
        )}
      </div>

      <h2 className="font-newsreader text-lot-title leading-title text-iron">
        {href ? (
          <Link
            href={href}
            className="transition-colors duration-200 hover:text-ink"
          >
            {title}
          </Link>
        ) : (
          title
        )}
      </h2>

      <p className="mt-6 max-w-measure font-newsreader text-reading leading-reading text-ink">
        {condition}
      </p>

      <dl className="mt-8 flex flex-col gap-3">
        {dataLines.map((line) => (
          <DataLine key={line.label} {...line} />
        ))}
      </dl>

      {outcome && (
        <p className="mt-4 font-newsreader text-reading leading-reading text-ink">
          <span className="font-plex-mono text-data text-ink/60">Shipped: </span>
          {outcome}
        </p>
      )}

      {limit && (
        <p className="mt-4 font-plex-mono text-caption text-ink/60">{limit}</p>
      )}

      <div className="mt-8 flex items-center justify-between gap-6">
        <Grade
          grade={conditionGrade.grade}
          label={conditionGrade.label}
          date={conditionGrade.date}
        />
        {specialist && (
          <div className="font-plex-sans text-sm text-ink/70">{specialist}</div>
        )}
      </div>
    </>
  );

  return (
    <article
      ref={ref}
      className={`hover-lot group border-t border-iron/15 pb-16 pt-12 transition-colors duration-200 ${
        isInView ? "" : ""
      }`}
    >
      {/* top rule draws on */}
      <div
        className={`lot-rule mb-10 h-px w-full bg-iron/15 transition-transform duration-400 ${
          isInView ? "is-visible" : ""
        }`}
        style={{ transitionDelay: `${delayMs}ms` }}
      />
      {content}
      <div className="mt-16 border-b border-iron/15" />
    </article>
  );
}
