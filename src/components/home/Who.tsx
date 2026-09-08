import Link from "next/link";
import { Item, Stagger } from "@/components/landing/Reveal";
import { SectionIntro } from "@/components/home/SectionIntro";
import { whoCopy } from "@/content/home";
import { getSpecialist } from "@/content/specialists";
import { gateLine } from "@/lib/direct/gate";

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

/**
 * Who. Cream room. Three portrait boxes.
 */
export function Who() {
  const people = whoCopy.ids.map((id) => getSpecialist(id));

  return (
    <section
      id="who"
      aria-labelledby="who-heading"
      className="overflow-x-clip bg-paper text-ink"
    >
      <div className="stage-container py-20 md:py-28">
        <SectionIntro
          id="who-heading"
          n={whoCopy.n}
          kicker={whoCopy.kicker}
          heading={whoCopy.heading}
          headingMax="max-w-[16ch]"
        />

        <Stagger className="mt-12 grid gap-5 sm:grid-cols-3" gap={0.06}>
          {people.map((person) => {
            const absent = person.photoStatus === "Photo pending" || !person.photo;
            const onProject = person.availability !== "available";
            const gate = gateLine(person.id);
              return (
               <Item key={person.id}>
                 <Link
                   href={`/team/${person.id}`}
                   className="block overflow-hidden rounded-[20px] border border-line-ink bg-ink-card text-paper transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper"
                 >
                  <div className="relative aspect-[3/4] overflow-hidden bg-ink-2">
                    {absent ? (
                      <span className="grid h-full place-items-center font-newsreader text-[56px] text-paper">
                        {initials(person.name)}
                      </span>
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={person.photo}
                        alt={person.name}
                        width={360}
                        height={480}
                        className="h-full w-full object-cover object-top"
                      />
                    )}
                  </div>
                  <div className="px-5 py-5 md:px-6">
                    <p className="font-newsreader text-[22px] leading-[1.15] text-paper">
                      {person.name}
                    </p>
                    <p className="mt-1 font-plex-sans text-[15px] text-paper/65">
                      {person.role}
                    </p>
                    <p className="mt-3 font-plex-mono text-[12px] uppercase tracking-[0.12em] text-paper/70">
                      {onProject ? "on a project" : "available"}
                    </p>
                    <p className="mt-2 font-plex-mono text-[11px] uppercase tracking-[0.12em] text-paper/45">
                      {gate.label}
                    </p>
                  </div>
                 </Link>
               </Item>
              );
          })}
        </Stagger>

        <div className="mt-14 max-w-[48ch]">
          {whoCopy.standard.map((line) => (
            <p
              key={line}
              className="mt-3 font-plex-sans text-[16px] leading-[1.5] text-quill first:mt-0"
            >
              {line}
            </p>
          ))}
          <p className="mt-5">
            <Link
              href={whoCopy.standardHref}
              className="font-plex-sans text-[15px] text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink"
            >
              {whoCopy.standardLabel}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
