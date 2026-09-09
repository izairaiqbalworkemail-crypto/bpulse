import Link from "next/link";
import { afterCopy } from "@/content/home";
import { standingRange } from "@/content/ladder";

/**
 * After. The named engineer and the door. Shares a window with Who.
 */
export function After() {
  return (
    <section id="after" aria-labelledby="after-heading" className="letter-after">
      <p className="kicker">
        {afterCopy.n} · {afterCopy.kicker}
      </p>
      <h2 id="after-heading" className="letter-after-title">
        {afterCopy.heading}
      </h2>
      <p className="letter-after-lede">{afterCopy.lede}</p>
      <p className="letter-after-teach">{afterCopy.teach}</p>

      <ol className="letter-after-track">
        {afterCopy.track.map((step) => (
          <li key={step.step}>
            <strong>
              {step.step} {step.title}
            </strong>
            <span>{step.note}</span>
          </li>
        ))}
      </ol>

      <p className="letter-after-meta">
        {standingRange} · {afterCopy.cancel}
      </p>
      <Link
        href={afterCopy.href}
        className="btn btn-paper letter-ask min-h-12 px-8 text-[15px]"
      >
        {afterCopy.open}
      </Link>
    </section>
  );
}
