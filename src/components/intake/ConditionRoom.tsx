"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { brand } from "@/config/brand";
import { getLot } from "@/content/lots";
import { getSpecialist } from "@/content/specialists";
import { useInView } from "@/hooks/useInView";

/**
 * The Condition Room — the landing hero's live chat reconstruction.
 *
 * A founder walks a product stuck at 80% into the crew's channel. The crew
 * conditions it live: they pull the receipts, name the single real gap, drop
 * a field-log stat block and an artifact "shot", and close with a pulse
 * verdict. Rendered as a typed replay with bouncing typing dots, reactions,
 * and a fake send box routed to the right specialist.
 *
 * Theme: rag surface, iron dock and bubbles, signal ONE fill (the pulse
 * verdict + active accents). No per-member colours — the palette stays
 * paper-dominant per DECISIONS.md. All chat copy is authored dialogue; every
 * figure inside stat blocks traces to a real bpulse2 lot in src/content.
 */

type RoomMember = string;

type Scene =
  | { t: "msg"; m: Exclude<RoomMember, "you">; text: string; react?: string[] }
  | { t: "note"; text: string }
  | { t: "stat"; label: string; rows: [string, string][] }
  | { t: "pulse"; verdict: string; body: string; lot: string }
  | { t: "shot"; m: Exclude<RoomMember, "you">; art: "deploy" | "appstore" | "audit" | "flame"; title: string; meta: string; file: string };

type Reply = { re?: RegExp; m: RoomMember; text: string | string[] };

type Room = {
  id: string;
  channel: string;
  tag: string;
  topic: string;
  pin: string;
  members: RoomMember[];
  hist: Scene[];
  scenes: Scene[];
  replies: Reply[];
  fallback: Reply[];
};

const nowHM = () =>
  new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/* ────────────────────────────────────────────────────────────
   The rooms. Chat copy is authored; figures trace to lots.
   ──────────────────────────────────────────────────────────── */

