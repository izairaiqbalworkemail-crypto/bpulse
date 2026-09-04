/**
 * The 80% / last-20% bar. Shared across every page hero so the site
 * always opens on the same diagram.
 */
export function EightyBar() {
  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between font-plex-mono text-[14px] tabular-nums">
        <span className="text-rag/75">80%</span>
        <span className="text-rag/70">the last 20%</span>
      </div>
      <div className="relative h-3.5 overflow-hidden rounded-full border border-rag/18 bg-iron/75">
        <div className="absolute inset-y-0 left-0 w-[80%] bg-signal" />
        <div
          className="absolute inset-y-0 right-0 w-[20%] border-l border-rag/30"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, rgba(239,234,224,0.18) 0, rgba(239,234,224,0.18) 2px, transparent 2px, transparent 7px)",
          }}
        />
      </div>
    </div>
  );
}
