"use client";

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
    <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
      <section className="card p-6">
        <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">Board by gate</p>
        <ul className="mt-4 space-y-3">
          {board.map((item) => (
            <li key={item.id} className="card p-4">
              <p className="font-newsreader text-[20px] text-iron">{item.name}</p>
              <p className="font-newsreader text-[16px] text-ink">{item.role} · {item.gateName}</p>
              <p className="font-plex-mono text-[12px] text-ink/70">
                Days in gate: {item.daysInGate} {item.flagged ? "(flagged > 7)" : ""}
              </p>
              <p className="font-plex-mono text-[12px] text-ink/70">Status token: {item.statusToken}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {item.hasSubmission ? (
                  <button
                    type="button"
                    onClick={() => void advance(item.statusToken)}
                    className="rounded-full bg-iron px-3 py-1 font-plex-sans text-[13px] text-rag"
                  >
                    Advance to Gate 1
                  </button>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="card p-6">
        <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">Scoring view</p>
        {selectedPayload ? (
          <>
            <p className="mt-3 font-newsreader text-[16px] leading-[1.5] text-ink">{selectedPayload.read}</p>
            <ul className="mt-4 space-y-3">
              {selectedPayload.findings.map((finding) => (
                <li key={`${finding.observed}-${finding.evidence}`} className="border-l-2 border-iron/20 pl-3">
                  <p className="font-newsreader text-[16px] text-iron">Observed: {finding.observed}</p>
                  <p className="font-newsreader text-[15px] text-ink">Consequence: {finding.consequence}</p>
                  <p className="font-newsreader text-[15px] text-ink">Closing: {finding.closing}</p>
                  <p className="font-plex-mono text-[12px] text-ink/70">Evidence: {finding.evidence}</p>
                </li>
              ))}
            </ul>
            <div className="mt-4 space-y-3">
              {diagnosticRubric.map((criterion) => (
                <label key={criterion.key} className="flex items-center justify-between gap-4">
                  <span className="font-newsreader text-[15px] text-ink">{criterion.label}</span>
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
                    className="w-16 rounded-[8px] border border-iron/20 bg-rag px-2 py-1 font-plex-mono text-[13px]"
                  />
                </label>
              ))}
            </div>
            <textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Internal reviewer note"
              rows={4}
              className="mt-4 w-full rounded-[10px] border border-iron/20 bg-rag px-3 py-2 font-newsreader text-[15px]"
            />
            <button
              type="button"
              onClick={() => void saveScore()}
              className="mt-3 rounded-full bg-iron px-4 py-2 font-plex-sans text-[14px] text-rag"
            >
              Save scores
            </button>
          </>
        ) : (
          <p className="mt-3 font-newsreader text-[16px] text-ink">No submitted diagnostic selected yet.</p>
        )}
        <p className="mt-3 font-newsreader text-[14px] text-ink">{message}</p>
      </section>
    </div>
  );
}
