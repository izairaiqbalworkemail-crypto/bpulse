import { happensCopy } from "@/content/home";
import { SectionIntro } from "@/components/home/SectionIntro";
import { Item, Stagger } from "@/components/landing/Reveal";

/**
 * What happens. Cream margin, one ink plate. The rail is the object.
 */
export function Happens() {
  return (
    <section
      id="happens"
      aria-labelledby="happens-heading"
      className="story-inset bg-paper"
    >
      <div className="hero-plate on-ink px-6 py-14 md:px-12 md:py-20 lg:px-16">
        <SectionIntro
          id="happens-heading"
          n={happensCopy.n}
          kicker={happensCopy.kicker}
          heading={happensCopy.heading}
          dek={happensCopy.dek}
          tone="ink"
          headingMax="max-w-[16ch]"
          dekMax="max-w-[40ch]"
        />

        <Stagger className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4" gap={0.06}>
          {happensCopy.stages.map((stage, index) => (
            <Item key={stage.id}>
              <article className="rounded-[16px] border border-paper/12 bg-ink-card/45 p-5">
              <p className="font-plex-mono text-[11px] uppercase tracking-[0.16em] text-paper/45">
                {String(index + 1).padStart(2, "0")}
              </p>
              <p className="mt-3 flex flex-wrap items-baseline gap-3">
                <span className="font-newsreader text-[26px] leading-[1.15] text-paper">
                  {stage.label}
                </span>
                {"current" in stage && stage.current ? (
                  <span className="font-plex-mono text-[11px] uppercase tracking-[0.12em] text-paper/55">
                    building
                  </span>
                ) : null}
              </p>
              <dl className="mt-6 space-y-4">
                <div>
                  <dt className="font-plex-mono text-[11px] uppercase tracking-[0.12em] text-paper/45">
                    What we do
                  </dt>
                  <dd className="mt-2 font-plex-sans text-[15px] leading-[1.5] text-paper/80">
                    {stage.do}
                  </dd>
                </div>
                <div>
                  <dt className="font-plex-mono text-[11px] uppercase tracking-[0.12em] text-paper/45">
                    What you sign
                  </dt>
                  <dd className="mt-2 font-plex-sans text-[15px] leading-[1.5] text-paper/80">
                    {stage.sign}
                  </dd>
                </div>
                <div>
                  <dt className="font-plex-mono text-[11px] uppercase tracking-[0.12em] text-paper/45">
                    What you receive
                  </dt>
                  <dd className="mt-2 font-plex-sans text-[15px] leading-[1.5] text-paper/80">
                    {stage.receive}
                  </dd>
                </div>
              </dl>
              </article>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
