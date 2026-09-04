import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { GateCard } from "@/components/GateCard";
import { brand } from "@/config/brand";
import { crewGates } from "@/content/process";
import { CrewSession, type FieldConfig } from "@/components/intake/CrewSession";

const careerFields: FieldConfig[] = [
  {
    name: "mode",
    label: "Which door?",
    type: "radio",
    options: ["Join the studio", "Pitch an idea"],
    required: true,
  },
  {
    name: "name",
    label: "Your name",
    type: "input",
    required: true,
    autoComplete: "name",
  },
  {
    name: "email",
    label: "Email",
    type: "input",
    input: "email",
    required: true,
    autoComplete: "email",
  },
  {
    name: "link",
    label: "A link to work you shipped",
    type: "input",
    required: false,
    placeholder: "Optional",
  },
  {
    name: "detail",
    label: "What you'd bring, or the idea",
    type: "textarea",
    required: true,
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Careers",
  description:
    "Join the crew, or pitch an idea. Candidates are never charged a fee at any stage.",
  path: "/careers",
});

export default function CareersPage() {
  return (
    <section className="w-full bg-rag">
      <div className="grid-container pb-24 pt-16 md:pb-32 md:pt-24">
        <p className="max-w-[52ch] font-newsreader text-[18px] leading-[1.5] text-ink">
          Breakthrough Pulse is a senior studio in Lahore. We finish products
          stuck at eighty percent. The people who scope the work ship it. We
          hire the same way we ship: slowly, in public, against a written
          standard.
        </p>

        <p className="mt-8 max-w-[52ch] font-newsreader text-[18px] leading-[1.5] text-ink">
          We look for people who have already shipped production systems, who
          will say what they do not know, and who can sit in a small crew
          without process theatre. The gates are on{" "}
          <Link
            href="/standard"
            className="underline decoration-iron/40 underline-offset-4 hover:decoration-iron"
          >
            /standard
          </Link>
          .
        </p>

        <p className="mt-8 max-w-[52ch] border-l-2 border-signal pl-5 font-newsreader text-[18px] leading-[1.5] text-iron">
          Candidates are never charged a fee at any stage. If someone asks you
          to pay to apply, it is not us.
        </p>

        <div id="intake" className="mt-16">
          <p className="mb-4 font-plex-mono text-[13px] uppercase tracking-[0.08em] text-ink/70">
            The door
          </p>
          <CrewSession type="careers" fields={careerFields} />
        </div>

        <div className="mt-20 border-t border-iron/20 pt-10">
          <p className="font-plex-mono text-[13px] uppercase tracking-[0.08em] text-ink/70">
            A separate track
          </p>
          <h2 className="mt-3 font-newsreader text-[24px] leading-[1.2] text-iron">
            Pitch us an idea
          </h2>
          <p className="mt-3 max-w-[52ch] font-newsreader text-[16px] leading-[1.5] text-ink">
            Not a job. A founding idea. If it has a path to production we will
            say so, and we will say what it would take. Use the same intake —
            pick “Pitch an idea”. Do not mix it with joining.
          </p>
        </div>

        <div className="mt-16">
          {crewGates.map((gate) => (
            <GateCard key={gate.n} {...gate} />
          ))}
        </div>

        <p className="mt-12 font-newsreader text-[16px] text-ink/80">
          Or write{" "}
          <a
            href={`mailto:${brand.contact.email}`}
            className="underline decoration-iron/30 underline-offset-4 hover:decoration-iron"
          >
            {brand.contact.email}
          </a>
          .
        </p>
      </div>
    </section>
  );
}
