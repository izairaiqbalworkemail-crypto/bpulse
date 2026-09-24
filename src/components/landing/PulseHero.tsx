import Link from "next/link";
import { heroCopy } from "@/content/hero";
import { pulseCopy } from "@/content/home";
import { HeroPanel } from "@/components/landing/HeroPanel";
import { Reveal, Rise } from "@/components/landing/Reveal";

/**
 * The opening. The visitor's build is stuck; the track says so.
 * Below, the portal window cycles real engagements through their stages.
 */
export function PulseHero() {
  return (
    <section className="lp-hero">
      <div className="lp-shell">
        <div className="lp-hero-in">
          <Reveal>
            <p aria-hidden className="lp-track">
              <span className="lp-track-node is-active">
                <span className="lp-track-dot" />
                Stuck
              </span>
              <span className="lp-track-line" />
              <span className="lp-track-node">
                <span className="lp-track-dot" />
                Build
              </span>
              <span className="lp-track-line" />
              <span className="lp-track-node">
                <span className="lp-track-dot" />
                Ship
              </span>
            </p>
          </Reveal>

          <Rise delay={0.08}>
            <h1>{heroCopy.claim.join(" ")}</h1>
          </Rise>

          <Reveal delay={0.16}>
            <p className="lp-hero-dek">{heroCopy.dek}</p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="lp-hero-ctas">
              <Link href="/read" className="lp-btn-primary">
                {heroCopy.action}
                <span aria-hidden className="lp-arrow">
                  →
                </span>
              </Link>
              <a href="#process" className="lp-btn-ghost">
                How we work
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="lp-hero-proof">{pulseCopy.baseline}</p>
          </Reveal>
        </div>

        <div className="lp-liquid-stage">
          <div aria-hidden className="lp-liquid-blob lp-blob-1" />
          <div aria-hidden className="lp-liquid-blob lp-blob-2" />
          <div aria-hidden className="lp-liquid-blob lp-blob-3" />

          <HeroPanel />
        </div>
      </div>
    </section>
  );
}
