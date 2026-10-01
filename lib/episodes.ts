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

export async function getPosts(): Promise<Post[]> {
  if (!client) return [];
  try {
    return await client.fetch(
      `*[_type == "post" && defined(slug.current) && publishedAt <= now()]
        | order(publishedAt desc){
          title, "slug": slug.current, kicker, publishedAt, excerpt, externalUrl
        }`,
    );
  } catch {
    return [];
  }
}

/** Full post including body Portable Text. Returns null when the post is
 *  missing or Sanity isn't configured; the caller decides what to render. */
export async function getPost(slug: string): Promise<Post | null> {
  if (!client) return null;
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
    return await client.fetch(
      `*[_type == "post" && defined(slug.current) && publishedAt <= now()].slug.current`,
    );
  } catch {
    return [];
  }
}

/** Resolves an episode's artwork URL, or null to fall back to show cover art. */
export function episodeCover(episode: Episode): string | null {
  return urlForImage(episode.coverArt ?? episode.guestPhoto);
}
