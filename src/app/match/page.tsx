import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Atmosphere } from "@/components/landing/Atmosphere";
import { Rise, Stagger, Item } from "@/components/landing/Reveal";
import { MatchDesk } from "@/components/match/MatchDesk";
import { getCatalogue } from "@/content/catalogue";
import { pageFrame } from "@/content/platform";
import { signalTaxonomy, signalCategoryLabel } from "@/content/signals";
import { offer } from "@/content/offer";

const recordCount = getCatalogue().length;
const checkPrice = `$${offer.check.price.toLocaleString("en-US")}`;

export const metadata: Metadata = buildMetadata({
  title: "The assignment engine",
  description: pageFrame.match,
  path: "/match",
});

const PIPELINE = [
  {
    number: "01",
    label: "Read your words",
    tone: "bg-quill",
    title: "The stuck part, heard as conditions",
    body: "Word-bounded phrase matching against 21 repeatable conditions — no freeform AI parse, no guessed keywords in the URL, nothing typed about yourself.",
    file: "21 conditions · 4 lanes",
  },
  {
    number: "02",
    label: "Checked our work",
    tone: "bg-partial",
    title: `${recordCount} engagements, tagged from their own text`,
    body: "Every case is tagged from how it came in. Your words sit next to a case we already took, or they do not, and the page shows you the row.",
    file: `${recordCount} rows · case + index`,
  },
  {
    number: "03",
    label: "Ranked who could take it",
    tone: "bg-diag",
    title: "What we found first, then what they have shipped",
    body: "What we found, then capability, domain, stack, and availability. A weighted ranking you never see as a number. The reason is the evidence, not a score.",
    file: "evaluated on shipped work",
  },
  {
    number: "04",
    label: "Shaped it",
    tone: "bg-ink",
    title: "A range you can put a name on",
    body: "Read from the distinct conditions, not from a pricing model. Fewer than two conditions? No shape — a person takes it, and the page says so.",
    file: "range · not a quote",
  },
];

const TRACEABILITY = [
  {
    label: "Your exact words",
    body: "Every claim shows the phrase we heard, quoted back, and the line it came from.",
    tone: "bg-blocked",
  },
  {
    label: "A name from our work",
    body: "Each signal opens its file — how we read it, the triggers it listens for.",
    tone: "bg-diag",
  },
  {
    label: "The engagement it came from",
    body: "Comparisons stop at a real lot or index line you can open and read yourself.",
    tone: "bg-partial",
  },
  {
    label: "Who covers it on the bench",
    body: "A coverage pill per condition: your match ships past it, it stays open, or a person reads it by hand.",
    tone: "bg-ink",
  },
];

