import { Episode, EpisodeHead } from "@/components/episode/Episode";
import { Item, Stagger } from "@/components/landing/Reveal";
import { checkDays } from "@/content/check";

export function CheckDays() {
  return (
    <Episode labelledBy="days" tone="cocoa">
      <EpisodeHead
        n="03"
        kicker="THE FIVE DAYS"
        id="days"
        tone="cocoa"
        heading="No mystery after you pay."
      >
        Day 1 you receive nothing. That is the line that makes the rest
        believable.
      </EpisodeHead>

      <Stagger className="mt-16" gap={0.07}>
        {checkDays.map((row) => (
          <Item
            key={row.day}
            className="grid gap-2 border-l border-rag/15 py-6 pl-6 first:pt-0 last:pb-0 md:grid-cols-[7rem_minmax(0,1fr)] md:gap-10"
          >
            <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-rag/70">
              {row.day}
            </p>
            <div>
              <p className="font-newsreader text-[24px] leading-[1.2] text-rag">
                {row.title}
              </p>
              <p className="mt-2 max-w-[52ch] font-newsreader text-[17px] leading-[1.5] text-rag/75">
                {row.body}
              </p>
            </div>
          </Item>
        ))}
      </Stagger>
    </Episode>
  );
}
