import Link from "next/link";
import { ladder } from "@/content/ladder";
import { Stagger, Item } from "@/components/landing/Reveal";
import { SectionHead } from "@/components/landing/SectionHead";

const iconAttrs = {
  fill: "none",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  viewBox: "0 0 24 24",
} as const;

/** One glyph per start. Stroke inherits the paper colour from the card CSS. */
const icons = {
  read: (
    <svg {...iconAttrs} aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  ),
  session: (
    <svg {...iconAttrs} aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  ),
  check: (
    <svg {...iconAttrs} aria-hidden>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M9 11l2 2 4-4" />
    </svg>
  ),
  close: (
    <svg {...iconAttrs} aria-hidden>
      <path d="M12 2l3 6 6 1-4.5 4.5L18 20l-6-3-6 3 1.5-6.5L3 9l6-1z" />
    </svg>
  ),
} as const;

const order = ["read", "session", "check", "close"] as const;
type StartId = (typeof order)[number];

/** The Close's published band, in the compact form the cards carry. */
const compact: Partial<Record<StartId, string>> = { close: "$18k–$95k" };

/** The four starts, straight off the published ladder. */
export function OfferCards() {
  const cards = order
    .map((id) => ladder.find((rung) => rung.id === id))
    .filter(
      (rung): rung is (typeof ladder)[number] & { id: StartId } =>
        Boolean(rung),
    );

  return (
    <section className="lp-section">
      <div className="lp-shell">
        <SectionHead
          label="Start"
          heading="Start at the matching offer."
          dek="Not sure where you are? Start at the Read — it's free, and nothing on it asks for a meeting."
        />
        <Stagger className="lp-cards">
          {cards.map((card) => (
            <Item key={card.id}>
              <Link href={card.href} className="lp-card">
                <span className="lp-card-icon">{icons[card.id]}</span>
                <p className="lp-card-name">{card.name}</p>
                <p className="lp-card-price">{compact[card.id] ?? card.price}</p>
                <p className="lp-card-meter">{card.meter}</p>
              </Link>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
