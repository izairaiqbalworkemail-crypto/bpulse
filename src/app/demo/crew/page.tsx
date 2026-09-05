import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { demoCrew } from "@/content/demo";
import { getSpecialist } from "@/content/specialists";

export const metadata: Metadata = buildMetadata({
  title: "Sample portal — crew",
  description: "Named people on this sample Close, linked to their public pages.",
  path: "/demo/crew",
});

export default function DemoCrewPage() {
  return (
    <section className="grid-container py-16 md:py-20">
      <h2 className="font-newsreader text-[clamp(1.75rem,3vw,2.5rem)] leading-title text-iron">
        Crew
      </h2>
      <p className="mt-3 max-w-measure font-newsreader text-reading leading-reading text-ink">
        Real specialists. The engagement is sample.
      </p>
      <ul className="mt-10 grid gap-10 md:grid-cols-2">
        {demoCrew.map((member) => {
          const person = getSpecialist(member.id);
          return (
            <li key={member.id} className="card p-6">
              {person.photo ? (
                <Image
                  src={person.photo}
                  alt=""
                  width={160}
                  height={200}
                  className="h-40 w-32 object-cover"
                />
              ) : null}
              <p className="mt-4 font-newsreader text-lot-title text-iron">
                <Link
                  href={`/team/${person.id}`}
                  className="underline-offset-4 hover:underline"
                >
                  {person.name}
                </Link>
              </p>
              <p className="mt-1 font-plex-sans text-sm text-ink/70">
                {member.role}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
