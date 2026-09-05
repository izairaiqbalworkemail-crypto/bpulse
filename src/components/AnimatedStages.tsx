"use client";

import Link from "next/link";
import { Reveal, Rise, Tilt } from "@/components/landing/Reveal";
import { closeStages } from "@/content/process";

export function AnimatedStages({
  stages,
}: Readonly<{ stages: readonly (typeof closeStages)[number][] }>) {
  return (
    <ol className="mt-12 flex flex-col gap-0">
      {stages.map((stage, index) => (
        <li key={stage.id} className="card mb-4 px-8 py-10">
          <Reveal delay={index * 0.04}>
            <Rise>
              <h2 className="font-newsreader text-[22px] leading-[1.2] text-iron md:text-[24px]">
                {stage.label}
              </h2>
            </Rise>
            <dl className="mt-5 grid gap-4 sm:grid-cols-2">
              {(
                [
                  ["What happens", stage.happens],
                  ["What you receive", stage.receive],
                  ["What you sign", stage.sign],
                ] as const
              ).map(([label, text]) => (
                <div key={label}>
                  <dt className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/70">
                    {label}
                  </dt>
                  <dd className="mt-1.5 font-newsreader text-[15px] leading-[1.45] text-ink">
                    {text}
                  </dd>
                </div>
              ))}
              <div>
                <dt className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/70">
                  What you can see
                </dt>
                <dd className="mt-1.5 font-newsreader text-[15px] leading-[1.45] text-ink">
                  {stage.see}{" "}
                  <Tilt className="inline-block">
                    <Link
                      href={stage.demoHref}
                      className="underline decoration-iron/40 underline-offset-4 hover:decoration-iron"
                    >
                      Open the sample {stage.label.toLowerCase()} view
                    </Link>
                  </Tilt>
                  .
                </dd>
              </div>
            </dl>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
