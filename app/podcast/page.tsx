import type { Metadata } from "next";
import { podcast } from "@/lib/content";
import { getEpisodes } from "@/lib/episodes";
import { JsonLd } from "@/components/json-ld";
import { PodcastHero } from "@/components/podcast/podcast-hero";
import { PodcastLatest } from "@/components/podcast/podcast-latest";
import { PodcastPremise } from "@/components/podcast/podcast-premise";
import { PodcastEpisodes } from "@/components/podcast/podcast-episodes";
import { PodcastArchive } from "@/components/podcast/podcast-archive";
import { PodcastHost } from "@/components/podcast/podcast-host";
import { PodcastApply } from "@/components/podcast/podcast-apply";
import { PodcastSponsor } from "@/components/podcast/podcast-sponsor";
import { PodcastNewsletter } from "@/components/podcast/podcast-newsletter";
import { PodcastCommunity } from "@/components/podcast/podcast-community";

/* ============================================================================
   /podcast
   ----------------------------------------------------------------------------
   Dark by default. Section order follows brief §4.1 (A to K):
     A Hero · B Latest episode · C Premise · D Season one lineup ·
     E Archive (only once 3+ episodes exist) · F Meet the host ·
     G Guest application · H Sponsor · I Newsletter · J Community ·
     K Footer (shared site footer).

   Episodes come from Sanity via lib/episodes; with no project configured yet,
   getEpisodes() returns [] and section B shows the launch template while the
   archive stays hidden. PodcastSeries structured data ships for crawlers.
   ========================================================================== */

/* ISR: re-render from Sanity at most once a minute, so episodes published in
   the Studio appear on the live site without a redeploy (brief §4.3). */
export const revalidate = 60;

const DESCRIPTION = `${podcast.name}, a podcast by Nelson T. Ajulo. Conversations with the founders, investors and researchers building the next decade of opportunity in AI, safety and emerging markets. Season one coming soon. Guest applications open.`;

export const metadata: Metadata = {
  title: "Podcast",
  description: DESCRIPTION,
  alternates: { canonical: "/podcast" },
  openGraph: {
    type: "website",
    title: "What Comes Next, a podcast by Nelson T. Ajulo",
    description: DESCRIPTION,
    url: "/podcast",
  },
  twitter: {
    card: "summary_large_image",
    title: "What Comes Next, a podcast by Nelson T. Ajulo",
    description: DESCRIPTION,
  },
};

const seriesJsonLd = {
  "@context": "https://schema.org",
  "@type": "PodcastSeries",
  name: podcast.name,
  description: DESCRIPTION,
  url: "https://tnajulo.com/podcast",
  author: { "@type": "Person", name: "Nelson T. Ajulo" },
  webFeed: "https://tnajulo.com/podcast/rss.xml",
};

export default async function PodcastPage() {
  const episodes = await getEpisodes();

  return (
    <main id="main">
      <JsonLd data={seriesJsonLd} />
      {/* A */} <PodcastHero />
      {/* B */} <PodcastLatest episode={episodes[0] ?? null} />
      {/* C */} <PodcastPremise />
      {/* D */} <PodcastEpisodes />
      {/* E */} <PodcastArchive episodes={episodes} />
      {/* F */} <PodcastHost />
      {/* G */} <PodcastApply />
      {/* H */} <PodcastSponsor />
      {/* I */} <PodcastNewsletter />
      {/* J */} <PodcastCommunity />
    </main>
  );
}
