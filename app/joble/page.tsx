import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { JobleHero } from "@/components/joble/joble-hero";
import { JobleWhat } from "@/components/joble/joble-what";
import { JobleProof } from "@/components/joble/joble-proof";

/* ============================================================================
   /joble  —  JOBLE  (Figma redesign, November 2026)
   ----------------------------------------------------------------------------
   Hero ("Never miss a customer again."), what it is (the workspace, Britney
   and Sophia), and proof. Header and footer come from the root layout.
   ========================================================================== */

const TITLE = "Joble | Never miss a customer again | Nelson T. Ajulo";
const DESCRIPTION =
  "Joble puts an AI agent on the website and the phone so that a business answers, qualifies and books around the clock. Live in five minutes, 13 languages, EU data residency.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/joble" },
  openGraph: { type: "website", title: TITLE, description: DESCRIPTION, url: "/joble" },
};

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Joble",
  url: "https://joble.app",
  applicationCategory: "BusinessApplication",
  description: DESCRIPTION,
  creator: { "@type": "Person", name: "Nelson T. Ajulo", url: "https://tnajulo.com" },
};

export default function JoblePage() {
  return (
    <main id="main">
      <JsonLd data={productJsonLd} />
      <JobleHero />
      <JobleWhat />
      <JobleProof />
    </main>
  );
}
