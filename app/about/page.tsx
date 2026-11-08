import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { AboutHero } from "@/components/about/about-hero";
import { AboutStory } from "@/components/about/about-story";
import { AboutDetails } from "@/components/about/about-details";
import { HiveQuote } from "@/components/hive-quote";

/* ============================================================================
   /about  —  ABOUT  (Figma redesign, November 2026)
   ----------------------------------------------------------------------------
   Hero ("Redrawing the map of safety."), the story in Nelson's first person,
   the hive quote band (shared with the homepage), then earlier work,
   education and recognition. Header and footer come from the root layout.
   ========================================================================== */

const TITLE = "About Nelson T. Ajulo | Redrawing the map of safety";
const DESCRIPTION =
  "Nelson T. Ajulo is Co-Founder, CEO and CTO of MyHives, the everyday safety AI guardian, founder of Joble, and General Partner at 15Wins Ventures. He hosts BEFORE.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: { type: "profile", title: TITLE, description: DESCRIPTION, url: "/about" },
};

const profileJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: "https://tnajulo.com/about",
  mainEntity: {
    "@type": "Person",
    name: "Nelson T. Ajulo",
    honorificSuffix: "PhD",
    jobTitle: "Co-Founder, CEO and CTO of MyHives",
    url: "https://tnajulo.com",
    worksFor: [
      { "@type": "Organization", name: "MyHives" },
      { "@type": "Organization", name: "Joble" },
      { "@type": "Organization", name: "15Wins Ventures" },
    ],
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "University of Gdańsk" },
      { "@type": "CollegeOrUniversity", name: "Anglia Ruskin University" },
      { "@type": "CollegeOrUniversity", name: "Limkokwing University of Creative Technology" },
    ],
    award: [
      "European Entrepreneur of the Year 2024",
      "CSU Innovation Award",
      "Bold EdTech Award 2023",
      "FUTR150 Founders and Startups Award 2022",
    ],
    homeLocation: { "@type": "Place", name: "The Hague, Netherlands" },
  },
};

export default function AboutPage() {
  return (
    <main id="main">
      <JsonLd data={profileJsonLd} />
      <AboutHero />
      <AboutStory />
      <HiveQuote />
      <AboutDetails />
    </main>
  );
}
