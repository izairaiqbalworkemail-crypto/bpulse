import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { GateCard } from "@/components/GateCard";
import { PageHero } from "@/components/PageHero";
import { SignalPlate } from "@/components/SignalPlate";
import { BriefIntake } from "@/components/intake/BriefIntake";
import { crewCommitments, crewGates } from "@/content/process";
import { listRoles } from "@/lib/careers/store";

export const metadata: Metadata = buildMetadata({
  title: "Careers",
  description:
    "Five-gate hiring pipeline with a written Gate 0 diagnostic. Paid work sample and no candidate fee.",
  path: "/careers",
});

export default function CareersPage() {
  const roles = listRoles();
  const openRoles = roles.filter((role) => role.status === "open");

  return (
    <section className="w-full bg-rag pb-24 md:pb-32">
      <PageHero
        kicker="Careers"
        title="A written Gate 0. Then the rest of the gates."
        dek="No multiple-choice pass/fail gate. Gate 2 is paid whether or not you join."
        hideAction
      />

      <SignalPlate
        kicker="What you get"
        title="Published bands. A paid sample."
        line="No multiple-choice pass/fail gate. Gate 2 is paid whether or not you join."
        facts={[
          {
            kicker: "Pay",
            body: "Published pay bands on the role cards below. No candidate fee.",
          },
          {
            kicker: "Gate 2",
            body: "A paid work sample. You keep the money either way.",
          },
          {
            kicker: "After Gate 4",
            body: (
              <>
                A public crew profile with a dated credential. Example:{" "}
                <Link href="/team/hamza" className="underline underline-offset-4">
                  /team/hamza
                </Link>
                .
              </>
            ),
          },
        ]}
        href="#intake"
        action="Apply in five steps"
      />

      <div className="grid-container pt-12">
        <section>
          <p className="font-plex-mono text-[13px] uppercase tracking-[0.08em] text-ink/70">Hiring plan</p>
          <ul className="mt-4 space-y-3">
            {roles.map((role) => (
              <li key={role.id} className="card p-6">
                <p className="font-newsreader text-[21px] text-iron">{role.title}</p>
                <p className="font-newsreader text-[16px] text-ink">
                  {role.band} · {role.location} · {role.summary}
                </p>
                <p className="mt-1 font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">
                  {role.status}
                </p>
              </li>
            ))}
          </ul>
          {openRoles.length === 0 ? (
            <p className="mt-4 font-newsreader text-[17px] text-ink">No roles are currently open.</p>
          ) : null}
        </section>

        <section className="mt-14">
          {crewGates.map((gate) => (
            <GateCard key={gate.n} {...gate} />
          ))}
        </section>

        <section className="card mt-12 p-8">
          <p className="font-plex-mono text-[13px] uppercase tracking-[0.08em] text-ink/70">Three commitments</p>
          <ul className="mt-3 space-y-2">
            {crewCommitments.map((item) => (
              <li key={item} className="font-newsreader text-[17px] leading-[1.45] text-ink">{item}</li>
            ))}
          </ul>
        </section>

        <section id="intake" className="mt-14 scroll-mt-28">
          <p className="mb-4 font-plex-mono text-[13px] uppercase tracking-[0.08em] text-ink/70">
            Apply · five short steps
          </p>
          <BriefIntake type="careers" source="careers-gate0" workWith="madiha" />
          <p className="mt-5 font-newsreader text-[17px] text-ink">
            On submit: you get a private status link and your Gate 0 brief within one business day.
          </p>
          <p className="mt-2 font-plex-sans text-[14px] text-ink/80">
            Sample diagnostic token page: <Link href="/careers/diagnostic/Q7m2Lc9rT4vN8xPw" className="underline">/careers/diagnostic/[token]</Link>
          </p>
        </section>
      </div>
    </section>
  );
}
