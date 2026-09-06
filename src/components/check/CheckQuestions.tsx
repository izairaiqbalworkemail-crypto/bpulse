import { Episode, EpisodeHead } from "@/components/episode/Episode";
import { Item, Stagger } from "@/components/landing/Reveal";
import { checkQuestions } from "@/content/check";

export function CheckQuestions() {
  return (
    <Episode labelledBy="questions" tone="milk">
      <EpisodeHead
        n="06"
        kicker="THE QUESTIONS"
        id="questions"
        heading="Including the uncomfortable ones."
      >
        Visible. No accordion. The last one is the one you are already asking.
      </EpisodeHead>

      <Stagger className="mt-16 grid gap-x-16 gap-y-12 md:grid-cols-2" gap={0.07}>
        {checkQuestions.map((item) => (
          <Item key={item.q}>
            <article className="border-t border-iron/10 pt-6">
              <h3 className="max-w-[28ch] font-newsreader text-[24px] leading-[1.2] text-iron">
                {item.q}
              </h3>
              <p className="mt-3 max-w-[42ch] font-newsreader text-[17px] leading-[1.5] text-ink">
                {item.a}
              </p>
            </article>
          </Item>
        ))}
      </Stagger>
    </Episode>
  );
}
