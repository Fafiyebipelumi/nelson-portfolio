import { Reveal } from "../motion-primitives";
import { Stripes } from "../stripes";

/* ============================================================================
   EPISODE — LISTEN + NOTES  (BEFORE system, November 2026)
   ----------------------------------------------------------------------------
   Warm near-black band, as the /before lineup. The player sits in a frame on
   the cream offset shadow, then the notes: a serif heading on the left, the
   episode description on the right in sand, the guest line under it.
   Without an embed the notes stand alone.
   ========================================================================== */

export function EpisodeListen({
  title,
  embedUrl,
  description,
  guest,
}: {
  title: string;
  embedUrl: string | null;
  description: string;
  guest: string | null;
}) {
  return (
    <section id="listen" aria-label="Listen" className="bg-umber text-cream scroll-mt-24">
      <div className="gutter pt-16 pb-20 sm:pt-20 lg:pt-24 lg:pb-[7rem]">
        {embedUrl ? (
          <Reveal y={28}>
            <div className="mx-auto max-w-[69.5rem] overflow-hidden rounded-[7px] bg-black shadow-[6px_6px_0_0_#fff8e1]">
              <div className="relative aspect-video">
                <iframe
                  src={embedUrl}
                  title={`${title}: player`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </Reveal>
        ) : null}

        <div
          className={`mx-auto grid max-w-[69.5rem] gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16 ${
            embedUrl ? "mt-16 lg:mt-24" : ""
          }`}
        >
          <Reveal>
            <h2 className="origin-left font-serif text-[clamp(2.4rem,4vw,3.6rem)] leading-[1.02] [scale:0.88_1]">
              In this conversation
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="text-sand font-sans text-[1.0625rem] leading-[1.5] tracking-[-0.01em] lg:pt-3 lg:text-[1.1875rem]">
              {description}
            </p>
            {guest ? (
              <p className="text-stone mt-5 font-sans text-[0.9375rem] font-medium">{guest}</p>
            ) : null}
          </Reveal>
        </div>
      </div>
      <Stripes from="var(--color-umber)" to="#5e5a51" fade />
    </section>
  );
}
