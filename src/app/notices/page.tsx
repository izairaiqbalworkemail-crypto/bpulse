import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { FAQPageJsonLd } from "@/lib/JsonLd";
import { PageHero } from "@/components/PageHero";
import { PageClose } from "@/components/PageClose";
import { Episode } from "@/components/episode/Episode";
import { LetterLedger } from "@/components/letter/LetterLedger";
import { Stagger, Item } from "@/components/landing/Reveal";
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

      <PageHero
        kicker="Notices"
        title="Questions we get asked, answered plainly."
        dek={pageFrame.notices}
      />

      <Episode tone="paper">
        <nav aria-label="Jump to a notice">
          <Stagger className="flex flex-col gap-3" gap={0.04}>
            {notices.map((notice, index) => (
              <Item key={notice.id}>
                <a
                  href={`#${notice.id}`}
                  className="font-plex-sans text-[16px] text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
                >
                  {index + 1}. {notice.question}
                </a>
              </Item>
            ))}
          </Stagger>
        </nav>

        <div className="mt-14">
          <LetterLedger
            lines={notices.map((notice) => ({
              id: notice.id,
              title: notice.question,
              body: notice.answer,
            }))}
          />
        </div>

        <PageClose line="Still a question? Five days, or write the studio." />
      </Episode>
    </>
  );
}
