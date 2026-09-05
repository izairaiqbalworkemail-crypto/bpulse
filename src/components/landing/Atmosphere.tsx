type AtmosphereProps = {
  kind: "ring" | "paper" | "desk" | "light";
  className?: string;
  opacity?: number;
};

/**
 * Paper grain belongs on heroes (`paper-ground` in HeroFrame).
 * This stays as a no-op so leftover calls do not load missing images.
 */
export function Atmosphere({ className }: Readonly<AtmosphereProps>) {
  if (!className) return null;
  return <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true" />;
}

export function AtmosphereNote({
  tone = "ink",
}: Readonly<{ tone?: "ink" | "rag" }>) {
  return (
    <p
      className={`font-plex-mono text-[11px] uppercase tracking-[0.08em] ${
        tone === "rag" ? "text-rag/60" : "text-ink/70"
      }`}
    >
      Named crew · no stock faces
    </p>
  );
}
