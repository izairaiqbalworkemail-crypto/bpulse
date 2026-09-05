import Image from "next/image";
import { displayHost } from "@/lib/lot-trace";

type BrowserShotProps = {
  src: string;
  url?: string;
  client: string;
};

export function BrowserShot({ src, url, client }: Readonly<BrowserShotProps>) {
  const host = displayHost(url) || client;

  return (
    <figure className="max-h-[40%]">
      <div className="overflow-hidden rounded-[10px] bg-iron ring-1 ring-iron/15">
        <div className="flex items-center gap-2 border-b border-rag/10 px-3 py-1.5">
          <span className="flex gap-1" aria-hidden="true">
            <span className="h-1.5 w-1.5 rounded-full bg-rag/35" />
            <span className="h-1.5 w-1.5 rounded-full bg-rag/35" />
            <span className="h-1.5 w-1.5 rounded-full bg-rag/35" />
          </span>
          <p className="min-w-0 truncate font-plex-mono text-[11px] text-rag/70">
            {host}
          </p>
        </div>
        <div className="relative h-28 overflow-hidden bg-iron-2 sm:h-32">
          <Image
            src={src}
            alt={`${client} public site`}
            fill
            sizes="(max-width: 768px) 100vw, 520px"
            className="object-cover object-top"
          />
        </div>
      </div>
      <figcaption className="mt-2 font-plex-mono text-[11px] uppercase tracking-[0.06em] text-ink/60">
        the client&apos;s public site
      </figcaption>
    </figure>
  );
}
