import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { FifteenWinsHero } from "@/components/fifteen-wins/fifteen-wins-hero";
import { FifteenWinsWhat } from "@/components/fifteen-wins/fifteen-wins-what";
import { FifteenWinsApproach } from "@/components/fifteen-wins/fifteen-wins-approach";

/* ============================================================================
   /15wins  —  15WINS VENTURES  (Figma redesign, November 2026)
   ----------------------------------------------------------------------------
   Hero ("Builds and backs the companies that widen access."), what it backs,
   and how to approach. Header and footer come from the root layout.
   ========================================================================== */

const TITLE =
  "15Wins Ventures | Builds and backs the companies that widen access";
const DESCRIPTION =
  "15Wins Ventures builds and backs the companies that widen access: founders building where the answer to 'who does this reach?' is unusual. Nelson T. Ajulo is General Partner.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/15wins" },
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    url: "/15wins",
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "15Wins Ventures",
  url: "https://15wins.com",
  description: DESCRIPTION,
  employee: {
    "@type": "Person",
    name: "Nelson T. Ajulo",
    jobTitle: "General Partner",
    url: "https://tnajulo.com",
  },
};

export default function FifteenWinsPage() {
  return (
    <main id="main">
      <JsonLd data={orgJsonLd} />
      <FifteenWinsHero />
      <FifteenWinsWhat />
      <FifteenWinsApproach />
    </main>
  );
}
