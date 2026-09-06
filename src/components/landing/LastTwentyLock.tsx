"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
} from "motion/react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import { landEase, landSpring } from "@/components/landing/Reveal";

const LOCK = 80;
const snap = { type: "spring" as const, stiffness: 380, damping: 28 };

type LastTwentyLockProps = {
  onTried?: () => void;
  flush?: boolean;
};

/**
 * Type and a gold line. No photograph. Lands at 80%. Will not go further.
 */
export function LastTwentyLock({
  onTried,
  flush = false,
}: Readonly<LastTwentyLockProps>) {
  const reduce = Boolean(useReducedMotion());
  const frame = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const ready = useRef(reduce);
  const split = useMotionValue(reduce ? LOCK : 100);
  const [live, setLive] = useState(reduce ? LOCK : 100);
  const [tried, setTried] = useState(false);
  const [holding, setHolding] = useState(false);
  const inView = useInView(frame, { once: true, margin: "-18% 0px" });

  let caption = "Drag toward done.";
  if (reduce) caption = "Stuck at eighty.";
  else if (tried) caption = "It will not go.";

  const clipPath = useTransform(
    split,
    (value) => `inset(0 ${100 - value}% 0 0)`,
  );
  const handleLeft = useTransform(split, (value) => `${value}%`);

  useMotionValueEvent(split, "change", (value) => {
    setLive(Math.round(value));
  });

  const markTried = useCallback(() => {
    setTried((was) => {
      if (!was) onTried?.();
      return true;
    });
  }, [onTried]);

  useEffect(() => {
    if (reduce || !inView) return;
    const intro = animate(split, LOCK, {
      ...landSpring,
      delay: 0.18,
      onComplete: () => {
        ready.current = true;
        void animate(split, [LOCK, 85.5, LOCK], {
          duration: 1.15,
          ease: landEase,
          delay: 0.28,
        });
      },
    });
    return () => intro.stop();
  }, [inView, reduce, split]);

  function read(clientX: number) {
    const box = frame.current?.getBoundingClientRect();
    if (!box || box.width === 0) return LOCK;
    return Math.min(100, Math.max(22, ((clientX - box.left) / box.width) * 100));
  }

  function apply(raw: number) {
    if (raw <= LOCK) {
      split.set(raw);
      return;
    }
    split.set(LOCK + (raw - LOCK) * 0.16);
    markTried();
  }

  function snapBack() {
    dragging.current = false;
    setHolding(false);
    void animate(split, LOCK, snap);
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (reduce || !ready.current) return;
    dragging.current = true;
    setHolding(true);
    event.currentTarget.setPointerCapture(event.pointerId);
    apply(read(event.clientX));
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reduce || !dragging.current) return;
    apply(read(event.clientX));
  }

  function onPointerUp() {
    if (reduce || !dragging.current) return;
    if (split.get() > LOCK + 0.4) markTried();
    snapBack();
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (reduce || !ready.current) return;
    if (event.key === "ArrowRight" || event.key === "End") {
      event.preventDefault();
      markTried();
      apply(event.key === "End" ? 100 : split.get() + 10);
      snapBack();
    }
    if (event.key === "ArrowLeft" || event.key === "Home") {
      event.preventDefault();
      apply(event.key === "Home" ? 22 : split.get() - 6);
      snapBack();
    }
  }

  return (
    <div
      ref={frame}
      role="slider"
      tabIndex={reduce ? -1 : 0}
      aria-label="How finished the build looks"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={live}
      aria-valuetext="Stuck at eighty percent"
      aria-readonly={reduce}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onKeyDown={onKeyDown}
      className={`relative cursor-ew-resize overflow-hidden bg-iron-2 select-none touch-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-iron ${
        flush
          ? "aspect-[16/10] rounded-none shadow-none"
          : "aspect-[5/4] rounded-[28px] shadow-[var(--shadow-raised)] md:aspect-[16/10]"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 flex items-end justify-end px-6 pb-6 md:px-8 md:pb-8">
        <p className="max-w-[10ch] text-right font-plex-mono text-[11px] uppercase tracking-[0.14em] text-signal">
          The rest
        </p>
      </div>

      <motion.div
        className="absolute inset-0 bg-rag"
        style={{ clipPath }}
      >
        <div className="flex h-full flex-col justify-between px-6 py-6 md:px-8 md:py-8">
          <p className="font-plex-mono text-[11px] uppercase tracking-[0.14em] text-ink/70">
            Looks finished
          </p>
          <div>
            <p className="font-newsreader text-[64px] leading-none tracking-[-0.04em] text-iron md:text-[80px]">
              {live}
              <span className="text-[0.38em] text-ink/50">%</span>
            </p>
            <p className="mt-3 max-w-[18ch] font-newsreader text-[16px] leading-[1.35] text-ink">
              {caption}
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="pointer-events-none absolute inset-y-0 z-10"
        style={{ left: handleLeft }}
      >
        <span className="absolute inset-y-0 -left-px w-px bg-signal" />
        <motion.span
          className="absolute top-1/2 left-0 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-iron-2 shadow-[0_0_0_6px_rgba(242,194,48,0.16)] ring-1 ring-signal"
          animate={{ scale: holding ? 1.1 : 1 }}
          transition={snap}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-signal" />
        </motion.span>
      </motion.div>
    </div>
  );
}
