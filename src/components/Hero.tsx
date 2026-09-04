"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useMemo, useRef, useState, type KeyboardEvent } from "react";

import { Mark } from "@/components/primitives/Mark";
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

const NAV_ITEMS = [
  { label: "Work", href: "/work" },
  { label: "Crew", href: "/team" },
  { label: "Check", href: "/check" },
  { label: "Notices", href: "/notices" },
] as const;

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

const heroScreenshot = {
  src: "/project-shots/project-sully.png",
  width: 1440,
  height: 900,
  alt: "Sully.ai product dashboard screenshot",
};

export function Hero() {
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
    <section className="relative border-b border-rag/16 bg-iron text-rag" style={{ minHeight: "100svh" }}>
      <div className="mx-auto w-full max-w-[1320px] px-4 pb-14 pt-6 sm:px-6 lg:px-10 lg:pb-20 lg:pt-8">
        <div className="mb-10 flex justify-center lg:mb-12 lg:justify-start">
          <div className="inline-flex items-center gap-3 rounded-full border border-rag/18 bg-[color-mix(in_srgb,var(--color-iron-2)_78%,transparent)] px-4 py-2 backdrop-blur-sm lg:px-5">
            <Link href="/" className="inline-flex items-center gap-2.5 pr-2">
              <Mark size={20} />
              <span className="font-plex-sans text-sm font-medium tracking-[0.01em] text-rag">
                bpulse
              </span>
            </Link>

            <nav aria-label="Primary" className="hidden items-center gap-4 md:flex">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full px-3 py-1.5 font-plex-sans text-xs tracking-[0.06em] text-rag/78 uppercase transition-colors duration-200 hover:text-rag"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 xl:grid-cols-12 xl:gap-14">
          <div className="xl:col-span-7">
            <div className="max-w-[42rem]">
              <div className="mb-8 rounded-2xl border border-rag/16 bg-iron-2/45 p-5 sm:p-6">
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-plex-mono text-[0.78rem] tabular-nums text-rag/78">80%</span>
                  <span className="font-plex-mono text-[0.74rem] text-rag/70">the last 20%</span>
                </div>

                <div className="relative h-3.5 overflow-hidden rounded-full border border-rag/18 bg-iron/75">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-signal"
                    initial={{ width: 0 }}
                    animate={{ width: "80%" }}
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { duration: 1.1, ease: [0.11, 0.79, 0.16, 0.99] }
                    }
                  />
                  <div
                    className="absolute inset-y-0 right-0 w-[20%] border-l border-rag/30"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(135deg, rgba(239,234,224,0.2) 0, rgba(239,234,224,0.2) 2px, transparent 2px, transparent 7px)",
                    }}
                  />
                </div>
              </div>

              <p className="font-newsreader text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.2] text-rag/72">
                Your build is
              </p>

              <div className="mt-4 flex flex-col gap-2" role="group" aria-label="Select every line that matches your current build">
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
                      className="group relative rounded-xl py-2.5 pr-3 text-left font-newsreader text-[clamp(1.75rem,3.2vw,2.5rem)] leading-[1.08] tracking-[-0.015em] text-rag/74 outline-none transition-[color,transform] duration-200 ease-out hover:text-rag focus-visible:ring-2 focus-visible:ring-signal"
                      animate={{ x: selected ? 8 : 0 }}
                      transition={reduceMotion ? { duration: 0 } : { duration: 0.2, ease: "easeOut" }}
                    >
                      <span
                        aria-hidden="true"
                        className={`absolute left-[-14px] top-1/2 h-[1.35rem] w-[4px] -translate-y-1/2 rounded-full bg-signal transition-opacity duration-200 ${
                          selected ? "opacity-100" : "opacity-0"
                        }`}
                      />
                      <span className={selected ? "text-rag" : undefined}>{item.label}</span>
                    </motion.button>
                  );
                })}
              </div>

              <div className="mt-8 rounded-2xl border border-rag/16 bg-iron-2/45 p-4 sm:p-5">
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
                    d={`M 0 ${TRACE_HEIGHT / 2} L ${TRACE_WIDTH} ${TRACE_HEIGHT / 2}`}
                    stroke="rgba(239, 234, 224, 0.12)"
                    strokeWidth="1"
                    fill="none"
                  />
                  <motion.path
                    d={tracePath}
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
              </div>

              <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
                <p className="font-newsreader text-[clamp(1.1rem,1.5vw,1.35rem)] leading-[1.3] text-rag/88">
                  Five days to know what it takes,
                </p>
                <Link
                  href={{ pathname: "/check", query: intakeQuery }}
                  className="inline-flex items-center gap-2 rounded-full bg-signal px-6 py-3 font-plex-sans text-sm font-medium text-iron transition-transform duration-200 hover:-translate-y-0.5"
                >
                  Start the Check
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="xl:col-span-5">
            <div className="h-full">
              {heroScreenshot ? (
                <figure className="overflow-hidden rounded-3xl border border-rag/14 bg-iron-2/40 p-2">
                  <Image
                    src={heroScreenshot.src}
                    alt={heroScreenshot.alt}
                    width={heroScreenshot.width}
                    height={heroScreenshot.height}
                    priority
                    className="h-auto w-full rounded-2xl border border-rag/12 object-cover"
                  />
                </figure>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div className="h-5 w-full bg-rag" aria-hidden="true" />
    </section>
  );
}
