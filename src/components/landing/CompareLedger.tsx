import { compareCopy } from "@/content/landing-sections";
import { Reveal, Stagger, Item } from "@/components/landing/Reveal";
import { SectionHead } from "@/components/landing/SectionHead";

/** Them on paper with the red mark. Us on ink with the gold one. */
export function CompareLedger() {
  return (
    <section className="lp-section">
      <div className="lp-shell">
        <SectionHead
          label="Comparison"
          heading="Why teams switch to us."
          dek="Not a knock on every agency — just what we do differently, in writing."
        />
        <div className="lp-compare">
          {(
            [
              { side: "them", mark: "✕", col: compareCopy.them },
              { side: "us", mark: "✓", col: compareCopy.us },
            ] as const
          ).map(({ side, mark, col }, index) => (
            <Reveal delay={index * 0.1} key={side}>
              <div className={`lp-compare-col is-${side}`}>
                <h3 className="lp-compare-title">{col.title}</h3>
                <Stagger className="lp-compare-list" delay={0.1 + index * 0.1}>
                  {col.rows.map((row) => (
                    <Item key={row}>
                      <p className="lp-compare-item">
                        <span aria-hidden className="lp-compare-mark">
                          {mark}
                        </span>
                        {row}
                      </p>
                    </Item>
                  ))}
                </Stagger>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
