import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Hero } from "@/components/Hero";
import { Landing } from "@/components/Landing";

export const metadata: Metadata = buildMetadata({
  title: "The catalogue",
  description:
    "Senior studio in Lahore. Fixed scope, named people, a portal you can watch. A $1,500 Check in five days — keep, repair, or rebuild. Credited if we take the Close.",
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
