import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { ServiceJsonLd } from "@/lib/JsonLd";
import { CheckOffer } from "@/components/check/CheckOffer";
import { CheckReports } from "@/components/check/CheckReports";
import { CheckDays } from "@/components/check/CheckDays";
import { CheckRunner } from "@/components/check/CheckRunner";
import { CheckCase } from "@/components/check/CheckCase";
import { CheckQuestions } from "@/components/check/CheckQuestions";
import { CheckStart } from "@/components/check/CheckStart";
import { pageFrame } from "@/content/platform";
import { offer } from "@/content/offer";
import { parseCheckCase } from "@/lib/check-case";

export const metadata: Metadata = buildMetadata({
  title: "The Check",
  description: pageFrame.check,
  path: "/check",
});

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function CheckPage({ searchParams }: Readonly<PageProps>) {
  const params = await searchParams;
  const view = parseCheckCase(params);

  return (
    <>
      <ServiceJsonLd
        name={offer.check.name}
        description={offer.check.description}
        price={offer.check.price}
      />
      <CheckOffer />
      <CheckReports />
      <CheckDays />
      <CheckRunner />
      <CheckCase view={view} />
      <CheckQuestions />
      <CheckStart />
    </>
  );
}
