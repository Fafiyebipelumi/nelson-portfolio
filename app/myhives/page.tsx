import { myhives, companyExtras } from "@/lib/content";
import { CompanyPage, companyMetadata, type CompanyPageData } from "@/components/company-page";

const data: CompanyPageData = {
  wordmark: myhives.wordmark,
  kicker: myhives.kicker,
  headline: myhives.headline,
  body: [...myhives.body, companyExtras.myhives.extra],
  facts: myhives.facts,
  quote: myhives.quote,
  href: myhives.href,
  siteLabel: companyExtras.myhives.siteLabel,
};

export const metadata = companyMetadata(data, "/myhives");

export default function MyHivesPage() {
  return <CompanyPage data={data} />;
}
