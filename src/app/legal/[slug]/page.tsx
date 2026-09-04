import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { brand } from "@/config/brand";

function slugify(label: string) {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function LegalH2({ children }: { children: string }) {
  return (
    <h2
      id={slugify(children)}
      className="scroll-mt-28 font-newsreader text-[24px] leading-title text-iron"
    >
      {children}
    </h2>
  );
}

const LEGAL_INDEX: Record<string, string[]> = {
  "terms-of-service": [
    "1. Who we are",
    "2. What we do",
    "3. The Check",
    "4. The Close and Standing",
    "5. Your obligations",
    "6. Intellectual property",
    "7. Limitation of liability",
    "8. Governing law",
    "9. Changes to these terms",
  ],
  "privacy-policy": [
    "1. What we collect",
    "2. What we do not collect",
    "3. Where your data goes",
    "4. How long we keep it",
    "5. Your rights",
    "6. International data transfers",
    "7. Contact",
  ],
  "cookie-policy": [
    "1. We set no cookies",
    "2. No cookie banner",
    "3. Third-party links",
  ],
  "accessibility-statement": [
    "1. Our commitment",
    "2. What we have done",
    "3. What we have not tested",
    "4. Known issues",
    "5. Feedback",
  ],
  complaints: [
    "1. How to complain",
    "2. How we handle it",
    "3. Escalation",
    "4. Payment disputes",
    "5. Contact",
  ],
};

function LegalIndex({ slug }: { slug: string }) {
  const items = LEGAL_INDEX[slug] ?? [];
  if (items.length === 0) return null;
  return (
    <nav
      aria-label="On this page"
      className="mb-10 hidden lg:block lg:sticky lg:top-8 lg:mb-0"
    >
      <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">
        On this page
      </p>
      <ol className="mt-3 flex flex-col gap-2">
        {items.map((item) => (
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
  );
}

const legalPages = [
  { slug: "terms-of-service", title: "Terms of Service" },
  { slug: "privacy-policy", title: "Privacy Policy" },
  { slug: "cookie-policy", title: "Cookie Policy" },
  { slug: "accessibility-statement", title: "Accessibility Statement" },
  { slug: "complaints", title: "Complaints and Dispute Resolution" },
];

type PageProps = {
  params: Promise<{ slug: string }>;
};

function getPage(slug: string) {
  return legalPages.find((p) => p.slug === slug);
}

export async function generateStaticParams() {
  return legalPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getPage(slug);
  if (!page) return {};
  return buildMetadata({
    title: page.title,
    description: `${page.title} for ${brand.legalName}.`,
    path: `/legal/${slug}`,
  });
}

export default async function LegalPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getPage(slug);

  if (!page) {
    return (
      <div className="grid-container py-36">
        <h1 className="font-newsreader text-h1 text-iron">
          Page not found
        </h1>
      </div>
    );
  }

  return (
    <section className="w-full bg-rag">
      <PageHero
        kicker="Legal · Draft"
        title={page.title}
        dek={`Pending legal review. Not yet in force. Last updated September 2026 · ${brand.legalName}.`}
        actionHref="/contact"
        actionLabel="Questions"
      />

      <div className="pb-24 md:pb-32">
        <div className="grid-container pt-16">
          <Link
            href="/"
            className="font-plex-sans text-sm text-ink/60 underline-offset-4 hover:underline"
          >
            ← Back to catalogue
          </Link>

          <div className="mt-12 lg:grid lg:grid-cols-[14rem_minmax(0,66ch)] lg:items-start lg:gap-16">
            <LegalIndex slug={slug} />
            <div className="max-w-[66ch] font-newsreader text-[18px] leading-[1.7] text-ink">
              {slug === "terms-of-service" && <TermsOfService />}
              {slug === "privacy-policy" && <PrivacyPolicy />}
              {slug === "cookie-policy" && <CookiePolicy />}
              {slug === "accessibility-statement" && <AccessibilityStatement />}
              {slug === "complaints" && <Complaints />}
            </div>
          </div>

          <div className="mt-16 border-t border-iron/15 pt-8">
            <p className="font-newsreader text-reading leading-reading text-ink">
              Questions?{" "}
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
      </div>
    </section>
  );
}

function TermsOfService() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <LegalH2>1. Who we are</LegalH2>
        <p className="mt-4 font-newsreader text-reading leading-reading text-ink">
          {brand.legalName} (&ldquo;bpulse&rdquo;, &ldquo;we&rdquo;,
          &ldquo;us&rdquo;) is a software studio registered in Lahore, Punjab,
          Pakistan. These terms apply to every service we provide and every page
          on {brand.url}.
        </p>
      </section>

      <section>
        <LegalH2>2. What we do</LegalH2>
        <p className="mt-4 font-newsreader text-reading leading-reading text-ink">
          We take over products stuck at the last twenty percent and carry them
          into production. We offer three service tiers: The Check (a diagnostic
          assessment), The Close (a fixed-scope build), and Standing
          (post-launch support).
        </p>
      </section>

      <section>
        <LegalH2>3. The Check</LegalH2>
        <p className="mt-4 font-newsreader text-reading leading-reading text-ink">
          The Check is a $1,500 USD diagnostic delivered in five business days.
          You receive a condition report on your product. The fee is credited in
          full against a build within 30 days if you proceed. The Check may
          conclude that you don&apos;t need us — the fee is still credited and
          you keep the report.
        </p>
      </section>

      <section>
        <LegalH2>4. The Close and Standing</LegalH2>
        <p className="mt-4 font-newsreader text-reading leading-reading text-ink">
          The Close is a fixed-scope build priced between $18,000 and $95,000
          USD. Standing is post-launch support priced between $2,000 and $6,000
          per month. Scope, timeline, and price are agreed in writing before any
          code is written.
        </p>
      </section>

      <section>
        <LegalH2>5. Your obligations</LegalH2>
        <p className="mt-4 font-newsreader text-reading leading-reading text-ink">
          You must provide accurate information in the intake form and grant
          access to the codebase, deployment environment, and documentation
          needed for the engagement. Delays caused by incomplete or inaccurate
          information affect timelines.
        </p>
      </section>

      <section>
        <LegalH2>6. Intellectual property</LegalH2>
        <p className="mt-4 font-newsreader text-reading leading-reading text-ink">
          Upon full payment, you own the code we write for your product. We do
          not claim ownership of your existing codebase. We may publish an
          anonymised condition report in our catalogue — with your written
          consent, and never including your source code.
        </p>
      </section>

      <section>
        <LegalH2>7. Limitation of liability</LegalH2>
        <p className="mt-4 font-newsreader text-reading leading-reading text-ink">
          Our liability is limited to the fees paid for the specific engagement.
          We are not liable for indirect, incidental, or consequential damages.
          We do not guarantee specific business outcomes — we guarantee the
          quality and diligence of the work.
        </p>
      </section>

      <section>
        <LegalH2>8. Governing law</LegalH2>
        <p className="mt-4 font-newsreader text-reading leading-reading text-ink">
          These terms are governed by the laws of Pakistan. Any disputes will be
          resolved in the courts of Lahore, Punjab. For international clients,
          governing law may differ as agreed in writing before the engagement.
        </p>
      </section>

      <section>
        <LegalH2>9. Changes to these terms</LegalH2>
        <p className="mt-4 font-newsreader text-reading leading-reading text-ink">
          We may update these terms. The version in force at the time of your
          engagement applies. We will notify you of material changes.
        </p>
      </section>
    </div>
  );
}

function PrivacyPolicy() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <LegalH2>1. What we collect</LegalH2>
        <p className="mt-4 font-newsreader text-reading leading-reading text-ink">
          When you use an intake form, we store the fields you type: name,
          email, product description, budget, timeline, and how you found us.
          To stop abuse of the form we also briefly store the request IP in
          Redis for a one-minute rate limit. Private report pages log a
          timestamp and a slug — no IP, no cookie. We do not run analytics,
          pixels, or session recording.
        </p>
      </section>

      <section>
        <LegalH2>2. What we do not collect</LegalH2>
        <p className="mt-4 font-newsreader text-reading leading-reading text-ink">
          We do not use analytics. We do not use tracking pixels. We do not use
          advertising cookies. We do not use session recording. We do not use
          behavioural profiling. The site sets no cookies whatsoever.
        </p>
      </section>

      <section>
        <LegalH2>3. Where your data goes</LegalH2>
        <p className="mt-4 font-newsreader text-reading leading-reading text-ink">
          Submissions are written to our Postgres database and emailed to the
          studio inbox through Resend. Rate limits and report view counts use
          Upstash Redis. Those are infrastructure vendors, not marketing
          lists. We do not sell your data or use it for advertising.
        </p>
      </section>

      <section>
        <LegalH2>4. How long we keep it</LegalH2>
        <p className="mt-4 font-newsreader text-reading leading-reading text-ink">
          There is no automated deletion job yet. Submissions stay in the
          database until we delete them by hand. Email{" "}
          {brand.contact.email} and we will delete your row. A retention
          schedule will be published here once it is real.
        </p>
      </section>

      <section>
        <LegalH2>5. Your rights</LegalH2>
        <p className="mt-4 font-newsreader text-reading leading-reading text-ink">
          You can request access to, correction of, or deletion of your personal
          data at any time by emailing {brand.contact.email}. We will respond
          within one business day.
        </p>
      </section>

      <section>
        <LegalH2>6. International data transfers</LegalH2>
        <p className="mt-4 font-newsreader text-reading leading-reading text-ink">
          The studio operates from Lahore, Pakistan. The database and mail
          region is set when those accounts are provisioned — it is not
          published on this page yet. Ask {brand.contact.email} if you need
          the region before you submit.
        </p>
      </section>

      <section>
        <LegalH2>7. Contact</LegalH2>
          <p className="mt-4 font-newsreader text-reading leading-reading text-ink">
          For privacy questions, email {brand.contact.email}. For complaints,
          see our{" "}
          <Link
            href="/legal/complaints"
            className="underline-offset-4 hover:underline"
          >
            Complaints and Dispute Resolution
          </Link>{" "}
          page.
        </p>
      </section>
    </div>
  );
}

