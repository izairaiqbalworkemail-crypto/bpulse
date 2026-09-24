import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PulseHero } from "@/components/landing/PulseHero";
import { OfferCards } from "@/components/landing/OfferCards";
import { StuckSelector } from "@/components/landing/StuckSelector";
import { AfterTrack } from "@/components/landing/AfterTrack";
import { ProcessRail } from "@/components/landing/ProcessRail";
import { CompareLedger } from "@/components/landing/CompareLedger";
import { FacesRail } from "@/components/landing/FacesRail";
import { FaqSection } from "@/components/landing/FaqSection";
import { ClosingAsk } from "@/components/landing/ClosingAsk";
import { doubtCopy, homeQuestions } from "@/content/home";
import { faqIcons } from "@/content/landing-sections";

export const metadata: Metadata = buildMetadata({
  title: "It looks finished. It will not ship.",
  description:
    "Senior studio in Lahore. Fixed scope, named people, a portal you can watch. A free Read, a $400 Session, a $1,500 Check. Credited if we take the Close.",
  path: "/",
  image: "/bpulse-brand/social/bpulse-og.png",
});

export default function Home() {
  return (
    <>
      <PulseHero />
      <OfferCards />
      <StuckSelector />
      <ProcessRail />
      <AfterTrack />
      <CompareLedger />
      <FacesRail />
      <FaqSection
        dek={doubtCopy.dek}
        heading={doubtCopy.heading}
        icons={faqIcons}
        id="questions"
        idPrefix="home-faq"
        items={homeQuestions}
        label={doubtCopy.kicker}
      />
      <ClosingAsk
        heading="The Read is free, and lands in one business day."
        href={doubtCopy.askHref}
        ctaLabel={doubtCopy.ask}
        label={doubtCopy.band}
        line="Tells you, in writing, what is actually stuck."
      />
    </>
  );
}
