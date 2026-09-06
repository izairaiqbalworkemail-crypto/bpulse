import Image from "next/image";

export const sealedVerdict = {
  src: "/brand/sealed-verdict.webp",
  alt: "A cream folio sealed in gold wax beside a brass key on dark leather.",
} as const;

type SealedStillProps = {
  caption?: string;
};

/**
 * The Check still: a written verdict, and the keys you leave with.
 */
export function SealedStill({ caption }: Readonly<SealedStillProps>) {
  return (
    <figure className="overflow-hidden bg-iron-2">
      <div className="relative aspect-[3/2]">
        <Image
          src={sealedVerdict.src}
          alt={sealedVerdict.alt}
          fill
          sizes="(min-width: 1024px) 42vw, 92vw"
          className="object-cover"
        />
      </div>
      {caption ? (
        <figcaption className="border-t border-rag/10 bg-iron-2 px-5 py-3.5 font-plex-mono text-[12px] uppercase tracking-[0.08em] text-rag/70">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
