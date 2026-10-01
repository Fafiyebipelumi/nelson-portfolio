import Image from "next/image";
import { Play } from "lucide-react";
import { podcast } from "@/lib/content";
import { type Episode, episodeCover } from "@/lib/episodes";
import { Section, SectionBody, SectionLabel } from "../section";
import { Reveal } from "../motion-primitives";
import { PodcastCover } from "./podcast-cover";

/* ============================================================================
   B — LATEST EPISODE
   ----------------------------------------------------------------------------
   Renders the newest published episode from Sanity when one exists. Until then
   it shows the launch template (brief §4.4): bracketed guest/duration/date and
   a player placeholder. When a real episode has an embed URL, the platform
   embed player is used inline (brief: use the embed, do not build a player).
   ========================================================================== */

const template = podcast.latest;

export function PodcastLatest({ episode }: { episode?: Episode | null }) {
  const number = episode ? `Episode ${episode.number}` : template.number;
  const title = episode ? episode.title : template.title;
  const guest = episode
    ? episode.guestName
      ? `With ${episode.guestName}${episode.guestRole ? `, ${episode.guestRole}` : ""}`
      : ""
    : template.guest;
  const meta = episode
    ? [episode.duration, formatDate(episode.publishedAt)].filter(Boolean).join(" · ")
    : template.meta;
  const synopsis = episode ? episode.shortDescription : template.synopsis;
  const coverUrl = episode ? episodeCover(episode) : null;

  const links = episode
    ? ([
        episode.spotifyUrl && { label: "Listen on Spotify", href: episode.spotifyUrl },
        episode.appleUrl && { label: "Apple Podcasts", href: episode.appleUrl },
        episode.youtubeUrl && { label: "YouTube", href: episode.youtubeUrl },
        { label: "Read transcript", href: `/podcast/${episode.slug}` },
      ].filter(Boolean) as Array<{ label: string; href: string }>)
    : template.links;

  return (
    <Section id="latest" tone="ink" grain>
      <SectionBody>
        <SectionLabel index="01" label={template.eyebrow} tone="podcast" />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="eyebrow text-airwave">{number}</p>
              <h2 className="text-title text-bone mt-4 font-medium">{title}</h2>
              {guest ? <p className="text-ash mt-4 text-base">{guest}</p> : null}
              {meta ? <p className="eyebrow text-slate mt-3">{meta}</p> : null}
            </Reveal>

            <Reveal delay={0.06}>
              <p className="text-ash mt-8 max-w-xl text-base leading-relaxed sm:text-lg">
                {synopsis}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="link-draw text-ash hover:text-airwave text-sm transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal className="lg:col-span-6" y={28}>
            {episode?.embedUrl ? (
              <div className="border-rule-ink relative aspect-[16/10] overflow-hidden border">
                <iframe
                  src={episode.embedUrl}
                  title={`${title} player`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                />
              </div>
            ) : (
              /* No embed yet: cover art at medium size (brief §4.2) with a play
                 affordance. Real episodes use their own cover/guest art; the
                 launch template uses the show's branded cover. */
              <figure className="mx-auto w-full max-w-sm lg:max-w-md">
                <div className="border-rule-ink group relative overflow-hidden border">
                  {coverUrl ? (
                    <div className="relative aspect-square">
                      <Image
                        src={coverUrl}
                        alt={`${title} cover art`}
                        fill
                        sizes="(min-width: 1024px) 28rem, 24rem"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <PodcastCover />
                  )}
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="border-airwave/60 bg-ink/40 text-airwave flex size-16 items-center justify-center rounded-full border backdrop-blur-sm">
                      <Play className="size-6 translate-x-0.5" strokeWidth={1.5} aria-hidden="true" />
                    </span>
                  </span>
                </div>
                <figcaption className="eyebrow text-slate mt-4 text-center">
                  Embedded player · {template.note}
                </figcaption>
              </figure>
            )}
          </Reveal>
        </div>
      </SectionBody>
    </Section>
  );
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "";
  }
}
