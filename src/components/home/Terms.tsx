import Link from "next/link";
import { termsCopy, termsCredit } from "@/content/home";
import { ladder } from "@/content/ladder";

/**
 * Terms. One window. Every published price.
 * Gold sits once, on the recommended price.
 */
export function Terms() {
  return (
    <section id="terms" aria-labelledby="terms-heading" className="letter-terms">
      <div className="letter-terms-desk">
        <p className="kicker">
          {termsCopy.n} · {termsCopy.kicker}
        </p>
        <h2 id="terms-heading" className="letter-terms-title">
          {termsCopy.heading}
        </h2>
        <p className="letter-terms-dek">{termsCopy.route}</p>

        <ol className="letter-ladder">
          {ladder.map((row) => {
            const recommended = row.id === "read";
            return (
              <li key={row.id}>
                <p className="letter-ladder-name">
                  <Link href={row.href}>{row.name}</Link>
                  {recommended ? (
                    <span className="letter-doors-rec">
                      {" "}
                      · {termsCopy.recommended}
                    </span>
                  ) : null}
                </p>
                <div>
                  <p
                    className="letter-ladder-price"
                  >
                    {row.price}
                  </p>
                  {row.id === "check" ? (
                    <p className="letter-ladder-credit">{termsCredit}</p>
                  ) : null}
                </div>
                <p className="letter-ladder-body">{row.body}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