const ROOMS: Room[] = [
  {
    id: "rescue-room",
    channel: "rescue-floor",
    tag: "STUCK AT 80%",
    topic: "the build that wouldn't finish",
    pin: "pinned by aneeb · the 'almost done' checklist",
    members: ["aneeb", "hassan", "suhaib", "najiullah"],
    hist: [
      { t: "note", text: "4 days of messages collapsed above" },
      { t: "msg", m: "aneeb", text: "\"basically done\" for 4 months now." },
    ],
    scenes: [
      { t: "msg", m: "aneeb", text: "demo passes. prod fails. every single time." },
      { t: "msg", m: "hassan", text: "pulling the repo + prod logs. screenshots are not a deployment plan." },
      { t: "msg", m: "hassan", text: "found it. the prod env never existed. staging was doing all the lying." },
      { t: "msg", m: "suhaib", text: "so the whole gap is one env + one pipeline. that's not 80%, that's a missing finish line." },
      { t: "shot", m: "hassan", art: "deploy", title: "prod boots first try", meta: "vercel · deploy #2142", file: "prod-deploy-2142.png" },
      { t: "msg", m: "aneeb", text: "scoped. flat, 5 days, stays till live.", react: ["🔥", "🤝"] },
      { t: "stat", label: "the field log · rescue-floor", rows: [["stuck at 80%?", "until the env boots"], ["1 missing prod env", "the whole 'gap'"], ["deploy #2142", "green, first try"]] },
      { t: "pulse", verdict: "93% alive. worth finishing", body: "one gap worth fixing, the rest is polish. ping us when you want it shipped.", lot: "sully" },
    ],
    replies: [
      { re: /price|cost|how much|pricing|budget/i, m: "aneeb", text: "the pulse check is flat and quoted before any build starts. that's the price of certainty." },
      { re: /how long|timeline|when|deadline|days/i, m: "hassan", text: "a stalled build usually has one or two real gaps. that's why the audit is days, not months." },
      { re: /thank|legend|nice|lit|gg/i, m: "aneeb", text: "say less. this is the first team that read your logs before your invoice." },
      { re: /hola|hello|hi|hey|yo/i, m: "hassan", text: "hey. one of us replies for real within a day. this room is the rehearsal, the intake is the dm." },
    ],
    fallback: [
      { m: "hassan", text: "noted. in the field the answer is usually 'deploy again'. let's not assume though." },
      { m: "suhaib", text: "solid question. drop it in the intake and the crew answers properly. here i just nod and say 'field-tested take'." },
      { m: "najiullah", text: "that's the kind of question this room exists for." },
    ],
  },
  {
    id: "zero-to-live",
    channel: "build-from-zero",
    tag: "FROM ZERO → LIVE",
    topic: "blank repo, two apps, one spring",
    pin: "pinned by aneeb · launch checklist",
    members: ["aneeb", "suhaib", "hassan", "zaira"],
    hist: [
      { t: "note", text: "last week · the first commit landed" },
      { t: "msg", m: "suhaib", text: "blank repo. the market's waiting on both apps and a lot of trust." },
    ],
    scenes: [
      { t: "msg", m: "zaira", text: "two-sided marketplace: tradespeople to homeowners. ios + android this spring.", react: ["🤍"] },
      { t: "msg", m: "aneeb", text: "one-page spec: post a job, get three quotes, book, pay. both stores, then breathe." },
      { t: "msg", m: "hassan", text: "auth + listing on day one. we ship to the stores, not to a staging url." },
      { t: "shot", m: "suhaib", art: "appstore", title: "approved on both stores the same morning", meta: "app store connect", file: "store-review-1.0.png" },
      { t: "msg", m: "zaira", text: "the 'senior consultant' quoted six months. y'all just did my spring.", react: ["🔥"] },
      { t: "stat", label: "the field log · build-from-zero", rows: [["zero → 2 apps", "ios + android, live on stores"], ["two-sided loop", "post · quote · book · pay"], ["jan → spring", "blank repo to real users"]] },
      { t: "pulse", verdict: "96% alive. ship it now", body: "the loop is real and both stores approved it. start the countdown.", lot: "myusta" },
    ],
    replies: [
      { re: /price|cost|how much|pricing|budget/i, m: "aneeb", text: "fixed-scope builds are quoted up front after we read the actual spec. no time-and-materials drift, one number." },
      { re: /how long|timeline|when|deadline|months/i, m: "suhaib", text: "our zero-to-live builds ship a first deploy inside the first week, then harden outward." },
      { re: /app store|ios|android|review/i, m: "hassan", text: "store review is a milestone on the checklist, not a surprise at the end." },
      { re: /hola|hello|hi|hey|yo/i, m: "zaira", text: "hey! fresh build? the intake next to this is literally a dm with me." },
    ],
    fallback: [
      { m: "suhaib", text: "classic new-build question. short answer: scope tight, ship fast, stay till it's live." },
      { m: "hassan", text: "good q. put it in the intake. the crew reads every line before we open the repo." },
      { m: "zaira", text: "noted. if i had a channel for every idea, we'd hit the server limit." },
    ],
  },
  {
    id: "hipaa-floor",
    channel: "hipaa-floor",
    tag: "STALLED AI BUILD",
    topic: "the hospital takeover",
    pin: "pinned by aneeb · access lockdown",
    members: ["aneeb", "hassan", "najiullah", "suhaib"],
    hist: [
      { t: "note", text: "2 months stalled · dms unanswered · staging ghosted" },
      { t: "msg", m: "aneeb", text: "it's a healthcare ai. everyone it touches is a clinician mid-shift." },
    ],
    scenes: [
      { t: "msg", m: "hassan", text: "hipaa access locked before we read a single file. that's onboarding, not a feature." },
      { t: "msg", m: "suhaib", text: "build was 70% there. wiring wasn't. staging was a ghost, prod was a hope." },
      { t: "msg", m: "aneeb", text: "takeover scope: finish the pipeline, keep it compliant, own it long term.", react: ["🧠"] },
      { t: "shot", m: "hassan", art: "audit", title: "access screen before we touched the code", meta: "iam · role-based access", file: "hipaa-access-audit.png" },
      { t: "msg", m: "najiullah", text: "the model works in a notebook and dies in prod. my job is the eval layer that stops that.", react: ["🥹"] },
      { t: "msg", m: "aneeb", text: "450+ orgs, 5M+ clinical tasks a month, and access held the whole takeover." },
      { t: "stat", label: "the field log · hipaa-floor", rows: [["450+ orgs", "on the platform now"], ["5M+ clinical tasks", "every month"], ["hipaa", "access held the whole takeover"]] },
      { t: "pulse", verdict: "97% alive. worth the takeover", body: "compliance locked, pipeline finished, ownership transferred. the clinicians keep their rhythm.", lot: "sully" },
    ],
    replies: [
      { re: /hipaa|security|compliance|healthcare/i, m: "aneeb", text: "we ship under hipaa and hold access locked down. secure isn't a claim, it's a lock list." },
      { re: /price|cost|how much|budget/i, m: "najiullah", text: "takeovers quote after the audit. you only pay once we know what actually exists." },
      { re: /how long|timeline|when|months/i, m: "hassan", text: "the build was 70% there; the missing 30% was wiring. that compresses the timeline hard." },
      { re: /hola|hello|hi|hey|yo/i, m: "aneeb", text: "hey. this room exists for exactly this kind of 'almost done'." },
    ],
    fallback: [
      { m: "najiullah", text: "good question for the intake. here i'll just say: audits don't judge, they find the gap." },
      { m: "suhaib", text: "clinicians don't have time for drama, and neither do i." },
      { m: "aneeb", text: "noted. compliance isn't a feature. it's the room's wallpaper." },
    ],
  },
  {
    id: "id-check",
    channel: "id-check",
    tag: "SCALE TO 211+ COUNTRIES",
    topic: "latency is a personality test",
    pin: "pinned by aneeb · latency budget",
    members: ["aneeb", "hassan", "suhaib", "najiullah"],
    hist: [
      { t: "note", text: "deploys green for 6 straight days" },
      { t: "msg", m: "aneeb", text: "identity check has to hit 211 countries and my ping's already long.", react: ["🌍"] },
    ],
    scenes: [
      { t: "msg", m: "hassan", text: "sub-150ms or it's churn. yesterday's median: 92. p95: 138." },
      { t: "msg", m: "suhaib", text: "region fan-out, so a kyc check in jakarta doesn't ride to virginia and back." },
      { t: "shot", m: "hassan", art: "flame", title: "real p95 trace from #receipts", meta: "latency budget · sub-150ms", file: "verify-trace-p95.png" },
      { t: "msg", m: "aneeb", text: "my users won't wait. y'all made sure they never have to.", react: ["🤝"] },
      { t: "msg", m: "najiullah", text: "and the agentic compliance layer holds under load — model, eval, and edge all green." },
      { t: "stat", label: "the field log · id-check", rows: [["211+ countries", "verdicts served"], ["sub-150ms", "median response"], ["6 days", "deploys green"]] },
      { t: "pulse", verdict: "99% alive. at global scale", body: "the latency budget held and the model eval stayed green. ship it everywhere.", lot: "deepidv" },
    ],
    replies: [
      { re: /latency|speed|slow|ping|seconds/i, m: "hassan", text: "the budget is sub-150ms median. edges get hotter before origins change. that's the whole trick." },
      { re: /price|cost|budget/i, m: "aneeb", text: "scale work is scoped after the audit too. the traces tell us where the money goes." },
      { re: /how long|timeline|when/i, m: "suhaib", text: "fan-out tuning is days, not quarters, when the baseline is already healthy." },
      { re: /hola|hello|hi|hey|yo/i, m: "hassan", text: "hey! if the vibe here is 'weirdly calm under load', that's the point." },
    ],
    fallback: [
      { m: "aneeb", text: "latency gives me a stomach ache. this room solved it." },
      { m: "suhaib", text: "solid q. answer lives in the intake thread. the crew gets back to you same day." },
      { m: "najiullah", text: "noted. we optimize what's measurable, which is everything here." },
    ],
  },
  {
    id: "ship-floor",
    channel: "ship-floor",
    tag: "ONE CREW, EVERY LAYER",
    topic: "seniors only, no handoff",
    pin: "pinned by aneeb · the org chart that actually ships",
    members: ["aneeb", "hassan", "najiullah", "suhaib", "zaira"],
    hist: [
      { t: "note", text: "the whole hierarchy is on the line" },
      { t: "msg", m: "aneeb", text: "who actually works on this thing? i've been burned by juniors before." },
    ],
    scenes: [
      { t: "msg", m: "aneeb", text: "no juniors on this floor. here's the org chart, top to bottom, in one line." },
      { t: "msg", m: "hassan", text: "devops here. i keep prod boring so it never becomes the emergency." },
      { t: "msg", m: "najiullah", text: "ai/ml. the model works in a notebook and dies in prod. my job is the eval layer that stops that." },
      { t: "msg", m: "suhaib", text: "build lead. i ship the features out in the field, close to the people using them." },
      { t: "msg", m: "zaira", text: "principal full-stack. i decide what we refuse to build, so the rest ships." },
      { t: "shot", m: "hassan", art: "deploy", title: "the full pipeline, green", meta: "ci/cd · every service", file: "prod-deploy-2142.png" },
      { t: "msg", m: "aneeb", text: "same five people scope it, build it, and stay till it's live. no handoff, no translation loss.", react: ["🤝"] },
      { t: "stat", label: "the field log · ship-floor", rows: [["1 crew", "5 seniors, every layer"], ["no juniors", "scoped by the same hands"], ["stays till live", "real users, real url"]] },
      { t: "pulse", verdict: "all systems alive", body: "one crew, every layer, no handoff. meet each one at /team.", lot: "sully" },
    ],
    replies: [
      { re: /devops|infra|ci|cd|kubernetes|docker|deploy/i, m: "hassan", text: "that's my floor. drop the repo and i'll map the pipeline so nothing surprises anyone." },
      { re: /ai|ml|model|rag|llm|eval/i, m: "najiullah", text: "the ai lives or dies on the eval layer. i'll show you the results that prove it holds before it ships." },
      { re: /who|team|crew|junior|people|hierarchy|org/i, m: "aneeb", text: "five seniors, every layer, no juniors. the people who scope it are the ones on the keyboard." },
      { re: /price|cost|how much|budget/i, m: "aneeb", text: "flat quote after the audit, before any code. no time-and-materials drift." },
      { re: /hola|hello|hi|hey|yo/i, m: "zaira", text: "hey! want the whole crew or one of them directly? both are one click from here." },
    ],
    fallback: [
      { m: "hassan", text: "good question. short answer: the pipeline is the product. long answer lives in the intake." },
      { m: "suhaib", text: "field-tested take: ship the core loop first, everything else is noise." },
      { m: "aneeb", text: "this is the first crew where the org chart didn't include a 'mystery offshore team'." },
    ],
  },
];

