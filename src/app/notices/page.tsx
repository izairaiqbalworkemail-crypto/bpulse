import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { FAQPageJsonLd } from "@/lib/JsonLd";
import { notices } from "@/content/notices";

export const metadata: Metadata = buildMetadata({
  title: "Notices",
  description:
    "Questions we get asked, answered plainly. No accordion. The last one is what we are bad at.",
  path: "/notices",
});

export default function NoticesPage() {
  const last = notices[notices.length - 1];

  return (
    <>
      <FAQPageJsonLd
        items={notices.map((n) => ({
          question: n.question,
          answer: n.answer,
        }))}
      />

      <section className="w-full bg-rag">
        <div className="grid-container pb-24 pt-16 md:pb-32 md:pt-20">
          <nav aria-label="Jump to a notice" className="border-b border-iron/20 pb-8">
            <ol className="flex flex-col gap-2">
              {notices.map((notice, index) => (
                <li key={notice.id}>
                  <a
                    href={`#${notice.id}`}
                    className="font-plex-sans text-[16px] text-iron underline decoration-iron/30 underline-offset-4 hover:decoration-iron"
                  >
                    {index + 1}. {notice.question}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-12 columns-1 gap-x-16 md:columns-2">
            {notices.map((notice) => (
              <article
                key={notice.id}
                id={notice.id}
                className={`mb-12 break-inside-avoid border-t pt-5 ${
                  notice.id === last?.id
                    ? "border-iron"
                    : "border-iron/20"
                }`}
              >
                <h2 className="font-newsreader text-[22px] leading-[1.25] text-iron">
                  {notice.question}
                </h2>
                <p className="mt-3 font-newsreader text-[16px] leading-[1.55] text-ink">
                  {notice.answer}
                </p>
              </article>
            ))}
          </div>

          <p className="mt-8 font-newsreader text-[16px] text-ink/80">
            Still a question?{" "}
            <Link
              href="/contact"
              className="underline decoration-iron/30 underline-offset-4 hover:decoration-iron"
            >
              Write to us
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
