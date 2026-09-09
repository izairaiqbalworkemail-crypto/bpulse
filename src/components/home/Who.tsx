import Link from "next/link";
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
 * Who. Named people. Shares a window with After.
 */
export function Who() {
  const people = whoCopy.ids.map((id) => getSpecialist(id));

  return (
    <section id="who" aria-labelledby="who-heading" className="letter-who">
      <p className="kicker">
        {whoCopy.n} · {whoCopy.kicker}
      </p>
      <h2 id="who-heading" className="letter-who-title">
        {whoCopy.heading}
      </h2>

      <ul className="letter-faces">
        {people.map((person) => {
          const absent = person.photoStatus === "Photo pending" || !person.photo;
          const onProject = person.availability !== "available";
          const gate = gateLine(person.id);
          return (
            <li key={person.id}>
              <Link href={`/team/${person.id}`}>
                <span className="letter-faces-mark">
                  {absent ? (
                    initials(person.name)
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={person.photo} alt="" width={52} height={52} />
                  )}
                </span>
                <span>
                  <span className="letter-faces-name">{person.name}</span>
                  <span className="letter-faces-meta">
                    {person.role}
                    {" · "}
                    {onProject ? "on a project" : "available"}
                    {" · "}
                    {gate.label}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="letter-who-standard">
        {whoCopy.standard.map((line) => (
          <p key={line}>{line}</p>
        ))}
        <p>
          <Link href={whoCopy.standardHref}>{whoCopy.standardLabel}</Link>
        </p>
      </div>
    </section>
  );
}
