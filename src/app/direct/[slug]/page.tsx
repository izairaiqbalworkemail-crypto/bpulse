import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { Atmosphere } from "@/components/landing/Atmosphere";
import { PageHero } from "@/components/PageHero";
import { DirectDesk } from "@/components/direct/DirectDesk";
import { BreadcrumbJsonLd } from "@/lib/JsonLd";
import { brand } from "@/config/brand";
import { specialists, getSpecialist } from "@/content/specialists";
import { firstName } from "@/lib/lot-trace";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return specialists.map((person) => ({ slug: person.id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const person = specialists.find((item) => item.id === slug);
  if (!person) return {};
  const first = firstName(person.name);
  return buildMetadata({
    title: `Write ${first}`,
    description: `A written intake for ${person.name}. Nobody is typing. ${first} replies within one business day.`,
    path: `/direct/${person.id}`,
  });
}

export default async function DirectConversationPage({ params }: PageProps) {
  const { slug } = await params;
  const person = specialists.find((item) => item.id === slug);
  if (!person) notFound();
  const specialist = getSpecialist(slug);
  const first = firstName(specialist.name);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Direct", url: `${brand.url}/direct` },
          { name: first, url: `${brand.url}/direct/${specialist.id}` },
        ]}
      />
      <PageHero
        kicker="Direct line"
        title={`Write ${first}.`}
        dek={`A written intake, not a chatbot. Nobody is typing. ${first} reads every one and replies within one business day.`}
        hideAction
      />
      <section className="relative w-full overflow-hidden bg-rag">
        <Atmosphere kind="paper" opacity={0.12} />
        <div className="relative mx-auto max-w-[960px] px-5 py-8 pb-24 md:px-8 md:py-12 md:pb-32">
          <DirectDesk
            specialistId={specialist.id}
            pageSource={`direct/${specialist.id}`}
          />
        </div>
      </section>
    </>
  );
}
