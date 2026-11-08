import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { MyhivesHero } from "@/components/myhives/myhives-hero";
import { MyhivesWhat } from "@/components/myhives/myhives-what";
import { MyhivesInstitutions } from "@/components/myhives/myhives-institutions";

/* ============================================================================
   /myhives  —  MYHIVES  (Figma redesign, November 2026)
   ----------------------------------------------------------------------------
   Hero ("Move with confidence"), what it is (the app, BEEKON, BEEKON+ and
   BEEKON X), and the employers and institutions band with partners, people
   and the two actions. Header and footer come from the root layout.
   ========================================================================== */

const TITLE = "MyHives | The everyday safety AI guardian | Nelson T. Ajulo";
const DESCRIPTION =
  "MyHives is the everyday safety AI guardian. It protects 35,000+ people across 190+ countries from The Hague, with technology that acts when people cannot.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/myhives" },
  openGraph: { type: "website", title: TITLE, description: DESCRIPTION, url: "/myhives" },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "MyHives",
  url: "https://myhives.nl",
  description: DESCRIPTION,
  location: { "@type": "Place", name: "The Hague, Netherlands" },
  founder: [
    { "@type": "Person", name: "Nelson T. Ajulo", url: "https://tnajulo.com" },
    { "@type": "Person", name: "Anniek van Veldhuizen" },
  ],
};

export default function MyhivesPage() {
  return (
    <main id="main">
      <JsonLd data={orgJsonLd} />
      <MyhivesHero />
      <MyhivesWhat />
      <MyhivesInstitutions />
    </main>
  );
}
