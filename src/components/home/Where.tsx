import Link from "next/link";
import { pulseCopy, whereCopy } from "@/content/home";
import { ladder } from "@/content/ladder";

function offerFor(href: string) {
  return ladder.find((row) => row.href === href);
}

/**
 * Destination desk. Recommended start is the object.
 * The other five situations stay a signpost. No cards on the map.
 */
export function Where() {
  const [recommended, ...rest] = whereCopy.rows;
  const start = offerFor(recommended.href);

  return (
    <section id="where" aria-labelledby="where-heading" className="letter-where">
      <div className="letter-where-desk">
        <div className="letter-where-lead">
          <p className="kicker">
            {whereCopy.n} · {whereCopy.kicker}
          </p>
          <h2 id="where-heading" className="letter-where-title">
            {whereCopy.heading}
          </h2>
          <p className="letter-where-dek">{whereCopy.dek}</p>

          <article className="letter-where-start" aria-label={recommended.start}>
            <p className="letter-where-start-if">{recommended.if}</p>
            <p className="letter-where-start-name">
              {recommended.start}
              <span className="letter-doors-rec">
                {" "}
                · {whereCopy.recommended}
              </span>
            </p>
            {start ? (
              <p className="letter-where-start-meta">
                {start.price}
                <span aria-hidden="true"> · </span>
                {start.meter}
              </p>
            ) : null}
            <Link
              href={recommended.href}
              className="btn btn-ink letter-ask min-h-12 px-8 text-[15px]"
            >
              {pulseCopy.primary}
            </Link>
          </article>
        </div>

        <ul className="letter-doors" aria-label={whereCopy.kicker}>
          {rest.map((row) => {
            const offer = offerFor(row.href);
            return (
              <li key={row.href}>
                <Link href={row.href}>
                  <span className="letter-doors-if">{row.if}</span>
                  <span className="letter-doors-end">
                    <span className="letter-doors-start">{row.start}</span>
                    {offer ? (
                      <span className="letter-doors-meta">
                        {offer.price}
                        <span aria-hidden="true"> · </span>
                        {offer.meter}
                      </span>
                    ) : null}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
