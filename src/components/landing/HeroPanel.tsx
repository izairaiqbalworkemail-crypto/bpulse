"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { heroProjects } from "@/content/landing-sections";
import { Reveal } from "@/components/landing/Reveal";

type Project = (typeof heroProjects)[number];

/** The animated parts of the panel. Everything else derives from the project. */
type Frame = {
  tag: string;
  action: string;
  pct: number;
  fill: number;
  day: string;
  next: string;
  shownRows: number;
  working: boolean;
  typing: boolean;
  done: boolean;
};

/** The panel's resting state before the engine takes over. */
function resetFrame(): Frame {
  return {
    tag: "",
    action: "",
    pct: 0,
    fill: 0,
    day: "",
    next: "",
    shownRows: 0,
    working: true,
    typing: false,
    done: false,
  };
}

/** Project zero, fully drawn — what the server renders before the engine runs. */
function finalFrame(project: Project): Frame {
  return {
    tag: project.tag,
    action: project.actions[project.actions.length - 1] ?? "",
    pct: project.pct,
    fill: project.pct,
    day: project.day,
    next: project.next,
    shownRows: 3,
    working: false,
    typing: false,
    done: project.done,
  };
}

/**
 * The portal window in the hero. Cycles real engagements: types the portal
 * URL, works through the action lines, fills the bar, staggers the log rows,
 * then moves to the next project. Hover or keyboard focus holds the frame;
 * the dots jump straight to a project. Reduced motion draws each state whole.
 */
export function HeroPanel() {
  const reduce = useReducedMotion();
  const pausedRef = useRef(false);

  // One object so a dot click swaps project and frame in a single render —
  // no flash of the new project drawn in the old frame's state.
  const [view, setView] = useState(() => ({
    idx: 0,
    frame: finalFrame(heroProjects[0]),
  }));
  // Bumped on every manual start so re-picking the current project replays it.
  const [runToken, setRunToken] = useState(0);

  useEffect(() => {
    const project = heroProjects[view.idx];
    let run = true;

    const wait = (ms: number) =>
      new Promise<void>((resolve) =>
        setTimeout(resolve, reduce ? Math.min(ms, 80) : ms),
      );

    const patch = (part: Partial<Frame>) =>
      setView((v) => ({ ...v, frame: { ...v.frame, ...part } }));

    async function typeInto(
      key: "tag" | "action",
      text: string,
      speed: number,
    ) {
      if (reduce) {
        patch({ [key]: text } as Partial<Frame>);
        return;
      }
      patch({ typing: true });
      for (let i = 0; i <= text.length; i++) {
        if (!run) return;
        patch({ [key]: text.slice(0, i) } as Partial<Frame>);
        await wait(speed);
      }
      patch({ typing: false });
    }

    async function tickPct(to: number) {
      if (reduce) {
        patch({ pct: to });
        return;
      }
      const steps = Math.max(1, Math.round(1500 / 40));
      for (let s = 1; s <= steps; s++) {
        if (!run) return;
        patch({ pct: Math.round((to * s) / steps) });
        await wait(40);
      }
    }

    async function play() {
      patch(resetFrame());

      await typeInto("tag", project.tag, 22);
      if (!run) return;
      await wait(150);

      for (const line of project.actions) {
        if (!run) return;
        await typeInto("action", line, 16);
        await wait(reduce ? 60 : 480);
      }
      if (!run) return;

      patch({ day: project.day, next: project.next, fill: project.pct });
      void tickPct(project.pct);
      await wait(reduce ? 100 : 1500);
      if (!run) return;

      for (let shown = 1; shown <= 3; shown++) {
        if (!run) return;
        patch({ shownRows: shown });
        await wait(reduce ? 30 : 120);
      }
      if (!run) return;

      patch({ working: false });

      if (project.done) {
        await wait(reduce ? 30 : 300);
        if (!run) return;
        patch({ done: true });
      }

      await wait(reduce ? 200 : 2600);
      // Hold the finished frame while the pointer or keyboard focus is on it.
      while (run && pausedRef.current) {
        await wait(200);
      }
      if (!run) return;

      setView((v) => ({
        idx: (v.idx + 1) % heroProjects.length,
        frame: resetFrame(),
      }));
    }

    void play();
    return () => {
      run = false;
    };
  }, [view.idx, runToken, reduce]);

  const project = heroProjects[view.idx];
  const frame = view.frame;

  const hold = () => {
    pausedRef.current = true;
  };
  const release = () => {
    pausedRef.current = false;
  };

  function pick(i: number) {
    setView({ idx: i, frame: resetFrame() });
    setRunToken((t) => t + 1);
  }

  return (
    <>
      <Reveal delay={0.2} className="lp-hero-visual">
        <div className="lp-hv-chrome">
          <span className="lp-hv-dot" />
          <span className="lp-hv-dot" />
          <span className="lp-hv-dot" />
        </div>
        <div
          className={`lp-hv-body${frame.working ? " is-working" : ""}`}
          onMouseEnter={hold}
          onMouseLeave={release}
        >
          <div aria-hidden className="lp-hv-sweep" />

          <div className="lp-hv-primary">
            <p className="lp-hv-tag">
              {frame.tag}
              {frame.typing ? (
                <span aria-hidden className="lp-hv-cursor" />
              ) : null}
            </p>
            <div className="lp-hv-status-row">
              <p className="lp-hv-status">
                {project.stage} — <span className="lp-hv-pct">{frame.pct}</span>%
              </p>
              <span
                aria-hidden
                className={`lp-hv-live-dot${frame.working ? " on" : ""}`}
              />
            </div>
            <p className="lp-hv-action">{frame.action}</p>
            <div className="lp-hv-bar">
              <div
                className={`lp-hv-fill${frame.done ? " is-done" : ""}`}
                style={{ width: `${frame.fill}%` }}
              />
            </div>
            <p className="lp-hv-cap">
              <span>{frame.day}</span>
              <span>{frame.next}</span>
            </p>
            {/* Always mounted so the badge fades into reserved space. */}
            <p className={`lp-hv-badge${frame.done ? " show" : ""}`}>
              Shipped ✓
            </p>
          </div>

          <div className="lp-hv-sub">
            <h4>{project.logTitle}</h4>
            <div className={`lp-hv-row${frame.shownRows >= 1 ? " show" : ""}`}>
              <span>{project.rows[0].label}</span>
              <span>{project.rows[0].dated}</span>
            </div>
            <div className={`lp-hv-row${frame.shownRows >= 2 ? " show" : ""}`}>
              <span>{project.rows[1].label}</span>
              <span>{project.rows[1].dated}</span>
            </div>
            <h4>Revocation log</h4>
            <div className={`lp-hv-row${frame.shownRows >= 3 ? " show" : ""}`}>
              <span>{project.revocation.label}</span>
              <span>{project.revocation.status}</span>
            </div>
          </div>
        </div>
      </Reveal>

      <div
        className="lp-hv-dots"
        onBlur={release}
        onFocus={hold}
        onMouseEnter={hold}
        onMouseLeave={release}
      >
        {heroProjects.map((p, i) => (
          <button
            aria-label={`Show ${p.name}`}
            className={i === view.idx ? "is-active" : undefined}
            key={p.name}
            onClick={() => pick(i)}
            type="button"
          />
        ))}
      </div>
    </>
  );
}
