import type { Metadata } from "next";
import { podcast } from "@/lib/content";
import { PodcastHero } from "@/components/podcast/podcast-hero";
import { PodcastPremise } from "@/components/podcast/podcast-premise";
import { PodcastEpisodes } from "@/components/podcast/podcast-episodes";
import { PodcastApply } from "@/components/podcast/podcast-apply";

/* ============================================================================
   /podcast
   ----------------------------------------------------------------------------
   The show's page. Server-rendered and static; the only client JavaScript is
   the shared header and the application form. Section order mirrors the plan:
   hero → premise → episodes → the invitation, which is the emotional peak.

   Header, footer and the reveal observer come from the root layout.
   ========================================================================== */

const DESCRIPTION = `${podcast.name} — a long-form conversation with the founders, investors and researchers building the next decade of opportunity in AI, safety and emerging markets. Hosted by Nelson T. Ajulo. Guest applications open.`;

export const metadata: Metadata = {
  title: "Podcast",
  description: DESCRIPTION,
  alternates: { canonical: "/podcast" },
  openGraph: {
    type: "website",
    title: `Podcast — Nelson T. Ajulo`,
    description: DESCRIPTION,
    url: "/podcast",
  },
  twitter: {
    card: "summary_large_image",
    title: `Podcast — Nelson T. Ajulo`,
    description: DESCRIPTION,
  },
};

export default function PodcastPage() {
  return (
    <main id="main">
      <PodcastHero />
      <PodcastPremise />
      <PodcastEpisodes />
      <PodcastApply />
    </main>
  );
}
