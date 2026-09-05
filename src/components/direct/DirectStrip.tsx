import Link from "next/link";
import { getSpecialist } from "@/content/specialists";
import { initials } from "@/lib/lot-trace";

const STRIP_IDS = ["aneeb", "hassan", "najiullah"] as const;

export function DirectStrip() {
  const faces = STRIP_IDS.map((id) => getSpecialist(id));

  return (
    <div className="w-full bg-iron-2 text-rag">
      <div className="h-px w-full bg-rag/10" aria-hidden="true" />
      <Link
        href="/direct"
        className="grid-container flex h-14 items-center justify-between gap-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-signal"
      >
        <span className="flex min-w-0 items-center gap-3">
          <span className="flex shrink-0 -space-x-2" aria-hidden="true">
            {faces.map((person) => (
              <span
                key={person.id}
                className="inline-flex h-8 w-8 overflow-hidden rounded-full bg-iron ring-2 ring-iron-2"
              >
                {person.photo && person.photoStatus === "Photo" ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={person.photo}
                    alt=""
                    width={32}
                    height={32}
                    className="h-full w-full object-cover object-top"
                  />
                ) : (
                  <span className="grid h-full w-full place-items-center font-plex-mono text-[10px] text-rag">
                    {initials(person.name)}
                  </span>
                )}
              </span>
            ))}
          </span>
          <span className="truncate font-newsreader text-[16px] text-rag">
            Twelve specialists. Write to one directly.
          </span>
        </span>
        <span className="shrink-0 font-plex-sans text-[14px] text-signal">
          Open <span aria-hidden="true">→</span>
        </span>
      </Link>
    </div>
  );
}
