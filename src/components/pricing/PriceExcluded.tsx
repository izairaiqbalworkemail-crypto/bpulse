import { Reveal } from "@/components/landing/Reveal";
import { SectionHead } from "@/components/landing/SectionHead";
import { pricingExcluded } from "@/content/pricing";

/** The dark plate: what we do not sell, said plainly. */
export function PriceExcluded() {
  return (
    <section className="lp-section" id="excluded">
      <div className="lp-shell">
        <div className="lp-stuck-section">
          <div className="relative z-[1]">
            <SectionHead
              tone="ink"
              label="Not included"
              heading="What we do not sell."
            />
            <div className="lp-excl-grid">
              {pricingExcluded.map((row) => (
                <Reveal key={row.title}>
                  <p className="lp-excl-title">{row.title}</p>
                  <p className="lp-excl-body">{row.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
