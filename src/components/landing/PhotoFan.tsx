"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { landSpring } from "@/components/landing/Reveal";

type FanShot = {
  src: string;
  alt: string;
};

const OFFSETS = [
  { x: -12, y: 8, r: -7, z: 1 },
  { x: 0, y: -2, r: 1, z: 3 },
  { x: 14, y: 10, r: 8, z: 2 },
];

/**
 * Three real shots, stacked like a desk pile. They land, then breathe.
 */
export function PhotoFan({ shots }: Readonly<{ shots: FanShot[] }>) {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto h-[240px] w-[240px] overflow-visible sm:h-[260px] sm:w-[260px]">
      {shots.slice(0, 3).map((shot, index) => {
        const pose = OFFSETS[index] ?? OFFSETS[0];
        return (
          <motion.div
            key={shot.src}
            className="absolute inset-[12%] overflow-hidden rounded-[20px] bg-iron shadow-[var(--shadow-artifact)]"
            style={{ zIndex: pose.z, y: pose.y }}
            initial={
              reduce ? false : { opacity: 0, x: 0, rotate: pose.r - 8, scale: 0.92 }
            }
            whileInView={{
              opacity: 1,
              x: pose.x,
              rotate: pose.r,
              scale: 1,
            }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={reduce ? { duration: 0 } : { ...landSpring, delay: index * 0.1 }}
          >
            <Image
              src={shot.src}
              alt={shot.alt}
              fill
              className="object-cover object-center"
              sizes="220px"
            />
          </motion.div>
        );
      })}
    </div>
  );
}
