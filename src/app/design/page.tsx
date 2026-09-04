import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Mark } from "@/components/primitives/Mark";
import { DataLine } from "@/components/primitives/DataLine";
import { Grade } from "@/components/primitives/Grade";
import { Credit } from "@/components/primitives/Credit";
import { Notice } from "@/components/primitives/Notice";
import { Lot } from "@/components/primitives/Lot";
import { MotionReplay } from "./motion-replay";

export const metadata: Metadata = buildMetadata({
  title: "Design",
  description:
    "The bpulse styleguide — every token, primitive, and motion behaviour.",
  path: "/design",
  robots: "noindex, nofollow",
});

const spacingScale = [
  { name: "4", px: 4 },
  { name: "8", px: 8 },
  { name: "12", px: 12 },
  { name: "16", px: 16 },
  { name: "24", px: 24 },
  { name: "32", px: 32 },
  { name: "48", px: 48 },
  { name: "64", px: 64 },
  { name: "96", px: 96 },
  { name: "144", px: 144 },
];

const typeSpecimen = [
  {
    role: "Lead title",
    desktop: "72",
    mobile: "36",
    sample: "The last twenty percent",
  },
  {
    role: "Lot title",
    desktop: "34",
    mobile: "26",
    sample: "A hospital platform that stopped",
  },
  {
    role: "Section label",
    desktop: "15",
    mobile: "14",
    sample: "Condition report",
  },
  {
    role: "Reading",
    desktop: "18",
    mobile: "16",
    sample: "What arrived, what was wrong, what it took.",
  },
  { role: "Data / mono", desktop: "14", mobile: "13", sample: "0123456789" },
  {
    role: "Caption",
    desktop: "13",
    mobile: "12",
    sample: "Assessed 12 March 2026",
  },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-8 font-plex-sans text-data tracking-[0.08em] text-ink/70 uppercase">
      {children}
    </h2>
  );
}

