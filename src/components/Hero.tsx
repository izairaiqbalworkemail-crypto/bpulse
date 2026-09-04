"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useMemo, useRef, useState, type KeyboardEvent } from "react";

import { HeroFrame } from "@/components/HeroFrame";
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

export function Hero() {
  const reduceMotion = useReducedMotion();
  const [settled, setSettled] = useState(() => Boolean(reduceMotion));
  const [selectedKeys, setSelectedKeys] = useState<HeroPainKey[]>([]);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const score = useMemo(() => getHeroPainScore(selectedKeys), [selectedKeys]);
  const state = selectedKeys.length > 0 ? classifyArrivalState(score) : null;
  const stateLabel = state ? arrivalLabel(state) : "arrival state pending";

  const entranceDelay = reduceMotion ? 0 : settled ? 0.5 : 60;
  const revealed = reduceMotion || settled;

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
    <HeroFrame tall onReady={() => setSettled(true)}>
      <div className="flex flex-col gap-10 md:gap-14 lg:gap-20">
              {/* The 80% bar */}
              <div>
                <div className="mb-3 flex items-baseline justify-between font-plex-mono text-[14px] tabular-nums">
                  <span className="text-rag/75">80%</span>
                  <span className="text-rag/70">the last 20%</span>
                </div>
                <div className="relative h-3.5 overflow-hidden rounded-full border border-rag/18 bg-iron/75">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-signal"
                    initial={reduceMotion ? { width: "80%" } : { width: 0 }}
                    animate={revealed ? { width: "80%" } : { width: 0 }}
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : {
                            delay: settled ? 0.2 : 999,
                            duration: 1.1,
                            ease: [0.16, 1, 0.3, 1],
                          }
                    }
                  />
                  <div
                    className="absolute inset-y-0 right-0 w-[20%] border-l border-rag/30"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(135deg, rgba(239,234,224,0.18) 0, rgba(239,234,224,0.18) 2px, transparent 2px, transparent 7px)",
                    }}
                  />
                </div>
              </div>

              {/* The pain list */}
              <div className="max-w-[800px]">
                <p className="font-plex-sans text-[20px] leading-normal tracking-[0.02em] text-rag/70">
                  Your build is
                </p>
                <div
                  className="mt-6 flex flex-col gap-2 pl-6 md:pl-8"
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
                        className="group relative max-w-[800px] rounded-xl py-2.5 pr-3 text-left font-newsreader text-[28px] leading-[1.15] tracking-[-0.02em] text-rag/70 transition-colors duration-200 hover:text-rag md:text-[40px] lg:text-[56px]"
                        initial={
                          reduceMotion
                            ? { opacity: 1, y: 0, x: 0 }
                            : { opacity: 0, y: 12, x: 0 }
                        }
                        animate={
                          revealed
                            ? { opacity: 1, y: 0, x: selected ? 8 : 0 }
                            : { opacity: 0, y: 12, x: 0 }
                        }
                        transition={
                          reduceMotion
                            ? { x: { duration: 0.2, ease: "easeOut" } }
                            : {
                                opacity: {
                                  duration: 0.4,
                                  ease: "easeOut",
                                  delay: entranceDelay + index * 0.07,
                                },
                                y: {
                                  type: "spring",
                                  stiffness: 420,
                                  damping: 30,
                                  delay: entranceDelay + index * 0.07,
                                },
                                x: { duration: 0.2, ease: "easeOut" },
                              }
                        }
                      >
                        <span
                          aria-hidden="true"
                          className={`absolute left-[-24px] top-1/2 h-[1.3rem] w-[4px] -translate-y-1/2 rounded-full bg-signal transition-opacity duration-200 md:left-[-32px] ${
                            selected ? "opacity-100" : "opacity-0"
                          }`}
                        />
                        <span className={selected ? "text-rag" : undefined}>
                          {item.label}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* The trace and resolution */}
              <div className="flex flex-col gap-8">
                <svg
                  viewBox={`0 0 ${TRACE_WIDTH} ${TRACE_HEIGHT}`}
                  role="img"
                  aria-labelledby="hero-trace-title hero-trace-desc"
                  className="h-auto w-full"
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

                <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
                  <p className="max-w-[500px] font-newsreader text-[24px] leading-[1.3] text-rag">
                    {resolutionLine}
                  </p>
                  <Link
                    href={{ pathname: "/check", query: intakeQuery }}
                    className="inline-flex shrink-0 items-center gap-2 rounded-full bg-signal px-6 py-3 font-plex-sans text-[15px] font-medium text-iron transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    Book a call
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
      </div>
    </HeroFrame>
  );
}