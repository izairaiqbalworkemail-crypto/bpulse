import type { Metadata } from "next";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo";
import { LetterObject, LetterObjects } from "@/components/letter/LetterObject";
import { demoCrew } from "@/content/demo";
import { getSpecialist } from "@/content/specialists";

export const metadata: Metadata = buildMetadata({
  title: "The platform. Crew",
  description: "Named people on this sample Close, linked to their public pages.",
  path: "/demo/crew",
});

export default function DemoCrewPage() {
  return (
    <section className="grid-container py-16 md:py-20">
      <h2 className="font-newsreader text-[clamp(1.75rem,3vw,2.5rem)] leading-title text-ink">
        Crew
      </h2>
      <p className="mt-3 max-w-measure font-newsreader text-reading leading-reading text-quill">
        Real specialists. The engagement is sample.
      </p>
      <LetterObjects className="mt-10 grid gap-10 md:grid-cols-2">
        {demoCrew.map((member) => {
          const person = getSpecialist(member.id);
          return (
            <LetterObject
              key={member.id}
              href={`/team/${person.id}`}
              label={person.name}
            >
              {person.photo ? (
                <Image
                  src={person.photo}
                  alt=""
                  width={160}
                  height={200}
                  className="h-40 w-32 object-cover"
                />
              ) : null}
              <p className="mt-4 font-newsreader text-lot-title text-ink">
                {person.name}
              </p>
              <p className="mt-1 font-plex-sans text-sm text-quill/70">
                {member.role}
              </p>
            </LetterObject>
          );
        })}
      </LetterObjects>
    </section>
  );
}
