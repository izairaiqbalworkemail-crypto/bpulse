import Link from "next/link";
import { getSpecialist } from "@/content/specialists";
import { initials } from "@/lib/lot-trace";

const STRIP_IDS = ["aneeb", "hassan", "najiullah"] as const;

export function DirectStrip() {
  const faces = STRIP_IDS.map((id) => getSpecialist(id));

  return (
    <div className="ribbon on-ink w-full bg-ink text-read">
      <div className="h-px w-full bg-paper/10" aria-hidden="true" />
      <Link
        href="/direct"
        className="flex h-14 w-full items-center justify-between gap-4 px-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-paper sm:px-8"
      >
        <span className="flex min-w-0 items-center gap-3">
          <span className="flex shrink-0 -space-x-2" aria-hidden="true">
            {faces.map((person) => (
              <span
                key={person.id}
                className="inline-flex h-8 w-8 overflow-hidden rounded-full bg-ink ring-2 ring-ink-2"
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
                  <span className="grid h-full w-full place-items-center font-plex-mono text-[10px] text-paper">
                    {initials(person.name)}
                  </span>
                )}
              </span>
            ))}
          </span>
          <span className="truncate font-newsreader text-[16px] text-paper">
            Twelve specialists. Write to one directly.
          </span>
        </span>
        <span className="site-link shrink-0 font-plex-sans text-[14px]">
          Open <span aria-hidden="true">→</span>
        </span>
      </Link>
    </div>
  );
}
