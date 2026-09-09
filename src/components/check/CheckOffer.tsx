import Link from "next/link";
import { HeroFrame } from "@/components/HeroFrame";
import { checkOffer } from "@/content/check";
import { offer } from "@/content/offer";

export function CheckOffer() {
  return (
    <HeroFrame id="offer" labelledBy="offer-heading">
      <div className="letter-folio-open">
        <p className="letter-folio-index">01 · The offer</p>
        <div className="letter-folio-body">
          <h1 id="offer-heading" className="letter-window-claim">
            ${offer.check.price.toLocaleString("en-US")}
          </h1>
          <p className="letter-window-meter">{offer.check.duration}.</p>
          <p className="letter-window-dek">{checkOffer.verdict}</p>
          <p className="letter-window-note">{checkOffer.credit}</p>
          <p className="letter-window-actions">
            <Link
              href="#start"
              className="btn btn-gold letter-ask min-h-12 px-8 text-[15px]"
            >
              Reserve my Check
            </Link>
            <Link href="#deliverable" className="letter-window-more">
              See a real report
            </Link>
          </p>
        </div>
      </div>
    </HeroFrame>
  );
}
