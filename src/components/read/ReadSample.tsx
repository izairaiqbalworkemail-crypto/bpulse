import Link from "next/link";
import { readSpecimen } from "@/content/read";

/**
 * The specimen. Ink room. One document.
 */
export function ReadSample() {
  return (
    <section
      id="sample"
      aria-labelledby="sample-heading"
      className="on-ink overflow-x-clip bg-ink text-read"
    >
      <div className="stage-container py-24 md:py-32">
        <p className="font-plex-mono text-[11px] uppercase tracking-[0.06em] text-label">
          {readSpecimen.n} · {readSpecimen.section}
        </p>
        <h2
          id="sample-heading"
          className="type-display mt-8 max-w-[12ch] font-newsreader text-[clamp(2rem,4vw,3.5rem)] text-paper"
        >
          {readSpecimen.heading}
        </h2>

        <article className="mt-14 overflow-hidden rounded-[8px] border border-line bg-paper-card px-6 py-10 text-ink shadow-[var(--shadow-card)] md:px-12 md:py-14">
          <p className="font-plex-mono text-[11px] uppercase tracking-[0.06em] text-label">
            {readSpecimen.kicker}
            <span className="mx-2 text-ink/20">·</span>
            prepared {readSpecimen.prepared}
          </p>
          <h3 className="mt-5 max-w-[22ch] font-newsreader text-[28px] leading-[1.15] text-ink md:text-[32px]">
            {readSpecimen.title}
          </h3>

          <p className="mt-10 font-plex-mono text-[11px] uppercase tracking-[0.12em] text-quill">
            {readSpecimen.told.label}
          </p>
          <p className="mt-3 max-w-[52ch] font-plex-sans text-[17px] leading-[1.5] text-ink">
            {readSpecimen.told.body}
          </p>

          <p className="mt-10 font-plex-mono text-[11px] uppercase tracking-[0.12em] text-quill">
            {readSpecimen.means.label}
          </p>
          <p className="mt-3 max-w-[52ch] font-plex-sans text-[17px] leading-[1.5] text-ink">
            {readSpecimen.means.body}
          </p>
          <p className="mt-4">
            <Link
              href={readSpecimen.means.href}
              className="font-plex-sans text-[15px] text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink"
            >
              {readSpecimen.means.see}
            </Link>
          </p>

          <p className="mt-10 font-plex-mono text-[11px] uppercase tracking-[0.12em] text-quill">
            {readSpecimen.look.label}
          </p>
          <ol className="mt-4">
            {readSpecimen.look.items.map((item, index) => (
              <li
                key={item}
                className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3 border-t border-ink/10 py-3.5 first:border-t-0 first:pt-0"
              >
                <span className="font-plex-mono text-[13px] text-quill">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="max-w-[48ch] font-plex-sans text-[16px] leading-[1.45] text-ink">
                  {item}
                </span>
              </li>
            ))}
          </ol>

          <div className="mt-12 border-t border-ink/10 pt-8">
            <p className="font-plex-mono text-[11px] uppercase tracking-[0.12em] text-quill">
              {readSpecimen.not.label}
            </p>
            <p className="mt-3 max-w-[52ch] font-plex-sans text-[16px] leading-[1.5] text-quill">
              {readSpecimen.not.body}
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