/* ────────────────────────────────────────────────────────────
   Timing + helpers
   ──────────────────────────────────────────────────────────── */

function typeMs(text: string) {
  const base = 200 + text.length * 34;
  return Math.max(1200, Math.min(4800, base + Math.round(Math.random() * 900)));
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* ────────────────────────────────────────────────────────────
   Avatar — real specialist portrait, else initial
   ──────────────────────────────────────────────────────────── */

function Avatar({ member, size = 32 }: { member: string; size?: number }) {
  const spec = member === "you" ? null : getSpecialist(member);
  const inner = (
    <span
      className="inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full ring-1 ring-iron/20"
      style={{ width: size, height: size, fontSize: size * 0.42, background: "#efeae0", color: "#10161c" }}
    >
      {member === "you" ? (
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" className="h-[56%] w-[56%]" aria-hidden>
          <path d="M10 4v6m0 0-3.2-3.2M10 10l3.2-3.2M5 6.5V15a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V6.5" />
        </svg>
      ) : spec?.photo ? (
        <Image src={spec.photo} alt={spec.name} width={size} height={size} className="h-full w-full object-cover" />
      ) : (
        capitalize((spec?.name ?? member).charAt(0))
      )}
    </span>
  );
  return inner;
}

function memberName(member: string) {
  if (member === "you") return "you";
  const spec = getSpecialist(member);
  return spec.name.split(" ")[0].toLowerCase();
}

/* ────────────────────────────────────────────────────────────
   Sub-renderers
   ──────────────────────────────────────────────────────────── */

function TypingDots({ member }: { member: string }) {
  return (
    <div className="room-pop flex items-center gap-2.5 py-1" role="status" aria-label={`${memberName(member)} is typing`}>
      <Avatar member={member} size={24} />
      <span className="flex items-center gap-1.5 rounded-md border border-iron/15 bg-rag px-3 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-iron/40 animate-bounce" />
        <span className="h-1.5 w-1.5 rounded-full bg-iron/40 animate-bounce" style={{ animationDelay: "150ms" }} />
        <span className="h-1.5 w-1.5 rounded-full bg-iron/40 animate-bounce" style={{ animationDelay: "300ms" }} />
      </span>
      <span className="font-plex-mono text-[0.66rem] text-ink/50">is typing…</span>
    </div>
  );
}

type ShotArt = "deploy" | "appstore" | "audit" | "flame";

function ShotGlyph({ art }: { art: ShotArt }) {
  if (art === "appstore")
    return (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden>
        <path d="M10 3v14M10 3 5.5 7.5M10 3l4.5 4.5M16 12.5v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3" />
      </svg>
    );
  if (art === "audit")
    return (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden>
        <path d="M3 16.5 8.5 11l3 3 5.5-6M16 8h2M8.5 11l4-4.5M12 4.5h2.5V7" />
      </svg>
    );
  if (art === "flame")
    return (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden>
        <path d="M12 2c1 2-1 3-1 5s3 2 3 5c0 3-2.5 5-4 5-1.5 0-4-2-4-5 0-1.5 1-2.5 2-3.5.5 1 1.5 1.5 2.5 1C9.5 7 10 4 12 2Z" />
      </svg>
    );
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden>
      <path d="M3 7h14M3 13h14M3 5h14M3 15h14" />
    </svg>
  );
}

