import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { Atmosphere } from "@/components/landing/Atmosphere";
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
      <section className="relative w-full overflow-hidden bg-rag">
        <Atmosphere kind="paper" opacity={0.14} />
        <div className="relative grid-container py-10 pb-24 md:py-14 md:pb-32">
          <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">
            Direct line · {first}
          </p>
          <h1 className="mt-3 max-w-[18ch] font-newsreader text-[32px] leading-[1.1] text-iron md:text-[40px]">
            Write {first} about the part that will not ship.
          </h1>
          <div className="mt-8">
            <DirectDesk
              specialistId={specialist.id}
              pageSource={`direct/${specialist.id}`}
            />
          </div>
        </div>
      </section>
    </>
  );
}
