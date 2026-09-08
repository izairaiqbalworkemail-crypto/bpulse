import Link from "next/link";
import { whereCopy } from "@/content/home";

/**
 * Signpost. Six situations, six destinations. No cards.
 */
export function Where() {
  return (
    <section id="where" aria-labelledby="where-heading" className="letter-where">
      <div className="letter-sheet">
        <p className="kicker">
          {whereCopy.n} · {whereCopy.kicker}
        </p>
        <h2 id="where-heading" className="letter-where-title">
          {whereCopy.kicker}
        </h2>
        <ul className="letter-doors">
          {whereCopy.rows.map((row) => (
            <li key={row.href}>
              <Link href={row.href}>
                <span className="letter-doors-if">{row.if}</span>
                <span className="letter-doors-start">
                  {row.start}
                  {row.recommended ? (
                    <span className="letter-doors-rec">
                      {" "}
                      · {whereCopy.recommended}
                    </span>
                  ) : null}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
