import Link from "next/link";
import { Reveal } from "@/components/landing/Reveal";
import { SectionIntro } from "@/components/home/SectionIntro";
import { termsCopy, termsCredit } from "@/content/home";
import { ladder } from "@/content/ladder";

/**
 * Terms. Cream room. The ladder is the object.
 * Gold sits on the recommended price, not on the page.
 */
export function Terms() {
  return (
    <section
      id="terms"
      aria-labelledby="terms-heading"
      className="overflow-x-clip bg-paper text-ink"
    >
      <div className="stage-container py-20 md:py-28">
        <SectionIntro
          id="terms-heading"
          n={termsCopy.n}
          kicker={termsCopy.kicker}
          heading={termsCopy.heading}
          dek={termsCopy.route}
          headingMax="max-w-[14ch]"
        />

        <Reveal delay={0.12}>
          <ol className="mt-12 overflow-hidden rounded-[24px] border border-line bg-paper-card px-6 shadow-[var(--shadow-card)] md:px-8">
            {ladder.map((row) => {
              const recommended = row.id === "read";
              return (
                <li
                  key={row.id}
                  className="grid gap-2 border-t border-ink/8 py-7 first:border-t-0 md:grid-cols-[10rem_12rem_minmax(0,1fr)] md:items-baseline md:gap-8"
                >
                  <p className="font-plex-sans text-[16px] text-ink">
                    <Link
                      href={row.href}
                      className="underline decoration-ink/20 underline-offset-4 hover:decoration-ink"
                    >
                      {row.name}
                    </Link>
                    {recommended ? (
                      <span className="ml-2 text-[14px] text-quill">
                        · {termsCopy.recommended}
                      </span>
                    ) : null}
                  </p>
                  <div>
                    <p
                      className={`font-plex-mono text-[16px] tabular-nums ${
                        recommended ? "text-diag-p" : "text-ink"
                      }`}
                    >
                      {row.price}
                    </p>
                    {row.id === "check" ? (
                      <p className="mt-2 font-plex-mono text-[16px] leading-[1.4] text-ink">
                        {termsCredit}
                      </p>
                    ) : null}
                  </div>
                  <p className="max-w-[46ch] font-plex-sans text-[15px] leading-[1.5] text-quill">
                    {row.body}
                  </p>
                </li>
              );
            })}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
