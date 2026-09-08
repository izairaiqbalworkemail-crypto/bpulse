import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Mark } from "@/components/primitives/Mark";
import { DataLine } from "@/components/primitives/DataLine";
import { Grade } from "@/components/primitives/Grade";
import { Credit } from "@/components/primitives/Credit";
import { Notice } from "@/components/primitives/Notice";
import { Lot } from "@/components/primitives/Lot";
import { brand } from "@/config/brand";
import { brandPosition, studio } from "@/content/studio";
import { MotionReplay } from "./motion-replay";
import { EightyBar } from "@/components/EightyBar";
import { State } from "@/components/primitives/State";
import { BUILD_STATES, STATE_WORDS } from "@/lib/brand/states";

export const metadata: Metadata = buildMetadata({
  title: "Brand",
  description:
    "How bpulse sits next to talent networks — a Lahore studio, not a marketplace. Tokens, primitives, and motion.",
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
    sample: "What was stuck, what was wrong, what it took.",
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
    <h2 className="mb-8 font-plex-sans text-data tracking-[0.08em] text-quill/70 uppercase">
      {children}
    </h2>
  );
}

export default function DesignPage() {
  return (
    <>
      <PageHero
        kicker="Brand"
        title="A studio, not a network"
        dek={brandPosition.claim}
        hideAction
      />
    <div className="grid-container py-16 md:py-24">

      <section className="border-b border-ink/10 pb-16">
        <SectionLabel>Night desk</SectionLabel>
        <p className="max-w-[52ch] font-newsreader text-[24px] leading-[1.3] text-ink">
          The last twenty percent happens after the office goes home.
        </p>
        <p className="mt-4 max-w-[60ch] font-plex-sans text-[18px] leading-[1.75] text-quill">
          Ember is the fire. Tape is the unfinished fifth. Comment is a note someone left on the file. After is shipped. Nothing else gets a colour.
        </p>

        <div className="mt-12 on-ink bg-void px-6 py-10 text-mist md:px-10">
          <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-sub">
            Dark ground
          </p>
          <div className="mt-6 flex flex-wrap gap-6">
            {BUILD_STATES.map((state) => (
              <State key={state} state={state} ground="dark" />
            ))}
          </div>
          <div className="mt-10">
            <EightyBar tone="dark" />
          </div>
        </div>

        <div className="mt-6 border border-ink/10 bg-paper-card px-6 py-10 md:px-10">
          <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-quill">
            Paper ground
          </p>
          <div className="mt-6 flex flex-wrap gap-6 text-ink">
            {BUILD_STATES.map((state) => (
              <State
                key={state}
                state={state}
                ground="paper"
                word={STATE_WORDS[state]}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mt-16">
        <SectionLabel>Position</SectionLabel>
        <p className="max-w-[62ch] font-newsreader text-[20px] leading-[1.45] text-quill">
          {brandPosition.dek}
        </p>
        <p className="mt-4 font-plex-mono text-[13px] uppercase tracking-[0.08em] text-quill/70">
          {studio.place} · {brand.legalName} · {brand.tagline}
        </p>
        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[36rem] border-collapse text-left">
            <thead>
              <tr className="border-b border-ink/15">
                <th className="py-3 pr-4 font-plex-mono text-caption text-quill/60">
                  Talent network
                </th>
                <th className="py-3 pr-4 font-plex-mono text-caption text-quill/60">
                  This studio
                </th>
                <th className="py-3 font-plex-mono text-caption text-quill/60">
                  Why it matters
                </th>
              </tr>
            </thead>
            <tbody>
              {brandPosition.rows.map((row) => (
                <tr key={row.we} className="border-b border-ink/10">
                  <td className="py-4 pr-4 font-newsreader text-[17px] text-quill/80">
                    {row.they}
                  </td>
                  <td className="py-4 pr-4 font-newsreader text-[17px] text-ink">
                    {row.we}
                  </td>
                  <td className="py-4 font-newsreader text-[16px] text-quill">
                    {row.note}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Colours */}
      <section className="mt-24">
        <SectionLabel>Colour</SectionLabel>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: "void",
              hex: "#0C100E",
              note: "Night desk. After hours. Not navy. Not violet.",
            },
            {
              name: "page",
              hex: "#E6EBE3",
              note: "The file. Fluorescent shop light. Not cream.",
            },
            {
              name: "ember",
              hex: "#FF3A14",
              note: "The fire. Findings. The filled stall. Never a CTA.",
            },
            {
              name: "tape",
              hex: "#D6FF2A",
              note: "The last 20%. The only buy colour. Once per viewport.",
            },
            {
              name: "comment",
              hex: "#2F62FF",
              note: "A note left on the file. Never a button fill.",
            },
            {
              name: "after",
              hex: "#6FAE78",
              note: "Shipped. Tired phosphor. Never unproven.",
            },
            {
              name: "carbon",
              hex: "#121612",
              note: "Type on the page.",
            },
            {
              name: "mist",
              hex: "#C9D0C8",
              note: "Type on the night desk.",
            },
          ].map((c) => (
            <div
              key={c.name}
              className="card p-6"
            >
              <div
                className="h-16 w-full rounded-surface"
                style={{
                  backgroundColor: c.hex,
                  outline:
                    c.name === "page"
                      ? "1px solid var(--color-ink)/20"
                      : "none",
                }}
              />
              <p className="mt-4 font-plex-mono text-data text-ink">
                {c.name}
              </p>
              <p className="font-plex-mono text-caption text-quill/60">{c.hex}</p>
              <p className="mt-2 font-plex-sans text-sm text-quill/80">
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
              <tr className="border-b border-ink/15">
                <th className="py-3 pr-4 font-plex-mono text-caption text-quill/60">
                  Role
                </th>
                <th className="py-3 pr-4 font-plex-mono text-caption text-quill/60">
                  Desktop
                </th>
                <th className="py-3 pr-4 font-plex-mono text-caption text-quill/60">
                  Mobile
                </th>
                <th className="py-3 font-plex-mono text-caption text-quill/60">
                  Specimen
                </th>
              </tr>
            </thead>
            <tbody>
              {typeSpecimen.map((t) => (
                <tr key={t.role} className="border-b border-ink/10">
                  <td className="py-4 pr-4 font-plex-sans text-sm text-quill/70">
                    {t.role}
                  </td>
                  <td className="py-4 pr-4 font-plex-mono text-data text-ink">
                    {t.desktop}
                  </td>
                  <td className="py-4 pr-4 font-plex-mono text-data text-ink">
                    {t.mobile}
                  </td>
                  <td className="py-4 font-newsreader text-reading text-ink">
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
              <span className="w-12 shrink-0 font-plex-mono text-data text-quill/70">
                {s.px}px
              </span>
              <div
                className="h-4 bg-gold/60"
                style={{ width: `${s.px}px` }}
              />
              <span className="font-plex-sans text-sm text-quill/60">
                {s.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Primitives — Mark */}
      <section className="mt-24">
        <SectionLabel>Mark</SectionLabel>
        <div className="flex flex-wrap items-end gap-8">
          <div className="flex items-end gap-6 rounded-surface bg-ink p-8">
            <Mark size={200} ground="ink" />
            <Mark size={64} ground="ink" />
            <Mark size={32} ground="ink" />
          </div>
          <div className="flex items-end gap-6 card bg-paper p-8">
            <Mark size={64} ground="paper" />
            <Mark size={32} ground="paper" />
            <Mark size={32} mono />
          </div>
        </div>
        <p className="mt-6 font-plex-mono text-caption text-quill/70">
          Paper ring on ink. Ink ring on paper. Flat gold wedge. Mono is currentColor only.
        </p>
      </section>

      <section className="mt-24">
        <SectionLabel>Brand kit</SectionLabel>
        <div className="flex flex-col gap-10">
          <figure>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/bpulse-brand/social/bpulse-og.svg"
              alt="bpulse. We finish what starts."
              width={1200}
              height={630}
              className="h-auto w-full rounded-[16px]"
            />
            <figcaption className="mt-3 font-plex-mono text-caption text-quill/70">
              social/bpulse-og · 1200 × 630
            </figcaption>
          </figure>
          <figure>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/bpulse-brand/lockup/bpulse-lockup-dark.svg"
              alt="bpulse lockup"
              width={1600}
              height={460}
              className="h-auto w-full rounded-[16px]"
            />
            <figcaption className="mt-3 font-plex-mono text-caption text-quill/70">
              lockup-dark · 1600 × 460
            </figcaption>
          </figure>
          <div className="flex flex-wrap items-end gap-8">
            <figure>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/bpulse-brand/icon/bpulse-icon.svg"
                alt="bpulse icon"
                width={128}
                height={128}
                className="h-[128px] w-[128px]"
              />
              <figcaption className="mt-3 font-plex-mono text-caption text-quill/70">
                icon
              </figcaption>
            </figure>
            <figure>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/bpulse-brand/favicon/bpulse-favicon.svg"
                alt="bpulse favicon"
                width={64}
                height={64}
                className="h-[64px] w-[64px]"
              />
              <figcaption className="mt-3 font-plex-mono text-caption text-quill/70">
                favicon · flat
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Primitives — DataLine */}
      <section className="mt-24">
        <SectionLabel>DataLine</SectionLabel>
        <div className="max-w-[640px] border-t border-ink/10 pt-8">
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
        <div className="flex flex-col gap-6 border-t border-ink/10 pt-8 md:flex-row">
          <Grade grade="sound" label="Holding" date="12 Mar 2026" />
          <Grade grade="unsound" label="Not holding" date="12 Mar 2026" />
        </div>
        <p className="mt-6 font-plex-mono text-caption text-quill/60">
          Colour never carries meaning alone — always paired with the word and
          the date
        </p>
      </section>

      {/* Primitives — Credit */}
      <section className="mt-24">
        <SectionLabel>Credit</SectionLabel>
        <div className="flex flex-col gap-8 border-t border-ink/10 pt-8 md:flex-row">
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
        <p className="mt-6 font-plex-mono text-caption text-quill/60">
          A missing portrait renders as name and role — never a grey box
        </p>
      </section>

      {/* Primitives — Notice */}
      <section className="mt-24">
        <SectionLabel>Notice</SectionLabel>
        <div className="max-w-[720px] space-y-10">
          <Notice
            question="Will the check see everything?"
            answer="No. A five-day assessment finds the blocking defects and the ones it can see clearly. It does not promise to surface every latent issue before any work begins. That would be a false claim."
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
        <div className="card p-8">
          <Lot
            lotNumber="034"
            title="A hospital platform that stopped at 80%"
            condition="What was stuck: role-based access under HIPAA, real-time clinical dashboards, and automated document processing. What was wrong: the audit trail was not wired to production, and the model fine-tune was not reproducible."
            dataLines={[
              { label: "Client", value: "Sully.ai" },
              { label: "Scope", value: "$42,000" },
              { label: "Duration", value: "11 weeks" },
            ]}
            conditionGrade={{
              state: "stalled",
              grade: "sound",
              label: "Stalled",
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
        <div className="max-w-[720px] border-t border-ink/10 pt-8">
          <MotionReplay />
        </div>
      </section>
    </div>
    </>
  );
}
