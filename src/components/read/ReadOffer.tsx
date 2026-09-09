import Link from "next/link";
import { HeroFrame } from "@/components/HeroFrame";
import { readOffer, readStart } from "@/content/read";
import { pageFrame } from "@/content/platform";

/**
 * The Read chapter. Claim and the ask. The rest sits on paper.
 */
export function ReadOffer() {
  return (
    <HeroFrame id="offer" labelledBy="offer-heading">
      <div className="letter-folio-open">
        <p className="letter-folio-index">
          {readOffer.n} · {readOffer.kicker}
        </p>
        <div className="letter-folio-body">
          <h1 id="offer-heading" className="letter-window-claim">
            {readOffer.heading}
          </h1>
          <p className="letter-window-dek">{pageFrame.read}</p>
          <p className="letter-window-actions">
            <Link
              href={readStart.href}
              className="btn btn-gold letter-ask min-h-12 px-8 text-[15px]"
            >
              {readStart.label}
            </Link>
          </p>
        </div>
      </div>
    </HeroFrame>
  );
}
