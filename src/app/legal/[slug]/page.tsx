import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { getLegalDoc, legalOwner } from "@/content/legal";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function slugify(label: string) {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = getLegalDoc(slug);
  if (!doc) return {};
  return buildMetadata({
    title: doc.title,
    description: `${doc.title} maintained by ${legalOwner.name}. Draft pending solicitor sign-off.`,
    path: `/legal/${doc.slug}`,
  });
}

export async function generateStaticParams() {
  return [
    { slug: "terms" },
    { slug: "privacy-policy" },
    { slug: "cookie-policy" },
    { slug: "accessibility" },
    { slug: "complaints" },
    { slug: "terms-of-service" },
    { slug: "accessibility-statement" },
  ];
}

export default async function LegalDocPage({ params }: PageProps) {
  const { slug } = await params;
  const doc = getLegalDoc(slug);
  if (!doc) notFound();

  const toc = doc.sections.map((section) => section.heading);

  return (
    <section className="legal-print w-full bg-rag pb-24 md:pb-32">
      <div className="grid-container pt-12 md:pt-16">
        <Link
          href="/legal"
          className="font-plex-sans text-sm text-ink/70 underline-offset-4 hover:underline"
        >
          ← Back to legal register
        </Link>

        <header className="mt-8 border border-iron/20 bg-rag-card p-6 shadow-[var(--shadow-card)]">
          <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">
            Legal document · Draft
          </p>
          <h1 className="mt-2 font-newsreader text-[34px] leading-[1.05] text-iron md:text-[48px]">
            {doc.title}
          </h1>
          <div className="mt-5 grid gap-2 font-plex-mono text-[12px] text-ink/75 md:grid-cols-3">
            <p>Version: {doc.version}</p>
            <p>Updated: {doc.updatedAt}</p>
            <p>
              Owner: {legalOwner.name} · {legalOwner.role}
            </p>
          </div>

          <div className="mt-5 rounded-[14px] border border-iron/15 bg-rag p-4">
            <div className="flex items-start gap-4">
              <Image
                src="/team/hamza.jpg"
                alt="Hamza Khan"
                width={76}
                height={96}
                className="h-[96px] w-[76px] rounded-[10px] object-cover object-top grayscale"
              />
              <div>
                <p className="font-newsreader text-[20px] leading-[1.2] text-iron">
                  {legalOwner.name} · {legalOwner.role}
                </p>
                <p className="mt-1 font-newsreader text-[16px] leading-[1.45] text-ink">
                  Part of the bpulse team. Owns legal routing, NDAs, and IP assignment handoff.
                </p>
                <p className="mt-2 font-plex-sans text-[14px] text-ink">
                  Team profile: <Link href="/team/hamza" className="underline underline-offset-4">/team/hamza</Link>
                </p>
              </div>
            </div>
          </div>
        </header>

        <aside className="mt-6 border-l-4 border-blocked bg-blocked/10 px-4 py-3 font-plex-sans text-[14px] leading-[1.5] text-iron" aria-live="polite">
          Draft - pending qualified solicitor review for client jurisdictions. This text is not in force.
        </aside>

        <div className="mt-12 lg:grid lg:grid-cols-[15rem_minmax(0,66ch)] lg:items-start lg:gap-14">
          <nav className="mb-10 hidden lg:sticky lg:top-8 lg:mb-0 lg:block" aria-label="Section index">
            <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">On this page</p>
            <ol className="mt-3 space-y-2">
              {toc.map((item) => (
                <li key={item}>
                  <a
                    href={`#${slugify(item)}`}
                    className="font-plex-sans text-[14px] text-iron underline decoration-iron/25 underline-offset-4 hover:decoration-iron"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <article className="max-w-[66ch]">
            {doc.sections.map((section) => (
              <section key={section.heading} id={slugify(section.heading)} className="mb-10 scroll-mt-28">
                <h2 className="font-newsreader text-[27px] leading-[1.2] text-iron">{section.heading}</h2>
                <p className="mt-3 border border-signal/40 bg-signal/10 px-4 py-3 font-plex-sans text-[14px] leading-[1.5] text-iron">
                  Plain-language summary: {section.summary}
                </p>
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="mt-4 font-newsreader text-reading leading-reading text-ink">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}

            <section className="mt-14 border-t border-iron/20 pt-8">
              <h3 className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">Changelog</h3>
              <ul className="mt-4 space-y-4">
                {doc.changelog.map((item) => (
                  <li key={`${item.date}-${item.change}`} className="border-l-2 border-iron/20 pl-4">
                    <p className="font-plex-mono text-[12px] text-ink/65">{item.date}</p>
                    <p className="mt-1 font-newsreader text-[17px] leading-[1.45] text-iron">{item.change}</p>
                    <p className="mt-1 font-newsreader text-[16px] leading-[1.45] text-ink">Why: {item.reason}</p>
                  </li>
                ))}
              </ul>
            </section>
          </article>
        </div>
      </div>
    </section>
  );
}