export default function DesignPage() {
  return (
    <>
      <PageHero
        kicker="Design"
        title="The system"
        dek="Every token, primitive, and motion behaviour. This is the reference for how the work gets reviewed."
        hideAction
      />
    <div className="grid-container py-16 md:py-24">

      {/* Colours */}
      <section className="mt-24">
        <SectionLabel>Colour</SectionLabel>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: "rag",
              hex: "#EFEAE0",
              note: "The ground — ~95% of surface area",
            },
            {
              name: "iron",
              hex: "#10161C",
              note: "Masthead and closing rule only",
            },
            { name: "ink", hex: "#38424E", note: "Secondary text on paper" },
            { name: "signal", hex: "#F2C230", note: "One fill per viewport" },
            {
              name: "sound",
              hex: "#4A8F6F",
              note: "Grade: holding — word required",
            },
            {
              name: "unsound",
              hex: "#B03A28",
              note: "Grade: not holding — word required",
            },
          ].map((c) => (
            <div
              key={c.name}
              className="rounded-surface border border-iron/15 p-6"
            >
              <div
                className="h-16 w-full rounded-surface"
                style={{
                  backgroundColor: c.hex,
                  outline:
                    c.name === "rag"
                      ? "1px solid var(--color-iron)/20"
                      : "none",
                }}
              />
              <p className="mt-4 font-plex-mono text-data text-iron">
                {c.name}
              </p>
              <p className="font-plex-mono text-caption text-ink/60">{c.hex}</p>
              <p className="mt-2 font-plex-sans text-sm text-ink/80">
                {c.note}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Type */}
      <section className="mt-24">
        <SectionLabel>Type</SectionLabel>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-iron/15">
                <th className="py-3 pr-4 font-plex-mono text-caption text-ink/60">
                  Role
                </th>
                <th className="py-3 pr-4 font-plex-mono text-caption text-ink/60">
                  Desktop
                </th>
                <th className="py-3 pr-4 font-plex-mono text-caption text-ink/60">
                  Mobile
                </th>
                <th className="py-3 font-plex-mono text-caption text-ink/60">
                  Specimen
                </th>
              </tr>
            </thead>
            <tbody>
              {typeSpecimen.map((t) => (
                <tr key={t.role} className="border-b border-iron/10">
                  <td className="py-4 pr-4 font-plex-sans text-sm text-ink/70">
                    {t.role}
                  </td>
                  <td className="py-4 pr-4 font-plex-mono text-data text-iron">
                    {t.desktop}
                  </td>
                  <td className="py-4 pr-4 font-plex-mono text-data text-iron">
                    {t.mobile}
                  </td>
                  <td className="py-4 font-newsreader text-reading text-iron">
                    {t.sample}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Spacing scale */}
      <section className="mt-24">
        <SectionLabel>Spacing</SectionLabel>
        <div className="flex flex-col gap-2">
          {spacingScale.map((s) => (
            <div key={s.px} className="flex items-center gap-4">
              <span className="w-12 shrink-0 font-plex-mono text-data text-ink/70">
                {s.px}px
              </span>
              <div
                className="h-4 bg-signal/60"
                style={{ width: `${s.px}px` }}
              />
              <span className="font-plex-sans text-sm text-ink/60">
                {s.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Primitives — Mark */}
      <section className="mt-24">
        <SectionLabel>Mark</SectionLabel>
        <div className="flex items-center gap-8 rounded-surface border border-iron/15 p-8">
          <Mark size={200} />
          <Mark size={64} />
          <Mark size={32} />
          <Mark size={16} />
          <Mark size={32} mono />
        </div>
        <p className="mt-6 font-plex-mono text-caption text-ink/60">
          200 / 64 / 32 / 16 px — public/logo.png
        </p>
      </section>

      {/* Primitives — DataLine */}
      <section className="mt-24">
        <SectionLabel>DataLine</SectionLabel>
        <div className="max-w-[640px] rounded-surface border border-iron/15 p-8">
          <dl className="flex flex-col gap-4">
            <DataLine label="Client" value="Sully.ai" />
            <DataLine label="Scope" value="$42,000" />
            <DataLine label="Duration" value="11 weeks" />
            <DataLine label="Assessment" value="12 Mar 2026" />
          </dl>
        </div>
      </section>

      {/* Primitives — Grade */}
      <section className="mt-24">
        <SectionLabel>Grade</SectionLabel>
        <div className="flex flex-col gap-6 rounded-surface border border-iron/15 p-8 md:flex-row">
          <Grade grade="sound" label="Holding" date="12 Mar 2026" />
          <Grade grade="unsound" label="Not holding" date="12 Mar 2026" />
        </div>
        <p className="mt-6 font-plex-mono text-caption text-ink/60">
          Colour never carries meaning alone — always paired with the word and
          the date
        </p>
      </section>

      {/* Primitives — Credit */}
      <section className="mt-24">
        <SectionLabel>Credit</SectionLabel>
        <div className="flex flex-col gap-8 rounded-surface border border-iron/15 p-8 md:flex-row">
          <Credit
            name="Aneeb Iqbal"
            capability="Delivery"
            line="Founder and principal engineer."
            portraitSrc="/team/aneeb.jpg"
            portraitAlt="Aneeb Iqbal"
          />
          <Credit
            name="Fizza"
            capability="Integration"
            line="Senior developer, forward-deployed."
          />
        </div>
        <p className="mt-6 font-plex-mono text-caption text-ink/60">
          A missing portrait renders as name and role — never a grey box
        </p>
      </section>

      {/* Primitives — Notice */}
      <section className="mt-24">
        <SectionLabel>Notice</SectionLabel>
        <div className="max-w-[720px] rounded-surface border border-iron/15 p-8">
          <Notice
            question="Will the check see everything?"
            answer="No. A five-day assessment finds the blocking defects and the ones it can see clearly. It does not promise to surface every latent issue before any work begins — that would be a false claim."
          />
          <Notice
            question="What happens if I change scope?"
            answer="Scope is agreed in writing before any code. A change is a new agreement, priced and signed before it starts. Nothing is absorbed silently."
          />
        </div>
      </section>

      {/* Primitives — Lot */}
      <section className="mt-24">
        <SectionLabel>Lot</SectionLabel>
        <div className="rounded-surface border border-iron/15 p-8">
          <Lot
            lotNumber="LOT 034"
            title="A hospital platform that stopped at 80%"
            condition="What arrived: role-based access under HIPAA, real-time clinical dashboards, and automated document processing. What was wrong: the audit trail was not wired to the deployment, and the model fine-tune was not reproducible."
            dataLines={[
              { label: "Client", value: "Sully.ai" },
              { label: "Scope", value: "$42,000" },
              { label: "Duration", value: "11 weeks" },
            ]}
            conditionGrade={{
              state: "stalled",
              grade: "sound",
              label: "Stalled on arrival",
              date: "12 Mar 2026",
            }}
            limit="Limit of liability: assessment within agreed scope only."
            specialist={
              <Credit
                name="Aneeb Iqbal"
                capability="Delivery"
                portraitSrc="/team/aneeb.jpg"
                portraitAlt="Aneeb Iqbal"
              />
            }
          />
        </div>
      </section>

      {/* Motion — server-rendered label, client replay */}
      <section className="mt-24">
        <SectionLabel>Motion</SectionLabel>
        <div className="max-w-[720px] rounded-surface border border-iron/15 p-8">
          <MotionReplay />
        </div>
      </section>
    </div>
    </>
  );
}
