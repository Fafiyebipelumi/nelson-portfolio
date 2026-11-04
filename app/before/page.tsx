import type { Metadata } from "next";
import { podcast } from "@/lib/content";
import { JsonLd } from "@/components/json-ld";
import { BeforeHero } from "@/components/before/before-hero";
import { BeforeTrailer } from "@/components/before/before-trailer";
import { BeforePremise } from "@/components/before/before-premise";
import { BeforeLineup } from "@/components/before/before-lineup";
import { BeforeFormat } from "@/components/before/before-format";
import { BeforeQuestion } from "@/components/before/before-question";
import { BeforeSeatSponsor } from "@/components/before/before-seat-sponsor";
import { BeforeHost } from "@/components/before/before-host";
import { BeforeNewsletter } from "@/components/before/before-newsletter";

/* ============================================================================
   /before  —  BEFORE  (Figma redesign, November 2026)
   ----------------------------------------------------------------------------
   Hero · trailer band · premise · season one lineup · how an episode works ·
   the community question · guests and sponsors · the host · newsletter.
   The shared footer follows.

   The lineup reads upcoming episodes from Sanity (falling back to the sample
   season in content.ts), so the page re-renders from the CMS at most once a
   minute and new episodes appear without a redeploy.
   ========================================================================== */

export const revalidate = 60;

const TITLE = "BEFORE | A podcast by Nelson T. Ajulo";
const DESCRIPTION =
  "BEFORE, a MyHives Original hosted by Nelson T. Ajulo. Conversations with people shaping our world about the experiences that shaped them. Season one begins January 2027.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/before" },
  openGraph: { type: "website", title: TITLE, description: DESCRIPTION, url: "/before" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const seriesJsonLd = {
  "@context": "https://schema.org",
  "@type": "PodcastSeries",
  name: podcast.name,
  description: DESCRIPTION,
  url: "https://tnajulo.com/before",
  author: { "@type": "Person", name: "Nelson T. Ajulo" },
  webFeed: "https://tnajulo.com/before/rss.xml",
};

export default function PodcastPage() {
  return (
    <main id="main">
      <JsonLd data={seriesJsonLd} />
      <BeforeHero />
      <BeforeTrailer />
      <BeforePremise />
      <BeforeLineup />
      <BeforeFormat />
      <BeforeQuestion />
      <BeforeSeatSponsor />
      <BeforeHost />
      <BeforeNewsletter />
    </main>
  );
}
