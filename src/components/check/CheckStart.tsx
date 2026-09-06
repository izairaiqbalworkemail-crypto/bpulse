import { Episode, EpisodeHead } from "@/components/episode/Episode";
import { Item, Reveal, Slide, Stagger } from "@/components/landing/Reveal";
import { PulseCheckIntake } from "@/components/intake/PulseCheckIntake";
import { checkNext } from "@/content/check";

export function CheckStart() {
  return (
    <Episode labelledBy="start" tone="paper">
      <EpisodeHead
        n="07"
        kicker="START"
        id="start"
        heading="Reserve a slot. No payment yet."
      >
        The money path first. Then the brief.
      </EpisodeHead>

      <div className="mt-14 grid items-start gap-16 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
        <Slide from="left">
          <p className="font-plex-mono text-[12px] uppercase tracking-[0.1em] text-ink/70">
            {checkNext.heading}
          </p>
          <Stagger className="mt-6" gap={0.06}>
            {checkNext.steps.map((step, index) => (
              <Item
                key={step}
                className="grid grid-cols-[2rem_minmax(0,1fr)] gap-4 border-l border-iron/15 py-4 pl-6 first:pt-0 last:pb-0"
              >
                <span className="font-plex-mono text-[12px] text-ink/70">
                  {index + 1}
                </span>
                <span className="font-newsreader text-[18px] leading-[1.4] text-iron">
                  {step}
                </span>
              </Item>
            ))}
          </Stagger>
          <p className="mt-8 max-w-[46ch] font-newsreader text-[17px] leading-[1.5] text-ink">
            {checkNext.pay}
          </p>
        </Slide>

        <Reveal delay={0.08}>
          <div className="room-card overflow-hidden">
            <div className="border-b border-iron/8 px-6 py-6 md:px-8">
              <p className="font-plex-mono text-[12px] uppercase tracking-[0.1em] text-ink/70">
                The brief
              </p>
              <p className="mt-3 max-w-[36ch] font-newsreader text-[22px] leading-[1.3] text-iron">
                What it is. Where it&apos;s stuck. Access you can give. How to
                reach you.
              </p>
            </div>
            <div className="px-6 py-6 md:px-8">
              <PulseCheckIntake
                source="check"
                surface="plain"
                submitTone="iron"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </Episode>
  );
}
