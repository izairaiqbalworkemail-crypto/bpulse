import type { ReactNode } from "react";

type SignalFrameProps = {
  id?: string;
  labelledBy?: string;
  children: ReactNode;
};

/**
 * Cream sides. One gold plate. The Check rooms use this, not a full-bleed yellow wall.
 */
export function SignalFrame({
  id,
  labelledBy,
  children,
}: Readonly<SignalFrameProps>) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy ? `${labelledBy}-heading` : undefined}
      data-surface="signal"
      className="ribbon paper-ground relative scroll-mt-[5.75rem] md:scroll-mt-28"
    >
      <div className="relative z-10 p-2.5 md:p-4">
        <div className="signal-plate">
          <div className="px-6 py-16 md:px-12 md:py-24 lg:px-16">{children}</div>
        </div>
      </div>
    </section>
  );
}
