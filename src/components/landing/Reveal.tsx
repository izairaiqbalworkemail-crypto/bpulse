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

/** Apple / Linear emphasized ease — opacity + 20px, ~700ms. */
export const landEase = [0.16, 1, 0.3, 1] as const;
const landDuration = 0.7;
const view = { once: true, margin: "-12% 0px" } as const;

type MotionBox = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

export function Slide({
  children,
  delay = 0,
  className,
}: Readonly<MotionBox & { from?: "left" | "right" }>) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, view);
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduce ? false : { opacity: 0 }}
      animate={inView || reduce ? { opacity: 1 } : { opacity: 0 }}
      transition={
        reduce ? { duration: 0 } : { duration: 0.35, ease: landEase, delay }
      }
    >
      {children}
    </motion.div>
  );
}

export function Reveal({ children, delay = 0, className }: Readonly<MotionBox>) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, view);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduce ? false : { opacity: 0 }}
      animate={inView || reduce ? { opacity: 1 } : { opacity: 0 }}
      transition={
        reduce ? { duration: 0 } : { duration: 0.35, ease: landEase, delay }
      }
    >
      {children}
    </motion.div>
  );
}

/**
 * Parent orchestrates children. Use with Item — the Framer stagger pattern
 * used on Linear, Stripe, and Apple marketing pages.
 */
export function Stagger({
  children,
  className,
  delay = 0,
  gap = 0.08,
}: Readonly<MotionBox & { gap?: number }>) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={view}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: gap, delayChildren: delay },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function Item({
  children,
  className,
}: Readonly<{ children: ReactNode; className?: string }>) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: { duration: 0.3, ease: landEase },
        },
      }}
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
    <motion.div
      ref={ref}
      className={className}
      initial={reduce ? false : { opacity: 0 }}
      animate={inView || reduce ? { opacity: 1 } : { opacity: 0 }}
      transition={
        reduce ? { duration: 0 } : { duration: 0.35, ease: landEase, delay }
      }
    >
      {children}
    </motion.div>
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
      initial={reduce ? false : { opacity: 0 }}
      animate={inView || reduce ? { opacity: 1 } : { opacity: 0 }}
      transition={
        reduce ? { duration: 0 } : { duration: 0.85, ease: landEase, delay }
      }
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

  return (
    <motion.div
      className={className}
      whileHover={reduce ? undefined : { y: -2 }}
      whileTap={reduce ? undefined : { y: 0 }}
      transition={landSpring}
    >
      {children}
    </motion.div>
  );
}

export function Tilt({
  children,
  className,
  intensity = 5,
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
