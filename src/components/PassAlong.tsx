import { offer } from "@/content/offer";
import { brand } from "@/config/brand";

/**
 * Champion-to-buyer handoff. Most Checks stall because the writer
 * is not the person who can pay. One mailto, no invented share counts.
 */
export function PassAlong() {
  const price = `$${offer.check.price.toLocaleString("en-US")}`;
  const subject = encodeURIComponent(`The Check — ${price}, five days`);
  const body = encodeURIComponent(
    `Can you look at this? Five-day condition report, ${price}, credited if we take a Close.\n\n${brand.url}/check\n\nIf it is the wrong door: ${brand.url}/contact`,
  );

  return (
    <aside className="card-iron px-8 py-10">
      <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-rag/70">
        Not your call?
      </p>
      <p className="mt-2 max-w-[22ch] font-newsreader text-[24px] leading-[1.12] tracking-[-0.03em]">
        Send the Check to whoever owns the repo.
      </p>
      <p className="mt-3 max-w-[36ch] font-newsreader text-[15px] leading-[1.45] text-rag/80">
        Most products die in a Slack thread. This is the same link, with the
        price and the five days already written.
      </p>
      <a
        href={`mailto:?subject=${subject}&body=${body}`}
        className="mt-6 inline-flex items-center rounded-full bg-signal px-5 py-2.5 font-plex-sans text-[14px] font-medium text-iron"
      >
        Open a mail to them
      </a>
    </aside>
  );
}
