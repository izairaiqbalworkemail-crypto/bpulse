import { Reveal, Rise } from "@/components/landing/Reveal";

type SectionHeadProps = {
  label: string;
  heading: string;
  dek?: string;
  id?: string;
  /** ink: the label and dek sit on a dark plate. */
  tone?: "paper" | "ink";
};

/**
 * Label pill, heavy title, one line of dek. Centred.
 * The shared head for every redesigned section.
 */
export function SectionHead({
  label,
  heading,
  dek,
  id,
  tone = "paper",
}: Readonly<SectionHeadProps>) {
  const ink = tone === "ink";
  return (
    <div className="lp-section-head">
      <Reveal>
        <p className={`lp-section-label ${ink ? "lp-section-label-ink" : ""}`}>
          {label}
        </p>
      </Reveal>
      <Rise delay={0.06}>
        <h2
          id={id}
          className={`lp-h2 ${ink ? "text-paper" : "text-ink"}`}
        >
          {heading}
        </h2>
      </Rise>
      {dek ? (
        <Reveal delay={0.1}>
          <p className={`lp-section-dek ${ink ? "lp-section-dek-ink" : ""}`}>
            {dek}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
