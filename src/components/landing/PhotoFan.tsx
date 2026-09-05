"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { landSpring } from "@/components/landing/Reveal";

type FanShot = {
  src: string;
  alt: string;
};

const OFFSETS = [
  { x: -22, y: 10, r: -9, z: 1 },
  { x: 4, y: -4, r: 2, z: 3 },
  { x: 28, y: 14, r: 11, z: 2 },
];

/**
 * Three real shots, stacked like a desk pile. They land, then breathe.
 */
export function PhotoFan({ shots }: Readonly<{ shots: FanShot[] }>) {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto h-[220px] w-[220px] sm:h-[240px] sm:w-[240px]">
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
            <motion.div
              className="absolute inset-0"
              animate={reduce ? undefined : { y: [0, -7, 0] }}
              transition={
                reduce
                  ? undefined
                  : {
                      duration: 5.2 + index * 0.7,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
              }
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                className="object-cover"
                sizes="220px"
              />
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
