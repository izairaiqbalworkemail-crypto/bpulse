import Image from "next/image";

type CreditProps = {
  /**
   * Specialist's full name.
   */
  name: string;
  /**
   * Capability — one of the three: Integration, Delivery, Intelligence.
   */
  capability: string;
  /**
   * One line about what they do. Optional.
   */
  line?: string;
  /**
   * Public path to a 1:1 portrait crop, e.g. "/team/aneeb.jpg".
   * Optional. When omitted, renders as name and role with no picture.
   * Never a grey box or a generated stand-in.
   */
  portraitSrc?: string;
  /**
   * Subject name for the portrait image (alt text / SEO).
   */
  portraitAlt?: string;
};

/**
 * A specialist: name, capability, one line, optional 72px greyscale portrait.
 *
 * Constraint enforces: a missing portrait renders as name and role with no
 * picture — never a grey box, never a placeholder person, never a generated
 * stand-in.
 */
export function Credit({
  name,
  capability,
  line,
  portraitSrc,
  portraitAlt = name,
}: CreditProps) {
  return (
    <div className="card flex items-center gap-4 p-5">
      {portraitSrc && (
        <div className="card-iron h-[72px] w-[72px]">
          <Image
            src={portraitSrc}
            alt={portraitAlt}
            width={72}
            height={72}
            className="h-full w-full object-cover grayscale"
          />
        </div>
      )}
      <div>
        <p className="font-plex-sans text-sm font-medium text-iron">{name}</p>
        <p className="font-plex-mono text-caption text-ink/60">{capability}</p>
        {line && (
          <p className="mt-1 max-w-[60ch] font-newsreader text-caption leading-reading text-ink/80">
            {line}
          </p>
        )}
      </div>
    </div>
  );
}
