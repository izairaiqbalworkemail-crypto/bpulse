"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import {
  useEffect,
  useRef,
  useState,
  type PointerEvent,
  type ReactNode,
} from "react";

export const landSpring = { type: "spring" as const, stiffness: 160, damping: 22 };

type MotionBox = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

export function Reveal({ children, delay = 0, className }: Readonly<MotionBox>) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      animate={
        inView || reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }
      }
      transition={reduce ? { duration: 0 } : { ...landSpring, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Editorial type: the line is masked, then rises. */
export function Rise({ children, delay = 0, className }: Readonly<MotionBox>) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <div ref={ref} className={className}>
      <div className="overflow-hidden">
        <motion.div
          initial={reduce ? false : { y: "112%" }}
          animate={inView || reduce ? { y: "0%" } : { y: "112%" }}
          transition={reduce ? { duration: 0 } : { ...landSpring, delay }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}

/** Photo enter: crop opens, then the frame settles. */
export function Wipe({ children, delay = 0, className }: Readonly<MotionBox>) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-16% 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={
        reduce
          ? false
          : { clipPath: "inset(10% 8% 10% 8% round 32px)", scale: 1.06 }
      }
      animate={
        inView || reduce
          ? { clipPath: "inset(0% 0% 0% 0% round 32px)", scale: 1 }
          : { clipPath: "inset(10% 8% 10% 8% round 32px)", scale: 1.06 }
      }
      transition={reduce ? { duration: 0 } : { ...landSpring, delay }}
    >
      {children}
    </motion.div>
  );
}

export function Lift({
  children,
  className,
}: Readonly<{ children: ReactNode; className?: string }>) {
  const reduce = useReducedMotion();
  const x = useSpring(0, landSpring);
  const y = useSpring(0, landSpring);

  function onMove(event: PointerEvent<HTMLDivElement>) {
    if (reduce) return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * 0.14);
    y.set((event.clientY - (rect.top + rect.height / 2)) * 0.14);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      className={className}
      style={reduce ? undefined : { x, y }}
      whileHover={reduce ? undefined : { scale: 1.02 }}
      whileTap={reduce ? undefined : { scale: 0.985 }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      transition={landSpring}
    >
      {children}
    </motion.div>
  );
}

export function Tilt({
  children,
  className,
  intensity = 10,
}: Readonly<{ children: ReactNode; className?: string; intensity?: number }>) {
  const reduce = useReducedMotion();
  const rotateX = useSpring(0, landSpring);
  const rotateY = useSpring(0, landSpring);

  function onMove(event: PointerEvent<HTMLDivElement>) {
    if (reduce) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * intensity);
    rotateX.set((0.5 - py) * intensity);
  }

  function reset() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      className={className}
      style={
        reduce
          ? undefined
          : { rotateX, rotateY, transformPerspective: 900 }
      }
      onPointerMove={onMove}
      onPointerLeave={reset}
      whileHover={reduce ? undefined : { scale: 1.015 }}
      transition={landSpring}
    >
      {children}
    </motion.div>
  );
}

export function Count({
  to,
  prefix = "",
  className,
}: Readonly<{ to: number; prefix?: string; className?: string }>) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const value = useMotionValue(reduce ? to : 0);
  const rounded = useTransform(value, (latest) => Math.round(latest));
  const [shown, setShown] = useState(reduce ? to : 0);

  useEffect(() => {
    const unsub = rounded.on("change", (latest) => setShown(latest));
    return unsub;
  }, [rounded]);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(value, to, {
      duration: 1.35,
      ease: [0.16, 0.84, 0.32, 1],
    });
    return () => controls.stop();
  }, [inView, reduce, to, value]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {shown.toLocaleString("en-US")}
    </span>
  );
}
