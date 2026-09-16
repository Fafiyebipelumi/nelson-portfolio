import { podcast } from "@/lib/content";
import { Section, SectionBody, SectionLabel } from "../section";
import { Reveal, Stagger, StaggerItem } from "../motion-primitives";

/* ============================================================================
   PODCAST — EPISODES
   ----------------------------------------------------------------------------
   The opening line-up, as an editorial index. The show doesn't exist yet, so
   this is explicitly illustrative: themes are shown, guests read "to be
   announced", and the strip is labelled so nothing is mistaken for published
   work.
   ========================================================================== */

export function PodcastEpisodes() {
  return (
    <Section id="episodes" tone="deep">
      <SectionBody>
        <SectionLabel index="02" label={podcast.episodes.eyebrow} />

        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <h2 className="text-title text-charcoal font-medium">
              {podcast.episodes.headline}
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.06}>
            <p className="eyebrow text-mute lg:text-right">
              {podcast.episodes.note}
            </p>
          </Reveal>
        </div>

        <Stagger className="border-rule-strong mt-14 border-t sm:mt-20">
          {podcast.episodes.items.map((ep) => (
            <StaggerItem key={ep.index} className="border-rule border-b">
              <article className="grid gap-x-8 gap-y-4 py-8 sm:py-10 lg:grid-cols-12 lg:items-baseline">
                <p className="eyebrow text-signal lg:col-span-1">{ep.index}</p>

                <div className="lg:col-span-7">
                  <h3 className="text-subtitle text-charcoal font-medium">
                    {ep.title}
                  </h3>
                  <p className="text-graphite mt-3 max-w-xl text-base leading-relaxed">
                    {ep.blurb}
                  </p>
                </div>

                <p className="eyebrow text-mute lg:col-span-4 lg:text-right">
                  {ep.guest}
                </p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </SectionBody>
    </Section>
  );
}
