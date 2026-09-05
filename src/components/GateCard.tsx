"use client";

import { Reveal, Rise } from "@/components/landing/Reveal";

type GateCardProps = {
  n: string;
  title: string;
  mechanism: string;
  costs: string;
  proves: string;
};

export function GateCard({ n, title, mechanism, costs, proves }: Readonly<GateCardProps>) {
  return (
    <Reveal>
      <article className="card mb-4 px-8 py-10">
        <p className="font-plex-mono text-[13px] uppercase tracking-[0.14em] text-ink/70">
          Gate {n}
        </p>
        <Rise>
          <h2 className="mt-2 font-newsreader text-[24px] leading-[1.15] tracking-[-0.02em] text-iron">
            {title}
          </h2>
        </Rise>
        <dl className="mt-6 grid gap-5 md:grid-cols-3">
          <div>
            <dt className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">
              Mechanism
            </dt>
            <dd className="mt-2 font-newsreader text-[16px] leading-[1.5] text-ink">
              {mechanism}
            </dd>
          </div>
          <div>
            <dt className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">
              What it costs us
            </dt>
            <dd className="mt-2 font-newsreader text-[16px] leading-[1.5] text-ink">
              {costs}
            </dd>
          </div>
          <div>
            <dt className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">
              What it proves
            </dt>
            <dd className="mt-2 font-newsreader text-[16px] leading-[1.5] text-ink">
              {proves}
            </dd>
          </div>
        </dl>
      </article>
    </Reveal>
  );
}
