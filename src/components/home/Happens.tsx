import { happensCopy } from "@/content/home";

/**
 * What happens. One window. Four stages as a ruled sequence.
 */
export function Happens() {
  return (
    <section
      id="happens"
      aria-labelledby="happens-heading"
      className="letter-happens"
    >
      <div className="letter-happens-desk">
        <p className="kicker">
          {happensCopy.n} · {happensCopy.kicker}
        </p>
        <h2 id="happens-heading" className="letter-happens-title">
          {happensCopy.heading}
        </h2>
        <p className="letter-happens-dek">{happensCopy.dek}</p>

        <ol className="letter-stages">
          {happensCopy.stages.map((stage, index) => (
            <li key={stage.id}>
              <p className="letter-stages-name">
                {String(index + 1).padStart(2, "0")} {stage.label}
                {"current" in stage && stage.current ? (
                  <span className="letter-stages-now">now</span>
                ) : null}
              </p>
              <dl>
                <dt>What we do</dt>
                <dd>{stage.do}</dd>
                <dt>What you sign</dt>
                <dd>{stage.sign}</dd>
                <dt>What you receive</dt>
                <dd>{stage.receive}</dd>
              </dl>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
