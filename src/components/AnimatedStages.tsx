"use client";

import Link from "next/link";
import { Reveal } from "@/components/landing/Reveal";
import { closeStages } from "@/content/process";

export function AnimatedStages({
  stages,
}: Readonly<{ stages: readonly (typeof closeStages)[number][] }>) {
  return (
    <ol className="mt-12 border-t border-iron/10">
      {stages.map((stage, index) => (
        <li key={stage.id} className="border-b border-iron/10 py-10">
          <Reveal delay={index * 0.04}>
            <p className="font-plex-mono text-[12px] uppercase tracking-[0.1em] text-ink/70">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h2 className="mt-2 font-newsreader text-[28px] leading-[1.15] text-iron md:text-[32px]">
              {stage.label}
            </h2>
            <dl className="mt-6 grid gap-6 sm:grid-cols-2">
              {(
                [
                  ["What the platform does", stage.happens],
                  ["What you receive", stage.receive],
                  ["What you sign", stage.sign],
                ] as const
              ).map(([label, text]) => (
                <div key={label}>
                  <dt className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/70">
                    {label}
                  </dt>
                  <dd className="mt-1.5 font-newsreader text-[16px] leading-[1.45] text-ink">
                    {text}
                  </dd>
                </div>
              ))}
              <div>
                <dt className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/70">
                  What you can see
                </dt>
                <dd className="mt-1.5 font-newsreader text-[16px] leading-[1.45] text-ink">
                  {stage.see}{" "}
                  <Link
                    href={stage.demoHref}
                    className="underline decoration-iron/40 underline-offset-4 hover:decoration-iron"
                  >
                    Open the sample {stage.label.toLowerCase()} view
                  </Link>
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
