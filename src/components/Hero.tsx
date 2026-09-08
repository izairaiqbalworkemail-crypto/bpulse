import Link from "next/link";
import { heroCopy } from "@/content/hero";
import { pulseCopy } from "@/content/home";
import { ladder } from "@/content/ladder";

const offers = ladder.filter(
  (row) =>
    row.id === "read" ||
    row.id === "session" ||
    row.id === "check" ||
    row.id === "close",
);

/**
 * Recognition, then the published ladder. No bar. No object.
 */
export function Hero() {
  return (
    <section id="pulse" aria-labelledby="pulse-heading" className="letter-hero">
      <div className="letter-hero-copy">
        <p className="kicker">{pulseCopy.kicker}</p>
        <h1 id="pulse-heading" className="letter-hero-claim">
          {heroCopy.claim.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h1>
        <p className="letter-hero-dek">{heroCopy.dek}</p>
        <div className="letter-cta">
          <Link
            href={pulseCopy.primaryHref}
            className="btn btn-paper letter-ask min-h-12 px-8 text-[15px]"
          >
            {pulseCopy.primary}
          </Link>
        </div>
        <p className="letter-hero-proof">
          <span>the read is free</span>
          <span className="letter-hero-proof-dot" aria-hidden="true">
            {" "}
            ·{" "}
          </span>
          <span>nothing on it asks for a meeting</span>
        </p>
      </div>

      <ul className="letter-hero-offers" aria-label="Published prices">
        {offers.map((row) => (
          <li key={row.id}>
            <Link href={row.href}>
              <span className="letter-hero-offer-name">{row.name}</span>
              <span className="letter-hero-offer-price">{row.price}</span>
              <span className="letter-hero-offer-meter">{row.meter}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
