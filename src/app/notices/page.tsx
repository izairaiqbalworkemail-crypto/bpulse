import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { FAQPageJsonLd } from "@/lib/JsonLd";
import { PageHero } from "@/components/PageHero";
import { PageClose } from "@/components/PageClose";
import { Atmosphere } from "@/components/landing/Atmosphere";
import { Reveal } from "@/components/landing/Reveal";
import { notices } from "@/content/notices";
import { pageFrame } from "@/content/platform";

export const metadata: Metadata = buildMetadata({
  title: "Notices",
  description: pageFrame.notices,
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

      <section className="w-full bg-paper">
        <PageHero
          kicker="Notices"
          title="Questions we get asked, answered plainly."
          dek={pageFrame.notices}
        />
        <div className="relative overflow-hidden">
          <Atmosphere kind="light" opacity={0.22} />
          <div className="relative grid-container pb-24 pt-10 md:pb-32">
          <nav aria-label="Jump to a notice" className="border-b border-ink/20 pb-8">
            <ol className="flex flex-col gap-2">
              {notices.map((notice, index) => (
                <li key={notice.id}>
                  <Reveal delay={index * 0.04}>
                    <a
                      href={`#${notice.id}`}
                      className="font-plex-sans text-[16px] text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
                    >
                      {index + 1}. {notice.question}
                    </a>
                  </Reveal>
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-12">
            {notices.map((notice, index) => (
              <Reveal key={notice.id} delay={index * 0.05}>
              <article
                id={notice.id}
                className="scroll-mt-28 border-t border-ink/12 py-10"
              >
                <h2 className="max-w-[42ch] font-newsreader text-[22px] leading-[1.25] text-ink">
                  {notice.question}
                </h2>
                <p className="mt-3 max-w-[52ch] font-newsreader text-[17px] leading-[1.55] text-quill">
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
