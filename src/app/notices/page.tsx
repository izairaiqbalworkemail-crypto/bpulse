import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { FAQPageJsonLd } from "@/lib/JsonLd";
import { PageHero } from "@/components/PageHero";
import { PageClose } from "@/components/PageClose";
import { Atmosphere } from "@/components/landing/Atmosphere";
import { Reveal } from "@/components/landing/Reveal";
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
        <PageHero
          kicker="Notices"
          title="Questions we get asked, answered plainly."
          dek="No accordion. The last one is what we are bad at."
          hideAction
        />
        <div className="relative overflow-hidden">
          <Atmosphere kind="light" opacity={0.22} />
          <div className="relative grid-container pb-24 pt-10 md:pb-32">
          <nav aria-label="Jump to a notice" className="border-b border-iron/20 pb-8">
            <ol className="flex flex-col gap-2">
              {notices.map((notice, index) => (
                <li key={notice.id}>
                  <Reveal delay={index * 0.04}>
                    <a
                      href={`#${notice.id}`}
                      className="font-plex-sans text-[16px] text-iron underline decoration-iron/30 underline-offset-4 hover:decoration-iron"
                    >
                      {index + 1}. {notice.question}
                    </a>
                  </Reveal>
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-12 columns-1 gap-x-16 md:columns-2">
            {notices.map((notice, index) => (
              <Reveal key={notice.id} delay={index * 0.05}>
              <article
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
              </Reveal>
            ))}
          </div>

          <PageClose line="Still a question? Five days, or write the studio." />
          </div>
        </div>
      </section>
    </>
  );
}
