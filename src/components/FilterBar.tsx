"use client";

import { useReducedMotion } from "motion/react";

export type FilterOption = {
  id: string;
  label: string;
};

type FilterBarProps = {
  options: FilterOption[];
  value: string;
  onChange: (id: string) => void;
  count: number;
  noun?: string;
  label?: string;
};

export function FilterBar({
  options,
  value,
  onChange,
  count,
  noun = "in the catalogue",
  label = "Filter the catalogue",
}: FilterBarProps) {
  const reduce = useReducedMotion();

  return (
    <div className="flex flex-col gap-4 border-t border-iron/20 pt-5 md:flex-row md:items-end md:justify-between">
      <div
        role="radiogroup"
        aria-label={label}
        className="flex flex-wrap gap-2"
      >
        {options.map((option) => {
          const selected = option.id === value;
          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(option.id)}
              className={`rounded-full border px-4 py-2 font-plex-sans text-[14px] transition-colors duration-200 ${
                selected
                  ? "border-iron bg-iron text-rag"
                  : "border-iron/20 text-ink hover:border-iron"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
      <p
        aria-live="polite"
        className={`font-plex-mono text-[13px] text-ink/70 ${
          reduce ? "" : "transition-opacity duration-200"
        }`}
      >
        {count} {noun}
      </p>
    </div>
  );
}
