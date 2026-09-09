import { checkOffer } from "@/content/check";
import { ladder, noDiscount } from "@/content/ladder";
import { LetterLedger } from "@/components/letter/LetterLedger";

const neighbors = ladder.filter(
  (rung) => rung.id === "session" || rung.id === "check" || rung.id === "slice",
);

export function CheckSits() {
  return (
    <section
      id="sits"
      aria-labelledby="sits-heading"
      className="ribbon relative bg-paper text-ink"
    >
      <div className="stage-container py-16 md:py-20">
        <ul className="letter-folio-facts">
          {checkOffer.facts.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>
        <h2
          id="sits-heading"
          className="font-plex-mono text-[12px] uppercase tracking-[0.14em] text-quill/70"
        >
          Where this sits
        </h2>
        <div className="mt-8">
          <LetterLedger
            lines={neighbors.map((rung) => {
              const here = rung.id === "check";
              return {
                id: rung.id,
                kicker: here ? "You are here" : rung.name,
                title: here ? rung.name : rung.price,
                body: rung.credit,
                meta: here ? rung.price : undefined,
                href: here ? undefined : rung.href,
                ask: here ? undefined : "Open",
                here,
              };
            })}
          />
        </div>
        <p className="mt-8 max-w-[52ch] font-plex-sans text-[15px] leading-[1.55] text-quill">
          {noDiscount}
        </p>
      </div>
    </section>
  );
}
