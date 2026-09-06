import Link from "next/link";
import { Episode, EpisodeHead } from "@/components/episode/Episode";
import { homeQuestions } from "@/content/home";

/**
 * 08 · THE QUESTIONS — paper. Two columns of type. No cards, no accordion.
 */
export function Questions() {
  return (
    <Episode labelledBy="questions" tone="paper">
      <EpisodeHead
        n="08"
        kicker="THE QUESTIONS"
        id="questions"
        heading="Including the parts that hurt."
      >
        Visible. No accordion. The last one is a real constraint.
      </EpisodeHead>

      <div className="mt-16 grid gap-x-16 gap-y-12 md:grid-cols-2">
        {homeQuestions.map((item) => (
          <article key={item.q} className="border-t border-iron/10 pt-6">
            <h3 className="max-w-[28ch] font-newsreader text-[24px] leading-[1.2] text-iron">
              {item.q}
            </h3>
            <p className="mt-3 max-w-[42ch] font-newsreader text-[17px] leading-[1.5] text-ink">
              {item.a}
            </p>
          </article>
        ))}
      </div>

      <p className="mt-20 font-newsreader text-[22px] text-iron">
        <Link
          href="/check"
          className="underline decoration-iron/25 underline-offset-4 hover:decoration-iron"
        >
          The Check is $1,500. Five days.
        </Link>
      </p>
    </Episode>
  );
}
