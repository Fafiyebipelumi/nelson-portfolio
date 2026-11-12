import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import type { SanityImageSource } from "@sanity/image-url";

/* ============================================================================
   EPISODES + WRITING  —  data access
   ----------------------------------------------------------------------------
   The single source the app reads episodes and writing from. When Sanity is
   configured it fetches published documents; when it is not (no project yet),
   every function returns an empty list so the site still builds and renders.
   The podcast page therefore shows the launch template until real episodes
   exist, then switches to live data automatically.
   ========================================================================== */

export interface Episode {
  number: number;
  title: string;
  slug: string;
  guestName?: string;
  guestRole?: string;
  guestPhoto?: SanityImageSource;
  publishedAt: string;
  duration?: string;
  shortDescription: string;
  spotifyUrl?: string;
  appleUrl?: string;
  youtubeUrl?: string;
  embedUrl?: string;
  coverArt?: SanityImageSource;
  topics?: string[];
}

export interface Post {
  title: string;
  slug: string;
  kicker?: string;
  publishedAt: string;
  excerpt: string;
  externalUrl?: string;
  /** Portable Text blocks. Present on the detail query, absent on the list. */
  body?: unknown[];
}

const EPISODE_FIELDS = `
  "number": number,
  title,
  "slug": slug.current,
  guestName,
  guestRole,
  guestPhoto,
  publishedAt,
  duration,
  shortDescription,
  spotifyUrl,
  appleUrl,
  youtubeUrl,
  embedUrl,
  coverArt,
  topics
`;

/** Published episodes — anything with a publishedAt in the past/present. */
export async function getEpisodes(): Promise<Episode[]> {
  if (!client) return [];
  try {
    return await client.fetch(
      `*[_type == "episode" && defined(slug.current) && defined(publishedAt) && publishedAt <= now()]
        | order(publishedAt desc){${EPISODE_FIELDS}}`,
    );
  } catch {
    return [];
  }
}

/** Planned / scheduled episodes: no date yet, or a future one. Ordered by
 *  episode number ascending so the lineup reads 01, 02, 03… as the season
 *  is meant to unfold. Used by the "Season one lineup" card grid. */
export async function getUpcomingEpisodes(): Promise<Episode[]> {
  if (!client) return [];
  try {
    return await client.fetch(
      `*[_type == "episode" && defined(slug.current) && (!defined(publishedAt) || publishedAt > now())]
        | order(number asc){${EPISODE_FIELDS}}`,
    );
  } catch {
    return [];
  }
}

export async function getEpisode(slug: string): Promise<Episode | null> {
  if (!client) return null;
  try {
    return await client.fetch(
      `*[_type == "episode" && slug.current == $slug][0]{${EPISODE_FIELDS}}`,
      { slug },
    );
  } catch {
    return null;
  }
}

export async function getLatestEpisode(): Promise<Episode | null> {
  return (await getEpisodes())[0] ?? null;
}

/** Whether BEFORE has launched: season one counts as live once episode 01 is
 *  released. Until then the site shows nothing as playable (EA review,
 *  November 2026). `latest` is the newest released episode once live. */
export async function getSeasonStatus(): Promise<{ live: boolean; latest: Episode | null }> {
  const released = await getEpisodes();
  const live = released.some((ep) => ep.number === 1);
  return { live, latest: live ? (released[0] ?? null) : null };
}

/** Released episodes the public may see: none until season one is live
 *  (episode 01 released). Feeds the episode pages, sitemap and RSS, so
 *  test or early entries in Sanity never surface before launch. */
export async function getPublicEpisodes(): Promise<Episode[]> {
  const released = await getEpisodes();
  return released.some((ep) => ep.number === 1) ? released : [];
}

/* Test posts in Sanity that must never appear on the site. Writing goes
   live on its own: /writing shows its empty state while no other post is
   published, and the essays appear (within a minute) once the first real
   one is published. Safe to empty this list once the test post is deleted. */
const HIDDEN_POST_SLUGS = new Set(["the-future-of-ai"]);
const visible = (slug: string | undefined) => !!slug && !HIDDEN_POST_SLUGS.has(slug);

export async function getPosts(): Promise<Post[]> {
  if (!client) return [];
  try {
    const posts: Post[] = await client.fetch(
      `*[_type == "post" && defined(slug.current) && publishedAt <= now()]
        | order(publishedAt desc){
          title, "slug": slug.current, kicker, publishedAt, excerpt, externalUrl
        }`,
    );
    return posts.filter((post) => visible(post.slug));
  } catch {
    return [];
  }
}

/** Full post including body Portable Text. Returns null when the post is
 *  missing or Sanity isn't configured; the caller decides what to render. */
export async function getPost(slug: string): Promise<Post | null> {
  if (!client || !visible(slug)) return null;
  try {
    return await client.fetch(
      `*[_type == "post" && slug.current == $slug && publishedAt <= now()][0]{
        title, "slug": slug.current, kicker, publishedAt, excerpt, externalUrl, body
      }`,
      { slug },
    );
  } catch {
    return null;
  }
}

/** Slug list for generateStaticParams. Best-effort; empty on failure. */
export async function getPostSlugs(): Promise<string[]> {
  if (!client) return [];
  try {
    const slugs: string[] = await client.fetch(
      `*[_type == "post" && defined(slug.current) && publishedAt <= now()].slug.current`,
    );
    return slugs.filter(visible);
  } catch {
    return [];
  }
}

/** Resolves an episode's artwork URL, or null to fall back to show cover art. */
export function episodeCover(episode: Episode): string | null {
  return urlForImage(episode.coverArt ?? episode.guestPhoto);
}
