import Image from "next/image";
import { speakingPage } from "@/lib/content";
import { WHAT_GLOW } from "../glows";
import { Reveal, Stagger, StaggerItem } from "../motion-primitives";

/* ============================================================================
   SPEAKING — FOUR TALKS  (Figma redesign, November 2026)
   ----------------------------------------------------------------------------
   Black with amber and teal edge glows: the serif heading over four cards,
   each a 325 x 186 photo above a cream panel with the talk's title and
   synopsis, and a hard grey offset shadow. Four across from 1024px, two on
   tablets, one on phones. Meets the cream "Recent" band edge to edge.
   ========================================================================== */

export function SpeakingTalks() {
  const T = speakingPage.talks;
  return (
    <section
      aria-labelledby="talks-heading"
      data-tone="ink"
      className="on-ink text-cream relative isolate overflow-hidden bg-black"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{ background: WHAT_GLOW }}
      />
      <div className="gutter-tight pt-16 pb-20 lg:pt-[5.4rem] lg:pb-[7.4rem]">
        <Reveal>
          <h2
            id="talks-heading"
            className="origin-left font-serif text-[clamp(2.75rem,5vw,4.6rem)] leading-none tracking-[-0.045em] [scale:0.88_1]"
          >
            {T.heading}
          </h2>
        </Reveal>
        <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-[2.6rem] lg:grid-cols-4 lg:gap-[1.2rem]">
          {T.items.map((talk) => (
            <StaggerItem key={talk.title} className="h-full">
              <article className="bg-cream text-umber flex h-full flex-col overflow-hidden rounded-[4px] shadow-[4px_4px_0_0_#6f6b63] lg:min-h-[23.9rem]">
                <div className="relative aspect-[325/186] shrink-0">
                  <Image
                    src={talk.image}
                    alt=""
                    fill
                    draggable={false}
                    sizes="(min-width: 1024px) 23vw, (min-width: 640px) 46vw, 92vw"
                    className="no-save object-cover"
                  />
                </div>
                <div className="px-4 pt-[1.05rem] pb-6">
                  <h3 className="font-sans text-[1.3rem] leading-[1.18] font-semibold tracking-[-0.01em] lg:text-[1.35rem]">
                    {talk.title}
                  </h3>
                  <p className="mt-2 font-sans text-[1.0625rem] leading-[1.3] tracking-[0.01em]">
                    {talk.body}
                  </p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
