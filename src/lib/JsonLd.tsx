import { brand } from "@/config/brand";

type JsonLdBase = {
  "@context": "https://schema.org";
  "@type": string;
};

type Organization = JsonLdBase & {
  "@type": "Organization";
  name: string;
  url: string;
  description: string;
  logo?: string;
  address?: {
    "@type": "PostalAddress";
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };
  contactPoint?: {
    "@type": "ContactPoint";
    email: string;
    contactType: "customer service";
  };
};

type WebSite = JsonLdBase & {
  "@type": "WebSite";
  name: string;
  url: string;
  description: string;
};

type Service = JsonLdBase & {
  "@type": "Service";
  name: string;
  description: string;
  provider: {
    "@type": "Organization";
    name: string;
  };
  offers?: {
    "@type": "Offer";
    price: number | string;
    priceCurrency: string;
    description: string;
  };
};

type Person = JsonLdBase & {
  "@type": "Person";
  name: string;
  jobTitle: string;
  worksFor?: {
    "@type": "Organization";
    name: string;
  };
};

type FAQPage = JsonLdBase & {
  "@type": "FAQPage";
  mainEntity: Array<{
    "@type": "Question";
    name: string;
    acceptedAnswer: {
      "@type": "Answer";
      text: string;
    };
  }>;
};

type BreadcrumbList = JsonLdBase & {
  "@type": "BreadcrumbList";
  itemListElement: Array<{
    "@type": "ListItem";
    position: number;
    name: string;
    item: string;
  }>;
};

function JsonLdScript({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd() {
  const data: Organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brand.legalName,
    url: brand.url,
    logo: `${brand.url}${brand.logo}`,
    description: brand.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: brand.address.street,
      addressRegion: brand.address.region,
      addressCountry: brand.address.country,
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: brand.contact.email,
      contactType: "customer service",
    },
  };
  return <JsonLdScript data={data} />;
}

export function WebSiteJsonLd() {
  const data: WebSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: brand.name,
    url: brand.url,
    description: brand.description,
  };
  return <JsonLdScript data={data} />;
}

export function ServiceJsonLd(props: {
  name: string;
  description: string;
  price: number | string;
}) {
  const data: Service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: props.name,
    description: props.description,
    provider: {
      "@type": "Organization",
      name: brand.legalName,
    },
    offers: {
      "@type": "Offer",
      price: props.price,
      priceCurrency: "USD",
      description: props.description,
    },
  };
  return <JsonLdScript data={data} />;
}

export function PersonJsonLd(props: { name: string; jobTitle: string }) {
  const data: Person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: props.name,
    jobTitle: props.jobTitle,
    worksFor: {
      "@type": "Organization",
      name: brand.legalName,
    },
  };
  return <JsonLdScript data={data} />;
}

export function FAQPageJsonLd({
  items,
}: {
  items: Array<{ question: string; answer: string }>;
}) {
  const data: FAQPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
  return <JsonLdScript data={data} />;
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: Array<{ name: string; url: string }>;
}) {
  const data: BreadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return <JsonLdScript data={data} />;
}