function CookiePolicy() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <LegalH2>1. We set no cookies</LegalH2>
        <p className="mt-4 font-newsreader text-reading leading-reading text-ink">
          This site sets zero cookies. There are no analytics cookies, no
          advertising cookies, no social media cookies, no session recording
          cookies, and no preference cookies. The site works without them.
        </p>
      </section>

      <section>
        <LegalH2>2. No cookie banner</LegalH2>
        <p className="mt-4 font-newsreader text-reading leading-reading text-ink">
          Because we set no cookies, there is no cookie banner. A consent banner
          for cookies we do not set would be theatre. We do not do theatre.
        </p>
      </section>

      <section>
        <LegalH2>3. Third-party links</LegalH2>
        <p className="mt-4 font-newsreader text-reading leading-reading text-ink">
          Some pages link to client sites and external references. Those sites
          may set their own cookies. We do not control them and this policy does
          not apply to them.
        </p>
      </section>
    </div>
  );
}

function AccessibilityStatement() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <LegalH2>1. Our commitment</LegalH2>
        <p className="mt-4 font-newsreader text-reading leading-reading text-ink">
          We want everyone to be able to use this site. We have made efforts to
          ensure the site is usable by people with disabilities, but we
          acknowledge there is more work to do.
        </p>
      </section>

      <section>
        <LegalH2>2. What we have done</LegalH2>
        <ul className="mt-4 list-inside list-disc font-newsreader text-reading leading-reading text-ink">
          <li>
            Type tokens were chosen for WCAG AA contrast on paper and iron.
            Individual pages have not had a full contrast audit.
          </li>
          <li>
            Interactive elements are in the tab order. A full keyboard pass
            of every route is still on the founder checklist.
          </li>
          <li>
            <code>prefers-reduced-motion</code> is read in the hero and the
            conversation intakes. Ambient motion should be off; that has not
            been visually signed off.
          </li>
          <li>Semantic HTML: landmarks and one h1 per page on the routes we ship.</li>
          <li>
            Content images carry alt text. Decorative images use empty alt.
          </li>
        </ul>
      </section>

      <section>
        <LegalH2>3. What we have not tested</LegalH2>
        <p className="mt-4 font-newsreader text-reading leading-reading text-ink">
          A formal screen-reader audit has not been run. Do not treat this
          page as evidence that one has.
        </p>
      </section>

      <section>
        <LegalH2>4. Known issues</LegalH2>
        <ul className="mt-4 list-inside list-disc font-newsreader text-reading leading-reading text-ink">
          <li>
            Some team member photos may not meet optimal contrast when rendered
            in greyscale — we are working on better source images.
          </li>
          <li>
            The intake form has not been tested with all screen-reader / browser
            combinations.
          </li>
        </ul>
      </section>

      <section>
        <LegalH2>5. Feedback</LegalH2>
        <p className="mt-4 font-newsreader text-reading leading-reading text-ink">
          If you encounter an accessibility barrier, please email{" "}
          {brand.contact.email}. We will respond within one business day and
          prioritise the fix.
        </p>
      </section>
    </div>
  );
}