function ShotCard({
  art,
  title,
  meta,
  file,
}: {
  art: ShotArt;
  title: string;
  meta: string;
  file: string;
}) {
  return (
    <div className="room-shot my-1 ml-6 max-w-[300px] overflow-hidden rounded-surface border border-iron/20 bg-iron text-rag">
      <div className="flex items-center justify-between border-b border-rag/10 px-3 py-2">
        <span className="inline-flex items-center gap-1.5 font-plex-mono text-[0.62rem] tracking-[0.08em] text-rag/70">
          <span className="text-rag/80">
            <ShotGlyph art={art} />
          </span>
          {title}
        </span>
      </div>
      <div className="flex items-center justify-between gap-3 border-b border-rag/10 px-3 py-2.5">
        <div className="flex flex-col gap-1">
          <span className="flex gap-1.5">
            {[0.9, 0.7, 0.85, 0.6, 0.75, 0.65].map((o, i) => (
              <span key={i} className="h-1.5 w-5 rounded-sm bg-rag" style={{ opacity: o }} />
            ))}
          </span>
          <span className="flex gap-1.5">
            {[0.5, 0.65, 0.55, 0.7, 0.6].map((o, i) => (
              <span key={i} className="h-1.5 w-5 rounded-sm bg-rag/70" style={{ opacity: o }} />
            ))}
          </span>
        </div>
        <span className="text-[0.58rem] font-medium" style={{ color: "#f2c230" }}>
          ✓
        </span>
      </div>
      <div className="flex items-center justify-between px-3 py-1.5">
        <span className="font-plex-mono text-[0.56rem] text-rag/60">{meta}</span>
        <span className="font-plex-mono text-[0.56rem] text-rag/40">{file}</span>
      </div>
    </div>
  );
}

