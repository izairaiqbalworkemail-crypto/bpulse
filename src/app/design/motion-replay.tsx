"use client";

import { useState } from "react";
import { Mark } from "@/components/primitives/Mark";

const behaviours = [
  {
    id: "mark",
    name: "Mark strike on load",
    detail: "320ms · scale 1.04 → 1.00 · cubic-bezier(.69, 0, 0, 1) · once",
  },
  {
    id: "rule",
    name: "Rules draw on entry",
    detail: "400ms · left to right · 60ms stagger within a lot",
  },
  {
    id: "hover-lot",
    name: "Hover on a Lot",
    detail:
      "200ms · border colour + one-step value shift · no lift, no scale, no shadow",
  },
  {
    id: "hover-button",
    name: "Hover on a button",
    detail: "200ms · value shift only",
  },
] as const;

export function MotionReplay() {
  const [playKey, setPlayKey] = useState(0);

  return (
    <div className="flex flex-col gap-8">
      {/* Mark strike */}
      <div className="flex items-center gap-6">
        <Mark key={`mark-${playKey}`} size={48} struck />
        <div>
          <p className="font-plex-sans text-sm font-medium text-iron">
            {behaviours[0].name}
          </p>
          <p className="font-plex-mono text-caption text-ink/60">
            {behaviours[0].detail}
          </p>
        </div>
      </div>

      {/* Rule draw-on */}
      <div>
        <p className="font-plex-sans text-sm font-medium text-iron">
          {behaviours[1].name}
        </p>
        <p className="font-plex-mono text-caption text-ink/60">
          {behaviours[1].detail}
        </p>
        <div className="mt-4">
          <div
            key={`rule-${playKey}`}
            className="h-px w-full origin-left overflow-hidden"
          >
            <div
              className="h-px w-full"
              style={{
                transform: "scaleX(0)",
                transformOrigin: "left",
                animation: `rule-draw-on 400ms cubic-bezier(.69, 0, 0, 1) ${playKey + 1} forwards`,
                background:
                  "color-mix(in srgb, var(--color-iron) 15%, transparent)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Hover lot + button — interactive */}
      <div>
        <p className="font-plex-sans text-sm font-medium text-iron">
          {behaviours[2].name}
        </p>
        <p className="font-plex-mono text-caption text-ink/60">
          {behaviours[2].detail}
        </p>
        <div className="mt-4 flex items-center justify-between border border-iron/15 p-4 transition-colors duration-200 hover:border-iron/50">
          <span className="font-plex-sans text-sm text-iron">
            Hover this lot
          </span>
          <span className="font-plex-mono text-caption text-ink/70">
            LOT 001
          </span>
        </div>
      </div>

      <div>
        <p className="font-plex-sans text-sm font-medium text-iron">
          {behaviours[3].name}
        </p>
        <p className="font-plex-mono text-caption text-ink/60">
          {behaviours[3].detail}
        </p>
        <button
          type="button"
          className="mt-4 rounded-button bg-signal px-6 py-3 font-plex-sans text-sm font-medium text-iron transition-colors duration-200 hover:brightness-95"
        >
          Hover this button
        </button>
      </div>

      <div className="border-t border-iron/10 pt-6">
        <button
          type="button"
          onClick={() => setPlayKey((k) => k + 1)}
          className="font-plex-mono text-caption text-ink/70 underline-offset-4 hover:underline"
        >
          Replay mark + rule
        </button>
        <p className="mt-2 font-plex-mono text-caption text-ink/70">
          prefers-reduced-motion: reduce disables mark strike, rule draw-on, and
          transforms.
        </p>
      </div>
    </div>
  );
}
