import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Episode } from "@/components/episode/Episode";
import { LetterLedger } from "@/components/letter/LetterLedger";
import { MatchDesk } from "@/components/match/MatchDesk";
import { getCatalogue } from "@/content/catalogue";
import { pageFrame } from "@/content/platform";
import { signalTaxonomy, signalCategoryLabel } from "@/content/signals";
import { offer } from "@/content/offer";
import { money } from "@/content/ladder";

const caseCount = getCatalogue().length;
const checkPrice = money(offer.check.price);

export const metadata: Metadata = buildMetadata({
  title: "Describe what is stuck.",
  description: pageFrame.match,
  path: "/match",
});

const PASSES = [
  {
    number: "01",
    label: "Read your words",
    title: "The stuck part, heard as conditions",
    body: "Word-bounded matching against published conditions. Not a guessed parse. Nothing typed about yourself.",
  },
  {
    number: "02",
    label: "Checked our work",
    title: `${caseCount} engagements, tagged from their own text`,
    body: "Every case is tagged from how it came in. Your words sit next to a case we already took, or they do not, and the page shows you the row.",
  },
  {
    number: "03",
    label: "Ranked who could take it",
    title: "What we found first, then what they have shipped",
    body: "What we found, then capability, domain, stack, and availability. The reason is the evidence, not a score.",
  },
  {
    number: "04",
    label: "Shaped it",
    title: "A range you can put a name on",
    body: "Read from the distinct conditions. Fewer than two conditions, a person takes it, and the page says so.",
  },
] as const;

export default function MatchPage() {
  const groups = new Map<string, (typeof signalTaxonomy)[number][]>();
  for (const item of signalTaxonomy) {
    const list = groups.get(item.category) ?? [];
    list.push(item);
    groups.set(item.category, list);
  }

  return (
    <>
      <PageHero
        kicker="Assignment"
        title="Describe what is stuck."
        dek={pageFrame.match}
      />

      <Episode tone="paper">
          <p className="max-w-[52ch] font-newsreader text-[20px] leading-[1.4] text-ink">
            Other firms match on skills people typed about themselves. We assign
            from work already shipped.
          </p>
          <p className="mt-4 max-w-[52ch] font-plex-sans text-[17px] leading-[1.5] text-quill">
            What came in broken, what the fix shipped. Your words run against
            the same language, and the page shows the rows that line up.
          </p>

          <div id="desk" className="mt-14 scroll-mt-28">
            <MatchDesk />
          </div>

          <div className="mt-20">
            <LetterLedger
              lines={PASSES.map((step) => ({
                id: step.number,
                kicker: `${step.number} · ${step.label}`,
                title: step.title,
                body: step.body,
              }))}
            />
          </div>

          <div className="mt-16 border-t border-ink/12 pt-10">
            <p className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-quill/70">
              What we hear
            </p>
            <p className="mt-4 max-w-[40ch] font-newsreader text-[22px] leading-[1.25] text-ink">
              {signalTaxonomy.length} conditions, four lanes.
            </p>
            <div className="mt-10 grid gap-10 md:grid-cols-2">
              {[...groups.entries()].map(([category, list]) => (
                <div key={category}>
                  <p className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-quill/70">
                    {signalCategoryLabel[category as keyof typeof signalCategoryLabel]}
                    <span className="ml-3 text-quill/50">
                      {String(list.length).padStart(2, "0")}
                    </span>
                  </p>
                  <ul className="mt-3">
                    {list.map((item) => (
                      <li
                        key={item.id}
                        className="border-t border-ink/10 py-2 font-newsreader text-[16px] leading-[1.4] text-quill first:border-t-0 first:pt-0"
                      >
                        {item.says}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 border-t border-ink/12 pt-10">
            <p className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-quill/70">
              If the Read is not enough
            </p>
            <p className="mt-4 font-newsreader text-[clamp(2.5rem,7vw,4rem)] leading-none tracking-[-0.03em] text-ink">
              {checkPrice}
            </p>
            <p className="mt-4 max-w-[42ch] font-plex-sans text-[17px] leading-[1.5] text-quill">
              The Check. A verdict of keep, repair, or rebuild. Written within{" "}
              {offer.check.duration}. Credited in full against a build in 30
              days.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Link
                href="/check#intake"
                className="btn btn-gold letter-ask min-h-12 px-8 text-[15px]"
              >
                Reserve my Check
              </Link>
              <Link
                href="/read"
                className="font-plex-mono text-[13px] tracking-[0.04em] text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
              >
                Get my free read
              </Link>
            </div>
          </div>
      </Episode>
    </>
  );
}
