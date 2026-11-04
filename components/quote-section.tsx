import Image from "next/image";
import { homeQuote } from "@/lib/content";
import { Reveal } from "./motion-primitives";
import { Stripes } from "./stripes";

/* ============================================================================
   HOME — QUOTE  (Figma redesign, November 2026)
   ----------------------------------------------------------------------------
   Warm dark section. Left: a speech-bubble card, Nelson on white with the
   pull quote set over his maroon turtleneck, with the bubble's tail at the
   bottom right. Right: Nelson's statement, signed with his avatar. Closes on
   fading lines into the ventures row.
   ========================================================================== */

/* Sampled from the turtleneck, so the bubble tail reads as part of it. */
const MAROON = "#5c171b";

export function QuoteSection() {
  return (
    <section id="position" data-tone="ink" className="on-ink bg-umber text-cream">
      <div className="gutter py-20 sm:py-24 lg:py-[8.5rem]">
        <div className="mx-auto grid max-w-[71rem] items-start gap-12 lg:grid-cols-[22.25rem_minmax(0,1fr)] lg:gap-10">
          {/* Speech-bubble card */}
          <Reveal y={28} className="mx-auto w-full max-w-[22.25rem]">
            <figure className="relative pb-[2.6rem]">
              <div
                className="relative aspect-square overflow-hidden rounded-[10px] rounded-br-none bg-white"
              >
                <Image
                  src={homeQuote.photo.src}
                  alt="Nelson T. Ajulo"
                  fill
                  sizes="(min-width: 1024px) 356px, 90vw"
                  className="object-cover"
                  style={{ objectPosition: homeQuote.photo.position }}
                />
                <blockquote className="absolute inset-x-0 bottom-0 px-5 pb-6 text-center sm:px-6 sm:pb-7">
                  <p className="font-sans text-[clamp(1.4rem,2.1vw,1.85rem)] leading-[1.06] font-medium tracking-[-0.03em] [text-shadow:0_1px_12px_rgba(40,6,8,0.55)]">
                    &ldquo;{homeQuote.card}&rdquo;
                  </p>
                </blockquote>
              </div>

              {/* Bubble tail: square edge on the right, sloping back to the
                  card's bottom edge. */}
              <svg
                aria-hidden="true"
                viewBox="0 0 54 42"
                preserveAspectRatio="none"
                className="absolute right-0 bottom-0 h-[2.6rem] w-[3.4rem]"
              >
                <path d="M0 0H54V42Z" fill={MAROON} />
              </svg>
            </figure>
          </Reveal>

          {/* Statement */}
          <figure className="flex flex-col lg:pt-8">
            <blockquote className="text-sand max-w-[46rem] space-y-[1.4em] font-sans text-[clamp(1.0625rem,1.3vw,1.2rem)] leading-[1.5]">
              {homeQuote.body.map((paragraph, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <p>
                    {i === 0 ? "“" : null}
                    {paragraph}
                    {i === homeQuote.body.length - 1 ? "”" : null}
                  </p>
                </Reveal>
              ))}
            </blockquote>

            <Reveal delay={0.14}>
              <figcaption className="mt-10 flex items-center gap-3 lg:mt-14">
                <span className="relative size-8 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={homeQuote.attribution.avatar}
                    alt=""
                    fill
                    sizes="32px"
                    className="object-cover"
                  />
                </span>
                <span className="font-sans text-[1.0625rem] font-medium lg:text-[1.2rem]">
                  {homeQuote.attribution.name}
                </span>
              </figcaption>
            </Reveal>
          </figure>
        </div>
      </div>

      <Stripes from="var(--color-umber)" to="#5e5a51" fade />
    </section>
  );
}