function StatBlock({ label, rows }: { label: string; rows: [string, string][] }) {
  return (
    <div className="room-pop my-1 ml-6 max-w-[320px] rounded-surface border border-iron/15 bg-iron/[0.03] px-3 py-2.5">
      <p className="font-plex-mono text-[0.6rem] tracking-[0.1em] text-ink/60">{label}</p>
      <div className="mt-2 flex flex-col gap-1">
        {rows.map(([k, v]) => (
          <div key={v} className="flex items-baseline justify-between gap-3 text-[0.7rem]">
            <span className="text-ink/85">{k}</span>
            <span className="font-plex-mono text-[0.62rem] text-ink/50">{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PulseVerdict({ verdict, body, lot }: { verdict: string; body: string; lot: string }) {
  const lotClient = getLot(lot).client;
  return (
    <div className="room-pop my-1 ml-6 max-w-[340px] overflow-hidden rounded-surface border border-iron/25 bg-iron text-rag">
      <div className="px-3 py-2.5">
        <div className="flex items-center justify-between">
          <p className="font-plex-mono text-[0.6rem] tracking-[0.12em] text-rag/50">pulse verdict · {lotClient}</p>
          <span className="text-[0.6rem]" style={{ color: "#f2c230" }}>
            ●
          </span>
        </div>
        <p className="mt-1.5 font-plex-sans text-[0.82rem] font-semibold text-rag">{verdict}</p>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-rag/15">
          <div
            className="h-full"
            style={{
              animation: "room-pulse-fill 1.8s cubic-bezier(0.2, 0.6, 0.3, 1) both",
              background: "#f2c230",
            }}
          />
        </div>
        <p className="mt-2 font-newsreader text-[0.78rem] leading-reading text-rag/75">{body}</p>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   Reduced motion (no dep — match on matchMedia)
   ──────────────────────────────────────────────────────────── */

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduce(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduce;
}

/* ────────────────────────────────────────────────────────────
   Main
   ──────────────────────────────────────────────────────────── */

export function ConditionRoom() {
  const reduce = usePrefersReducedMotion();
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const [roomId, setRoomId] = useState(ROOMS[0].id);
  const room = ROOMS.find((r) => r.id === roomId) ?? ROOMS[0];
  const [replayKey, setReplayKey] = useState(0);
  const [shown, setShown] = useState(0);
  const done = shown >= room.scenes.length;
  const listRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    if (!isInView) return;
    const replay = () => {
      setShown(0);
      const timers: number[] = [];
      room.scenes.forEach((line, i) => {
        const isMsg = line.t === "msg";
        const delay = reduce
          ? 60 * (i + 1)
          : 300 + i * (isMsg && "text" in line ? Math.min(600, typeMs(String((line as Scene & { text?: string }).text ?? ""))) : 260);
        timers.push(
          window.setTimeout(() => {
            setShown(i + 1);
          }, delay),
        );
      });
      timersRef.current = timers;
    };
    replay();
    return () => {
      timersRef.current.forEach((t) => window.clearTimeout(t));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId, replayKey, reduce, isInView]);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [shown, roomId]);

  const typing = !done;

  return (
    <div ref={ref} className="overflow-hidden rounded-surface border border-iron/20 bg-rag">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-iron/15 px-4 py-3 sm:px-5">
        <div className="min-w-0">
          <p className="flex items-center gap-1.5 font-plex-mono text-[0.6rem] tracking-[0.14em] text-ink/50">
            <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: "#4a8f6f" }} />
            #condition-room
          </p>
          <p className="truncate font-plex-sans text-[0.84rem] font-semibold tracking-tight text-iron">
            {capitalize(room.tag.toLowerCase())}
            <span className="text-ink/40"> · {room.topic}</span>
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {done && (
            <button
              type="button"
              onClick={() => setReplayKey((n) => n + 1)}
              className="font-plex-mono text-[0.6rem] tracking-[0.12em] text-ink/60 transition-colors hover:text-iron"
            >
              ⟳ replay
            </button>
          )}
          <a href={brand.contact.email ? `mailto:${brand.contact.email}` : "#"} className="font-plex-mono text-[0.6rem] tracking-[0.12em] text-iron underline decoration-signal/70 underline-offset-2">
            open dm ↗
          </a>
        </div>
      </div>

      {/* Channel rail */}
      <div className="hidden gap-1 overflow-x-auto border-b border-iron/15 px-3 py-2 lg:flex" role="tablist" aria-label="Pick a story">
        {ROOMS.map((r) => {
          const active = r.id === roomId;
          return (
            <button
              key={r.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setRoomId(r.id)}
              className={`flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 font-plex-mono text-[0.62rem] transition-colors ${
                active ? "border-transparent bg-iron text-rag" : "border-iron/15 text-ink/55 hover:bg-iron/5 hover:text-iron"
              }`}
            >
              #{r.channel}
            </button>
          );
        })}
      </div>

      {/* Pinned */}
      <button
        type="button"
        className="flex w-full items-center gap-2 border-b border-iron/15 px-4 py-1.5 text-left font-plex-mono text-[0.66rem] text-ink/55 transition-colors hover:text-iron sm:px-5"
      >
        <span className="text-iron">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" className="h-3 w-3" aria-hidden>
            <path d="M5 6.5 3.5 8 8 12.5 9.5 11M8 5V2.5M9 3l3.5 3.5H10M6.5 5 5.5 6 10 10.5l1-1" />
          </svg>
        </span>
        <span className="truncate">{room.pin}</span>
      </button>

      {/* Body */}
      <div ref={listRef} className="chat-scroll h-[380px] overflow-y-auto px-4 py-3 sm:h-[420px] sm:px-5">
        <div className="flex flex-col gap-0.5">
          <div className="mb-1 flex items-center gap-2 px-0.5 py-1">
            <span className="flex -space-x-1.5">
              {room.members.map((m) => (
                <span key={m} className="rounded-full ring-2 ring-rag">
                  <Avatar member={m} size={22} />
                </span>
              ))}
            </span>
            <span className="font-plex-mono text-[0.62rem] text-ink/45">{room.members.length} in this room</span>
          </div>

          {room.hist.map((line, i) => (
            <LineRow key={`hist-${i}`} line={line} />
          ))}

          {room.scenes.slice(0, shown).map((line, i) => (
            <LineRow key={`${replayKey}-${i}`} line={line} />
          ))}

          {typing ? <TypingDots member={lastSpeaker(room.scenes, shown)} /> : null}
        </div>
      </div>

      {/* Mobile channel switch */}
      <div className="flex gap-1 overflow-x-auto border-t border-iron/15 px-3 py-2 lg:hidden" role="tablist" aria-label="Pick a story">
        {ROOMS.map((r) => {
          const active = r.id === roomId;
          return (
            <button
              key={r.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setRoomId(r.id)}
              className={`flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full border px-2.5 py-1 font-plex-mono text-[0.6rem] transition-colors ${
                active ? "border-transparent bg-iron text-rag" : "border-iron/15 text-ink/55"
              }`}
            >
              #{r.channel}
            </button>
          );
        })}
      </div>

      {/* Input */}
      <RebuildInput roomId={roomId} reduce={reduce} />
    </div>
  );
}

function lastSpeaker(scenes: Scene[], shown: number) {
  for (let i = Math.min(shown, scenes.length) - 1; i >= 0; i--) {
    const s = scenes[i];
    if (s.t === "msg") return s.m;
  }
  return "hassan";
}

/* ────────────────────────────────────────────────────────────
   Line row
   ──────────────────────────────────────────────────────────── */

function LineRow({ line }: { line: Scene }) {
  if (line.t === "note") {
    return (
      <div className="room-pop flex items-center gap-2 px-0.5 py-1.5">
        <span className="h-px flex-1 bg-iron/10" />
        <span className="font-plex-mono text-[0.58rem] tracking-[0.08em] text-ink/45">{line.text}</span>
        <span className="h-px flex-1 bg-iron/10" />
      </div>
    );
  }
  if (line.t === "stat") return <StatBlock label={line.label} rows={line.rows} />;
  if (line.t === "pulse") return <PulseVerdict verdict={line.verdict} body={line.body} lot={line.lot} />;
  if (line.t === "shot")
    return <ShotCard art={line.art} title={line.title} meta={line.meta} file={line.file} />;
  if (line.t === "msg") {
    const isYou = line.m === "you";
    return (
      <div className={`room-pop my-0.5 flex items-start gap-2.5 ${isYou ? "flex-row-reverse" : ""}`}>
        <Avatar member={line.m} size={28} />
        <div className={`min-w-0 max-w-[85%] ${isYou ? "items-end" : ""}`}>
          <div className="flex items-baseline gap-2">
            <span className="font-plex-sans text-[0.68rem] font-semibold text-iron">{memberName(line.m)}</span>
            <span className="font-plex-mono text-[0.56rem] text-ink/40">{nowHM()}</span>
          </div>
          <div
            className={`mt-0.5 rounded-md border px-3 py-2 text-[0.78rem] leading-snug ${
              isYou ? "border-iron bg-iron text-rag" : "border-iron/15 bg-iron/[0.03] text-ink"
            }`}
          >
            {line.text}
          </div>
          {line.react && (
            <div className="mt-1 flex gap-1">
              {line.react.map((e) => (
                <span key={e} className="inline-flex items-center gap-1 rounded-full border border-iron/15 bg-rag px-1.5 py-0.5 text-[0.62rem] text-iron">
                  {e}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
  return null;
}

/* ────────────────────────────────────────────────────────────
   The fake send box with smart replies
   ──────────────────────────────────────────────────────────── */

function RebuildInput({ roomId, reduce }: { roomId: string; reduce: boolean }) {
  const room = ROOMS.find((r) => r.id === roomId) ?? ROOMS[0];
  const [input, setInput] = useState("");
  const [transcript, setTranscript] = useState<{ who: string; text: string; you?: boolean }[]>([]);
  const [responder, setResponder] = useState<string | null>(null);
  const repliesRef = useRef<HTMLDivElement>(null);

  const pickReply = useCallback(
    (low: string): Reply | null => {
      const match = room.replies.find((r) => r.re && r.re.test(low));
      return match ?? null;
    },
    [room],
  );

  const send = useCallback(
    (raw: string) => {
      const text = raw.trim();
      if (!text || responder) return;
      const low = text.toLowerCase();
      const match = pickReply(low) ?? pickRandom(room.fallback);
      const answered = Array.isArray(match.text) ? match.text[0] : match.text;
      const who = match.m;
      setTranscript((t) => [...t, { who: "you", text, you: true }]);
      setResponder(who);
      window.setTimeout(
        () => {
          setTranscript((t) => [...t, { who, text: answered }]);
          setResponder(null);
          if (repliesRef.current) repliesRef.current.scrollTop = repliesRef.current.scrollHeight;
        },
        reduce ? 120 : 900 + Math.min(1400, answered.length * 12),
      );
    },
    [pickReply, room, responder, reduce],
  );

  const firstReply = room.replies[0];
  const label = firstReply?.re
    ? firstReply.re.source.split("|")[0].trim()
    : "how much?";

  return (
    <div className="border-t border-iron/15 px-4 py-3 sm:px-5">
      {transcript.length === 0 ? (
        <div className="mb-2 flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => send(label || "how much?")}
            className="rounded-full border border-iron/15 bg-rag px-2.5 py-1 font-plex-mono text-[0.66rem] text-ink/60 transition-colors hover:border-iron/40 hover:text-iron"
          >
            {label || "how much?"}
          </button>
          <button
            type="button"
            onClick={() => send("how long does it take?")}
            className="rounded-full border border-iron/15 bg-rag px-2.5 py-1 font-plex-mono text-[0.66rem] text-ink/60 transition-colors hover:border-iron/40 hover:text-iron"
          >
            how long?
          </button>
          <button
            type="button"
            onClick={() => send("are you seniors?")}
            className="rounded-full border border-iron/15 bg-rag px-2.5 py-1 font-plex-mono text-[0.66rem] text-ink/60 transition-colors hover:border-iron/40 hover:text-iron"
          >
            seniors?
          </button>
        </div>
      ) : (
        <div ref={repliesRef} className="chat-scroll mb-2 flex max-h-24 flex-col gap-1 overflow-y-auto">
          {transcript.map((m, i) => (
            <p key={i} className={`room-pop text-[0.74rem] leading-snug ${m.you ? "text-ink/70" : "text-ink"}`}>
              <span className="font-plex-sans font-semibold text-iron">{m.you ? "you" : capitalize(m.who)}</span>
              <span className="mx-1 text-ink/30">·</span>
              {m.text}
            </p>
          ))}
          {responder ? <TypingReply name={capitalize(responder)} /> : null}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
          setInput("");
        }}
        className="flex items-center gap-2 rounded-full border border-iron/20 bg-rag px-4 py-2.5 transition-colors focus-within:border-iron"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={160}
          disabled={!!responder}
          className="min-w-0 flex-1 bg-transparent font-plex-sans text-[0.82rem] text-iron placeholder:text-ink/40 focus:outline-none"
          placeholder={`Message #${room.channel}`}
          aria-label="Message the channel"
        />
        <button
          type="submit"
          disabled={!input.trim() || !!responder}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[0.7rem] font-semibold transition-opacity enabled:hover:opacity-90 disabled:opacity-30"
          style={{ background: "#f2c230", color: "#10161c" }}
          aria-label="Send message"
        >
          send
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3" aria-hidden>
            <path d="M3 8h9M9 4.5 12.5 8 9 11.5" />
          </svg>
        </button>
      </form>

      <p className="mt-2 px-1 font-plex-mono text-[0.62rem] text-ink/45">
        {transcript.length > 0 ? (
          <>
            the crew answers on the spot.{" "}
            <Link href="/check" className="underline decoration-signal/70 underline-offset-2 hover:text-iron">
              jump to the real dm →
            </Link>
          </>
        ) : (
          <>
            type anything, or tap a suggestion.{" "}
            <Link href="/team" className="underline decoration-signal/70 underline-offset-2 hover:text-iron">
              meet the crew behind it →
            </Link>
          </>
        )}
      </p>
    </div>
  );
}

function TypingReply({ name }: { name: string }) {
  return (
    <p className="room-pop flex items-center gap-1.5 py-0.5 text-[0.72rem] text-ink/55" role="status" aria-label={`${name} is typing`}>
      <span className="flex items-center gap-1">
        <span className="h-1 w-1 rounded-full bg-iron/40 animate-bounce" />
        <span className="h-1 w-1 rounded-full bg-iron/40 animate-bounce" style={{ animationDelay: "150ms" }} />
        <span className="h-1 w-1 rounded-full bg-iron/40 animate-bounce" style={{ animationDelay: "300ms" }} />
      </span>
      {name} is typing…
    </p>
  );
}