function SignalBand() {
  const groups = new Map<string, (typeof signalTaxonomy)[number][]>();
  for (const signal of signalTaxonomy) {
    const list = groups.get(signal.category) ?? [];
    list.push(signal);
    groups.set(signal.category, list);
  }

  return (
    <div className="border-t border-ink/12 py-8">
      <p className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-quill/70">
        The evidence language
      </p>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
        <h2 className="max-w-[18ch] font-newsreader type-title text-[28px] leading-[1.1] text-ink md:text-[36px]">
          Heard from your words. Named from our work.
        </h2>
        <p className="max-w-[34ch] font-newsreader text-[16px] leading-[1.45] text-quill">
          {signalTaxonomy.length} conditions, four lanes. If your words carry
          one, the read can tell you — and show the file it lives in.
        </p>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-4">
        {[...groups.entries()].map(([category, list]) => (
          <div key={category}>
            <p className="flex items-center gap-2 font-plex-mono text-[11px] uppercase tracking-[0.06em] text-ink">
              {signalCategoryLabel[category as keyof typeof signalCategoryLabel]}
              <span className="ml-auto text-ink/50">
                {String(list.length).padStart(2, "0")}
              </span>
            </p>
            <ul className="mt-3 flex flex-col gap-2">
              {list.map((signal) => (
                <li
                  key={signal.id}
                  className="flex items-baseline gap-2 font-newsreader text-[14px] leading-[1.4] text-quill"
                >
                  <span
                    aria-hidden="true"
                    className="h-1 w-1 shrink-0 translate-y-[-2px] rounded-full bg-ink/40"
                  />
                  {signal.says}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function PriceBand() {
  return (
    <div className="on-ink rounded-[12px] border border-line-ink bg-ink-card p-6 text-read md:p-10">
      <p className="font-plex-mono text-[11px] uppercase tracking-[0.06em] text-label">
        Where the read becomes the next step
      </p>
      <div className="mt-6 flex flex-wrap items-end justify-between gap-8">
        <div>
          <p className="font-newsreader type-display-xl text-[52px] text-paper md:text-[64px]">
            {checkPrice}
          </p>
          <p className="mt-3 max-w-[40ch] font-plex-sans text-[17px] leading-[1.45] text-read">
            The Check — a verdict of keep, repair, or rebuild. Fixed at{" "}
            {checkPrice}, written up within {offer.check.duration}. Credited on
            a Close invoice within 30 days.
          </p>
        </div>
        <Link
          href="/check#intake"
          className="btn btn-gold min-w-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper"
        >
          Reserve my Check
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}

function IntegrityBand() {
  return (
    <div className="on-ink rounded-[12px] border border-line-ink bg-ink-card p-6 text-read md:p-10">
      <p className="font-plex-mono text-[11px] uppercase tracking-[0.06em] text-label">
        No model. No score.
      </p>
      <div className="mt-8 grid gap-8 md:grid-cols-3">
        {[
          {
            head: "Deterministic by construction",
            body: "The same words produce the same read. Nothing here samples or guesses. Every pass is a fixed rule over work we have published.",
          },
          {
            head: "Every name has a file",
            body: "Every name and every row points at a published case or is marked as read by hand. Nothing is inferred, nothing is invented.",
          },
          {
            head: "Fewer than two conditions",
            body: "The taxonomy stays quiet and a person takes it — Aneeb, by name. No fabrication, no forced match, no percentage.",
          },
        ].map((claim) => (
          <div key={claim.head}>
            <p className="font-plex-mono text-[11px] uppercase tracking-[0.06em] text-paper">
              {claim.head}
            </p>
            <p className="mt-2 font-plex-sans text-[16px] leading-[1.45] text-read">
              {claim.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MatchPage() {
  return (
    <section className="w-full bg-paper">
      <PageHero
        kicker="Assignment"
        title="Describe what’s stuck. The platform assigns."
        dek={pageFrame.match}
        hideAction
      />
      <div className="relative overflow-hidden">
        <Atmosphere kind="paper" opacity={0.2} />
        <div className="relative grid-container pb-24 pt-10 md:pb-32">
          <section className="mx-auto max-w-[44rem] text-center">
            <Rise>
              <h2 className="font-newsreader type-title text-[26px] leading-[1.25] text-ink md:text-[34px]">
                Other firms match on skills people typed about themselves. The
                platform assigns from evidence of work already shipped.
              </h2>
            </Rise>
            <Rise delay={0.12}>
              <p className="mx-auto mt-4 max-w-[44ch] type-lead text-ink">
                Every engagement on file is tagged from its own condition text.
              </p>
              <p className="mx-auto mt-3 max-w-[44ch] font-newsreader text-[16px] leading-[1.5] text-quill">
                What came in broken, what the fix shipped — your words are run
                against the same language, and the page shows you the rows that
                line up.
              </p>
            </Rise>
          </section>

          <section className="mx-auto mt-16 max-w-[40rem] md:mt-20">
            <p className="kicker">
              What this is. The read, in four passes
            </p>
            <Stagger className="mt-6 flex flex-col gap-3" gap={0.08}>
              {PIPELINE.map((step) => (
                <Item key={step.number}>
                  <article className="border-l-2 border-ink/15 py-2 pl-5">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline gap-2">
                        <span className="font-plex-mono text-[12px] tabular-nums text-quill/50">
                          {step.number}
                        </span>
                        <span className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-quill/70">
                          {step.label}
                        </span>
                      </div>
                      <p className="mt-1 font-newsreader type-title text-[20px] leading-[1.25] text-ink">
                        {step.title}
                      </p>
                      <p className="mt-2 font-newsreader text-[15px] leading-[1.45] text-quill">
                        {step.body}
                      </p>
                      <p className="mt-3 font-plex-mono text-[11px] uppercase tracking-[0.06em] text-quill/55">
                        {step.file}
                      </p>
                    </div>
                  </article>
                </Item>
              ))}
            </Stagger>
          </section>

          <section className="mx-auto mt-16 max-w-[44rem] md:mt-20">
            <SignalBand />
          </section>

          <section className="mx-auto mt-16 max-w-[44rem] md:mt-20">
            <p className="kicker flex items-center gap-2">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-blocked pulse-dot" />
              Traceable by design
            </p>
            <Stagger
              className="mt-6 grid gap-3 md:grid-cols-2"
              gap={0.06}
            >
              {TRACEABILITY.map((claim) => (
                <Item key={claim.label}>
                  <article className="h-full border-t border-ink/10 pt-5">
                    <p className="font-plex-mono text-[11px] uppercase tracking-[0.06em] text-ink">
                      {claim.label}
                    </p>
                    <p className="mt-2 font-newsreader text-[15px] leading-[1.45] text-quill">
                      {claim.body}
                    </p>
                  </article>
                </Item>
              ))}
            </Stagger>
            <p className="mt-5 text-center font-newsreader text-[15px] text-quill">
              Open the case the read points at.{" "}
              <Link
                href="/work"
                className="font-plex-sans text-[14px] text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
              >
                our work is public
              </Link>
              .
            </p>
          </section>

          <section className="mx-auto mt-16 max-w-[44rem] md:mt-20">
            <IntegrityBand />
          </section>

          <section className="mx-auto mt-16 max-w-[44rem] md:mt-20">
            <PriceBand />
          </section>

          <section id="desk" className="mx-auto mt-16 max-w-[36rem] scroll-mt-28 md:mt-20">
            <MatchDesk />
          </section>
        </div>
      </div>
    </section>
  );
}