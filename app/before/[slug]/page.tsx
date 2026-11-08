import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getEpisode, getEpisodes } from "@/lib/episodes";
import { urlForImage } from "@/sanity/lib/image";
import { JsonLd } from "@/components/json-ld";
import { EpisodeHero } from "@/components/episode/episode-hero";
import { EpisodeListen } from "@/components/episode/episode-listen";
import { EpisodeMore } from "@/components/episode/episode-more";
import { BeforeNewsletter } from "@/components/before/before-newsletter";

/* ============================================================================
   /before/[slug]  —  episode page  (BEFORE system, November 2026)
   ----------------------------------------------------------------------------
   Hero on the /before ground · player and notes · more from season one ·
   newsletter. The shared footer follows.

   Generated from the episode data model. Static params come from Sanity, so
   pages are prerendered per episode; with no project configured yet there are
   no params and any direct hit 404s cleanly. Carries PodcastEpisode structured
   data and a per-episode share image (see opengraph-image).
   ========================================================================== */

/* ISR: new episodes and edits in Sanity appear without a redeploy. Slugs not
   prerendered at build still render on demand (dynamicParams defaults to true). */
export const revalidate = 60;

export async function generateStaticParams() {
  const episodes = await getEpisodes();
  return episodes.map((ep) => ({ slug: ep.slug }));
}

export async function generateMetadata(
  props: PageProps<"/before/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const episode = await getEpisode(slug);
  if (!episode) return { title: "Episode not found" };

  const description = episode.shortDescription;
  return {
    title: { absolute: `${episode.title} | BEFORE` },
    description,
    alternates: { canonical: `/before/${episode.slug}` },
    openGraph: { type: "article", title: episode.title, description },
    twitter: { card: "summary_large_image", title: episode.title, description },
  };
}

export default async function EpisodePage(props: PageProps<"/before/[slug]">) {
  const { slug } = await props.params;
  const episode = await getEpisode(slug);
  if (!episode) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    name: episode.title,
    episodeNumber: episode.number,
    datePublished: episode.publishedAt,
    description: episode.shortDescription,
    url: `https://tnajulo.com/before/${episode.slug}`,
    partOfSeries: {
      "@type": "PodcastSeries",
      name: "BEFORE",
      url: "https://tnajulo.com/before",
    },
    ...(episode.guestName
      ? { actor: { "@type": "Person", name: episode.guestName } }
      : {}),
  };

  const platforms = [
    episode.spotifyUrl && { label: "Listen on Spotify", href: episode.spotifyUrl },
    episode.appleUrl && { label: "Listen on Apple Podcasts", href: episode.appleUrl },
    episode.youtubeUrl && { label: "Watch on YouTube", href: episode.youtubeUrl },
  ].filter(Boolean) as Array<{ label: string; href: string }>;

  const index = String(episode.number).padStart(2, "0");
  const guest = episode.guestName
    ? `With ${episode.guestName}${episode.guestRole ? `, ${episode.guestRole}` : ""}`
    : null;
  const released = episode.publishedAt
    ? new Date(episode.publishedAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;
  const meta = [released ? `Released ${released}` : "Date to be confirmed", episode.duration]
    .filter(Boolean)
    .join(" · ");

  return (
    <main id="main">
      <JsonLd data={jsonLd} />
      <EpisodeHero
        index={index}
        title={episode.title}
        guest={guest}
        meta={meta}
        topics={episode.topics ?? []}
        photo={urlForImage(episode.coverArt ?? episode.guestPhoto)}
        hasPlayer={Boolean(episode.embedUrl)}
        platforms={platforms}
      />
      <EpisodeListen
        title={episode.title}
        embedUrl={episode.embedUrl ?? null}
        description={episode.shortDescription}
        guest={guest}
      />
      <EpisodeMore current={episode.number} />
      <BeforeNewsletter />
    </main>
  );
}
