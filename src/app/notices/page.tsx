import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { FAQPageJsonLd } from "@/lib/JsonLd";
import { Notice } from "@/components/primitives/Notice";
import { notices } from "@/content/notices";

export const metadata: Metadata = buildMetadata({
  title: "Notices",
  description:
    "Questions we get asked, answered plainly. No accordion, no hiding.",
  path: "/notices",
});

export default function NoticesPage() {
  return (
    <>
      <FAQPageJsonLd
        items={notices.map((n) => ({
          question: n.question,
          answer: n.answer,
        }))}
      />

      <PageHero
        kicker="Notices"
        title="Questions, answered plainly."
        dek="Every answer is visible. No accordion, no chevron, no plus sign — a catalogue does not hide its conditions."
        actionHref="/contact"
        actionLabel="Get in touch"
      />

      <section className="w-full bg-rag">

        <div className="grid-container pt-16 md:pt-20">
          {notices.map((notice) => (
            <Notice
              key={notice.id}
              question={notice.question}
              answer={notice.answer}
            />
          ))}

          <div className="py-16 border-t border-iron/15">
            <p className="font-newsreader text-reading leading-reading text-ink/70">
              Still have questions?{" "}
              <Link
                href="/contact"
                className="font-plex-sans text-sm font-medium text-iron underline-offset-4 hover:underline"
              >
                Get in touch
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
