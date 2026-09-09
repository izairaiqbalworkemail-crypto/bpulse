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
    <aside className="mt-14 border-t border-ink/10 pt-10">
      <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-quill/70">
        Not your call?
      </p>
      <p className="mt-2 max-w-[22ch] font-newsreader text-[24px] leading-[1.12] tracking-[-0.03em] text-ink">
        Send the Check to whoever owns the repo.
      </p>
      <p className="mt-3 max-w-[36ch] font-newsreader text-[15px] leading-[1.45] text-quill">
        Most products die in a Slack thread. This is the same link, with the
        price and the five days already written.
      </p>
      <a
        href={`mailto:?subject=${subject}&body=${body}`}
        className="btn btn-gold mt-6 px-5 text-[14px]"
      >
        Open a mail to them
      </a>
    </aside>
  );
}
