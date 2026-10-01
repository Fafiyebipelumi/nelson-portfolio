import { fifteenWins, companyExtras } from "@/lib/content";
import { CompanyPage, companyMetadata, type CompanyPageData } from "@/components/company-page";

const data: CompanyPageData = {
  wordmark: fifteenWins.wordmark,
  kicker: "Venture platform",
  headline: fifteenWins.headline,
  body: [...fifteenWins.body, companyExtras.fifteenwins.extra],
  facts: fifteenWins.facts,
  href: fifteenWins.href,
  siteLabel: companyExtras.fifteenwins.siteLabel,
};

export const metadata = companyMetadata(data, "/15wins");

export default function FifteenWinsPage() {
  return <CompanyPage data={data} />;
}
