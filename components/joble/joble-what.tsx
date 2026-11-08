import Image from "next/image";
import { joblePage } from "@/lib/content";
import { WHAT_GLOW } from "../glows";
import { Reveal, Stagger, StaggerItem } from "../motion-primitives";

/* ============================================================================
   JOBLE — WHAT IT IS  (Figma redesign, November 2026)
   ----------------------------------------------------------------------------
   Black with amber and teal edge glows: the serif heading, the one-line
   product summary, then three pale cards (cyan, lilac, cyan) with the hard
   grey offset shadow. Each holds an illustration at its Figma size, top
   centre (the avatars carry their own shadow margin, so the ringed circles
   sit a little lower than the logo, as in the design), and its line at the
   foot. Meets the cream Proof band edge to edge.
   ========================================================================== */

export function JobleWhat() {
  const W = joblePage.whatItIs;
  return (
    <section
      aria-labelledby="joble-what-heading"
      data-tone="ink"
      className="on-ink text-cream relative isolate overflow-hidden bg-black"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{ background: WHAT_GLOW }}
      />

      <div className="gutter-tight pt-16 pb-20 lg:pt-[5.4rem] lg:pb-[7.5rem]">
        <Reveal>
          <h2
            id="joble-what-heading"
            className="origin-left font-serif text-[clamp(2.75rem,5vw,4.6rem)] leading-none tracking-[-0.04em] [scale:0.88_1]"
          >
            {W.heading}
          </h2>
          <p className="mt-8 max-w-[72rem] font-sans text-[1.0625rem] leading-[1.45] text-[#d6d2c7] lg:mt-[3.1rem]">
            {W.intro}
          </p>
        </Reveal>

        <Stagger className="mt-8 grid gap-6 md:grid-cols-3 lg:mt-11 lg:gap-8">
          {W.cards.map((card) => (
            <StaggerItem key={card.text} className="h-full">
              <div
                className="text-umber flex h-full min-h-[15.8rem] flex-col items-center rounded-[4px] px-6 pt-4 pb-[1.15rem] text-center shadow-[5px_5px_0_0_#6f6b63]"
                style={{ backgroundColor: card.tone }}
              >
                {/* Fixed-height slot: the avatars' shadow margin may spill past it,
                    so the line below sits where the design puts it. */}
                <div className="flex h-[9.3rem] items-start justify-center">
                  <Image
                    src={card.image.src}
                    alt=""
                    width={card.image.width}
                    height={card.image.height}
                    unoptimized={card.image.src.endsWith(".svg")}
                    draggable={false}
                    sizes={`${card.image.width}px`}
                    className="no-save h-auto max-w-full"
                    style={{ width: card.image.width }}
                  />
                </div>
                <p className="mt-auto max-w-[21rem] pt-4 font-sans text-[1.25rem] leading-[1.18] font-medium tracking-[-0.01em]">
                  {card.text}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
