import Link from "next/link";
import type { Specialist } from "@/content/types";

type CrewPortraitProps = {
  person: Specialist;
  line?: string;
  compact?: boolean;
};

function Initials({ name }: Readonly<{ name: string }>) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
  return (
    <span className="grid h-full w-full place-items-center font-newsreader text-[22px] text-rag">
      {initials}
    </span>
  );
}

/**
 * Named face. Photo when we have one. Initials when we do not.
 */
export function CrewPortrait({
  person,
  line,
  compact = false,
}: Readonly<CrewPortraitProps>) {
  const absent = person.photoStatus === "Photo pending" || !person.photo;
  const caption = line ?? person.role;

  if (compact) {
    return (
      <Link href={`/team/${person.id}`} className="group flex items-center gap-3">
        <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-iron-card ring-1 ring-rag/15">
          {absent ? (
            <Initials name={person.name} />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={person.photo}
              alt={person.name}
              width={48}
              height={48}
              className="h-full w-full object-cover object-top"
            />
          )}
        </span>
        <span className="min-w-0">
          <span className="block font-newsreader text-[16px] leading-[1.15] text-rag">
            {person.name}
          </span>
          <span className="block truncate font-plex-mono text-[11px] uppercase tracking-[0.08em] text-rag/70">
            {caption}
          </span>
        </span>
      </Link>
    );
  }

  return (
    <Link href={`/team/${person.id}`} className="block min-w-0">
      <div className="relative aspect-[3/4] overflow-hidden bg-iron-card">
        {absent ? (
          <div className="grid h-full place-items-center">
            <Initials name={person.name} />
          </div>
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
      <p className="mt-4 font-newsreader text-[20px] leading-[1.15] text-rag">
        {person.name}
      </p>
      <p className="mt-1 font-newsreader text-[15px] text-rag/70">{caption}</p>
    </Link>
  );
}
