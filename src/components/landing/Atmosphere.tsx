type AtmosphereProps = {
  kind: "ring" | "paper" | "desk" | "light";
  className?: string;
  opacity?: number;
};

/**
 * Paper grain used to live on heroes. The first window is cream + plate now.
 * This stays as a no-op so leftover calls do not load missing images.
 */
export function Atmosphere({ className }: Readonly<AtmosphereProps>) {
  if (!className) return null;
  return <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true" />;
}

export function AtmosphereNote({
  tone = "ink",
}: Readonly<{ tone?: "ink" | "paper" }>) {
  return (
    <p
      className={`font-plex-mono text-[11px] uppercase tracking-[0.08em] ${
        tone === "paper" ? "text-paper/60" : "text-quill/70"
      }`}
    >
      Named crew · no stock faces
    </p>
  );
}
