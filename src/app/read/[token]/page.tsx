import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getRead } from "@/lib/read/store";
import { preparedLabel } from "@/lib/read/generate";
import { offer } from "@/content/offer";
import { getSpecialist } from "@/content/specialists";

type PageProps = {
  params: Promise<{ token: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { token } = await params;
  const read = await getRead(token);
  return {
    title: read ? `Preliminary read — ${read.title}` : "Preliminary read",
    description:
      "A written read of what you described. Built from your words. Not a diagnosis of code we have not seen.",
    robots: { index: false, follow: false, nocache: true },
  };
}

export default async function ReadPage({ params }: PageProps) {
  const { token } = await params;
  const read = await getRead(token);
  if (!read) notFound();
  const runner = getSpecialist("aneeb");
  const first = runner.name.split(" ")[0] ?? runner.name;
  const price = `$${offer.check.price.toLocaleString("en-US")}`;

  return (
    <article className="read-doc w-full bg-rag pb-24">
      <div className="grid-container py-12 md:py-16">
        <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">
          Preliminary read · prepared {preparedLabel(read.preparedAt)}
        </p>
        <h1 className="mt-3 font-newsreader text-[40px] leading-[1.1] tracking-[-0.03em] text-iron md:text-[56px]">
          {read.title}
        </h1>
        <p className="mt-3 font-newsreader text-[18px] text-ink">
          From your description
        </p>

        <section className="mt-12">
          <h2 className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">
            What you told us
          </h2>
          <p className="mt-4 max-w-[58ch] font-newsreader text-[20px] leading-[1.45] text-iron">
            {read.told}
          </p>
        </section>

        {read.pattern ? (
          <section className="mt-12">
            <h2 className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">
              What that usually means
            </h2>
            <p className="mt-4 max-w-[58ch] font-newsreader text-[20px] leading-[1.45] text-iron">
              {read.pattern.claim}
            </p>
            <p className="mt-4">
              <Link
                href={`/work/${read.pattern.lotSlug}`}
                className="font-plex-sans text-[15px] text-iron underline decoration-iron/30 underline-offset-4"
              >
                See how {read.pattern.lotName} arrived
              </Link>
            </p>
          </section>
        ) : null}

        <section className="mt-12">
          <h2 className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">
            What we&apos;d look at first
          </h2>
          <ol className="mt-4 flex max-w-[58ch] flex-col gap-3">
            {read.lookFirst.map((item, index) => (
              <li
                key={item}
                className="font-newsreader text-[20px] leading-[1.4] text-iron"
              >
                <span className="font-plex-mono text-[13px] text-ink/60">
                  {index + 1}
                </span>{" "}
                {item}
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-14 border-t-2 border-iron pt-10">
          <h2 className="font-newsreader text-[28px] leading-[1.15] text-iron">
            What this isn&apos;t
          </h2>
          <p className="mt-4 max-w-[58ch] font-newsreader text-[20px] leading-[1.45] text-iron">
            {read.limits}
          </p>
          <p className="mt-6 max-w-[46ch] font-newsreader text-[20px] leading-[1.45] text-iron">
            {read.checkLine}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href={`/team/${runner.id}`}
              className="inline-flex min-h-11 touch-manipulation items-center rounded-full bg-signal px-5 py-2.5 font-plex-sans text-[14px] font-medium text-iron"
            >
              Write {first}
            </Link>
            <Link
              href="/check"
              className="font-plex-sans text-[14px] text-iron underline decoration-iron/30 underline-offset-4"
            >
              The Check · {price}
            </Link>
          </div>
        </section>
      </div>
    </article>
  );
}
