"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Trace } from "@/components/trace/Trace";
import { proofCopy, readingSymptoms } from "@/content/home";
import { figureDisclaimer } from "@/content/lots";
import type { SignalId } from "@/content/signals";
import type { Lot } from "@/content/types";
import { palette } from "@/lib/brand/palette";
import { specFromLot, verifiedFigures } from "@/lib/lot-trace";
import { closestReadingLot } from "@/lib/reading-match";

function caseShipped(lot: Lot) {
  const status =
    lot.dataLines.find((line) => line.label === "Status")?.value ?? "";
  const value = status.toLowerCase();
  return value === "live" || value === "shipped" || value.includes("ongoing");
}

/**
 * Proof. Stall lines, then one case if two statements share it.
 */
export function Proof() {
  const [selected, setSelected] = useState<SignalId[]>([]);
  const match = useMemo(() => closestReadingLot(selected), [selected]);
  const lot = match?.lot ?? null;
  const crew = lot ? figureDisclaimer(lot) : null;

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("proof") !== "open") {
      return;
    }
    setSelected(["third-party-sprawl", "scope-unbounded"]);
  }, []);

  function toggle(id: SignalId) {
    setSelected((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }

  return (
    <section id="proof" aria-labelledby="proof-heading" className="letter-proof">
      <div className={`letter-sheet${lot ? " letter-proof-wide" : ""}`}>
        <p className="kicker">
          {proofCopy.n} · {proofCopy.kicker}
        </p>
        <h2 id="proof-heading" className="letter-proof-title">
          {proofCopy.heading}
        </h2>

        <div className={`letter-proof-body${lot ? " is-open" : ""}`}>
          <ul className="letter-stalls">
            {readingSymptoms.map((row) => {
              const on = selected.includes(row.signal);
              return (
                <li key={row.key}>
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggle(row.signal)}
                    className={on ? "is-on" : undefined}
                  >
                    {row.label}
                  </button>
                </li>
              );
            })}
          </ul>

          {lot ? (
            <article className="letter-case">
              <Trace
                key={lot.slug}
                spec={specFromLot(lot)}
                size="card"
                surface="ink"
                stroke={caseShipped(lot) ? palette.after : palette.ember}
                armed
                className="letter-case-line"
              />
              <p className="letter-case-client">{lot.client}</p>
              <p className="letter-case-stuck">{lot.condition}</p>
              <p className="letter-case-ship">{lot.outcome}</p>
              {crew ? <p className="letter-case-attr">{crew}</p> : null}
              {verifiedFigures(lot).map((line) => (
                <p key={line.label} className="letter-case-figure">
                  {line.value}
                  <span>
                    {" "}
                    · {line.label} · client-reported
                  </span>
                </p>
              ))}
              <p className="letter-case-open">
                <Link href={`/work/${lot.slug}`}>{proofCopy.open}</Link>
              </p>
            </article>
          ) : (
            <p className="letter-proof-note">
              {selected.length < 2 ? proofCopy.empty : proofCopy.none}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
