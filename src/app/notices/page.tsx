import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
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

      <section className="w-full bg-rag">
        <div className="h-px w-full bg-iron/15" />

        <div className="pt-40 pb-24 md:pt-48 md:pb-32">
          <div className="grid-container">
            <h1 className="font-newsreader text-[clamp(2rem,4vw+0.5rem,3.5rem)] leading-title tracking-tight text-iron">
              Notices
            </h1>
            <p className="mt-4 max-w-[560px] font-newsreader text-reading leading-reading text-ink">
              Questions we get asked, answered plainly. Every answer is visible.
              No accordion, no chevron, no plus sign — a catalogue does not hide
              its conditions.
            </p>
          </div>
        </div>

        <div className="grid-container">
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
