import { getEpisodes } from "@/lib/episodes";
import { podcast } from "@/lib/content";

/* ============================================================================
   /podcast/rss.xml
   ----------------------------------------------------------------------------
   Generated from the episode data model so the site remains the source of
   truth even while hosting/distribution runs through a podcast host (brief
   §4.3). Empty channel until episodes exist, which is a valid feed.
   ========================================================================== */

const SITE = "https://tnajulo.com";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const episodes = await getEpisodes();

  const items = episodes
    .map((ep) => {
      const url = `${SITE}/podcast/${ep.slug}`;
      return `    <item>
      <title>${escapeXml(ep.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(ep.publishedAt).toUTCString()}</pubDate>
      <description>${escapeXml(ep.shortDescription)}</description>
      ${ep.duration ? `<itunes:duration>${escapeXml(ep.duration)}</itunes:duration>` : ""}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
  <channel>
    <title>${escapeXml(podcast.name)}</title>
    <link>${SITE}/podcast</link>
    <language>en</language>
    <description>${escapeXml(podcast.hero.standing)}</description>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
