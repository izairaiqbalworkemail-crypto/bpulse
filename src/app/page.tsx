import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Hero } from "@/components/Hero";
import { Landing } from "@/components/Landing";

export const metadata: Metadata = buildMetadata({
  title: "The catalogue",
  description:
    "Senior studio in Lahore. Fixed scope, named people, a portal you can watch. A free Read, a $400 Session, a $1,500 Check. Credited if we take the Close.",
  path: "/",
  image: "/bpulse-brand/social/bpulse-og.png",
});

export default function Home() {
  return (
    <>
      <Hero />
      <Landing />
    </>
  );
}
