import Link from "next/link";
import { whoCopy } from "@/content/home";
import { findSpecialist } from "@/content/specialists";
import { Stagger, Item } from "@/components/landing/Reveal";
import { SectionHead } from "@/components/landing/SectionHead";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/**
 * Client-facing specialists carry the Gate 4 credential on the card.
 * The founder sets the standard rather than sitting it, so his card does not.
 */
const gateFour = new Set(["hassan", "mehak"]);

/** Three of the twelve. Every card opens the person's own page. */
export function FacesRail() {
  const people = whoCopy.ids
    .map((id) => findSpecialist(id))
    .filter((person): person is NonNullable<typeof person> =>
      Boolean(person)
    );

  return (
    <section className="lp-section">
      <div className="lp-shell">
        <SectionHead
          label="Who"
          heading={whoCopy.heading}
          dek="Seniors on the keyboard, not on the sales call."
        />
        <Stagger className="lp-team">
          {people.map((person) => (
            <Item key={person.id}>
              <Link className="lp-team-card" href={`/team/${person.id}`}>
                <span aria-hidden className="lp-team-avatar">
                  {initials(person.name)}
                </span>
                <p className="lp-team-name">{person.name}</p>
                <p className="lp-team-role">
                  {gateFour.has(person.id)
                    ? `${person.role} · Gate 4`
                    : person.role}
                </p>
              </Link>
            </Item>
          ))}
        </Stagger>
        <div className="lp-section-more">
          <Link className="lp-section-link" href="/team">
            Meet all twelve
            <span aria-hidden className="lp-arrow">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
