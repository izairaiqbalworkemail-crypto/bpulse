"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useMemo, useRef, useState, type KeyboardEvent } from "react";
import {
  buildHeroTracePath,
  getHeroPainScore,
  type HeroPainKey,
} from "@/lib/trace";

type PainPoint = {
  key: HeroPainKey;
  label: string;
};

type ArrivalState = "incomplete" | "stalled" | "integration-blocked" | "unstable";

const PAIN_POINTS: PainPoint[] = [
  { key: "almost-done", label: "90% done. for three months." },
  { key: "staging-only", label: "working on staging. never once in production." },
  {
    key: "single-owner",
    label: "held together by one person who can't take leave.",
  },
  { key: "ghosted-dev", label: "ghosted by the developer who wrote it." },
  { key: "real-data-break", label: "alive in a notebook. dead on real data." },
  { key: "no-release-owner", label: "waiting on someone to own the release." },
];

const TRACE_WIDTH = 680;
const TRACE_HEIGHT = 160;
const BASELINE_PATH = `M 0 ${TRACE_HEIGHT / 2} L ${TRACE_WIDTH} ${TRACE_HEIGHT / 2}`;

function classifyArrivalState(score: number): ArrivalState {
  if (score <= 3) return "incomplete";
  if (score <= 6) return "stalled";
  if (score <= 10) return "integration-blocked";
  return "unstable";
}

function arrivalLabel(state: ArrivalState): string {
  switch (state) {
    case "incomplete":
      return "incomplete on arrival";
    case "stalled":
      return "stalled on arrival";
    case "integration-blocked":
      return "integration-blocked on arrival";
    case "unstable":
      return "unstable on arrival";
  }
}

function stateTitle(state: ArrivalState): string {
  return state
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("-");
}

export function HeroSelfCheck() {
  const reduceMotion = useReducedMotion();
  const [selectedKeys, setSelectedKeys] = useState<HeroPainKey[]>([]);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const score = useMemo(() => getHeroPainScore(selectedKeys), [selectedKeys]);
  const state = selectedKeys.length > 0 ? classifyArrivalState(score) : null;
  const stateLabel = state ? arrivalLabel(state) : "arrival state pending";

  const selectedLabels = useMemo(
    () =>
      PAIN_POINTS.filter((item) => selectedKeys.includes(item.key)).map(
        (item) => item.label
      ),
    [selectedKeys]
  );

  const tracePath = useMemo(
    () => buildHeroTracePath(selectedKeys, TRACE_WIDTH, TRACE_HEIGHT),
    [selectedKeys]
  );

  const intakeQuery =
    selectedKeys.length === 0
      ? { source: "hero-self-check" }
      : {
          source: "hero-self-check",
          state: state ?? "",
          symptoms: selectedLabels.join(" | "),
          painKeys: selectedKeys.join(","),
        };

  const resolutionLine = state
    ? `${stateTitle(state)}. Five days to know what it takes.`
    : "Five days to know what it takes.";

  const togglePain = (key: HeroPainKey) => {
    setSelectedKeys((current) => {
      if (current.includes(key)) {
        return current.filter((item) => item !== key);
      }
      return [...current, key];
    });
  };

  const onPainKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (
      event.key !== "ArrowDown" &&
      event.key !== "ArrowUp" &&
      event.key !== "ArrowRight" &&
      event.key !== "ArrowLeft" &&
      event.key !== "Home" &&
      event.key !== "End"
    ) {
      return;
    }

    event.preventDefault();
    const count = PAIN_POINTS.length;

    if (event.key === "Home") {
      buttonRefs.current[0]?.focus();
      return;
    }

    if (event.key === "End") {
      buttonRefs.current[count - 1]?.focus();
      return;
    }

    const direction = event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (index + direction + count) % count;
    buttonRefs.current[nextIndex]?.focus();
  };

  return (
    <section className="on-iron min-h-[100svh] bg-iron text-rag">
      <div className="mx-auto flex min-h-[100svh] max-w-[900px] flex-col items-center justify-center px-5 py-24 text-center md:px-8">
        <h2 className="max-w-[16ch] font-newsreader text-[32px] leading-[1.1] tracking-[-0.03em] text-rag md:text-[48px]">
          Your build is
        </h2>

        <div
          className="mt-12 grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2"
          role="group"
          aria-label="Select every line that matches your current build"
        >
          {PAIN_POINTS.map((item, index) => {
            const selected = selectedKeys.includes(item.key);
            return (
              <motion.button
                key={item.key}
                ref={(element) => {
                  buttonRefs.current[index] = element;
                }}
                type="button"
                aria-pressed={selected}
                onClick={() => togglePain(item.key)}
                onKeyDown={(event) => onPainKeyDown(event, index)}
                className={`rounded-[12px] border px-5 py-5 text-left font-newsreader text-[18px] leading-[1.25] tracking-[-0.02em] transition-colors duration-200 md:text-[20px] ${
                  selected
                    ? "border-signal/50 bg-signal/10 text-rag"
                    : "border-rag/15 text-rag/70 hover:border-rag/30 hover:text-rag"
                }`}
              >
                {item.label}
              </motion.button>
            );
          })}
        </div>

        <svg
          viewBox={`0 0 ${TRACE_WIDTH} ${TRACE_HEIGHT}`}
          role="img"
          aria-labelledby="hero-trace-title hero-trace-desc"
          className="mt-14 h-auto w-full max-w-[680px]"
        >
          <title id="hero-trace-title">Build arrival trace</title>
          <desc id="hero-trace-desc">
            {selectedKeys.length === 0
              ? "No blockers selected yet. Trace is flat."
              : `Current arrival state reads as ${stateLabel}.`}
          </desc>
          <path
            d={BASELINE_PATH}
            stroke="rgba(239, 234, 224, 0.12)"
            strokeWidth="1"
            fill="none"
          />
          <motion.path
            d={tracePath}
            initial={reduceMotion ? false : { d: BASELINE_PATH }}
            animate={{ d: tracePath }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 0.26, ease: [0.22, 1, 0.36, 1] }
            }
            stroke="var(--color-signal)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </svg>

        <p className="mt-10 max-w-[36ch] font-newsreader text-[24px] leading-[1.3] text-rag">
          {resolutionLine}
        </p>
        <Link
          href={{ pathname: "/check", query: intakeQuery }}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-signal px-6 py-3 font-plex-sans text-[15px] font-medium text-iron"
        >
          Book a call
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
