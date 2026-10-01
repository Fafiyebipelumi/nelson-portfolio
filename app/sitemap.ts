import type { MetadataRoute } from "next";
import { getEpisodes, getPosts } from "@/lib/episodes";

/* ============================================================================
   sitemap.xml
   ----------------------------------------------------------------------------
   Generated at build time. Static routes plus any published episodes and
   writing from Sanity. /studio and /api are excluded (see robots).
   ========================================================================== */

const SITE = "https://tnajulo.com";

/* Keep the sitemap in step with Sanity: picks up new episodes and posts
   without waiting for a redeploy. */
export const revalidate = 60;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/myhives`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/joble`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/15wins`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/podcast`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE}/speaking`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/writing`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${SITE}/press`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
  ];

  const [episodes, posts] = await Promise.all([getEpisodes(), getPosts()]);

  const episodeRoutes: MetadataRoute.Sitemap = episodes.map((ep) => ({
    url: `${SITE}/podcast/${ep.slug}`,
    lastModified: ep.publishedAt ? new Date(ep.publishedAt) : now,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts
    .filter((p) => !p.externalUrl)
    .map((p) => ({
      url: `${SITE}/writing/${p.slug}`,
      lastModified: p.publishedAt ? new Date(p.publishedAt) : now,
      changeFrequency: "yearly",
      priority: 0.5,
    }));

  return [...staticRoutes, ...episodeRoutes, ...postRoutes];
}