function Complaints() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <LegalH2>1. How to complain</LegalH2>
        <p className="mt-4 font-newsreader text-reading leading-reading text-ink">
          If you are unhappy with our work, our conduct, or anything about the
          engagement, email {brand.contact.email} with the subject line
          &ldquo;Complaint&rdquo;. Tell us what happened and what you want. We
          will acknowledge your complaint within 2 business days.
        </p>
      </section>

      <section>
        <LegalH2>2. How we handle it</LegalH2>
        <p className="mt-4 font-newsreader text-reading leading-reading text-ink">
          A senior member of the team (not the person the complaint is about)
          will review it. We will give you a substantive response within 10
          business days. If we need more time, we will tell you.
        </p>
      </section>

      <section>
        <LegalH2>3. Escalation</LegalH2>
        <p className="mt-4 font-newsreader text-reading leading-reading text-ink">
          If you are not satisfied with our response, you may escalate to
          mediation. We prefer mediation over litigation — it is faster and
          cheaper for both sides. We will engage a mutually agreed mediator and
          share the cost.
        </p>
      </section>

      <section>
        <LegalH2>4. Payment disputes</LegalH2>
        <p className="mt-4 font-newsreader text-reading leading-reading text-ink">
          If you have a payment dispute, contact us before initiating a
          chargeback. We are reasonable people and would rather resolve it
          directly.
        </p>
      </section>

      <section>
        <LegalH2>5. Contact</LegalH2>
        <p className="mt-4 font-newsreader text-reading leading-reading text-ink">
          {brand.contact.email} · {brand.legalName} · Lahore, Punjab, Pakistan
        </p>
      </section>
    </div>
  );
}
