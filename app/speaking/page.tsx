import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { SpeakingHero } from "@/components/speaking-page/speaking-hero";
import { SpeakingTalks } from "@/components/speaking-page/speaking-talks";
import { SpeakingRecent } from "@/components/speaking-page/speaking-recent";

/* ============================================================================
   /speaking  —  SPEAKING  (Figma redesign, November 2026)
   ----------------------------------------------------------------------------
   Light hero, four talks, recent appearances with the enquiry and speaker
   kit actions. Speaking enquiries go to the contact form (/contact#enquiry).
   Header and footer come from the root layout.
   ========================================================================== */

const TITLE = "Nelson T. Ajulo | Speaker on safety, AI and ownership";
const DESCRIPTION =
  "Nelson T. Ajulo speaks about everyday safety, AI sovereignty and ownership in Africa, and building deep technology from Europe. Keynotes, panels, fireside conversations and media interviews.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/speaking" },
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    url: "/speaking",
  },
};

const speakingJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "AIFOD Summer Summit",
  location: { "@type": "Place", name: "Palais des Nations, Geneva" },
  startDate: "2026-08",
  performer: {
    "@type": "Person",
    name: "Nelson T. Ajulo",
    url: "https://tnajulo.com",
  },
};

export default function SpeakingPage() {
  return (
    <main id="main">
      <JsonLd data={speakingJsonLd} />
      <SpeakingHero />
      <SpeakingTalks />
      <SpeakingRecent />
    </main>
  );
}
