import { joble, companyExtras } from "@/lib/content";
import { CompanyPage, companyMetadata, type CompanyPageData } from "@/components/company-page";

const data: CompanyPageData = {
  wordmark: joble.wordmark,
  kicker: joble.kicker,
  headline: joble.headline,
  body: [...joble.body, companyExtras.joble.extra],
  facts: joble.facts,
  href: joble.href,
  siteLabel: companyExtras.joble.siteLabel,
};

export const metadata = companyMetadata(data, "/joble");

export default function JoblePage() {
  return <CompanyPage data={data} />;
}
