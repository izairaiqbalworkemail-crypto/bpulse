import Link from "next/link";
import { doubtCopy, homeQuestions } from "@/content/home";

/**
 * Doubt, then the ask. One window. Two columns. No accordion.
 */
export function Questions() {
  return (
    <section
      id="questions"
      aria-labelledby="questions-heading"
      className="letter-doubt"
    >
      <div className="letter-doubt-desk">
        <div className="letter-doubt-lead">
          <p className="kicker">
            {doubtCopy.n} · {doubtCopy.kicker}
          </p>
          <h2 id="questions-heading" className="letter-doubt-title">
            {doubtCopy.heading}
          </h2>
          <p className="letter-doubt-dek">{doubtCopy.dek}</p>
        </div>

        <ul className="letter-asks">
          {homeQuestions.map((item) => (
            <li key={item.q}>
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </li>
          ))}
        </ul>

        <aside className="letter-doubt-ask" aria-label={doubtCopy.band}>
          <p>{doubtCopy.band}</p>
          <p>{doubtCopy.bandNote}</p>
          <Link
            href={doubtCopy.askHref}
            className="btn btn-ink letter-ask min-h-12 px-8 text-[15px]"
          >
            {doubtCopy.ask}
          </Link>
        </aside>
      </div>
    </section>
  );
}
