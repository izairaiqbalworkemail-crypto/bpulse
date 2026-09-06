"use client";

import Link from "next/link";
import { useState } from "react";
import { diagnosticRubric, type DiagnosticPayloadInput } from "@/lib/careers/store";

type BoardRow = {
  id: string;
  name: string;
  role: string;
  gate: number;
  gateName: string;
  statusToken: string;
  diagnosticToken: string | null;
  updatedAt: string;
  daysInGate: number;
  flagged: boolean;
  hasSubmission: boolean;
};

type Props = {
  board: BoardRow[];
  selectedDiagnosticToken: string | null;
  selectedPayload: DiagnosticPayloadInput | null;
};

const defaultScores = {
  specificity: 0,
  prioritisation: 0,
  evidence: 0,
  limits: 0,
  estimation: 0,
  writing: 0,
};

export function AdminBoard({ board, selectedDiagnosticToken, selectedPayload }: Props) {
  const [scores, setScores] = useState(defaultScores);
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");

  const selectedCandidate =
    selectedDiagnosticToken
      ? board.find((item) => item.diagnosticToken === selectedDiagnosticToken) ?? null
      : null;

  async function saveScore() {
    if (!selectedDiagnosticToken) return;
    const response = await fetch("/api/careers/admin/score", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        token: selectedDiagnosticToken,
        reviewerId: "aneeb",
        note,
        scores,
      }),
    });
    const data = (await response.json()) as { ok?: boolean; error?: string };
    setMessage(data.ok ? "Score saved." : data.error ?? "Score failed.");
  }

  async function advance(statusToken: string) {
    const response = await fetch("/api/careers/admin/advance", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ statusToken, nextGate: 1, noteInternal: "Gate 0 passed by reviewer." }),
    });
    const data = (await response.json()) as { ok?: boolean; error?: string };
    setMessage(data.ok ? "Advanced to Gate 1." : data.error ?? "Advance failed.");
  }

  return (
    <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(17rem,0.7fr)_minmax(0,1.3fr)]">
      <aside className="border-y border-iron/20 py-4">
        <p className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/65">
          Candidate sidebar
        </p>
        <ul className="mt-3 divide-y divide-iron/10">
          {board.map((item) => {
            const active = item.diagnosticToken && selectedDiagnosticToken === item.diagnosticToken;
            return (
              <li key={item.id} className="py-3">
                <p className={`font-newsreader text-[20px] ${active ? "text-iron" : "text-ink"}`}>
                  {item.name}
                </p>
                <p className="mt-1 font-newsreader text-[15px] text-ink">
                  {item.role} · {item.gateName}
                </p>
                <p className={`mt-1 font-plex-mono text-[11px] uppercase tracking-[0.08em] ${item.flagged ? "text-signal-ink" : "text-ink/65"}`}>
                  Days in gate: {item.daysInGate}
                </p>
                {item.diagnosticToken ? (
                  <Link
                    href={`/studio/careers?token=${item.diagnosticToken}`}
                    className="mt-2 inline-flex font-plex-sans text-[13px] underline decoration-iron/25 underline-offset-4 hover:decoration-iron"
                  >
                    Open diagnostic
                  </Link>
                ) : (
                  <p className="mt-2 font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/60">
                    Diagnostic token pending
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </aside>

      <section className="border-y border-iron/20 py-4">
        <p className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/65">
          Reviewer desk
        </p>
        {selectedPayload ? (
          <>
            <p className="mt-3 font-newsreader text-[24px] leading-[1.2] text-iron">
              {selectedCandidate?.name ?? "Selected candidate"}
            </p>
            <p className="mt-1 font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/65">
              {selectedCandidate?.role ?? "Role"} · {selectedCandidate?.gateName ?? "Gate"}
            </p>

            <div className="mt-6 border-t border-iron/15 pt-6">
              <p className="font-newsreader text-[18px] leading-[1.55] text-ink">
                {selectedPayload.read}
              </p>
            </div>

            <div className="mt-8 overflow-x-auto border-y border-iron/15">
              <table className="min-w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-iron/15">
                    {[
                      "Observed",
                      "Consequence",
                      "Closing",
                      "Evidence",
                    ].map((header) => (
                      <th
                        key={header}
                        className="py-2.5 pr-4 font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/65"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {selectedPayload.findings.map((finding) => (
                    <tr key={`${finding.observed}-${finding.evidence}`} className="border-b border-iron/10 align-top">
                      <td className="py-3 pr-4 font-newsreader text-[16px] leading-[1.45] text-iron">{finding.observed}</td>
                      <td className="py-3 pr-4 font-newsreader text-[16px] leading-[1.45] text-ink">{finding.consequence}</td>
                      <td className="py-3 pr-4 font-newsreader text-[16px] leading-[1.45] text-ink">{finding.closing}</td>
                      <td className="py-3 pr-2 font-plex-mono text-[12px] text-ink/70">{finding.evidence}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 overflow-x-auto border-y border-iron/15">
              <table className="min-w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-iron/15">
                    <th className="py-2.5 pr-4 font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/65">Rubric</th>
                    <th className="py-2.5 pr-2 font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/65">Score (0-3)</th>
                  </tr>
                </thead>
                <tbody>
                  {diagnosticRubric.map((criterion) => (
                    <tr key={criterion.key} className="border-b border-iron/10 align-top">
                      <td className="py-3 pr-4 font-newsreader text-[16px] text-ink">{criterion.label}</td>
                      <td className="py-3 pr-2">
                        <input
                          type="number"
                          min={0}
                          max={3}
                          value={scores[criterion.key]}
                          onChange={(event) =>
                            setScores((prev) => ({
                              ...prev,
                              [criterion.key]: Number(event.target.value),
                            }))
                          }
                          className="w-20 border border-iron/25 bg-rag px-2 py-1 font-plex-mono text-[13px]"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6">
              <label className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/65" htmlFor="reviewer-note">
                Reviewer note
              </label>
              <textarea
                id="reviewer-note"
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder="Internal reviewer note"
                rows={4}
                className="mt-2 w-full border border-iron/25 bg-rag px-3 py-2 font-newsreader text-[15px]"
              />
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => void saveScore()}
                  className="bg-signal px-4 py-2 font-plex-sans text-[14px] text-iron"
                >
                  Save scores
                </button>
                {selectedCandidate?.hasSubmission ? (
                  <button
                    type="button"
                    onClick={() => void advance(selectedCandidate.statusToken)}
                    className="border border-iron/25 px-4 py-2 font-plex-sans text-[14px] text-iron"
                  >
                    Advance to Gate 1
                  </button>
                ) : null}
              </div>
            </div>
          </>
        ) : (
          <p className="mt-3 font-newsreader text-[17px] text-ink">
            Select a candidate diagnostic from the sidebar.
          </p>
        )}
        {message ? <p className="mt-4 font-plex-sans text-[14px] text-ink">{message}</p> : null}
      </section>
    </div>
  );
}
