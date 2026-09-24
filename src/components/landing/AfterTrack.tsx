import { afterCopy } from "@/content/home";
import { Stagger, Item } from "@/components/landing/Reveal";
import { SectionHead } from "@/components/landing/SectionHead";

/** Built so you do not need us. Four cards, one promise. */
export function AfterTrack() {
  return (
    <section className="lp-section">
      <div className="lp-shell">
        <SectionHead
          label="After"
          heading={afterCopy.heading}
          dek={afterCopy.lede}
        />
        <Stagger className="lp-after-grid">
          {afterCopy.track.map((card) => (
            <Item key={card.step}>
              <div className="lp-after-card">
                <p className="lp-after-num">{card.step}</p>
                <h3>{card.title}</h3>
                <p>{card.note}</p>
              </div>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
