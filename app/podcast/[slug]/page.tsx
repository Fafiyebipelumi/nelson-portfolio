import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getEpisode, getEpisodes } from "@/lib/episodes";
import { JsonLd } from "@/components/json-ld";
import { Section, SectionBody } from "@/components/section";

/* ============================================================================
   /podcast/[slug]  —  episode page
   ----------------------------------------------------------------------------
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
  props: PageProps<"/podcast/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const episode = await getEpisode(slug);
  if (!episode) return { title: "Episode not found" };

  const description = episode.shortDescription;
  return {
    title: `${episode.title} · What Comes Next`,
    description,
    alternates: { canonical: `/podcast/${episode.slug}` },
    openGraph: { type: "article", title: episode.title, description },
    twitter: { card: "summary_large_image", title: episode.title, description },
  };
}

export default async function EpisodePage(props: PageProps<"/podcast/[slug]">) {
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
    url: `https://tnajulo.com/podcast/${episode.slug}`,
    partOfSeries: {
      "@type": "PodcastSeries",
      name: "What Comes Next",
      url: "https://tnajulo.com/podcast",
    },
    ...(episode.guestName
      ? { actor: { "@type": "Person", name: episode.guestName } }
      : {}),
  };

  const platforms = [
    episode.spotifyUrl && { label: "Spotify", href: episode.spotifyUrl },
    episode.appleUrl && { label: "Apple Podcasts", href: episode.appleUrl },
    episode.youtubeUrl && { label: "YouTube", href: episode.youtubeUrl },
  ].filter(Boolean) as Array<{ label: string; href: string }>;

  return (
    <main id="main" className="on-ink bg-ink text-bone">
      <JsonLd data={jsonLd} />

      <Section tone="ink" grain>
        <SectionBody>
          <div className="pt-8">
            <Link
              href="/podcast"
              className="link-draw text-ash hover:text-airwave inline-flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.16em] uppercase transition-colors"
            >
              <ArrowLeft className="size-3.5" strokeWidth={1.75} aria-hidden="true" />
              All episodes
            </Link>
          </div>

          <p className="eyebrow text-airwave mt-12">Episode {episode.number}</p>
          <h1 className="text-display text-bone mt-4 max-w-4xl font-medium">
            {episode.title}
          </h1>

          {episode.guestName ? (
            <p className="text-ash mt-6 text-lg">
              With {episode.guestName}
              {episode.guestRole ? `, ${episode.guestRole}` : ""}
            </p>
          ) : null}

          {episode.embedUrl ? (
            <div className="border-rule-ink relative mt-12 aspect-[16/9] overflow-hidden border">
              <iframe
                src={episode.embedUrl}
                title={`${episode.title} player`}
                loading="lazy"
                className="absolute inset-0 h-full w-full"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
              />
            </div>
          ) : null}

          <p className="text-ash mt-12 max-w-2xl text-lg leading-relaxed">
            {episode.shortDescription}
          </p>

          {platforms.length > 0 ? (
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
              {platforms.map((p) => (
                <li key={p.label}>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-draw text-ash hover:text-airwave text-sm transition-colors"
                  >
                    {p.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </SectionBody>
      </Section>
    </main>
  );
}
