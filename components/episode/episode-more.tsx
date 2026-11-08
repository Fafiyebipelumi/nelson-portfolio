import { ArrowUpRight } from "lucide-react";
import { getEpisodes, getUpcomingEpisodes } from "@/lib/episodes";
import { ActionButton } from "../action-button";
import { EpisodeCard, fromEpisode } from "../before/before-lineup";
import { Reveal, Stagger, StaggerItem } from "../motion-primitives";

/* ============================================================================
   EPISODE — MORE FROM SEASON ONE
   ----------------------------------------------------------------------------
   Up to four other episodes of the season, nearest in number to this one,
   on the lineup's own cards (released ones link, upcoming ones don't), and
   a way back to the whole season. Hidden when there is nothing else yet.
   ========================================================================== */

export async function EpisodeMore({ current }: { current: number }) {
  const [out, upcoming] = await Promise.all([getEpisodes(), getUpcomingEpisodes()]);
  const others = [...out, ...upcoming]
    .filter((ep) => ep.number !== current)
    .sort((a, b) => Math.abs(a.number - current) - Math.abs(b.number - current) || a.number - b.number)
    .slice(0, 4)
    .sort((a, b) => a.number - b.number);

  if (others.length === 0) return null;

  return (
    <section aria-labelledby="more-heading" className="bg-umber text-cream">
      <div className="gutter pt-14 pb-20 sm:pt-16 lg:pt-20 lg:pb-[7.5rem]">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2
              id="more-heading"
              className="origin-left font-serif text-[clamp(2.4rem,4vw,3.6rem)] leading-[1.02] [scale:0.88_1]"
            >
              More from season one
            </h2>
            <ActionButton href="/before#lineup" variant="dark" size="sm">
              The whole season
              <ArrowUpRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2}
                aria-hidden="true"
              />
            </ActionButton>
          </div>
        </Reveal>

        <Stagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-8">
          {others.map((ep) => (
            <StaggerItem key={ep.slug}>
              <EpisodeCard card={fromEpisode(ep)} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
